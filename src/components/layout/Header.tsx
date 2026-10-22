import { useEffect, useState } from 'react'
import { navSections } from '../../config/site'
import { scrollToSection } from '../../lib/hash-router'
import { Wordmark } from '../ui/Logo'
import { ArrowIcon, buttonStyles } from '../ui/Button'
import { MobileNav } from './MobileNav'

export function Header({ path }: { path: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isLanding = path === '/'

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-ice/95 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
        <a
          href="#/"
          aria-label="RIZZY — beranda"
          className="shrink-0 rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-electric"
        >
          <Wordmark className="w-[96px] sm:w-[120px]" decorative />
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
          {isLanding ? (
            navSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="group flex items-baseline gap-1.5 rounded-sm py-2 text-[0.75rem] font-bold tracking-[0.12em] text-ink/65 uppercase transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-electric"
              >
                <span className="text-[0.5rem] font-extrabold text-royal">{section.index}</span>
                <span className="group-hover:underline group-hover:underline-offset-4">{section.label}</span>
              </button>
            ))
          ) : (
            <>
              <a
                href="#/"
                className="rounded-sm py-2 text-[0.75rem] font-bold tracking-[0.12em] text-ink/65 uppercase transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-electric"
              >
                Beranda
              </a>
              <a
                href="#/order"
                className="rounded-sm py-2 text-[0.75rem] font-bold tracking-[0.12em] text-ink/65 uppercase transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-electric"
              >
                Pilih paket
              </a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#/order"
            className={buttonStyles({
              size: 'sm',
              className: 'min-h-11 px-4 text-[0.8125rem] sm:px-5 sm:text-sm',
            })}
          >
            Buy Now <ArrowIcon className="size-3.5" />
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        path={path}
      />
    </header>
  )
}
