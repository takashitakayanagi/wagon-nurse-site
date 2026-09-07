import { Check } from "lucide-react";
import LineButton from "./LineButton";
import { lineBenefits } from "@/config/site";

/**
 * セクション5：LINE登録後に受け取れる内容。
 * ※ 実際に提供していない特典を確定情報として書かないこと。
 */
export default function LineBenefitsSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="benefits-heading">
      <div className="container-lp">
        <h2 id="benefits-heading" className="section-heading text-center">
          まずはLINEから始めよう
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-inkSoft">
          公式LINEに登録すると、こんな情報を受け取れます。
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-card bg-line/5 p-5 sm:p-6">
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
          ※ 配信内容は変更される場合があります。有料講座のお申し込みは任意です。
        </p>

        <div className="mt-8 flex justify-center">
          <LineButton cta="benefits" label="LINEで受け取る" />
        </div>
      </div>
    </section>
  );
}
