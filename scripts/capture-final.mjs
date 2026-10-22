import { chromium } from '@playwright/test'

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4173'
const browser = await chromium.launch({ args: ['--no-sandbox'] })

for (const [name, width, height] of [
  ['desktop', 1440, 900],
  ['tablet', 768, 1024],
  ['mobile', 375, 812],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto(`${baseURL}/#/`, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 420) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 80))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(900)
  await page.screenshot({ path: `/tmp/opencode/final-${name}-landing.png`, fullPage: true })
  await page.screenshot({ path: `/tmp/opencode/final-${name}-hero.png` })

  if (name === 'mobile') {
    await page.getByRole('button', { name: /Buka menu/ }).click()
    await page.waitForTimeout(250)
    await page.screenshot({ path: '/tmp/opencode/final-mobile-menu.png' })
    await page.keyboard.press('Escape')
  }

  await page.goto(`${baseURL}/#/order`)
  await page.getByText('Paket Duo', { exact: true }).click()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `/tmp/opencode/final-${name}-order.png`, fullPage: true })
  await page.screenshot({ path: `/tmp/opencode/final-${name}-order-top.png` })

  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.waitForTimeout(350)
  await page.screenshot({ path: `/tmp/opencode/final-${name}-checkout.png`, fullPage: true })

  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()
  await page.waitForTimeout(450)
  await page.screenshot({ path: `/tmp/opencode/final-${name}-payment.png`, fullPage: true })
  await page.screenshot({ path: `/tmp/opencode/final-${name}-payment-top.png` })

  await page.getByRole('tab', { name: /USDT/i }).click()
  await page.waitForTimeout(200)
  await page.screenshot({ path: `/tmp/opencode/final-${name}-usdt.png`, fullPage: true })

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  if (overflow.scrollWidth > overflow.clientWidth) {
    errors.push(`${name}: horizontal overflow ${overflow.scrollWidth} > ${overflow.clientWidth}`)
  }
  console.log(name, errors.length ? errors : 'ok')
  await context.close()
}

await browser.close()
