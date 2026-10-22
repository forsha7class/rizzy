import { cn } from '../../lib/cn'
import type { DemoStatus } from '../../lib/demo-machine'

const steps = ['Menunggu', 'Dikirim', 'Verifikasi', 'Diproses', 'Selesai'] as const

const activeIndex: Record<DemoStatus, number> = {
  idle: 0,
  awaiting: 0,
  submitted: 1,
  underpaid: 1,
  overpaid: 1,
  verified: 2,
  processing: 3,
  completed: 4,
}

export function StatusTimeline({ status }: { status: DemoStatus }) {
  const current = activeIndex[status]
  const held = status === 'underpaid' || status === 'overpaid'

  return (
    <ol className="mt-6 grid grid-cols-5" aria-label="Tahapan simulasi">
      {steps.map((step, index) => {
        const done = index < current
        const isCurrent = index === current
        const currentColor = held ? 'bg-gold' : status === 'completed' ? 'bg-success' : 'bg-royal'

        return (
          <li key={step} className="relative flex min-w-0 flex-col items-center text-center">
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-[7px] left-1/2 h-px w-full',
                  index < current ? 'bg-royal/50' : 'bg-ink/12',
                )}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                'relative z-10 size-3.5 rounded-full border-2',
                done && 'border-royal bg-royal',
                isCurrent && `${currentColor} border-transparent ring-4 ring-royal/10`,
                !done && !isCurrent && 'border-ink/20 bg-cream',
              )}
            />
            <span
              className={cn(
                'mt-2 block max-w-full truncate text-[0.5rem] font-bold tracking-[0.08em] uppercase sm:text-[0.5625rem]',
                isCurrent ? 'text-ink' : done ? 'text-royal' : 'text-ink/70',
              )}
            >
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
