import { Check } from "lucide-react";
import PhraseText from "./PhraseText";
import SafeImage from "./SafeImage";
import LineButton from "./LineButton";
import { hero, site } from "@/config/site";

/**
 * ファーストビュー。
 * 3秒で「何のサービスで・何をすればよいか」が分かる構成。
 * LINEボタンはスクロールせず見える位置に配置。
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wagon-50 via-cream to-cream">
      {/* 背景の淡いアクセント */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-200/60 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-40 h-56 w-56 rounded-full bg-wagon-100/70 blur-2xl"
      />

      <div className="container-lp relative py-8 sm:py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* テキスト側 */}
          <div className="text-center md:text-left">
            <p className="mb-3 inline-flex items-center rounded-full bg-wagon-500 px-3 py-1 text-xs font-bold text-white">
              看護師国家試験対策スクール
            </p>

            <h1 className="section-heading text-[26px] leading-[1.4] sm:text-4xl">
              <PhraseText text={hero.mainCopy} />
            </h1>

            <p className="jp-body mt-4 text-sm leading-relaxed text-inkSoft sm:text-base">
              {hero.subCopy}
            </p>

            {/* CTA（スクロール前に見える位置） */}
            <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
              <LineButton cta="hero" label={hero.ctaLabel} />
              <p className="flex items-center gap-1 text-xs font-medium text-line-dark">
                <Check className="h-4 w-4" aria-hidden="true" />
                {hero.ctaNoteFree}・{hero.ctaNotes[0]}
              </p>
            </div>

            <p className="mt-2 text-[11px] text-inkSoft">{hero.ctaNotes[1]}</p>
          </div>

          {/* ビジュアル側：キャラクター＋LINEトーク風UI */}
          <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <div className="relative rounded-[2rem] border-[6px] border-ink/80 bg-white p-3 shadow-card">
              {/* スマホ上部バー */}
              <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-ink/20" />

              {/* LINEトーク風ヘッダー */}
              <div className="flex items-center gap-2 rounded-t-xl bg-line px-3 py-2 text-white">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/20">
                  <SafeImage
                    src={site.images.character.point}
                    alt="WAGONちゃん"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-cover"
                    fallbackLabel="WAGON"
                  />
                </div>
                <span className="text-sm font-bold">{site.serviceNameShort} 公式LINE</span>
              </div>

              {/* トーク本文（LINE登録後のイメージ） */}
              <div className="space-y-2 rounded-b-xl bg-[#8CB4D6]/15 px-3 py-3">
                <TalkBubble>国試って、何から始めればいいの…？</TalkBubble>
                <TalkBubble line>
                  大丈夫！まずは頻出ポイントから一緒に整理していこう🌱
                </TalkBubble>
                <TalkBubble line>今日の1問、送るね📩</TalkBubble>
              </div>

              {/* キャラクター（正式画像。無い場合はプレースホルダー） */}
              <div className="absolute -bottom-6 -right-4 h-24 w-24 md:h-28 md:w-28">
                <SafeImage
                  src={site.images.character.point}
                  alt="WAGONちゃん"
                  fill
                  sizes="112px"
                  className="object-contain drop-shadow"
                  fallbackLabel="WAGONちゃん画像"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TalkBubble({
  children,
  line = false,
}: {
  children: React.ReactNode;
  line?: boolean;
}) {
  if (line) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-xs text-ink shadow-sm">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#9AE05A] px-3 py-2 text-xs text-ink shadow-sm">
        {children}
      </div>
    </div>
  );
}
