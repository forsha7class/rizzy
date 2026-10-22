export type DemoPackage = {
  id: string
  name: string
  shortDescription: string
  contents: string[]
  priceIdr: number
}

/**
 * ---------------------------------------------------------------------------
 * OFFICIAL RIZZY PRICING — SIMULATED ORDERING
 * ---------------------------------------------------------------------------
 * Prices below are the official RIZZY package prices. The ordering and payment
 * flow on this site remains a presentation demo and never creates a real order.
 */
export const demoCatalog: DemoPackage[] = [
  {
    id: 'solo',
    name: 'Paket Solo',
    shortDescription: 'Satu porsi, satu minuman. Untuk makan siang sendiri.',
    contents: ['1 Chicken Katsu', '1 Es Kelapa'],
    priceIdr: 18_000,
  },
  {
    id: 'duo',
    name: 'Paket Duo',
    shortDescription: 'Dua porsi untuk dimakan berdua.',
    contents: ['2 Chicken Katsu', '2 Es Kelapa'],
    priceIdr: 36_000,
  },
  {
    id: 'rame',
    name: 'Paket Rame',
    shortDescription: 'Empat porsi untuk meja yang lebih ramai.',
    contents: ['4 Chicken Katsu', '4 Es Kelapa'],
    priceIdr: 72_000,
  },
]

export const catalogDisclaimer =
  'Harga resmi RIZZY. Seluruh alur pemesanan dan pembayaran di situs ini tetap simulasi.'

export const packageDisclaimer =
  'Paket dan isi mengikuti konfigurasi presentasi. Tidak ada transaksi nyata.'

export function findPackage(id: string | null): DemoPackage | undefined {
  if (!id) return undefined
  return demoCatalog.find((item) => item.id === id)
}
