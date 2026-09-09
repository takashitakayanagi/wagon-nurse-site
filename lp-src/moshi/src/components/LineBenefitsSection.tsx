import { Check } from "lucide-react";
import LineButton from "./LineButton";
import { lineBenefits, lineBenefitsHeading, lineBenefitsLead, cta } from "@/config/site";

/**
 * LINE登録の訴求。登録後に案内できる内容を提示。
 * ※ 実際に提供していない内容を確定した特典のように表現しないこと。
 */
export default function LineBenefitsSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="benefits-heading">
      <div className="container-lp">
        <h2 id="benefits-heading" className="section-heading text-center">
          {lineBenefitsHeading}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-ink">
          {lineBenefitsLead}
        </p>

        <div className="mx-auto mt-6 max-w-md rounded-card bg-line/5 p-5 sm:p-6">
          <ul className="space-y-3">
            {lineBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-line text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-ink">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-4 max-w-md text-center text-[11px] text-inkSoft">
          ※ 配信内容は変更される場合があります。解説講義などのお申し込みは任意です。
        </p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <LineButton cta="benefits" label={cta.benefitLabel} />
          <p className="text-xs text-inkSoft">{cta.notesReply}</p>
        </div>
      </div>
    </section>
  );
}
