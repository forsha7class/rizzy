# RIZZY — Design System

## 1. Direction

**Premium street-food editorial.** The supplied logo is energetic, glossy, and blue;
the interface around it is calmer and more art-directed so the mark can lead.
Warm paper neutrals keep the brand from feeling like a fintech page, while deep navy
and electric blue carry the logo into the UI. Magenta appears only as a tiny echo of
the bougainvillea in the product photograph.

Principles:

1. **Logo first.** The identity is the hero; no competing invented mascot or symbol.
2. **Editorial rhythm.** Numbered chapters, hairline rules, oversized type, real whitespace.
3. **One real photo, framed as evidence.** No stock or generated food photography.
4. **Movement with restraint.** Reveals and state transitions only; no scroll hijacking.
5. **Honest demo UI.** Simulation labels are part of the design, not an afterthought.

## 2. Colour tokens

Sampled from the supplied RIZZY logo.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-ink` | `#021F4F` | Primary text, dark sections, footer |
| `--color-ink-deep` | `#01142F` | Deepest background layer |
| `--color-royal` | `#0350B1` | Brand primary, links, selected states |
| `--color-electric` | `#059BF7` | Accent, wave graphics, focus glow |
| `--color-ice` | `#EEF4FB` | Cards, header, soft surfaces |
| `--color-mist` | `#D7E6F6` | Borders on light surfaces |
| `--color-paper` | `#F6F2E8` | Page ground |
| `--color-cream` | `#FFFDF7` | Elevated cards |
| `--color-gold` | `#E9A63C` | Warm food accent, warning states |
| `--color-magenta` | `#C93B76` | Rare photographic echo, overpayment state |
| `--color-success` | `#1B7F5A` | Verified / completed states |
| `--color-danger` | `#B3261E` | Destructive or error text only |

Contrast: ink on paper/ice exceeds AA for body text. Electric blue is never used for
small body copy on light backgrounds; it is decorative or paired with ink.

## 3. Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display | **Bricolage Grotesque Variable** | Headlines, numbers, buttons; tight tracking, optical sizes |
| Body/UI | **Plus Jakarta Sans Variable** | Paragraphs, labels, controls |

Both are self-hosted through Fontsource. No Google Fonts request at runtime.

Scale (fluid, `clamp`):

| Name | Size | Use |
| --- | --- | --- |
| `display-1` | `clamp(3rem, 8vw, 7.5rem)` / 0.9 | Hero headline |
| `display-2` | `clamp(2.25rem, 5vw, 4.5rem)` / 0.95 | Section titles |
| `display-3` | `clamp(1.75rem, 3vw, 2.75rem)` / 1.05 | Card titles |
| `body-lg` | `1.125–1.25rem` / 1.65 | Intros |
| `body` | `1rem` / 1.65 | Default |
| `label` | `0.6875rem` / 0.16em tracking | Eyebrows, chips |

Italic display is allowed for one emphasised phrase per view, never for long copy.

## 4. Spacing and layout

- Base unit 4 px; section padding `clamp(4.5rem, 9vw, 8rem)`.
- Shell max width 1280 px; gutters 20 px (mobile), 32 px (tablet), 48 px (desktop).
- Editorial grid: 12 columns on desktop; asymmetric splits 7/5 or 8/4.
- Hairlines: `1px` at 12–18% ink opacity. No heavy drop shadows; depth comes from
  surface tone, borders, and one soft ambient shadow on floating panels.
- Radii: 2 px for editorial frames, 14–20 px for cards, full for pills.
- Decorative waves may bleed; the page clips overflow so no horizontal scroll.

## 5. Components

### Buttons
- **Primary:** ink or royal background, cream text, 52–56 px height, pill radius,
  arrow glyph, hover lift 2 px, active press 1 px.
- **Secondary:** transparent with 1 px ink border.
- **Ghost/light:** cream on dark sections.
- Disabled: 45% opacity, `cursor-not-allowed`, no motion.
- Focus: 3 px electric outline with 2 px offset, always visible on keyboard focus.

### Header
- Sticky, 64/80 px tall, ice/95 with blur and a hairline.
- Logo wordmark at 104–124 px wide. Desktop nav in uppercase label style.
- Mobile: 44 px menu button; full-height panel with large links, CTA, demo note.
- No hidden focusable content while the menu is closed.

### Cards
- Cream or ice surface, 1 px border, 18–20 px radius, generous inner padding.
- Selected package: royal 2 px border, ice tint, check badge, explicit “Dipilih” text.

### Step indicator
- Three numbered steps; active = ink fill, complete = royal text + check, upcoming = muted.
- Each step is a link only when it is reachable; otherwise plain text with `aria-current="step"`.

### Demo notice
- Sticky strip under the header on all demo routes.
- Ink background, cream text, gold “DEMO ONLY” chip, 12–14 px body size, never below 12 px.
- Contextual notes inside the payment panels reinforce the same message; the inline card variant remains available for future screens.

### QR mock
- Decorative 29×29 matrix from a seeded generator, three finder blocks.
- Centre block reads **DEMO**; bottom band reads **TIDAK DAPAT DIPINDAI**.
- Never encodes a payload. Exposed as `role="img"` with a descriptive label.
- Rendered in a white panel with a hairline and corner registration marks.

### Status
- Pill with icon dot plus text. Always prefixed as simulation where relevant.
- Under/overpayment use gold/magenta tinted panels and explicit “ditahan” language.
- Verified/processing/completed use green/blue tones, never celebratory payment claims.

### Inputs
- Package choice = native radio inside a styled label (keyboard and screen-reader safe).
- Quantity = two 44 px buttons around a read-only output with `aria-live="polite"`.
- Payment method = ARIA tablist with roving selection.

## 6. Photography and assets

- **Product photo:** supplied real photo. Cropped tight to the katsu and rice to keep
  the frame appetising; hand, drink cup, and sachet are excluded from the main card.
  Caption: “Foto produk RIZZY.” No retouching that changes portion or ingredients.
- **Team photo:** supplied real photo, used once as a wide band with the caption
  “Tim RIZZY.” No names or roles are invented.
- Originals remain untouched in `assets-upload/`.
- All web derivatives live in `public/assets/` and can be replaced without code changes.
- If photography is removed later, the showcase falls back to a typographic frame.

## 7. Motion

| Interaction | Treatment |
| --- | --- |
| Section reveal | 18 px rise + fade, 550 ms, stagger 60–80 ms |
| Route change | 200 ms fade, 8 px rise |
| Hover | 2 px lift, 160 ms |
| Selected package | border/colour transition, 180 ms |
| Status change | Immediate text/colour change with a polite `aria-live` announcement |
| Seal | slow 44 s rotation, decorative only |

All non-essential motion is disabled under `prefers-reduced-motion: reduce`.
No parallax, scroll locking (except the mobile menu), or cursor effects.

## 8. Accessibility rules

- One `h1` per view; sections use `h2`, cards use `h3`.
- Skip link to `#main`; route changes move focus to the main container.
- Touch targets ≥ 44×44 px; body text ≥ 16 px.
- Focus never trapped except inside the mobile menu dialog.
- Status changes announced via a polite live region.
- Colour is never the only signal for selection or status.
- Decorative graphics are `aria-hidden`; meaningful images have factual alt text.

## 9. Content voice

- Indonesian-first, conversational but not slang-heavy.
- Short sentences. Concrete nouns. No exclamation stacking.
- Never invent statistics, testimonials, awards, certifications, or contact details.
- Say “konsep”, “simulasi”, or “belum ditetapkan” when something is not final.
