# Food24h

Modern Cambodian food marketplace and delivery platform.

## Architecture

```text
Customer Next.js app ─┐
                      ├─ NestJS API ─ PostgreSQL (Prisma)
Admin Next.js app ────┘       │
                              ├─ Redis
                              ├─ Socket.IO
                              └─ AWS S3
```

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL, Prisma |
| Cache | Redis |
| Real-time | Socket.IO |
| UI | Tailwind CSS, shadcn/ui |
| Storage | AWS S3 |
| Testing | Jest, Playwright |
| Deployment | Vercel, Render, VPS |
| CI/CD | GitHub Actions |

## Monorepo

```text
user-frontend/  # Customer app on port 3001
admin-frontend/ # Admin app on port 3002
backend/        # NestJS API on port 3000
```

## Local setup

```bash
docker compose up -d

cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev

cd ../user-frontend
npm install
npm run dev

cd ../admin-frontend
npm install
npm run dev
```

Local URLs:

- Customer: `http://localhost:3001`
- Admin: `http://localhost:3002`
- API health: `http://localhost:3000/api/v1/health`

## Environment

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Backend: copy `backend/.env.example` to `backend/.env` and configure PostgreSQL, Redis, CORS, and AWS S3.

## Testing

```bash
cd backend
npm test
npm run test:e2e

cd ../user-frontend
npm run lint
npm run build
```
