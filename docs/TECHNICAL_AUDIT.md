# YutuHub 技术审计报告

> 审计对象：`mia03ther/YutuHub`（Web）、`mia03ther/YutuHub-miniapp`（小程序）
> 审计基线：Web `c679412` / miniapp `8f98645`，两端均与 `origin/main` 同步（0 behind / 0 ahead）
> 审计结论前置：**基线工具链是干净的** —— `npm run typecheck` 与 `eslint .` 双端零错误零告警。问题不在语法层，而在架构层与产品层。

---

## 0. 一句话结论

YutuHub 目前是一个**设计完成度不错的单页 mock UI**，外挂一个**结构合理但完全孤立的 Express + Prisma API**。二者之间没有任何连接：前端 0 次 `fetch`，后端写操作全是空壳，无鉴权。产品的「AI Native 校园知识与服务中枢」定位目前只存在于文案里，不存在于代码里。

---

## 1. 当前优点

### 1.1 Web 端

| 项 | 证据 |
|---|---|
| 技术栈版本是当下前沿 | Next.js 16.3.6 App Router + React 19.2.8 + Tailwind v4.3.3（CSS-first，`@import "tailwindcss"` + `@theme inline`，无 `tailwind.config`） |
| TypeScript strict 真开 | `tsconfig.json:7` `"strict": true`，双端 `tsc --noEmit` 实测零错误 |
| ESLint 配置正确 | `eslint.config.mjs` flat config，`core-web-vitals` + `typescript` preset 双挂 |
| 字体已接 `next/font` | `app/layout.tsx:5-13`，Geist + Geist_Mono 作为 CSS 变量注入，无 CLS |
| 后端分层是干净的 | `routes / services / middleware / utils` 四层，`server/` 1106 行职责边界明确 |
| 推荐算法不是摆设 | `postService.ts:129-142` 用 `likeCount*2 + favoriteCount + views DESC` 做 raw SQL 排序 |
| Zod 入参校验 | `posts.ts:77-85` 完整 schema 校验 |
| 安全底线没破 | `.env` 已 gitignore 且未进 git index；`prisma/yutuhub.db` 已忽略；CORS 未硬编码生产域名 |
| Tailwind 设计 token 已定义 | `globals.css:3-53`，暖纸底 `#f7f5f0` + 墨色 `#1a1917` + 赤陶 `#c7512e` |

### 1.2 小程序端

| 项 | 证据 |
|---|---|
| 组件化到位 | `navbar` / `card` / `feature-card` / `custom-tab-bar`，全部 props + event 声明清晰 |
| 设计 token 体系完整 | `app.wxss:1-40`，品牌色 / ink 五阶 / line 两阶 / surface 三态 / radius 五阶 / shadow 两级 |
| 双模数据层设计得当 | `services/request.ts` mock/real 双通道，切换只靠 `globalData.mockMode`，页面代码零改动 |
| 页面状态完备 | 首页 / 发现页均有 loading + error + empty + skeleton 四态 |
| 工程合规意识强 | 主动产出 `审核风险报告.md`，自查出 3 个 P0 阻塞项 |
| 自适应与安全区 | `custom-tab-bar` 用 `env(safe-area-inset-bottom)`；详情页固定底栏已适配 |
| TS 严格度高于 Web | `tsconfig.json` 额外开了 `noUnusedLocals` / `noUnusedParameters` |

**结论：两个项目的工程审美和代码整洁度是合格的，重构不需要推倒重来，需要的是「接线」和「换定位」。**

---

## 2. 当前缺陷

### 2.1 架构缺陷：两套系统零连接（P0）

```
浏览器 ──> app/page.tsx ──> lib/mock-data.ts (8 条硬编码)
                                    ✗ 无任何 fetch

Express(3001) ──> Prisma(SQLite, Post 表) ──> SQLite 文件
     ↑ 前端从不调用；写接口 like/favorite/report 全是 validate-then-TODO 空壳
```

- `app/` 与 `components/` 中 `fetch()` 出现次数：**0**
- `POST /api/posts/:id/like|favorite|report`：`posts.ts:133 / 158 / 195` 三处 TODO，**不落库**
- `server/utils/mockData.ts` 152 行，**零引用**，纯死代码
- 分类定义重复三份：`lib/mock-data.ts:122-131`、`server/services/postService.ts:25-33`、`server/utils/mockData.ts:11-82`
- 排序/筛选逻辑重复两份：`app/page.tsx:33-62` vs `server/services/postService.ts:147-194`

### 2.2 无鉴权（P0，安全）

- 零 session / JWT / cookie，Prisma **无 `User` 模型**
- `POST /api/posts` 接受任意客户端自报的 `user_id`（`posts.ts:78`）→ 可任意冒名发帖
- CORS 默认 `*`（`server/index.ts:28`），无速率限制，无 helmet，`express.json({limit:"10mb"})`（`server/index.ts:29`）
- `errorHandler.ts:33-36` 对非 500 错误直接回显 `err.message`

### 2.3 RSC 形同虚设（P0，性能）

- 全站 `"use client"`：**1 处**（`app/page.tsx:1`），导致其后导入的 9 个组件**全部进客户端 bundle**
- 真正的 RSC 组件数：**0**（`layout.tsx` 是 RSC 但只 render children）
- `Suspense` / `loading.tsx` / `error.tsx` / `not-found.tsx` / `global-error.tsx`：**全部缺失**
- 错误边界：**无**
- `next/link` 使用次数：**0**；所有「跳转」都是 `scrollIntoView({behavior:"smooth"})`，重复 6 处
- 首页 firstLoad JS：**471,872 bytes**（未压缩，`.next/diagnostics/route-bundle-stats.json`）—— 一个 mock 数据页背 460KB
- 动态 import：**0**

### 2.4 UI 设计体系被绕过（P1）

`globals.css` 定义了 token，但组件里到处硬编码 hex：

| 硬编码值 | 出现位置 | 与 token 冲突 |
|---|---|---|
| `#f7f7f5` | `page.tsx:70`、`navbar.tsx:8` | `--background` 实为 `#f7f5f0` |
| `#171717` | `navbar.tsx:55`、`page.tsx:147`、`hero.tsx:85`、`item-card.tsx:57`、`publish-cta.tsx:4` | `--foreground` 实为 `#1a1917` |
| `#fafaf8` | `item-card.tsx:17`、`publish-modal.tsx:32` | `--muted` 实为 `#f2efe9` |

- 6 套调色板（green/slate/warm/sage/plum/teal + softs）**全部未使用**
- `pulse-ring` keyframes 未使用
- 首页统计卡是占位假数字：`08 / 07 / 06 / ∞`（`page.tsx:87-102`）
- `html lang="en"`（`layout.tsx:23`），但全站中文 → SEO 与 a11y 双错
- 无暗色模式、无移动端导航（`hidden md:flex` 直接消失）、无分页（8 条写死）、无骨架屏

### 2.5 SEO 几乎为零（P1）

`app/layout.tsx:15-18` 仅 `title` + `description`。缺：`metadataBase`、OpenGraph、Twitter Card、`keywords`、`authors`、`viewport` 独立导出、`robots.ts`、`sitemap.ts`、canonical、`icons`。

### 2.6 内容模型缺失（P0，产品层）

产品要求的五大赛道，代码里**一个都没有对应模型**：

| 要求 | 现状 |
|---|---|
| 校园技能交换 | ❌ 仅 `Post.category` 字符串枚举里的一个分类名 |
| AI 工具分享 | ❌ 无此概念 |
| 学习资源沉淀 | ❌ 无 Wiki / 文档实体 |
| 学生服务生态 | ❌ 无 |
| Web3 / AI Builder 社区入口 | ❌ 无 |

同时缺：**User / Profile / Badge / ContributorLevel / Project / Markdown 内容渲染**。Prisma 只有一个 `Post` 模型（`prisma/schema.prisma:10-36`）。`database/schema.sql` 里的 9 表 MySQL 设计只是文档，**没有任何工具会执行它**。

### 2.7 小程序缺陷

**审核阻塞（P0，上架前必改）**

| ID | 问题 | 位置 |
|---|---|---|
| P0-1 | 无举报/投诉入口 | `detail.wxml`、`profile.wxml` |
| P0-2 | 无隐私政策、无用户协议、未开 `__usePrivacyCheck__`、无 `onNeedPrivacyAuthorization` | `app.json` |
| P0-3 | 无内容安全检测（`msgSecCheck` / `imgSecCheck`） | `create.ts`、`services/user.ts` |

**性能（P0）**

- `create.ts:77-108` **每一次按键/选择都调 `wx.setStorageSync`** —— 同步阻塞主线程，无 debounce。这是最严重的一处。
- `profile.ts:31-39` `onShow` 每次切 tab 都 `getStorageSync` 阻塞读
- 全项目 8 处同步 storage API，**0 处异步 `wx.setStorage` / `wx.getStorage`**

**数据真实性（P1，拒审高风险）**

- 编造运营数据：「12,860 人使用」「98% 满意度」「3.4w 关注」 —— `data/brand.ts`、`data/feature.ts`、`data/detail.ts`
- 虚构高校「屿途大学」 —— `data/brand.ts`、`profile.ts`、`detail.ts`、`feed.ts`
- AI 功能无算法备案、无 AI 内容标识 —— `detail.ts`（AI 小屿）、`profile.ts`（AI 创作台）
- 积分规则未披露 —— `profile.wxml:32-35`「屿途积分 1280」

**结构（P1/P2）**

- 无 `subPackages`，全在主包；接入真图后必然超 2MB
- `pages/detail` 无 loading / error / empty（`onLoad` 同步读 mock，真实后端必卡）
- 无分页 / 无上拉加载（`fetchFeed` 支持 page/limit 但页面只拉第 1 页）
- 8 处 `wx:key="*this"`（tags / topics / paragraphs / images）—— 重复值会告警
- 无 ESLint、无 Prettier、无测试、无 CI

### 2.8 文档与部署（P2）

- `README.md:29-30` 仍写「后端 API 计划中」「MySQL 计划中」—— Express 和 SQLite 都已存在
- `server/README.md:10-13`、`architecture.md` 仍指向 MySQL，与实际 SQLite 矛盾
- 练习产物 `GIT_WEEK2_RECORD.md`、`week2-git-practice.md` 混在 main
- `AGENTS.md` 是 `next dev` 自动生成的，却被提交
- Web `README.md` 无环境变量说明、无部署文档；`DEPLOY.md` 内容陈旧
- 小程序 `README.md` 尚可，但无审核合规文档闭环
- 无 `.env.example` 完整注释（存在但过简）

---

## 3. 重构路线

五阶段，每阶段可独立验收、可独立回滚。

| 阶段 | 范围 | 产出 |
|---|---|---|
| **S1 设计系统与外壳** | Tailwind v4 token 重构、暗色模式、RSC layout、字体、导航/页脚、SEO metadata | 可承载新内容的骨架 |
| **S2 内容模型与数据层** | 定义 `Tool / Skill / WikiEntry / Project / Profile / Badge` 领域模型 + 类型安全 repository；接入真实 API 的能力边界 | 产品五大赛道有实体 |
| **S3 首页与功能入口** | 新 Hero（指定标题/副标题）、五大功能入口、项目展示 Card、Markdown 渲染 | 首页完全重做 |
| **S4 用户与激励体系** | Profile 页、Badge 系统、Contributor 等级 | 留存与贡献激励 |
| **S5 健壮性与工程** | loading/error/not-found/边界、sitemap/robots/OG、死代码清理、README/ENV/DEPLOY | 可上线 |

小程序独立走 **M1 合规 → M2 结构与性能 → M3 视觉与内容** 三步。

---

## 4. 优先级排序

### P0（阻塞级，必须先做）

| # | 项 | 端 |
|---|---|---|
| 1 | 五大赛道领域模型 + 类型安全数据层（终结「只有 Post」） | Web |
| 2 | 首页重做：Hero + 五功能入口 + 项目 Card | Web |
| 3 | 恢复 RSC 优先：拆分 client boundary，Server Component 传数据 | Web |
| 4 | 设计 token 收口：消灭所有硬编码 hex | Web |
| 5 | `User` 模型 + 鉴权（session），写接口不再信任客户端 `user_id` | Web |
| 6 | 小程序三大审核阻塞：举报入口 / 隐私协议 / 内容安全检测 | Mini |
| 7 | 小程序同步 storage 阻塞（create 按键存草稿） | Mini |

### P1（重要）

| # | 项 | 端 |
|---|---|---|
| 8 | Profile + Badge + Contributor 等级体系 | Web |
| 9 | Markdown 内容渲染（Wiki / 工具说明） | Web |
| 10 | `loading.tsx` / `error.tsx` / `not-found.tsx` + Suspense 边界 | Web |
| 11 | SEO 完整化：metadataBase / OG / Twitter / robots / sitemap | Web |
| 12 | `next/link` 取代 `scrollIntoView`，消除 `react-hooks/purity` 抑制 | Web |
| 13 | 小程序：subPackages 分包 + 上拉分页 + detail 页三态 | Mini |
| 14 | 小程序：等级 / 贡献值展示 | Mini |
| 15 | 小程序：编造数据下架或标记 Demo | Mini |

### P2（优化）

| # | 项 | 端 |
|---|---|---|
| 16 | 删除死代码（`server/utils/mockData.ts`、6 套调色板、`public/*.svg`、`lucide-react` 死依赖、`@next/swc-wasm-nodejs` 直依赖） | Web |
| 17 | 统一分类/排序逻辑到单一来源 | 双端 |
| 18 | README / `.env.example` / DEPLOY 文档重写，清除 MySQL 陈述 | Web |
| 19 | 小程序 ESLint + Prettier + CI | Mini |
| 20 | 清理 `GIT_WEEK2_RECORD.md` 等练习产物 | Web |
| 21 | `lang="zh-CN"`、viewport 独立导出、8 处 `wx:key` 修正 | 双端 |

---

## 5. 推荐技术方案

### 5.1 Web

| 领域 | 选择 | 理由 |
|---|---|---|
| 框架 | **Next.js 16 App Router，RSC 优先** | 内容型站点 SEO 与首屏最优；Server Component 直接取数，不经客户端 |
| 客户端边界策略 | **叶子节点才 `"use client"`** | 交互控件（筛选器、收藏、发布）才进 bundle；页面壳保持 RSC |
| 语言 | **TypeScript `strict` + `noUncheckedIndexedAccess`** | 现状已 strict；补 `noUncheckedIndexedAccess` 堵住索引访问的隐式 undefined |
| 样式 | **Tailwind v4 CSS-first** | 已是 v4；继续用 `@theme inline` 做 token 映射，不引入 `tailwind.config` |
| 主题 | **token 化暗色模式**（`.dark` 类 + `prefers-color-scheme`） | Linear/Vercel 风格的基础；零 JS 成本 |
| Markdown | **`react-markdown` + `remark-gfm`** | 唯一被广泛验证的 RSC 安全方案；Wiki/工具说明必需 |
| 数据访问 | **Repository 模式 + `server-only` 守卫** | 领域模型与取数分离；mock 与真实 API 可互换，前端组件无感知 |
| 鉴权 | **`jose` 签发 httpOnly cookie session** | 无服务端依赖，Edge 兼容；替代当前零鉴权 |
| 校验 | **Zod（已有 4.6.5）** 扩展到全部 server action / route 输入 | 已是依赖，不新增成本 |
| 缓存 | **`revalidateTag` + `fetch` 缓存标签** | 内容型站点读写比高，标签失效比全量重建精准 |
| 图片 | **`next/image` + AVIF/WebP（已配）** | 现在 0 张图；接入后需配 remotePatterns |
| 图标 | **`lucide-react`（已装未用）** | 已在 `optimizePackageImports` 白名单；直接启用即可，零新增依赖 |
| 测试 | **Vitest + React Testing Library** | 与 Vite 生态一致，RSC 测试成本低 |
| 部署 | **Vercel（Web）+ 独立 Node 服务（Express）** | 前端边缘化；后端需长驻 Prisma 连接，不适合 Serverless |

### 5.2 小程序

| 领域 | 选择 | 理由 |
|---|---|---|
| 框架 | **保持原生 + TypeScript + glass-easel** | 不套壳；小程序审核与性能最稳 |
| 包结构 | **主包只留 tabBar 四页，`detail` 及之后进分包** | 现在 4.3k 行全在主包，接真图必超限 |
| 存储 | **异步 `wx.setStorage` / `wx.getStorage` + 草稿 500ms debounce** | 直接消灭 create 页主线程阻塞 |
| 登录 | **`wx.login` → 后端 code2session → token，异步存储** | 已有骨架；补异步化 |
| 内容安全 | **`wx.security.msgSecCheck` + `imgSecCheck`，发布前强校验** | 审核 P0-3 |
| 合规 | **`__usePrivacyCheck__` + `onNeedPrivacyAuthorization` + 协议页 + 举报入口** | 审核 P0-1/P0-2 |
| 分页 | **`scroll-view` + `bindscrolltolower` 上拉加载** | `fetchFeed` 已支持 page/limit，只差 UI 接线 |
| 视觉 | **延续现有 token，降动画复杂度**（保留 skeleton，去掉 slide/pulse） | 用户明确要求「减少复杂动画、提升加载速度」 |
| 数据真实性 | **编造运营数据下线，改为中性表述** | 拒审风险最高的一项 |
| 工具链 | **ESLint flat config + Prettier + GitHub Actions** | 现在完全缺失 |

### 5.3 明确不做

- **不引入** tRPC / GraphQL：当前数据量下 REST + Zod 已足够，多一层协议只增学习成本
- **不引入** UI 组件库（shadcn/ui 等）：视觉方向要求 Linear/Vercel 式定制，自建 token + 组件更可控，也避免包体积
- **不把 Express 迁进 Serverless**：Prisma 需要长驻连接，强行迁移只会换来冷启动和连接泄漏
- **不重写小程序为 Taro/uni-app**：现有代码质量合格，框架迁移的收益远低于成本

---

## 6. 验收标准

| 项 | 标准 |
|---|---|
| 类型 | 双端 `npm run typecheck` 零错误 |
| Lint | Web `eslint .` 零错误零告警；Mini 新增 lint 脚本并通过 |
| 构建 | Web `npm run build` 成功，首页 firstLoad JS 相对基线（471,872 B）下降 |
| SEO | 首页含 OG/Twitter/description，`/sitemap.xml` 与 `/robots.txt` 可访问 |
| 健壮 | 每个路由有 loading 与 error 边界；`/404` 可达 |
| 同步 | 两仓库 `git rev-list --left-right --count origin/main...main` 返回 `0  0` |

---

*报告基于 commit `c679412`（Web）与 `8f98645`（miniapp）。审计过程为只读，未修改任何源码。*