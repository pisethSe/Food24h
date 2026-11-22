# Food24h NestJS API

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

Endpoints:

- `GET /api/v1/health`
- `GET /api/v1/foods`
- `GET /api/v1/foods/:id`
- `GET /api/v1/restaurants`
- `GET /api/v1/restaurants/:id`

The API uses PostgreSQL through Prisma, Redis for cache integration, Socket.IO for real-time updates, and AWS S3 signed uploads.
