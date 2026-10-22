import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'demo' | 'neutral' | 'royal' | 'gold' | 'success' | 'danger' | 'outline'

const tones: Record<Tone, string> = {
  demo: 'bg-gold text-ink border-gold',
  neutral: 'bg-ink/6 text-ink border-ink/10',
  royal: 'bg-royal text-cream border-royal',
  gold: 'bg-gold/15 text-ink border-gold/40',
  success: 'bg-success/12 text-success border-success/25',
  danger: 'bg-danger/10 text-danger border-danger/25',
  outline: 'bg-transparent text-ink border-ink/20',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.625rem] leading-none',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
