import SafeImage from "./SafeImage";
import { hope, site } from "@/config/site";

/**
 * 転換セクション（不安 → 希望）。
 * 背景を淡い黄色にして感情を切り替える。WAGONちゃんの正式画像を小さく配置。
 */
export default function HopeSection() {
  return (
    <section className="bg-accent-100 py-16" aria-labelledby="hope-heading">
      <div className="container-lp max-w-2xl text-center">
        <div className="mx-auto mb-4 h-20 w-20">
          <SafeImage
            src={site.images.character}
            alt="WAGONちゃん"
            width={80}
            height={80}
            className="mx-auto h-20 w-20 object-contain"
            fallbackLabel="WAGONちゃん画像"
          />
        </div>

        <h2 id="hope-heading" className="section-heading">
          {hope.heading}
        </h2>

        <div className="mt-6 space-y-4">
          {hope.body.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
