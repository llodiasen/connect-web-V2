'use client'

// Source  : CONTENT.md > PAGE PORTFOLIO
// Design  : Light theme · Hero · Filtres pills · Grille 3 colonnes uniforme · CTA
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — [PLACEHOLDER] à remplacer par les vrais projets
   ⚠️ Images → /public/images/portfolio/<id>.webp (1600×1000px)
   ─────────────────────────────────────────────────────────────── */
interface Project {
  id:          string
  title:       string
  category:    string
  accentColor: string
  description: string
  techs:       string[]
  href:        string
  imageSrc:    string | null
}

const PROJECTS: Project[] = [
  {
    id:          'ecommerce-senegal',
    title:       '[PLACEHOLDER] Boutique E-commerce',
    category:    'E-commerce',
    accentColor: '#E8611A',
    description: 'Boutique en ligne avec paiement Wave & Orange Money intégré, gestion des stocks en temps réel, interface d\'administration mobile-friendly.',
    techs:       ['Next.js', 'Sanity', 'Wave API'],
    href:        '/portfolio/ecommerce-senegal',
    imageSrc:    null,
  },
  {
    id:          'app-mobile-transfert',
    title:       '[PLACEHOLDER] Application Mobile',
    category:    'Dev Mobile',
    accentColor: '#2563EB',
    description: 'Application cross-platform iOS & Android pensée pour les connexions limitées en Afrique. Mode hors-ligne intégré, notifications push.',
    techs:       ['React Native', 'Node.js', 'Firebase'],
    href:        '/portfolio/app-mobile-transfert',
    imageSrc:    null,
  },
  {
    id:          'saas-crm',
    title:       '[PLACEHOLDER] Logiciel SaaS CRM',
    category:    'SaaS',
    accentColor: '#16A34A',
    description: 'Plateforme CRM sur mesure pour PME sénégalaises — gestion clients, pipeline commercial, reporting avancé, intégrations API.',
    techs:       ['React', 'NestJS', 'PostgreSQL'],
    href:        '/portfolio/saas-crm',
    imageSrc:    null,
  },
  {
    id:          'site-vitrine-corporate',
    title:       '[PLACEHOLDER] Site Vitrine Corporate',
    category:    'Dev Web',
    accentColor: '#7C3AED',
    description: 'Refonte complète du site corporate d\'un groupe sénégalais — design moderne, SEO optimisé, ultra-rapide sur mobile.',
    techs:       ['Next.js', 'Tailwind', 'Vercel'],
    href:        '/portfolio/site-vitrine-corporate',
    imageSrc:    null,
  },
]

const FILTERS = ['Tous', 'E-commerce', 'Dev Mobile', 'Dev Web', 'Applications Web', 'SaaS', 'ERP/CRM'] as const

/* ─────────────────────────────────────────────────────────────────
   VARIANTS
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.97, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit:    { opacity: 0, scale: 0.97, y: -6, transition: { duration: 0.2, ease: EASE } },
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ProjectCard
   ─────────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      key={project.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      aria-label={project.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    hovered
          ? '0 12px 32px rgba(0,0,0,0.09), 0 4px 8px rgba(0,0,0,0.05)'
          : '0 2px 8px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:   'transform 300ms ease, box-shadow 300ms ease',
      }}
    >
      {/* ── Image du projet ─────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden rounded-t-2xl"
        style={{ aspectRatio: '16 / 9', background: '#F1F3F7' }}
      >
        <Image
          src={project.imageSrc ?? '/images/placeholder-project.svg'}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{
            transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 400ms ease',
          }}
        />

        {/* Badge catégorie */}
        <span
          style={{
            position:      'absolute',
            top:           '12px',
            left:          '12px',
            padding:       '3px 10px',
            borderRadius:  '999px',
            background:    project.accentColor,
            fontSize:      '10px',
            fontWeight:    700,
            color:         '#FFFFFF',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            zIndex:        1,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Contenu ─────────────────────────────────────────────── */}
      <div style={{ padding: '24px' }}>
        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
          {project.techs.map((tech) => (
            <span
              key={tech}
              style={{
                padding:      '2px 8px',
                borderRadius: '5px',
                background:   '#F7F8FA',
                border:       '1px solid #E2E8F0',
                fontSize:     '10px',
                fontWeight:   600,
                color:        '#9CA3AF',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h3
          style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      'clamp(0.9375rem, 1.5vw, 1.0625rem)',
            lineHeight:    1.3,
            color:         '#0A0B0E',
            letterSpacing: '-0.015em',
            marginBottom:  '8px',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize:        '13px',
            color:           '#9CA3AF',
            lineHeight:      1.6,
            marginBottom:    '18px',
            display:         '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Lien */}
        <Link
          href={project.href}
          aria-label={`Voir le projet : ${project.title}`}
          className="inline-flex items-center gap-1.5"
          style={{
            fontSize:       '12px',
            fontWeight:     600,
            color:          project.accentColor,
            textDecoration: 'none',
            opacity:        hovered ? 1 : 0.65,
            transition:     'opacity 200ms ease',
          }}
        >
          Voir le projet
          <ExternalLink size={11} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PAGE PRINCIPALE
   ─────────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  const [active, setActive] = useState('Tous')

  const filtered = useMemo(
    () => PROJECTS.filter((p) => active === 'Tous' || p.category === active),
    [active],
  )

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="portfolio-h1"
        style={{
          paddingTop:    'calc(var(--nav-height, 72px) + clamp(3rem, 5vw, 5rem))',
          paddingBottom: 'clamp(3rem, 5vw, 4rem)',
          background:    '#FFFFFF',
          borderBottom:  '1px solid #E2E8F0',
          textAlign:     'center',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--brand-primary)',
                marginBottom:  '16px',
              }}
            >
              Nos Réalisations
            </p>

            <h1
              id="portfolio-h1"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    800,
                fontSize:      'clamp(2rem, 4.5vw, 3rem)',
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                color:         '#0A0B0E',
                marginBottom:  '20px',
              }}
            >
              Des projets concrets, livrés{' '}
              <span style={{ color: 'var(--brand-primary)' }}>
                pour des entreprises africaines
              </span>
            </h1>

            <p
              style={{
                fontSize:   'clamp(1rem, 1.5vw, 1.0625rem)',
                color:      '#6B7280',
                lineHeight: 1.6,
                maxWidth:   '540px',
                margin:     '0 auto',
              }}
            >
              De la boutique e-commerce au logiciel SaaS — des réalisations
              concrètes construites avec les entreprises sénégalaises et africaines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filtres + Grille ─────────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'clamp(3rem, 6vw, 5rem)',
          background:   '#F7F8FA',
        }}
      >
        <div className="container">

          {/* Filtres pills */}
          <div
            role="group"
            aria-label="Filtrer par catégorie"
            className="flex flex-wrap justify-center"
            style={{ gap: '8px', marginBottom: '40px' }}
          >
            {FILTERS.map((f) => {
              const isActive = active === f
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={isActive}
                  style={{
                    padding:      '8px 16px',
                    borderRadius: '999px',
                    border:       isActive
                      ? '1.5px solid var(--color-orange-500)'
                      : '1.5px solid #E2E8F0',
                    background:  isActive ? 'var(--color-orange-500)' : '#FFFFFF',
                    color:       isActive ? '#FFFFFF' : '#4B5563',
                    fontSize:    '13px',
                    fontWeight:  600,
                    cursor:      'pointer',
                    transition:  'all 180ms ease',
                    whiteSpace:  'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = '#F9FAFB'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = '#FFFFFF'
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* Grille 3 colonnes uniforme */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
                style={{
                  fontSize:  '15px',
                  color:     '#9CA3AF',
                  padding:   '56px 0',
                }}
              >
                Aucun projet dans cette catégorie pour le moment.
              </motion.p>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '24px' }}
              >
                <AnimatePresence>
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ── CTA Final ────────────────────────────────────────────── */}
      <section
        aria-labelledby="portfolio-cta-heading"
        style={{
          paddingBlock: 'clamp(4rem, 7vw, 6rem)',
          background:   '#FFFFFF',
          borderTop:    '1px solid #E2E8F0',
          textAlign:    'center',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ maxWidth: '560px', margin: '0 auto' }}
          >
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--brand-primary)',
                marginBottom:  '16px',
              }}
            >
              Votre prochain projet
            </p>

            <h2
              id="portfolio-cta-heading"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    800,
                fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.03em',
                color:         '#0A0B0E',
                marginBottom:  '16px',
              }}
            >
              Votre projet sera le prochain ?
            </h2>

            <p
              style={{
                fontSize:     '16px',
                color:        '#6B7280',
                lineHeight:   1.6,
                marginBottom: '32px',
              }}
            >
              Consultation gratuite, devis sous 24h, sans engagement.
              On vous dit ce qui est faisable, comment et à quel prix.
            </p>

            <div className="flex flex-wrap justify-center" style={{ gap: '12px' }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl font-semibold text-white"
                style={{
                  padding:    '14px 32px',
                  fontSize:   '15px',
                  background: 'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
                  boxShadow:  '0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px rgba(232,97,26,0.15)',
                  transition: 'box-shadow 200ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,97,26,0.28), 0 0 0 1px rgba(232,97,26,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px rgba(232,97,26,0.15)')}
              >
                Démarrer mon projet
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl font-semibold"
                style={{
                  padding:    '14px 28px',
                  fontSize:   '15px',
                  background: '#FFFFFF',
                  border:     '1.5px solid #E2E8F0',
                  color:      '#0A0B0E',
                  transition: 'border-color 200ms ease, color 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-orange-500)'
                  e.currentTarget.style.color = 'var(--color-orange-500)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.color = '#0A0B0E'
                }}
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
