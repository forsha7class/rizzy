import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { navSections, siteConfig } from '../../config/site'
import { scrollToSection } from '../../lib/hash-router'
import { cn } from '../../lib/cn'
import { Wordmark } from '../ui/Logo'
import { ArrowIcon, buttonStyles } from '../ui/Button'

export function MobileNav({
  open,
  onClose,
  path,
}: {
  open: boolean
  onClose: () => void
  path: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()
  const isLanding = path === '/'

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.button
            type="button"
            aria-label="Tutup menu"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
            onClick={onClose}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="absolute inset-y-0 right-0 flex w-full max-w-[380px] flex-col overflow-y-auto bg-paper p-6 shadow-2xl"
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4">
              <a href="#/" onClick={onClose} aria-label="RIZZY — beranda" className="shrink-0">
                <Wordmark className="w-[120px]" decorative />
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Tutup menu"
                className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="Navigasi utama" className="mt-10 flex flex-col border-t border-ink/10">
              <a
                href="#/"
                onClick={onClose}
                className="flex min-h-14 items-center justify-between border-b border-ink/10 font-display text-2xl font-semibold tracking-[-0.02em]"
              >
                Beranda
                <span className="text-xs font-bold tracking-[0.14em] text-royal">#/</span>
              </a>

              {isLanding
                ? navSections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => {
                        onClose()
                        window.setTimeout(() => scrollToSection(section.id), 80)
                      }}
                      className="flex min-h-14 items-center justify-between border-b border-ink/10 text-left font-display text-2xl font-semibold tracking-[-0.02em] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
                    >
                      {section.label}
                      <span className="text-xs font-bold tracking-[0.14em] text-royal">{section.index}</span>
                    </button>
                  ))
                : null}

              <a
                href="#/order"
                onClick={onClose}
                className="flex min-h-14 items-center justify-between border-b border-ink/10 font-display text-2xl font-semibold tracking-[-0.02em]"
              >
                Pilih paket
                <span className="text-xs font-bold tracking-[0.14em] text-royal">Demo</span>
              </a>
            </nav>

            <div className="mt-auto pt-10">
              <a
                href="#/order"
                onClick={onClose}
                className={cn(buttonStyles({ size: 'lg' }), 'w-full')}
              >
                Buy Now <ArrowIcon />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-ink/70">
                {siteConfig.demoNotice}
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
