import { ArrowIcon, buttonStyles } from '../components/ui/Button'
import { Wordmark } from '../components/ui/Logo'
import { landingContent } from '../content/landing'
import { scrollToSection } from '../lib/hash-router'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-ice/60 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative grid items-center gap-12 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <div className="relative z-10 lg:col-span-6">
          <p className="eyebrow flex items-center gap-2 text-royal">
            <span className="size-1.5 rounded-full bg-electric" aria-hidden="true" />
            {landingContent.hero.eyebrow}
          </p>

          <Wordmark className="mt-7 w-[260px] sm:w-[330px] lg:w-[350px]" priority />

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.85rem,7vw,5.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink"
          >
            <span className="block">{landingContent.hero.headline[0]}</span>
            <span className="block">{landingContent.hero.headline[1]}</span>
            <span className="relative mt-1 inline-block text-royal">
              {landingContent.hero.headline[2]}
              <svg
                aria-hidden="true"
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-electric sm:-bottom-3"
              >
                <path
                  d="M3 9C68 3 164 3 317 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            {landingContent.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#/order" className={buttonStyles({ size: 'lg' })}>
              {landingContent.hero.primaryCta} <ArrowIcon />
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('story')}
              className={buttonStyles({ variant: 'secondary', size: 'lg' })}
            >
              {landingContent.hero.secondaryCta}
            </button>
          </div>

          <p className="mt-6 flex max-w-md items-start gap-2 text-xs leading-relaxed text-ink/70">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            {landingContent.hero.note}
          </p>
        </div>

        <div className="lg:col-span-6 lg:pl-4">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
