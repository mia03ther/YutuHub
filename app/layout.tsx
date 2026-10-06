import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "屿途知汇 YuTuHub — 知识·技能·协作平台",
  description:
    "连接知识、技能与创造力的现代协作平台。探索AI工具、技能资源、学习资料与社区交流。",
  keywords: [
    "屿途知汇",
    "YuTuHub",
    "知识协作",
    "技能交换",
    "AI工具",
    "学习资源",
    "社区交流",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
