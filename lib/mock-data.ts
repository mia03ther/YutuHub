export type Item = {
  id: number;
  title: string;
  owner: string;
  desc: string;
  category: string;
  type: string;
  price: string;
  emoji: string;
  condition: string;
  location: string;
  postedAt: string;
};

export const items: Item[] = [
  {
    id: 1,
    title: "Python / SQL Debug",
    owner: "MIA_Ether",
    desc: "Python、SQL、数据处理、环境配置与常见报错排查。",
    category: "技术",
    type: "服务",
    price: "¥20 起",
    emoji: "⌘",
    condition: "服务",
    location: "线上",
    postedAt: "2 小时前",
  },
  {
    id: 2,
    title: "AI Workflow Pack",
    owner: "Yuki",
    desc: "常用 AI 工作流、Prompt 与自动化模板合集。",
    category: "AI",
    type: "产品",
    price: "¥9.9",
    emoji: "✦",
    condition: "全新",
    location: "线上",
    postedAt: "5 小时前",
  },
  {
    id: 3,
    title: "Portfolio Review",
    owner: "Kevin",
    desc: "个人网站、作品集与项目介绍的结构优化。",
    category: "求职",
    type: "服务",
    price: "¥29 起",
    emoji: "◈",
    condition: "服务",
    location: "线上",
    postedAt: "1 天前",
  },
  {
    id: 4,
    title: "PPT / 海报设计",
    owner: "Luna",
    desc: "课堂展示、社团活动、比赛项目的视觉设计。",
    category: "设计",
    type: "服务",
    price: "¥30 起",
    emoji: "▣",
    condition: "服务",
    location: "线上",
    postedAt: "2 天前",
  },
  {
    id: 5,
    title: "大学英语陪练",
    owner: "Amy",
    desc: "英语口语、表达训练、面试与日常交流练习。",
    category: "学习",
    type: "服务",
    price: "¥25 起",
    emoji: "Aa",
    condition: "服务",
    location: "线上",
    postedAt: "3 天前",
  },
  {
    id: 6,
    title: "二手教材交换",
    owner: "Campus User",
    desc: "课程教材、参考书、考试资料等校园闲置交换。",
    category: "二手",
    type: "商品",
    price: "¥10 起",
    emoji: "↗",
    condition: "八成新",
    location: "3 号宿舍楼",
    postedAt: "6 天前",
  },
  {
    id: 7,
    title: "AI Research Kit",
    owner: "MIA_Ether",
    desc: "AI 学习、研究和资料整理的个人工具集合。",
    category: "AI",
    type: "产品",
    price: "免费",
    emoji: "◎",
    condition: "全新",
    location: "线上",
    postedAt: "1 周前",
  },
  {
    id: 8,
    title: "校园跑腿",
    owner: "Campus User",
    desc: "宿舍、图书馆、食堂等校园范围内的生活服务。",
    category: "校园",
    type: "服务",
    price: "¥5 起",
    emoji: "→",
    condition: "服务",
    location: "校园内",
    postedAt: "2 周前",
  },
];

export const categories = [
  ["全部", "全部内容"],
  ["技术", "开发与数据"],
  ["AI", "AI 产品与工具"],
  ["设计", "视觉与创意"],
  ["学习", "学习服务"],
  ["求职", "简历与作品集"],
  ["二手", "校园闲置"],
  ["校园", "校园生活"],
] as const;