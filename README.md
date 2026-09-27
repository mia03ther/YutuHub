# 屿途知汇 / YuTuHub

> 大学生自己的校园信息集市。

## 项目介绍

屿途知汇是面向大学生的校园信息集市，第一阶段聚焦**校园二手交换**，未来将承载校园服务、学生技能、AI 工具和独立产品。

核心场景：让校园里的闲置、技能和信息重新流动起来。

## 功能列表

- 商品浏览与卡片展示
- 分类筛选（技术 / AI / 设计 / 学习 / 求职 / 二手 / 校园）
- 实时搜索（标题、描述、分类、作者）
- 商品详情弹窗（Esc / 点击背景关闭）
- 收藏功能（localStorage 持久化）
- 随机浏览
- 发布入口

## 技术栈

- **框架**：Next.js 16（App Router）
- **语言**：TypeScript 5（strict）
- **组件库**：React 19
- **样式**：Tailwind CSS 4
- **图标**：lucide-react
- **字体**：Geist（next/font）

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
# 浏览器打开 http://localhost:3000

# 生产构建
npm run build

# 生产启动
npm run start

# 代码检查
npm run lint
```

## 部署（阿里云 + PM2）

### 服务器环境要求

- Ubuntu 20.04+
- Node.js 20+
- npm 9+
- PM2（可选，推荐）

### 安装 PM2

```bash
npm install -g pm2
```

### 部署流程

```bash
# 1. 上传代码到服务器
# 2. 安装依赖
npm install --omit=dev

# 3. 构建生产版本
npm run build

# 4. 启动服务
pm2 start npm --name yutuhub -- start

# 5. 保存 PM2 进程配置
pm2 save

# 6. 设置开机自启
pm2 startup
```

### 常用 PM2 命令

```bash
pm2 status
pm2 logs yutuhub
pm2 restart yutuhub
pm2 stop yutuhub
```

## 截图

待补充。

## License

MIT