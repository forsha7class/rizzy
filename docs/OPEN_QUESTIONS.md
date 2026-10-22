# RIZZY — Open Questions & Placeholders

Everything below is intentionally unresolved. The current build must not present
these items as confirmed facts.

## Assets

| Item | Status | Current handling |
| --- | --- | --- |
| Logo vector (SVG/AI/EPS) | **Missing** | Transparent PNG (1774×887) used; request vector for print/future |
| Packaging photography | **Missing** | No packaging visual is claimed; product shown in supplied takeaway photo |
| Additional product photos | **Missing** | One real photo, cropped editorially; no stock or generated imagery |
| Es Kelapa standalone photo | **Missing** | Described in copy; not shown as a separate photo |
| Team names and roles | **Not provided** | Caption only: “Tim RIZZY” |
| Team photo consent | Confirmed by owner for this site | Neutral caption, no names |
| Brand guide / typography rules | **Not provided** | Logo colours sampled; type chosen for this presentation |

## Commercial information

| Item | Status | Current handling |
| --- | --- | --- |
| Official package names | **Not established** | Demo names: Solo, Duo, Rame |
| Official package contents | **Not established** | Demo description only; no portion or ingredient claims |
| Official prices | **Not established** | Demo prices: Rp28.000 / Rp52.000 / Rp98.000, labelled “HARGA CONTOH” |
| Discounts, tax, delivery fees | **Not established** | Deliberately none |
| USDT network / wallet policy | **Not established** | No address, network, or live rate; illustrative value only |
| USDT reference rate | **Not official** | Fixed demo rate Rp16.000, labelled “bukan kurs resmi” |
| Halal / certification claims | **Not provided** | Not mentioned anywhere |
| Nutrition and portion claims | **Not provided** | Not mentioned anywhere |

## Brand and content

| Item | Status | Current handling |
| --- | --- | --- |
| Brand story specifics (founders, origin, date) | **Not provided** | Written as concept rationale, no invented biography |
| Social media accounts | **Not provided** | No social links in footer |
| Contact email / phone / address | **Not provided** | No contact details in footer |
| Testimonials / awards / customer numbers | **Not provided** | None used |
| Tagline punctuation | Supplied as “Praktis, Segar, Pas di Kantong.” | Used verbatim in body copy |
| Logo tagline | “CHICKEN KATSU • ES KELAPA” | Preserved inside the supplied lockup |

## Technical / deployment

| Item | Status | Current handling |
| --- | --- | --- |
| GitHub repository name | **Unknown** | Vite `base: './'` avoids needing it |
| GitHub account / Pages enablement | **Not authorized** | Workflow prepared, never run |
| Custom domain | **Not provided** | Not configured; OG image path stays relative until resolved |
| Analytics | **Not requested** | None installed |
| Real order handling | **Out of scope** | No backend, database, or submission |

## Decisions made for the prototype (reversible)

1. **Blue-led palette sampled from the logo** — navy, royal, electric, ice, with warm paper
   and a small magenta photographic echo. No invented secondary brand colour.
2. **Logo-led hero, photo used once** — the supplied product photo is authentic but casual;
   a tight crop keeps it as evidence rather than a full-bleed hero image.
3. **Bricolage Grotesque + Plus Jakarta Sans** — chosen to match the rounded, energetic
   logo while keeping long copy readable.
4. **No personal-data form** — the journey demonstrates selection, totals, payment method,
   and verification without collecting anything.
5. **Demo packages and prices are configuration** — replacing them later requires edits in
   `src/config/demo-catalog.ts` only.
6. **Scripted, deterministic statuses** — safer to present than randomised outcomes.

## Questions for the owner

1. Can you provide the logo as SVG/AI/EPS, ideally with a one-colour and knockout version?
2. Do you have packaging photos or a packaging mockup we may show?
3. What are the final package names, contents, and prices?
4. Should USDT remain in the final concept? If yes, which network and how should the
   rate be sourced in a future real system?
5. Which contact channels and social accounts are approved for publication?
6. Is the team photo cleared for public web use by everyone in it? (Currently used with a
   neutral caption based on owner confirmation.)
7. Is there an approved brand story, founding date, or founder biography we should use
   instead of the current concept-level copy?
8. Which repository/domain will host the final GitHub Pages build?
