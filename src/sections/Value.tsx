import { landingContent } from '../content/landing'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function Value() {
  const { value } = landingContent

  return (
    <section id="value" className="scroll-mt-24 bg-paper py-20 sm:py-28" aria-labelledby="value-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              index={value.index}
              eyebrow={value.eyebrow}
              title={<span id="value-title">{value.title}</span>}
              intro={value.intro}
            />
          </div>
          <div className="hidden justify-end lg:col-span-5 lg:flex">
            <span
              className="font-display text-[7rem] leading-none font-bold tracking-[-0.07em] text-ink/70"
              aria-hidden="true"
            >
              RIZZY
            </span>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-ink/12 bg-ink/12 sm:mt-16 md:grid-cols-3">
          {value.items.map((item, index) => (
            <Reveal
              key={item.index}
              as="li"
              delay={index * 0.07}
              className="group flex h-full flex-col bg-cream p-6 transition-colors duration-300 hover:bg-ice/70 sm:p-8"
            >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold tabular-nums text-royal">
                    {item.index}
                  </span>
                  <span
                    className="h-px w-10 bg-ink/15 transition-all duration-300 group-hover:w-16 group-hover:bg-electric"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-12 font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-ink/70">{value.footnote}</p>
      </div>
    </section>
  )
}
