import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `利用規約｜${site.serviceNameShort}`,
  robots: { index: false, follow: true },
};

/**
 * 利用規約（雛形）。
 * ※ [仮] の箇所は運営者・法務確認のうえ差し替えてください。
 */
export default function TermsPage() {
  return (
    <LegalPage title="利用規約">
      <p>
        本規約は、{site.operatorName}（以下「当社」）が提供する{site.serviceName}
        （以下「本サービス」）の利用条件を定めるものです。利用者は本規約に同意のうえ本サービスを利用するものとします。
      </p>

      <section>
        <h2 className="text-base font-bold">第1条（適用）</h2>
        <p>[仮] 本規約は本サービスの利用に関わる一切の関係に適用されます。</p>
      </section>

      <section>
        <h2 className="text-base font-bold">第2条（禁止事項）</h2>
        <p>
          [仮]
          利用者は、法令違反行為、当社または第三者の権利を侵害する行為、コンテンツの無断転載・複製などを行ってはなりません。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">第3条（有料講座について）</h2>
        <p>
          [仮]
          有料講座の申し込みは任意です。料金・受講条件・視聴期間などは各講座の案内に従うものとします。本サービスは看護師国家試験の合格を保証するものではありません。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">第4条（免責事項）</h2>
        <p>
          [仮]
          当社は、本サービスの利用により生じた損害について、当社の故意または重過失による場合を除き、責任を負わないものとします。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">第5条（規約の変更）</h2>
        <p>[仮] 当社は必要に応じて本規約を変更することができます。</p>
      </section>

      <p className="text-xs text-inkSoft">制定日：[仮] YYYY年MM月DD日</p>
    </LegalPage>
  );
}
