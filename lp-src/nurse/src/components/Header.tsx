import Link from "next/link";
import SafeImage from "./SafeImage";
import { site } from "@/config/site";

/**
 * ヘッダー。ロゴ配置エリア＋公式サイトへのリンク。
 * シンプルに保ち、ファーストビューの視認性を優先します。
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-wagon-100 bg-cream/90 backdrop-blur">
      <div className="container-lp flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={site.serviceName}>
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-wagon-100 bg-white">
            <SafeImage
              src={site.images.character.point}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-cover"
              fallbackLabel="W"
              priority
            />
          </span>
          <span className="text-sm font-bold leading-none text-ink">
            {site.serviceNameShort}
            <span className="ml-1 hidden text-[11px] font-medium text-inkSoft sm:inline">
              看護師国家試験対策
            </span>
          </span>
        </Link>

        <a
          href={site.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-inkSoft underline-offset-2 hover:text-wagon-600 hover:underline"
        >
          公式サイト
        </a>
      </div>
    </header>
  );
}
