import Link from "next/link";

export function LegalPage({ title, description }: { title: string; description: string }) {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-[#f5f5f5] sm:px-8">
      <article className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-[#8a8a8a] transition hover:text-[#b7ff3c]">← 返回首页</Link>
        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-[#b7ff3c]">YuTuHub · Legal</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em]">{title}</h1>
        <div className="mt-8 rounded-2xl border border-white/[0.10] bg-[#111] p-6 text-sm leading-7 text-[#9a9a9f]">
          <p>{description}</p>
          <p className="mt-4">正式条款将在产品开放注册前补充并生效。当前页面用于保留认证流程中的协议入口。</p>
        </div>
      </article>
    </main>
  );
}
