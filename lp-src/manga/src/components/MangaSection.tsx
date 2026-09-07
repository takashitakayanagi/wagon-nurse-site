"use client";

import Image from "next/image";
import { useState } from "react";
import { mangaSlides, site, type MangaSlide } from "@/config/site";
import MangaPlaceholder from "./MangaPlaceholder";

/**
 * セクション1：漫画導入。
 * - ページ最上部に配置。見出しは漫画より上に置かない。
 * - 画像を1枚ずつ縦に並べる（縦スクロール／スワイプではない）。
 * - 横幅いっぱい・角丸・薄いピンクの枠線・画像比率を維持。
 * - 漫画の途中にCTAは入れない。
 * - 画像が無い場合は「漫画画像は準備中です」を表示。
 * - 背景はシンプル（装飾・アニメーションを重ねない）。
 */
export default function MangaSection() {
  if (!site.flags.showManga) return null;

  const slides = mangaSlides;

  return (
    <section className="bg-white py-6" aria-label="看護学生の国試勉強にまつわる漫画">
      <div className="mx-auto w-full max-w-[520px] px-4">
        {slides.length === 0 ? (
          <MangaPlaceholder />
        ) : (
          <div className="flex flex-col gap-4">
            {slides.map((slide, i) => (
              <MangaImage key={i} slide={slide} index={i} priority={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * 1コマ分の漫画画像。読み込み失敗時はプレースホルダーへ差し替え。
 */
function MangaImage({
  slide,
  index,
  priority,
}: {
  slide: MangaSlide;
  index: number;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <MangaPlaceholder label={slide.alt} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-wagon-100">
      <Image
        src={slide.src}
        alt={slide.alt}
        // 実際の比率は h-auto で維持。下記は CLS 防止用の目安値（現行画像は 1040x1040 の正方形）。
        width={1040}
        height={1040}
        sizes="(max-width: 520px) 100vw, 520px"
        className="h-auto w-full"
        priority={priority}
        onError={() => setFailed(true)}
      />
      <span className="sr-only">{`漫画 ${index + 1}`}</span>
    </div>
  );
}
