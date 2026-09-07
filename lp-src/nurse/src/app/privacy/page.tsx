import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー｜${site.serviceNameShort}`,
  robots: { index: false, follow: true },
};

/**
 * プライバシーポリシー（雛形）。
 * ※ [仮] の箇所は運営者・法務確認のうえ差し替えてください。
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー">
      <p>
        {site.operatorName}（以下「当社」）は、{site.serviceName}
        （以下「本サービス」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
      </p>

      <section>
        <h2 className="text-base font-bold">1. 取得する情報</h2>
        <p>
          [仮] 当社は、本サービスの提供にあたり、氏名・メールアドレス・LINE
          のユーザー識別情報・アクセス解析情報などを取得する場合があります。取得項目は運営実態に合わせて記載してください。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">2. 利用目的</h2>
        <p>
          [仮]
          取得した情報は、本サービスの案内・お問い合わせ対応・サービス改善・各種ご連絡のために利用します。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">3. アクセス解析ツール</h2>
        <p>
          [仮] 本サービスでは、Google Analytics および Meta
          Pixel などのアクセス解析ツールを利用する場合があります。これらはCookie等を使用し、個人を特定しない形で利用状況を収集します。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">4. 第三者提供</h2>
        <p>
          [仮]
          法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。
        </p>
      </section>

      <section>
        <h2 className="text-base font-bold">5. お問い合わせ窓口</h2>
        <p>個人情報の取り扱いに関するお問い合わせは、wagon@nurse-wagon.com までご連絡ください。</p>
      </section>

      <p className="text-xs text-inkSoft">制定日：[仮] YYYY年MM月DD日</p>
    </LegalPage>
  );
}
