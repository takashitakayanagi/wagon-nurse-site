/**
 * =========================================================================
 *  計測ユーティリティ（GA4 / Meta Pixel / Clarity 共通）
 * =========================================================================
 *  既存の広告用LP（/lp/quiz.html など）とイベント設計を揃えています。
 *  週次レポート（scripts/weekly-report.js）は次のイベント名・パラメータ名で
 *  集計しているため、ここを変えると集計から漏れます。
 *
 *    イベント        : cta_click / generate_lead / contact /
 *                      exam_year_select / scroll_depth
 *    カスタムDimension: cta_location / cta_goal / exam_year / percent_scrolled
 *    全イベント共通   : lp_variant / utm_source / utm_campaign / utm_content
 *
 *  【このLPの主コンバージョン】
 *  「模擬試験のお申込みフォームを開いたこと」です。
 *  LINEで申し込みを受けても結局このフォームを案内することになるため、
 *  申込はフォームで完結させ、LINEは相談・解説講義の入口に回しています。
 *
 *  フォームは外部（Googleフォーム）なので「送信した」ことは計測できません。
 *  クリックを generate_lead（Meta は標準イベント Lead）として扱うため、
 *  実際の申込件数より多めに出ます。フォーム側の回答数と突き合わせて読むこと。
 *
 *  LINEは contact として分け、Meta の Lead は立てません
 *  （広告の最適化信号にフォーム以外を混ぜないため）。
 *  どちらも cta_click は送るので、cta_goal（form / line）で切り分けられます。
 *
 *  このLPは学年（最終学年・既卒 / 低学年）で表示を切り替えるため、
 *  quiz.html と同じく exam_year を全イベントに付けています。
 * =========================================================================
 */

/** このLPの識別子。全イベントに lp_variant として付きます。 */
export const LP_VARIANT = "moshi";

/** CTAの設置位置。GA4のカスタムディメンション cta_location として送ります。 */
export type CtaLocation =
  | "after_manga"
  | "problem"
  | "solution"
  | "grade"
  | "kaisetsu"
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

/* ---------------------------------------------------------------------- *
 * 受験学年
 *  学年ボタンを押すまでは "unknown"。押した時点以降のイベントに付きます。
 *  ページを離れても引き継げるよう sessionStorage に保存します。
 * ---------------------------------------------------------------------- */

const EXAM_YEAR_KEY = "lp_exam_year";

/** "final" = 最終学年・既卒 / "junior" = 1〜3年生 / "unknown" = 未選択 */
export type ExamYear = "final" | "junior" | "unknown";

export function getExamYear(): ExamYear {
  if (typeof window === "undefined") return "unknown";
  try {
    const v = sessionStorage.getItem(EXAM_YEAR_KEY);
    return v === "final" || v === "junior" ? v : "unknown";
  } catch {
    return "unknown";
  }
}

export function setExamYear(value: Exclude<ExamYear, "unknown">): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(EXAM_YEAR_KEY, value);
  } catch {
    /* プライベートモード等で sessionStorage が使えない場合 */
  }
  track("exam_year_select", { exam_year: value });
  try {
    window.clarity?.("set", "exam_year", value);
  } catch {
    /* no-op */
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
    exam_year: getExamYear(),
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
 * 主CTA：模擬試験のお申込みフォームを開いたときの計測。
 * 既存LPと同じく cta_click → generate_lead の順に送り、
 * Meta Pixel には標準イベント Lead、Clarity にはタグを設定します。
 */
export function trackApply(location: CtaLocation, linkUrl = ""): void {
  if (typeof window === "undefined") return;

  const p: TrackParams = {
    cta_location: location,
    cta_goal: "form",
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
    window.clarity?.("set", "goal", "form");
  } catch {
    /* no-op */
  }
}

/**
 * 副導線：LINEを開いたときの計測。
 * 申込ではなく相談なので generate_lead は立てず、contact として分けます。
 * Meta の標準イベント Lead も立てません（申込フォームの信号を薄めないため）。
 */
export function trackLine(location: CtaLocation, linkUrl = ""): void {
  if (typeof window === "undefined") return;

  const p: TrackParams = {
    cta_location: location,
    cta_goal: "line",
    link_url: linkUrl,
  };

  track("cta_click", p);
  track("contact", p);

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
