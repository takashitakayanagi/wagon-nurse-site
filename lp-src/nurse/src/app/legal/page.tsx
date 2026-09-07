import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `特定商取引法に基づく表記｜${site.serviceNameShort}`,
  robots: { index: false, follow: true },
};

type Row = { label: string; value: string };

/**
 * 特定商取引法に基づく表記＋運営者情報。
 * 内容は公式サイト（https://wagon-nurse.com/law）の表記に基づきます。
 * ※ 記載事項に変更があった場合は本ファイルを更新してください。
 */
const rows: Row[] = [
  { label: "事業者の名称", value: "株式会社WAGON" },
  { label: "代表者／通信販売業務の責任者", value: "高柳 貴士" },
  {
    label: "所在地",
    value: "〒337-0051 埼玉県さいたま市見沼区東大宮5丁目35-6 エストレザンⅡ 2階",
  },
  { label: "電話番号", value: "048-685-3316" },
  { label: "メールアドレス", value: "wagon@nurse-wagon.com" },
  { label: "販売価格", value: "各プラン・講座の案内ページに表示する価格" },
  {
    label: "商品代金以外に必要な費用",
    value:
      "なし（ただし、インターネット接続料金その他の通信に関する費用はお客様のご負担となります）",
  },
  { label: "代金の支払時期", value: "講義受講前" },
  { label: "支払方法", value: "クレジット決済・銀行振込" },
  { label: "商品引渡し／サービス提供の時期", value: "計画している講義日程にて" },
  {
    label: "返品・キャンセルについて",
    value:
      "購入手続き完了後の返品・キャンセルはお受けできません。商品・サービスに瑕疵がある場合は、利用規約の定めに従い対応します。WEB講義は、動作環境および必要スペック等をご確認のうえお申し込みください。特別な販売条件・提供条件がある商品・サービスは、各購入ページに条件を表示します。",
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage title="特定商取引法に基づく表記">
      <p className="text-xs text-inkSoft">
        本ページは有料講座の販売に関する表記です。最新の内容は公式サイトの表記もあわせてご確認ください。
      </p>

      <dl className="divide-y divide-wagon-100 overflow-hidden rounded-card border border-wagon-100 bg-white">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-xs font-bold text-inkSoft">{r.label}</dt>
            <dd className="text-sm text-ink sm:col-span-2">{r.value}</dd>
          </div>
        ))}
      </dl>

      <section id="operator" className="scroll-mt-20">
        <h2 className="text-base font-bold">運営者情報</h2>
        <p>
          {site.serviceName}<br />
          運営：{site.operatorName}<br />
          公式サイト：{" "}
          <a
            href={site.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-wagon-600 underline"
          >
            {site.officialUrl}
          </a>
        </p>
      </section>

      <p className="text-[11px] text-inkSoft">
        本サービスは看護師国家試験の合格を保証するものではありません。提供内容・料金・受講条件は各講座の案内をご確認ください。
      </p>
    </LegalPage>
  );
}
