import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Ticker } from '@/components/ticker'
import { Services } from '@/components/services'
import { Coverage } from '@/components/coverage'
import { Fleet } from '@/components/fleet'
import { Process } from '@/components/process'
import { Advantages } from '@/components/advantages'
import { Calculator } from '@/components/calculator'
import { Cta } from '@/components/cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Coverage />
        <Fleet />
        <Process />
        <Advantages />
        <Calculator />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
