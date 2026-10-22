import { landingContent } from '../content/landing'
import { siteConfig } from '../config/site'
import { ArrowIcon, buttonStyles } from '../components/ui/Button'
import { Wordmark } from '../components/ui/Logo'
import { scrollToSection } from '../lib/hash-router'

export function ClosingCta() {
  const { closing } = landingContent

  return (
    <section
      id="start"
      className="relative scroll-mt-24 overflow-hidden bg-royal py-20 text-cream sm:py-28"
      aria-labelledby="closing-title"
    >
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] size-[480px] rounded-full border-[60px] border-electric/20"
        aria-hidden="true"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-25 sm:h-52"
      >
        <path d="M0 220C250 140 400 290 700 220C980 156 1180 230 1440 160V320H0V220Z" fill="#059BF7" />
      </svg>

      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-cream/85">
            <span className="font-display text-sm font-semibold tabular-nums">{closing.index}</span>
            <span className="h-px w-8 bg-cream/30" aria-hidden="true" />
            <span className="eyebrow">{closing.eyebrow}</span>
          </div>
          <h2
            id="closing-title"
            className="mt-5 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            {closing.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {closing.description}
          </p>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <div className="w-full max-w-sm rounded-[24px] border border-cream/20 bg-ink-deep/35 p-5 backdrop-blur-sm sm:p-6">
            <div className="rounded-xl bg-cream p-4">
              <Wordmark className="w-[190px]" />
            </div>
            <a
              href="#/order"
              className={`${buttonStyles({ variant: 'light', size: 'lg' })} mt-5 w-full`}
            >
              {closing.cta} <ArrowIcon />
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('story')}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-cream/75 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              {closing.secondary}
            </button>
            <p className="mt-4 border-t border-cream/15 pt-4 text-[0.6875rem] leading-relaxed text-cream/65">
              {siteConfig.demoNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
