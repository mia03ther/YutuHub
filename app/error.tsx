"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start px-5 py-28 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-destructive">
        出错了
      </p>
      <h1 className="editorial mt-3 text-3xl font-semibold tracking-tight">
        加载这部分内容时失败了
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        可能是网络问题，也可能内容正在更新。可以先重试，不行就回首页换个入口。
      </p>

      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-muted-soft">
          错误编号：{error.digest}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          重试
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border-line px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          回首页
        </Link>
      </div>
    </div>
  );
}