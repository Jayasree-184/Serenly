# Serenly (செரன்லி) — Production Mental Wellness Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748.svg)](https://www.prisma.io/)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **"Healing starts here."**  
> Serenly is a quiet, non-judgmental digital sanctuary designed to support individuals dealing with emotional exhaustion, anxiety, and depression. Built with privacy-by-design, non-competitive peer support, and clinical care safety anchors.

---

## 🌟 What's New in v2
- **Sanctuary Design Language**: Organic pebble UI, soft sage (`#A8C8B8`), cream canvas (`#F7F5EF`), and grounding teal (`#163C3A`) tokens based on Google Stitch designs.
- **Emotional Check-in & Flow Arc**: 5-state organic pebble selector, multi-tag emotional words, energy and moon-sleep phase sliders, and a 7-day Bezier emotional arc.
- **Private Distraction-Free Journal**: End-to-end user isolation, daily prompts carousel, automatic gentle word counter, tag filtering, and calendar browsing.
- **Coping Sanctuary**: Interactive Box Breathing (4-4-4-4) with reduced-motion support, 5-4-3-2-1 Grounding steps, and an ambient acoustic soundscape player (`calm1.mp3`, `rain.mp3`, `piano.mp3`).
- **Safety Anchor**: Persistent 24/7 crisis hotline directory (988 US/Global, 1800-599-0019 KIRAN India, 044-24640050 Sneha Tamil Nadu) and private Safety Plan.
- **Full Bilingualism (English & தமிழ்)**: Seamless runtime switching with no UI reloads.
- **Zero-Exposure Privacy**: Server-side resource isolation guards (User A can never read User B's journals), rate limiting, HTTP-only secure cookies, and redacted server logging.
- **Legacy Migration Utility**: Automatically detects previous `localStorage` data and allows one-click import into the modern platform.

---

## 📁 Repository Structure
```
serenly/
├── client/                     # Frontend Application (React 19, Vite, Tailwind CSS)
│   ├── public/assets/music/    # Calming audio tracks (calm1, rain, piano)
│   ├── src/
│   │   ├── components/layout/  # AppShell, Sidebar, Header, MobileBottomNav, Logo
│   │   ├── components/safety/  # EmergencyModal, SafetyAnchor
│   │   ├── hooks/              # useLocalStorageMigration, useAuth
│   │   ├── i18n/               # en.json, ta.json, i18n configuration
│   │   └── pages/              # Dashboard, Mood, Coping, Journal, Goals, Meds, Community, etc.
│   └── vite.config.ts
│
├── server/                     # Backend API Gateway (Node.js, Express, Prisma)
│   ├── prisma/
│   │   └── schema.prisma       # PostgreSQL schema with relational integrity
│   ├── src/
│   │   ├── config/             # Environment variables & constants
│   │   ├── controllers/        # Auth, Mood, Journal, Goals, Meds, Safety
│   │   ├── middleware/         # requireAuth, privacyLogger, globalErrorHandler
│   │   ├── routes/             # REST API endpoints
│   │   ├── tests/              # Automated security and isolation test suite
│   │   ├── utils/              # Bcrypt hashing, JWT tokens, Prisma client
│   │   └── validators/         # Zod schemas for request validation
│   └── .env.example
│
├── legacy/                     # Preserved v1 static source files (index.html, style.css, script.js)
├── docs/                       # Architecture, database, api, security, accessibility, migration docs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Node 24 recommended)
- npm 10+
- PostgreSQL (optional for local mock testing; Prisma supports Postgres and SQLite)

### 1. Installation
Clone the repository and install dependencies for both client and server:
```bash
# In client:
cd client
npm install

# In server:
cd ../server
npm install
```

### 2. Configure Environment
Copy the example environment file in `server/`:
```bash
cp server/.env.example server/.env
```

### 3. Generate Prisma Client
```bash
cd server
npx prisma generate
```

### 4. Running the Development Servers
In two separate terminals:
```bash
# Terminal 1: Client (Runs on http://localhost:5173)
cd client
npm run dev

# Terminal 2: Server (Runs on http://localhost:5000)
cd server
npm run dev
```

---

## 🧪 Testing & Verification

Run the automated backend security and authorization test suite:
```bash
cd server
npx tsx --test src/tests/security.test.ts
```

All 5 core security and multi-tenant isolation tests run and verify:
- Bcrypt 12-round work factor
- JWT token signing & verification
- **Critical barrier**: User A is blocked from User B private journals and moods
- Zod body validation and bad email rejection

---

## 🛡️ Privacy & Clinical Principles
- **No Ads, No Vanity Metrics**: Community spaces intentionally lack like counts, subscriber counts, and algorithm rankings.
- **Clinical Non-Overclaiming**: Serenly clearly differentiates between peer support, licensed therapy, and acute emergency care.
- **Zero-Exposure Logging**: Private journals and mood notes are never exposed to server access logs or analytics.

---

## 📄 License
Open source and built for human emotional wellbeing.
