# Crédito Claro — Transparent Loan Simulator

**MVP prototype · Fintech · Product · UX**

A loan simulator built around one hypothesis: **greater cost transparency increases conversion to loan applications.** Users see the full picture of what a loan actually costs before they commit — no fine print, no surprises.

---

## The Problem

Most credit simulators in the Argentine market show a monthly payment and nothing else. Users don't understand how much interest they're actually paying, can't compare scenarios, and often don't know what TNA (nominal annual rate) or the French amortization system mean. This creates friction, distrust, and drop-off before the application step.

## My Approach

I scoped, designed, and built an end-to-end MVP in a single self-contained HTML file — no backend, no dependencies to install, works offline. The goal was to validate product decisions quickly and cheaply before investing in a full stack.

**Core features shipped:**

| Feature | Rationale |
|---|---|
| Interactive simulator with sliders + inputs | Reduces cognitive load; real-time feedback keeps users engaged |
| Donut chart breaking down capital vs. interest | Makes the total cost of credit viscerally clear — not just a number |
| "Cost per $100 received" metric | Gives users an intuitive anchor to compare any loan at a glance |
| Scenario comparator (side-by-side) | Reduces decision paralysis before applying; addresses a key drop-off point |
| Rate vs. Inflation module | Contextualizes credit cost against purchasing power loss — critical in the Argentine market |
| Plain-language explanation panel | Builds trust with first-time borrowers; targets low financial literacy |

## Product Decisions Worth Highlighting

**Offline-first data strategy.** Instead of calling a live API for inflation data, I pre-fetched and cached INDEC data (via ArgentinaDatos) as a static block. This eliminates a class of failure modes in demo/pitch contexts and ensures the product works regardless of API availability — a deliberate trade-off over real-time accuracy.

**French amortization system as default.** Most consumer credit in Argentina uses the French system (fixed installments). Matching the mental model users already have with their real-world loans was a product choice, not just a technical one.

**Out of scope for v1 (explicitly).** Real scoring, personalized offers, and live market rate feeds were deferred. The v1 validates one thing: does transparency itself move the needle?

## KPIs I Would Track in Production

- **Completion rate** — % of users who reach full results after adjusting at least one parameter
- **Scenario comparator usage** — signals active decision-making, not passive browsing
- **Explanation panel engagement** — proxy for financial literacy gaps in the audience
- **CTA click-through rate** — the conversion event the transparency hypothesis is built around

## Hypotheses to Test

1. Visual cost breakdown (chart) improves comprehension of total loan cost vs. text alone
2. Side-by-side scenario comparison reduces time-to-decision and increases CTA clicks
3. Plain-language definitions increase trust signals and reduce abandonment

## Stack

- Vanilla HTML + CSS + JavaScript — no framework overhead for a single-screen MVP
- Chart.js 4.4 (CDN) for data visualization
- INDEC inflation data (statically cached)

---

*Built as a portfolio artifact to demonstrate product thinking, hypothesis-driven development, and the ability to ship end-to-end from problem framing to working prototype.*
