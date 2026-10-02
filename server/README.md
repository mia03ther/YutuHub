# YutuHub API Server

Standalone Express-based REST API server for the YutuHub platform.

## Architecture

```
Next.js Web (port 3000)
  ↓ HTTP
Node.js API (port 3001)    ← this server/
  ↓ MySQL connection
MySQL (planned)
```

## Prerequisites

- Node.js 20+
- The shared `node_modules/` from the root project (no extra setup needed)

## Development

### Build + Run

```bash
# Compile TypeScript to ./dist
npm run server:build

# Start the compiled server
npm run server:start
```

The server boots on **port 3001** by default. Override with the `PORT` env var:

```bash
PORT=4000 npm run server:start
```

### Endpoints

| Method | Path               | Description                              |
|--------|--------------------|------------------------------------------|
| GET    | `/api/health`      | Server health check                      |
| GET    | `/api/posts`       | List posts (filter, sort, paginate)      |
| GET    | `/api/posts/:id`   | Get a single post                        |
| POST   | `/api/posts`       | Create a post *(stub)*                   |
| POST   | `/api/posts/:id/like`   | Like a post *(stub)*              |
| POST   | `/api/posts/:id/favorite` | Favorite a post *(stub)*        |
| POST   | `/api/posts/:id/report` | Report a post *(stub)*          |

## Directory Structure

```
server/
├── index.ts           # Entry point — creates & starts the Express app
├── routes/
│   ├── index.ts          # Mounts all API route modules
│   ├── health.ts         # GET /api/health
│   └── posts.ts          # /api/posts endpoints
├── middleware/
│   ├── requestLogger.ts  # HTTP request logging
│   └── errorHandler.ts   # 404 + 500 error handling
├── services/
│   └── postService.ts    # Post business logic (Prisma-backed)
├── utils/
│   ├── prisma.ts         # PrismaClient singleton + lifecycle
│   ├── mockData.ts       # Legacy in-memory mock data (unused)
│   └── response.ts       # Standardized API response helpers
├── types/
│   └── index.ts          # Shared TypeScript interfaces
└── README.md             # This file
```

## Environment Variables

| Variable      | Default  | Description                          |
|---------------|----------|--------------------------------------|
| `PORT`        | `3001`   | Port the API server listens on       |
| `NODE_ENV`    | `development` | Runtime environment              |
| `CORS_ORIGIN` | `*`      | CORS allow-list for frontend/Mini   |
| `DATABASE_URL`| `file:./yutuhub.db` | SQLite file, relative to `prisma/` |

## Database

Schema is defined in `prisma/schema.prisma` and managed by Prisma against a
local SQLite file. `database/schema.sql` documents the intended MySQL design.

```bash
npx prisma migrate dev --name <change>   # create + apply a migration
npx prisma migrate status                # verify the database is in sync
```

`DATABASE_URL` is resolved relative to the `prisma/` directory, so both the
Prisma CLI and the running server open the same file. The database file itself
is git-ignored; migrations under `prisma/migrations/` are tracked.

## Production Notes

- The server is designed for **2 vCPU / 2 GB RAM** Alibaba Cloud ECS instances.
- Express + cors are lightweight and well within those resource limits.
- PM2 is recommended for process management (see DEPLOY.md).
