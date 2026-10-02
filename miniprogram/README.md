# 微信小程序

> 计划中 — 此目录将承载 YutuHub 微信小程序前端。

## 规划结构

```
miniprogram/
├── app.tsx                    # 小程序入口
├── app.json                   # 页面路由配置
├── app.wxss                   # 全局样式
├── project.config.json        # 微信开发者工具配置
├── sitemap.json               # SEO 配置
├── pages/
│   ├── index/                 # 首页 (帖子列表)
│   ├── post/                  # 帖子详情
│   ├── publish/               # 发布页面
│   ├── profile/               # 个人中心
│   └── favorites/             # 收藏列表
├── components/                # 可复用组件
├── styles/                    # 样式文件
└── utils/
    └── api.ts                 # 请求封装 (调用 Node.js REST API)
```

## 开发计划

1. 使用微信开发者工具创建基础项目结构
2. 调用 `server/` 中的 REST API (端口 3001)
3. 实现首页帖子列表 + 搜索 + 分类筛选
4. 实现帖子详情 + 收藏 + 点赞 + 举报
5. 实现微信登录 (code → session_key → 用户绑定)
6. 实现发布页面 (表单 + 图片上传)
7. 实现个人中心 (收藏、历史、成就)

## 与 Web 的代码共享

- 数据模型类型: `server/types/index.ts`
- API 路由: `server/routes/*.ts`
- 数据库 schema: `database/schema.sql`

小程序通过 HTTP 请求与 Node.js API 服务器交互，与 Next.js Web 共享同一套 API。
