import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import LineButton from "@/components/LineButton";
import { site, cta } from "@/config/site";

export const metadata: Metadata = {
  title: `お問い合わせ｜${site.serviceNameShort}`,
  robots: { index: false, follow: true },
};

/** お問い合わせページ（雛形）。LINE を主な窓口として案内。 */
export default function ContactPage() {
  return (
    <LegalPage title="お問い合わせ">
      <p>講座や学習に関するご質問・ご相談は、公式LINEからお気軽にお問い合わせください。</p>

      <div className="flex justify-center py-2">
        <LineButton cta="footer" label={cta.finalLabel} />
      </div>

      <p className="text-sm text-inkSoft">
        メールでのお問い合わせ先：wagon@nurse-wagon.com
      </p>
    </LegalPage>
  );
}
