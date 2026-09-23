'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

const columns = [
  {
    title: 'Tienda',
    links: ['Novedades', 'Best Sellers', 'Sudaderas', 'Chaquetas', 'Outlet'],
  },
  {
    title: 'Ayuda',
    links: ['Envíos y entregas', 'Devoluciones', 'Guía de tallas', 'Contacto', 'FAQ'],
  },
  {
    title: 'Casa',
    links: ['Historia', 'Sostenibilidad', 'Tiendas', 'Trabaja con nosotros', 'Prensa'],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 2600)
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="mx-auto max-w-[1600px] border-b border-background/10 px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="font-display text-4xl leading-none tracking-tight md:text-6xl">
              Únete al círculo
            </h2>
            <p className="mt-4 max-w-md text-sm text-background/60">
              Acceso anticipado a drops, ventas privadas y un 10% en tu primer
              pedido. Sin spam, solo prendas.
            </p>
          </div>
          <form onSubmit={submit} className="w-full">
            <div className="flex items-center gap-2 border-b border-background/30 pb-3 focus-within:border-accent">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-transparent text-lg outline-none placeholder:text-background/40"
              />
              <button
                type="submit"
                data-cursor
                aria-label="Suscribirse"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
              >
                {sent ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
              </button>
            </div>
            {sent && (
              <p className="mt-3 text-sm text-accent">¡Bienvenido al círculo! Revisa tu correo.</p>
            )}
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="font-display text-3xl tracking-tight">
              VÉRTICE<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-background/50">
              Streetwear premium contemporáneo. Diseñado en estudio, fabricado en
              Europa para durar.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-background/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-cursor
                      className="text-sm text-background/80 transition-colors hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VÉRTICE Studio. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background">Privacidad</a>
            <a href="#" className="hover:text-background">Términos</a>
            <a href="#" className="hover:text-background">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
