import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { NewArrivals } from '@/components/new-arrivals'
import { BestSellers } from '@/components/best-sellers'
import { Campaign } from '@/components/campaign'
import { FlashSale } from '@/components/flash-sale'
import { Catalog } from '@/components/catalog'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <NewArrivals />
        <BestSellers />
        <Campaign />
        <FlashSale />
        <Catalog />
      </main>
      <SiteFooter />
    </>
  )
}
