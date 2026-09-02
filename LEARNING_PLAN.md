# Learning plan — build order

Companion to `README.md` (roadmap) and `HANDOFF.md` (session context). This
file is the curriculum: what gets built, in what order, and **who writes what**.

> **Re-ordered 2026-09-01.** The original README roadmap put auth last. The
> product Quinn actually described — create an account, land on *your*
> dashboard, trip log beside a friend-filterable map, planned trips pulling
> live airfare — requires knowing who the user is on day one. So auth moved
> from Phase 6 to step 1, and the map merged with the friends feature.

## How we work (the contract)

1. **Experiment list** — not a prose walkthrough. A terse table of
   **change this → this breaks → because**, so you learn it by breaking it
   yourself. Compile-time breakage (red squiggle) vs runtime breakage (wrong
   UI, silent bug) is called out, because that distinction is the lesson.
   Deep explanations only when you ask a direct question.
2. **Scaffold** — I write the plumbing (auth wiring, API clients, migrations,
   dataset wrangling — things you'd learn nothing from) and leave the app code
   as files with types, imports, and numbered `// TODO(you):` hints.
3. **You implement** — you fill the TODOs, run `npm run dev`, poke at it.
4. **Review** — you say "review"; I go line by line on what you wrote.
5. **Commit** — one commit per step, so git history is a learning log.

I don't fill in a TODO unless you explicitly ask ("just write it").

Every fresh shell: `source ~/.nvm/nvm.sh && nvm use 24.20.0` (see HANDOFF.md).

## Target UI

```
┌─────────────────────────────────────────────┐
│  FLIGHTLOG                      [avatar ▾]  │
├──────────────────┬──────────────────────────┤
│ MY TRIPS         │                          │
│                  │        ╭──────╮          │
│ 09/01/26         │      ╭─╯      ╰─╮        │
│ BOS ──→ NRT      │     │    globe   │       │
│ JAL              │      ╰─╮      ╭─╯        │
│                  │        ╰──────╯          │
│ 07/14/26         │                          │
│ NRT ──→ SIN      │  [x] Me   [ ] Friends    │
│ ANA              │                          │
├──────────────────┴──────────────────────────┤
│ PLANNED  BOS→LIS $412   BOS→CDG $538        │
└─────────────────────────────────────────────┘
```

Decisions locked in: Clerk's drop-in `<SignUp />`, log-left/map-right,
Share Tech Mono as the departure-board face, `/flights` folded into
`/dashboard`.

---

## Step 1 — Auth + dashboard shell ✅ done (2026-09-01)

| Who | What |
|---|---|
| me | `@clerk/nextjs` v7, `src/proxy.ts`, `/sign-in`, `/sign-up`, `ClerkProvider`, fonts |
| me | `User.clerkId` migration + `src/lib/user.ts` (Clerk id → our `User` row) |
| me | `src/app/dashboard/page.tsx` data fetching, `actions.ts` with the auth check |
| **you** | `trip-log.tsx` — TODOs 1–3 (empty state, `.map()` over flights, one board row) |
| **you** | `add-flight-form.tsx` — TODO 4 (four named inputs + submit) |

You learn: props and prop types, `.map()` + `key`, rendering `string \| null`,
JSX vs HTML, how a `<form action={serverAction}>` round-trips.

Done: Clerk app `flightlog` provisioned via the Clerk CLI, keys pulled,
sign-up → `/dashboard` works end to end. Owner wrote all four TODOs; typecheck
and lint clean.

## Step 1.5 — Speed, pending state, and inline errors

Tasks 5-8, scoped after the owner used the dashboard for the first time.
Full breakdown lives in `HANDOFF.md`. Short version: agent does the query
deduplication and the action's return-type change; **owner writes the
`useActionState` client component** (first `"use client"`, first hook) and
optionally the `useOptimistic` insert.

## Step 2 — Airports and coordinates

The map needs lat/lng. `Flight.origin` / `destination` are free-text strings
today, so this comes before any globe code.

| Who | What |
|---|---|
| me | `Airport` model, seed from a public IATA dataset, backfill existing rows |
| **you** | Swap free-text inputs for an airport picker; handle the "not found" case |

You learn: Prisma relations, migrations against live data, why you normalize.

## Step 3 — The globe

| Who | What |
|---|---|
| me | `react-globe.gl` install + the `next/dynamic({ ssr: false })` client wrapper |
| **you** | Map flights → arc data, color-code them, hover tooltips, click → detail |

You learn: why WebGL can't server-render, `useRef`/`useEffect` for imperative
libraries, typed DTOs, `useMemo`, deriving UI state.

## Step 4 — Friends

| Who | What |
|---|---|
| me | `Friendship` model + request/accept actions with the authorization checks |
| **you** | The friend list UI, and the map's `[x] Me [ ] Friends` filter toggles |

You learn: many-to-many relations, permission-scoped queries, lifting state up.

## Step 5 — Planned trips + live fares (Duffel)

| Who | What |
|---|---|
| me | `src/lib/flights/` — Duffel client behind one module boundary, response parsing |
| **you** | Planned-trip CRUD, the fare panel, "cheapest available" display |

You learn: `fetch`, validating `unknown` external data with Zod, discriminated
unions for success/error, Suspense + `loading.tsx`.

**Needs from you:** a Duffel sandbox account and API token.

## Step 6 — Natural-language search

Deferred until the above works. Route Handler + Anthropic tool use, where the
tools map to your existing Prisma filters and fare search.

---

## Open questions (decide when we reach them)

- **`Flight` is thin.** No flight number, arrival time, seat, cabin, aircraft.
  Add them during Step 2's migration?
- **Trips have no UI.** A default "My Flights" trip is created lazily. Do trips
  become a real feature (group flights into journeys), or get dropped?
- **Friend discovery.** Add by email, by username, or by invite link?
