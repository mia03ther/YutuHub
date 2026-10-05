import type {
  ActivityItem,
  AiTool,
  Author,
  BadgeMeta,
  LevelMeta,
  Project,
  Skill,
  TrackMeta,
  WikiEntry,
} from "./types";

export const TRACKS: TrackMeta[] = [
  {
    id: "ai-tools",
    label: "AI 工具库",
    tagline: "选型不踩坑",
    description:
      "按学科与场景整理的 AI 工具清单，含定价、上手成本与真实使用心得。",
    href: "/tools",
    icon: "sparkles",
    accent: "accent",
  },
  {
    id: "skills",
    label: "技能交易",
    tagline: "用会的东西换不会的",
    description:
      "拿闲置技能换想要技能：论文润色、三维建模、竞赛辅导，积分结算。",
    href: "/skills",
    icon: "repeat",
    accent: "info",
  },
  {
    id: "wiki",
    label: "学习 Wiki",
    tagline: "沉淀而非重复",
    description:
      "课程笔记、竞赛经验、保研指南的可修订文档，由社区共同维护。",
    href: "/wiki",
    icon: "book",
    accent: "positive",
  },
  {
    id: "community",
    label: "社区动态",
    tagline: "看见同频的人",
    description: "提问、组队、开源、招聘，以及 AI 生成内容的明确标识。",
    href: "/community",
    icon: "users",
    accent: "warning",
  },
  {
    id: "projects",
    label: "项目展示",
    tagline: "Builder 入口",
    description: "学生 AI / Web3 作品集，招队友、招用户、招第一个 star。",
    href: "/projects",
    icon: "rocket",
    accent: "destructive",
  },
];

export const LEVELS: LevelMeta[] = [
  {
    level: 1,
    name: "探索者",
    minContribution: 0,
    perk: "发布内容、评论互动",
  },
  {
    level: 2,
    name: "贡献者",
    minContribution: 200,
    perk: "内容加精、专属徽章",
  },
  {
    level: 3,
    name: "搭建者",
    minContribution: 800,
    perk: "创建 Wiki 词条、技能置顶",
  },
  {
    level: 4,
    name: "领航员",
    minContribution: 2000,
    perk: "审核队列权限、专属主页",
  },
  {
    level: 5,
    name: "架构师",
    minContribution: 5000,
    perk: "命名空间、线上线下活动策划",
  },
];

export const BADGES: BadgeMeta[] = [
  {
    id: "first-publish",
    name: "首航",
    description: "完成第一篇内容发布",
    icon: "flag",
    tone: "accent",
  },
  {
    id: "wiki-keeper",
    name: "Wiki 守护者",
    description: "累计修订 50 次 Wiki 词条",
    icon: "book",
    tone: "positive",
  },
  {
    id: "skill-master",
    name: "技能宗师",
    description: "完成 20 次技能交换并获得五星评价",
    icon: "repeat",
    tone: "info",
  },
  {
    id: "tool-scout",
    name: "工具侦察兵",
    description: "提交 30 条 AI 工具实测记录",
    icon: "sparkles",
    tone: "warning",
  },
  {
    id: "ship-it",
    name: "交付者",
    description: "发布一个完成上线的项目",
    icon: "rocket",
    tone: "accent",
  },
  {
    id: "good-citizen",
    name: "社区公民",
    description: "有效举报或审核 100 条内容",
    icon: "shield",
    tone: "positive",
  },
];

export const AUTHORS: Author[] = [
  {
    handle: "lin",
    name: "林知远",
    avatar: "知",
    school: "计算机学院",
    level: 5,
    contribution: 6420,
    bio: "把 AI 用进每一门课里。维护校园 AI 工具选型表，业余做 RAG 小实验。",
  },
  {
    handle: "shen",
    name: "沈遇白",
    avatar: "遇",
    school: "设计学院",
    level: 4,
    contribution: 3180,
    bio: "Design Engineer。相信最好的界面不需要说明书。",
  },
  {
    handle: "aqi",
    name: "阿其",
    avatar: "其",
    school: "材料学院",
    level: 3,
    contribution: 1240,
    bio: "论文工具流整理者，Simulink 受害者，正在自救。",
  },
  {
    handle: "muyu",
    name: "沐与",
    avatar: "沐",
    school: "经济学院",
    level: 3,
    contribution: 960,
    bio: "Web3 新手，正在学怎么把合约写得不那么可怕。",
  },
  {
    handle: "chenxi",
    name: "陈曦",
    avatar: "曦",
    school: "外国语学院",
    level: 2,
    contribution: 430,
    bio: "翻译 / 语料 / Prompt 工程，愿帮所有被文献综述折磨的人。",
  },
  {
    handle: "nabil",
    name: "纳比",
    avatar: "纳",
    school: "数学学院",
    level: 2,
    contribution: 275,
    bio: "用 Python 代替手算的第 1825 天。",
  },
];

const author = (handle: string): Author => {
  const found = AUTHORS.find((item) => item.handle === handle);
  if (!found) {
    throw new Error(`Unknown author: ${handle}`);
  }
  return found;
};

export const AI_TOOLS: AiTool[] = [
  {
    slug: "claude-code",
    name: "Claude Code",
    vendor: "Anthropic",
    category: "编程助手",
    summary: "终端里的 AI 结对程序员，能读整个仓库并直接改代码。",
    body: `## 为什么推荐

Claude Code 不只是补全代码，它能**读取整个仓库结构**后给出可执行的改动。这对课程设计和毕业设计的价值远大于日常写函数。

## 上手成本

- 需要境外网络环境
- 学生认证可拿到额度
- 建议配合 git 分支使用，让它每次都在独立分支上工作

## 真实用法

\`\`\`bash
claude "给这个 Next.js 项目加上暗色模式，先告诉我你打算改哪些文件"
\`\`\`

先让它给计划，再让它动手。这一步能避免 80% 的返工。`,
    pricing: "学生认证有额度",
    tags: ["编程", "Agent", "代码库理解"],
    author: author("lin"),
    saves: 1842,
    verified: true,
  },
  {
    slug: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    category: "编程助手",
    summary: "IDE 级 AI 编辑器，Composer 模式支持跨文件重构。",
    body: `## 定位

和 Claude Code 是同类工具，但它是**编辑器**，对刚打开电脑就要写代码的同学更顺手。

## 注意

- 免费额度有限，重度使用需要订阅
- 隐私项目务必确认其数据政策`,
    pricing: "免费额度有限",
    tags: ["编程", "IDE", "重构"],
    author: author("aqi"),
    saves: 1210,
    verified: true,
  },
  {
    slug: "notebooklm",
    name: "NotebookLM",
    vendor: "Google",
    category: "文献综述",
    summary: "上传论文后生成带引用的音频概览，综述效率提升明显。",
    body: `## 核心能力

上传自己的 PDF 后，它只基于**你的材料**回答，并标注引用出处。这解决了通用模型幻觉的问题。

## 推荐流程

1. 收集 20 篇目标领域论文
2. 上传后让它生成术语表和争议点总结
3. 用音频概览在通勤时听两遍

> 注意：不要上传未公开的实验数据或导师未发表稿件。`,
    pricing: "免费",
    tags: ["文献", "综述", "学习"],
    author: author("chenxi"),
    saves: 2057,
    verified: true,
  },
  {
    slug: "zotero-mcp",
    name: "Zotero + MCP",
    vendor: "社区方案",
    category: "研究管理",
    summary: "让 AI 直接读写你的文献库，引用不再靠记忆。",
    body: `## 解决的问题

手写引用是所有论文最大的时间黑洞。这个方案让 AI 读你的 Zotero 库，生成综述段落并**附带真实引用**。

## 代价

需要花半天配置 MCP server。配置一次，长期收益。`,
    pricing: "免费（自建）",
    tags: ["文献", "引用", "自动化"],
    author: author("nabil"),
    saves: 486,
    verified: false,
  },
  {
    slug: "v0",
    name: "v0",
    vendor: "Vercel",
    category: "UI 生成",
    summary: "从自然语言生成可部署的 Next.js 与 Tailwind 界面。",
    body: `## 适合谁

需要快速把想法变成**可点击原型**的人。做课程设计展示、创业路演demo 都很合适。

## 别指望什么

它生成的是结构，不是成品。视觉细节和交互状态仍需手工打磨。`,
    pricing: "免费额度",
    tags: ["UI", "原型", "Next.js"],
    author: author("shen"),
    saves: 934,
    verified: true,
  },
  {
    slug: "manim",
    name: "Manim",
    vendor: "社区开源",
    category: "可视化",
    summary: "用 Python 生成数学动画，讲解抽象概念的利器。",
    body: `## 为什么值得学

高等数学、量子力学的概念用公式讲很难，用动画讲一下就通了。

## 学习曲线

前两周会比较痛苦，之后就顺了。建议从三阶变换开始。`,
    pricing: "免费开源",
    tags: ["动画", "数学", "开源"],
    author: author("nabil"),
    saves: 612,
    verified: true,
  },
];

export const SKILLS: Skill[] = [
  {
    slug: "latex-thesis",
    title: "LaTeX 论文排版急救",
    exchange: "希望换取：简历排版 / LaTeX 宏包定制",
    category: "学术写作",
    summary: "帮你把卡住的 LaTeX 编译错误与参考文献格式一次解决。",
    body: `## 能解决什么

- 参考文献格式（BibTeX / GB/T 7714）
- 表格与图片跨页断裂
- 数学环境与宏包冲突

## 交换方式

一对一线上约 40 分钟，我这边同样提供简历排版指导。`,
    tags: ["LaTeX", "论文", "排版"],
    author: author("nabil"),
    rate: 4.9,
    sessions: 47,
  },
  {
    slug: "ui-redesign",
    title: "作品集 UI 诊断",
    exchange: "希望换取：前端部署 / 域名配置",
    category: "设计",
    summary: "一节课把你的作品集从「作业感」调整到「作品感」。",
    body: `## 诊断维度

1. 首屏信息层级
2. 字体与间距节奏
3. 案例叙述结构（问题 → 方案 → 结果）

## 交付物

一份可执行的问题清单 + 参考链接。`,
    tags: ["UI", "作品集", "设计系统"],
    author: author("shen"),
    rate: 5.0,
    sessions: 63,
  },
  {
    slug: "prompt-coaching",
    title: "Prompt 结构化陪练",
    exchange: "希望换取：英语口语 / 学术写作反馈",
    category: "AI 能力",
    summary: "把你的模糊提问，改写成可复用的 Prompt 模板。",
    body: `## 方法

用 **角色 + 上下文 + 约束 + 输出格式** 四段式重写你的提示词，然后一起跑一遍看差距。

## 适合

写论文、准备面试、做课程作业都需要反复提示的场景。`,
    tags: ["Prompt", "AI", "效率"],
    author: author("lin"),
    rate: 4.8,
    sessions: 128,
  },
  {
    slug: "solidity-basics",
    title: "Solidity 入门陪跑",
    exchange: "希望换取：Python 数据处理 / 可视化",
    category: "Web3",
    summary: "零基础到能写出自己的第一个合约，避开常见安全坑。",
    body: `## 目标

四小时内你会有一个能测试网部署的合约，并且理解重入攻击为什么危险。

## 前置

只会一点 JavaScript 即可。`,
    tags: ["Solidity", "Web3", "合约"],
    author: author("muyu"),
    rate: 4.7,
    sessions: 31,
  },
  {
    slug: "thesis-outline",
    title: "开题报告结构打磨",
    exchange: "希望换取：文献检索 / Zotero 整理",
    category: "学术写作",
    summary: "把模糊的选题收窄成一个可答辩的研究问题。",
    body: `## 流程

1. 列出你的所有想法
2. 逐个检查：能不能被验证？有没有前人做过？你能拿到什么数据？
3. 保留能同时满足三条的那一个

大部分选题死在第2 步。`,
    tags: ["开题", "论文", "研究方法"],
    author: author("chenxi"),
    rate: 4.9,
    sessions: 54,
  },
];

export const WIKI_ENTRIES: WikiEntry[] = [
  {
    slug: "ai-literature-review",
    title: "用 AI 做文献综述：从幻觉到可引用",
    summary: "一套可复现的流程，让 AI 生成的综述段落带真实引用。",
    body: `## 核心原则

**不要让模型凭记忆写综述。** 它的价值在于整理你已经收集的材料，而不是凭空产出结论。

## 五步流程

1. 检索并下载 20-30 篇核心文献
2. 导入文献管理工具
3. 让模型基于库内材料生成术语表
4. 按术语表重组你的阅读笔记
5. 逐条核对引用，标注哪些是你的判断

> 关键提醒：第 5 步不可省略。综述是署你名字的东西。

## 常见陷阱

- 把模型给出的「研究空白」直接写进开题报告
- 引用了库外文献（模型会编造）
- 综述变成了罗列，没有批判性对比`,
    category: "学术方法",
    tags: ["文献综述", "AI", "开题"],
    author: author("lin"),
    revision: 34,
    updatedAt: "2026-09-28",
  },
  {
    slug: "prompt-cheatsheet",
    title: "Prompt 工程速查表",
    summary: "四段式结构、六个常用模板、以及什么时候不该用 AI。",
    body: `## 四段式

\`\`\`
角色：你是一位擅长 X 的专家
上下文：我的处境是 Y
约束：必须满足 A、B，不允许 C
输出：用列表给出，每条不超过 30 字
\`\`\`

## 什么时候不该用

- 需要最新事实（模型会编）
- 需要精确引用原文
- 数学推导的最后一步验证

## 迭代技巧

不要一次写完长prompt。先让模型输出提纲，确认方向后再逐段展开。`,
    category: "AI 能力",
    tags: ["Prompt", "模板", "效率"],
    author: author("chenxi"),
    revision: 51,
    updatedAt: "2026-09-30",
  },
  {
    slug: "frontier-first-project",
    title: "第一个 AI 项目怎么立项",
    summary: "从课程作业到大创项目的选题框架，避免做一个没人用的东西。",
    body: `## 立项三问

1. **痛点真不真**：你自己有没有为此烦过至少 10 次？
2. **数据从哪来**：拿不到数据就换题，不要靠编造数据
3. **做完之后谁用**：能说出具体的人，否则只是课设

## 推荐结构

| 阶段 | 产出 |
|---|---|
| 第 1-2 周 | 可跑通的最小原型（丑但能用） |
| 第 3-4 周 | 真实用户测试 5 人 |
| 第 5-8 周 | 补齐边界情况、写文档 |

> 宁可第一周的原型丑，也不要在第 6 周才发现没人需要。`,
    category: "项目方法",
    tags: ["选题", "AI", "立项"],
    author: author("shen"),
    revision: 22,
    updatedAt: "2026-09-22",
  },
  {
    slug: "campus-web3-onboarding",
    title: "校园 Web3 新手路线",
    summary: "从钱包到第一个测试网合约，避开所有不必要的坑。",
    body: `## 阶段一：钱包

先在测试网熟悉，不要一上来就充值。

## 阶段二：第一个合约

用 Hardhat 或 Foundry 跑通部署全流程。理解私钥、助记词、签名三者的区别。

## 阶段三：安全底线

- 永远不要在项目里硬编码私钥
- 任何要求你导入助记词的网站都是诈骗
- 合约上线前至少找两个人审一遍

## 阶段四：真实场景

校园场景里最实用的其实不是代币，是**凭证与结算**。把这一点想清楚再动手。`,
    category: "Web3",
    tags: ["Web3", "合约", "入门"],
    author: author("muyu"),
    revision: 18,
    updatedAt: "2026-09-25",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "campus-rag",
    name: "CampusRAG",
    tagline: "选课季不再翻群聊",
    summary:
      "把课程大纲、往年资料和助教答疑整理成一个可检索的知识库，回答均带原文出处。",
    stack: ["Next.js", "pgvector", "Python", "Whisper"],
    stage: "beta",
    lookingFor: ["前端同学", "会做 embedding 的同学"],
    author: author("lin"),
    stars: 428,
  },
  {
    slug: "design-sprint",
    name: "DesignSprint",
    tagline: "72 小时设计冲刺协作台",
    summary:
      "组队、计时、素材归档、结果投票，为学院设计课和黑客松准备的协作工具。",
    stack: ["TypeScript", "WebSocket", "Postgres"],
    stage: "building",
    lookingFor: ["设计师", "后端同学"],
    author: author("shen"),
    stars: 176,
  },
  {
    slug: "lab-notes",
    name: "LabNotes",
    tagline: "实验记录自动归档",
    summary:
      "把纸质实验记录拍照转成结构化数据，自动关联到课程和样品编号。",
    stack: ["Python", "PaddleOCR", "FastAPI"],
    stage: "shipped",
    lookingFor: ["愿意做内测的实验室"],
    author: author("aqi"),
    stars: 92,
  },
  {
    slug: "dao-starter",
    name: "DAO 课程手册",
    tagline: "给校园社团的链上协作模板",
    summary: "为学生社团设计的透明记账与提案流程，测试网运行中。",
    stack: ["Solidity", "Next.js", "viem"],
    stage: "idea",
    lookingFor: ["合约开发者", "社团运营顾问"],
    author: author("muyu"),
    stars: 134,
  },
];

export const COMMUNITY_STATS = [
  { value: "2,400+", label: "在校贡献者" },
  { value: "860", label: "AI 工具实测" },
  { value: "1,200+", label: "Wiki 词条" },
  { value: "18", label: "高校在用" },
] as const;

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    actor: author("lin"),
    action: "更新了 Wiki",
    target: "用 AI 做文献综述：从幻觉到可引用",
    href: "/wiki/ai-literature-review",
    at: "2 小时前",
  },
  {
    id: "a2",
    actor: author("shen"),
    action: "发布项目",
    target: "DesignSprint · 72 小时设计冲刺协作台",
    href: "/projects",
    at: "5 小时前",
  },
  {
    id: "a3",
    actor: author("chenxi"),
    action: "提交实测",
    target: "NotebookLM",
    href: "/tools",
    at: "昨天",
  },
  {
    id: "a4",
    actor: author("nabil"),
    action: "发起技能交换",
    target: "LaTeX 论文排版急救",
    href: "/skills",
    at: "昨天",
  },
  {
    id: "a5",
    actor: author("muyu"),
    action: "完成贡献",
    target: "Prompt 工程速查表 · 第 51 次修订",
    href: "/wiki/prompt-cheatsheet",
    at: "3 天前",
  },
];