import Link from "next/link";
import { footer, site } from "@/config/site";

/**
 * フッター。運営者情報・各種規約・公式サイトへの導線＋注意書き。
 */
export default function Footer() {
  return (
    <footer className="border-t border-wagon-100 bg-white py-10">
      <div className="container-lp">
        <p className="text-base font-bold text-ink">{site.serviceName}</p>

        <nav aria-label="フッターナビゲーション" className="mt-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-inkSoft">
            {footer.links.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-wagon-600 hover:underline"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="hover:text-wagon-600 hover:underline">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 text-[11px] leading-relaxed text-inkSoft">{footer.disclaimer}</p>

        <p className="mt-4 text-[11px] text-inkSoft">
          © {new Date().getFullYear()} {site.operatorName}
        </p>
      </div>
    </footer>
  );
}
