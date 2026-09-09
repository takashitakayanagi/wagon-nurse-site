"use client";

import { MessageCircle } from "lucide-react";
import { site, cta } from "@/config/site";
import { trackLine, type CtaLocation } from "@/lib/tracking";

type Props = {
  cta: CtaLocation;
  /** 濃い背景の上に置く場合は true */
  onDark?: boolean;
  /** 文言を変えたいとき（既定は「どの模試を受けるか迷ったらLINEで相談」） */
  label?: string;
};

/**
 * 主CTA（申し込みフォーム）の下に置く、LINEへの控えめなリンク。
 *
 * 申し込みそのものはフォームで完結するので、ここは
 * 「まだ受ける模試を決められない人」の逃げ道です。
 * ボタンにすると主CTAと競合するため、テキストリンクにしています。
 */
export default function LineTextLink({ cta: location, onDark = false, label }: Props) {
  if (!site.flags.showLineSubLink) return null;

  const url = site.lineUrl?.trim();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLine(location, url)}
      className={`inline-flex items-center gap-1 text-xs underline underline-offset-4 ${
        onDark ? "text-white/80 hover:text-white" : "text-inkSoft hover:text-wagon-600"
      }`}
      data-cta={`${location}_line`}
    >
      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label ?? cta.lineLinkLabel}</span>
    </a>
  );
}
