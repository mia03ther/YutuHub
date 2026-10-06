"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Plus, User } from "lucide-react";

interface NavbarProps {
  onPublishClick: () => void;
}

const navLinks = [
  { label: "技能市场", href: "#skills" },
  { label: "AI实验室", href: "#ai-lab" },
  { label: "知识库", href: "#knowledge" },
  { label: "社区", href: "#community" },
];

export default function Navbar({ onPublishClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">
              Y
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              屿途知汇
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-muted hover:text-foreground rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-2 text-muted hover:text-foreground rounded-full transition-colors md:hidden">
              <Search size={20} />
            </button>
            <button
              onClick={onPublishClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full hover:bg-accent-light transition-colors"
            >
              <Plus size={16} />
              发布内容
            </button>
            <button className="p-2 text-muted hover:text-foreground rounded-full transition-colors">
              <User size={20} />
            </button>
            <button
              className="p-2 text-muted hover:text-foreground rounded-full transition-colors md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted hover:text-foreground hover:bg-background rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                onPublishClick();
                setMobileOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-1.5 px-4 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-xl"
            >
              <Plus size={16} />
              发布内容
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
