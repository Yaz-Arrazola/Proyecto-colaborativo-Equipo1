'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function FlashSale() {
  const items = products.filter((p) => p.onSale).slice(0, 4)
  const [mounted, setMounted] = useState(false)
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    setMounted(true)
    // Target: end of a rolling 12h window anchored to the current day.
    const now = new Date()
    const target = new Date(now)
    target.setHours(23, 59, 59, 999)

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setRemaining({ h, m, s })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units: [string, number][] = [
    ['Horas', remaining.h],
    ['Min', remaining.m],
    ['Seg', remaining.s],
  ]

  return (
    <section id="flash-sale" className="scroll-mt-24 bg-foreground py-16 text-background md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              <Zap className="size-3.5 fill-current" />
              Flash Sale
            </p>
            <h2 className="font-display text-4xl leading-none tracking-tight md:text-6xl">
              Outlet 24 horas
            </h2>
            <p className="mt-3 max-w-md text-sm text-background/60">
              Hasta -40% en piezas seleccionadas. Cuando el reloj llegue a cero, los
              precios vuelven a la normalidad.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {units.map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="flex min-w-[64px] items-center justify-center rounded-lg bg-background/10 px-3 py-3 backdrop-blur-sm">
                  <span className="font-display text-3xl tabular-nums md:text-4xl">
                    {mounted ? pad(value) : '--'}
                  </span>
                </div>
                <span className="mt-1.5 block text-[10px] uppercase tracking-widest text-background/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="[&_h3]:text-background [&_p]:text-background/60 [&_.text-foreground]:text-background"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
