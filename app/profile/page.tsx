import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bookmark,
  Heart,
  MessageSquareText,
  PackageOpen,
  ShieldCheck,
  Star,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentUser } from "@/lib/auth/user-service";

export const metadata: Metadata = {
  title: "个人中心 · 屿途知汇 YuTuHub",
};

export const dynamic = "force-dynamic";

const entries = [
  { label: "我的评价", icon: Star },
  { label: "我的收藏", icon: Bookmark },
  { label: "我的点赞", icon: Heart },
  { label: "我的帖子", icon: MessageSquareText },
  { label: "二手商品", icon: PackageOpen },
  { label: "账号安全", icon: ShieldCheck },
];

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/profile");

  const joinedAt = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
    timeZone: "Asia/Shanghai",
  }).format(new Date(user.createdAt));

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-[#f5f5f5] sm:px-8">
      <div className="hx-grid fixed inset-0 opacity-50" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#b7ff3c] text-xs font-bold text-[#080808]">Y</span>
            屿途知汇
          </Link>
          <LogoutButton />
        </header>

        <section className="mt-12 rounded-[28px] border border-white/[0.10] bg-[#111]/90 p-6 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#b7ff3c] text-2xl font-semibold text-[#080808]">
                {user.displayName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#737378]">@{user.username}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">{user.displayName}</h1>
                <p className="mt-2 text-sm text-[#8a8a8a]">{user.campusName} · {joinedAt}加入</p>
              </div>
            </div>
            <span className={`w-fit rounded-full border px-3 py-1.5 text-xs ${user.emailVerified ? "border-[#b7ff3c]/20 bg-[#b7ff3c]/[0.07] text-[#b7ff3c]" : "border-amber-300/20 bg-amber-300/[0.07] text-amber-200"}`}>
              {user.emailVerified ? "邮箱已验证" : "邮箱待验证"}
            </span>
          </div>

          <div className="mt-9 grid gap-3 border-t border-white/[0.08] pt-7 sm:grid-cols-2">
            <IdentityRow label="学校邮箱" value={user.email} status={user.emailVerified ? "已验证" : "待验证"} />
            <IdentityRow label="手机号码" value={user.phone ?? "未绑定"} status={user.phone ? (user.phoneVerified ? "已验证" : "待验证") : "未绑定"} />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b7ff3c]">Your space</p>
              <h2 className="mt-2 text-xl font-semibold">个人功能</h2>
            </div>
            <span className="text-xs text-[#666]">内容能力将在后续阶段开放</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <span className="flex items-center gap-3 text-sm text-[#c7c7ca]"><Icon size={17} />{label}</span>
                <span className="text-xs text-[#666]">即将开放</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function IdentityRow({ label, value, status }: { label: string; value: string; status: "已验证" | "待验证" | "未绑定" }) {
  const verified = status === "已验证";
  return (
    <div className="rounded-2xl bg-white/[0.035] p-4">
      <p className="text-xs text-[#6f6f74]">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="truncate text-sm text-[#dedee0]">{value}</span>
        <span className={`shrink-0 text-xs ${verified ? "text-[#b7ff3c]" : "text-amber-200"}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
