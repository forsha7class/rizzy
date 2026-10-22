import { cn } from '../../lib/cn'

const steps = [
  { number: 1, label: 'Paket', href: '#/order' },
  { number: 2, label: 'Checkout', href: '#/checkout' },
  { number: 3, label: 'Pembayaran', href: '#/payment' },
] as const

export function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Langkah demo" className="w-full xl:w-auto">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
        {steps.map((step, index) => {
          const isCurrent = step.number === current
          const isComplete = step.number < current
          const canLink = isComplete

          return (
            <li key={step.number} className="flex items-center gap-2 sm:gap-3">
              {canLink ? (
                <a
                  href={step.href}
                  className="group flex min-h-11 items-center gap-2 rounded-full pr-1 text-ink/65 transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
                >
                  <span className="grid size-7 place-items-center rounded-full border border-royal/35 bg-royal/8 font-display text-xs font-bold text-royal">
                    ✓
                  </span>
                  <span className="font-display text-sm font-semibold group-hover:underline">
                    {step.label}
                  </span>
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cn(
                    'flex min-h-11 items-center gap-2',
                    isCurrent ? 'text-ink' : 'text-ink/70',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-7 place-items-center rounded-full border font-display text-xs font-bold tabular-nums',
                      isCurrent
                        ? 'border-ink bg-ink text-cream'
                        : 'border-ink/20 text-ink/70',
                    )}
                  >
                    {step.number}
                  </span>
                  <span className="font-display text-sm font-semibold">{step.label}</span>
                </span>
              )}
              {index < steps.length - 1 ? (
                <span className="hidden h-px w-6 bg-ink/20 sm:block lg:w-10" aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
