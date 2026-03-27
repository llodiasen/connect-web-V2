// Marketing layout — Header global géré par app/layout.tsx
// Ce wrapper ajoute uniquement le Footer + le <main> sémantique

import { Footer } from './footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
