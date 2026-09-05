#!/usr/bin/env node
/*
 * GA4 + Clarity のレポートをAPI経由で取得して表示するスクリプト。
 * 認証情報は secrets/reporting-config.json と secrets/ga4-service-account.json を参照する（gitには含めない）。
 *
 * 使い方: node scripts/weekly-report.js [日数（省略時7）]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'secrets/reporting-config.json'), 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(path.join(ROOT, config.ga4_service_account_key), 'utf8'));

const days = parseInt(process.argv[2] || '7', 10);

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getGA4AccessToken() {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
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
  if (!data.access_token) throw new Error('GA4トークン取得失敗: ' + JSON.stringify(data));
  return data.access_token;
}

async function runGA4Report(accessToken, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4_property_id}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error('GA4レポート取得失敗: ' + JSON.stringify(data.error));
  return data;
}

function printGA4Rows(title, report) {
  console.log(`\n--- ${title} ---`);
  if (!report.rows || report.rows.length === 0) {
    console.log('  データなし');
    return;
  }
  const dimHeaders = (report.dimensionHeaders || []).map((d) => d.name);
  const metHeaders = (report.metricHeaders || []).map((m) => m.name);
  report.rows.forEach((row) => {
    const dims = (row.dimensionValues || []).map((v) => v.value).join(' / ');
    const mets = (row.metricValues || []).map((v, i) => `${metHeaders[i]}=${v.value}`).join(', ');
    console.log(`  ${dims ? dims + ' : ' : ''}${mets}`);
  });
}

async function getClarityInsights() {
  // Clarity Data Export APIは直近1〜3日分のみ取得可能（それ以上は指定不可）
  const clarityDays = Math.min(days, 3);
  const res = await fetch(
    `https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${clarityDays}`,
    {
      headers: { Authorization: `Bearer ${config.clarity_api_token}` },
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Clarity取得失敗 (${res.status}): ${text}`);
  }
  return res.json();
}

function printClarity(data) {
  console.log(`\n=== Clarity（直近${Math.min(days, 3)}日・API仕様上の上限）===`);
  if (!Array.isArray(data) || data.length === 0) {
    console.log('  データなし');
    return;
  }
  data.forEach((metric) => {
    console.log(`\n--- ${metric.metricName} ---`);
    (metric.information || []).forEach((info) => {
      console.log('  ' + JSON.stringify(info));
    });
  });
}

(async () => {
  const endDate = 'today';
  const startDate = `${days}daysAgo`;

  console.log(`========================================`);
  console.log(` WAGON週次レポート（GA4: 過去${days}日 / Clarity: 過去${Math.min(days, 3)}日）`);
  console.log(`========================================`);

  const accessToken = await getGA4AccessToken();

  const overall = await runGA4Report(accessToken, {
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
    ],
  });
  console.log('\n=== GA4: サイト全体 ===');
  printGA4Rows('全体', overall);

  const quizPage = await runGA4Report(accessToken, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'CONTAINS', value: '/lp/quiz.html' },
      },
    },
  });
  console.log('\n=== GA4: クイズLP（/lp/quiz.html） ===');
  printGA4Rows('ページ別', quizPage);

  const conversions = await runGA4Report(accessToken, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'eventName' }, { name: 'pagePath' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: 'eventName',
              inListFilter: { values: ['generate_lead', 'begin_checkout', 'cta_click'] },
            },
          },
        ],
      },
    },
  });
  console.log('\n=== GA4: コンバージョンイベント（ページ別） ===');
  printGA4Rows('イベント×ページ', conversions);

  const clarity = await getClarityInsights();
  printClarity(clarity);

  console.log('\n完了。');
})().catch((err) => {
  console.error('\nエラーが発生しました:', err.message);
  process.exit(1);
});
