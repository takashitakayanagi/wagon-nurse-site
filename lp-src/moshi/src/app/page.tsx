import MangaSection from "@/components/MangaSection";
import AfterMangaMessage from "@/components/AfterMangaMessage";
import ProblemSection from "@/components/ProblemSection";
import RiskSection from "@/components/RiskSection";
import HopeSection from "@/components/HopeSection";
import WagonIntroduction from "@/components/WagonIntroduction";
import GradeBranchSection from "@/components/GradeBranchSection";
import KaisetsuSection from "@/components/KaisetsuSection";
import VoicesSection from "@/components/VoicesSection";
import LineBenefitsSection from "@/components/LineBenefitsSection";
import StepsSection from "@/components/StepsSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import StickyLineCta from "@/components/StickyLineCta";
import { seo } from "@/config/site";

export default function Home() {
  return (
    <>
      {/* has-sticky-cta：追従ボタン分の余白を確保し、最下部が隠れないようにする */}
      <main className="has-sticky-cta">
        {/* 文書構造とスクリーンリーダー用の h1。漫画より上に見出しを出さない方針のため非表示。 */}
        <h1 className="sr-only">{seo.h1}</h1>
        {/* 1. 漫画導入（ページ最上部・見出しは漫画より上に置かない） */}
        <MangaSection />
        {/* 2. 漫画直後の語りかけ（＝漫画の直後にCTA。途中には入れない） */}
        <AfterMangaMessage />
        {/* 3. 模試のあとの悩みへの共感 */}
        <ProblemSection />
        {/* 4. 受けっぱなしにした場合 */}
        <RiskSection />
        {/* 5. 不安→希望への転換（見るのは判定ではなく落とした場所） */}
        <HopeSection />
        {/* 6. WAGON模擬試験でできること */}
        <WagonIntroduction />
        {/* 7. 学年で案内を切り替える（低学年にはカウントダウンを出さない） */}
        <GradeBranchSection />
        {/* 8. 模試解説講義 */}
        <KaisetsuSection />
        {/* 9. 解説講義を受けた人の声（解説講義の直後に置く） */}
        <VoicesSection />
        {/* 10. LINEでできること */}
        <LineBenefitsSection />
        {/* 11. 申し込みから復習までの流れ */}
        <StepsSection />
        {/* 12. よくある質問 */}
        <FaqSection />
        {/* 13. 最終CTA */}
        <FinalCtaSection />
        {/* 14. フッター */}
        <Footer />
      </main>
      {/* スマホ用追従LINEボタン */}
      <StickyLineCta />
    </>
  );
}
