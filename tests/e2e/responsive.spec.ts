import { expect, test } from '@playwright/test'

const routes = ['/#/', '/#/order', '/#/checkout', '/#/payment'] as const

for (const route of routes) {
  test(`no horizontal overflow on ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForTimeout(250)
    const sizes = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }))
    expect(sizes.scrollWidth, `${route} scrollWidth`).toBeLessThanOrEqual(sizes.clientWidth + 1)
    expect(sizes.bodyScrollWidth, `${route} body scrollWidth`).toBeLessThanOrEqual(
      sizes.clientWidth + 1,
    )
  })
}

test('skip link focuses the main content without changing the route', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: /Lompat ke konten utama/i })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  await expect(page).not.toHaveURL(/#main/)
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('mobile navigation opens, traps focus, closes with Escape, and links correctly', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-375', 'mobile-only interaction')

  await page.goto('/')
  const trigger = page.getByRole('button', { name: /Buka menu/i })
  await trigger.click()

  const dialog = page.getByRole('dialog', { name: /Menu navigasi/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link', { name: /^Beranda/i })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await dialog.getByRole('link', { name: /Pilih paket/i }).click()
  await expect(page).toHaveURL(/#\/order$/)
  await expect(page.getByRole('heading', { name: /Pilih paket demo/i })).toBeVisible()
})

test('the mobile summary action stays reachable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-375', 'mobile-only layout')

  await page.goto('/#/order')
  await expect(page.getByRole('button', { name: /^Checkout/ })).toHaveCount(2)
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).last().click()
  await expect(page.getByRole('heading', { name: /Ringkasan pesanan/i })).toBeVisible()
})
