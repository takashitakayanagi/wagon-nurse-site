import { steps } from "@/config/site";

/**
 * セクション6：学習開始までの流れ（3ステップ）。
 */
export default function StepsSection() {
  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="steps-heading">
      <div className="container-lp">
        <h2 id="steps-heading" className="section-heading text-center">
          学習開始までの流れ
        </h2>

        <ol className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.no}
              className="relative rounded-card bg-white p-5 pt-8 text-center shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-wagon-500 text-base font-bold text-white shadow-soft"
              >
                {s.no}
              </span>
              <p className="text-xs font-bold text-wagon-600">STEP {s.no}</p>
              <h3 className="mt-1 text-sm font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-inkSoft">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
