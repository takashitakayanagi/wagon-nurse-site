"use client";

import { ClipboardCheck } from "lucide-react";
import { site } from "@/config/site";
import { trackApply, type CtaLocation } from "@/lib/tracking";

type Variant = "primary" | "onDark";

type Props = {
  /** CTAの設置位置。GA4に cta_location として送られます。 */
  cta: CtaLocation;
  label: string;
  variant?: Variant;
  className?: string;
};

/**
 * 主CTA：模擬試験の個人お申込みフォーム（Googleフォーム）へ。
 *
 * LINEで申し込みを受けても結局このフォームを案内することになるため、
 * 申し込みはここで完結させます。LINEは相談・復習の入口として別に置きます。
 *
 * ※ フォームは外部サイトなので「送信した」ことは計測できません。
 *   このクリックを主コンバージョン（generate_lead / Meta の Lead）として扱います。
 */
export default function ApplyButton({
  cta: location,
  label,
  variant = "primary",
  className = "",
}: Props) {
  const url = site.applyFormUrl?.trim();

  const base =
    "inline-flex min-h-[56px] w-full max-w-md items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-soft transition-transform active:scale-[0.98] sm:text-lg";

  const skin =
    variant === "onDark"
      ? "bg-white text-cta-600 hover:bg-cream"
      : "bg-cta-500 text-white hover:bg-cta-600";

  if (!url) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="申し込みフォームの URL が未設定です"
        className={`${base} ${skin} cursor-not-allowed opacity-60 ${className}`}
      >
        <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackApply(location, url)}
      className={`${base} ${skin} ${className}`}
      data-cta={location}
    >
      <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
