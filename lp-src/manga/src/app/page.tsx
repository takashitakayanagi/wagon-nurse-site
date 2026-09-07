import MangaSection from "@/components/MangaSection";
import AfterMangaMessage from "@/components/AfterMangaMessage";
import ProblemSection from "@/components/ProblemSection";
import RiskSection from "@/components/RiskSection";
import HopeSection from "@/components/HopeSection";
import WagonIntroduction from "@/components/WagonIntroduction";
import VideoPreviewSection from "@/components/VideoPreviewSection";
import LineBenefitsSection from "@/components/LineBenefitsSection";
import StepsSection from "@/components/StepsSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import StickyLineCta from "@/components/StickyLineCta";

export default function Home() {
  return (
    <>
      {/* has-sticky-cta：追従ボタン分の余白を確保し、最下部が隠れないようにする */}
      <main className="has-sticky-cta">
        {/* 1. 漫画導入（ページ最上部・見出しは漫画より上に置かない） */}
        <MangaSection />
        {/* 2. 漫画直後の語りかけ（＝漫画の直後にCTA。途中には入れない） */}
        <AfterMangaMessage />
        {/* 3. 悩みへの共感 */}
        <ProblemSection />
        {/* 4. 放置した場合 */}
        <RiskSection />
        {/* 5. 不安→希望への転換 */}
        <HopeSection />
        {/* 6-7. WAGONの紹介＋学べる理由（特徴カード） */}
        <WagonIntroduction />
        {/* 8. 動画講義のイメージ */}
        <VideoPreviewSection />
        {/* 9. LINE登録の訴求 */}
        <LineBenefitsSection />
        {/* 10. 登録から毎日1問が届くまでの流れ */}
        <StepsSection />
        {/* 11. よくある質問 */}
        <FaqSection />
        {/* 12. 最終CTA */}
        <FinalCtaSection />
        {/* 13. フッター */}
        <Footer />
      </main>
      {/* スマホ用追従LINEボタン */}
      <StickyLineCta />
    </>
  );
}
