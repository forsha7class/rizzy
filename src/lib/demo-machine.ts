export const DEMO_STATUSES = [
  'idle',
  'awaiting',
  'submitted',
  'underpaid',
  'overpaid',
  'verified',
  'processing',
  'completed',
] as const

export type DemoStatus = (typeof DEMO_STATUSES)[number]

export const DEMO_EVENTS = [
  'begin',
  'mark_paid',
  'underpay',
  'overpay',
  'verify',
  'process',
  'complete',
  'reset',
] as const

export type DemoEvent = (typeof DEMO_EVENTS)[number]

const transitions: Record<DemoStatus, Partial<Record<DemoEvent, DemoStatus>>> = {
  idle: {
    begin: 'awaiting',
    mark_paid: 'submitted',
    reset: 'idle',
  },
  awaiting: {
    mark_paid: 'submitted',
    reset: 'idle',
  },
  submitted: {
    mark_paid: 'submitted',
    underpay: 'underpaid',
    overpay: 'overpaid',
    verify: 'verified',
    reset: 'idle',
  },
  underpaid: {
    mark_paid: 'submitted',
    reset: 'idle',
  },
  overpaid: {
    mark_paid: 'submitted',
    reset: 'idle',
  },
  verified: {
    process: 'processing',
    reset: 'idle',
  },
  processing: {
    complete: 'completed',
    reset: 'idle',
  },
  completed: {
    reset: 'idle',
  },
}

/**
 * Deterministic demo state machine. Invalid events keep the current status
 * instead of throwing, so a presenter can never break the prototype on stage.
 */
export function transition(status: DemoStatus, event: DemoEvent): DemoStatus {
  return transitions[status][event] ?? status
}

export const STATUS_FLOW: DemoStatus[] = [
  'idle',
  'awaiting',
  'submitted',
  'verified',
  'processing',
  'completed',
]

export function isHeldStatus(status: DemoStatus): boolean {
  return status === 'underpaid' || status === 'overpaid'
}

export function isPaidBranch(status: DemoStatus): boolean {
  return status === 'underpaid' || status === 'overpaid' || status === 'verified'
}

/**
 * Actions exposed by the presenter panel for each status. Keeping this list
 * derived from the machine prevents buttons that cannot do anything.
 */
export function availableEvents(status: DemoStatus): DemoEvent[] {
  switch (status) {
    case 'idle':
      return ['begin']
    case 'awaiting':
      return ['mark_paid']
    case 'submitted':
      return ['underpay', 'overpay', 'verify']
    case 'underpaid':
    case 'overpaid':
      return ['mark_paid']
    case 'verified':
      return ['process']
    case 'processing':
      return ['complete']
    case 'completed':
      return []
    default:
      return []
  }
}
