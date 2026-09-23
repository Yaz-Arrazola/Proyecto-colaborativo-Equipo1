'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

const line: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-background pt-16 md:pt-20">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pb-10 pt-8 md:grid-cols-12 md:gap-4 md:px-8 md:pb-16 md:pt-14">
        {/* Left copy */}
        <div className="flex flex-col justify-between md:col-span-5">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="h-px w-8 bg-accent" />
              Colección Otoño / Invierno 26
            </motion.p>
            <h1 className="font-display text-[15vw] leading-[0.82] tracking-tight md:text-[7.5vw]">
              {['FORMA', 'SOBRE', 'FUNCIÓN'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="block"
                  >
                    {i === 2 ? (
                      <span>
                        FUN<span className="text-accent">CIÓN</span>
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 max-w-sm md:mt-0"
          >
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Prendas de peso pesado, cortes contemporáneos y ediciones limitadas.
              Diseñado en estudio, fabricado para durar toda una década.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/#catalogo"
                data-cursor
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Comprar colección
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/#flash-sale"
                data-cursor
                className="inline-flex items-center rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-foreground"
              >
                Ver Outlet
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7"
        >
          <div className="group relative h-[52vh] overflow-hidden rounded-xl md:h-[76vh]">
            <Image
              src="/products/hero.png"
              alt="Modelo con prendas de la colección VÉRTICE"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="rounded-lg bg-background/80 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Look destacado
                </p>
                <p className="text-sm font-semibold">Cápsula Monolito · 24 piezas</p>
              </div>
              <span className="hidden rounded-full bg-accent px-4 py-3 text-sm font-bold text-accent-foreground sm:block">
                Edición limitada
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
