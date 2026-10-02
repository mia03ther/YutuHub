# YutuHub Architecture

> Target: Web + WeChat Mini Program + Node.js API + MySQL

## 1. Overview

```
┌─────────────────┐    HTTP     ┌──────────────────┐    MySQL    ┌──────────┐
│  Next.js Web    │◄──────────►│  Node.js REST    │◄───────────►│  MySQL   │
│  (port 3000)    │             │  API (port 3001) │             │          │
└─────────────────┘    HTTP     └──────────────────┘    MySQL    ┌──────────┘
                                                          │  ┌──────────────────────┐
┌─────────────────┐    HTTP     ┌──────────────────┐    │  │  Database Schema    │
│  WeChat Mini    │◄──────────►│  Node.js REST    │◄───┘  │  (database/)        │
│  Program        │             │  API (port 3001) │       │                     │
│  (port 自适应)   │             │                  │       │  users               │
└─────────────────┘             └──────────────────┘       │  categories          │
                                                            │  posts               │
                                                            │  comments            │
                                                            │  likes               │
                                                            │  favorites           │
                                                            │  reports             │
                                                            │  achievements        │
                                                            │  user_achievements   │
                                                            └──────────────────────┘
```

## 2. Deployment Target

- **Server**: Alibaba Cloud ECS, 2 vCPU / 2 GB RAM, Ubuntu 20.04+
- **Runtime**: Node.js 20+
- **Process Manager**: PM2 (recommended)
- **Reverse Proxy**: Nginx
- **Frontend**: `npm run build && npm run start` (port 3000)
- **API**: `npm run server:build && npm run server:start` (port 3001)

Two Node.js processes coexist on the same machine. Nginx proxies both:

```nginx
server {
    listen 80;
    server_name yutu.example.com;

    location / {            proxy_pass http://localhost:3000; }   # Web
    location /api/ {        proxy_pass http://localhost:3001; }   # API
}
```

## 3. Data Flow

1. **Frontend request**: Next.js UI calls `GET /api/posts` via `fetch`.
2. **API server**: Express routes → Service layer → Database query.
3. **Database**: MySQL returns rows; service formats into API response.
4. **Response**: Standard JSON envelope `{ success, data, message }`.

## 4. API Response Format

All endpoints return a standardized envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "OK",
  "code": 0
}
```

Error responses:

```json
{
  "success": false,
  "error": "Description",
  "code": 404
}
```

## 5. Database Schema Summary

| Table              | Purpose                          |
|--------------------|----------------------------------|
| `users`            | User accounts (微信绑定, 匿名名) |
| `categories`       | Post categories (技术, AI, ...)   |
| `posts`            | Listings / services / products  |
| `comments`         | Nested comments on posts         |
| `likes`            | Post likes (用户-帖子唯一约束)   |
| `favorites`        | User favorites (用户-帖子唯一约束)|
| `reports`          | Content/user reports             |
| `achievements`     | Achievement definitions          |
| `user_achievements`| User-earned achievements (多对多)|

## 6. Future Development Phases

### Phase 1 (Current) — Infrastructure ✅
- [x] API server skeleton (`server/`)
- [x] Database schema design (`database/schema.sql`)  
- [x] API route scaffolding with mock data
- [x] Health check endpoint
- [ ] Connect API server to MySQL
- [ ] Add authentication (微信登录)

### Phase 2 — Data Layer
- Implement `getPool()` with `mysql2`
- Migrate mock data to real DB queries
- Add pagination via SQL `LIMIT/OFFSET`

### Phase 3 — User System
- WeChat Mini Program login (code → session_key → openid)
- JWT token issuance from API
- Anonymous name generation
- User profile CRUD

### Phase 4 — Mini Program
- Basic structure under `miniapp/`
- API client integration
- Pages: home feed, post detail, publish, profile

### Phase 5 — Full Feature Parity
- Real-time notifications
- Image upload & CDN
- Search (Elasticsearch or MySQL FULLTEXT)
- Analytics dashboard
