import { Badge } from '../components/ui/Badge'
import { PageShell } from '../components/layout/PageShell'
import { StepIndicator } from '../components/ui/StepIndicator'
import { useEffect, useState } from 'react'
import { useOrder } from '../state/OrderContext'
import { demoCatalog, catalogDisclaimer, packageDisclaimer } from '../config/demo-catalog'
import { formatIdr } from '../lib/format'
import { MAX_QUANTITY } from '../lib/pricing'
import { cn } from '../lib/cn'
import { ArrowIcon, Button } from '../components/ui/Button'
import { QuantityStepper } from '../components/ui/QuantityStepper'
import { useHashRoute } from '../lib/hash-router'

export function OrderPage() {
  const { state, selectedPackage, totals, dispatch } = useOrder()
  const { navigate } = useHashRoute()
  const [showMobileBar, setShowMobileBar] = useState(true)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <PageShell className="pb-32 lg:pb-28">
      <div className="flex flex-col gap-8 border-b border-ink/12 pb-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow text-royal">Demo pemesanan · Langkah 1 dari 3</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.96] font-semibold tracking-[-0.045em]">
            Pilih paket demo.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Harga di bawah adalah harga resmi RIZZY. Pilih satu, atur jumlahnya, lalu lihat
            ringkasan sebelum masuk ke simulasi pembayaran.
          </p>
        </div>
        <StepIndicator current={1} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <fieldset>
            <legend className="sr-only">Pilih paket demonstrasi</legend>
            <div className="grid gap-3">
              {demoCatalog.map((item, index) => {
                const selected = state.packageId === item.id

                return (
                  <label
                    key={item.id}
                    htmlFor={`package-${item.id}`}
                    className={cn(
                      'group relative block cursor-pointer rounded-[20px] border p-5 transition-[border-color,background-color,box-shadow] duration-200 sm:p-6',
                      'has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric',
                      selected
                        ? 'border-royal bg-ice/70 shadow-[0_16px_40px_-32px_rgba(114,17,216,0.35)]'
                        : 'border-ink/12 bg-cream hover:border-royal/35 hover:bg-ice/30',
                    )}
                  >
                    <input
                      id={`package-${item.id}`}
                      type="radio"
                      name="rizzy-package"
                      aria-label={item.name}
                      value={item.id}
                      checked={selected}
                      onChange={() => dispatch({ type: 'select_package', packageId: item.id })}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-4 sm:gap-5">
                      <span
                        className={cn(
                          'grid size-11 shrink-0 place-items-center rounded-full border font-display text-sm font-bold tabular-nums sm:size-12',
                          selected
                            ? 'border-royal bg-royal text-cream'
                            : 'border-ink/15 bg-paper text-ink/70',
                        )}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="min-w-0 font-display text-xl leading-tight font-semibold tracking-[-0.025em] sm:text-2xl">
                            {item.name}
                          </h2>
                          <div className="shrink-0 text-right">
                            <p className="font-display text-xl font-semibold tabular-nums sm:text-2xl">
                              {formatIdr(item.priceIdr)}
                            </p>
                            <p className="text-[0.625rem] font-bold tracking-[0.1em] text-ink/70 uppercase">
                              Harga resmi
                            </p>
                          </div>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                          {item.shortDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {selected ? <Badge tone="royal">Dipilih</Badge> : null}
                          {item.contents.map((content) => (
                            <span
                              key={content}
                              className={cn(
                                'rounded-full border px-2.5 py-1 text-xs font-medium',
                                selected
                                  ? 'border-royal/20 bg-cream text-ink/75'
                                  : 'border-ink/10 bg-ink/3 text-ink/70',
                              )}
                            >
                              {content}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span
                        className={cn(
                          'mt-1 hidden size-6 shrink-0 place-items-center rounded-full border-2 sm:grid',
                          selected
                            ? 'border-royal bg-royal text-cream'
                            : 'border-ink/20 bg-transparent',
                        )}
                        aria-hidden="true"
                      >
                        {selected ? (
                          <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                            <path
                              d="M3 8.5l3.2 3L13 4.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : null}
                      </span>
                    </div>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-ink/10 bg-cream p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-display text-lg font-semibold tracking-[-0.02em]">Jumlah paket</p>
              <p className="mt-1 text-sm text-ink/70">
                {selectedPackage
                  ? `Maksimal ${MAX_QUANTITY} paket per simulasi.`
                  : 'Pilih paket terlebih dahulu untuk mengatur jumlah.'}
              </p>
            </div>
            <QuantityStepper
              value={state.quantity}
              onChange={(quantity) => dispatch({ type: 'set_quantity', quantity })}
              max={MAX_QUANTITY}
              disabled={!selectedPackage}
            />
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-ink/10 bg-ice/50 p-4">
            <Badge tone="gold" className="mt-0.5 shrink-0">
              Harga resmi
            </Badge>
            <p className="text-xs leading-relaxed text-ink/70">
              {catalogDisclaimer} {packageDisclaimer}
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32 rounded-[24px] border border-ink/12 bg-cream p-5 sm:p-6">
            <p className="eyebrow text-royal">Ringkasan pilihan</p>

            {selectedPackage ? (
              <>
                <div className="mt-4 flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-[-0.025em]">
                      {selectedPackage.name}
                    </h2>
                    <p className="mt-1 text-xs text-ink/70">
                      {selectedPackage.contents.join(' · ')}
                    </p>
                  </div>
                  <Badge tone="royal">Demo</Badge>
                </div>

                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink/70">Harga satuan</dt>
                    <dd className="tabular-nums">{formatIdr(totals.unitPriceIdr)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink/70">Jumlah</dt>
                    <dd className="tabular-nums">{totals.quantity} paket</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink/70">Biaya tambahan</dt>
                    <dd>Tidak ada</dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-end justify-between gap-4 border-t border-ink/12 pt-4">
                  <p className="text-sm font-semibold">Subtotal</p>
                  <p
                    className="font-display text-3xl font-semibold tracking-[-0.03em] tabular-nums"
                    aria-live="polite"
                  >
                    {formatIdr(totals.totalIdr)}
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-ink/20 bg-paper/70 p-5">
                <p className="font-display text-lg font-semibold">Belum ada paket dipilih.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Pilih salah satu paket di sebelah kiri untuk melihat total simulasi.
                </p>
              </div>
            )}

            <Button
              className="mt-5 w-full"
              size="lg"
              disabled={!selectedPackage}
              onClick={() => navigate('/checkout')}
            >
              Checkout <ArrowIcon />
            </Button>

            <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-ink/70">
              Harga resmi. Total di atas adalah simulasi dan tidak ada pembayaran nyata.
            </p>

            <a
              href="#/"
              className="mt-4 flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-ink/70 transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
            >
              ← Kembali ke beranda
            </a>
          </div>
        </aside>
      </div>

      {showMobileBar ? (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/12 bg-cream/95 backdrop-blur-md lg:hidden">
        <div className="shell flex items-center gap-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="text-[0.625rem] font-bold tracking-[0.12em] text-ink/70 uppercase">
              Subtotal simulasi
            </p>
            <p className="font-display text-xl leading-tight font-semibold tabular-nums">
              {selectedPackage ? formatIdr(totals.totalIdr) : '—'}
            </p>
          </div>
          <Button
            className="shrink-0 px-5"
            disabled={!selectedPackage}
            onClick={() => navigate('/checkout')}
          >
            Checkout <ArrowIcon />
          </Button>
        </div>
      </div>
      ) : null}
    </PageShell>
  )
}
