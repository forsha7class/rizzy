import { describe, expect, it } from 'vitest'
import { formatIdr, formatIdrAsUsdt, formatNumber, formatUsdt } from '../lib/format'

describe('formatIdr', () => {
  it('formats rupiah with Indonesian thousands separators', () => {
    const formatted = formatIdr(104_000)
    expect(formatted).toContain('Rp')
    expect(formatted.replace(/\s/g, ' ')).toContain('104.000')
  })

  it('rounds to whole rupiah and guards invalid values', () => {
    expect(formatIdr(28_000.6)).toContain('28.001')
    expect(formatIdr(Number.NaN)).toContain('0')
  })
})

describe('USDT illustration formatting', () => {
  it('uses the configured illustrative rate', () => {
    expect(formatIdrAsUsdt(28_000, 16_000).replace(/\s/g, ' ')).toBe('≈ 1,75 USDT')
  })

  it('returns a dash for invalid rates instead of implying a conversion', () => {
    expect(formatIdrAsUsdt(28_000, 0)).toBe('—')
    expect(formatIdrAsUsdt(28_000, Number.NaN)).toBe('—')
  })

  it('formats USDT with two decimals', () => {
    expect(formatUsdt(6.5)).toBe('6,50')
    expect(formatNumber(1_200)).toBe('1.200')
  })
})
