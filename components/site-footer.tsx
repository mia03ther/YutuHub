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
    <footer className="border-t border-border-line bg-surface-sunken">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
                屿
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
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
              <li>AI 生成内容一律标注来源</li>
              <li>不发布未授权的商业推广</li>
              <li>贡献值不可交易、不可提现</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-line pt-6 text-xs text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.name}. 保留所有权利。</p>
          <p>面向高校学生的 AI 原生知识与服务社区</p>
        </div>
      </div>
    </footer>
  );
}