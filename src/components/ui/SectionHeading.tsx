import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  tone = 'light',
  align = 'left',
  className,
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}) {
  const dark = tone === 'dark'

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <div
        className={cn(
          'mb-5 flex items-center gap-3',
          align === 'center' && 'justify-center',
          dark ? 'text-electric' : 'text-royal',
        )}
      >
        {index ? (
          <span className="font-display text-sm font-semibold tabular-nums">{index}</span>
        ) : null}
        <span className={cn('h-px w-8', dark ? 'bg-cream/30' : 'bg-ink/25')} aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2
        className={cn(
          'font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.035em]',
          dark ? 'text-cream' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-relaxed sm:text-lg',
            align === 'center' && 'mx-auto',
            dark ? 'text-cream/70' : 'text-ink/70',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
