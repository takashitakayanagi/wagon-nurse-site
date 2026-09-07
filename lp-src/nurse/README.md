# ナース・ライセンススクール WAGON｜公式LINE登録LP

看護師国家試験対策スクール「WAGON」の公式LINE友だち追加を目的とした
ランディングページです。Next.js（App Router）+ TypeScript + Tailwind CSS 製、
スマートフォン最優先・Vercel デプロイ対応。

---

## 1. ローカルでの起動方法

```bash
npm install
cp .env.local.example .env.local   # 環境変数を設定
npm run dev                        # http://localhost:3000
```

本番ビルドの確認：

```bash
npm run build && npm run start
```

---

## 2. LINE URL の設定方法

公式LINEの友だち追加URLは **環境変数 `NEXT_PUBLIC_LINE_URL`** で設定します。

`.env.local`（ローカル）または Vercel の環境変数に設定してください：

```
NEXT_PUBLIC_LINE_URL=https://line.me/R/ti/p/@あなたのLINE-ID
```

- **未設定の場合**：全てのLINEボタンは自動的に無効化され、`#` へは遷移しません。
  ブラウザのコンソールに警告が表示されます（誤動作防止）。

---

## 3. 画像の差し替え方法

`public/images/` に以下を配置してください（詳細は同フォルダの README 参照）。

| ファイル名            | 用途                    | 推奨サイズ         |
| --------------------- | ----------------------- | ------------------ |
| `logo.png`            | ヘッダーロゴ            | 横240px程度・透過PNG |
| `wagon-character.png` | WAGONちゃん画像         | 正方形・透過PNG    |
| `ogp.jpg`             | SNSシェア用OGP画像      | 1200×630px         |

- 画像が無くてもレイアウトは崩れず、中立的なプレースホルダーが表示されます。
- WAGONちゃんは **正式画像のみ** を使用します（CSS/SVGでの再現はしていません）。

---

## 4. GA4 / Meta Pixel の設定方法

環境変数に測定IDを設定するだけで有効になります（未設定でもエラーになりません）。

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

- タグは `src/components/Analytics.tsx` が自動注入します。
- CTAクリックは `src/lib/tracking.ts` の共通 `track()` から GA4・Meta Pixel 両方へ送信。
- 送信イベント名：`line_click_hero` / `line_click_problem` / `line_click_feature`
  / `line_click_benefit` / `line_click_footer` / `line_click_sticky`

---

## 5. Vercel へのデプロイ方法

1. このフォルダを GitHub リポジトリにpush。
2. [Vercel](https://vercel.com/) で「New Project」→ リポジトリを import。
3. Framework は自動で **Next.js** が選択されます（追加設定不要）。
4. **Environment Variables** に以下を設定：
   - `NEXT_PUBLIC_LINE_URL`（必須）
   - `NEXT_PUBLIC_SITE_URL`（本番の公開URL。OGP絶対URLに使用）
   - `NEXT_PUBLIC_GA4_ID`（任意）
   - `NEXT_PUBLIC_META_PIXEL_ID`（任意）
5. Deploy。

---

## 6. 編集用設定ファイル

テキスト・画像・表示ON/OFFなどは **`src/config/site.ts` に集約**しています。
コード側にテキストはハードコードしていません。

主な編集項目：サービス名／運営者名／公式サイトURL／LINE URL／各画像パス／
メインコピー・サブコピー／LINE登録後の案内（`lineBenefits`）／講座カテゴリー
（`videoSection.categories`）／動画URL（`videoSection.videoUrl`）／受講者の声
（`testimonials`）／FAQ（`faqs`）／フッターリンク／注意書き／GA4・Meta Pixel ID／
料金表示ON/OFF（`flags.showPricing`）／受講者の声セクションON/OFF（`flags.showTestimonials`）。

---

## 7. ディレクトリ構成

```
src/
  app/          layout / page / globals.css / privacy / terms / legal / contact / robots / sitemap
  components/   Header, Hero, ProblemSection, SolutionSection, FeaturesSection,
                VideoPreviewSection, LineBenefitsSection, StepsSection, RecommendedSection,
                TestimonialsSection, FaqSection, FinalCtaSection, StickyLineCta, Footer,
                LineButton, SafeImage, Analytics, LegalPage
  config/       site.ts   ← 一括編集ファイル
  lib/          tracking.ts（計測）, video.ts（YouTube/Vimeo埋め込み）
public/images/  logo.png / wagon-character.png / ogp.jpg（配置してください）
```
