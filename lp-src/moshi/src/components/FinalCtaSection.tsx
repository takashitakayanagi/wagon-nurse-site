import SafeImage from "./SafeImage";
import ApplyButton from "./ApplyButton";
import LineTextLink from "./LineTextLink";
import { finalCta, cta, site } from "@/config/site";

/**
 * 最終CTA。WAGONちゃんがLINE登録を案内する構成。
 */
export default function FinalCtaSection() {
  return (
    <section
      className="bg-gradient-to-b from-wagon-500 to-wagon-600 py-16"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-lp">
        <div className="mx-auto max-w-xl text-center text-white">
          <div className="mx-auto mb-4 h-24 w-24">
            <SafeImage
              src={site.images.character}
              alt="WAGONちゃんがLINE登録を案内しています"
              width={96}
              height={96}
              className="mx-auto h-24 w-24 object-contain drop-shadow"
              fallbackLabel="WAGONちゃん画像"
            />
          </div>

          <h2 id="final-cta-heading" className="text-2xl font-bold leading-snug sm:text-3xl">
            {finalCta.heading}
          </h2>

          <div className="mx-auto mt-4 max-w-md space-y-3 text-sm leading-relaxed text-white/90">
            {finalCta.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <ApplyButton cta="footer" label={cta.finalLabel} variant="onDark" />
            <p className="text-xs text-white/90">{finalCta.notes.join("・")}</p>
            <LineTextLink cta="footer" onDark />
          </div>
        </div>
      </div>
    </section>
  );
}
