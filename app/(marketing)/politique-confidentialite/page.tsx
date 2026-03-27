import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles — Connect-Web.',
  robots: { index: false },
}

export const revalidate = false

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="section container">
      <h1>Politique de Confidentialité</h1>
      <p>Contenu RGPD à compléter — Sprint 2</p>
    </section>
  )
}
