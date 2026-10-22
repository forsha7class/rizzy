/**
 * Verify the production build when served from a GitHub Pages project subpath
 * (for example https://user.github.io/rizzy/).
 *
 * Usage: npm run verify:pages
 */
import { createServer } from 'node:http'
import { readFile, stat, cp, mkdtemp, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { chromium } from '@playwright/test'

const PORT = 4180
const SOURCE = resolve('dist')
const ROOT = await mkdtemp(join(tmpdir(), 'rizzy-pages-'))
const PROJECT = join(ROOT, 'rizzy')

if (!existsSync(SOURCE)) {
  console.error('dist/ is missing. Run `npm run build` first.')
  process.exit(1)
}

await cp(SOURCE, PROJECT, { recursive: true })

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://127.0.0.1:${PORT}`)
    let filePath = normalize(join(ROOT, decodeURIComponent(url.pathname)))

    if (!filePath.startsWith(ROOT)) {
      response.writeHead(403).end('Forbidden')
      return
    }

    const info = await stat(filePath).catch(() => null)
    if (info?.isDirectory()) filePath = join(filePath, 'index.html')

    const body = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': mime[extname(filePath)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

await new Promise((resolveServer) => server.listen(PORT, '127.0.0.1', resolveServer))

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const failures = []
const badResponses = []

page.on('response', (response) => {
  if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
})
page.on('pageerror', (error) => failures.push(`page error: ${error.message}`))

try {
  await page.goto(`http://127.0.0.1:${PORT}/rizzy/`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { level: 1 }).waitFor()

  const logoLoaded = await page.getByRole('link', { name: 'RIZZY — beranda' }).isVisible()
  if (!logoLoaded) failures.push('header logo did not render')

  await page.getByRole('link', { name: /Buy Now/i }).first().click()
  await page.getByRole('heading', { name: /Pilih paket demo/i }).waitFor()
  await page.getByText('Paket Solo', { exact: true }).click()
  await page.getByRole('button', { name: /^Checkout/ }).first().click()
  await page.getByRole('button', { name: /Lanjut ke pembayaran/i }).click()
  await page.getByRole('heading', { name: /Pembayaran demo/i }).waitFor()

  await page.reload()
  const guard = await page.getByRole('heading', { name: /Belum ada pesanan untuk dibayar/i }).isVisible()
  if (!guard) failures.push('deep-link guard did not render after reload')

  await page.goto(`http://127.0.0.1:${PORT}/rizzy/#/order`, { waitUntil: 'networkidle' })
  const directLink = await page.getByRole('heading', { name: /Pilih paket demo/i }).isVisible()
  if (!directLink) failures.push('direct subpath hash link did not render')

  const html = await readFile(join(PROJECT, 'index.html'), 'utf8')
  if (/src="\/assets|href="\/assets/.test(html)) {
    failures.push('index.html contains absolute /assets URLs')
  }
  if (!html.includes('assets/brand/logo-wordmark.webp')) {
    failures.push('preload path is missing from index.html')
  }

  if (badResponses.length) failures.push(`HTTP errors: ${badResponses.join(', ')}`)
  if (failures.length) {
    console.error('SUBPath verification FAILED')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exitCode = 1
  } else {
    console.log('Subpath verification PASSED')
    console.log(`- served from /rizzy/ at http://127.0.0.1:${PORT}/rizzy/`)
    console.log('- landing, order, checkout, and payment rendered')
    console.log('- reload returned the guarded payment state (no stored order)')
    console.log('- no 4xx/5xx asset responses and no absolute /assets URLs')
  }
} finally {
  await browser.close()
  await new Promise((resolveServer) => server.close(resolveServer))
  await rm(ROOT, { recursive: true, force: true })
}
