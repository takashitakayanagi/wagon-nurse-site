import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * 規約・法務系ページ共通のレイアウト。
 */
export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream py-10">
      <div className="container-lp max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-inkSoft hover:text-wagon-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          トップに戻る
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-ink">{title}</h1>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink">
          {children}
        </div>
      </div>
    </main>
  );
}
