import { expect, test, type Page } from '@playwright/test'

const demoNotice = /Tidak menerima pesanan atau pembayaran sungguhan/i

async function startOrder(page: Page) {
  await page.goto('/#/')
  await page.getByRole('link', { name: /Buy Now/i }).first().click()
  await expect(page).toHaveURL(/#\/order$/)
  await expect(page.getByRole('heading', { name: /Pilih paket demo/i })).toBeVisible()
}

test('landing page presents the brand and reaches the demo', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Praktis.')
  await expect(page.getByRole('heading', { name: /Makan enak nggak harus ribet/i })).toBeAttached()
  await expect(page.getByRole('heading', { name: /Satu paket, dua suasana/i })).toBeAttached()
  await expect(page.getByRole('img', { name: /Kotak makan RIZZY/i })).toBeAttached()
  await expect(page.getByText(/Tim RIZZY/i).first()).toBeAttached()

  await page.getByRole('link', { name: /Buy Now/i }).first().click()
  await expect(page).toHaveURL(/#\/order$/)
  await expect(page.getByText(demoNotice).first()).toBeVisible()
})

test('complete QRIS journey reaches a simulated completed state', async ({ page }) => {
  await startOrder(page)

  await page.getByText('Paket Duo', { exact: true }).click()
  await page.getByRole('button', { name: 'Tambah jumlah' }).click()
  await expect(page.getByRole('button', { name: /^Checkout/ }).first()).toBeEnabled()
  await expect(page.getByText('Rp 72.000', { exact: true }).first()).toBeVisible()

  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await expect(page).toHaveURL(/#\/checkout$/)
  await expect(page.getByRole('heading', { name: /Ringkasan pesanan/i })).toBeVisible()
  await expect(page.getByText(/2 paket/).first()).toBeVisible()
  await expect(page.getByText(demoNotice).first()).toBeVisible()

  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()
  await expect(page).toHaveURL(/#\/payment$/)
  await expect(page.getByRole('heading', { name: /Pembayaran demo/i })).toBeVisible()
  await expect(page.getByRole('tab', { name: /QRIS/i })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('img', { name: /Ilustrasi QR QRIS untuk demo/i })).toBeVisible()
  await expect(page.getByText(demoNotice).first()).toBeVisible()

  await page.getByRole('button', { name: 'Simulasikan sudah membayar' }).first().click()
  await expect(
    page.getByRole('heading', { name: /Pembayaran simulasi dikirim/i }),
  ).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan kurang bayar/i }).click()
  await expect(page.getByRole('heading', { name: /Simulasi kurang bayar/i })).toBeVisible()
  await expect(page.getByText('Kekurangan').first()).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan pembayaran ulang/i }).first().click()
  await expect(
    page.getByRole('heading', { name: /Pembayaran simulasi dikirim/i }),
  ).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan pembayaran terverifikasi/i }).click()
  await expect(
    page.getByRole('heading', { name: /Pembayaran terverifikasi \(simulasi\)/i }),
  ).toBeVisible()
  await expect(page.getByText(/admin berwenang memverifikasi/i)).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan pesanan diproses/i }).click()
  await expect(page.getByRole('heading', { name: /Pesanan simulasi sedang diproses/i })).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan pesanan selesai/i }).click()
  await expect(page.getByRole('heading', { name: /Simulasi selesai/i })).toBeVisible()

  await page.getByRole('button', { name: 'Reset demo' }).click()
  await expect(page).toHaveURL(/#\/order$/)
  await expect(page.getByText('Belum ada paket dipilih.')).toBeVisible()
  await expect(page.getByRole('button', { name: /^Checkout/ }).first()).toBeDisabled()
})

test('USDT view shows an illustrative, non-binding amount', async ({ page }) => {
  await startOrder(page)
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()

  await page.getByRole('tab', { name: /USDT/i }).click()
  await expect(page.getByRole('img', { name: /Ilustrasi QR USDT untuk demo/i })).toBeVisible()
  await expect(page.getByText(/≈ 1,13 USDT/)).toBeVisible()
  await expect(page.getByText(/Bukan kurs resmi/i)).toBeVisible()
  await expect(page.getByText(/tidak menyediakan alamat wallet/i)).toBeVisible()
})

test('overpayment holds the simulation and can return to submitted', async ({ page }) => {
  await startOrder(page)
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()

  await page.getByRole('button', { name: 'Simulasikan sudah membayar' }).first().click()
  await page.getByRole('button', { name: /Simulasikan kelebihan bayar/i }).click()
  await expect(page.getByRole('heading', { name: /Simulasi kelebihan bayar/i })).toBeVisible()
  await expect(page.getByText('Kelebihan').first()).toBeVisible()

  await page.getByRole('button', { name: /Simulasikan pembayaran ulang/i }).first().click()
  await expect(
    page.getByRole('heading', { name: /Pembayaran simulasi dikirim/i }),
  ).toBeVisible()
})

test('deep links and refreshes remain safe without stored orders', async ({ page }) => {
  await page.goto('/#/checkout')
  await expect(page.getByRole('heading', { name: /Pilih paket dulu/i })).toBeVisible()

  await page.goto('/#/payment')
  await expect(page.getByRole('heading', { name: /Belum ada pesanan untuk dibayar/i })).toBeVisible()

  await page.goto('/#/halaman-tidak-ada')
  await expect(page.getByRole('heading', { name: /Nyasar, ya/i })).toBeVisible()

  await page.goto('/#/order')
  await page.getByText('Paket Solo', { exact: true }).click()
  await expect(page.getByText('Dipilih')).toBeVisible()
  await page.reload()
  await expect(page.getByText('Belum ada paket dipilih.')).toBeVisible()
})
