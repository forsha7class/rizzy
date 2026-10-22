import { describe, expect, it } from 'vitest'
import {
  MAX_QUANTITY,
  MIN_QUANTITY,
  calculateTotals,
  clampQuantity,
  stepQuantity,
} from './pricing'

describe('clampQuantity', () => {
  it('keeps values within the supported range', () => {
    expect(clampQuantity(0)).toBe(MIN_QUANTITY)
    expect(clampQuantity(-4)).toBe(MIN_QUANTITY)
    expect(clampQuantity(5)).toBe(5)
    expect(clampQuantity(99)).toBe(MAX_QUANTITY)
  })

  it('truncates decimals and guards non-finite values', () => {
    expect(clampQuantity(3.9)).toBe(3)
    expect(clampQuantity(Number.NaN)).toBe(MIN_QUANTITY)
    expect(clampQuantity(Number.POSITIVE_INFINITY)).toBe(MIN_QUANTITY)
  })
})

describe('stepQuantity', () => {
  it('increments and decrements without exceeding bounds', () => {
    expect(stepQuantity(1, -1)).toBe(1)
    expect(stepQuantity(1, 1)).toBe(2)
    expect(stepQuantity(MAX_QUANTITY, 1)).toBe(MAX_QUANTITY)
  })
})

describe('calculateTotals', () => {
  it('calculates subtotal from unit price and quantity', () => {
    expect(calculateTotals(18_000, 3)).toEqual({
      quantity: 3,
      unitPriceIdr: 18_000,
      subtotalIdr: 54_000,
      totalIdr: 54_000,
    })
  })

  it('does not add fees, tax, or discounts', () => {
    const totals = calculateTotals(36_000, 2)
    expect(totals.totalIdr).toBe(totals.subtotalIdr)
    expect(totals.totalIdr).toBe(72_000)
  })

  it('clamps quantity and normalises invalid prices', () => {
    expect(calculateTotals(18_000, 0).quantity).toBe(1)
    expect(calculateTotals(-10, 2).subtotalIdr).toBe(0)
    expect(calculateTotals(Number.NaN, 2).unitPriceIdr).toBe(0)
  })
})
