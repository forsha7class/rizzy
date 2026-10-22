import { landingContent } from '../content/landing'

const items = [...landingContent.marquee, ...landingContent.marquee]

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink/15 bg-ink py-3 text-cream">
      <p className="sr-only">
        Chicken Katsu. Es Kelapa. Praktis. Segar. Pas di Kantong.
      </p>
      <div className="marquee-track flex w-max items-center" aria-hidden="true">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center">
            {items.map((item, index) => (
              <span key={`${group}-${index}`} className="flex items-center">
                <span className="px-6 font-display text-sm font-semibold tracking-[0.16em] uppercase sm:px-8">
                  {item}
                </span>
                <span className="size-1.5 rounded-full bg-electric" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
