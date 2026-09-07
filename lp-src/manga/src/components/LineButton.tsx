"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { trackCta, type CtaLocation } from "@/lib/tracking";

type Variant = "primary" | "onDark";

type Props = {
  /** CTAの設置位置。GA4に cta_location として送られます。 */
  cta: CtaLocation;
  label: string;
  variant?: Variant;
  className?: string;
};

/**
 * LINE 登録ボタン（共通コンポーネント）。
 * - URL は config（= 環境変数 NEXT_PUBLIC_LINE_URL）から取得。
 * - 未設定の場合は遷移させず、コンソール警告 + ボタン無効化。
 * - クリックは GA4 / Meta Pixel の両方へ計測。
 */
export default function LineButton({
  cta,
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

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="LINE の URL が未設定です"
        className={`${base} ${skin} cursor-not-allowed opacity-60 ${className}`}
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
      onClick={() => trackCta(cta, url)}
      className={`${base} ${skin} ${className}`}
      data-cta={cta}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
