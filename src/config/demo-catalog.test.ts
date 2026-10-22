import { describe, expect, it } from 'vitest'
import { catalogDisclaimer, demoCatalog } from './demo-catalog'

describe('demo catalog', () => {
  it('ships three example packages', () => {
    expect(demoCatalog).toHaveLength(3)
  })

  it('has unique ids, names, and positive integer prices', () => {
    const ids = new Set(demoCatalog.map((item) => item.id))
    const names = new Set(demoCatalog.map((item) => item.name))
    expect(ids.size).toBe(demoCatalog.length)
    expect(names.size).toBe(demoCatalog.length)

    for (const item of demoCatalog) {
      expect(item.priceIdr).toBeGreaterThan(0)
      expect(Number.isInteger(item.priceIdr)).toBe(true)
      expect(item.contents.length).toBeGreaterThan(0)
      expect(item.isDemo).toBe(true)
    }
  })

  it('labels every price as a demonstration value', () => {
    expect(catalogDisclaimer.toLowerCase()).toContain('bukan harga resmi')
  })

  it('contains no wallet-address-like strings', () => {
    const serialised = JSON.stringify(demoCatalog)
    expect(serialised).not.toMatch(/0x[a-f0-9]{20,}/i)
    expect(serialised).not.toMatch(/\bT[1-9A-HJ-NP-Za-km-z]{33}\b/)
  })
})
