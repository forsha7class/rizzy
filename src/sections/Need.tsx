import { landingContent } from '../content/landing'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function Need() {
  const { need } = landingContent

  return (
    <section
      id="need"
      className="scroll-mt-24 border-y border-ink/10 bg-ice/55 py-20 sm:py-28"
      aria-labelledby="need-title"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              index={need.index}
              eyebrow={need.eyebrow}
              title={<span id="need-title">{need.title}</span>}
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70 lg:col-span-4 lg:justify-self-end">
            {need.intro}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-16">
          {need.items.map((item, index) => (
            <Reveal
              key={item.index}
              as="li"
              delay={index * 0.07}
              className="group flex h-full flex-col rounded-[20px] border border-ink/10 bg-cream p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-royal/30 sm:p-7"
            >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold tabular-nums text-royal">
                    {item.index}
                  </span>
                  <span className="eyebrow rounded-full border border-ink/12 px-2.5 py-1 text-[0.6rem] text-ink/70">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
                <span
                  className="mt-auto block h-px w-full bg-ink/10 pt-6"
                  aria-hidden="true"
                />
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-ink/70">
          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          {need.note}
        </p>
      </div>
    </section>
  )
}
