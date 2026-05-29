# Billy Zhang — Portfolio

Personal portfolio built with Next.js, featuring live Lighthouse metrics, an AI chatbot, and a full blog platform with authentication.

## Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Styling** — Tailwind CSS v4, Framer Motion
- **Auth** — Clerk
- **Database** — Vercel KV (blog posts, PSI cache)
- **AI** — OpenAI / Anthropic (chatbot)
- **Deployment** — Vercel
- **Package manager** — pnpm

## Features

- **Hero with live build card** — streams real Vercel deployment info, GitHub commit data, and Google Lighthouse scores fetched via PSI API and cached in KV. Falls back to static data instantly; live data hydrates via React Suspense.
- **TOC navigator** — interactive spider-web section index rendered as an SVG. Ambient animations run as CSS `@keyframes` (zero JS runtime cost).
- **AI chatbot** — streaming chat powered by OpenAI/Anthropic, accessible from the portfolio.
- **Blog platform** — markdown-based posts with per-post likes and comments. Admin write access gated behind Clerk auth.
- **Sign-in modal** — custom Clerk sign-in flow embedded in the NavBar.

## Project Structure

/
├── src/
│   ├── app/
│   │   ├── temp/components/   # Active portfolio UI (HeroLarge, NavBar, TOCIndex, etc.)
│   │   ├── blogs/             # Blog listing, post pages, admin
│   │   ├── api/               # chat, blogs, PSI cron/webhook routes
│   │   ├── sign-in/           # Clerk auth pages
│   │   ├── sign-up/
│   │   └── sso-callback/
│   ├── lib/
│   │   ├── psi.ts             # Lighthouse data fetching + KV cache
│   │   ├── db.ts              # KV helpers
│   │   └── fetchLiveData.ts
│   └── proxy.ts               # Clerk middleware (rename to middleware.ts for production)
├── public/
│   ├── blogs/                 # Markdown blog post files
│   ├── brands/                # Tech stack SVG icons
│   └── projects/              # Project screenshots
└── vercel.json

## Deployed on Vercel
- Find main URL @ https://www.billyzhang.dev
