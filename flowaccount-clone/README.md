# FlowAccount Clone (MVP)

Minimal invoicing app built with Next.js App Router, Prisma (SQLite), Tailwind.

## Quickstart

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## Features

- Auth (register/login) via JWT httpOnly cookie
- Customers CRUD (create implemented)
- Products CRUD (create implemented)
- Invoices creation with items and totals
- Dashboard stats

## Notes

- This is an MVP for demo purposes.
- Switch to Postgres by updating `prisma/schema.prisma` and `DATABASE_URL`.