export type Color = {
  name: string
  value: string
}

export type Product = {
  id: string
  name: string
  category: 'Sudaderas' | 'Camisetas' | 'Pantalones' | 'Chaquetas' | 'Abrigos'
  price: number
  originalPrice?: number
  image: string
  hoverImage: string
  colors: Color[]
  sizes: ('S' | 'M' | 'L' | 'XL')[]
  rating: number
  reviews: number
  isNew?: boolean
  isBestSeller?: boolean
  onSale?: boolean
}

export const products: Product[] = [
  {
    id: 'sudadera-oversize-negra',
    name: 'Sudadera Cápsula Oversize',
    category: 'Sudaderas',
    price: 129,
    image: '/products/hoodie-front.png',
    hoverImage: '/products/hoodie-model.png',
    colors: [
      { name: 'Negro', value: '#1c1c1c' },
      { name: 'Piedra', value: '#b9b0a2' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 214,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 'camiseta-marfil',
    name: 'Camiseta Peso Pesado Marfil',
    category: 'Camisetas',
    price: 49,
    image: '/products/tee-front.png',
    hoverImage: '/products/tee-model.png',
    colors: [
      { name: 'Marfil', value: '#efe9dc' },
      { name: 'Negro', value: '#1c1c1c' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 512,
    isNew: true,
  },
  {
    id: 'cargo-tactico',
    name: 'Pantalón Cargo Táctico',
    category: 'Pantalones',
    price: 98,
    originalPrice: 140,
    image: '/products/cargo-front.png',
    hoverImage: '/products/cargo-model.png',
    colors: [
      { name: 'Oliva', value: '#6b6a52' },
      { name: 'Arena', value: '#c2b49a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 178,
    isBestSeller: true,
    onSale: true,
  },
  {
    id: 'bomber-grafito',
    name: 'Chaqueta Bomber Grafito',
    category: 'Chaquetas',
    price: 159,
    originalPrice: 210,
    image: '/products/bomber-front.png',
    hoverImage: '/products/bomber-model.png',
    colors: [
      { name: 'Grafito', value: '#3a3a3d' },
      { name: 'Arcilla', value: '#a2695a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 96,
    isNew: true,
    onSale: true,
  },
  {
    id: 'abrigo-camel',
    name: 'Abrigo de Lana Camel',
    category: 'Abrigos',
    price: 289,
    image: '/products/coat-front.png',
    hoverImage: '/products/coat-model.png',
    colors: [
      { name: 'Camel', value: '#b08a5c' },
      { name: 'Antracita', value: '#33322f' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviews: 64,
    isBestSeller: true,
  },
  {
    id: 'crew-crema',
    name: 'Sudadera Crew Crema',
    category: 'Sudaderas',
    price: 109,
    image: '/products/crew-front.png',
    hoverImage: '/products/crew-model.png',
    colors: [
      { name: 'Crema', value: '#e3d9c6' },
      { name: 'Grafito', value: '#3a3a3d' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 143,
    isNew: true,
  },
  {
    id: 'sudadera-piedra',
    name: 'Sudadera Cápsula Piedra',
    category: 'Sudaderas',
    price: 99,
    originalPrice: 129,
    image: '/products/hoodie-front.png',
    hoverImage: '/products/hoodie-model.png',
    colors: [
      { name: 'Piedra', value: '#b9b0a2' },
      { name: 'Negro', value: '#1c1c1c' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 88,
    onSale: true,
  },
  {
    id: 'camiseta-negra',
    name: 'Camiseta Peso Pesado Negra',
    category: 'Camisetas',
    price: 49,
    image: '/products/tee-front.png',
    hoverImage: '/products/tee-model.png',
    colors: [
      { name: 'Negro', value: '#1c1c1c' },
      { name: 'Marfil', value: '#efe9dc' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 301,
    isBestSeller: true,
  },
  {
    id: 'cargo-arena',
    name: 'Pantalón Cargo Arena',
    category: 'Pantalones',
    price: 105,
    image: '/products/cargo-front.png',
    hoverImage: '/products/cargo-model.png',
    colors: [
      { name: 'Arena', value: '#c2b49a' },
      { name: 'Oliva', value: '#6b6a52' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 57,
    isNew: true,
  },
  {
    id: 'bomber-arcilla',
    name: 'Chaqueta Bomber Arcilla',
    category: 'Chaquetas',
    price: 149,
    originalPrice: 199,
    image: '/products/bomber-front.png',
    hoverImage: '/products/bomber-model.png',
    colors: [
      { name: 'Arcilla', value: '#a2695a' },
      { name: 'Grafito', value: '#3a3a3d' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 72,
    isBestSeller: true,
    onSale: true,
  },
  {
    id: 'abrigo-antracita',
    name: 'Abrigo de Lana Antracita',
    category: 'Abrigos',
    price: 289,
    image: '/products/coat-front.png',
    hoverImage: '/products/coat-model.png',
    colors: [
      { name: 'Antracita', value: '#33322f' },
      { name: 'Camel', value: '#b08a5c' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 41,
    isNew: true,
  },
  {
    id: 'crew-grafito',
    name: 'Sudadera Crew Grafito',
    category: 'Sudaderas',
    price: 89,
    originalPrice: 109,
    image: '/products/crew-front.png',
    hoverImage: '/products/crew-model.png',
    colors: [
      { name: 'Grafito', value: '#3a3a3d' },
      { name: 'Crema', value: '#e3d9c6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 119,
    onSale: true,
  },
]

export const categories = [
  'Todo',
  'Sudaderas',
  'Camisetas',
  'Pantalones',
  'Chaquetas',
  'Abrigos',
] as const

export const allColors: Color[] = [
  { name: 'Negro', value: '#1c1c1c' },
  { name: 'Marfil', value: '#efe9dc' },
  { name: 'Piedra', value: '#b9b0a2' },
  { name: 'Crema', value: '#e3d9c6' },
  { name: 'Oliva', value: '#6b6a52' },
  { name: 'Arena', value: '#c2b49a' },
  { name: 'Grafito', value: '#3a3a3d' },
  { name: 'Arcilla', value: '#a2695a' },
  { name: 'Camel', value: '#b08a5c' },
  { name: 'Antracita', value: '#33322f' },
]

export const allSizes = ['S', 'M', 'L', 'XL'] as const

export function formatPrice(value: number) {
  return `${value} €`
}
