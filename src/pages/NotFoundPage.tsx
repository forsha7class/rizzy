import { PageShell } from '../components/layout/PageShell'
import { ArrowIcon, buttonStyles } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl py-12 text-center sm:py-20">
        <p className="eyebrow text-royal">404 · Halaman tidak ditemukan</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
          Nyasar, ya?
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/65">
          Alamat ini bukan bagian dari demo RIZZY. Kembali ke beranda untuk melihat presentasi
          brand, atau langsung mulai dari pemilihan paket.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#/" className={buttonStyles({ size: 'lg' })}>
            Kembali ke beranda
          </a>
          <a href="#/order" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
            Pilih paket <ArrowIcon />
          </a>
        </div>
      </div>
    </PageShell>
  )
}
