import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — Prix Agence Web Transparents',
  description: "Découvrez nos plans tarifaires clairs : Starter, Pro, Premium. Prix transparents pour votre projet web. Devis personnalisé gratuit.",
  alternates: { canonical: 'https://connect-web.tech/tarifs' },
}

export const revalidate = false

export default function PricingPage() {
  return (
    <section className="section container">
      <span className="text-eyebrow">Nos offres</span>
      <h1>Plans & Tarifs</h1>
      {/* TODO Sprint 4 — PricingCard × 3 (Starter, Pro, Premium) */}
      <p>Page tarifs dédiée — Sprint 4</p>
    </section>
  )
}
