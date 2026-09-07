import { testimonials, site } from "@/config/site";

/**
 * セクション8：受講者の声。
 * - flags.showTestimonials が false の場合は非表示。
 * - 初期状態（testimonials が空）では架空の体験談を出さず、
 *   「準備中」メッセージを表示します。
 * - 実際の声は、運営者が掲載許可と内容を確認したうえで config に追加してください。
 */
export default function TestimonialsSection() {
  if (!site.flags.showTestimonials) return null;

  const hasTestimonials = testimonials.length > 0;

  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="testimonials-heading">
      <div className="container-lp">
        <h2 id="testimonials-heading" className="section-heading text-center">
          受講者の声
        </h2>

        {hasTestimonials && site.flags.testimonialsAreSample ? (
          <p className="mx-auto mt-3 max-w-md text-center text-xs text-inkSoft">
            ※ 掲載イメージ（サンプル）です。実際の受講者の声は、掲載許可を得たうえで順次掲載します。
          </p>
        ) : null}

        {hasTestimonials ? (
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-card bg-white p-5 shadow-card"
              >
                <blockquote className="text-sm leading-relaxed text-ink">
                  「{t.body}」
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-wagon-600">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-md rounded-card border border-dashed border-wagon-200 bg-white p-8 text-center">
            <p className="text-sm text-inkSoft">
              実際の感想は準備ができ次第掲載します。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
