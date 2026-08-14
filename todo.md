# Justin "Did You Know" — Project TODO

## Database & Backend
- [x] Add `facts` table to drizzle schema (id, videoId, videoTitle, videoUrl, fact, displayOrder, createdAt)
- [x] Generate and apply migration SQL
- [x] Add db helpers: getAllFacts, getFactById, getDailyFact, getRandomFact, getFactCount
- [x] Add tRPC procedures: facts.daily, facts.random, facts.list, facts.byId, facts.count
- [x] Seed database with all 76 extracted facts from clean_facts.json

## Frontend — Home Page
- [x] Daily fact card with "Listen, did you know..." lead-in label
- [x] Link from fact card to original YouTube Short
- [x] "Get Another Fact" button (random fact on demand)
- [x] Share button (Web Share API + clipboard fallback)
- [x] Subscribe CTA button linking to @justin_danger_nunley channel
- [x] First-time visitor welcome screen (localStorage controlled, shown once)

## Frontend — Archive Page
- [x] Browse all facts in a grid/list layout
- [x] Each fact card links to its source YouTube Short
- [x] Search/filter facts

## Frontend — Navigation
- [x] Top nav with: Home, Archive, Merch (placeholder)
- [x] Merch nav item is placeholder — shows "Coming Soon" toast on click
- [x] @justin_danger_nunley branding/link in nav or footer

## Design & Polish
- [x] Elegant dark theme with premium typography (Playfair Display + Inter)
- [x] Polished card design with hover animations
- [x] Responsive layout (mobile-first with hamburger menu)
- [x] Footer with channel link and credits
- [x] Stats bar (76 facts, Daily, 100% from Shorts)

## Testing
- [x] Vitest: facts procedures (daily, random, list, byId, count) — 9 tests passing
- [x] Vitest: seed data integrity check

## Repository Delivery
- [x] Synchronize the complete application source and repository metadata to `rblake2320/justin-did-you-know1`, then verify its GitHub contents
