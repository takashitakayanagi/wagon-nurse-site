import LineButton from "./LineButton";
import { cta, freeKaisetsu, kaisetsu, site } from "@/config/site";

/**
 * 模試解説講義の案内。
 * 出すのは「無料解説講義の日程」と、買い切りの講義が「あること」まで。
 * 買い切りの価格は site.flags.showKaisetsuPricing = false で非表示（金額はLINEで案内）。
 * 無料の案内と価格を並べると、どちらが本題か分からなくなるため。
 * 日程は運営提供の2026年度スケジュールどおり。勝手に足さないこと。
 */
export default function KaisetsuSection() {
  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="kaisetsu-heading">
      <div className="container-lp max-w-2xl">
        <h2 id="kaisetsu-heading" className="section-heading text-center">
          {kaisetsu.heading}
        </h2>

        <p className="mt-6 text-center text-sm font-bold text-wagon-600">
          {freeKaisetsu.heading}
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {freeKaisetsu.items.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="rounded-card bg-white px-4 py-4 text-center shadow-card"
            >
              <p className="text-sm font-bold leading-snug text-ink">{f.name}</p>
              <p className="mt-2 text-base font-bold text-wagon-600">{f.date}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-ink">{kaisetsu.body}</p>

        {site.flags.showKaisetsuPricing ? (
          <>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {kaisetsu.items.map((k) => (
                <li
                  key={k.name}
                  className="rounded-card bg-white px-4 py-4 text-center shadow-card"
                >
                  <p className="min-h-[2.5rem] text-sm font-bold leading-snug text-ink">
                    {k.name}
                  </p>
                  <p className="mt-2 text-xl font-bold text-wagon-600">{k.price}</p>
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-1 text-[11px] leading-relaxed text-inkSoft">
              {kaisetsu.notes.map((n, i) => (
                <li key={i}>※ {n}</li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-2">
          <LineButton cta="kaisetsu" label={cta.kaisetsuLabel} />
          <p className="text-xs text-inkSoft">{cta.notesReply}</p>
        </div>
      </div>
    </section>
  );
}
