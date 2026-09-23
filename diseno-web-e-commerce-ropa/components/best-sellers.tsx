'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function BestSellers() {
  const scroller = useRef<HTMLDivElement>(null)
  const items = products.filter((p) => p.isBestSeller)

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const amount = el.clientWidth * 0.8 * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section
      id="best-sellers"
      className="scroll-mt-24 border-y border-border bg-card py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-accent" />
              Los favoritos
            </p>
            <h2 className="font-display text-4xl leading-none tracking-tight md:text-6xl">
              Best Sellers
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll(-1)}
              data-cursor
              aria-label="Anterior"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              data-cursor
              aria-label="Siguiente"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[24%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
