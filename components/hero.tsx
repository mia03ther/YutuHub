"use client";

import { ArrowRight, Sparkles, BookOpen, Users, Cpu } from "lucide-react";

interface HeroProps {
  query: string;
  onQueryChange: (v: string) => void;
  onClear: () => void;
  onSearchClick: () => void;
}

const features = [
  { icon: Sparkles, label: "技能市场", desc: "发布与交换技能" },
  { icon: Cpu, label: "AI实验室", desc: "工具推荐与Prompt" },
  { icon: BookOpen, label: "知识库", desc: "学习资源与攻略" },
  { icon: Users, label: "社区动态", desc: "信息流与互动" },
];

export default function Hero({
  query,
  onQueryChange,
  onClear,
  onSearchClick,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-accent/[0.04] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-20 pb-16 md:px-8 md:pt-28 md:pb-20">
        {/* Brand & Tagline */}
        <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-card text-xs font-medium text-muted mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            开放的知识与技能协作网络
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="gradient-text">屿途知汇</span>
            <br />
            <span className="text-foreground">YuTuHub</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-lg mx-auto">
            发现技能、探索AI工具、沉淀知识、连接同路人
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearchClick()}
              placeholder="搜索技能、资源、话题..."
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-border-strong bg-card text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all min-h-[44px]"
            />
            {query && (
              <button
                onClick={onClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onSearchClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent-light transition-colors shadow-md min-h-[44px]"
            >
              探索资源
              <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-border-strong bg-card text-foreground text-sm font-medium rounded-lg hover:bg-card-hover transition-colors min-h-[44px]">
              了解更多
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {features.map((f) => (
            <div
              key={f.label}
              className="group p-5 rounded-xl border border-border bg-card card-hover cursor-pointer min-h-[44px]"
            >
              <div className="h-10 w-10 rounded-lg bg-accent/[0.06] flex items-center justify-center text-accent mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <f.icon size={20} />
              </div>
              <div className="font-semibold text-sm">{f.label}</div>
              <div className="mt-1 text-xs text-muted">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
