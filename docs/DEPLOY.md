# YutuHub 部署文档

覆盖 Web 前端、Express API 与小程序三部分。

---

## 1. 前置要求

| 组件 | 版本 |
|---|---|
| Node.js | ≥ 20（推荐 22 LTS） |
| npm | ≥ 9 |
| PM2 | 5.x（仅 API 与自托管 Web 需要） |
| 数据库 | SQLite（默认）或任意 Prisma 支持的托管库 |

---

## 2. 环境变量

从 `.env.example` 复制并填写：

```bash
cp .env.example .env.local
```

必填项：

| 变量 | 作用 | 缺失后果 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap / OG 的基准地址 | 搜索引擎收录错误域名 |
| `DATABASE_URL` | Prisma 连接串 | 启动失败 |
| `SESSION_SECRET` | 会话签名 | 生产环境会话可被伪造 |
| `API_PORT` | API 监听端口（默认 3001） | 小程序请求失败 |
| `NEXT_PUBLIC_API_BASE_URL` | 小程序访问 API 的公网地址 | 小程序无法加载数据 |

微信相关（小程序需要）：

| 变量 | 说明 |
|---|---|
| `WECHAT_APPID` / `WECHAT_SECRET` | 服务端调用 `code2session` 换取 openid |

> `.env*` 已被 `.gitignore` 排除。生产环境请用部署平台的 Secret 管理，不要写进代码库。

---

## 3. 部署 Web 前端

### 3.1 Vercel

1. 连接仓库 `mia03ther/YutuHub`
2. Framework Preset 选 Next.js，Build Command 用默认 `npm run build`
3. 在 Settings → Environment Variables 添加 `NEXT_PUBLIC_SITE_URL`、`DATABASE_URL`、`SESSION_SECRET`
4. Deploy

Vercel 会自动执行 `npm install` → `postinstall: prisma generate` → `next build`。

### 3.2 自托管（PM2）

```bash
git clone git@github.com:mia03ther/YutuHub.git
cd YutuHub

npm ci
npx prisma migrate deploy
npm run build

pm2 start npm --name yutuhub-web -- start
pm2 save
pm2 startup
```

反向代理示例（Nginx）：

```nginx
server {
  listen 80;
  server_name yutuhub.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

---

## 4. 部署 API 服务

**必须作为长驻进程运行，不能放 Serverless** —— Prisma 需要稳定连接，Serverless 冷启动会导致连接耗尽。

```bash
npm run server:build

pm2 start dist/server/index.js \
  --name yutuhub-api \
  --env production \
  --update-env

pm2 save && pm2 startup
```

健康检查：

```bash
curl http://127.0.0.1:3001/api/health
```

数据库迁移（首次部署或 schema 变更时）：

```bash
npx prisma migrate deploy
```

CORS 目前默认放开。接入生产域名后需在 `server/index.ts` 中改为白名单，不要保留 `*`。

---

## 5. 部署小程序

见 `YutuHub-miniapp` 仓库的 `README.md`。关键步骤：

1. 微信公众平台 → 开发管理 → 服务器域名，把 API 域名加入 `request` 白名单
2. `miniprogram/app.ts` 的 `globalData.apiBase` 改为生产 API 地址
3. `globalData.mockMode` 置为 `false`
4. 上传审核

---

## 6. 发布前检查清单

```bash
npm run typecheck   # 必须零错误
npm run lint        # 必须零错误零告警
npm run build       # 必须成功
```

- [ ] `NEXT_PUBLIC_SITE_URL` 已设为真实域名
- [ ] `/sitemap.xml` 与 `/robots.txt` 可访问且域名正确
- [ ] `SESSION_SECRET` 已设置（非空）
- [ ] 数据库已 `migrate deploy`
- [ ] API 健康检查通过
- [ ] 小程序 `mockMode` 已切到 `false`（若已联调后端）

---

## 7. 常见问题

**构建报 Prisma client 未生成**
执行 `npx prisma generate`。`postinstall` 已配置，若使用了跳过 install scripts 的环境（`npm ci --ignore-scripts`）需手动补一次。

**首次加载 JS 偏大**
检查是否有页面误标 `"use client"`。列表页应保持 RSC，只有交互叶子节点用客户端组件。构建后看 `.next/diagnostics/route-bundle-stats.json` 的 `firstLoadUncompressedJsBytes`。

**sitemap 域名不对**
`NEXT_PUBLIC_SITE_URL` 没生效。Next.js 只在构建时读取该变量，改完需要重新构建。

**API 连接数据库超时**
SQLite 文件路径在 `server/` 与项目根目录之间会解析成不同位置。`DATABASE_URL` 使用相对于 `prisma/` 目录的路径。