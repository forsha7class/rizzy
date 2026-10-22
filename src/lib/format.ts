const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const usdtFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('id-ID')

export function formatIdr(amount: number): string {
  return idrFormatter.format(Number.isFinite(amount) ? Math.round(amount) : 0)
}

export function formatNumber(amount: number): string {
  return numberFormatter.format(Number.isFinite(amount) ? amount : 0)
}

export function formatUsdt(amount: number): string {
  return usdtFormatter.format(Number.isFinite(amount) ? amount : 0)
}

/**
 * Illustrative conversion only. The prototype has no live exchange-rate source
 * and must never imply that this is an official or current rate.
 */
export function formatIdrAsUsdt(idr: number, illustrativeRate: number): string {
  if (!Number.isFinite(idr) || !Number.isFinite(illustrativeRate) || illustrativeRate <= 0) {
    return '—'
  }
  return `≈ ${formatUsdt(idr / illustrativeRate)} USDT`
}
