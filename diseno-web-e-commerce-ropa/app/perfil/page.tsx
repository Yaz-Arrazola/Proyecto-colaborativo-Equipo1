import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProfileView } from '@/components/profile/profile-view'

export const metadata: Metadata = {
  title: 'Mi perfil — VÉRTICE',
  description: 'Gestiona tus pedidos, lista de deseos, direcciones y preferencias en VÉRTICE.',
}

export default function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProfileView />
      </main>
      <SiteFooter />
    </>
  )
}
