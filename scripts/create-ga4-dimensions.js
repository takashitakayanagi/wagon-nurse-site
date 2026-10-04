#!/usr/bin/env node
/*
 * GA4のカスタムディメンションを一括登録するスクリプト。
 *
 * LPは track() で細かいイベントパラメータを送っているが、GA4側に登録しないと
 * 集計軸として使えない（登録は遡及しないので、早いほど早く学べる）。
 * このスクリプトは登録済みのものを飛ばして、足りないものだけを作る（何度実行しても安全）。
 *
 * 必要な権限: サービスアカウントがGA4プロパティの「編集者」であること。
 *             閲覧者のままだと403で止まる（そのときは手順書を表示する）。
 *
 * 使い方:
 *   node scripts/create-ga4-dimensions.js --dry-run   … 何が作られるかだけ見る
 *   node scripts/create-ga4-dimensions.js             … 実際に作る
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'secrets/reporting-config.json'), 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(path.join(ROOT, config.ga4_service_account_key), 'utf8'));

const DRY_RUN = process.argv.includes('--dry-run');

/* 登録するディメンション。優先順に並べてある。
   すべて EVENT スコープ（イベントパラメータなので USER でも ITEM でもない）。 */
const DIMENSIONS = [
  {
    parameterName: 'cta_location',
    displayName: 'CTA位置',
    description: '押されたCTAの場所。result=診断結果直後 / mid=中盤 / sticky=追従バー / final=最下部',
  },
  {
    parameterName: 'exam_year',
    displayName: '受験学年',
    description: '5問のあとの自己申告。yes=最終学年・既卒 / no=低学年。価格の出し分けの基準',
  },
  {
    parameterName: 'percent_scrolled',
    displayName: 'スクロール到達率',
    description: '25 / 50 / 75 / 100 のいずれか。CTAが画面に入った人数を知るための指標',
  },
  {
    parameterName: 'quiz_score',
    displayName: '診断スコア（CV時）',
    description: 'CTAを押した時点の5問の点数。未完了は-1。点数別のCV傾向を見る',
  },
  {
    parameterName: 'cta_domain',
    displayName: 'CTA誘導領域',
    description: '実際にLINEへ誘導した領域（既定は循環器）。featuredDomainの選択が正しいかの検証用',
  },
  {
    parameterName: 'lp_variant',
    displayName: 'LP流入区分',
    description: '広告からの通常流入か、学校講義（?src=school）か。LP別A/Bの前提になる軸',
  },
  /* 2026-09-09追加。転送用HTML（site/form_*.html）がGoogleフォームへ飛ぶ直前に
     form_open と一緒に送る。転送先は別ドメインで追えないので、サイト側で
     「どの申込フォームまで行ったか」を数えられるのはこの軸だけ。 */
  {
    parameterName: 'form_name',
    displayName: '申込フォーム種別',
    description:
      'form_openが送る、遷移先の申込フォーム。moshi=無料模試 / web_school=WEB教室 / ' +
      'venue_seminar=会場セミナー / for_school=学校向け / recruitment=講師募集 / ' +
      'general_contact=一般問い合わせ / thanks=旧サンクスページ',
  },
];

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

/* weekly-report.js と同じ手順だが、スコープが analytics.edit である点だけが違う。
   読み取り専用の analytics.readonly では customDimensions の作成ができない。 */
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const signingInput =
    base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) +
    '.' +
    base64url(
      JSON.stringify({
        iss: serviceAccount.client_email,
        scope: 'https://www.googleapis.com/auth/analytics.edit',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      })
    );
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), serviceAccount.private_key);
  const jwt = signingInput + '.' + signature.toString('base64url');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('トークン取得失敗: ' + JSON.stringify(data));
  return data.access_token;
}

const ADMIN = 'https://analyticsadmin.googleapis.com/v1beta';

async function listExisting(token) {
  const all = [];
  let pageToken = '';
  do {
    const url =
      `${ADMIN}/properties/${config.ga4_property_id}/customDimensions?pageSize=200` +
      (pageToken ? `&pageToken=${pageToken}` : '');
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.error) throw Object.assign(new Error(data.error.message), { status: data.error.code });
    all.push(...(data.customDimensions || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return all;
}

async function createDimension(token, dim) {
  const res = await fetch(`${ADMIN}/properties/${config.ga4_property_id}/customDimensions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parameterName: dim.parameterName,
      displayName: dim.displayName,
      description: dim.description,
      scope: 'EVENT',
    }),
  });
  const data = await res.json();
  if (data.error) throw Object.assign(new Error(data.error.message), { status: data.error.code });
  return data;
}

/* 権限が足りないときは、手作業でも進められるように手順を出す。 */
function printManualSteps() {
  console.log('\n────────────────────────────────────────');
  console.log(' 手作業で登録する場合の手順');
  console.log('────────────────────────────────────────');
  console.log(' GA4管理画面 → 管理 → データの表示 → カスタム定義');
  console.log(' →「カスタム ディメンションを作成」を6回。範囲はすべて「イベント」。\n');
  DIMENSIONS.forEach((d, i) => {
    console.log(`  ${i + 1}. ディメンション名: ${d.displayName}`);
    console.log(`     イベント パラメータ: ${d.parameterName}`);
    console.log(`     説明: ${d.description}\n`);
  });
  console.log(' ※ 登録は遡及しない。反映まで24〜48時間かかることがある。');
}

(async () => {
  console.log('========================================');
  console.log(` GA4カスタムディメンション登録${DRY_RUN ? '（ドライラン）' : ''}`);
  console.log(` プロパティ: ${config.ga4_property_id}`);
  console.log('========================================\n');

  const token = await getAccessToken();

  let existing;
  try {
    existing = await listExisting(token);
  } catch (err) {
    /* 403は2種類ある。Cloud側でAPIが無効なのか、GA4側で権限が足りないのか。
       メッセージが違うので取り違えないよう分けて出す。 */
    if (/has not been used in project|SERVICE_DISABLED|is disabled/.test(err.message)) {
      console.error('Google Analytics Admin API が有効化されていません。\n');
      console.error(
        '  Cloudプロジェクト ' + (serviceAccount.project_id || '(不明)') + ' で、下記を開いて「有効にする」を押してください:\n' +
        '  https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview' +
        '?project=' + (serviceAccount.project_id || '') + '\n\n' +
        '  有効化後、数分待ってからこのスクリプトを再実行してください。\n' +
        '  （そのあと権限不足で止まる場合は、GA4側でサービスアカウントを「編集者」にする必要があります）'
      );
      printManualSteps();
      process.exit(1);
    }
    if (err.status === 403 || err.status === 401) {
      console.error('権限が足りません（' + err.status + '）: ' + err.message + '\n');
      console.error(
        '  サービスアカウント ' + serviceAccount.client_email + ' が\n' +
        '  GA4プロパティの「閲覧者」のままです。カスタムディメンションの作成には「編集者」が要ります。\n' +
        '  GA4管理画面 → 管理 → プロパティのアクセス管理 から役割を変更してください。'
      );
      printManualSteps();
      process.exit(1);
    }
    throw err;
  }

  const already = new Set(existing.map((d) => d.parameterName));
  console.log(`登録済み: ${existing.length}件` + (existing.length ? ` (${[...already].join(', ')})` : ''));

  const todo = DIMENSIONS.filter((d) => !already.has(d.parameterName));
  const skipped = DIMENSIONS.filter((d) => already.has(d.parameterName));

  skipped.forEach((d) => console.log(`  スキップ: ${d.parameterName}（登録済み）`));

  if (todo.length === 0) {
    console.log('\n作成するものはありません。すべて登録済みです。');
    return;
  }

  console.log(`\nこれから作成: ${todo.length}件`);
  todo.forEach((d) => console.log(`  - ${d.parameterName} … ${d.displayName}`));

  if (DRY_RUN) {
    console.log('\nドライランのため、実際には作成していません。');
    return;
  }

  console.log('');
  for (const d of todo) {
    try {
      await createDimension(token, d);
      console.log(`  作成しました: ${d.parameterName}`);
    } catch (err) {
      console.error(`  失敗: ${d.parameterName} — ${err.message}`);
    }
  }

  console.log('\n完了。反映まで24〜48時間かかることがあります。');
  console.log('登録前のデータは遡及しないので、読めるのは本日以降の分です。');
})().catch((err) => {
  console.error('\nエラー:', err.message);
  process.exit(1);
});
