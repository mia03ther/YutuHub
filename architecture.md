# YutuHub Architecture

> 当前实际架构。历史设计规划见 `docs/TECHNICAL_AUDIT.md`。

## 1. 系统拓扑

```
┌─────────────────┐   static / RSC   ┌──────────────────┐
│  Next.js Web    │◄────────────────►│  Content Source  │
│  (port 3000)    │   build time     │  lib/data.ts     │
└─────────────────┘                  └──────────────────┘
         │                                    ▲
         │ /api (部署后)                      │
         ▼                                    │
┌─────────────────┐   REST/JSON   ┌──────────────────┐
│  Express API    │◄─────────────►│  Prisma ORM      │
│  (port 3001)    │               └────────┬─────────┘
└─────────────────┘                        │
         ▲                            ┌─────▼─────┐
         │ HTTP                        │  SQLite   │
┌─────────────────┐                     └───────────┘
│ WeChat Miniapp  │
│ (独立仓库)      │
└─────────────────┘
```

## 2. Web 端渲染策略

| 层 | 渲染模式 | 说明 |
|---|---|---|
| `app/layout.tsx` | RSC | 字体注入、metadata、站点导航与页脚 |
| 首页与所有列表页 | RSC + SSG | 服务端直接读数据，输出静态 HTML |
| `app/tools/[slug]`、`app/wiki/[slug]` | SSG | `generateStaticParams` + `dynamicParams = false`，未知路径返回真 404 |
| `components/theme-toggle.tsx` | Client | `useSyncExternalStore` 读主题，无 `setState` in effect |
| `components/hero-interactive.tsx` | Client | 搜索框受控输入 |
| `app/error.tsx` / `global-error.tsx` | Client | 错误边界需处理重试 |

**规则**：只有需要交互的叶子组件才标 `"use client"`。误标一个高层组件会把整棵子树打进客户端包。

## 3. 数据层

```
lib/data.ts        内容源，唯一数据定义处
      ↓
lib/repository.ts  读取入口，组件唯一允许 import 的数据接口
      ↓
组件（RSC）
```

接入真实 API 时只替换 `lib/repository.ts` 的实现，组件无需改动。Repository 目前是同步内存实现，接口保持 `async`，后续换成 `fetch` 不影响调用方。

## 4. 设计系统

单一来源：`app/globals.css`。

```
:root      浅色 token（CSS 变量）
.dark      深色 token覆盖
   ↓
@theme inline   Tailwind 映射为工具类（bg-surface / text-muted / border-border-line ...）
   ↓
组件           只使用语义类，禁止硬编码色值
```

内置语义色：`accent` `positive` `warning` `destructive` `info`，对应五级等级色 `level-1` 至 `level-5`。

暗色切换：`app/layout.tsx` 内联脚本在首帧前给 `<html>` 加 `.dark`，避免白闪。用户选择存 `localStorage` 的 `yutuhub-theme`。

## 5. API 服务

Express 5 + Zod，分四层：

| 层 | 目录 | 职责 |
|---|---|---|
| 路由 | `server/routes/` | HTTP 契约、入参校验 |
| 服务 | `server/services/` | 业务逻辑、Prisma 查询、推荐排序 |
| 中间件 | `server/middleware/` | 请求日志、统一错误处理 |
| 工具 | `server/utils/` | Prisma 单例、响应封装 |

响应统一为 `{ success, data, message, code }`。

**当前状态**：读接口（列表 / 详情 / 健康检查）已落库；写接口（创建 / 点赞 / 收藏 / 举报）仍是校验后未持久化。鉴权尚未接入，`POST /api/posts` 信任客户端传入的 `user_id`，生产环境必须先补 session 校验。

## 6. 数据模型

`lib/types.ts` 定义前端领域模型：

| 模型 | 用途 |
|---|---|
| `AiTool` | AI 工具库条目（含 Markdown 正文） |
| `Skill` | 技能交换条目 |
| `WikiEntry` | Wiki 词条（含修订次数） |
| `Project` | 学生项目 |
| `Author` / `ContributorLevel` | 作者与等级 |
| `BadgeMeta` | 徽章 |
| `ActivityItem` | 社区动态 |

Prisma 侧目前只有 `Post` 一张表。`database/schema.sql` 中的 9 表设计是规划稿，没有工具会执行它。

## 7. SEO

| 项 | 实现位置 |
|---|---|
| canonical / OG / Twitter | `lib/seo.ts` 的 `pageMetadata()`，每页显式调用 |
| 站点默认 metadata | `app/layout.tsx` |
| sitemap | `app/sitemap.ts`，收录全部静态页 + 工具/词条详情 |
| robots | `app/robots.ts` |
| 规范域名 | `NEXT_PUBLIC_SITE_URL`，构建时读取 |

## 8. 小程序

独立仓库 [`YutuHub-miniapp`](https://github.com/mia03ther/YutuHub-miniapp)。原生 TypeScript + glass-easel，不用框架、不套 Web。数据层 `services/` 提供 mock / 真实双通道，通过 `globalData.mockMode` 切换。