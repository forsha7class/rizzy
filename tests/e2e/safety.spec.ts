import { expect, test } from '@playwright/test'

const externalOrigins = new Set<string>()

test.beforeEach(async ({ page }) => {
  externalOrigins.clear()
  page.on('request', (request) => {
    const url = request.url()
    if (!url.startsWith('http://127.0.0.1:4173')) {
      try {
        externalOrigins.add(new URL(url).origin)
      } catch {
        externalOrigins.add(url)
      }
    }
  })
})

test('the demo makes no external requests and stores nothing', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Buy Now/i }).first().click()
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()
  await page.getByRole('button', { name: 'Simulasikan sudah membayar' }).first().click()
  await page.waitForTimeout(300)

  expect([...externalOrigins]).toEqual([])

  const storage = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
    cookies: document.cookie,
  }))
  expect(storage.local).toBe(0)
  expect(storage.session).toBe(0)
  expect(storage.cookies).toBe('')
})

test('QR graphics are explicitly non-functional', async ({ page }) => {
  await page.goto('/#/order')
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()

  const qr = page.getByRole('img', { name: /Ilustrasi QR QRIS untuk demo/i })
  await expect(qr).toBeVisible()
  await expect(qr).toHaveAttribute('alt', /tidak dapat dipindai/i)
  await expect(page.getByText(/QR ilustrasi · tidak dapat dipindai/i)).toBeVisible()

  const body = await page.locator('body').innerText()
  expect(body).toContain('DEMO ONLY')
  expect(body).toContain('Tidak menerima pesanan atau pembayaran sungguhan')
  expect(body).not.toMatch(/0x[a-f0-9]{20,}/i)
  expect(body).not.toMatch(/bitcoin:|ethereum:|qris:\/\//i)
})
