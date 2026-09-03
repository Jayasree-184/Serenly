# Serenly Architecture Guide

## High-Level Topology
Serenly v2 is architected as a decoupled, multi-tier mental wellness web application:

```
[Browser / PWA Client]
       │
       ▼ (HTTPS / Secure Cookies)
[Express API Gateway & Security Layer]
       │
       ├── Middleware: Helmet, CORS, RateLimiter, PrivacyLogger
       ├── Ownership Guards: assertOwnership()
       │
       ▼
[Controllers & Domain Services]
       │
       ▼
[Prisma ORM]
       │
       ▼
[PostgreSQL Database]
```

## Frontend Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS with the custom "Sanctuary" token palette
- **Routing:** React Router v7 with persistent AppShell (Sidebar on desktop, Bottom Navigation on mobile)
- **State Management:** TanStack Query + React Context
- **Internationalization:** `i18next` with bilingual runtime switching (English & Tamil)
- **Media:** Web Audio API with smooth volume fading, loop toggling, and native acoustic soundscapes

## Backend Stack
- **Runtime:** Node.js (v24+) + TypeScript
- **Server:** Express with strict REST APIs
- **ORM & DB:** Prisma v6 + PostgreSQL
- **Security:** HTTP-only cookies, bcrypt password hashing (12 rounds), Helmet headers, IP rate limiting, and Zod schema validation
- **Zero-Exposure Privacy:** Privacy logger scrubs sensitive journal entries, notes, and safety plans from standard stdout diagnostic logs.
