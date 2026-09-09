import { voices, voicesHeading } from "@/config/site";

/**
 * 解説講義を受けた人の声。
 * カードに出すのは、wagon-nurse.com/moshi_kaisetsu.html に載っている
 * 受講生コメントから連続した一節をそのまま抜き出したもの（`excerpt`）。
 * 言い換え・つなぎ合わせはせず、原文は config の `full` に残してあります。
 * 「◯％が分かりやすいと回答」のような集計値は確定情報が無いので出しません。
 */
export default function VoicesSection() {
  return (
    <section className="bg-accent-100 py-14" aria-labelledby="voices-heading">
      <div className="container-lp max-w-2xl">
        <h2 id="voices-heading" className="section-heading text-center">
          {voicesHeading}
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {voices.map((v, i) => (
            <li key={i} className="rounded-card bg-white px-5 py-5 shadow-card">
              <blockquote className="jp-body text-sm font-bold leading-relaxed text-ink">
                「{v.excerpt}」
              </blockquote>
              <p className="mt-3 text-xs font-bold text-wagon-600">{v.who}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
