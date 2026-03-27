import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nos Services Web — Création, Refonte, E-commerce',
  description: "Découvrez nos services : création de site web, refonte, boutique e-commerce. Solutions digitales sur mesure pour votre entreprise.",
  alternates: { canonical: 'https://connect-web.tech/services' },
}

export const revalidate = false

const SERVICES = [
  {
    slug: 'creation-site-web',
    title: 'Création de site web',
    description: 'Votre site vitrine sur mesure, optimisé SEO et haute performance.',
  },
  {
    slug: 'refonte-site-web',
    title: 'Refonte de site web',
    description: 'Modernisez votre site existant sans perdre votre référencement.',
  },
  {
    slug: 'site-e-commerce',
    title: 'Site e-commerce',
    description: 'Une boutique en ligne performante pour développer vos ventes.',
  },
]

export default function ServicesPage() {
  return (
    <section className="section container">
      <span className="text-eyebrow">Ce que nous faisons</span>
      <h1>Nos Services Web</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {SERVICES.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <article>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
