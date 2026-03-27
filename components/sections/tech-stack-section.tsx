'use client'

// Source  : Contenu fourni — Section Technologies & Stack technique
// Design  : section-base (bg-white) · Embla carousel · pas d'autoplay · nav manuelle
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Smartphone,
  Server,
  Database,
  Plug,
  Cloud,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES & DONNÉES STATIQUES
   ─────────────────────────────────────────────────────────────── */
interface TechCategory {
  title: string
  icon:  LucideIcon
  techs: string[]
}

const CATEGORIES: TechCategory[] = [
  {
    title: 'Frontend',
    icon:  Code2,
    techs: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Mobile',
    icon:  Smartphone,
    techs: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin'],
  },
  {
    title: 'Backend',
    icon:  Server,
    techs: ['Node.js', 'NestJS', 'Python', 'PHP/Laravel', 'tRPC'],
  },
  {
    title: 'Base de données',
    icon:  Database,
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Supabase'],
  },
  {
    title: 'Intégrations',
    icon:  Plug,
    techs: ['Odoo', 'HubSpot', 'Salesforce', 'Stripe', 'Wave', 'Orange Money'],
  },
  {
    title: 'Déploiement & DevOps',
    icon:  Cloud,
    techs: ['Vercel', 'Railway', 'Docker', 'GitHub Actions', 'Sentry'],
  },
]

const TOTAL = CATEGORIES.length

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — TechCard
   Largeur slide : 82% mobile (peek 1.2) · 47% tablette (2) · 31.5% desktop (3)
   ─────────────────────────────────────────────────────────────── */
function TechCard({ category }: { category: TechCategory }) {
  const Icon = category.icon

  return (
    <div
      style={{ flex: '0 0 82%', minWidth: '280px', minHeight: 0 }}
      className="md:flex-[0_0_47%] lg:flex-[0_0_31.5%]"
    >
      <div
        style={{
          background:   '#FFFFFF',
          border:       '1px solid #DDE3EE',
          borderRadius: '16px',
          padding:      '28px',
          height:       '100%',
          transition:   'border-color 200ms ease, transform 200ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#1B2A4A'
          e.currentTarget.style.transform   = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#DDE3EE'
          e.currentTarget.style.transform   = 'translateY(0)'
        }}
      >
        {/* En-tête card : icône + titre catégorie */}
        <div
          className="flex items-center"
          style={{ gap: '8px', marginBottom: '16px' }}
        >
          <Icon
            size={20}
            aria-hidden="true"
            style={{ color: '#1B2A4A', flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize:   '14px',
              color:      '#1B2A4A',
              lineHeight: 1.3,
            }}
          >
            {category.title}
          </span>
        </div>

        {/* Séparateur */}
        <div
          style={{
            borderBottom: '1px solid #F4F6FA',
            marginBottom: '16px',
          }}
          aria-hidden="true"
        />

        {/* Pills technologies */}
        <div className="flex flex-wrap" style={{ gap: '8px' }}>
          {category.techs.map((tech) => (
            <span
              key={tech}
              style={{
                background:   '#F4F6FA',
                border:       '1px solid #DDE3EE',
                borderRadius: '999px',
                padding:      '5px 12px',
                fontSize:     '13px',
                fontWeight:   500,
                color:        '#4A5568',
                fontFamily:   'var(--font-body)',
                lineHeight:   1.4,
                transition:   'background 150ms ease, border-color 150ms ease, color 150ms ease',
                cursor:       'default',
                display:      'inline-block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background   = '#EEF3FA'
                el.style.borderColor  = '#1B2A4A'
                el.style.color        = '#1B2A4A'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background   = '#F4F6FA'
                el.style.borderColor  = '#DDE3EE'
                el.style.color        = '#4A5568'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — TechStackSection
   ─────────────────────────────────────────────────────────────── */
export function TechStackSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:          false,
    align:         'start',
    containScroll: false,
  })

  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap())
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="section-alt"
    >
      <div className="container">

        {/* ── En-tête section ─────────────────────────────────────── */}
        <div
          className="flex items-end justify-between flex-wrap"
          style={{ gap: '16px', marginBottom: '48px' }}
        >
          {/* Textes : eyebrow + H2 + sous-titre */}
          <div>
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         '#E8611A',
                marginBottom:  '8px',
              }}
            >
              Notre stack
            </p>
            <h2
              id="tech-stack-heading"
              className="text-h2"
              style={{ color: '#1B2A4A', marginBottom: '8px' }}
            >
              Les technologies que nous maîtrisons
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '15px',
                color:      '#718096',
              }}
            >
              Des outils modernes, choisis pour la performance et la durabilité.
            </p>
          </div>

          {/* Navigation : compteur + flèches */}
          <div
            className="flex items-center"
            style={{ gap: '8px', flexShrink: 0 }}
          >
            {/* Compteur 01 / 06 */}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '13px',
                color:      '#94A3B8',
                minWidth:   '42px',
                textAlign:  'right',
              }}
              aria-live="polite"
              aria-label={`Catégorie ${current + 1} sur ${TOTAL}`}
            >
              {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(TOTAL).padStart(2, '0')}
            </span>

            {/* Flèche précédente */}
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Catégorie précédente"
              className="flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8611A]"
              style={{
                width:        '36px',
                height:       '36px',
                borderRadius: '6px',
                border:       '1px solid #DDE3EE',
                background:   '#FFFFFF',
                color:        canPrev ? '#4A5568' : '#D1D5DB',
                cursor:       canPrev ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => { if (canPrev) e.currentTarget.style.borderColor = '#1B2A4A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDE3EE' }}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {/* Flèche suivante */}
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Catégorie suivante"
              className="flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8611A]"
              style={{
                width:        '36px',
                height:       '36px',
                borderRadius: '6px',
                border:       '1px solid #DDE3EE',
                background:   '#FFFFFF',
                color:        canNext ? '#4A5568' : '#D1D5DB',
                cursor:       canNext ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => { if (canNext) e.currentTarget.style.borderColor = '#1B2A4A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDE3EE' }}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Carousel Embla ──────────────────────────────────────── */}
        <div
          ref={emblaRef}
          style={{ overflow: 'hidden' }}
          aria-label="Technologies par catégorie"
          role="region"
        >
          <div className="flex" style={{ gap: '20px' }}>
            {CATEGORIES.map((category) => (
              <TechCard key={category.title} category={category} />
            ))}
          </div>
        </div>

        {/* ── Dots centrés ────────────────────────────────────────── */}
        <div
          className="flex justify-center items-center"
          style={{ gap: '6px', marginTop: '32px' }}
          aria-hidden="true"
        >
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                width:        current === i ? '20px' : '6px',
                height:       '6px',
                borderRadius: '999px',
                background:   current === i ? '#1B2A4A' : '#D1D5DB',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
