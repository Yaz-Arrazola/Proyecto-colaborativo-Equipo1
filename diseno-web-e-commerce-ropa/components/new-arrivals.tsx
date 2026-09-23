'use client'

import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function NewArrivals() {
  const items = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <section id="novedades" className="mx-auto max-w-[1600px] scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-8 bg-accent" />
            Recién llegado
          </p>
          <h2 className="font-display text-4xl leading-none tracking-tight md:text-6xl">
            Novedades
          </h2>
        </div>
        <a
          href="#catalogo"
          data-cursor
          className="hidden shrink-0 text-sm font-semibold uppercase tracking-wide underline-offset-4 hover:underline md:block"
        >
          Ver todo
        </a>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {items.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={product} priority={i < 2} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
