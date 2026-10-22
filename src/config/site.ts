export const siteConfig = {
  name: 'RIZZY',
  productLine: 'Chicken Katsu • Es Kelapa',
  tagline: 'Praktis, Segar, Pas di Kantong.',
  description:
    'Chicken katsu yang renyah bertemu es kelapa yang menyegarkan. Satu paket sederhana untuk makan yang praktis, segar, dan tetap masuk akal.',
  presentationNote: 'Situs presentasi — bukan toko online.',
  demoNotice:
    'DEMO ONLY — Simulasi presentasi. Tidak menerima pesanan atau pembayaran sungguhan.',
  year: 2026,
} as const

export const navSections = [
  { id: 'story', label: 'Cerita', index: '01' },
  { id: 'need', label: 'Kebutuhan', index: '02' },
  { id: 'product', label: 'Produk', index: '03' },
  { id: 'value', label: 'Nilai', index: '04' },
] as const

export const DEMO_PREFIX = 'SIMULASI'
