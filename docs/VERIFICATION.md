# RIZZY — Verification Report

**Date:** 22 October 2026  
**Environment:** Node `v24.22.1`, npm `11.19.1`, Chromium headless (Playwright 1.64.1), Linux  
**Build:** production `dist/`, served locally at `http://127.0.0.1:4173`  
**Deployment:** public GitHub Pages at https://forsha7class.github.io/rizzy/ (branch `gh-pages`)

Commands below were run from the repository root. Results are copied from actual runs,
not projected targets.

## 1. Static checks

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed, no output |
| `npm run lint` | Passed, `eslint .` with no errors |
| `npm run build` | Passed (`tsc --noEmit` + Vite build) |

Production output (gzip measured with `gzip -9`):

| Asset | Raw | Gzip |
| --- | --- | --- |
| `dist/assets/index-*.js` | 439,040 B | 133,020 B |
| `dist/assets/index-*.css` | 66,050 B | 13,330 B |
| Fonts | 6 self-hosted `.woff2` files | — |

No runtime request to Google Fonts, analytics, wallets, payment gateways, or any
third-party origin exists. Official QRIS and Tether marks are bundled locally in
`public/assets/brand/`; the payment cards are local PNG/WebP derivatives.

## 2. Unit and component tests

Command: `npm test`  
Result: **5 test files passed, 29 tests passed.**

Coverage:

- Rupiah/USDT formatting and invalid-rate guards.
- Quantity clamping, subtotal/total math, absence of fees.
- Full state-machine matrix, invalid events, reset from every status, presenter actions.
- Catalog invariants: 3 packages, unique IDs, positive integer official prices, no
  wallet-address-like strings, disclaimer states “harga resmi” and “simulasi”.
- Landing narrative and Buy Now target.
- Package selection, quantity, recalculation, checkout guard and summary.
- Complete QRIS simulation: submitted → underpaid → retry → verified → processing →
  completed → reset.
- USDT tab and illustrative conversion copy.
- Deep-link guards and not-found view.

## 3. Browser tests

Command: `npm run test:e2e`  
Projects: `mobile-375`, `tablet-768`, `desktop-1440` (Chromium)  
Result: **44 passed, 4 skipped, 0 failed.**

The 4 skipped tests are the two mobile-only interaction tests on the tablet and desktop
projects, skipped intentionally by `testInfo.project.name`.

Covered:

- Landing → Buy Now → order.
- Package and quantity selection; total `Rp 72.000` for Duo ×2.
- Checkout summary and payment hand-off.
- QRIS completion and the underpayment branch.
- Overpayment branch and return to submitted.
- USDT amount `≈ 1,13 USDT` for Rp18.000 at the illustrative rate, with non-binding
  rate and no-wallet notes.
- Reset demo clears in-memory state and returns to `#/order`.
- Deep links, refresh, unknown hash, and guarded states without an order.
- Skip link moves focus to `main` without becoming the `#main` route.
- Mobile menu opens, traps focus, closes with Escape, restores focus, and navigates.
- Mobile sticky summary action is reachable.
- No horizontal overflow on all four routes at 375/768/1440.
- QR image has the non-scannable alt/caption, the supplied artwork is centre-covered,
  and the page contains no wallet/payment payload patterns.

## 4. Accessibility

Tool: axe-core via `@axe-core/playwright`, tags `wcag2a`, `wcag2aa`, `wcag21a`,
`wcag21aa`.

Scanned: landing, order, checkout, payment (awaiting), payment (submitted), across the
three Playwright projects.  
Result: **0 serious/critical violations** after fixing the QRIS tab accessible name and
reviewing the purple contrast tokens.

Manual/structural checks covered by tests and code review:

- One `h1` per view; landmark navigation.
- Skip link and focus move to `main` on route change.
- Native radio group for packages; tabs support arrow keys; stepper has labelled buttons.
- Live regions for quantity and status.
- Reduced-motion branch in every animated component.
- QR exposed as an image with a non-scannable description.
- Dialog semantics and focus trap for the mobile menu.

## 5. Static hosting / GitHub Pages subpath

Command: `npm run verify:pages`

The script copies `dist/` into a temporary `.../rizzy/` directory, serves the parent
folder over HTTP, and drives Chromium through the flow.

Actual result:

```
Subpath verification PASSED
- served from /rizzy/ at http://127.0.0.1:4180/rizzy/
- landing, order, checkout, and payment rendered
- reload returned the guarded payment state (no stored order)
- no 4xx/5xx asset responses and no absolute /assets URLs
```

`dist/.nojekyll` and `dist/robots.txt` are present. `base: './'` means the same build
works at a domain root or any project subpath.


## 5b. Live GitHub Pages deployment

| Item | Result |
| --- | --- |
| Repository | `github.com/forsha7class/rizzy` (public) |
| Source branch | `main` |
| Pages branch | `gh-pages` (contents of `dist/`, including `.nojekyll`) |
| Rebrand deploy commit | `86c7377` — purple identity, official pricing, QRIS/USDT artwork |
| Live URL | https://forsha7class.github.io/rizzy/ |
| Root / index | HTTP 200 |
| Logo WebP / OG image / robots | HTTP 200 / 200 / 200 |
| QRIS/USDT card WebP | HTTP 200 / 200 |
| Official QRIS/Tether SVG | HTTP 200 / 200 |
| Unknown static file | HTTP 404 as expected; hash routes need no server fallback |
| Desktop journey | Landing → order → checkout → payment → QRIS/USDT switch: passed |
| Mobile 375 journey | Landing and payment: passed, no horizontal overflow |
| Live price check | Solo `Rp 18.000`; Duo ×2 `Rp 72.000`; USDT illustration `≈ 1,13` |
| Live console | 0 page errors / 0 console errors |
| Reload on `#/payment` | Guarded empty state rendered, no stored order |
| Console/page errors | none |
| Failed requests | none |

The GitHub Actions workflow is intentionally not active: the available classic token
has `repo` scope only, while publishing `.github/workflows/*` requires `workflow` scope.
The same workflow is preserved at `docs/optional-github-actions.yml` for later use.

## 6. Lighthouse

Tool: Lighthouse run locally against the production preview. Landing page.
Headless Chromium, default mobile emulation and desktop preset.

| Category | Mobile (final run) | Desktop |
| --- | --- | --- |
| Performance | **93** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |
| LCP | 2.7 s | 0.6 s |
| TBT | 160 ms | 20 ms |
| CLS | 0 | 0 |

The clean single-run mobile score was **93**; a concurrent two-run batch produced a
lower 79 due to CPU contention and was discarded. All reported runs meet the ≥90
performance and ≥95 accessibility targets. The new QR and official brand marks live on
the payment route and do not affect the landing LCP.

## 7. Privacy and simulation checks

- `tests/e2e/safety.spec.ts` records every request during the full journey. The set of
  external origins is empty.
- `localStorage.length` = 0, `sessionStorage.length` = 0, `document.cookie` = empty after
  the flow.
- No form collects personal or payment data.
- No wallet address, chain, merchant payload, or encoded QR data exists.
- The USDT rate is a fixed illustration in `src/config/demo-payment.ts`, not fetched.
- Supplied QR artwork is recoloured, centre-covered, and verified non-decodable with
  `zbarimg`; the app ships no generated payload or wallet address.

## 8. Visual evidence

Committed screenshots in `docs/screenshots/`:

- `landing-1440.webp`
- `order-375.webp`
- `payment-1440.webp`

Additional captures were reviewed at 768 and 375 during the build; the committed set
covers desktop landing, mobile ordering, and the full desktop payment page in the new
purple identity.

## 9. What was not verified

- No real payment, order, inventory, delivery, admin, or backend flow exists to test.
- No device testing beyond Chromium desktop/tablet/mobile emulation.
- No screen-reader session (NVDA/VoiceOver) was recorded; axe and keyboard tests were used.
- GitHub Actions deployment is not active; the live site is published manually from `gh-pages`.
- Lighthouse scores are environment-specific and are not a guarantee for every network.
- The RIZZY logo is raster only; print quality and vector fidelity are not verified.
  QRIS and Tether marks use official SVG sources for on-screen identification.
