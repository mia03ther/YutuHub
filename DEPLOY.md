# 屿途知汇 · 部署指南

> 面向阿里云 Ubuntu 服务器的生产部署流程。

## 服务器环境要求

| 组件 | 最低版本 |
|---|---|
| 操作系统 | Ubuntu 20.04 LTS 或更高 |
| Node.js | 20.0.0 或更高 |
| npm | 9.0.0 或更高 |
| PM2 | 5.x（推荐） |

## 安装 PM2

```bash
npm install -g pm2
```

## 部署流程

### 1. 准备服务器

确保服务器已安装 Node.js 20+：

```bash
node --version
npm --version
```

### 2. 安装 PM2（如未安装）

```bash
npm install -g pm2
```

### 3. 上传代码

将项目代码上传到服务器，例如使用 `scp` 或 `rsync`：

```bash
# 上传整个项目
scp -r ./ yutuhub@your-server:/var/www/yutuhub
```

### 4. 安装依赖

```bash
cd /var/www/yutuhub
npm install --omit=dev
```

### 5. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 填写实际配置
```

### 6. 构建生产版本

```bash
npm run build
```

### 7. 启动服务

```bash
pm2 start npm --name yutuhub -- start
```

### 8. 保存 PM2 配置

```bash
pm2 save
```

### 9. 设置开机自启

```bash
pm2 startup
```

## 常用 PM2 命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs yutuhub

# 重启
pm2 restart yutuhub

# 停止
pm2 stop yutuhub

# 删除
pm2 delete yutuhub
```

## Nginx 反向代理（推荐）

如果使用 Nginx 作为反向代理，添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 验证部署

```bash
# 检查服务是否运行
curl http://localhost:3000

# 检查 PM2 状态
pm2 status
```

## 环境变量说明

| 变量 | 说明 | 默认值 |
|---|---|---|
| NODE_ENV | 运行环境 | production |
| PORT | 监听端口 | 3000 |
| HOSTNAME | 监听地址 | 0.0.0.0 |