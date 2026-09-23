import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import { CustomCursor } from '@/components/custom-cursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VÉRTICE — Streetwear Premium Contemporáneo',
  description:
    'VÉRTICE es una casa de moda urbana premium. Descubre prendas de edición limitada, colecciones de temporada y básicos de peso pesado diseñados para durar.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4efe6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivo.variable}`}>
      <body className="antialiased font-sans md:cursor-none">
        <StoreProvider>
          <CustomCursor />
          {children}
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
