import { Check } from "lucide-react";
import PhraseText from "./PhraseText";
import { recommended } from "@/config/site";

/**
 * セクション7：こんな人におすすめ。
 */
export default function RecommendedSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="recommended-heading">
      <div className="container-lp">
        <h2 id="recommended-heading" className="section-heading text-center">
          <PhraseText text="WAGONはこんな方に｜おすすめです" />
        </h2>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {recommended.map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-card bg-white px-4 py-3 shadow-card"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-300 text-ink">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm text-ink">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
