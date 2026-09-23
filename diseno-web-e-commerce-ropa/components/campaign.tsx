'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Campaign() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/products/campaign.png"
          alt="Campaña editorial de la cápsula Monolito"
          width={1600}
          height={800}
          className="h-[60vh] w-full object-cover md:h-[70vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-background"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-background/70">
              Editorial 01
            </p>
            <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
              Cápsula
              <br />
              Monolito
            </h2>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-background/80">
              Una serie monocroma de siluetas estructuradas. Materiales nobles,
              paleta reducida y una obsesión por el detalle que no verás hasta que
              la tienes puesta.
            </p>
            <Link
              href="/#catalogo"
              data-cursor
              data-cursor-label="Ver"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Descubrir la cápsula
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
