"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        setError("退出失败，请稍后重试");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("暂时无法连接认证服务");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={logout}
        disabled={pending}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.12] px-4 text-sm text-[#b7b7bb] transition hover:border-white/25 hover:text-white disabled:opacity-50"
      >
        {pending ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
        退出登录
      </button>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}
