import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../App'

function setHash(hash: string) {
  window.history.replaceState(null, '', hash)
}

async function openOrderWithDuo() {
  setHash('#/order')
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByText('Paket Duo', { exact: true }))
  await user.click(screen.getByRole('button', { name: 'Tambah jumlah' }))
  return user
}

describe('RIZZY demo application', () => {
  beforeEach(() => {
    setHash('#/')
  })

  it('renders the landing narrative and links Buy Now to the demo', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Praktis.')
    expect(screen.getByRole('heading', { name: /Makan enak nggak harus ribet/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Antara mepet waktu/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Satu paket, dua suasana/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Kenapa RIZZY/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Coba alur pesannya/i })).toBeInTheDocument()

    const buyNow = screen.getAllByRole('link', { name: /Buy Now/i })
    expect(buyNow.length).toBeGreaterThan(0)
    for (const link of buyNow) expect(link).toHaveAttribute('href', '#/order')
  })

  it('selects a package, recalculates totals, and reaches checkout', async () => {
    setHash('#/order')
    const user = userEvent.setup()
    render(<App />)

    const checkoutButtons = screen.getAllByRole('button', { name: /^Checkout/i })
    for (const button of checkoutButtons) expect(button).toBeDisabled()
    expect(screen.getByText('Belum ada paket dipilih.')).toBeInTheDocument()

    await user.click(screen.getByText('Paket Duo', { exact: true }))
    expect(screen.getByText('Dipilih')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tambah jumlah' }))
    expect(screen.getByLabelText('Jumlah: 2')).toBeInTheDocument()

    const totals = screen.getAllByText((content) => content.replace(/\s/g, ' ') === 'Rp 72.000')
    expect(totals.length).toBeGreaterThan(0)

    for (const button of screen.getAllByRole('button', { name: /^Checkout/i })) {
      expect(button).toBeEnabled()
    }

    await user.click(screen.getAllByRole('button', { name: /^Checkout/i })[0])
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Ringkasan pesanan/i })).toBeInTheDocument()
    })

    const summary = screen.getByRole('heading', { name: 'Paket Duo' }).closest('section')
    expect(summary).not.toBeNull()
    expect(within(summary as HTMLElement).getByText(/2 paket/)).toBeInTheDocument()
    expect(screen.getAllByText((content) => content.replace(/\s/g, ' ') === 'Rp 72.000').length).toBeGreaterThan(0)
  })

  it('runs the complete QRIS simulation, including held and verified states, then resets', async () => {
    const user = await openOrderWithDuo()
    await user.click(screen.getAllByRole('button', { name: /^Checkout/i })[0])
    await waitFor(() => screen.getByRole('heading', { name: /Ringkasan pesanan/i }))
    await user.click(screen.getByRole('button', { name: /Lanjut ke pembayaran/i }))

    await waitFor(() => screen.getByRole('heading', { name: /Pembayaran demo/i }))
    expect(screen.getByRole('tab', { name: /QRIS/i })).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('img', { name: /Ilustrasi QR QRIS untuk demo/i }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(/Tidak menerima pesanan atau pembayaran sungguhan/i).length,
    ).toBeGreaterThan(0)

    await user.click(screen.getAllByRole('button', { name: /Simulasikan sudah membayar/i })[0])
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Pembayaran simulasi dikirim/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Simulasikan kurang bayar/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Simulasi kurang bayar/i })).toBeInTheDocument()
    })
    expect(screen.getAllByText(/Kekurangan/i).length).toBeGreaterThan(0)

    await user.click(screen.getAllByRole('button', { name: /Simulasikan pembayaran ulang/i })[0])
    await waitFor(() => screen.getByRole('heading', { name: /Pembayaran simulasi dikirim/i }))
    await user.click(screen.getByRole('button', { name: /Simulasikan pembayaran terverifikasi/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Pembayaran terverifikasi \(simulasi\)/i })).toBeInTheDocument()
    })
    expect(screen.getByText(/admin berwenang memverifikasi/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Simulasikan pesanan diproses/i }))
    await waitFor(() => screen.getByRole('heading', { name: /Pesanan simulasi sedang diproses/i }))
    await user.click(screen.getByRole('button', { name: /Simulasikan pesanan selesai/i }))
    await waitFor(() => screen.getByRole('heading', { name: /Simulasi selesai/i }))

    await user.click(screen.getByRole('button', { name: 'Reset demo' }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Pilih paket demo/i })).toBeInTheDocument()
    })
    for (const button of screen.getAllByRole('button', { name: /^Checkout/i })) {
      expect(button).toBeDisabled()
    }
  })

  it('switches to the illustrative USDT method with a non-binding rate', async () => {
    const user = await openOrderWithDuo()
    await user.click(screen.getAllByRole('button', { name: /^Checkout/i })[0])
    await waitFor(() => screen.getByRole('heading', { name: /Ringkasan pesanan/i }))
    await user.click(screen.getByRole('button', { name: /Lanjut ke pembayaran/i }))
    await waitFor(() => screen.getByRole('heading', { name: /Pembayaran demo/i }))

    await user.click(screen.getByRole('tab', { name: /USDT/i }))
    expect(screen.getByRole('img', { name: /Ilustrasi QR USDT untuk demo/i })).toBeInTheDocument()
    expect(screen.getByText(/≈ 4,50 USDT/)).toBeInTheDocument()
    expect(screen.getByText(/Bukan kurs resmi/i)).toBeInTheDocument()
    expect(screen.getByText(/tidak menyediakan alamat wallet/i)).toBeInTheDocument()
  })

  it('guards checkout and payment deep links that have no in-memory order', async () => {
    setHash('#/checkout')
    const { unmount } = render(<App />)
    expect(screen.getByRole('heading', { name: /Pilih paket dulu/i })).toBeInTheDocument()
    unmount()

    setHash('#/payment')
    render(<App />)
    expect(screen.getByRole('heading', { name: /Belum ada pesanan untuk dibayar/i })).toBeInTheDocument()
  })

  it('shows a friendly not-found view for unknown hashes', () => {
    setHash('#/tidak-ada')
    render(<App />)
    expect(screen.getByRole('heading', { name: /Nyasar, ya/i })).toBeInTheDocument()
  })
})
