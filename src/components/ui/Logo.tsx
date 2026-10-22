import { asset } from '../../lib/assets'
import { cn } from '../../lib/cn'

type WordmarkProps = {
  className?: string
  full?: boolean
  decorative?: boolean
  priority?: boolean
}

export function Wordmark({
  className,
  full = false,
  decorative = false,
  priority = false,
}: WordmarkProps) {
  const file = full ? 'logo-full' : 'logo-wordmark'
  const alt = full ? 'RIZZY — Chicken Katsu • Es Kelapa' : 'RIZZY'
  const loading = priority ? 'eager' : 'lazy'

  return (
    <picture>
      <source srcSet={asset(`assets/brand/${file}.webp`)} type="image/webp" />
      <img
        src={asset(`assets/brand/${file}.png`)}
        alt={decorative ? '' : alt}
        width={1200}
        height={full ? 403 : 343}
        loading={loading}
        decoding="async"
        className={cn('h-auto', className)}
      />
    </picture>
  )
}

export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src={asset('assets/brand/monogram.png')}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      className={cn('h-auto', className)}
      loading="lazy"
      decoding="async"
    />
  )
}
