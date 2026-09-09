import { AlertCircle } from "lucide-react";
import { risks } from "@/config/site";

/**
 * 不安を放置した場合。過度に怖くせず、最後は必ず安心につなげる。
 */
export default function RiskSection() {
  return (
    <section className="bg-cream py-14" aria-labelledby="risk-heading">
      <div className="container-lp max-w-2xl">
        <h2 id="risk-heading" className="section-heading text-center">
          {risks.heading}
        </h2>

        <ul className="mt-8 space-y-3">
          {risks.items.map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-card"
            >
              <AlertCircle
                className="mt-0.5 h-5 w-5 flex-none text-wagon-300"
                aria-hidden="true"
              />
              <span className="text-sm text-ink">{text}</span>
            </li>
          ))}
        </ul>

        {/* 必ず安心につながる一文で締める */}
        <p className="mt-8 rounded-card bg-accent-100 px-5 py-4 text-center text-sm font-medium leading-relaxed text-ink">
          {risks.reassurance}
        </p>
      </div>
    </section>
  );
}
