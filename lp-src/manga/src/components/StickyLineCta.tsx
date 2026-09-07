import LineButton from "./LineButton";
import { cta } from "@/config/site";

/**
 * スマートフォン用の追従LINEボタン。
 * - スマホでのみ表示（md 以上では非表示）。
 * - ページ最下部が隠れないよう、<main> に `.has-sticky-cta`（padding-bottom）を付与。
 */
export default function StickyLineCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-wagon-100 bg-cream/95 px-4 py-2.5 backdrop-blur md:hidden">
      <LineButton event="line_click_sticky" label={cta.mainLabel} className="py-2.5" />
    </div>
  );
}
