'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, Plus, Star } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const [size, setSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const wished = isWished(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAdd = () => {
    addToCart(product.id, size ?? 'M')
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-background">
              Nuevo
            </span>
          )}
          {discount > 0 && (
            <span className="bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          data-cursor
          aria-label={wished ? 'Quitar de deseos' : 'Añadir a deseos'}
          className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-md transition-transform hover:scale-110"
        >
          <Heart
            className={cn(
              'size-4 transition-colors',
              wished ? 'fill-accent text-accent' : 'text-foreground',
            )}
          />
        </button>

        {/* Images */}
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={product.hoverImage || '/placeholder.svg'}
          alt={`${product.name} en modelo`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
        />
        <span className="sheen z-10" />

        {/* Quick add panel */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="rounded-md bg-background/90 p-2 shadow-lg backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    data-cursor
                    onClick={() => setSize(s)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition-colors',
                      size === s
                        ? 'bg-foreground text-background'
                        : 'bg-secondary text-foreground hover:bg-foreground/10',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button
              data-cursor
              data-cursor-label="Añadir"
              onClick={handleAdd}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded py-2.5 text-xs font-bold uppercase tracking-widest transition-colors',
                added
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-foreground text-background hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-4" /> Añadido
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="size-4" /> Añadir {size ? `· ${size}` : ''}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-0.5 truncate text-sm font-semibold">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Star className="size-3 fill-accent text-accent" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>

      {/* Colors */}
      <div className="mt-2 flex items-center gap-1.5">
        {product.colors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActiveColor(i)}
            aria-label={c.name}
            data-cursor
            className={cn(
              'size-4 rounded-full ring-1 ring-border transition-transform hover:scale-110',
              activeColor === i && 'ring-2 ring-offset-2 ring-offset-background ring-foreground',
            )}
            style={{ backgroundColor: c.value }}
          />
        ))}
      </div>
    </div>
  )
}
