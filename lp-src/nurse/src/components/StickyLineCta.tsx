import LineButton from "./LineButton";
import { hero } from "@/config/site";

/**
 * セクション13：スマートフォン用の追従LINEボタン。
 * - スマホでのみ表示（md 以上では非表示）。
 * - ページ最下部のコンテンツが隠れないよう、
 *   <main> 側に `.has-sticky-cta`（padding-bottom）を付与しています。
 */
export default function StickyLineCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-wagon-100 bg-cream/95 px-4 py-2.5 backdrop-blur md:hidden">
      <LineButton
        cta="sticky"
        label={hero.ctaLabel}
        className="py-2.5"
      />
    </div>
  );
}
