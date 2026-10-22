import { asset } from '../lib/assets'
import { landingContent } from '../content/landing'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function Story() {
  const { story } = landingContent

  return (
    <section id="story" className="scroll-mt-24 bg-paper py-20 sm:py-28" aria-labelledby="story-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index={story.index}
              eyebrow={story.eyebrow}
              title={<span id="story-title">{story.title}</span>}
            />
            <Reveal delay={0.1} className="mt-8 hidden lg:block">
              <div className="relative rounded-[6px] border border-royal/20 bg-ice p-6">
                <span
                  className="absolute top-0 left-6 h-8 w-1 -translate-y-4 bg-electric"
                  aria-hidden="true"
                />
                <p className="font-display text-xl leading-snug font-medium tracking-[-0.02em] text-ink/85">
                  “{story.quote}”
                </p>
                <p className="mt-4 text-xs font-bold tracking-[0.14em] text-royal uppercase">
                  Prinsip konsep RIZZY
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-5">
              {story.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06}>
                  <p
                    className={
                      index === 0
                        ? 'font-display text-2xl leading-snug font-medium tracking-[-0.02em] text-ink sm:text-[1.75rem]'
                        : 'text-base leading-relaxed text-ink/70 sm:text-lg'
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.14} className="mt-8 lg:hidden">
              <blockquote className="border-l-2 border-electric pl-4">
                <p className="font-display text-lg leading-snug font-medium">“{story.quote}”</p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <figure className="mt-16 sm:mt-20">
            <div className="overflow-hidden rounded-[6px] border border-ink/15 bg-cream p-2">
              <div className="relative overflow-hidden rounded-[2px]">
                <img
                  src={asset('assets/team/team.jpg')}
                  alt={story.teamAlt}
                  width={1800}
                  height={1192}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-[center_32%] sm:aspect-[16/8] lg:aspect-[21/8]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="eyebrow absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-[0.6rem] text-ink backdrop-blur">
                  Di balik RIZZY
                </span>
              </div>
            </div>
            <figcaption className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                {story.teamCaption}
              </p>
              <p className="text-xs text-ink/70">{story.teamSubcaption}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
