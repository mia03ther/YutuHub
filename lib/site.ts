export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yutuhub.com";

export const SITE = {
  name: "YutuHub",
  nameZh: "屿途",
  title: "YutuHub · 让校园里的真实信息重新流动",
  description:
    "YutuHub 是面向大学生的校园生活共创平台，让课程、饮食、交易与互助经验更容易被发现和补充。",
  tagline: "把散落的校园经验汇成路，让下一位同学少走一点弯路。",
  heroTitle: "让校园里的真实信息重新流动",
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
