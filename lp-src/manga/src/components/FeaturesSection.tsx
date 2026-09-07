import { features } from "@/config/site";

/**
 * WAGONの特徴カード（アイコン付き）。
 * WagonIntroduction の中で使用します。
 */
export default function FeaturesSection() {
  return (
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
            <p className="mt-2 text-sm leading-relaxed text-inkSoft">{f.description}</p>
          </div>
        );
      })}
    </div>
  );
}
