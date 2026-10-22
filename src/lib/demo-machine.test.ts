import { describe, expect, it } from 'vitest'
import {
  DEMO_EVENTS,
  DEMO_STATUSES,
  availableEvents,
  isHeldStatus,
  transition,
  type DemoEvent,
  type DemoStatus,
} from './demo-machine'

describe('demo state machine', () => {
  it('moves through the happy path deterministically', () => {
    let status: DemoStatus = 'idle'
    status = transition(status, 'begin')
    expect(status).toBe('awaiting')
    status = transition(status, 'mark_paid')
    expect(status).toBe('submitted')
    status = transition(status, 'verify')
    expect(status).toBe('verified')
    status = transition(status, 'process')
    expect(status).toBe('processing')
    status = transition(status, 'complete')
    expect(status).toBe('completed')
  })

  it('supports underpayment and overpayment branches that hold the order', () => {
    expect(transition('submitted', 'underpay')).toBe('underpaid')
    expect(transition('submitted', 'overpay')).toBe('overpaid')
    expect(isHeldStatus('underpaid')).toBe(true)
    expect(isHeldStatus('overpaid')).toBe(true)
    expect(isHeldStatus('submitted')).toBe(false)
  })

  it('returns from a held branch only through a re-simulated payment', () => {
    expect(transition('underpaid', 'mark_paid')).toBe('submitted')
    expect(transition('overpaid', 'mark_paid')).toBe('submitted')
    expect(transition('underpaid', 'verify')).toBe('underpaid')
  })

  it('never allows verification before a simulated payment', () => {
    expect(transition('idle', 'verify')).toBe('idle')
    expect(transition('awaiting', 'verify')).toBe('awaiting')
  })

  it('resets from every status', () => {
    for (const status of DEMO_STATUSES) {
      expect(transition(status, 'reset')).toBe('idle')
    }
  })

  it('ignores every invalid event without throwing', () => {
    for (const status of DEMO_STATUSES) {
      for (const event of DEMO_EVENTS) {
        expect(() => transition(status, event)).not.toThrow()
      }
    }
  })

  it('exposes only actionable controls', () => {
    expect(availableEvents('idle')).toEqual(['begin'])
    expect(availableEvents('awaiting')).toEqual(['mark_paid'])
    expect(availableEvents('submitted')).toEqual(['underpay', 'overpay', 'verify'])
    expect(availableEvents('underpaid')).toEqual(['mark_paid'])
    expect(availableEvents('verified')).toEqual(['process'])
    expect(availableEvents('processing')).toEqual(['complete'])
    expect(availableEvents('completed')).toEqual([])
  })

  it('keeps its event names stable for the presenter UI', () => {
    const expected: DemoEvent[] = [
      'begin',
      'mark_paid',
      'underpay',
      'overpay',
      'verify',
      'process',
      'complete',
      'reset',
    ]
    expect([...DEMO_EVENTS]).toEqual(expected)
  })
})
