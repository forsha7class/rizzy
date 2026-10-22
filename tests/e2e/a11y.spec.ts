import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function expectNoSeriousViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  const serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  )

  expect(
    serious,
    serious.map((violation) => `${violation.id}: ${violation.help}`).join('\n'),
  ).toEqual([])
}

test('landing page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(400)
  await expectNoSeriousViolations(page)
})

test('order, checkout, and payment have no serious accessibility violations', async ({ page }) => {
  await page.goto('/#/order')
  await page.getByText('Paket Duo', { exact: true }).click()
  await expectNoSeriousViolations(page)

  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await expect(page.getByRole('heading', { name: /Ringkasan pesanan/i })).toBeVisible()
  await expectNoSeriousViolations(page)

  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()
  await expect(page.getByRole('heading', { name: /Pembayaran demo/i })).toBeVisible()
  await expectNoSeriousViolations(page)

  await page.getByRole('button', { name: 'Simulasikan sudah membayar' }).first().click()
  await expect(
    page.getByRole('heading', { name: /Pembayaran simulasi dikirim/i }),
  ).toBeVisible()
  await expectNoSeriousViolations(page)

  await page.getByRole('button', { name: /Simulasikan kurang bayar/i }).click()
  await expect(page.getByRole('heading', { name: /Simulasi kurang bayar/i })).toBeVisible()
  await expectNoSeriousViolations(page)

  await page.getByRole('button', { name: /Simulasikan pembayaran ulang/i }).first().click()
  await page.getByRole('button', { name: /Simulasikan kelebihan bayar/i }).click()
  await expect(page.getByRole('heading', { name: /Simulasi kelebihan bayar/i })).toBeVisible()
  await expectNoSeriousViolations(page)
})
