# RIZZY — Sitemap & Flow

## Routes

All routing is hash-based so GitHub Pages needs no rewrite rules.

| Hash | View | Purpose |
| --- | --- | --- |
| `#/` | Landing | Brand presentation and entry to the demo |
| `#/order` | Package selection | Choose demo package and quantity |
| `#/checkout` | Order summary | Review simulated totals |
| `#/payment` | Payment demo | QRIS/USDT simulation and status controls |
| any other hash | Not found | Friendly recovery link |

Direct links and refreshes on all four routes must render without a server.
A refresh on `#/checkout` or `#/payment` intentionally loses the in-memory order and
shows a guarded empty state, because the prototype stores nothing.

## Landing page outline

```
#/
├─ Header (logo, section nav, Buy Now, mobile menu)
├─ A · Hero
│   ├─ eyebrow + logo lockup
│   ├─ headline “Praktis. Segar. Pas di kantong.”
│   ├─ description
│   ├─ Buy Now → #/order
│   └─ Kenali RIZZY → scroll to story
├─ Marquee strip
├─ B · Story            id="story"      01 — Cerita
│   └─ Team photo band “Tim RIZZY”
├─ C · Customer need    id="need"       02 — Kebutuhan
├─ D · Product          id="product"    03 — Produk
│   └─ Real product photo, framed
├─ E · Value            id="value"      04 — Nilai
├─ F · Closing CTA      id="start"      05 — Mulai
└─ G · Footer
```

Section navigation uses programmatic scrolling, not hash anchors, so it cannot
collide with the hash router.

## Demo flow

```
Landing
  └─ Buy Now ───────────────► #/order
                                ├─ select package (Solo / Duo / Rame)
                                ├─ set quantity 1–10
                                └─ Checkout ───► #/checkout
                                                    ├─ review summary
                                                    ├─ Ubah paket ──► #/order (selection kept)
                                                    └─ Lanjut ──────► #/payment
                                                                        ├─ tab QRIS
                                                                        ├─ tab USDT
                                                                        ├─ Simulasikan sudah membayar
                                                                        ├─ kurang / lebih bayar
                                                                        ├─ terverifikasi
                                                                        ├─ diproses → selesai
                                                                        └─ Reset demo ──► #/order (state cleared)
```

## Status model

```
idle            Siap didemokan
awaiting        Menunggu pembayaran simulasi
submitted       Pembayaran simulasi dikirim
underpaid       Simulasi kurang bayar  (held)
overpaid        Simulasi kelebihan bayar (held)
verified        Pembayaran terverifikasi (simulasi)
processing      Pesanan simulasi diproses
completed       Pesanan simulasi selesai
```

`underpaid` and `overpaid` are branches from `submitted` and can return to
`submitted` by re-running the simulated payment. No status auto-advances.

## Navigation rules

- Header section links scroll on the landing page only.
- On demo routes, header shows “Beranda” and the step indicator is the primary context.
- Mobile menu closes on selection, Escape, or backdrop click.
- Browser back/forward works through the hash history.
- Unknown routes render a not-found view with a link home.
