import { cn } from '../../lib/cn'

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  disabled?: boolean
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label="Jumlah paket"
      className={cn(
        'inline-flex items-center rounded-full border border-ink/15 bg-cream p-1',
        disabled && 'opacity-50',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Kurangi jumlah"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        className="grid size-11 place-items-center rounded-full text-xl leading-none font-semibold text-ink transition-colors hover:bg-ink/8 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
      >
        −
      </button>
      <output
        aria-live="polite"
        aria-label={`Jumlah: ${value}`}
        className="min-w-10 text-center font-display text-lg font-semibold tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label="Tambah jumlah"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        className="grid size-11 place-items-center rounded-full text-xl leading-none font-semibold text-ink transition-colors hover:bg-ink/8 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
      >
        +
      </button>
    </div>
  )
}
