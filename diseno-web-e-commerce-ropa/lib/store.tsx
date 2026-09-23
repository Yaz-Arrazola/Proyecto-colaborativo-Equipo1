'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type CartLine = {
  id: string
  size: string
  qty: number
}

type StoreContextValue = {
  cart: CartLine[]
  cartCount: number
  wishlist: string[]
  addToCart: (id: string, size?: string) => void
  toggleWishlist: (id: string) => void
  isWished: (id: string) => boolean
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>(['abrigo-camel', 'bomber-grafito'])

  const addToCart = useCallback((id: string, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === id && l.size === size)
      if (existing) {
        return prev.map((l) =>
          l.id === id && l.size === size ? { ...l, qty: l.qty + 1 } : l,
        )
      }
      return [...prev, { id, size, qty: 1 }]
    })
  }, [])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((sum, l) => sum + l.qty, 0)
    return {
      cart,
      cartCount,
      wishlist,
      addToCart,
      toggleWishlist,
      isWished: (id: string) => wishlist.includes(id),
    }
  }, [cart, wishlist, addToCart, toggleWishlist])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
