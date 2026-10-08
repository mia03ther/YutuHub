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
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser } from "@/lib/auth/user-service";

export const metadata: Metadata = {
  title: "个人中心 · 屿途知汇 YuTuHub",
};

export const dynamic = "force-dynamic";

const entries = [
  { label: "我的评价", icon: Star, index: "01" },
  { label: "我的收藏", icon: Bookmark, index: "02" },
  { label: "我的点赞", icon: Heart, index: "03" },
  { label: "我的帖子", icon: MessageSquareText, index: "04" },
  { label: "二手商品", icon: PackageOpen, index: "05" },
  { label: "账号安全", icon: ShieldCheck, index: "06" },
];

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/profile");

  const joinedAt = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
    timeZone: "Asia/Shanghai",
  }).format(new Date(user.createdAt));

  return (
    <main className="profile-stage relative min-h-screen overflow-hidden">
      <div className="hx-grid fixed inset-0 opacity-45" aria-hidden="true" />
      <div className="hx-noise fixed inset-0 opacity-[0.035]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-5 pb-20 sm:px-8 lg:px-12">
        <header className="flex h-16 items-center justify-between border-b border-white/[0.12]">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold">
            <span className="brand-glyph border-white text-white" aria-hidden="true"><i /><i /><i /></span>
            <span className="leading-none"><b className="block text-[13px]">YUTUHUB</b><small className="mt-1 block text-[8px] tracking-[0.24em] text-white/45">屿途知汇</small></span>
          </Link>
          <div className="flex items-center gap-3"><ThemeToggle /><LogoutButton /></div>
        </header>

        <section className="grid gap-12 border-b border-white/[0.12] py-14 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#002FA7]">Personal island / 个人档案</p>
            <p className="mt-8 text-sm text-white/40">@{user.username} · {user.campusName}</p>
            <h1 className="mt-2 break-words text-[clamp(4rem,10vw,10rem)] font-bold leading-[0.82] tracking-[-0.075em]">{user.displayName}</h1>
            <p className="mt-7 text-sm text-white/45">{joinedAt} 加入屿途知汇</p>
          </div>
          <div className="flex items-end gap-4">
            <span className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] ${user.emailVerified ? "border-[#002FA7]/50 text-[#7693ff]" : "border-amber-300/30 text-amber-200"}`}>
              {user.emailVerified ? "Verified identity" : "Identity pending"}
            </span>
            <div className="flex size-24 items-center justify-center bg-[#002FA7] text-4xl font-bold text-[#080808] sm:size-32 sm:text-5xl">
              {user.displayName.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </section>

        <section className="grid border-b border-white/[0.12] md:grid-cols-2">
          <IdentityRow label="学校邮箱" value={user.email} status={user.emailVerified ? "已验证" : "待验证"} />
          <IdentityRow label="手机号码" value={user.phone ?? "未绑定"} status={user.phone ? (user.phoneVerified ? "已验证" : "待验证") : "未绑定"} />
        </section>

        <section className="pt-16">
          <div className="grid gap-5 border-b border-white/[0.12] pb-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#002FA7]">Your routes</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em]">个人功能</h2>
            </div>
            <p className="text-xs text-white/35">内容能力将在后续阶段开放</p>
          </div>
          <div className="grid md:grid-cols-2">
            {entries.map(({ label, icon: Icon, index }) => (
              <div key={label} className="group flex min-h-24 items-center justify-between border-b border-white/[0.12] px-1 py-5 md:odd:border-r md:odd:pr-8 md:even:pl-8">
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[#002FA7]">{index}</span>
                  <Icon size={18} className="text-white/45 transition-colors group-hover:text-white" />
                  <span className="text-lg font-medium">{label}</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/28">Soon</span>
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
    <div className="flex min-w-0 items-center justify-between gap-6 border-white/[0.12] py-7 md:first:border-r md:first:pr-8 md:last:pl-8">
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{label}</p>
        <p className="mt-2 truncate text-sm text-white/82">{value}</p>
      </div>
      <span className={`shrink-0 text-xs ${verified ? "text-[#7693ff]" : "text-amber-200"}`}>{status}</span>
    </div>
  );
}
