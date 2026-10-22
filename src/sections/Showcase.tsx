import { asset } from '../lib/assets'
import { landingContent } from '../content/landing'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function Showcase() {
  const { showcase } = landingContent

  return (
    <section
      id="product"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-cream sm:py-28"
      aria-labelledby="product-title"
    >
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full border border-cream/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-electric/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            index={showcase.index}
            eyebrow={showcase.eyebrow}
            title={<span id="product-title">{showcase.title}</span>}
            intro={showcase.intro}
            tone="dark"
          />

          <ul className="mt-10 divide-y divide-cream/12 border-y border-cream/12">
            {showcase.items.map((item, index) => (
              <Reveal
                key={item.index}
                as="li"
                delay={index * 0.08}
                className="grid gap-3 py-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                  <span className="font-display text-xs font-bold tabular-nums text-electric">
                    {item.index}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                        {item.name}
                      </h3>
                      <span className="text-xs font-bold tracking-[0.1em] text-cream/60 uppercase">
                        {item.word}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">{item.body}</p>
                  </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-6 max-w-md border-l border-gold/60 pl-4 text-xs leading-relaxed text-cream/60">
            {showcase.honestNote}
          </p>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
          <figure className="mx-auto w-full max-w-[440px] rotate-[1.2deg] rounded-[4px] border border-cream/20 bg-cream p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)] sm:p-3">
            <div className="relative overflow-hidden rounded-[2px] bg-ink/5">
              <img
                src={asset('assets/product/katsu.jpg')}
                srcSet={`${asset('assets/product/katsu-900.jpg')} 900w, ${asset('assets/product/katsu.jpg')} 1400w`}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
                alt={showcase.photoAlt}
                width={1400}
                height={1750}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="eyebrow absolute top-3 left-3 rounded-full bg-cream px-2.5 py-1 text-[0.6rem] text-ink shadow-sm">
                {showcase.photoBadge}
              </span>
              <span className="absolute right-3 bottom-3 rounded-full bg-ink/85 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.1em] text-cream backdrop-blur">
                01 / 01
              </span>
            </div>
            <figcaption className="flex items-start justify-between gap-4 px-2 py-3 text-ink">
              <p className="text-xs leading-snug font-semibold">{showcase.photoCaption}</p>
              <span className="shrink-0 text-[0.625rem] font-bold tracking-[0.12em] text-ink/70 uppercase">
                RIZZY
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
