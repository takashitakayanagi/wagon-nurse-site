import LineButton from "./LineButton";
import { problems, cta } from "@/config/site";

/**
 * 悩みへの共感（吹き出し／カード形式）。
 * 6項目程度を表示。残りは config の problems 配列で入れ替え可能。
 */
export default function ProblemSection() {
  const shown = problems.slice(0, 6);

  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="problem-heading">
      <div className="container-lp">
        <h2 id="problem-heading" className="section-heading text-center">
          看護学生から、こんな声をよく聞きます
        </h2>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {shown.map((text, i) => (
            <li
              key={i}
              className="relative rounded-2xl rounded-bl-sm bg-white px-4 py-4 shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 bg-white"
              />
              <p className="flex items-start gap-2 text-sm leading-relaxed text-ink">
                <span aria-hidden="true">💬</span>
                <span>{text}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-2">
          <LineButton event="line_click_problem" label={cta.mainLabel} />
          <p className="text-xs text-inkSoft">{cta.notesFree}</p>
        </div>
      </div>
    </section>
  );
}
