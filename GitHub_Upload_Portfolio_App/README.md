# Harshit Gupta — Full-Stack Portfolio + Blog

A complete, production-ready personal brand website for a GTM & Brand Strategy consultant. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma + SQLite**, and a **Three.js** 3D hero. Includes a database, a blog with an admin panel, lead capture, and full SEO.

---

## What's included

| Area | Details |
|------|---------|
| **Public pages** | Home (3D hero), About, Services & Pricing, Work, Blog, Single post, Contact |
| **Blog** | Database-backed, Markdown content, categories, reading time, cover images |
| **Admin panel** | Password-protected. Create/edit/delete posts, view & manage leads (status, delete) |
| **Lead capture** | Contact form saves to the database; spam honeypot included |
| **SEO** | Per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, `rss.xml`, JSON-LD structured data |
| **Performance** | 3D auto-disables on mobile / reduced-motion; static rendering where possible |

---

## Quick start (easiest)

1. Double-click **`START_WEBSITE.bat`**.
2. Wait for it to say **Ready**. Your browser opens at **http://localhost:3000**.
3. Admin panel: **http://localhost:3000/admin** — password is in the `.env` file (`ADMIN_PASSWORD`), default `harshit-admin-2026`.

To stop the server, press **Ctrl + C** in the black window (or just close it).

> First run already has the database created and 3 sample blog posts seeded.
> If you ever need to reset/re-seed, double-click **`RESET_DATABASE.bat`**.

---

## Run it manually (for developers)

This project uses a portable Node at `C:\Harshit_Freelancing\_tools\node-v24.16.0-win-x64`.
Add it to PATH for the session, or install Node 20+ globally.

```powershell
$env:Path = "C:\Harshit_Freelancing\_tools\node-v24.16.0-win-x64;" + $env:Path
npm install          # already done
npm run setup        # create DB tables + seed sample posts
npm run dev          # http://localhost:3000
```

Other scripts:

```
npm run build        # production build
npm run start        # run the production build
npm run db:studio    # visual database browser (Prisma Studio)
```

---

## Editing content

- **Blog posts**: log into `/admin` → New Post. Content supports **Markdown** (headings, lists, bold, links, quotes, code).
- **Services, prices, work samples, social links, email**: edit `src/lib/site.ts`.
- **Your photo / portfolio images / sample PDFs**: in `public/` and `public/work/`.
- **Admin password & site URL**: edit `.env`.

---

## Before you go live (important)

1. Open `.env` and change:
   - `ADMIN_PASSWORD` → a strong password
   - `ADMIN_SESSION_SECRET` → a long random string
   - `NEXT_PUBLIC_SITE_URL` → your real domain (e.g. `https://harshitgupta.com`)
2. Update your real email and social links in `src/lib/site.ts`.

---

## Deploying online

This app needs a Node host **with a persistent database**.

### Option A — Railway / Render (simplest, keeps SQLite)
- Push this folder to a Git repo, connect it to Railway or Render.
- Build command: `npm run build` · Start command: `npm run start`
- Add the same `.env` variables in the dashboard.

### Option B — Vercel (recommended for scale, needs Postgres)
SQLite does not work on Vercel's serverless filesystem. Switch to a free Postgres:
1. Create a free DB at **neon.tech** (or Supabase).
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
3. Set `DATABASE_URL` to the Neon connection string.
4. Run `npx prisma db push` then `node prisma/seed.mjs`.
5. Deploy to Vercel and add the env variables.

---

## Tech stack

- **Next.js 14** (App Router, server components)
- **TypeScript**, **Tailwind CSS**
- **Prisma ORM** + **SQLite** (swap to Postgres for serverless)
- **Three.js** (lightweight 3D hero)
- **marked** (Markdown rendering)

---

## Project structure

```
Portfolio_App/
├─ prisma/
│  ├─ schema.prisma      # Post + Lead models
│  └─ seed.mjs           # sample blog posts
├─ public/               # photo, /work images + sample PDFs
├─ src/
│  ├─ app/
│  │  ├─ (public)/       # home, about, services, work, blog, contact
│  │  ├─ admin/          # login + protected panel (dashboard, posts, leads)
│  │  ├─ api/            # contact + admin APIs
│  │  ├─ sitemap.ts robots.ts rss.xml/  # SEO
│  ├─ components/        # Nav, Footer, Hero3D, ContactForm, admin UI...
│  └─ lib/               # prisma, auth, site config, utils
├─ START_WEBSITE.bat
└─ RESET_DATABASE.bat
```
