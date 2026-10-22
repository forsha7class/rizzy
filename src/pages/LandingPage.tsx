import { Hero } from '../sections/Hero'
import { Marquee } from '../sections/Marquee'
import { Story } from '../sections/Story'
import { Need } from '../sections/Need'
import { Showcase } from '../sections/Showcase'
import { Value } from '../sections/Value'
import { ClosingCta } from '../sections/ClosingCta'

export function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Story />
      <Need />
      <Showcase />
      <Value />
      <ClosingCta />
    </>
  )
}
