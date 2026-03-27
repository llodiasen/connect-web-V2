'use client'

// Source  : CONTENT.md > HOME > Section Portfolio (preview projets)
// Design  : section-alt · filtres pills · slider Embla desktop/tablet · voir-plus mobile
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useState, useMemo, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES & DONNÉES — [PLACEHOLDER] à remplacer par vrais projets
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

const FILTERS = ['Tous', 'E-commerce', 'Dev Web', 'Dev Mobile', 'SaaS'] as const
type Filter = typeof FILTERS[number]

const PROJECTS: Project[] = [
  {
    id:          'sunu-thiossane',
    title:       'Sunu Thiossane – Échange Culturel International',
    category:    'Dev Web',
    accentColor: '#E8611A',
    description: 'Site institutionnel pour programmes d\'échanges culturels internationaux pour jeunes de 8 à 18 ans. Programmes STEA.',
    techs:       ['WordPress', 'SEO', 'Responsive Design', 'Multilingue'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Sunu Thiossane.png',
  },
  {
    id:          'demarches-en-france',
    title:       'Démarches en France – Accompagnement Administratif',
    category:    'Dev Web',
    accentColor: '#2563EB',
    description: 'Plateforme professionnelle pour simplifier vos démarches administratives en France.',
    techs:       ['WordPress', 'PHP', 'JavaScript', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/DemarchesEnFrance.png',
  },
  {
    id:          'tamou-fishing',
    title:       'Tamou Fishing – Pêche & Transformation Halieutique',
    category:    'Dev Web',
    accentColor: '#0369A1',
    description: 'Entreprise internationale spécialisée dans la pêche, la transformation et la commercialisation de produits halieutiques.',
    techs:       ['WordPress', 'WooCommerce', 'PHP', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Tamou.png',
  },
  {
    id:          'sd-group',
    title:       'SD Group – Fournisseur Équipements Industriels',
    category:    'Dev Web',
    accentColor: '#374151',
    description: 'Entreprise industrielle de référence en Afrique de l\'Ouest, spécialisée en import-export et approvisionnement technique.',
    techs:       ['WordPress', 'PHP', 'SEO', 'Responsive Design'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/SD GROUP.png',
  },
  {
    id:          'marjan-bijouterie',
    title:       'Marjan Bijouterie – Bijoux en Or et Argent',
    category:    'E-commerce',
    accentColor: '#B45309',
    description: 'Bijouterie sénégalaise créant des bijoux en or et argent, alliant tradition et modernité.',
    techs:       ['WordPress', 'WooCommerce', 'Stripe', 'PHP', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Marjan Bijouterie.png',
  },
  {
    id:          'njeg-marketplace',
    title:       'Njeg – Marketplace 100% Sénégalaise',
    category:    'E-commerce',
    accentColor: '#16A34A',
    description: 'Marketplace 100% sénégalaise permettant d\'acheter et vendre facilement partout au Sénégal des produits neufs ou d\'occasion.',
    techs:       ['WordPress', 'Multi-vendeur', 'WooCommerce', 'PHP', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Njeg.png',
  },
  {
    id:          'dakar-cafe-express',
    title:       'Dakar Café Express – Boutique Nespresso & Café',
    category:    'E-commerce',
    accentColor: '#78350F',
    description: 'Boutique e-commerce spécialisée dans la vente de produits Nespresso à Dakar et dans toute la région.',
    techs:       ['WooCommerce', 'WordPress', 'Stripe', 'PHP', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Dakar cafe express.png',
  },
  {
    id:          'cosaan-education',
    title:       'Cosaan Education Network – Réseau Éducatif Bilingue',
    category:    'Dev Web',
    accentColor: '#7C3AED',
    description: 'École privée bilingue valorisant le patrimoine africain. "Cosaan" signifie "racines" en Wolof.',
    techs:       ['WordPress', 'PHP', 'Multilingue', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Cosaan Education Network.png',
  },
  {
    id:          'atta-africa',
    title:       'Atta Africa – Loungewear Made in Senegal',
    category:    'E-commerce',
    accentColor: '#9D174D',
    description: 'Boutique en ligne de mode éthique Made in Senegal, spécialisée en loungewear et vêtements confortables.',
    techs:       ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Atta Africa.png',
  },
  {
    id:          'selfyprod',
    title:       'Selfyprod – Agence de Production Audiovisuelle',
    category:    'Dev Web',
    accentColor: '#1D4ED8',
    description: 'Agence audiovisuelle à Dakar, spécialisée en vidéos sur mesure pour entreprises et institutions.',
    techs:       ['WordPress', 'PHP', 'JavaScript', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/selfyprod.png',
  },
  {
    id:          'fahamu-africa',
    title:       'Fahamu Africa – Réseaux pour la Justice Sociale',
    category:    'Dev Web',
    accentColor: '#065F46',
    description: 'Organisation panafricaine créée en 1997 pour renforcer, nourrir et travailler avec les mouvements pour la justice sociale.',
    techs:       ['WordPress', 'PHP', 'Multilingue', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Fahamu Africa.png',
  },
  {
    id:          'fraisn',
    title:       'Fraisn – Épicerie en Ligne',
    category:    'E-commerce',
    accentColor: '#DC2626',
    description: 'Boutique e-commerce d\'épicerie alimentaire en ligne pour faire vos courses simplement et rapidement.',
    techs:       ['WordPress', 'PHP', 'SEO', 'Responsive Design'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Fraisn.png',
  },
  {
    id:          'linkshop',
    title:       'Linkshop – Boutique Informatique & High-Tech',
    category:    'E-commerce',
    accentColor: '#0F172A',
    description: 'Boutique e-commerce d\'informatique et High-Tech pour professionnels et particuliers.',
    techs:       ['React', 'Node.js', 'Stripe', 'TypeScript', 'MongoDB'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Linkshop.png',
  },
  {
    id:          'nous-sommes-la-solution',
    title:       'Nous Sommes La Solution – Femmes Rurales Africaines',
    category:    'Dev Web',
    accentColor: '#92400E',
    description: 'Mouvement de femmes rurales africaines pour la souveraineté alimentaire en Afrique.',
    techs:       ['WordPress', 'Multilingue', 'PHP', 'SEO'],
    href:        '/portfolio',
    imageSrc:    '/Portfolio/Mouvement de Femmes Rurales Africaines.png',
  },
]

const MOBILE_INITIAL = 2  // cartes visibles avant "Voir plus" sur mobile
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ProjectCard
   ─────────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      aria-label={project.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow:     'hidden',
        height:       '100%',
        boxShadow:    hovered
          ? '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.06)',
        transform:    hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition:   'transform 200ms ease-out, box-shadow 200ms ease-out',
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16 / 9', background: '#F1F3F7' }}
      >
        <Image
          src={project.imageSrc ?? '/images/placeholder-project.svg'}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{
            transform:  hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 400ms ease',
          }}
        />
      </div>

      {/* Contenu */}
      <div style={{ padding: '20px' }}>
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

        <h3
          style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      'var(--card-title-size)',
            lineHeight:    1.3,
            color:         '#0A0B0E',
            letterSpacing: '-0.015em',
            marginBottom:  '8px',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize:        'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
            color:           '#9CA3AF',
            lineHeight:      1.55,
            marginBottom:    '16px',
            display:         '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
          }}
        >
          {project.description}
        </p>

        <Link
          href={project.href}
          aria-label={`Voir le projet\u00A0: ${project.title}`}
          className="inline-flex items-center"
          style={{
            gap:            '5px',
            fontSize:       '12px',
            fontWeight:     600,
            color:          'var(--color-orange-500)',
            textDecoration: 'none',
            opacity:        hovered ? 1 : 0.6,
            transition:     'opacity 200ms ease',
          }}
        >
          Voir le projet
          <ExternalLink size={11} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — PortfolioPreview
   Desktop/tablet : Embla slider 3 cartes · flèches · dots
   Mobile         : liste + bouton "Voir plus"
   ─────────────────────────────────────────────────────────────── */
export function PortfolioPreview() {
  const [active, setActive]   = useState<Filter>('Tous')
  const [showAll, setShowAll] = useState(false)
  const [current, setCurrent] = useState(0)
  const [snapCount, setSnapCount] = useState(1)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:          false,
    align:         'start',
    containScroll: 'trimSnaps',
  })

  const filtered = useMemo(
    () => PROJECTS.filter((p) => active === 'Tous' || p.category === active),
    [active],
  )

  /* Reset au changement de filtre */
  useEffect(() => {
    setShowAll(false)
    if (emblaApi) {
      emblaApi.scrollTo(0, true)
      setCurrent(0)
    }
  }, [active, emblaApi])

  /* Re-init Embla quand filtered change */
  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
  }, [filtered, emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap())
      setSnapCount(emblaApi.scrollSnapList().length)
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const mobileVisible = showAll ? filtered : filtered.slice(0, MOBILE_INITIAL)

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="section-base"
    >
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: '32px' }}
        >
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '12px',
            }}
          >
            Nos réalisations
          </p>
          <h2
            id="portfolio-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    700,
              fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
              color:         '#0A0B0E',
              marginBottom:  '16px',
            }}
          >
            Des projets livrés qui parlent d&apos;eux-mêmes
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize:   'clamp(0.9375rem, 1.5vw, 1rem)',
              color:      '#6B7280',
              lineHeight: 1.6,
              maxWidth:   '460px',
              margin:     '0 auto',
            }}
          >
            De la vitrine au logiciel SaaS — des réalisations concrètes
            pour des entreprises sénégalaises et africaines.
          </p>
        </motion.div>

        {/* ── Filtres pills ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
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
                  padding:      '7px 16px',
                  borderRadius: '999px',
                  border:       isActive ? 'none' : '1px solid #E2E8F0',
                  background:   isActive ? '#1B2A4A' : '#FFFFFF',
                  color:        isActive ? '#FFFFFF' : '#4B5563',
                  fontSize:     'var(--filter-text-size)',
                  fontWeight:   500,
                  cursor:       'pointer',
                  transition:   'all 180ms ease',
                  whiteSpace:   'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F7F8FA' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = '#FFFFFF' }}
              >
                {f}
              </button>
            )
          })}
        </motion.div>

        {/* ── Contenu ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (

            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
              style={{ fontSize: '15px', color: '#9CA3AF', padding: '48px 0' }}
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
            >

              {/* ══ DESKTOP / TABLET — Slider Embla 3 cartes ══ */}
              <div className="hidden md:block">

                {/* Navigation : compteur + flèches */}
                <div
                  className="flex items-center justify-end"
                  style={{ gap: '8px', marginBottom: '20px' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '13px',
                      color:      '#94A3B8',
                      minWidth:   '42px',
                      textAlign:  'right',
                    }}
                    aria-live="polite"
                  >
                    {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(snapCount).padStart(2, '0')}
                  </span>

                  <button
                    onClick={scrollPrev}
                    disabled={!canPrev}
                    aria-label="Projet précédent"
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

                  <button
                    onClick={scrollNext}
                    disabled={!canNext}
                    aria-label="Projet suivant"
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

                {/* Embla viewport */}
                <div
                  ref={emblaRef}
                  style={{ overflow: 'hidden' }}
                  aria-label="Projets du portfolio"
                  role="region"
                >
                  <div className="flex" style={{ gap: '24px' }}>
                    {filtered.map((project) => (
                      <div
                        key={project.id}
                        /* 3 cartes visibles : (100% - 2*24px) / 3 */
                        style={{ flex: '0 0 calc(33.333% - 16px)', minWidth: 0 }}
                      >
                        <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots — visibles seulement si > 1 snap */}
                {snapCount > 1 && (
                  <div
                    className="flex justify-center items-center"
                    style={{ gap: '6px', marginTop: '28px' }}
                    aria-hidden="true"
                  >
                    {Array.from({ length: snapCount }).map((_, i) => (
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
                )}
              </div>

              {/* ══ MOBILE — Liste + bouton Voir plus ══ */}
              <div className="md:hidden">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <AnimatePresence initial={false}>
                    {mobileVisible.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Bouton Voir plus */}
                {!showAll && filtered.length > MOBILE_INITIAL && (
                  <div className="text-center" style={{ marginTop: '20px' }}>
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center font-semibold transition-all duration-150"
                      style={{
                        gap:          '6px',
                        padding:      '10px 20px',
                        borderRadius: '999px',
                        border:       '1px solid #DDE3EE',
                        background:   '#FFFFFF',
                        color:        '#1B2A4A',
                        fontSize:     '13px',
                        cursor:       'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background  = '#1B2A4A'
                        e.currentTarget.style.color       = '#FFFFFF'
                        e.currentTarget.style.borderColor = '#1B2A4A'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background  = '#FFFFFF'
                        e.currentTarget.style.color       = '#1B2A4A'
                        e.currentTarget.style.borderColor = '#DDE3EE'
                      }}
                    >
                      Voir plus
                      <span
                        style={{
                          background:   '#F4F6FA',
                          borderRadius: '999px',
                          padding:      '1px 7px',
                          fontSize:     '11px',
                          fontWeight:   600,
                          color:        '#718096',
                        }}
                      >
                        +{filtered.length - MOBILE_INITIAL}
                      </span>
                      <ChevronDown size={14} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA bas ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          className="text-center"
          style={{ marginTop: '48px' }}
        >
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '16px' }}>
            50+ projets livrés
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center font-semibold rounded-xl transition-all duration-150"
            style={{
              gap:        '8px',
              padding:    '13px 28px',
              fontSize:   '14px',
              background: '#E8622A',
              color:      '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9501E'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Voir tout le portfolio
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
