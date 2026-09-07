# public/images/manga に配置する漫画画像

漫画のコマ画像をここに配置してください。ファイルが無い場合でも
レイアウトは崩れず「漫画画像は準備中です」プレースホルダーが表示されます。

## 初期のファイル名（config の mangaSlides に対応）

```
manga-01.webp
manga-02.webp
manga-03.webp
manga-04.webp
manga-05.webp
manga-06.webp
```

## 推奨仕様

- 形式：webp（軽量。jpg/png でも可。その場合は `src/config/site.ts` の拡張子を変更）
- 向き：縦長（スマホ向け）
- 横幅：720〜1080px 程度（横幅いっぱいに表示され、比率は自動維持）
- 1枚 = 1コマ（縦に積み重ねて表示されます）

## 枚数を変える / 差し替える

`src/config/site.ts` の `mangaSlides` 配列を編集してください。
`asset()` はサブディレクトリ配信（/lp/manga）用の接頭辞を付けるヘルパーです。必ず通してください。
配列の要素数がそのまま表示枚数になります（追加・削除・並び替え可能）。

```ts
export const mangaSlides = [
  { src: asset("/images/manga/manga-01.webp"), alt: "説明文" },
  // ...
];
```
