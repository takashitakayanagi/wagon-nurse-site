# WAGON 漫画ストーリー型LP（公式LINE登録）

看護師国家試験対策スクール「WAGON」の公式LINE友だち追加を目的とした、
**漫画導入 → 共感 → 希望 → WAGON紹介 → LINE登録** の感情設計のLPです。
Next.js（App Router）+ TypeScript + Tailwind CSS 製、スマホ最優先。

---

## 1. ローカル起動方法

```bash
npm install
cp .env.local.example .env.local   # 環境変数を設定
npm run dev                        # http://localhost:3000
```

本番相当の確認：

```bash
npm run build && npm run start
```

---

## 2. 漫画画像の追加・差し替え方法

1. 画像を `public/images/manga/` に配置（例：`manga-01.webp` …）
2. `src/config/site.ts` の `mangaSlides` 配列の `src` と `alt` を合わせる

画像が無い間は「漫画画像は準備中です」プレースホルダーが表示されます。
形式は webp 推奨（jpg/png も可。その場合は `src` の拡張子を変更）。

## 3. 漫画の枚数を変更する方法

`src/config/site.ts` の `mangaSlides` 配列の**要素数がそのまま表示枚数**です。
要素を足す/削る/並び替えるだけで反映されます（6〜10枚程度を想定）。

---

## 4. LINE URL の設定方法

環境変数 `NEXT_PUBLIC_LINE_URL` に友だち追加URLを設定します。

```
NEXT_PUBLIC_LINE_URL=https://line.me/R/ti/p/@あなたのLINE-ID
```

未設定の場合、全LINEボタンは自動で**無効化**され、`#` へは遷移しません
（コンソールに警告を表示）。

## 5. WAGONちゃん画像の差し替え方法

`public/images/wagon-character.png` を差し替えてください（正式画像のみ使用）。
無い場合はプレースホルダー表示になります。CSS/SVGでの再現や別キャラ代用はしません。

---

## 6. GA4 / Meta Pixel の設定方法

環境変数に ID を設定するだけで有効化されます（未設定でもエラーになりません）。

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

CTAクリックは `src/lib/tracking.ts` の共通 `track()` から GA4・Meta Pixel 両方へ送信。
イベント名：`line_click_after_manga` / `line_click_problem` / `line_click_solution`
/ `line_click_benefits` / `line_click_footer` / `line_click_sticky`

---

## 7. Vercel へのデプロイ

1. GitHub リポジトリに push
2. Vercel で「New Project」→ import（Next.js 自動認識）
3. 環境変数を設定：`NEXT_PUBLIC_LINE_URL`（必須）/ `NEXT_PUBLIC_SITE_URL` /
   `NEXT_PUBLIC_GA4_ID`（任意）/ `NEXT_PUBLIC_META_PIXEL_ID`（任意）
4. Deploy

---

## 8. 編集用設定ファイル

`src/config/site.ts` に集約：サービス名／公式サイトURL／LINE URL／各画像／
`mangaSlides`（漫画）／各セクション文言／`problems`／`features`／
`videoSection`（カテゴリー・動画URL）／`lineBenefits`／`faqs`／フッターリンク／
注意書き／GA4・Meta Pixel ID／表示フラグ（`showManga` / `showPricing` / `showTestimonials`）。
価格は初期非表示（`showPricing: false`）。
