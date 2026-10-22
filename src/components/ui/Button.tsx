import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost' | 'quiet'
type Size = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-[-0.01em] transition-[transform,background-color,color,border-color,opacity] duration-200 ease-[var(--ease-out-brand)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-electric disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-cream border border-ink hover:bg-ink-deep hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-transparent text-ink border border-ink/45 hover:border-ink hover:bg-ink/5 hover:-translate-y-0.5 active:translate-y-0',
  light:
    'bg-cream text-ink border border-cream hover:bg-ice hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'bg-transparent text-cream border border-cream/35 hover:border-cream hover:bg-cream/10 hover:-translate-y-0.5 active:translate-y-0',
  quiet:
    'bg-ink/5 text-ink border border-transparent hover:bg-ink/10 active:translate-y-0',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-6 text-[0.9375rem]',
  lg: 'min-h-14 px-7 text-base',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
} = {}): string {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  children: ReactNode
  trailing?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  trailing,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      <span className="inline-flex items-center gap-2.5">{children}</span>
      {trailing ?? null}
    </button>
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-4', className)}
    >
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
