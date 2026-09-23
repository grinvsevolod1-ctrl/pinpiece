import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Ticker } from '@/components/ticker'
import { Clients } from '@/components/clients'
import { Services } from '@/components/services'
import { Coverage } from '@/components/coverage'
import { Directions } from '@/components/directions'
import { Fleet } from '@/components/fleet'
import { Industries } from '@/components/industries'
import { Process } from '@/components/process'
import { Advantages } from '@/components/advantages'
import { Guarantees } from '@/components/guarantees'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { Calculator } from '@/components/calculator'
import { Contacts } from '@/components/contacts'
import { Cta } from '@/components/cta'
import { SiteFooter } from '@/components/site-footer'
import { StructuredData } from '@/components/structured-data'

export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Clients />
        <Services />
        <Coverage />
        <Directions />
        <Fleet />
        <Industries />
        <Process />
        <Advantages />
        <Guarantees />
        <Testimonials />
        <Faq />
        <Calculator />
        <Contacts />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
