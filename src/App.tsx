import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { DemoNotice } from './components/ui/DemoNotice'
import { isKnownRoute, useHashRoute } from './lib/hash-router'
import { OrderProvider } from './state/OrderContext'
import { LandingPage } from './pages/LandingPage'
import { OrderPage } from './pages/OrderPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { PaymentPage } from './pages/PaymentPage'
import { NotFoundPage } from './pages/NotFoundPage'

const titles: Record<string, string> = {
  '/': 'RIZZY — Chicken Katsu & Es Kelapa',
  '/order': 'Pilih Paket Demo — RIZZY',
  '/checkout': 'Ringkasan Pesanan — RIZZY',
  '/payment': 'Pembayaran Demo — RIZZY',
}

const announcerLabels: Record<string, string> = {
  '/': 'Beranda RIZZY',
  '/order': 'Pilih paket demo',
  '/checkout': 'Ringkasan pesanan',
  '/payment': 'Pembayaran demo',
}

export function App() {
  const { path } = useHashRoute()
  const reduceMotion = useReducedMotion()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(path)
  const isDemoRoute = path === '/order' || path === '/checkout' || path === '/payment'

  useEffect(() => {
    document.title = titles[path] ?? 'Halaman tidak ditemukan — RIZZY'

    if (previousPath.current !== path) {
      previousPath.current = path
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [path])

  let view
  if (isKnownRoute(path)) {
    switch (path) {
      case '/order':
        view = <OrderPage />
        break
      case '/checkout':
        view = <CheckoutPage />
        break
      case '/payment':
        view = <PaymentPage />
        break
      default:
        view = <LandingPage />
    }
  } else {
    view = <NotFoundPage />
  }

  return (
    <OrderProvider>
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          mainRef.current?.focus()
          mainRef.current?.scrollIntoView({ block: 'start' })
        }}
        className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Lompat ke konten utama
      </a>

      <Header path={path} />

      {isDemoRoute ? (
        <DemoNotice variant="banner" className="sticky top-16 z-40 sm:top-20" />
      ) : null}

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="min-h-[60vh] outline-none"
      >
        <motion.div
          key={path}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {view}
        </motion.div>
      </main>

      <Footer />

      <p className="sr-only" aria-live="polite">
        {announcerLabels[path] ?? 'Halaman tidak ditemukan'}
      </p>
    </OrderProvider>
  )
}
