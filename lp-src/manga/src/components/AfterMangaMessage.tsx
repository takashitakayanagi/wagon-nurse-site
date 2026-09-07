import LineButton from "./LineButton";
import PhraseText from "./PhraseText";
import { afterManga, cta } from "@/config/site";

/**
 * 漫画直後の語りかけセクション。
 * 責める印象ではなく「あなた一人だけではない」という共感を重視。
 * 漫画の直後（＝漫画の途中ではない）に最初のCTAを配置。
 */
export default function AfterMangaMessage() {
  return (
    <section className="bg-cream py-14" aria-labelledby="after-manga-heading">
      <div className="container-lp max-w-2xl">
        <h2 id="after-manga-heading" className="section-heading text-center">
          <PhraseText text={afterManga.heading} />
        </h2>

        <div className="mt-6 space-y-4 text-center">
          {afterManga.body.map((p, i) => (
            <p key={i} className="jp-body text-sm leading-relaxed text-ink sm:text-base">
              <PhraseText text={p} />
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <LineButton event="line_click_after_manga" label={cta.mainLabel} />
          <p className="text-xs text-inkSoft">{cta.notesFree}</p>
        </div>
      </div>
    </section>
  );
}
