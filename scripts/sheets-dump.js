#!/usr/bin/env node
/*
 * Googleスプレッドシートの構造を読み取って表示する（読み取り専用・書き込みは一切しない）スクリプト。
 * 認証は weekly-report.js と同じサービスアカウント鍵を使う（secrets/ 配下・gitには含めない）。
 *
 * 事前準備:
 *   1. サービスアカウントの Google Cloud プロジェクトで Google Sheets API を有効化
 *   2. 対象シートを サービスアカウントのメール（secrets/ の鍵ファイルの client_email）に「閲覧者」で共有
 *
 * 使い方: node scripts/sheets-dump.js <シートのURLまたはID> [--sample N]
 *   既定では「タブ名・見出し行・行数」だけを表示する。
 *   --sample N を付けたときだけ、中身をN行表示する（講師名などの個人情報が出るので既定はオフ）。
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'secrets/reporting-config.json'), 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(path.join(ROOT, config.ga4_service_account_key), 'utf8'));

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const sampleIdx = args.indexOf('--sample');
const sampleRows = sampleIdx >= 0 ? parseInt(args[sampleIdx + 1] || '3', 10) : 0;

if (!target) {
  console.error('シートのURLまたはIDを指定してください。\n  例: node scripts/sheets-dump.js https://docs.google.com/spreadsheets/d/XXXX/edit');
  process.exit(1);
}

// URLでもIDでも受け付ける
const spreadsheetId = (target.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/) || [null, target])[1];

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getAccessToken() {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const signingInput = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(claim));
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

async function api(token, url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  if (data.error) {
    const m = data.error.message || JSON.stringify(data.error);
    if (/Google Sheets API has not been used|SERVICE_DISABLED/.test(m)) {
      throw new Error('Sheets APIが有効になっていません。Google Cloudコンソールで有効化してください。\n  ' + m);
    }
    if (data.error.code === 403 || data.error.code === 404) {
      throw new Error(
        'シートにアクセスできません。次のアドレスに閲覧権限で共有されているか確認してください:\n  ' +
          serviceAccount.client_email + '\n  ' + m
      );
    }
    throw new Error(m);
  }
  return data;
}

(async () => {
  const token = await getAccessToken();

  const meta = await api(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties`
  );

  console.log(`\n=== ${meta.properties.title} ===`);
  console.log(`タブ数: ${meta.sheets.length}\n`);

  for (const s of meta.sheets) {
    const p = s.properties;
    const range = encodeURIComponent(`${p.title}!A1:ZZ${1 + Math.max(sampleRows, 0)}`);
    let values = [];
    try {
      const v = await api(
        token,
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`
      );
      values = v.values || [];
    } catch (e) {
      console.log(`--- ${p.title} --- (読み取り失敗: ${e.message})`);
      continue;
    }

    console.log(`--- ${p.title} ---`);
    console.log(`  グリッド: ${p.gridProperties.rowCount}行 × ${p.gridProperties.columnCount}列`);
    const headers = values[0] || [];
    console.log(`  見出し(${headers.length}列): ${headers.map((h, i) => `[${i}]${h}`).join(' | ') || '(空)'}`);
    if (sampleRows > 0) {
      values.slice(1).forEach((row, i) => console.log(`  行${i + 2}: ${row.join(' | ')}`));
    }
    console.log('');
  }

  console.log('※ このスクリプトは読み取り専用です。シートには一切書き込みません。');
})().catch((e) => {
  console.error('\nエラー: ' + e.message);
  process.exit(1);
});
