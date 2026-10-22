export type DemoPackage = {
  id: string
  name: string
  shortDescription: string
  contents: string[]
  priceIdr: number
  isDemo: true
}

/**
 * ---------------------------------------------------------------------------
 * DEMONSTRATION CATALOG — NOT OFFICIAL RIZZY PRICING
 * ---------------------------------------------------------------------------
 * Official packages and prices have not been established. Replace the entries
 * below when confirmed. Keep `isDemo: true` until prices are approved.
 */
export const demoCatalog: DemoPackage[] = [
  {
    id: 'solo',
    name: 'Paket Solo',
    shortDescription: 'Satu porsi, satu minuman. Untuk makan siang sendiri.',
    contents: ['1 Chicken Katsu', '1 Es Kelapa'],
    priceIdr: 28_000,
    isDemo: true,
  },
  {
    id: 'duo',
    name: 'Paket Duo',
    shortDescription: 'Dua porsi untuk dimakan berdua.',
    contents: ['2 Chicken Katsu', '2 Es Kelapa'],
    priceIdr: 52_000,
    isDemo: true,
  },
  {
    id: 'rame',
    name: 'Paket Rame',
    shortDescription: 'Empat porsi untuk meja yang lebih ramai.',
    contents: ['4 Chicken Katsu', '4 Es Kelapa'],
    priceIdr: 98_000,
    isDemo: true,
  },
]

export const catalogDisclaimer =
  'HARGA CONTOH — bukan harga resmi RIZZY. Paket dan harga final belum ditetapkan.'

export const packageDisclaimer =
  'Paket contoh untuk keperluan presentasi. Bukan konfigurasi produk final.'

export function findPackage(id: string | null): DemoPackage | undefined {
  if (!id) return undefined
  return demoCatalog.find((item) => item.id === id)
}
