# Romana — Shared Expense Tracker

**Stack:** React Native (Expo) · Supabase · PostgreSQL · TypeScript

---

## What It Is

Romana is a mobile-first shared expense tracker. Users create groups, log expenses with flexible split options (even, percentage, or by item), and settle balances using a debt-simplification algorithm that minimizes the number of transactions needed to settle all balances.

The name comes from the Argentinian expression *"a la romana"* — splitting a bill equally at the table — which is the app's default and fastest path.

---

## The Problem It Solves

Splitting shared costs is a universal source of friction: dinner with friends, a group trip, roommate utilities, a one-off IOU. Existing tools are either too complex for casual use or too primitive to handle real-world group dynamics: late joiners, unequal splits, multiple settlements over time.

Romana targets a specific moment: **you just paid, other people are still at the table, and you need to log it in three taps.** Everything else — balance history, debt simplification, notifications — should happen without you thinking about it.

Three real scenarios shaped every design decision:

- **Maria pays for dinner.** At home she creates a group, adds ghost members by name, sends an invite link via WhatsApp. Her friends tap it, sign up, auto-join, and see their balance.
- **Quick log at the restaurant.** Open the app, tap the group, tap "+", type the amount. Even split with everyone already selected. Done.
- **New friend at the next dinner.** Scans a QR code and joins the group instantly. Existing balances are visible but they owe nothing from before.

---

## How It Was Crafted

### Product Design with BMAD

The product was designed using the **BMAD methodology** — a structured AI-assisted workflow that moves from business intent to technical spec through deliberate phases before writing any code.

The process produced a single design document that covers:

- **Data model** — seven tables with explicit extension points designed into the initial migration so future features (multi-currency, recurring expenses, receipt photos) never require schema refactors
- **Business logic** — all split calculations and balance math live in PostgreSQL functions, not on the client; the database is the single source of truth
- **User flows** — three real-world scenarios defined first; screens were derived from flows, not the other way around
- **Security** — row-level security policies specified table-by-table before implementation begins; no unauthenticated access path exists
- **Phased roadmap** — six implementation phases from MVP ("I can sign in and split a bill") to long-term features (recurring expenses, dispute workflow, analytics)

### Architecture

The architecture is intentionally **Supabase-heavy** — push as much logic as possible into the backend so the React Native client stays thin and focused on UX.

| Layer | Responsibility |
|---|---|
| Expo (React Native) | Screens, navigation, forms, push notification handler |
| Supabase Auth | Passwordless magic link + Google/Apple OAuth |
| PostgreSQL + RLS | All data; users only access their own groups |
| PL/pgSQL functions | Split calculations, balance aggregation, debt simplification |
| Supabase Realtime | Live balance updates via WebSocket — no pull-to-refresh |
| Edge Functions + Expo Push | Push notifications when a new expense is added |

### Key Technical Decisions

**Settlements are immutable.** A settlement is a fact — "I paid you back on this date" — not an editable record. Deleting or editing settlements would corrupt balance history. The schema enforces this with a no-DELETE policy on the settlements table.

**`expense_shares` stores resolved dollar amounts, not percentages.** Whether an expense is split evenly, by percentage, or by item, the result is always stored as "person X owes $Y." Balance calculations become a simple `SUM()`, and adding new split types only requires a new form and DB function — no schema changes.

**Seven extension points in the initial migration.** `preferences jsonb` on profiles, `currency text` on groups, `is_template boolean` on groups, nullable `user_id` on group_members, `metadata jsonb` on expenses, and a `group_events` audit table — all exist from day one. V1 ignores them. Future phases use them without touching the schema.

**Simplify debts as a read-only Postgres function.** `simplify_debts(group_id)` returns suggested transactions — it never writes. The user reviews the suggestions and confirms each payment explicitly. The algorithm runs in O(n log n) and produces at most N−1 transactions for N people.

---

## Why This Project

I designed Romana as a deliberate learning exercise and portfolio piece for the intersection of product and engineering. The goal was to own the full product lifecycle — from user research and flow design to data modeling and technical architecture — and to make every decision explicit and documented before touching code.

The BMAD methodology was central to that: it forced the hard product questions (What is the simplest path? What breaks at the edges? What should be extensible?) before any implementation choices were made. The result is a spec that could be handed to any developer and built without ambiguity.

---

## Status

Design complete. Implementation in progress (Phase 1: Foundation).

[GitHub →](https://github.com/ilopezmiguez-rgb/romana)
