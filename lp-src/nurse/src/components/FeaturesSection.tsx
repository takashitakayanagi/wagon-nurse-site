import LineButton from "./LineButton";
import { features } from "@/config/site";

/**
 * セクション3：WAGONの特徴（アイコン付きカード）。
 */
export default function FeaturesSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="features-heading">
      <div className="container-lp">
        <h2 id="features-heading" className="section-heading text-center">
          WAGONの特徴
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-inkSoft">
          「わかる」から「続く」へ。国試対策を無理なく進めるための工夫があります。
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-card border border-wagon-100 bg-white p-5 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-200">
                  <Icon className="h-6 w-6 text-wagon-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inkSoft">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <LineButton event="line_click_feature" label="LINEで国試対策を始める" />
        </div>
      </div>
    </section>
  );
}
