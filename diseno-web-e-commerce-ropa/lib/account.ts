export type OrderStatus = 'Entregado' | 'En camino' | 'Procesando'

export type Order = {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: { name: string; image: string; size: string; qty: number }[]
}

export const orders: Order[] = [
  {
    id: 'VRT-10428',
    date: '12 sep 2026',
    status: 'En camino',
    total: 288,
    items: [
      { name: 'Chaqueta Bomber Grafito', image: '/products/bomber-front.png', size: 'L', qty: 1 },
      { name: 'Camiseta Peso Pesado Marfil', image: '/products/tee-front.png', size: 'M', qty: 2 },
    ],
  },
  {
    id: 'VRT-10315',
    date: '28 ago 2026',
    status: 'Entregado',
    total: 129,
    items: [
      { name: 'Sudadera Cápsula Oversize', image: '/products/hoodie-front.png', size: 'M', qty: 1 },
    ],
  },
  {
    id: 'VRT-10190',
    date: '03 ago 2026',
    status: 'Entregado',
    total: 387,
    items: [
      { name: 'Abrigo de Lana Camel', image: '/products/coat-front.png', size: 'L', qty: 1 },
      { name: 'Pantalón Cargo Táctico', image: '/products/cargo-front.png', size: 'M', qty: 1 },
    ],
  },
]

export type Address = {
  id: string
  label: string
  name: string
  street: string
  city: string
  isDefault: boolean
}

export const initialAddresses: Address[] = [
  {
    id: 'a1',
    label: 'Casa',
    name: 'Alex Rivera',
    street: 'Calle Serrano 44, 3ºB',
    city: '28001 Madrid, España',
    isDefault: true,
  },
  {
    id: 'a2',
    label: 'Estudio',
    name: 'Alex Rivera',
    street: 'Passeig de Gràcia 12',
    city: '08007 Barcelona, España',
    isDefault: false,
  },
]

export const loyalty = {
  tier: 'Círculo Oro',
  points: 2840,
  nextTier: 'Círculo Platino',
  nextAt: 3500,
}
