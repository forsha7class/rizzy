import { siteConfig } from '../../config/site'
import { cn } from '../../lib/cn'

export function DemoNotice({
  variant = 'inline',
  className,
}: {
  variant?: 'inline' | 'banner'
  className?: string
}) {
  if (variant === 'banner') {
    return (
      <div className={cn('border-b border-cream/15 bg-ink text-cream', className)}>
        <div className="shell flex items-center gap-3 py-2.5">
          <span className="eyebrow shrink-0 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] leading-none text-ink">
            Demo only
          </span>
          <p className="text-xs leading-snug sm:text-sm">{siteConfig.demoNotice}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      role="note"
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-gold/45 bg-gold/10 p-4 text-ink',
        className,
      )}
    >
      <span className="eyebrow mt-0.5 shrink-0 rounded-full bg-ink px-2.5 py-1 text-[0.6rem] leading-none text-cream">
        Demo
      </span>
      <p className="text-sm leading-relaxed">
        <strong className="font-bold">DEMO ONLY.</strong> Simulasi presentasi. Tidak menerima
        pesanan atau pembayaran sungguhan.
      </p>
    </div>
  )
}
