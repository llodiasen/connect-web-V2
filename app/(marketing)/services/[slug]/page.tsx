import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

/* Slugs valides — correspond au sitemap ARCHITECTURE.md */
const VALID_SLUGS = ['creation-site-web', 'refonte-site-web', 'site-e-commerce']

const SERVICE_META: Record<string, { title: string; description: string }> = {
  'creation-site-web': {
    title: 'Création de Site Web Sur Mesure',
    description: 'Nous créons votre site vitrine sur mesure avec Next.js. Performance maximale, SEO optimisé, design professionnel.',
  },
  'refonte-site-web': {
    title: 'Refonte de Site Web — Modernisez Votre Présence En Ligne',
    description: 'Refonte complète de votre site web sans perdre votre référencement. Nouveau design, nouvelle stack, mêmes URLs.',
  },
  'site-e-commerce': {
    title: 'Création de Boutique E-commerce Performante',
    description: 'Votre boutique e-commerce sur mesure. Paiement sécurisé, gestion des stocks, optimisé pour la conversion.',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = SERVICE_META[slug]
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://connect-web.tech/services/${slug}` },
  }
}

export const revalidate = false

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  if (!VALID_SLUGS.includes(slug)) notFound()

  const meta = SERVICE_META[slug]

  return (
    <section className="section container">
      <span className="text-eyebrow">Nos services</span>
      <h1>{meta.title}</h1>
      <p>{meta.description}</p>
      {/* TODO Sprint 3 — ServiceHero, ServiceBenefits, ServiceProcess, ServiceFAQ, ServiceCTA */}
    </section>
  )
}
