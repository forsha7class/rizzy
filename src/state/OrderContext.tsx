import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { findPackage, type DemoPackage } from '../config/demo-catalog'
import type { PaymentMethod } from '../config/demo-payment'
import { DEMO_EVENTS, transition, type DemoEvent, type DemoStatus } from '../lib/demo-machine'
import { calculateTotals, clampQuantity, type OrderTotals } from '../lib/pricing'

export type OrderState = {
  packageId: string | null
  quantity: number
  method: PaymentMethod | null
  status: DemoStatus
}

export const initialOrderState: OrderState = {
  packageId: null,
  quantity: 1,
  method: null,
  status: 'idle',
}

export type OrderAction =
  | { type: 'select_package'; packageId: string }
  | { type: 'set_quantity'; quantity: number }
  | { type: 'set_method'; method: PaymentMethod }
  | { type: 'advance'; event: DemoEvent }
  | { type: 'reset' }

export function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'select_package': {
      if (!findPackage(action.packageId)) return state
      if (state.packageId === action.packageId) return state
      return { ...state, packageId: action.packageId, status: 'idle' }
    }
    case 'set_quantity': {
      const quantity = clampQuantity(action.quantity)
      if (quantity === state.quantity) return state
      return { ...state, quantity, status: 'idle' }
    }
    case 'set_method': {
      if (state.method === action.method) return state
      return { ...state, method: action.method }
    }
    case 'advance': {
      if (!(DEMO_EVENTS as readonly string[]).includes(action.event)) return state
      if (action.event === 'reset') return initialOrderState
      return { ...state, status: transition(state.status, action.event) }
    }
    case 'reset':
      return initialOrderState
    default:
      return state
  }
}

type OrderContextValue = {
  state: OrderState
  selectedPackage: DemoPackage | undefined
  totals: OrderTotals
  dispatch: Dispatch<OrderAction>
  reset: () => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState)
  const selectedPackage = useMemo(() => findPackage(state.packageId), [state.packageId])
  const totals = useMemo(
    () => calculateTotals(selectedPackage?.priceIdr ?? 0, state.quantity),
    [selectedPackage?.priceIdr, state.quantity],
  )

  const value = useMemo<OrderContextValue>(
    () => ({
      state,
      selectedPackage,
      totals,
      dispatch,
      reset: () => dispatch({ type: 'reset' }),
    }),
    [state, selectedPackage, totals],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder(): OrderContextValue {
  const value = useContext(OrderContext)
  if (!value) throw new Error('useOrder must be used inside <OrderProvider>')
  return value
}
