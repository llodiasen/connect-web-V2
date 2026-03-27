'use client'

// Source  : CONTENT.md > HOME > Section Services + Solutions verticales
// Design  : section-base (bg-white) · tabs AnimatePresence · hover elevation
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  Globe, Smartphone, LayoutDashboard, MonitorSmartphone, Cloud, Network,
  Package, Users, Mail, ShoppingBag, ShoppingCart, Building2, CreditCard,
  Store, MousePointerClick, ArrowRight, UtensilsCrossed, Info,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────── */
type CategoryId = 'all' | 'dev' | 'integration' | 'web' | 'solutions'

interface Service {
  id:          string
  label:       string
  href:        string
  category:    Exclude<CategoryId, 'all' | 'solutions'>
  Icon:        LucideIcon
  description: string
  badge?:      string
}

interface Solution {
  id:          string
  Icon:        LucideIcon
  title:       string
  tag:         string
  description: string
  href:        string
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES SERVICES — Source : CONTENT.md > Services (10)
   ───────────────────────────────────────────────────────────────── */
const SERVICES: Service[] = [
  {
    id: 'dev-web', label: 'Développement Web', href: '/services/developpement-web',
    category: 'dev', Icon: Globe, badge: 'Populaire',
    description: 'Sites & applications web sur mesure, rapides sur mobile, optimisés SEO pour le marché africain.',
  },
  {
    id: 'dev-mobile', label: 'Développement Mobile', href: '/services/developpement-mobile',
    category: 'dev', Icon: Smartphone,
    description: 'Applications iOS & Android natives, pensées pour l\u2019utilisateur africain et les connexions limitées.',
  },
  {
    id: 'apps-web', label: 'Apps Web', href: '/services/applications-web',
    category: 'dev', Icon: LayoutDashboard,
    description: 'Dashboards, portails clients, outils métier et plateformes SaaS adaptés à vos processus.',
  },
  {
    id: 'apps-mobile', label: 'Apps Mobile', href: '/services/applications-mobile',
    category: 'dev', Icon: MonitorSmartphone,
    description: 'Solutions cross-platform iOS & Android — une seule base de code, deux plateformes.',
  },
  {
    id: 'saas', label: 'SaaS', href: '/services/logiciels-saas',
    category: 'dev', Icon: Cloud,
    description: 'De l\u2019idée au produit SaaS en production\u00A0: architecture, développement, déploiement et croissance.',
  },
  {
    id: 'architecture-api', label: 'Architecture & API', href: '/services/architecture-api',
    category: 'dev', Icon: Network,
    description: 'Conception d\u2019APIs REST et GraphQL, architecture microservices et intégrations entre vos systèmes et outils tiers.',
  },
  {
    id: 'erp', label: 'ERP', href: '/services/integration-erp',
    category: 'integration', Icon: Package,
    description: 'Connectez vos systèmes de gestion, automatisez vos processus et éliminez les ressaisies manuelles.',
  },
  {
    id: 'crm', label: 'CRM', href: '/services/integration-crm',
    category: 'integration', Icon: Users,
    description: 'Optimisez la relation client, centralisez vos leads et alignez marketing et équipes commerciales.',
  },
  {
    id: 'email', label: 'Email Marketing', href: '/services/email-marketing',
    category: 'integration', Icon: Mail,
    description: 'Mailchimp, Klaviyo, Brevo, SendGrid — automatisez vos campagnes, segmentez vos contacts et boostez vos conversions.',
  },
  {
    id: 'ecommerce', label: 'E-commerce', href: '/services/sites-ecommerce',
    category: 'web', Icon: ShoppingCart, badge: 'Populaire',
    description: 'Boutiques en ligne haute conversion avec Wave, Orange Money et paiement international intégrés.',
  },
  {
    id: 'vitrine', label: 'Vitrine', href: '/services/sites-vitrine',
    category: 'web', Icon: Building2,
    description: 'Présence web professionnelle, design sur mesure, SEO optimisé et chargement ultra-rapide.',
  },
  {
    id: 'marketplace', label: 'Marketplace', href: '/services/marketplace',
    category: 'web', Icon: Store,
    description: 'Plateforme multi-vendeurs avec gestion des commandes, paiements Wave et Orange Money intégrés et tableau de bord vendeur.',
  },
  {
    id: 'woocommerce', label: 'Boutique WooCommerce', href: '/services/woocommerce',
    category: 'web', Icon: ShoppingBag,
    description: 'E-commerce WordPress sur mesure — catalogue produits, paiements Wave et Orange Money, gestion des stocks.',
  },
  {
    id: 'shopify', label: 'Shopify', href: '/services/shopify',
    category: 'web', Icon: Store, badge: 'Populaire',
    description: 'Lancement rapide, thème sur mesure, intégration Wave et paiement international — opérationnel en 2 semaines.',
  },
  {
    id: 'landing', label: 'Landing Page', href: '/services/landing-page',
    category: 'web', Icon: MousePointerClick,
    description: 'Pages haute conversion pour vos campagnes — design optimisé, A/B testing et formulaires connectés à votre CRM.',
  },
]

/* ─────────────────────────────────────────────────────────────────
   DONNÉES SOLUTIONS — Source : CONTENT.md > Solutions verticales
   ───────────────────────────────────────────────────────────────── */
const SOLUTIONS: Solution[] = [
  {
    id:          'solution-resto',
    Icon:        UtensilsCrossed,
    title:       'Solution Resto Connect',
    tag:         'NFC · PWA · Odoo POS',
    description: 'Du menu à la caisse, zéro friction. Commande depuis la table, paiement Wave/Orange Money, dashboard cuisine.',
    href:        '/solutions/restaurant',
  },
  {
    id:          'carte-nfc',
    Icon:        CreditCard,
    title:       'Carte de Visite NFC',
    tag:         'NFC · Profil digital · Partage instantané',
    description: 'Cartes NFC connectées à votre profil digital — partagez vos coordonnées d\u2019un simple geste.',
    href:        '/services/carte-visite-nfc',
  },
  {
    id:          'solution-immo',
    Icon:        Building2,
    title:       'Solution Immo Connect',
    tag:         'NFC · PWA · Odoo CRM',
    description: 'De la vitrine au contrat signé. Chaque panneau NFC génère un lead automatique dans votre CRM.',
    href:        '/solutions/immobilier',
  },
]

/* ─────────────────────────────────────────────────────────────────
   FILTRES — onglets complets
   ───────────────────────────────────────────────────────────────── */
const FILTERS: { id: CategoryId; label: string; isBeta?: boolean }[] = [
  { id: 'all',         label: 'Tous'          },
  { id: 'dev',         label: 'Développement' },
  { id: 'integration', label: 'Intégration'   },
  { id: 'web',         label: 'Web'           },
  { id: 'solutions',   label: 'Solutions', isBeta: true },
]

/* ─────────────────────────────────────────────────────────────────
   VARIANTS FRAMER MOTION
   ───────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.94, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.35, ease: EASE } },
  exit:    { opacity: 0, scale: 0.94, y: 8,  transition: { duration: 0.2,  ease: EASE } },
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ServiceCard
   ───────────────────────────────────────────────────────────────── */
function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ height: '100%' }}
    >
      <Link
        href={service.href}
        className="group relative flex flex-col h-full"
        style={{
          background:     '#FFFFFF',
          border:         hovered ? '1px solid var(--border-strong)' : '1px solid #E2E8F0',
          borderRadius:   '12px',
          boxShadow:      hovered
            ? '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)'
            : '0 1px 3px rgba(0,0,0,0.06)',
          transform:      hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition:     'transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out',
          textDecoration: 'none',
          padding:        '28px',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${service.label} — En savoir plus`}
      >
        {/* Badge optionnel */}
        {service.badge && (
          <span
            className="absolute text-[10px] font-semibold tracking-wide uppercase"
            style={{
              top:        '16px',
              right:      '16px',
              padding:    '3px 10px',
              borderRadius:'999px',
              background: service.badge === 'Nouveau'   ? '#FFF4EE' :
                          service.badge === 'Populaire' ? '#F0FDF4' : '#F7F8FA',
              color:      service.badge === 'Nouveau'   ? '#C44D0E' :
                          service.badge === 'Populaire' ? '#15803D' : '#6B7280',
              border:     service.badge === 'Nouveau'   ? '1px solid rgba(232,97,26,0.2)' :
                          service.badge === 'Populaire' ? '1px solid rgba(21,128,61,0.2)'  : '1px solid #E2E8F0',
            }}
          >
            {service.badge}
          </span>
        )}

        {/* Icône — 44×44px */}
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: '44px', height: '44px', marginBottom: '16px', background: '#FFF4EE', flexShrink: 0 }}
        >
          <service.Icon size={20} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
        </div>

        {/* Titre */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--card-title-size)',
            lineHeight: 1.35, letterSpacing: '-0.01em', color: '#0A0B0E', marginBottom: '10px',
          }}
        >
          {service.label}
        </h3>

        {/* Description */}
        <p className="flex-grow" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--card-text-weight)', fontSize: 'var(--card-text-size)', color: '#6B7280', lineHeight: 1.65, textAlign: 'justify' }}>
          {service.description}
        </p>

        {/* Lien */}
        <div
          className="inline-flex items-center font-medium"
          style={{
            marginTop: '16px', gap: '5px', fontSize: '13px',
            color: hovered ? 'var(--color-orange-500)' : '#9CA3AF',
            transition: 'color 200ms ease',
          }}
        >
          En savoir plus
          <ArrowRight size={13} style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 200ms ease' }} aria-hidden="true" />
        </div>
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — SolutionCard
   Design spécifique : border-top orange · tag techno · badge Beta absolu
   ───────────────────────────────────────────────────────────────── */
function SolutionCard({ solution }: { solution: Solution }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ height: '100%' }}
    >
      <Link
        href={solution.href}
        className="group flex flex-col h-full"
        style={{
          position:       'relative',
          background:     '#FFFFFF',
          border:         hovered ? '1px solid #111111' : '1px solid #E5E7EB',
          borderTop:      `2px solid var(--color-orange-500)`,
          borderRadius:   '12px',
          boxShadow:      hovered
            ? '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)'
            : '0 1px 3px rgba(0,0,0,0.06)',
          transform:      hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition:     'all 200ms ease',
          textDecoration: 'none',
          padding:        '28px',
          overflow:       'hidden',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${solution.title} — Rejoindre la beta`}
      >
        {/* Badge Beta — coin top-right absolu */}
        <span
          aria-label="Beta"
          style={{
            position:     'absolute',
            top:          0,
            right:        0,
            padding:      '2px 8px',
            borderRadius: '0 12px 0 6px',
            background:   'var(--color-orange-500)',
            color:        '#FFFFFF',
            fontSize:     '10px',
            fontWeight:   600,
            fontFamily:   'var(--font-body)',
            letterSpacing:'0.04em',
            textTransform:'uppercase',
          }}
        >
          Beta
        </span>

        {/* Icône — 44×44px */}
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: '44px', height: '44px', marginBottom: '16px', background: '#FFF4EE', flexShrink: 0 }}
        >
          <solution.Icon size={20} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
        </div>

        {/* Titre */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--card-title-size)',
            lineHeight: 1.35, letterSpacing: '-0.01em', color: '#0A0B0E', marginBottom: '8px',
          }}
        >
          {solution.title}
        </h3>

        {/* Tag techno */}
        <span
          style={{
            display:       'inline-block',
            padding:       '3px 8px',
            marginBottom:  '12px',
            borderRadius:  '4px',
            background:    '#F1F5F9',
            color:         '#374151',
            fontSize:      '11px',
            fontWeight:    500,
            fontFamily:    'var(--font-body)',
            letterSpacing: '0.01em',
          }}
        >
          {solution.tag}
        </span>

        {/* Description */}
        <p className="flex-grow" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--card-text-weight)', fontSize: 'var(--card-text-size)', color: '#6B7280', lineHeight: 1.65, textAlign: 'justify' }}>
          {solution.description}
        </p>

        {/* CTA */}
        <div
          className="inline-flex items-center font-medium"
          style={{
            marginTop:  '16px',
            gap:        '5px',
            fontSize:   '13px',
            color:      hovered ? 'var(--color-orange-500)' : '#9CA3AF',
            transition: 'color 200ms ease',
          }}
        >
          Rejoindre la beta
          <ArrowRight
            size={13}
            style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 200ms ease' }}
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServicesGrid
   ───────────────────────────────────────────────────────────────── */
export function ServicesGrid() {
  const [activeFilter, setActiveFilter] = useState<CategoryId>('dev')
  const [visibleGroups, setVisibleGroups] = useState<[boolean, boolean, boolean]>([true, false, false])
  const group2Ref = useRef<HTMLDivElement>(null)
  const group3Ref = useRef<HTMLDivElement>(null)

  const isSolutions = activeFilter === 'solutions'

  const filteredServices = isSolutions || activeFilter === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeFilter)

  /* Reset groupes visibles au changement de filtre */
  useEffect(() => {
    setVisibleGroups([true, false, false])
  }, [activeFilter])

  /* IntersectionObserver — révèle les groupes 2 et 3 au scroll (filtre "Tous" uniquement) */
  useEffect(() => {
    if (activeFilter !== 'all') return

    const observers: IntersectionObserver[] = []

    const observe = (el: HTMLDivElement | null, groupIdx: 1 | 2) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleGroups(prev =>
              groupIdx === 1
                ? [prev[0], true,    prev[2]]
                : [prev[0], prev[1], true   ],
            )
            obs.disconnect()
          }
        },
        { threshold: 0.1 },
      )
      obs.observe(el)
      observers.push(obs)
    }

    observe(group2Ref.current, 1)
    observe(group3Ref.current, 2)

    return () => observers.forEach(obs => obs.disconnect())
  }, [activeFilter])

  return (
    <section aria-labelledby="services-heading" className="section-base">
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: '40px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--color-orange-500)', marginBottom: '12px',
            }}
          >
            Nos Services
          </p>
          <h2
            id="services-heading"
            style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.15,
              letterSpacing: '-0.025em', color: '#0A0B0E', marginBottom: '0',
            }}
          >
            Des solutions digitales complètes pour accélérer<br className="hidden md:block" />
            {' '}votre transformation numérique
          </h2>
        </motion.div>

        {/* ── Filtres tabs — scroll horizontal mobile ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          className="flex justify-center"
          style={{
            overflowX:   'auto',
            scrollbarWidth: 'none',
            marginBottom: '40px',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
            maskImage:       'linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
            paddingInline:   '16px',
          }}
          role="tablist"
          aria-label="Filtrer les services par catégorie"
        >
          <LayoutGroup id="service-filters">
            <div className="flex" style={{ gap: '8px', flexShrink: 0 }}>
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter.id)}
                    className="relative inline-flex items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange-500)]"
                    style={{
                      borderRadius: '999px',
                      fontSize:     'var(--filter-text-size)',
                      color:        isActive ? '#FFFFFF' : '#6B7280',
                      padding:      '8px 16px',
                      border:       'none',
                      cursor:       'pointer',
                      background:   'transparent',
                      flexShrink:   0,
                      whiteSpace:   'nowrap',
                      zIndex:       1,
                    }}
                  >
                    {/* Pill active */}
                    {isActive && (
                      <motion.span
                        layoutId="active-filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: '#1B2A4A', zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {/* Fond inactif */}
                    {!isActive && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', zIndex: -1 }}
                      />
                    )}

                    {filter.label}


                    {/* Badge Beta sur l'onglet Solutions */}
                    {filter.isBeta && (
                      <span
                        aria-label="Beta"
                        style={{
                          padding:      '2px 6px',
                          borderRadius: '4px',
                          marginLeft:   '6px',
                          background:   'var(--color-orange-500)',
                          color:        '#FFFFFF',
                          fontSize:     '10px',
                          fontWeight:   600,
                          lineHeight:   1,
                          flexShrink:   0,
                        }}
                      >
                        Beta
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* ── Contenu — Solutions OU Services ──────────────────── */}
        <AnimatePresence mode="popLayout">
          {isSolutions ? (

            /* ── TAB SOLUTIONS ─────────────────────────────────── */
            <motion.div
              key="solutions-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: EASE }}
              role="tabpanel"
              aria-label="Solutions verticales packagées"
            >
              {/* Grille 3 cards solutions */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '24px', marginBottom: '24px' }}
              >
                {SOLUTIONS.map((solution) => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))}
              </div>

              {/* Bandeau informatif */}
              <div
                className="flex items-start"
                style={{
                  gap:          '12px',
                  padding:      '16px 20px',
                  borderRadius: '12px',
                  background:   '#F8FAFC',
                  border:       '1px solid #E5E7EB',
                }}
              >
                <Info
                  size={15}
                  style={{ color: '#9CA3AF', flexShrink: 0, marginTop: '1px' }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize:   '13px',
                    color:      '#6B7280',
                    lineHeight: 1.65,
                    margin:     0,
                  }}
                >
                  Ces solutions combinent NFC + PWA + Odoo en une offre tout-en-un par secteur.
                  Pas des services séparés — un système complet, déployé en 2 à 6 semaines.
                </p>
              </div>
            </motion.div>

          ) : (

            /* ── TAB SERVICES ───────────────────────────────────── */
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '24px' }}
                role="tabpanel"
                aria-label={`Services\u00A0: ${FILTERS.find(f => f.id === activeFilter)?.label ?? 'Tous'}`}
              >
                {activeFilter === 'all' ? (

                  /* Filtre Tous — 12 cards en DOM, lazy fade pour les groupes 2 et 3 */
                  SERVICES.map((service, idx) => {
                    const isLazy    = idx >= 6
                    const groupIdx  = idx < 9 ? 1 : 2
                    const isVisible = !isLazy || visibleGroups[groupIdx]
                    const delay     = groupIdx === 2 ? '0.2s' : '0s'
                    return (
                      <div
                        key={service.id}
                        ref={
                          idx === 6 ? group2Ref :
                          idx === 9 ? group3Ref :
                          undefined
                        }
                        style={isLazy ? {
                          opacity:    isVisible ? 1 : 0,
                          transform:  isVisible ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 0.8s ease-out ${delay}, transform 0.8s ease-out ${delay}`,
                        } : undefined}
                      >
                        <ServiceCard service={service} />
                      </div>
                    )
                  })

                ) : (

                  /* Filtres spécifiques — comportement inchangé avec animation */
                  <AnimatePresence mode="popLayout">
                    {filteredServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </AnimatePresence>

                )}
              </div>
            </motion.div>

          )}
        </AnimatePresence>

        {/* ── CTA bas — masqué sur l'onglet Solutions ──────────── */}
        {!isSolutions && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="text-center"
            style={{ marginTop: '48px' }}
          >
            <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '16px' }}>
              Vous ne savez pas quelle solution vous convient&nbsp;?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center font-semibold rounded-xl transition-all duration-150"
              style={{ gap: '8px', padding: '13px 28px', fontSize: '14px', background: '#E8622A', color: '#FFFFFF', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9501E'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Discuter de mon projet
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  )
}
