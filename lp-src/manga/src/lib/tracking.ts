/**
 * =========================================================================
 *  計測ユーティリティ（GA4 / Meta Pixel / Clarity 共通）
 * =========================================================================
 *  既存の広告用LP（/lp/quiz.html など）とイベント設計を揃えています。
 *  週次レポート（scripts/weekly-report.js）は次のイベント名・パラメータ名で
 *  集計しているため、ここを変えると集計から漏れます。
 *
 *    イベント        : cta_click / generate_lead / scroll_depth
 *    カスタムDimension: cta_location / exam_year / percent_scrolled
 *    全イベント共通   : lp_variant / utm_source / utm_campaign / utm_content
 * =========================================================================
 */

/** このLPの識別子。全イベントに lp_variant として付きます。 */
export const LP_VARIANT = "manga";

/** CTAの設置位置。GA4のカスタムディメンション cta_location として送ります。 */
export type CtaLocation =
  | "after_manga"
  | "problem"
  | "solution"
  | "benefits"
  | "footer"
  | "sticky";

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * 流入元（utm_*）。既存LPと同じく、初回アクセス時に sessionStorage へ保存し、
 * ページ内を移動してパラメータが落ちても引き継ぎます。
 */
function getSource(): TrackParams {
  if (typeof window === "undefined") return {};

  try {
    const q = new URLSearchParams(window.location.search);
    const s: TrackParams = {
      utm_source: q.get("utm_source") ?? "",
      utm_medium: q.get("utm_medium") ?? "",
      utm_campaign: q.get("utm_campaign") ?? "",
      utm_content: q.get("utm_content") ?? "",
    };

    if (s.utm_source) {
      sessionStorage.setItem("lp_src", JSON.stringify(s));
      return s;
    }

    const saved = sessionStorage.getItem("lp_src");
    return saved ? (JSON.parse(saved) as TrackParams) : s;
  } catch {
    /* プライベートモード等で sessionStorage が使えない場合 */
    return {};
  }
}

/**
 * 汎用イベント送信。GA4 と Meta Pixel の両方へ送ります。
 * ID 未設定 / スクリプト未ロードでも安全に no-op になります。
 */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  const payload: TrackParams = {
    lp_variant: LP_VARIANT,
    // このLPには受験学年の出し分けが無いため、既存LPと形式だけ揃えて固定値。
    exam_year: "unknown",
    ...getSource(),
    ...params,
  };

  try {
    window.gtag?.("event", eventName, payload);
  } catch {
    /* 計測の失敗はユーザー体験に影響させない */
  }

  try {
    window.fbq?.("trackCustom", eventName, payload);
  } catch {
    /* 同上 */
  }
}

/**
 * CTA（LINE登録ボタン）のクリック計測。
 * 既存LPと同じく cta_click → generate_lead の順に送り、
 * Meta Pixel には標準イベント Lead、Clarity にはタグを設定します。
 */
export function trackCta(location: CtaLocation, linkUrl = ""): void {
  if (typeof window === "undefined") return;

  const p: TrackParams = {
    cta_location: location,
    cta_goal: "line",
    link_url: linkUrl,
  };

  track("cta_click", p);
  track("generate_lead", p);

  try {
    window.fbq?.("track", "Lead", { content_name: location });
  } catch {
    /* no-op */
  }

  try {
    window.clarity?.("set", "cta", location);
    window.clarity?.("set", "goal", "line");
  } catch {
    /* no-op */
  }
}

/**
 * スクロール到達率。既存LPと同じく 25 / 50 / 75 / 90% で1回ずつ送ります。
 * 戻り値はイベントリスナーの解除関数です。
 */
export function initScrollDepth(): () => void {
  if (typeof window === "undefined") return () => {};

  const hit: Record<number, boolean> = {};

  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;

    const pct = Math.round((window.scrollY / h) * 100);
    [25, 50, 75, 90].forEach((m) => {
      if (pct >= m && !hit[m]) {
        hit[m] = true;
        track("scroll_depth", { percent_scrolled: m });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
