import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Projet ${slug} — Portfolio Connect-Web`,
    alternates: { canonical: `https://connect-web.tech/portfolio/${slug}` },
  }
}

export const revalidate = 3600 // ISR 1h

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  return (
    <section className="section container">
      <span className="text-eyebrow">Case study</span>
      <h1>Projet : {slug}</h1>
      {/* TODO Sprint 3 — ProjectHero, Challenge, Solution, Results, Testimonial, TechStack */}
    </section>
  )
}
