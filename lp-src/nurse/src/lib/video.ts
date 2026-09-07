/**
 * YouTube / Vimeo の視聴用URLから埋め込み用URLを生成します。
 * 対応していない/空の場合は null を返します（→ モックアップ表示）。
 */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  const u = url.trim();

  // YouTube: watch?v= / youtu.be / shorts
  const yt =
    u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (yt) {
    return `https://www.youtube.com/embed/${yt[1]}`;
  }

  // Vimeo: vimeo.com/123456789
  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return null;
}
