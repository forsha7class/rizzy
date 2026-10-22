/**
 * Resolve a file from /public while respecting Vite's configured base path.
 * With `base: './'` this produces a relative URL that also works when the
 * site is hosted under a GitHub Pages project path.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\/+/, '')}`
}
