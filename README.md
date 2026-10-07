# YutuHub / 屿途知汇

> 让校园里的真实信息，重新流动起来。

屿途知汇是面向大学生的校园生活共创平台。我们希望把分散在聊天群、口头经验和个人笔记中的校园信息沉淀下来，让课程评价、食堂体验、二手信息与校园互助更容易被发现、补充和验证。

项目第一阶段以广东外语外贸大学为主要校园，并通过统一的校园配置为未来扩展到广州大学城及更多高校预留空间。

## 当前进度

仓库目前已经完成品牌与账户体系的基础建设：

- 新版首页与响应式视觉体验，展示选课、干饭、二手交易和校园社区等产品方向
- 登录、分步注册、服务协议与隐私政策页面
- 基于 Prisma 的用户数据模型与数据库迁移
- 真实的密码账户注册与密码登录，密码通过 `crypto.scrypt` 哈希后存储
- 基于签名 Session 和 HttpOnly Cookie 的登录态、当前用户查询与退出登录
- 受登录保护的个人中心，展示昵称、学校、邮箱、手机号及验证状态
- 集中的校园配置与学校邮箱域名校验；当前仅广东外语外贸大学开放注册
- 邮件与短信验证 Provider 接口及未配置状态处理

邮件验证码和短信验证码服务目前尚未接入，因此快捷登录与真实邮箱、手机验证暂未开放。开发阶段允许创建基础密码账户，账户会明确保持为“待验证”状态，不会通过测试验证码伪造验证结果。

## 产品模块

| 模块 | 状态 | 说明 |
| --- | --- | --- |
| 品牌首页 | 已实现 | 呈现产品定位、核心场景与校园生活模块入口 |
| 校园账户 | 基础能力已实现 | 支持注册、密码登录、Session 登录态、退出与个人中心；身份验证 Provider 待接入 |
| 选课指南 | Planned | 课程与教师信息、学生真实评价和选课经验 |
| 干饭指南 | Planned | 食堂、档口、菜品信息与学生真实体验 |
| 二手交易 | Planned | 面向校内场景的闲置物品发布与流转 |
| 校园社区 | Planned | 校园话题、经验分享与同学互助 |
| 校园服务 | Planned | 聚合常用校园办事与生活服务信息 |
| 校园活动、校园猫咪等 | Planned | 按校园需求逐步扩展的生活内容模块 |

首页中的业务场景目前主要用于展示产品方向，不代表相应业务模块已经上线。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| Web 框架 | Next.js 16.3.6（App Router） |
| UI | React 19.2.8、Tailwind CSS 4、Lucide React |
| 开发语言 | TypeScript 5 |
| 数据库 | Prisma 6.19.3、SQLite |
| 认证 | jose 6.2.12、Node.js `crypto.scrypt`、HttpOnly Cookie Session |
| 服务端 | Next.js Route Handlers、Express 5.2.1、Zod 4.6.5 |
| 动效 | GSAP 3.15.0、Lenis 1.3.26 |

项目要求 Node.js 20 或更高版本、npm 9 或更高版本。

## 本地开发

以下命令适用于 Windows PowerShell：

```powershell
git clone https://github.com/mia03ther/YutuHub.git
Set-Location YutuHub

npm install
Copy-Item .env.example .env.local

npx prisma migrate dev

npm run dev
```

启动后访问 [http://localhost:3000](http://localhost:3000)。

请根据 [`.env.example`](.env.example) 准备本地环境变量。生产环境必须设置长度不少于 32 个字符的 `SESSION_SECRET`；不要把真实密钥或 `.env` 文件提交到仓库。当前 Prisma 配置使用本地 SQLite，`migrate dev` 会应用仓库中已有的迁移，Prisma Client 会由 `npm install` 的 `postinstall` 自动生成。

常用检查命令：

```powershell
npm run typecheck
npm run lint
npm run build
```

## 项目结构

```text
YutuHub/
├── app/                 # Next.js 页面与 Route Handlers
│   └── api/auth/        # 注册、登录、退出、会话与验证接口
├── components/          # 首页、认证与通用界面组件
├── lib/                 # 校园配置、认证、校验与共享类型
├── prisma/              # Prisma schema 与数据库迁移
├── server/              # 独立 Express 服务
├── public/              # 静态资源
└── docs/                # 项目技术与部署说明
```

## Roadmap

| 阶段 | 状态 | 目标 |
| --- | --- | --- |
| Phase 1 | 已完成 | 品牌定位、新版首页与核心视觉体验 |
| Phase 2 | 进行中 | 校园身份与账户系统；密码账户基础已完成，邮件和短信验证待接入 |
| Phase 3 | Planned | 选课指南：课程、教师、评价与检索 |
| Phase 4 | Planned | 干饭指南：食堂、档口、菜品与体验评价 |
| Phase 5 | Planned | 二手交易与校园社区 |
| Phase 6 | Planned | 从广东外语外贸大学扩展到广州大学城及更多高校 |

## 贡献

YutuHub 仍处于积极开发阶段。欢迎通过 Issue 提交问题、产品建议和校园需求，也欢迎针对明确问题发起 Pull Request。提交代码前，请运行类型检查、Lint 和生产构建，确保改动与当前产品方向一致，并清楚区分已实现能力与规划功能。

## License

[MIT](LICENSE)
