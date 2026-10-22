# RIZZY — Implementation Plan

## 1. Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Runtime | React 19 + TypeScript | Typed interactive UI |
| Build | Vite 8 | Fast static output, relative base support |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | Token-first design system |
| Motion | Motion for React 14 | Small, declarative, reduced-motion aware |
| Routing | Custom hash router (~60 lines) | No server rewrites, no router dependency |
| Tests | Vitest + Testing Library | Logic and component coverage |
| Browser tests | Playwright + axe-core | Journey, responsive, a11y |
| Fonts | Fontsource variable packages | Self-hosted, zero external requests |

## 2. Structure

```
rizzy/
├─ docs/                     5 required project documents
├─ public/
│  ├─ .nojekyll              GitHub Pages
│  ├─ robots.txt
│  └─ assets/
│     ├─ brand/              logo, wordmark, monogram, favicons, OG image
│     ├─ product/            real product photo + responsive derivative
│     └─ team/               team photo
├─ src/
│  ├─ components/
│  │  ├─ ui/                 Button, Badge, SectionHeading, DemoNotice, Stepper…
│  │  ├─ layout/             Header, MobileNav, Footer, PageShell, StepIndicator
│  │  └─ product/            MockQr, ProductPhoto, PackageCard, StatusTimeline
│  ├─ sections/              Hero, Story, Need, Showcase, Value, ClosingCta
│  ├─ pages/                 Landing, Order, Checkout, Payment, NotFound
│  ├─ config/                site, demo-catalog, demo-payment
│  ├─ content/               landing copy + status copy
│  ├─ lib/                   format, pricing, demo-machine, hash-router, assets
│  ├─ state/                 OrderProvider (useReducer, memory only)
│  ├─ styles/                tokens, base, utilities
│  └─ test/                  setup + shared fixtures
├─ tests/e2e/                journey, responsive, safety, a11y
├─ scripts/                  visual capture + GitHub Pages subpath verification
└─ .github/workflows/deploy.yml
```

## 3. Data model

```ts
type DemoPackage = {
  id: 'solo' | 'duo' | 'rame'
  name: string
  description: string
  contents: string[]
  priceIdr: number
  isDemo: true
}

type OrderState = {
  packageId: string | null
  quantity: number
  method: 'qris' | 'usdt' | null
  status: DemoStatus
}
```

- Prices and copy live only in `src/config/demo-catalog.ts`.
- Totals computed by pure functions in `src/lib/pricing.ts`.
- Status transitions in `src/lib/demo-machine.ts`, independent of React.
- Context exposes actions; no persistence, no effects writing to storage.

## 4. State machine

```
idle --begin--> awaiting --mark_paid--> submitted
submitted --underpay--> underpaid --mark_paid--> submitted
submitted --overpay-->  overpaid  --mark_paid--> submitted
submitted --verify--> verified --process--> processing --complete--> completed
* --reset--> idle
```

- `transition(status, event)` returns the current status for invalid events.
- `availableActions(status)` drives the presenter panel; no hidden actions.
- All copy for each status lives in one map so it can be reviewed and translated.

## 5. Routing

- `parseHash()` normalises `#/order`, `#/order/`, and empty hash.
- `useHashRoute()` subscribes to `hashchange`; `navigate()` updates the hash.
- Landing section navigation uses `scrollIntoView`, never hash anchors.
- Unknown paths render `NotFound`.
- On route change: scroll to top, focus `main`, announce the view name.

## 6. GitHub Pages

- `base: './'` so assets resolve at `/` and at any `/<repo>/` path.
- No `404.html` redirect hack: hash routing needs no server fallback.
- `public/.nojekyll` prevents Jekyll processing.
- Current deployment: build `dist/`, publish it to branch `gh-pages`, and serve Pages
  from that branch at `https://forsha7class.github.io/rizzy/`.
- A workflow-scoped token was not available at launch, so the Actions workflow was not
  pushed. It is preserved at `docs/optional-github-actions.yml` for future automation.
- Verification: copy `dist` into `<tmp>/rizzy/`, serve the parent, run a smoke test
  against `http://127.0.0.1:<port>/rizzy/`, plus a live smoke test after deployment.

## 7. Phases

1. **Audit** — inspect workspace, tooling, convert supplied HEIC for review, extract palette.
2. **Documentation** — this folder, before code.
3. **Foundation** — tokens, fonts, assets, router, layout shell.
4. **Landing** — all seven sections, motion, responsive header/menu.
5. **Design review** — screenshots at 1440/768/375; final pass after the flow is wired.
6. **Commerce demo** — catalog, order, checkout, payment, state machine.
7. **Hardening** — a11y pass, reduced motion, focus, empty states, copy audit.
8. **Verification** — lint, typecheck, unit, e2e, axe, build, subpath smoke test.
9. **Report** — commands, actual results, limitations, remaining decisions.

## 8. Testing matrix

### Unit
- Rupiah and USDT formatting.
- Quantity clamping and subtotal/total math.
- Full state-machine matrix, including invalid events.
- Catalog invariants: demo flags, positive prices, unique IDs, no wallet-like strings.

### Component
- Landing renders every section and both CTAs.
- Order: select package, change quantity, totals, disabled checkout, preserved state.
- Checkout: summary matches selection, totals consistent, guard state.
- Payment: both tabs, QR labels, status transitions, under/over hold, reset.

### Browser (Playwright, 375 / 768 / 1440)
- Full journey to completed status on both methods.
- Under/overpayment branches and reset.
- Refresh and direct links on each hash route.
- Mobile menu open/close/Escape.
- No horizontal overflow; QR fits; totals readable.
- No requests to any origin other than the local preview.
- Axe scan: zero serious/critical violations on landing, order, checkout, payment.

## 9. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Supplied logo is raster only | Use transparent PNG at 2× display size; request SVG later |
| Single product photo | One well-cropped editorial frame; no fake gallery |
| Demo prices mistaken for real | Repeated “HARGA CONTOH” labels + demo banner |
| QR mistaken for real | Seeded decorative matrix, centre DEMO block, text overlay |
| Refresh loses order | Documented; guarded empty state instead of a crash |
| GitHub Pages subpath | Relative base + real subpath smoke test |
| Motion sickness | `prefers-reduced-motion` gate on every animation |
| Team photo consent | Owner confirmed use with neutral caption; recorded in open questions |
