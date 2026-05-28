# Listen, Did You Know? — Justin Danger Nunley

> A daily dose of fascinating facts, straight from [@justin_danger_nunley](https://www.youtube.com/@justin_danger_nunley/shorts)'s YouTube Shorts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tests](https://img.shields.io/badge/tests-14%20passing-brightgreen.svg)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20tRPC%20%7C%20MySQL-blueviolet.svg)

---

## Overview

**Listen, Did You Know?** is a full-stack web application that captures the iconic "Listen, did you know..." facts from Justin Danger Nunley's YouTube Shorts and delivers one fresh, surprising fact every single day. Each fact card links directly back to its original YouTube Short, driving fans back to Justin's channel and keeping them engaged between videos.

The app was built by scraping and AI-analyzing 100 of Justin's Shorts to extract 76 genuine "did you know" facts, all seeded into a live database. The scraping pipeline is fully reusable and can be run against the remaining 1,400+ Shorts to grow the database to 1,000+ facts.

---

## Live Demo

> Deploy via the [Manus platform](https://manus.im) — click **Publish** after checkout.

---

## Features

| Feature | Description |
|---|---|
| **Daily Fact** | A new "Listen, did you know..." fact every day — same fact for all visitors on the same calendar day |
| **Get Another Fact** | Shuffle to any random fact on demand |
| **Watch the Short** | Every fact links directly to its original Justin Danger Nunley YouTube Short |
| **Share** | One-tap sharing via Web Share API with clipboard fallback |
| **Subscribe CTA** | Prominent button linking directly to Justin's YouTube channel |
| **Welcome Screen** | One-time first-visit modal (localStorage-controlled) introducing the app |
| **Fact Archive** | Searchable grid of all 76 collected facts with source video links |
| **Merch Placeholder** | Nav item ready to be wired up when Justin launches merchandise |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend | Node.js, Express 4, tRPC 11 |
| Database | MySQL via Drizzle ORM |
| Auth | Manus OAuth (optional — not required to browse) |
| Fonts | Playfair Display (headings), Inter (body) |
| Testing | Vitest — 14 tests passing |
| Deployment | Manus platform (Cloud Run, Node.js) |

---

## Project Structure

```
client/
  src/
    pages/
      Home.tsx              ← Daily fact card, welcome screen, share & subscribe CTAs
      Archive.tsx           ← Searchable grid of all facts
    components/
      Navigation.tsx        ← Top nav with Home, Archive, Merch, Subscribe
      FactCard.tsx          ← Reusable fact card with video link and share button
      WelcomeScreen.tsx     ← First-time visitor modal (localStorage-controlled)
drizzle/
  schema.ts                 ← facts table definition
server/
  db.ts                     ← Query helpers (getDailyFact, getRandomFact, getAllFacts, etc.)
  routers.ts                ← tRPC procedures (facts.daily, facts.random, facts.list, facts.byId, facts.count)
  facts.test.ts             ← Vitest tests for all facts procedures
seed-facts.mjs              ← One-time seed script for the 76 extracted facts
docs/
  ARCHITECTURE.md           ← Full system architecture and data flow documentation
```

---

## How the Facts Were Collected

The fact database was built using a three-step automated pipeline:

**Step 1 — Channel scraping.** All YouTube Shorts URLs were scraped from [@justin_danger_nunley](https://www.youtube.com/@justin_danger_nunley/shorts) using `yt-dlp`, discovering **1,509 Shorts** in total.

**Step 2 — AI transcript analysis.** A sample of **100 Shorts** was analyzed using multimodal AI video analysis to locate and extract the "Listen, did you know..." segment from each video, capturing the exact fact text and the source video URL.

**Step 3 — Curation and seeding.** Results were filtered to keep only genuine "did you know" statements, yielding **76 high-quality facts**. All 76 were seeded into the database with their video IDs, titles, and direct YouTube Short URLs.

The pipeline is fully reusable — running it against the remaining ~1,400 Shorts will expand the database to 1,000+ facts with no code changes required.

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- A MySQL database (local or hosted)

### Installation

```bash
# Clone the repository
git clone https://github.com/rblake2320/justin-did-you-know1.git
cd justin-did-you-know1

# Install dependencies
pnpm install

# Configure environment variables
# Create a .env file with the following:
# DATABASE_URL=mysql://user:password@host:3306/dbname
# JWT_SECRET=your-secret-key

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Seed the facts database
node seed-facts.mjs

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## Running Tests

```bash
pnpm test
```

All 14 tests cover:

- Facts DB helpers (`getAllFacts`, `getFactById`, `getDailyFact`, `getRandomFact`, `getFactCount`)
- tRPC router procedures (`facts.list`, `facts.daily`, `facts.random`, `facts.count`, `facts.byId`)
- Seed data integrity (76 facts, all required fields present, all URLs valid)
- Auth logout flow

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request. All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Roadmap

See [ideas.md](ideas.md) for the full list of planned features. Key near-term goals include:

- Scale to the full 1,509 Shorts (pipeline already built — just needs to be run)
- Weekly automated scraping of new Shorts as Justin posts them
- Email and push notification opt-in for the daily fact
- Merch store integration when Justin launches merchandise

---

## Credits

All facts are sourced directly from **Justin Danger Nunley's** YouTube Shorts. This is a fan-built project designed to help surface Justin's content and grow his audience.

- YouTube: [@justin_danger_nunley](https://www.youtube.com/@justin_danger_nunley/shorts)

---

## License

This project is licensed under the [MIT License](LICENSE).
