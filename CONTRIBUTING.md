# Contributing to Listen, Did You Know?

Thank you for your interest in contributing! This project is a fan-built companion app for [@justin_danger_nunley](https://www.youtube.com/@justin_danger_nunley/shorts)'s YouTube Shorts, and contributions that help grow the fact database, improve the UI, or expand features are very welcome.

---

## Ways to Contribute

### 1. Report a Bug

If you find a bug, please [open an issue](https://github.com/rblake2320/justin-did-you-know/issues) with:

- A clear title describing the problem
- Steps to reproduce it
- What you expected to happen vs. what actually happened
- Screenshots if applicable

### 2. Suggest a Feature

Have an idea? Open an issue with the `enhancement` label. Good ideas include:

- New display modes for facts (e.g., carousel, flip card)
- Email or push notification opt-in for the daily fact
- Improved share card design
- Accessibility improvements

### 3. Submit a Pull Request

1. Fork the repository and create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Make your changes, following the code style (Prettier is configured — run `pnpm format` before committing).

4. Write or update tests in `server/*.test.ts` using Vitest:
   ```bash
   pnpm test
   ```

5. Commit with a clear, descriptive message:
   ```bash
   git commit -m "feat: add email opt-in for daily fact"
   ```

6. Push your branch and open a pull request against `main`.

---

## Development Setup

```bash
# Clone the repo
git clone https://github.com/rblake2320/justin-did-you-know.git
cd justin-did-you-know

# Install dependencies
pnpm install

# Set up environment variables (see README for required vars)
cp .env.example .env

# Run database migrations
pnpm drizzle-kit generate
# Apply the generated SQL to your database

# Seed the facts database
node seed-facts.mjs

# Start the dev server
pnpm dev
```

---

## Code Style

- **TypeScript** everywhere — no `any` unless absolutely necessary
- **Prettier** for formatting — run `pnpm format` before committing
- **Tailwind CSS** for styling — avoid inline styles
- **tRPC** for all API calls — no raw fetch/Axios wrappers
- **Vitest** for tests — aim to keep coverage meaningful, not just high

---

## Commit Message Convention

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `chore:` | Dependency updates, tooling |

---

## Questions?

Open an issue or start a discussion — happy to help!
