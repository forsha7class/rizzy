import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { StatusTone } from '../../content/demo-status'

const tones: Record<StatusTone, { pill: string; dot: string }> = {
  neutral: { pill: 'bg-ink/6 text-ink border-ink/15', dot: 'bg-ink/45' },
  wait: { pill: 'bg-royal/8 text-royal border-royal/20', dot: 'bg-royal' },
  progress: { pill: 'bg-electric/12 text-royal border-electric/30', dot: 'bg-electric' },
  warning: { pill: 'bg-gold/15 text-ink border-gold/45', dot: 'bg-gold' },
  danger: { pill: 'bg-magenta/10 text-magenta border-magenta/30', dot: 'bg-magenta' },
  success: { pill: 'bg-success/10 text-success border-success/25', dot: 'bg-success' },
}

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: StatusTone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.625rem] leading-none',
        tones[tone].pill,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', tones[tone].dot)} aria-hidden="true" />
      {children}
    </span>
  )
}
