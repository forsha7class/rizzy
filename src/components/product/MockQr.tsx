import { useMemo } from 'react'
import { cn } from '../../lib/cn'

const SIZE = 29
const CENTER_BOX = 9

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function isFinderZone(x: number, y: number): boolean {
  const nearLeft = x < 8
  const nearRight = x >= SIZE - 8
  const nearTop = y < 8
  const nearBottom = y >= SIZE - 8
  return (nearTop && (nearLeft || nearRight)) || (nearBottom && nearLeft)
}

function isCenterZone(x: number, y: number): boolean {
  const start = Math.floor((SIZE - CENTER_BOX) / 2)
  return x >= start && x < start + CENTER_BOX && y >= start && y < start + CENTER_BOX
}

function buildMatrix(seed: number): boolean[][] {
  const random = mulberry32(seed)
  const matrix = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => false),
  )

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (isFinderZone(x, y) || isCenterZone(x, y)) continue
      if (y === 6 || x === 6) {
        matrix[y][x] = (x + y) % 2 === 0
        continue
      }
      matrix[y][x] = random() > 0.52
    }
  }

  const drawFinder = (originX: number, originY: number) => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
        matrix[originY + y][originX + x] = edge || core
      }
    }
  }

  drawFinder(0, 0)
  drawFinder(SIZE - 7, 0)
  drawFinder(0, SIZE - 7)

  return matrix
}

/**
 * A deliberately non-functional QR illustration. It encodes no payload and is
 * generated from a fixed seed so the design is stable between renders.
 */
export function MockQr({
  method,
  seed,
  className,
}: {
  method: 'QRIS' | 'USDT'
  seed: number
  className?: string
}) {
  const matrix = useMemo(() => buildMatrix(seed), [seed])

  return (
    <div
      role="img"
      aria-label={`Ilustrasi QR ${method} untuk demo. Tidak berisi data pembayaran dan tidak dapat dipindai.`}
      className={cn('relative mx-auto w-full max-w-[260px]', className)}
    >
      <div className="relative rounded-2xl border border-ink/15 bg-white p-3 shadow-[0_18px_40px_-28px_rgba(2,31,79,0.45)]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
          focusable="false"
          className="block h-auto w-full"
          shapeRendering="crispEdges"
        >
          <rect width={SIZE} height={SIZE} fill="#ffffff" />
          {matrix.map((row, y) =>
            row.map((filled, x) =>
              filled ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#021F4F" /> : null,
            ),
          )}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg border-2 border-ink bg-cream px-3 py-2 text-center shadow-sm">
            <span className="block font-display text-sm leading-none font-extrabold tracking-[0.14em] text-ink">
              DEMO
            </span>
            <span className="mt-1 block text-[0.5rem] leading-none font-bold tracking-[0.12em] text-ink/70">
              NOT SCANNABLE
            </span>
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 rounded bg-ink px-2 py-1 text-center">
          <span className="text-[0.5rem] leading-none font-bold tracking-[0.16em] text-cream">
            TIDAK DAPAT DIPINDAI
          </span>
        </div>
      </div>

      <p className="mt-2 text-center text-[0.625rem] font-semibold tracking-[0.12em] text-ink/70 uppercase">
        QR ilustrasi · bukan kode pembayaran
      </p>
    </div>
  )
}
