import { ImageIcon } from "lucide-react";

/**
 * 漫画画像が未配置 / 読み込めない場合のプレースホルダー。
 * 縦長スマホ漫画の比率を保ち、レイアウトが崩れないようにします。
 * ※ 人物や漫画を自動生成することはしません。
 */
export default function MangaPlaceholder({ label }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "漫画画像は準備中です"}
      className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border border-wagon-100 bg-white text-inkSoft"
    >
      <ImageIcon className="h-8 w-8 text-wagon-200" aria-hidden="true" />
      <span className="text-sm">漫画画像は準備中です</span>
    </div>
  );
}
