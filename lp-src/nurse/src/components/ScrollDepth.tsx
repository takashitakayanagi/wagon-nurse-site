"use client";

import { useEffect } from "react";
import { initScrollDepth } from "@/lib/tracking";

/**
 * スクロール到達率（25 / 50 / 75 / 90%）を計測するだけのコンポーネント。
 * 画面には何も描画しません。既存の広告用LPと同じ scroll_depth イベントを送ります。
 */
export default function ScrollDepth() {
  useEffect(() => initScrollDepth(), []);
  return null;
}
