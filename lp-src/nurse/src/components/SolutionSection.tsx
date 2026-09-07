import SafeImage from "./SafeImage";
import PhraseText from "./PhraseText";
import { solution, site } from "@/config/site";

/**
 * セクション2：WAGONならどう解決できるか。
 */
export default function SolutionSection() {
  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="solution-heading">
      <div className="container-lp">
        <div className="mx-auto max-w-2xl rounded-card bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 flex-none">
              <SafeImage
                src={site.images.character.reading}
                alt="WAGONちゃん"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                fallbackLabel="WAGON"
              />
            </div>
            <h2 id="solution-heading" className="section-heading text-xl sm:text-2xl">
              <PhraseText text={solution.heading} />
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {solution.body.map((p, i) => (
              <p key={i} className="jp-body text-sm leading-relaxed text-ink sm:text-base">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
