import LineButton from "./LineButton";
import FeaturesSection from "./FeaturesSection";
import { wagonIntroHeading, cta } from "@/config/site";

/**
 * WAGONの紹介。見出し＋特徴カード（FeaturesSection）＋CTA。
 */
export default function WagonIntroduction() {
  return (
    <section className="bg-cream py-14" aria-labelledby="intro-heading">
      <div className="container-lp">
        <h2 id="intro-heading" className="section-heading text-center">
          {wagonIntroHeading}
        </h2>

        <FeaturesSection />

        <div className="mt-10 flex flex-col items-center gap-2">
          <LineButton cta="solution" label={cta.mainLabel} />
          <p className="text-xs text-inkSoft">{cta.notesOptional}</p>
        </div>
      </div>
    </section>
  );
}
