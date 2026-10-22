# RIZZY — Product Requirements Document

**Status:** v1.0 · presentation prototype  
**Owner:** RIZZY  
**Build target:** static site, GitHub Pages  
**Last updated:** 22 October 2026

## 1. Project summary

RIZZY is a premium, interactive brand presentation for a proposed food concept:
**Chicken Katsu + Es Kelapa**, with the approved tagline **“Praktis, Segar, Pas di Kantong.”**

The site tells the brand story, presents the product, and demonstrates a proposed
ordering journey: package selection → checkout summary → QRIS/USDT payment simulation
→ scripted verification statuses.

It is **not** an operating shop. There is no database, backend, payment gateway,
authentication, analytics, or real order submission.

## 2. Context and constraints

| Item | Decision |
| --- | --- |
| Primary purpose | Competition presentation and brand showcase |
| Secondary purpose | Demonstrate the proposed ordering flow |
| Audience | Competition judges, prospective customers |
| Hosting | GitHub Pages, static output |
| Architecture | Client-side React SPA with hash routing |
| Data | None persisted; in-memory React state only |
| Payments | Visual simulation only |
| Prices | Demonstration values only; official prices not established |
| Photography | Supplied product and team photos only; no stock/generated food imagery |
| Brand identity | Derived from the supplied RIZZY logo (blue family) |

## 3. Goals

1. Establish RIZZY as a distinctive, premium, approachable food brand within the first viewport.
2. Communicate the product concept and customer value without inventing market claims.
3. Demonstrate the full ordering journey reliably on stage, including error-like states.
4. Be fast, responsive, keyboard accessible, and safe to host on GitHub Pages.
5. Make every placeholder and demo value obvious and easy to replace.

## 4. Non-goals

- Accepting real orders, payments, or personal data.
- QR codes that encode a merchant, wallet, or payment destination.
- Admin authentication, dashboards, or real verification.
- Inventory, delivery, tax, discount, or account features.
- Persisting carts or orders across refreshes.
- Claims about market size, customer counts, awards, nutrition, or certifications.
- Publishing the site or pushing to a remote repository (requires owner authorization).

## 5. Users and journeys

### Judge / visitor
1. Lands on the page and understands the brand and product within seconds.
2. Scrolls through story, need, product, and value sections.
3. Presses **Buy Now** and lands on package selection.
4. Selects a demo package, adjusts quantity, sees subtotal.
5. Reviews the checkout summary.
6. Opens the payment step and switches between QRIS and USDT.
7. Sees clearly non-functional QR graphics and demo instructions.
8. Runs the scripted statuses (paid → under/over → verified → processing → completed).
9. Resets the demo to run it again.

### Presenter
- Needs deterministic states (no random outcomes).
- Needs a visible demo notice on every transactional screen.
- Needs one reset control that returns to a clean demo.

## 6. Functional requirements

### 6.1 Landing page

Sections: hero, story, customer need, product showcase, value, closing CTA, footer.

- Hero: logo-led composition, headline, tagline, primary **Buy Now**, secondary scroll CTA.
- Story: brand rationale, honest note that RIZZY is a concept in development.
- Need: three imagined everyday situations. No research, statistics, or testimonials.
- Showcase: product concept plus the supplied product photo, framed as evidence.
- Value: practical, fresh, affordable positioning without absolute claims.
- Closing CTA: hand-off to the demo.
- Footer: only verified information; no invented socials, phone, email, or address.

### 6.2 Package selection (`#/order`)

- Three demonstration packages from `src/config/demo-catalog.ts`.
- Clearly labelled as example packages and example prices.
- Radio-group semantics, selected state visible in text and border.
- Quantity stepper, 1–10, keyboard accessible.
- Subtotal recalculates from unit price × quantity.
- Checkout disabled until a package is selected.
- Back to landing without losing the current in-memory selection.

### 6.3 Checkout (`#/checkout`)

- Shows package name, quantity, unit price, subtotal, and grand total.
- No fees, taxes, or discounts.
- Rupiah formatting via `Intl.NumberFormat('id-ID')`.
- Link back to package selection preserves the selection.
- Guard: direct visit without a selection shows a friendly empty state.
- No customer data fields.

### 6.4 Payment (`#/payment`)

- QRIS and USDT tabs, both visual simulations.
- Non-functional QR illustration with “DEMO / NOT SCANNABLE” treatment.
- Simulated amount, plus an illustrative USDT value and non-binding rate note.
- No wallet address, network, merchant payload, or external request.
- Primary action: “Simulasikan sudah membayar”.
- Presenter panel with deterministic actions: underpay, overpay, verify, process,
  complete, reset. Panel is explicitly not an admin interface.

### 6.5 Verification state machine

```
idle → awaiting → submitted → verified → processing → completed
                    ├→ underpaid ─┐
                    └→ overpaid ──┴→ submitted (retry)
any → idle (reset)
```

- Invalid transitions leave state unchanged.
- Every status is labelled as a simulation.
- Under/overpayment keeps the order on hold and shows simulated amounts.
- Verified copy states that a real system would require authorized admin verification.
- Reset clears the in-memory order and returns to `#/order`.

## 7. Simulation policy (hard requirements)

- Persistent notice on order, checkout, and payment:
  **“DEMO ONLY — Simulasi presentasi. Tidak menerima pesanan atau pembayaran sungguhan.”**
- Never state or imply that money was actually received, verified, or settled.
- QR graphics must be decorative and non-scannable, with a visible overlay.
- USDT must not include a real address, chain, exchange rate, or conversion fee.
- No form collects personal or payment data.
- No localStorage, sessionStorage, cookies, backend calls, or third-party analytics.

## 8. Accessibility requirements

- Semantic landmarks, one `h1` per view, logical heading order.
- Keyboard-operable navigation, package radios, tabs, steppers, and demo controls.
- Visible focus indicators and minimum 44×44 px touch targets.
- `aria-live` for changing totals and status messages.
- QR illustration exposed as an image with a descriptive non-scannable label.
- Reduced-motion support for all non-essential animation.
- Colour contrast checked against WCAG AA.

## 9. Performance requirements

- Self-hosted fonts; no third-party requests at runtime.
- Responsive images with explicit dimensions; lazy loading below the fold.
- JS target under ~250 KB gzipped for the initial route where feasible.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95 (where the environment allows).

## 10. Acceptance criteria

1. Landing page communicates brand, product, and value.
2. Visual identity is coherent and clearly derived from the supplied blue logo.
3. Buy Now reaches `#/order`.
4. Package and quantity selection work with correct totals.
5. Checkout summary matches the selection.
6. QRIS and USDT screens both work and show mock QR graphics.
7. Scripted payment statuses behave deterministically; reset works.
8. No real transaction, personal data, backend, or persistence exists.
9. Layouts work at 375, 768, and 1440 px without horizontal scrolling.
10. Type check, lint, unit tests, and production build pass.
11. Browser tests pass (or environment limits are documented honestly).
12. GitHub Pages build is verified through a subpath smoke test.

## 11. Success evidence

- Commands and actual outputs recorded in the final report.
- Playwright screenshots at three widths.
- Axe scan results with zero serious/critical violations.
- `dist/` served from a `/rizzy/` subpath and verified, not assumed.
