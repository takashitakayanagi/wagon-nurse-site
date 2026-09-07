/**
 * =========================================================================
 *  計測ユーティリティ（GA4 / Meta Pixel 共通）
 * =========================================================================
 *  - GA4・Meta Pixel の両方に対応した共通の track 関数を提供します。
 *  - どちらの ID が未設定でもエラーになりません（存在すれば送信）。
 *  - すべての CTA クリックを計測できます。
 * =========================================================================
 */

/** CTA の設置位置ごとのイベント名 */
export type LineClickEvent =
  | "line_click_hero"
  | "line_click_problem"
  | "line_click_feature"
  | "line_click_benefit"
  | "line_click_footer"
  | "line_click_sticky";

type TrackParams = Record<string, string | number | boolean | undefined>;

// GA4 / Meta Pixel のグローバル関数を型として宣言
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * 汎用イベント送信。GA4 と Meta Pixel の両方へ送ります。
 * ID が未設定 / スクリプト未ロードでも安全に no-op になります。
 */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  // --- GA4 ---
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch {
    /* 計測失敗はユーザー体験に影響させない */
  }

  // --- Meta Pixel ---
  try {
    if (typeof window.fbq === "function") {
      // 標準イベントではないため trackCustom を使用
      window.fbq("trackCustom", eventName, params);
    }
  } catch {
    /* no-op */
  }
}

/**
 * LINE 登録ボタン専用のクリック計測ヘルパー。
 */
export function trackLineClick(
  event: LineClickEvent,
  extra: TrackParams = {}
): void {
  track(event, { placement: event.replace("line_click_", ""), ...extra });
}
