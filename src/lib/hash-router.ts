import { useCallback, useEffect, useState } from 'react'

export const ROUTES = ['/', '/order', '/checkout', '/payment'] as const
export type AppRoute = (typeof ROUTES)[number]

export function normalizePath(rawHash: string): string {
  let path = rawHash.replace(/^#/, '')
  if (!path.startsWith('/')) path = `/${path}`
  path = path.split('?')[0] ?? '/'
  path = path.replace(/\/+$/, '')
  return path === '' ? '/' : path
}

export function readRoute(): string {
  if (typeof window === 'undefined') return '/'
  return normalizePath(window.location.hash)
}

export function isKnownRoute(path: string): path is AppRoute {
  return (ROUTES as readonly string[]).includes(path)
}

export type NavigateOptions = { replace?: boolean; keepScroll?: boolean }

export function useHashRoute() {
  const [path, setPath] = useState<string>(() => readRoute())

  useEffect(() => {
    const handleChange = () => setPath(readRoute())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  const navigate = useCallback((to: string, options: NavigateOptions = {}) => {
    const normalized = normalizePath(to)
    const target = `#${normalized}`

    if (window.location.hash === target) {
      setPath(normalized)
      if (!options.keepScroll) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (options.replace) {
      window.history.replaceState(null, '', target)
      setPath(normalized)
      if (!options.keepScroll) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    window.location.hash = normalized
  }, [])

  return { path, navigate }
}

export function scrollToSection(id: string): void {
  if (typeof document === 'undefined') return
  const target = document.getElementById(id)
  if (!target) return

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
