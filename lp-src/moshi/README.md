# WAGON 模試LP（漫画ストーリー型）

> 別セッションから引き継ぐときは、まず [HANDOFF.md](HANDOFF.md) を読んでください。
> 設計判断の理由・載せてよい事実の範囲・残タスクがまとまっています。

WAGON模擬試験の申し込み（＝公式LINEでの相談）を目的としたLPです。
**漫画導入 → 共感 → 受けっぱなしのリスク → 転換 → 模試でできること →
学年で出し分け → 解説講義 → LINE → 流れ → FAQ → 最終CTA** の構成。
Next.js（App Router）+ TypeScript + Tailwind CSS 製、スマホ最優先。

`lp-src/manga`（毎日1問のLP）と同じ作りですが、
**内容・計測ID（`lp_variant="moshi"`）・学年の出し分けが別物**です。

---

## 1. 画像は後から入れられます

漫画のコマ画像が1枚も無い状態でも、このLPは完成品として動きます。
未配置のコマは「漫画画像は準備中です」プレースホルダーになり、レイアウトは崩れません。

絵ができたら `public/images/manga/` に `manga-01.webp` … と置くだけで差し替わります。
各コマの場面と推奨仕様は [`public/images/manga/README.md`](public/images/manga/README.md) を参照してください。

枚数を変えるときは `src/config/site.ts` の `mangaSlides` 配列を編集します
（**配列の要素数＝表示枚数**）。

---

## 2. ローカル起動方法

```bash
npm install
cp .env.local.example .env.local   # 環境変数を設定
npm run dev                        # http://localhost:3000
```

本番相当（静的書き出し）の確認：

```bash
npm run build      # out/ に書き出されます
```

---

## 3. 文言・価格の直し方

LP上のテキスト・画像・表示フラグは **すべて `src/config/site.ts`** にあります。
コンポーネント側に文言はハードコードしていません。

主なもの：

| 直したいもの | 場所 |
|---|---|
| 漫画のコマ数・alt | `mangaSlides` |
| 漫画直後の語りかけ | `afterManga`（`｜` は改行してよい位置） |
| 学年ごとの案内・対象模試 | `gradeBranch` |
| 国試日（カウントダウン） | `examDate` |
| 無料解説講義の日程 | `freeKaisetsu.items` |
| 解説講義の価格（このLPでは非表示） | `kaisetsu.items` |
| CTAの文言 | `cta` |
| FAQ | `faqs` |

### 注意（勝手に足さないもの）

- **模試の実施日程** … サイト上に公開情報が無いため、LPには書かず「LINEでご案内します」に留めています。
- **サブスクWAGONの月額** … このLPには出しません。
- **解剖到達度チェック／疾患到達度チェック** … 学校受験専用のため、個人向けのこのLPには載せません。
- 低学年（1〜3年生）を選んだ人には、**国試までのカウントダウンを表示しません**（`gradeBranch.junior.showCountdown = false`）。

---

## 4. 導線と計測

**主CTAは模擬試験のお申込みフォーム**（Googleフォーム）です。
LINEで申し込みを受けても結局このフォームを案内することになるので、申込はフォームで完結させています。

LINEは申込の代わりではなく、**別の用事**のために残しています。
同じ用事で2つのボタンを並べないための切り分けです。

| 場所 | ボタン | 行き先 |
|---|---|---|
| 漫画直後 / WAGON紹介 / 学年分岐 / 最終CTA / 追従 | 無料で模試に申し込む | フォーム |
| 悩みセクション（2つめ） | 無料解説講義についてLINEで聞く | LINE |
| 漫画直後 / 学年分岐 / 最終CTA のボタン下（小さいテキストリンク） | どの模試を受けるか迷ったらLINEで相談 | LINE |

小さいテキストリンクを消してフォーム一本にしたい場合は `site.flags.showLineSubLink = false`。
| 解説講義セクション | 無料解説講義をLINEで聞いてみる | LINE |
| LINEセクション | LINEで相談してみる | LINE |

計測：

- フォームのクリック → `cta_click` + `generate_lead` + Meta の標準イベント `Lead`（`cta_goal="form"`）
- LINEのクリック → `cta_click` + `contact`（`cta_goal="line"`）。**Meta の `Lead` は立てません**（広告の最適化信号にフォーム以外を混ぜないため）
- 学年ボタン → `exam_year_select`。以降の全イベントに `exam_year`（`final` / `junior`）が付きます

⚠️ **フォームは外部サイトなので「送信した」ことは計測できません。**
`generate_lead` はクリック数なので、実際の申込件数より多く出ます。
勝ち負けを見るときは Googleフォーム側の回答数と突き合わせること。

⚠️ **フォーム経由だとLINEの友だちが増えません。**
成績が返ったあとの解説講義・サブスクにつなげる経路が要るので、
Googleフォームの確認メッセージにLINEの友だち追加URLを入れておくこと（フォーム側の設定・このLPの管轄外）。

環境変数は `.env.local.example` を参照。本番の値は
`.github/workflows/pages.yml` の「Build 模試LP -> /lp/moshi/」ステップにあります。

---

## 5. 公開

`main` に push すると GitHub Actions が `out/` を `site/lp/moshi/` に書き出して配信します。
公開URLは `https://wagon-nurse.com/lp/moshi/`。
広告用LPのため `robots: noindex` を入れてあり、検索結果には出ません。
