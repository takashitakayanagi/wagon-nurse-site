#!/usr/bin/env node
/*
 * Search Console の検索クエリ（どんな言葉で検索され、表示・クリックされたか）を取得するスクリプト。
 * 認証は weekly-report.js と同じサービスアカウントを使う。
 * 事前に Search Console の「設定 → ユーザーと権限」で、サービスアカウントのメールを
 * 「制限付き」ユーザーとして追加しておく必要がある。
 *
 * 使い方: node scripts/gsc-queries.js [日数（省略時90）] [件数（省略時100）]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'secrets/reporting-config.json'), 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(path.join(ROOT, config.ga4_service_account_key), 'utf8'));

const days = parseInt(process.argv[2] || '90', 10);
const rowLimit = parseInt(process.argv[3] || '100', 10);
// URLプレフィックスで登録しているプロパティ。ドメインで登録できたら 'sc-domain:wagon-nurse.com' に変える
const SITE = config.gsc_site_url || 'https://wagon-nurse.com/';

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const input = enc({ alg: 'RS256', typ: 'JWT' }) + '.' + enc({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  });
  const jwt = input + '.' + crypto.sign('RSA-SHA256', Buffer.from(input), serviceAccount.private_key).toString('base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('トークン取得に失敗: ' + JSON.stringify(data));
  return data.access_token;
}

// Search Console のデータは2〜3日遅れて確定するので、終了日は3日前にする
function ymd(offsetDays) {
  const d = new Date(Date.now() - offsetDays * 86400000);
  return d.toISOString().slice(0, 10);
}

async function query(token, body) {
  const url = 'https://www.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(SITE) + '/searchAnalytics/query';
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) {
    const hint = data.error.code === 403
      ? '\n→ Search Console の「設定 → ユーザーと権限」で ' + serviceAccount.client_email + ' を追加してください'
      : '';
    throw new Error('Search Console API エラー: ' + data.error.message + hint);
  }
  return data.rows || [];
}

(async () => {
  const token = await getAccessToken();
  const startDate = ymd(days + 3);
  const endDate = ymd(3);
  console.log(`# 検索クエリ ${startDate}〜${endDate}（${SITE}）\n`);

  const rows = await query(token, { startDate, endDate, dimensions: ['query'], rowLimit, dataState: 'final' });
  const pad = (s, n) => String(s).padStart(n);
  console.log('表示回数  クリック  CTR    平均掲載順位  クエリ');
  for (const r of rows) {
    console.log(`${pad(r.impressions, 7)}  ${pad(r.clicks, 7)}  ${pad((r.ctr * 100).toFixed(1) + '%', 6)}  ${pad(r.position.toFixed(1), 8)}      ${r.keys[0]}`);
  }
  const sum = rows.reduce((a, r) => ({ i: a.i + r.impressions, c: a.c + r.clicks }), { i: 0, c: 0 });
  console.log(`\n上位${rows.length}件の合計: 表示 ${sum.i} / クリック ${sum.c}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
