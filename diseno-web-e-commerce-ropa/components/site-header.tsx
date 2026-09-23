'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Novedades', href: '/#novedades' },
  { label: 'Best Sellers', href: '/#best-sellers' },
  { label: 'Colección', href: '/#catalogo' },
  { label: 'Outlet', href: '/#flash-sale' },
]

export function SiteHeader() {
  const { cartCount, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <div className="flex items-center gap-8">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <Link
            href="/"
            data-cursor
            className="font-display text-2xl leading-none tracking-tight md:text-[1.75rem]"
          >
            VÉRTICE
            <span className="text-accent">.</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor
              className="group relative text-sm font-medium uppercase tracking-wide text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            data-cursor
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Buscar"
          >
            <Search className="size-[18px]" />
          </button>
          <Link
            href="/perfil"
            data-cursor
            className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Lista de deseos"
          >
            <Heart className="size-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 size-2 rounded-full bg-accent" />
            )}
          </Link>
          <Link
            href="/perfil"
            data-cursor
            className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary md:flex"
            aria-label="Mi perfil"
          >
            <User className="size-[18px]" />
          </Link>
          <button
            data-cursor
            className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Carrito"
          >
            <ShoppingBag className="size-[18px]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-4 md:px-8">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Buscar prendas, colecciones…"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda">
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="flex h-full w-[82%] max-w-sm flex-col bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">
                  VÉRTICE<span className="text-accent">.</span>
                </span>
                <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
                  <X className="size-6" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-border py-4 font-display text-2xl tracking-tight"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/perfil"
                onClick={() => setMenuOpen(false)}
                className="mt-auto flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-background"
              >
                <User className="size-5" />
                <span className="font-medium">Mi perfil</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
