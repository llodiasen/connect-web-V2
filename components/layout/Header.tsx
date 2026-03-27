// Server Component — wrapper statique pour Navbar (Client)
// Intégré dans app/layout.tsx pour une portée globale sur tout le site

import { Navbar } from './Navbar'

export function Header() {
  return <Navbar />
}
