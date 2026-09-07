"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { trackLineClick, type LineClickEvent } from "@/lib/tracking";

type Variant = "primary" | "onDark";

type Props = {
  /** 計測イベント名（設置位置ごとに変える） */
  event: LineClickEvent;
  /** ボタン文言 */
  label: string;
  /** 見た目のバリエーション */
  variant?: Variant;
  /** 追加のクラス */
  className?: string;
};

/**
 * LINE 登録ボタン（共通コンポーネント）。
 * - URL は config（= 環境変数 NEXT_PUBLIC_LINE_URL）から取得。
 * - 未設定の場合は「#」へ遷移させず、コンソール警告 + ボタン無効化。
 * - クリックは GA4 / Meta Pixel の両方へ計測。
 */
export default function LineButton({
  event,
  label,
  variant = "primary",
  className = "",
}: Props) {
  const [ready, setReady] = useState(false);
  const url = site.lineUrl?.trim();
  const disabled = !url;

  useEffect(() => {
    setReady(true);
    if (disabled) {
      // 未設定を開発者に知らせる
      // eslint-disable-next-line no-console
      console.warn(
        "[WAGON LP] LINE の URL が未設定です。環境変数 NEXT_PUBLIC_LINE_URL を設定してください。ボタンは無効化されています。"
      );
    }
  }, [disabled]);

  const base =
    "inline-flex min-h-[56px] w-full max-w-md items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-soft transition-transform active:scale-[0.98] sm:text-lg";

  const skin =
    variant === "onDark"
      ? "bg-white text-line-dark hover:bg-cream"
      : "bg-line text-white hover:bg-line-dark";

  const disabledSkin = "cursor-not-allowed opacity-60";

  const handleClick = () => {
    trackLineClick(event);
  };

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="LINE の URL が未設定です"
        className={`${base} ${skin} ${disabledSkin} ${className}`}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={ready ? url : undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${base} ${skin} ${className}`}
      data-event={event}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
