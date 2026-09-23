import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { TrustStrip } from "@/components/trust-strip"
import { ValueProps } from "@/components/value-props"
import { CourierSpotlight } from "@/components/courier-spotlight"
import { HowItWorks } from "@/components/how-it-works"
import { Vacancies } from "@/components/vacancies"
import { Stats } from "@/components/stats"
import { ForBusiness } from "@/components/for-business"
import { ApplyCta } from "@/components/apply-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <TrustStrip />
      <ValueProps />
      <CourierSpotlight />
      <HowItWorks />
      <Vacancies />
      <Stats />
      <ForBusiness />
      <ApplyCta />
      <SiteFooter />
    </main>
  )
}
