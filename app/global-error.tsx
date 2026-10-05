"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN" className="h-full">
      <body className="flex min-h-full flex-col items-center justify-center bg-background px-5 text-foreground antialiased">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
          500
        </p>
        <h1 className="editorial mt-3 text-2xl font-semibold tracking-tight">
          出了点问题
        </h1>
        <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-muted">
          页面渲染时出错了。可以重试，如果反复出现请把错误信息反馈到社区。
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-muted-soft">
            错误编号：{error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          重试
        </button>
      </body>
    </html>
  );
}