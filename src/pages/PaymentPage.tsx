import { useEffect } from 'react'
import { Badge } from '../components/ui/Badge'
import { EmptyOrderState, PageShell } from '../components/layout/PageShell'
import { StepIndicator } from '../components/ui/StepIndicator'
import { StatusPill } from '../components/ui/StatusPill'
import { StatusTimeline } from '../components/product/StatusTimeline'
import { MockQr } from '../components/product/MockQr'
import { useOrder } from '../state/OrderContext'
import { formatIdr, formatIdrAsUsdt } from '../lib/format'
import { availableEvents, isHeldStatus, type DemoStatus } from '../lib/demo-machine'
import { demoPayment, PAYMENT_METHODS, type PaymentMethod } from '../config/demo-payment'
import { demoActionCopy, demoStatusCopy, presenterNotice } from '../content/demo-status'
import { cn } from '../lib/cn'
import { useHashRoute } from '../lib/hash-router'
import { ArrowIcon, buttonStyles } from '../components/ui/Button'
import { siteConfig } from '../config/site'

const methodCopy: Record<
  PaymentMethod,
  { name: string; kicker: string; note: string; instructions: string[] }
> = {
  qris: {
    name: 'QRIS',
    kicker: 'QR domestik',
    note: demoPayment.qrisNote,
    instructions: [
      'Buka aplikasi pembayaran pilihanmu.',
      'Perhatikan QR contoh — tidak dapat dipindai.',
      'Lanjutkan dengan tombol simulasi di bawah.',
    ],
  },
  usdt: {
    name: 'USDT',
    kicker: 'Aset digital',
    note: demoPayment.usdtNote,
    instructions: [
      'Perhatikan QR ilustrasi di samping.',
      'Tidak ada alamat wallet atau jaringan di demo ini.',
      'Lanjutkan dengan tombol simulasi di bawah.',
    ],
  },
}

function MethodIcon({ method }: { method: PaymentMethod }) {
  if (method === 'qris') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
        <path
          d="M4 9V5a1 1 0 011-1h4M15 4h4a1 1 0 011 1v4M20 15v4a1 1 0 01-1 1h-4M9 20H5a1 1 0 01-1-1v-4M8 8h2v2H8zM14 8h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9 7.5h6M12 6v2.5m-3 2h6m-6 2.5h4.5a1.5 1.5 0 010 3H9m3 0V18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function getSimulatedPaid(status: DemoStatus, total: number) {
  if (status === 'underpaid') {
    return Math.max(0, total - demoPayment.underpaymentAmountIdr)
  }
  if (status === 'overpaid') {
    return total + demoPayment.overpaymentAmountIdr
  }
  if (status === 'submitted' || status === 'verified' || status === 'processing' || status === 'completed') {
    return total
  }
  return null
}

export function PaymentPage() {
  const { state, selectedPackage, totals, dispatch, reset } = useOrder()
  const { navigate } = useHashRoute()

  useEffect(() => {
    if (state.status === 'idle') dispatch({ type: 'advance', event: 'begin' })
  }, [state.status, dispatch])

  useEffect(() => {
    if (!state.method) dispatch({ type: 'set_method', method: 'qris' })
  }, [state.method, dispatch])

  const method: PaymentMethod = state.method ?? 'qris'
  const copy = demoStatusCopy[state.status]
  const held = isHeldStatus(state.status)
  const simulatedPaid = getSimulatedPaid(state.status, totals.totalIdr)
  const events = availableEvents(state.status)
  const canSimulate = ['idle', 'awaiting', 'underpaid', 'overpaid'].includes(state.status)

  if (!selectedPackage) {
    return (
      <PageShell>
        <div className="flex flex-col gap-8 border-b border-ink/12 pb-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="eyebrow text-royal">Demo pemesanan · Langkah 3 dari 3</p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.96] font-semibold tracking-[-0.045em]">
              Pembayaran demo.
            </h1>
          </div>
          <StepIndicator current={3} />
        </div>
        <div className="mt-10">
          <EmptyOrderState
            title="Belum ada pesanan untuk dibayar."
            description="Demo pembayaran membutuhkan paket yang sudah dipilih. Mulai dari langkah pertama, lalu lanjutkan sampai ke halaman ini."
            action={
              <a href="#/order" className={buttonStyles({ size: 'lg' })}>
                Mulai pilih paket <ArrowIcon />
              </a>
            }
          />
        </div>
      </PageShell>
    )
  }

  const primaryLabel = held
    ? 'Simulasikan pembayaran ulang'
    : demoActionCopy.mark_paid.label

  const disabledLabel: Record<string, string> = {
    submitted: 'Pembayaran simulasi sudah dikirim',
    verified: 'Sudah terverifikasi (simulasi)',
    processing: 'Pesanan simulasi sedang diproses',
    completed: 'Simulasi selesai',
  }

  return (
    <PageShell>
      <div className="flex flex-col gap-8 border-b border-ink/12 pb-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-royal">Demo pemesanan · Langkah 3 dari 3</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.96] font-semibold tracking-[-0.045em]">
            Pembayaran demo.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Pilih metode, lihat QR ilustrasi, lalu jalankan status simulasi. Tidak ada QR, wallet,
            atau transaksi nyata di halaman ini.
          </p>
        </div>
        <StepIndicator current={3} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <section aria-labelledby="method-title" className="rounded-[24px] border border-ink/12 bg-cream p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <h2 id="method-title" className="font-display text-lg font-semibold tracking-[-0.02em]">
                Metode pembayaran
              </h2>
              <Badge tone="gold">Simulasi</Badge>
            </div>

            <div
              role="tablist"
              aria-label="Metode pembayaran demo"
              className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-ink/10 bg-ice/60 p-2"
            >
              {PAYMENT_METHODS.map((item) => {
                const selected = method === item
                return (
                  <button
                    key={item}
                    id={`tab-${item}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${item}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => dispatch({ type: 'set_method', method: item })}
                    onKeyDown={(event) => {
                      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
                      event.preventDefault()
                      const index = PAYMENT_METHODS.indexOf(item)
                      const nextIndex =
                        event.key === 'ArrowRight'
                          ? (index + 1) % PAYMENT_METHODS.length
                          : (index - 1 + PAYMENT_METHODS.length) % PAYMENT_METHODS.length
                      const nextMethod = PAYMENT_METHODS[nextIndex]
                      dispatch({ type: 'set_method', method: nextMethod })
                      document.getElementById(`tab-${nextMethod}`)?.focus()
                    }}
                    className={cn(
                      'flex min-h-14 items-center gap-3 rounded-xl border px-3 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric sm:px-4',
                      selected
                        ? 'border-royal/30 bg-cream shadow-sm'
                        : 'border-transparent bg-transparent hover:bg-cream/60',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-full border',
                        selected ? 'border-royal bg-royal text-cream' : 'border-ink/15 text-ink/70',
                      )}
                    >
                      <MethodIcon method={item} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-base font-semibold">{methodCopy[item].name}</span>
                      <span className="hidden truncate text-[0.6875rem] text-ink/70 sm:block">
                        {methodCopy[item].kicker}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${method}`}
              aria-labelledby={`tab-${method}`}
              className="mt-3 rounded-2xl border border-ink/10 bg-paper/60 p-4 sm:p-5"
            >
              <div className="grid gap-6 sm:grid-cols-[minmax(0,230px)_1fr] sm:items-start">
                <MockQr method={method === 'qris' ? 'QRIS' : 'USDT'} seed={method === 'qris' ? 41 : 77} />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="eyebrow text-ink/70">Jumlah simulasi</p>
                    <Badge tone="outline">{methodCopy[method].name} demo</Badge>
                  </div>
                  <p className="mt-2 font-display text-[clamp(2rem,5vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                    {formatIdr(totals.totalIdr)}
                  </p>

                  {method === 'usdt' ? (
                    <div className="mt-2">
                      <p className="font-display text-lg font-semibold text-royal">
                        {formatIdrAsUsdt(totals.totalIdr, demoPayment.usdtIllustrativeRateIdr)}
                      </p>
                      <p className="mt-1 text-[0.6875rem] leading-relaxed text-ink/70">
                        {demoPayment.usdtRateNote}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-ink/70">Nominal dalam Rupiah, hanya untuk demo.</p>
                  )}

                  <ol className="mt-4 space-y-2">
                    {methodCopy[method].instructions.map((instruction, index) => (
                      <li key={instruction} className="flex items-start gap-2 text-xs leading-relaxed text-ink/65">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full border border-royal/20 bg-cream font-display text-[0.5625rem] font-bold text-royal">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>

                  <p className="mt-4 border-t border-ink/10 pt-3 text-[0.6875rem] leading-relaxed text-ink/70">
                    {methodCopy[method].note}
                  </p>

                  <button
                    type="button"
                    disabled={!canSimulate}
                    onClick={() => dispatch({ type: 'advance', event: 'mark_paid' })}
                    className={cn(buttonStyles({ size: 'md' }), 'mt-4 w-full px-4 text-sm sm:px-6 sm:text-[0.9375rem]')}
                  >
                    {canSimulate ? primaryLabel : (disabledLabel[state.status] ?? 'Simulasi berjalan')}
                    {canSimulate ? <ArrowIcon className="hidden sm:block" /> : null}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 px-1 text-[0.6875rem] leading-relaxed text-ink/70">
              Nominal, QR, dan status di panel ini adalah ilustrasi presentasi. Tidak ada data
              pembayaran yang dikirim atau disimpan.
            </p>
          </section>

          <div className="mt-4 rounded-2xl border border-ink/10 bg-ice/45 p-4">
            <p className="text-xs leading-relaxed text-ink/70">
              <strong className="font-bold text-ink">Catatan presentasi:</strong>{' '}
              {siteConfig.presentationNote} Semua tombol pembayaran di sini hanya mengubah status
              simulasi di browser.
            </p>
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <section aria-labelledby="payment-order-title" className="rounded-[24px] border border-ink/12 bg-cream p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow text-royal">Pesanan simulasi</p>
              <a
                href="#/checkout"
                className="inline-flex min-h-9 items-center rounded-full px-2 text-xs font-bold tracking-[0.08em] text-ink/70 uppercase transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Ubah
              </a>
            </div>
            <h2 id="payment-order-title" className="mt-2 font-display text-xl font-semibold tracking-[-0.025em]">
              {selectedPackage.name}
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/70">Jumlah</dt>
                <dd className="tabular-nums">{totals.quantity} paket</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/70">Metode</dt>
                <dd>{methodCopy[method].name} · demo</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-ink/10 pt-2">
                <dt className="font-semibold">Total simulasi</dt>
                <dd className="font-display text-lg font-semibold tabular-nums">{formatIdr(totals.totalIdr)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[0.6875rem] leading-relaxed text-ink/70">
              Harga contoh, bukan harga resmi. Tidak ada ongkir, pajak, atau diskon.
            </p>
          </section>

          <section
            aria-labelledby="status-title"
            className="rounded-[24px] border border-ink/12 bg-cream p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="eyebrow text-royal">Status demo</p>
              <StatusPill tone={copy.tone}>{copy.label}</StatusPill>
            </div>

            <div aria-live="polite" aria-atomic="true">
              <h2
                id="status-title"
                className="mt-4 font-display text-2xl leading-tight font-semibold tracking-[-0.03em]"
              >
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{copy.body}</p>
            </div>

            <StatusTimeline status={state.status} />

            {simulatedPaid !== null ? (
              <div className="mt-5 rounded-2xl border border-ink/10 bg-ice/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow text-ink/70">Rincian simulasi</p>
                  <Badge tone={held ? 'gold' : 'royal'}>
                    {held ? 'Ditahan' : 'Ilustrasi'}
                  </Badge>
                </div>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-ink/70">Total diminta</dt>
                    <dd className="tabular-nums">{formatIdr(totals.totalIdr)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-ink/70">Nilai pembayaran simulasi</dt>
                    <dd className="tabular-nums">{formatIdr(simulatedPaid)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-1.5 font-semibold">
                    <dt>{held ? (state.status === 'underpaid' ? 'Kekurangan' : 'Kelebihan') : 'Status dana'}</dt>
                    <dd className="tabular-nums">
                      {held
                        ? formatIdr(Math.abs(totals.totalIdr - simulatedPaid))
                        : 'Sesuai nominal'}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-[0.625rem] leading-relaxed text-ink/70">
                  Angka ini ilustrasi, bukan mutasi rekening, saldo, atau bukti transfer.
                </p>
              </div>
            ) : null}

            {held ? (
              <p className="mt-3 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs leading-relaxed text-ink/70">
                Pesanan simulasi tetap ditahan. Gunakan tombol “Simulasikan pembayaran ulang” untuk
                mengembalikannya ke status dikirim.
              </p>
            ) : null}
          </section>

          <section
            aria-labelledby="controls-title"
            className="rounded-[24px] border border-ink/15 bg-ink p-5 text-cream"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="controls-title" className="eyebrow text-electric">
                Panel kontrol demo
              </h2>
              <Badge tone="demo">Presenter</Badge>
            </div>
            <p className="mt-2 text-[0.6875rem] leading-relaxed text-cream/60">{presenterNotice}</p>

            <div className="mt-4 grid gap-2">
              {events.length > 0 ? (
                events.map((event) => {
                  const action = demoActionCopy[event]
                  const isVerify = event === 'verify'
                  const isBranch = event === 'underpay' || event === 'overpay'
                  return (
                    <button
                      key={event}
                      type="button"
                      onClick={() => dispatch({ type: 'advance', event })}
                      className={cn(
                        'w-full rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric',
                        isVerify
                          ? 'border-electric/60 bg-electric/15 hover:bg-electric/25'
                          : isBranch
                            ? 'border-gold/40 bg-cream/5 hover:bg-cream/10'
                            : 'border-cream/20 bg-cream/5 hover:bg-cream/10',
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {held && event === 'mark_paid' ? 'Simulasikan pembayaran ulang' : action.label}
                      </span>
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-cream/60">
                        {action.description}
                      </span>
                    </button>
                  )
                })
              ) : (
                <p className="rounded-xl border border-cream/15 bg-cream/5 p-3 text-sm text-cream/60">
                  Alur demo selesai. Reset untuk menjalankan presentasi lagi.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                reset()
                navigate('/order')
              }}
              className={cn(buttonStyles({ variant: 'ghost', size: 'md' }), 'mt-4 w-full')}
            >
              Reset demo
            </button>

            <p className="mt-3 text-center text-[0.625rem] leading-relaxed text-cream/60">
              Reset menghapus pilihan di memori dan kembali ke langkah paket.
            </p>
          </section>

          <a
            href="#/checkout"
            className="flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-ink/70 transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            ← Kembali ke ringkasan
          </a>
        </aside>
      </div>
    </PageShell>
  )
}
