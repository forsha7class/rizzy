import { Badge } from '../components/ui/Badge'
import { EmptyOrderState, PageShell } from '../components/layout/PageShell'
import { StepIndicator } from '../components/ui/StepIndicator'
import { useOrder } from '../state/OrderContext'
import { formatIdr } from '../lib/format'
import { buttonStyles, ArrowIcon } from '../components/ui/Button'
import { useHashRoute } from '../lib/hash-router'
import { demoPayment } from '../config/demo-payment'

const nextSteps = [
  'Pilih QRIS atau USDT di halaman berikutnya.',
  'Lihat QR ilustrasi dan jumlah simulasi.',
  'Jalankan status demo dari panel presenter.',
]

export function CheckoutPage() {
  const { selectedPackage, totals } = useOrder()
  const { navigate } = useHashRoute()

  return (
    <PageShell>
      <div className="flex flex-col gap-8 border-b border-ink/12 pb-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-royal">Demo pemesanan · Langkah 2 dari 3</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.96] font-semibold tracking-[-0.045em]">
            Ringkasan pesanan.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Periksa paket dan jumlahnya. Tidak ada data pribadi yang diminta di demo ini.
          </p>
        </div>
        <StepIndicator current={2} />
      </div>

      {!selectedPackage ? (
        <div className="mt-10">
          <EmptyOrderState
            title="Pilih paket dulu, ya."
            description="Ringkasan butuh paket demo yang sudah dipilih. Kembali ke langkah pertama untuk menentukan paket dan jumlah."
            action={
              <a href="#/order" className={buttonStyles({ size: 'lg' })}>
                Pilih paket <ArrowIcon />
              </a>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <section
                aria-labelledby="summary-title"
                className="rounded-[24px] border border-ink/12 bg-cream p-5 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/10 pb-5">
                  <div>
                    <p className="eyebrow text-royal">Paket demo</p>
                    <h2
                      id="summary-title"
                      className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                    >
                      {selectedPackage.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-ink/70">
                      {selectedPackage.contents.join(' · ')}
                    </p>
                  </div>
                  <a
                    href="#/order"
                    className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 text-xs font-bold tracking-[0.08em] uppercase transition-colors hover:bg-ink/5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
                  >
                    Ubah paket
                  </a>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/70">Harga satuan</dt>
                    <dd className="tabular-nums">{formatIdr(totals.unitPriceIdr)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/70">Jumlah</dt>
                    <dd className="tabular-nums">{totals.quantity} paket</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/70">Subtotal</dt>
                    <dd className="tabular-nums">{formatIdr(totals.subtotalIdr)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink/70">Ongkir, pajak, diskon</dt>
                    <dd>Tidak ada dalam demo</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/12 pt-5">
                  <div>
                    <p className="font-display text-lg font-semibold">Grand total</p>
                    <p className="mt-0.5 text-xs text-ink/70">Sudah termasuk jumlah paket</p>
                  </div>
                  <p
                    className="font-display text-3xl font-semibold tracking-[-0.035em] tabular-nums sm:text-4xl"
                    aria-live="polite"
                  >
                    {formatIdr(totals.totalIdr)}
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="next-title"
                className="mt-5 rounded-[24px] border border-ink/10 bg-ice/45 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 id="next-title" className="font-display text-lg font-semibold tracking-[-0.02em]">
                    Setelah ini
                  </h2>
                  <Badge tone="outline">Tanpa data pribadi</Badge>
                </div>
                <ol className="mt-4 space-y-3">
                  {nextSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-ink/65">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-royal/25 bg-cream font-display text-[0.625rem] font-bold text-royal">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-cream p-4">
                <Badge tone="gold" className="mt-0.5 shrink-0">
                  Harga contoh
                </Badge>
                <p className="text-xs leading-relaxed text-ink/70">
                  {formatIdr(totals.totalIdr)} adalah total simulasi. Harga resmi RIZZY belum
                  ditetapkan dan tidak ada transaksi yang diproses oleh situs ini.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-32 rounded-[24px] border border-ink/12 bg-ink p-5 text-cream sm:p-6">
                <p className="eyebrow text-electric">Total simulasi</p>
                <p className="mt-3 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                  {formatIdr(totals.totalIdr)}
                </p>
                <p className="mt-2 text-sm text-cream/60">
                  {totals.quantity} × {selectedPackage.name}
                </p>

                <div className="mt-5 space-y-2 border-t border-cream/15 pt-4 text-xs leading-relaxed text-cream/65">
                  <p>Metode pembayaran dipilih di langkah berikutnya.</p>
                  <p>QRIS dan USDT hanya simulasi visual.</p>
                  <p>Nilai USDT memakai kurs ilustrasi, bukan kurs resmi.</p>
                  <p>Data tidak disimpan dan tidak dikirim ke mana pun.</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/payment')}
                  className={`${buttonStyles({ variant: 'light', size: 'lg' })} mt-6 w-full`}
                >
                  Lanjut ke pembayaran <ArrowIcon />
                </button>

                <a
                  href="#/order"
                  className="mt-3 flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-cream/70 transition-colors hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  ← Ubah paket atau jumlah
                </a>

                <div className="mt-5 rounded-xl border border-cream/15 bg-cream/5 p-3">
                  <p className="text-[0.6875rem] leading-relaxed text-cream/65">
                    Setelah lanjut, kamu akan melihat QRIS/USDT demo dengan nominal{' '}
                    {formatIdr(totals.totalIdr)}. Nominal USDT memakai contoh 1 USDT ={' '}
                    {formatIdr(demoPayment.usdtIllustrativeRateIdr)}.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </PageShell>
  )
}
