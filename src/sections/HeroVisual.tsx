import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'
import { landingContent } from '../content/landing'
import { ArrowIcon } from '../components/ui/Button'

function RotatingSeal() {
  const pathId = useId().replace(/:/g, '')
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className="absolute -top-6 -left-4 z-10 size-28 rounded-full border border-ink/10 bg-cream shadow-[0_16px_40px_-24px_rgba(2,31,79,0.4)] sm:-top-8 sm:-left-8 sm:size-36"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={reduceMotion ? undefined : { repeat: Infinity, duration: 44, ease: 'linear' }}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        <defs>
          <path id={pathId} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fill="#021F4F" fontSize="12.5" fontWeight="700" letterSpacing="3.1">
          <textPath href={`#${pathId}`}>{landingContent.hero.seal}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-10 place-items-center rounded-full bg-electric text-ink sm:size-12">
          <ArrowIcon className="size-4 -rotate-45" />
        </span>
      </span>
    </motion.div>
  )
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px]">
      <div className="absolute inset-0 overflow-hidden rounded-[36px] border border-ink/12 bg-ice">
        <div
          className="absolute -top-24 -right-20 size-72 rounded-full bg-electric/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 -left-16 size-72 rounded-full bg-royal/10 blur-2xl"
          aria-hidden="true"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 500 620"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full opacity-70"
        >
          <path
            d="M-20 500C90 430 180 560 290 505C390 455 440 500 520 455V640H-20V500Z"
            fill="#D7E6F6"
          />
          <path
            d="M-20 545C95 475 185 600 300 545C400 498 450 535 520 500V640H-20V545Z"
            fill="#059BF7"
            fillOpacity="0.18"
          />
          <path
            d="M-20 590C100 525 200 645 310 592C408 546 458 575 520 550V640H-20V590Z"
            fill="#0350B1"
            fillOpacity="0.12"
          />
        </svg>

        <div className="absolute inset-5 rounded-[28px] border border-royal/15 sm:inset-6" />

        <div className="absolute inset-x-7 top-7 flex items-start justify-end gap-4 sm:inset-x-9 sm:top-9">
          <p className="font-display text-xs font-bold tracking-[0.12em] text-ink/70">
            KONSEP PRODUK <span className="mx-1 text-ink/65">·</span> 01{' '}
            <span className="text-ink/65">/</span> 02
          </p>
        </div>

        <div className="absolute inset-x-7 top-[21%] sm:inset-x-9">
          <p className="font-display text-[clamp(2.7rem,6.4vw,4.6rem)] leading-[0.82] font-semibold tracking-[-0.055em] text-ink">
            CHICKEN
            <br />
            KATSU
          </p>
          <div className="my-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-ink/20" aria-hidden="true" />
            <span className="font-display text-lg font-bold text-royal" aria-hidden="true">
              ×
            </span>
            <span className="h-px flex-1 bg-ink/20" aria-hidden="true" />
          </div>
          <p className="font-display text-[clamp(2.7rem,6.4vw,4.6rem)] leading-[0.82] font-semibold tracking-[-0.055em] text-royal">
            ES
            <br />
            KELAPA
          </p>
        </div>

        <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink p-4 text-cream sm:inset-x-6 sm:bottom-6 sm:p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="eyebrow text-electric">01 / Hangat</p>
              <p className="mt-1 font-display text-lg leading-none font-semibold sm:text-xl">Renyah</p>
            </div>
            <div className="border-l border-cream/15 pl-4">
              <p className="eyebrow text-electric">02 / Dingin</p>
              <p className="mt-1 font-display text-lg leading-none font-semibold sm:text-xl">Segar</p>
            </div>
          </div>
        </div>
      </div>

      <RotatingSeal />
    </div>
  )
}
