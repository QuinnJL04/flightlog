# Flight Log & Fare Finder

A personal flight log and fare finder web app, built as a learning project for
TypeScript, frontend development, and AI-assisted development. It will
eventually support fare search, a Postgres-backed flight log, a color-coded
map of past flights, natural-language search, and a shared map with friends.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # lint with ESLint
npm run format     # format with Prettier
npm run db:migrate # create/apply a Prisma migration
npm run db:seed    # seed the database with an initial user
npm run db:studio  # browse the database with Prisma Studio
```

## Database

Postgres is hosted on Neon, provisioned through the Vercel Marketplace and
linked to this Vercel project. Environment variables (including
`DATABASE_URL`) are synced to `.env.local` via `vercel env pull .env.local`.
The schema lives in `prisma/schema.prisma` (`User`, `Trip`, `Airline`,
`Flight` models). There's no auth yet (that's Phase 6), so the app currently
operates against a single seeded user.

## Roadmap

- [x] Phase 1 — Skeleton + CI/CD to Vercel
- [x] Phase 2 — Postgres + Prisma; personal flight log (users, trips, flights, airlines)
- [ ] Phase 3 — Color-coded flight map (deck.gl or globe.gl)
- [ ] Phase 4 — Fare search via Duffel sandbox, behind one `flights` module; store fare snapshots
- [ ] Phase 5 — Natural-language flight search (Anthropic API tool use)
- [ ] Phase 6 — Auth (Clerk) + shared map with per-person filters
