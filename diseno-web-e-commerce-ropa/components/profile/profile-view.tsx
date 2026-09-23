'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Heart,
  MapPin,
  Package,
  Plus,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Truck,
  UserRound,
} from 'lucide-react'
import { formatPrice, products } from '@/lib/products'
import { initialAddresses, loyalty, orders, type Address } from '@/lib/account'
import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type Tab = 'resumen' | 'pedidos' | 'deseos' | 'direcciones' | 'ajustes'

const tabs: { key: Tab; label: string; icon: typeof UserRound }[] = [
  { key: 'resumen', label: 'Resumen', icon: Sparkles },
  { key: 'pedidos', label: 'Pedidos', icon: Package },
  { key: 'deseos', label: 'Deseos', icon: Heart },
  { key: 'direcciones', label: 'Direcciones', icon: MapPin },
  { key: 'ajustes', label: 'Ajustes', icon: Settings },
]

const statusStyles: Record<string, string> = {
  Entregado: 'bg-secondary text-foreground',
  'En camino': 'bg-accent text-accent-foreground',
  Procesando: 'bg-foreground text-background',
}

export function ProfileView() {
  const { wishlist } = useStore()
  const [tab, setTab] = useState<Tab>('resumen')
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)

  const wishedProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.id)),
    [wishlist],
  )

  const progress = Math.min(100, Math.round((loyalty.points / loyalty.nextAt) * 100))

  const setDefault = (id: string) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  const removeAddress = (id: string) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  const addAddress = () =>
    setAddresses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: 'Nueva dirección',
        name: 'Alex Rivera',
        street: 'Añade tu calle',
        city: 'Ciudad, País',
        isDefault: false,
      },
    ])

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-24 md:px-8 md:pt-28">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex size-20 items-center justify-center rounded-full bg-background/10 text-3xl font-display backdrop-blur-sm md:size-24">
              AR
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-background/60">
                <Star className="size-3.5 fill-accent text-accent" />
                {loyalty.tier}
              </p>
              <h1 className="mt-1 font-display text-4xl leading-none tracking-tight md:text-5xl">
                Alex Rivera
              </h1>
              <p className="mt-2 text-sm text-background/60">alex.rivera@email.com</p>
            </div>
          </div>

          <div className="w-full max-w-xs">
            <div className="flex items-end justify-between text-sm">
              <span className="text-background/60">{loyalty.points} pts</span>
              <span className="text-background/60">{loyalty.nextAt} pts</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/15">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <p className="mt-2 text-xs text-background/60">
              {loyalty.nextAt - loyalty.points} pts para {loyalty.nextTier}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 mt-6 flex gap-1 overflow-x-auto rounded-full border border-border bg-background/85 p-1.5 backdrop-blur-xl md:top-20 md:w-max [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            data-cursor
            onClick={() => setTab(key)}
            className={cn(
              'relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
              tab === key ? 'text-background' : 'text-foreground/70 hover:text-foreground',
            )}
          >
            {tab === key && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <Icon className="relative size-4" />
            <span className="relative">{label}</span>
            {key === 'deseos' && wishlist.length > 0 && (
              <span
                className={cn(
                  'relative rounded-full px-1.5 text-[10px] font-bold',
                  tab === key ? 'bg-accent text-accent-foreground' : 'bg-accent/20 text-accent',
                )}
              >
                {wishlist.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'resumen' && (
              <Overview wishedCount={wishedProducts.length} onNavigate={setTab} />
            )}
            {tab === 'pedidos' && <Orders />}
            {tab === 'deseos' && (
              <Wishlist products={wishedProducts} onExplore={() => setTab('resumen')} />
            )}
            {tab === 'direcciones' && (
              <Addresses
                addresses={addresses}
                onSetDefault={setDefault}
                onRemove={removeAddress}
                onAdd={addAddress}
              />
            )}
            {tab === 'ajustes' && <SettingsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Overview({
  wishedCount,
  onNavigate,
}: {
  wishedCount: number
  onNavigate: (t: Tab) => void
}) {
  const stats = [
    { label: 'Pedidos totales', value: orders.length, icon: Package, tab: 'pedidos' as Tab },
    { label: 'Puntos de fidelidad', value: loyalty.points, icon: Sparkles, tab: 'resumen' as Tab },
    { label: 'En tu lista de deseos', value: wishedCount, icon: Heart, tab: 'deseos' as Tab },
  ]
  const latest = orders[0]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tab }) => (
          <button
            key={label}
            data-cursor
            onClick={() => onNavigate(tab)}
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-foreground"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-2 font-display text-4xl tabular-nums">{value}</p>
            </div>
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="size-5" />
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Último pedido</h2>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
              statusStyles[latest.status],
            )}
          >
            {latest.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {latest.id} · {latest.date}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {latest.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-lg bg-secondary p-2 pr-4">
              <div className="relative size-14 overflow-hidden rounded-md bg-muted">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Talla {item.size} · x{item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl bg-accent p-6 text-accent-foreground">
        <Truck className="size-8" />
        <div className="mt-6">
          <p className="font-display text-2xl leading-tight">Envío gratis en tu próximo pedido</p>
          <p className="mt-2 text-sm text-accent-foreground/80">
            Como miembro {loyalty.tier}, tus envíos son siempre prioritarios.
          </p>
        </div>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl">{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
                  statusStyles[order.status],
                )}
              >
                {order.status}
              </span>
              <span className="font-semibold">{formatPrice(order.total)}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {order.items.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg bg-secondary p-2 pr-4">
                <div className="relative size-14 overflow-hidden rounded-md bg-muted">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Talla {item.size} · x{item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              data-cursor
              className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wide text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Seguir pedido
            </button>
            <button
              data-cursor
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-foreground"
            >
              Volver a comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Wishlist({
  products: wished,
  onExplore,
}: {
  products: typeof products
  onExplore: () => void
}) {
  if (wished.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24 text-center">
        <Heart className="size-10 text-muted-foreground" />
        <p className="mt-4 font-display text-2xl">Tu lista está vacía</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Guarda las prendas que te gusten tocando el corazón. Aparecerán aquí.
        </p>
        <button
          data-cursor
          onClick={onExplore}
          className="mt-6 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Explorar la colección
        </button>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {wished.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function Addresses({
  addresses,
  onSetDefault,
  onRemove,
  onAdd,
}: {
  addresses: Address[]
  onSetDefault: (id: string) => void
  onRemove: (id: string) => void
  onAdd: () => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {addresses.map((a) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              'relative rounded-xl border bg-card p-5',
              a.isDefault ? 'border-foreground' : 'border-border',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {a.label}
              </span>
              {a.isDefault && (
                <span className="text-xs font-bold uppercase tracking-wide text-accent">
                  Predeterminada
                </span>
              )}
            </div>
            <div className="mt-4 space-y-0.5 text-sm">
              <p className="font-semibold">{a.name}</p>
              <p className="text-muted-foreground">{a.street}</p>
              <p className="text-muted-foreground">{a.city}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {!a.isDefault && (
                <button
                  data-cursor
                  onClick={() => onSetDefault(a.id)}
                  className="text-xs font-semibold uppercase tracking-wide underline-offset-4 hover:underline"
                >
                  Predeterminar
                </button>
              )}
              <button
                data-cursor
                onClick={() => onRemove(a.id)}
                aria-label="Eliminar dirección"
                className="ml-auto flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-accent"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        data-cursor
        onClick={onAdd}
        className="flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        <Plus className="size-6" />
        <span className="text-sm font-semibold">Añadir dirección</span>
      </button>
    </div>
  )
}

function SettingsPanel() {
  const [form, setForm] = useState({ name: 'Alex Rivera', email: 'alex.rivera@email.com', phone: '+34 600 123 456' })
  const [prefs, setPrefs] = useState({ drops: true, ofertas: true, resumen: false })
  const [saved, setSaved] = useState(false)

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <UserRound className="size-5" /> Datos personales
        </h2>
        <div className="mt-5 space-y-4">
          {(
            [
              { key: 'name', label: 'Nombre completo', type: 'text' },
              { key: 'email', label: 'Correo electrónico', type: 'email' },
              { key: 'phone', label: 'Teléfono', type: 'tel' },
            ] as const
          ).map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <Bell className="size-5" /> Notificaciones
        </h2>
        <div className="mt-5 space-y-1">
          {(
            [
              { key: 'drops', label: 'Nuevos drops y colecciones' },
              { key: 'ofertas', label: 'Ofertas privadas y flash sales' },
              { key: 'resumen', label: 'Resumen mensual de novedades' },
            ] as const
          ).map(({ key, label }) => (
            <button
              type="button"
              key={key}
              data-cursor
              onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
              className="flex w-full items-center justify-between rounded-lg px-1 py-3 text-left transition-colors hover:bg-secondary"
            >
              <span className="text-sm font-medium">{label}</span>
              <span
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  prefs[key] ? 'bg-accent' : 'bg-border',
                )}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  className={cn(
                    'absolute top-0.5 size-5 rounded-full bg-background shadow',
                    prefs[key] ? 'right-0.5' : 'left-0.5',
                  )}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <button
            type="submit"
            data-cursor
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Guardar cambios
          </button>
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-accent"
              >
                Cambios guardados
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  )
}
