"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "onError"> & {
  /** 画像が無い/読み込めない場合に表示する代替テキスト */
  fallbackLabel?: string;
};

/**
 * next/image のラッパー。
 * 画像が存在しない場合でもレイアウトを崩さず、
 * 中立的なプレースホルダー（人物を描かない）を表示します。
 *
 * ※ WAGONちゃんの顔・髪型を CSS/SVG で再現することはしません。
 *    正式画像が配置されるまでは無地のプレースホルダーのみを表示します。
 */
export default function SafeImage({
  fallbackLabel = "画像を準備中",
  alt,
  className,
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt : fallbackLabel}
        className={`flex items-center justify-center rounded-2xl border border-dashed border-wagon-200 bg-wagon-50 text-center text-xs text-inkSoft ${
          className ?? ""
        }`}
        style={{
          width: props.fill ? "100%" : props.width,
          height: props.fill ? "100%" : props.height,
        }}
      >
        <span className="px-2">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
