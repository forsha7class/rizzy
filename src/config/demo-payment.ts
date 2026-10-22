export const PAYMENT_METHODS = ['qris', 'usdt'] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const demoPayment = {
  qris: {
    id: 'qris' as const,
    name: 'QRIS',
    shortName: 'QRIS',
    description: 'Simulasi QR pembayaran domestik.',
  },
  usdt: {
    id: 'usdt' as const,
    name: 'USDT',
    shortName: 'USDT',
    description: 'Simulasi pembayaran aset digital.',
  },
  /**
   * Purely illustrative. Not a market rate, not fetched from anywhere,
   * and not used for any real conversion.
   */
  usdtIllustrativeRateIdr: 16_000,
  usdtRateNote:
    'Nilai ilustrasi 1 USDT = Rp16.000. Bukan kurs resmi, bukan konversi real-time, dan tidak mengikat.',
  underpaymentAmountIdr: 3_000,
  overpaymentAmountIdr: 5_000,
  qrisNote:
    'QR ini adalah ilustrasi statis. Tidak berisi data merchant, tidak dapat dipindai, dan tidak terhubung ke penyedia pembayaran mana pun.',
  usdtNote:
    'Demo ini tidak menyediakan alamat wallet, jaringan blockchain, atau kurs resmi. QR hanya ilustrasi visual.',
} as const
