import Link from "next/link";
import { SITE } from "@/lib/site";
import { TRACK_LINKS } from "@/lib/nav";

const RESOURCE_LINKS = [
  { href: "/badges", label: "徽章体系" },
  { href: "/levels", label: "Contributor 等级" },
  { href: "/about", label: "关于 YutuHub" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/15 bg-[#080808] text-[#f2f0e9]">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-end gap-3">
              <span className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[0.8] tracking-[-0.07em]">YUTU</span>
              <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-background/55">屿途知汇</span>
            </Link>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-background/60">
              {SITE.tagline}
            </p>
          </div>

          <nav aria-label="功能">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
              功能
            </h2>
            <ul className="mt-3 space-y-2">
              {TRACK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="资源">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
              资源
            </h2>
            <ul className="mt-3 space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
              社区约定
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>真实经验优先于流量</li>
              <li>信息来源可以被追溯</li>
              <li>校园共同建设、共同维护</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-line pt-6 text-xs text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.name}. 保留所有权利。</p>
          <p>让校园里的真实信息，重新流动起来。</p>
        </div>
      </div>
    </footer>
  );
}
