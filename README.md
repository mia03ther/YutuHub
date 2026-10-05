# YutuHub

> AI Native Campus Knowledge & Service Hub
> 面向高校学生的新一代 AI 驱动知识与服务社区

YutuHub 把高校学生里散落的经验做成可检索、可修订、可交换的知识资产：AI 工具选型、课程与竞赛方法、技能互换、学生项目。

---

## 五个核心方向

| 方向 | 入口 | 说明 |
|---|---|---|
| AI 工具库 | `/tools` | 按学科与场景整理，含定价、上手成本与学生实测记录 |
| 技能交换 | `/skills` | 用会的东西换不会的，贡献值结算，不可提现 |
| 学习 Wiki | `/wiki` | 可修订文档库，修订历史公开 |
| 社区动态 | `/community` | 提问、组队、开源、提需求 |
| 项目展示 | `/projects` | 学生 Builder 作品集与招募入口 |

激励体系见 `/levels`（Contributor 等级）与 `/badges`（徽章）。

---

## 技术栈

| 层 | 选型 | 版本 |
|---|---|---|
| 框架 | Next.js（App Router，Turbopack） | 16.3.6 |
| UI | React Server Components 优先 | 19.2.8 |
| 语言 | TypeScript（`strict`） | 5.x |
| 样式 | Tailwind CSS v4（CSS-first token） | 4.x |
| 图标 | lucide-react | 1.48.0 |
| 字体 | Geist / Geist Mono（`next/font`） | — |
| Markdown | react-markdown + remark-gfm | — |
| 数据库 | Prisma + SQLite | 6.19.3 |
| API | Express + Zod | 5.x / 4.x |

---

## 架构原则

**Server Component 优先。** 只有需要交互的叶子节点才标 `"use client"`。首页与所有列表页都是 RSC，服务端直接取数，不经客户端。

**数据层与表现层分离。** `lib/data.ts` 是内容源，`lib/repository.ts` 是唯一的读取入口，组件永远不直接 import 数据源。接入真实 API 时只改 repository。

**设计 token 单一来源。** 全部颜色、圆角、阴影来自 `app/globals.css` 的 `@theme inline` 映射。组件里不写硬编码色值。

**暗色模式零 JS 成本。** 通过 `:root` / `.dark` CSS 变量切换，`app/layout.tsx` 在首帧前注入脚本避免闪烁，用户偏好存 `localStorage`。

---

## 目录结构

```
.
├── app/                    # App Router
│   ├── layout.tsx          # 根布局：字体、metadata、站点导航
│   ├── page.tsx            # 首页
│   ├── loading.tsx         # 全站骨架屏
│   ├── error.tsx           # 路由级错误边界
│   ├── global-error.tsx# 根错误边界
│   ├── not-found.tsx       # 404
│   ├── sitemap.ts          # /sitemap.xml
│   ├── robots.ts           # /robots.txt
│   ├── about/              # 定位与内容规范
│   ├── badges/             # 徽章体系
│   ├── community/          # 社区动态
│   ├── levels/             # Contributor 等级
│   ├── projects/           # 项目展示
│   ├── skills/             # 技能交换
│   ├── tools/              # AI 工具库 + 详情页（SSG）
│   └── wiki/               # 学习 Wiki + 词条页（SSG）
├── components/             # 展示组件（RSC）+ *-interactive / theme-toggle（Client）
├── lib/
│   ├── data.ts             # 内容源（唯一数据定义处）
│   ├── repository.ts       # 读取入口（唯一对外数据 API）
│   ├── seo.ts              # per-page metadata 构造器
│   ├── site.ts             # 站点常量
│   ├── nav.ts              # 导航配置
│   ├── track-icons.ts      # 赛道图标映射
│   └── types.ts            # 领域模型类型
├── server/                 # 独立 Express API（端口 3001）
│   ├── routes/             # 路由层
│   ├── services/           # 业务逻辑 + Prisma
│   ├── middleware/         # 日志、统一错误处理
│   └── utils/              # Prisma 单例、响应封装
├── prisma/                 # schema + migrations
├── docs/
│   ├── TECHNICAL_AUDIT.md  # 技术审计报告
│   └── DEPLOY.md           # 部署文档
└── public/
```

---

## 环境变量

完整说明见 [`.env.example`](.env.example)。最关键的两个：

| 变量 | 必填 | 说明 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 生产必填 | 站点规范 URL，影响 sitemap / robots / canonical / OG |
| `DATABASE_URL` | 是 | Prisma 连接串，本地默认 `file:./yutuhub.db` |

其余见 `.env.example`。只有 `NEXT_PUBLIC_*` 前缀的变量会进入浏览器包。

---

## 本地运行

```bash
npm install

# 配置环境变量
cp .env.example .env.local

# 初始化数据库（首次）
npx prisma migrate dev

# 开发
npm run dev            # http://localhost:3000

# 类型检查
npm run typecheck

# Lint
npm run lint

# 生产构建
npm run build

# 生产启动
npm run start
```

### 独立 API 服务器

```bash
npm run server:build   # 编译到 dist/
npm run server:start   # 监听 API_PORT，默认 3001
```

---

## 质量门禁

提交前必须全绿：

```bash
npm run typecheck && npm run lint && npm run build
```

`npm run build` 的 `prebuild` 会自动跑 lint，类型检查由 Next.js 在构建时执行。

---

## 部署

完整步骤见 [`docs/DEPLOY.md`](docs/DEPLOY.md)。

- **Web**：Vercel 或任意支持 Node 长驻的服务器（PM2）
- **API**：独立 Node 进程 + PM2，不能放 Serverless（Prisma 需要长驻连接）
- **小程序**：见 `YutuHub-miniapp` 仓库

---

## 技术审计

架构现状、缺陷清单与重构路线见 [`docs/TECHNICAL_AUDIT.md`](docs/TECHNICAL_AUDIT.md)。

---

## License

MIT