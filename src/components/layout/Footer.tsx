import { landingContent } from '../../content/landing'
import { siteConfig } from '../../config/site'
import { Wordmark } from '../ui/Logo'
import { ArrowIcon } from '../ui/Button'

const footerLinks = [
  { href: '#/', label: 'Beranda' },
  { href: '#/order', label: 'Pilih paket' },
  { href: '#/checkout', label: 'Checkout' },
  { href: '#/payment', label: 'Pembayaran demo' },
]

export function Footer() {
  return (
    <footer className="bg-ink-deep text-cream">
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex rounded-2xl bg-cream p-4">
              <Wordmark className="w-[170px]" />
            </div>
            <p className="mt-6 max-w-sm font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-cream">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              {landingContent.footer.note}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-orchid">Jelajahi</h2>
            <ul className="mt-5 space-y-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-sm text-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-electric"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-orchid">Catatan</h2>
            <div className="mt-5 rounded-2xl border border-cream/15 bg-cream/5 p-4">
              <p className="eyebrow text-gold">{landingContent.footer.demoLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{siteConfig.demoNotice}</p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-cream/60">
              {siteConfig.presentationNote} Harga mengikuti daftar resmi. Status pembayaran di situs
              ini adalah simulasi.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-cream/60">{landingContent.footer.copyright}</p>
          <a
            href="#/order"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-bold tracking-[0.12em] text-cream/70 uppercase transition-colors hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-electric"
          >
            Coba demo <ArrowIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
