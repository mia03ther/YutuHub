import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start px-5 py-28 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
        404
      </p>
      <h1 className="editorial mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        这个页面不存在
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        链接可能已经失效，或者内容已被合并到其他词条。可以从下面的入口重新开始。
      </p>

      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {[
          { href: "/tools", label: "AI 工具库" },
          { href: "/skills", label: "技能交换" },
          { href: "/wiki", label: "学习 Wiki" },
          { href: "/community", label: "社区动态" },
          { href: "/projects", label: "项目展示" },
          { href: "/levels", label: "Contributor 等级" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="surface-card block px-4 py-3 text-sm transition hover:border-accent hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}