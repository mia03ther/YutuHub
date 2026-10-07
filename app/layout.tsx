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
  title: "屿途知汇 YuTuHub — 校园信息共创平台",
  description:
    "面向大学生的校园信息共创平台，连接课程避坑、干饭指南、校园交易与经验分享。",
  keywords: [
    "屿途知汇",
    "YuTuHub",
    "校园生活",
    "选课指南",
    "干饭指南",
    "二手交易",
    "学习资源",
    "校园社区",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Apply the persisted theme before first paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||((!s||s==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.dataset.theme="dark";document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
