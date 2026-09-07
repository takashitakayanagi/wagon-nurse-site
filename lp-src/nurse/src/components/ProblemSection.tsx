import LineButton from "./LineButton";
import PhraseText from "./PhraseText";
import { problems } from "@/config/site";

/**
 * セクション1：看護学生の悩みへの共感（会話風カード）。
 */
export default function ProblemSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="problem-heading">
      <div className="container-lp">
        <h2 id="problem-heading" className="section-heading text-center">
          <PhraseText text="こんな不安を｜抱えていませんか？" />
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-inkSoft">
          国試勉強でよく聞く「もやもや」を集めました。ひとつでも当てはまったら、読み進めてみてください。
        </p>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {problems.map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-card bg-white px-4 py-4 shadow-card"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-wagon-100 text-sm"
              >
                💭
              </span>
              <p className="text-sm leading-relaxed text-ink">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-2">
          <LineButton cta="problem" label="まずはLINEで相談してみる" />
          <p className="text-xs text-inkSoft">登録無料・いつでも解除できます</p>
        </div>
      </div>
    </section>
  );
}
