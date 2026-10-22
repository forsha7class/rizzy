import { asset } from '../../lib/assets'
import { cn } from '../../lib/cn'

/**
 * Official RIZZY payment-card artwork. The supplied QR illustrations have been
 * recoloured to the purple brand palette, carry official QRIS/Tether marks, and
 * are covered at the centre so they cannot be used as payment codes.
 */
export function MockQr({
  method,
  className,
}: {
  method: 'QRIS' | 'USDT'
  className?: string
}) {
  const file = method === 'QRIS' ? 'qris-card' : 'usdt-card'

  return (
    <figure className={cn('mx-auto w-full max-w-[300px]', className)}>
      <picture>
        <source srcSet={asset(`assets/payment/${file}.webp`)} type="image/webp" />
        <img
          src={asset(`assets/payment/${file}.png`)}
          alt={`Ilustrasi QR ${method} untuk demo. Tidak berisi data pembayaran dan tidak dapat dipindai.`}
          width={900}
          height={900}
          loading="eager"
          decoding="async"
          className="block w-full rounded-[24px] shadow-[0_22px_50px_-30px_rgba(23,5,46,0.45)]"
        />
      </picture>
      <figcaption className="mt-2 text-center text-[0.625rem] font-semibold tracking-[0.12em] text-ink/70 uppercase">
        QR ilustrasi · tidak dapat dipindai
      </figcaption>
    </figure>
  )
}
