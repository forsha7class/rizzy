export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 10

export type OrderTotals = {
  quantity: number
  unitPriceIdr: number
  subtotalIdr: number
  totalIdr: number
}

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return MIN_QUANTITY
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(value)))
}

export function stepQuantity(current: number, delta: number): number {
  return clampQuantity(current + delta)
}

/**
 * The demo has no tax, delivery fee, or discount. Total equals subtotal by design.
 * Keeping this in one pure function prevents totals from drifting between views.
 */
export function calculateTotals(unitPriceIdr: number, quantity: number): OrderTotals {
  const safePrice = Number.isFinite(unitPriceIdr) ? Math.max(0, Math.round(unitPriceIdr)) : 0
  const safeQuantity = clampQuantity(quantity)
  const subtotalIdr = safePrice * safeQuantity

  return {
    quantity: safeQuantity,
    unitPriceIdr: safePrice,
    subtotalIdr,
    totalIdr: subtotalIdr,
  }
}
