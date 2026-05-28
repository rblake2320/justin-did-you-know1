# Architecture Overview

**Listen, Did You Know?** is a full-stack monorepo with a clear separation between client, server, and shared code. The application is designed to run as a single Node.js process in production.

---

## System Diagram

```
Browser (React SPA)
       │
       │  tRPC over HTTP (/api/trpc)
       ▼
Express Server (Node.js)
       │
       ├── tRPC Router (server/routers.ts)
       │       └── facts.daily / facts.random / facts.list / facts.byId / facts.count
       │
       ├── Auth (Manus OAuth via /api/oauth/callback)
       │
       └── Drizzle ORM
               └── MySQL / TiDB Database
                       └── facts table (76+ rows)
```

---

## Key Directories

| Path | Purpose |
|---|---|
| `client/src/pages/` | Page-level React components (Home, Archive) |
| `client/src/components/` | Reusable UI (Navigation, FactCard, WelcomeScreen) |
| `server/routers.ts` | All tRPC procedures |
| `server/db.ts` | Drizzle query helpers |
| `drizzle/schema.ts` | Database table definitions |
| `shared/` | Types and constants shared between client and server |
| `seed-facts.mjs` | One-time database seeder for the 76 extracted facts |

---

## Data Flow: Daily Fact

1. Client calls `trpc.facts.daily.useQuery()` on page load.
2. Server computes `dayIndex = dayOfYear % totalFacts` to deterministically select today's fact — same fact for all visitors on the same calendar day.
3. The fact row (id, fact text, videoId, videoTitle, videoUrl) is returned.
4. Client renders the `FactCard` component with the fact and a direct link to the YouTube Short.

## Data Flow: Random Fact

1. User clicks "Get Another Fact".
2. Client calls `trpc.facts.random.useMutation({ excludeId: currentFactId })`.
3. Server picks a random fact from the database, excluding the current one.
4. Client updates the displayed card with the new fact.

---

## Authentication

Authentication is optional for browsing. Manus OAuth is available for future features (e.g., favoriting facts, personalized history). The `protectedProcedure` wrapper in tRPC enforces auth on any procedure that requires it.

---

## Database Schema

```sql
CREATE TABLE facts (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  videoId      VARCHAR(20)  NOT NULL,
  videoTitle   TEXT         NOT NULL,
  videoUrl     VARCHAR(255) NOT NULL,
  fact         TEXT         NOT NULL,
  displayOrder INT          NOT NULL DEFAULT 0,
  createdAt    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
```

---

## Scraping Pipeline

The facts were extracted using the following pipeline (scripts in `/home/ubuntu/justin-facts/`):

1. `yt-dlp` — scraped all 1,509 Shorts URLs from the channel
2. `manus-analyze-video` — analyzed each video with a multimodal LLM to extract the "Listen, did you know..." segment
3. `process_facts.py` — cleaned, deduplicated, and filtered results to 76 high-quality facts
4. `seed-facts.mjs` — inserted all 76 facts into the database

The pipeline is fully reusable to expand the database as Justin posts new Shorts.
