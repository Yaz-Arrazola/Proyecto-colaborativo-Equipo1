'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { categories, products, type Product } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type SortKey = 'destacado' | 'precio-asc' | 'precio-desc' | 'valorados'

const sorts: { key: SortKey; label: string }[] = [
  { key: 'destacado', label: 'Destacados' },
  { key: 'precio-asc', label: 'Precio ↑' },
  { key: 'precio-desc', label: 'Precio ↓' },
  { key: 'valorados', label: 'Mejor valorados' },
]

const allCategories = categories

export function Catalog() {
  const [category, setCategory] = useState('Todo')
  const [sort, setSort] = useState<SortKey>('destacado')
  const [onlySale, setOnlySale] = useState(false)

  const filtered = useMemo(() => {
    let list: Product[] = [...products]
    if (category !== 'Todo') list = list.filter((p) => p.category === category)
    if (onlySale) list = list.filter((p) => p.onSale)
    switch (sort) {
      case 'precio-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'precio-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'valorados':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller))
    }
    return list
  }, [category, sort, onlySale])

  return (
    <section id="catalogo" className="mx-auto max-w-[1600px] scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mb-8">
        <p className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-8 bg-accent" />
          Explora
        </p>
        <h2 className="font-display text-4xl leading-none tracking-tight md:text-6xl">
          La colección completa
        </h2>
      </div>

      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-4 mb-10 border-y border-border bg-background/85 px-4 py-3 backdrop-blur-xl md:top-20 md:mx-0 md:rounded-xl md:border md:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                data-cursor
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors',
                  category === cat
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground hover:bg-foreground/10',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-cursor
              onClick={() => setOnlySale((v) => !v)}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors',
                onlySale
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-foreground hover:bg-foreground/10',
              )}
            >
              En oferta
            </button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="size-4" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold uppercase tracking-wide text-foreground outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          No hay productos que coincidan con tu filtro.
        </p>
      )}
    </section>
  )
}
