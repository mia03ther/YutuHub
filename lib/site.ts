export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yutuhub.com";

export const SITE = {
  name: "YutuHub",
  nameZh: "屿途",
  title: "YutuHub · 连接校园知识，让 AI 加速成长",
  description:
    "YutuHub 是面向高校学生的 AI 驱动综合服务平台，提供 AI 工具库、校园技能交换、学习 Wiki、社区动态与项目展示。",
  tagline: "面向高校学生的新一代 AI 驱动知识与服务社区",
  heroTitle: "连接校园知识，让 AI 加速成长",
  url: SITE_URL,
  locale: "zh_CN",
  keywords: [
    "AI工具",
    "校园技能交换",
    "学习Wiki",
    "学生社区",
    "AI Builder",
    "Web3 校园",
    "知识沉淀",
    "YutuHub",
    "屿途",
  ],
} as const;