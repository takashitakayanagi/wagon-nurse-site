import { Play, PlayCircle } from "lucide-react";
import PhraseText from "./PhraseText";
import SafeImage from "./SafeImage";
import { videoSection, site } from "@/config/site";
import { toEmbedUrl } from "@/lib/video";

/**
 * セクション4：動画学習のイメージ。
 * - 利用シーンのタグ表示
 * - スマホ内に動画画面を表示したモックアップ（再生風）
 * - config の videoUrl に YouTube/Vimeo の URL を入れると実際に埋め込み表示。
 */
export default function VideoPreviewSection() {
  const embedUrl = toEmbedUrl(videoSection.videoUrl);

  return (
    <section className="bg-wagon-50 py-14" aria-labelledby="video-heading">
      <div className="container-lp">
        <div className="mx-auto mb-2 h-16 w-16">
          <SafeImage
            src={site.images.character.reading}
            alt="WAGONちゃん（学習中）"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 object-contain"
            fallbackLabel="WAGON"
          />
        </div>
        <h2 id="video-heading" className="section-heading text-center">
          <PhraseText text={videoSection.heading} />
        </h2>

        {/* 利用シーン */}
        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
          {videoSection.scenes.map((scene, i) => (
            <li
              key={i}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm"
            >
              {scene}
            </li>
          ))}
        </ul>

        {/* スマホモックアップ */}
        <div className="mx-auto mt-10 w-full max-w-xs">
          <div className="rounded-[2rem] border-[6px] border-ink/80 bg-white p-3 shadow-card">
            <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-ink/20" />

            {/* 動画画面 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="WAGON 講義動画"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // 再生風モックアップ（実際の埋め込みなし）
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-wagon-500 to-wagon-700">
                  <PlayCircle
                    className="h-14 w-14 text-white/90"
                    aria-hidden="true"
                  />
                  <p className="mt-2 px-4 text-center text-xs font-medium text-white/90">
                    {videoSection.nowPlayingTitle}
                  </p>
                  {/* 疑似シークバー */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
                      <div className="h-full w-2/5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 講義カテゴリー一覧（ダミー） */}
            <ul className="mt-3 space-y-1.5">
              {videoSection.categories.map((cat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-lg bg-cream px-3 py-2 text-xs text-ink"
                >
                  <Play className="h-3.5 w-3.5 text-wagon-500" aria-hidden="true" />
                  {cat}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-center text-[11px] text-inkSoft">
            ※ 画面はイメージです。講義内容・カテゴリーは変更される場合があります。
          </p>
        </div>
      </div>
    </section>
  );
}
