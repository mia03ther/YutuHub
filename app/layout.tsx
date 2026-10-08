import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppChrome } from "@/components/app-chrome";
import {
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "@/lib/i18n/config";
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

const supportedLanguages = JSON.stringify(SUPPORTED_LANGUAGES);
const languageStorageKey = JSON.stringify(LANGUAGE_STORAGE_KEY);
const appearanceScript = `(function(){try{var r=document.documentElement;var s=localStorage.getItem("theme");var q=s==="light"||s==="dark"||s==="system"?s:"system";var d=q==="dark"||(q==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);r.dataset.theme=d?"dark":"light";r.dataset.themeSelection=q;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";var a=${supportedLanguages};var l=localStorage.getItem(${languageStorageKey});if(a.indexOf(l)<0){var n=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).map(function(x){return String(x).toLowerCase()});l="zh-CN";for(var i=0;i<n.length;i++){var x=n[i];var m=a.find(function(v){var z=v.toLowerCase();return z===x||z.split("-")[0]===x.split("-")[0]});if(m){l=m;break}}}r.lang=l;r.dataset.locale=l;r.dataset.appearanceReady="true";}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Resolve theme and homepage locale before first paint.
          dangerouslySetInnerHTML={{
            __html: appearanceScript,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
