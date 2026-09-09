import { ChevronDown } from "lucide-react";
import { faqs } from "@/config/site";

/**
 * よくある質問（アコーディオン）。
 * ネイティブの <details>/<summary> を使用し、JS なし・キーボードでも開閉可能。
 */
export default function FaqSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="faq-heading">
      <div className="container-lp">
        <h2 id="faq-heading" className="section-heading text-center">
          よくある質問
        </h2>

        <div className="mx-auto mt-8 max-w-2xl space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-card border border-wagon-100 bg-white shadow-card [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-ink">
                <span>
                  <span className="mr-1 text-wagon-500">Q.</span>
                  {faq.question}
                </span>
                <ChevronDown
                  className="h-5 w-5 flex-none text-wagon-500 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="border-t border-wagon-50 px-5 py-4 text-sm leading-relaxed text-inkSoft">
                <span className="mr-1 font-bold text-line-dark">A.</span>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
