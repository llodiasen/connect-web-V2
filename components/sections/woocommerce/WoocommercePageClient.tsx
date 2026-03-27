'use client'

// Source   : REFONTE-WOOCOMMERCE.md — 11 sections
// URL      : /services/boutique-woocommerce
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Design   : identique à marketplace (section-base/alt/brand, embla, zigzag)

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Root    as AccordionRoot,
  Item    as AccordionItem,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from '@radix-ui/react-accordion'
import {
  DollarSign, Lock, CreditCard, Ban,
  ShoppingCart, Zap, RefreshCw, Layers, MessageCircle,
  Palette, Wallet, Package, Truck, Search, BarChart2, GraduationCap, Headphones,
  Key, Code2, MapPin, Shield,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

const CTA_PROPS = {
  service:         'woocommerce',
  titre:           'Votre boutique WooCommerce\nsur mesure',
  sousTitre:       'Premier échange gratuit — devis sous 24h.',
  titreCarte:      'Démarrons votre boutique WooCommerce',
  sousTitreCarte:  'Premier échange gratuit — devis sous 24h.',
  placeholder:     'Type de boutique, catalogue produits, plateforme actuelle, paiements souhaités...',
  intentionDefaut: 'Créer ma boutique WooCommerce',
} as const

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity:    1,
    y:          0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
}

/* ─────────────────────────────────────────────────────────────────
   HELPERS TYPOGRAPHIE
   ─────────────────────────────────────────────────────────────── */
const H2_STYLE: React.CSSProperties = {
  fontSize:      'clamp(1.25rem, 2.5vw, 2rem)',
  lineHeight:    1.25,
  letterSpacing: '-0.02em',
  color:         '#1B2A4A',
}

const EYEBROW_STYLE: React.CSSProperties = {
  fontFamily:    'var(--font-body)',
  fontSize:      '11px',
  fontWeight:    600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         'var(--color-orange-500)',
  marginBottom:  '12px',
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: DollarSign, title: 'Abonnement mensuel qui s\'accumule',  text: '29$/mois Shopify + 20$/app × 5 apps = 129$/mois. Sur 3 ans, vous avez payé plus que le site lui-même.' },
  { icon: Lock,       title: 'Vos données chez un tiers',           text: 'Shopify héberge tout. Si vous partez, exporter vos données est un cauchemar. Vous êtes captif.' },
  { icon: CreditCard, title: 'Pas de Wave ni Orange Money natif',   text: 'Shopify ne supporte pas les paiements mobiles africains. WooCommerce, si — avec nos plugins custom.' },
  { icon: Ban,        title: 'Limité par la plateforme',            text: 'Besoin d\'une fonction spécifique ? Sur Shopify, vous dépendez des apps. Sur WooCommerce, on développe ce qu\'il vous faut.' },
]

const PILLARS = [
  { num: '01', title: 'WordPress, pas un template',        text: 'Thème 100% custom développé à partir de votre charte. Aucun template générique retouché.' },
  { num: '02', title: 'Paiement africain natif',           text: 'Plugins Wave CI et Orange Money développés sur mesure. Pas un module tiers approximatif.' },
  { num: '03', title: 'Vous êtes propriétaire de tout',   text: 'Code, données, hébergement — tout est à vous. Vous pouvez changer de prestataire demain sans perdre une virgule.' },
]

const WOOCOMMERCE_TYPES = [
  { icon: ShoppingCart,  title: 'WooCommerce standard',         text: 'Boutique WordPress clé en main, catalogue produits, paiements locaux et internationaux.',     link: undefined,  dashed: false },
  { icon: CreditCard,    title: 'WooCommerce + Wave/OM',        text: 'Passerelles paiements mobiles africaines intégrées nativement.',                               link: undefined,  dashed: false },
  { icon: Zap,           title: 'WooCommerce headless',         text: 'Front Next.js + WooCommerce API — performances maximales, UX moderne.',                        link: undefined,  dashed: false },
  { icon: RefreshCw,     title: 'Migration vers WooCommerce',   text: 'On migre votre Shopify, PrestaShop ou autre. Produits, clients, commandes — zéro perte.',      link: undefined,  dashed: false },
  { icon: Layers,        title: 'WooCommerce multi-boutiques',  text: 'Plusieurs boutiques, un seul back-office. Gestion centralisée.',                               link: undefined,  dashed: false },
  { icon: MessageCircle, title: 'Un besoin spécifique ?',       text: 'Décrivez votre projet, on propose la solution.',                                               link: '/contact', dashed: true  },
]

const FEATURES = [
  { icon: Palette,       title: 'Thème WordPress custom',  benefit: 'Unique',          text: 'Design sur mesure à partir de votre identité visuelle.' },
  { icon: Wallet,        title: 'Wave + Orange Money',     benefit: 'Paiement local',  text: 'Plugins custom développés par nos soins. Pas un module tiers.' },
  { icon: Package,       title: 'Catalogue illimité',      benefit: 'Sans limites',    text: 'Variantes, bundles, produits numériques, abonnements.' },
  { icon: Truck,         title: 'Gestion livraisons',      benefit: 'Suivi complet',   text: 'Zones, tarifs, suivi commande automatisé.' },
  { icon: Search,        title: 'SEO WooCommerce',         benefit: 'Visibilité',      text: 'Yoast SEO, schema Product, URLs optimisées.' },
  { icon: BarChart2,     title: 'Analytics',               benefit: 'Data-driven',     text: 'GA4 + dashboard WooCommerce. Rapports de ventes automatiques.' },
  { icon: GraduationCap, title: 'Formation incluse',       benefit: 'Autonomie',       text: '1h de formation. Ajout produits, promos, gestion commandes.' },
  { icon: Headphones,    title: 'Support 30 jours',        benefit: 'Sérénité',        text: 'Corrections et ajustements inclus après lancement.' },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Brief',         duration: '1-2 jours',   text: 'Objectifs, catalogue, charte visuelle.',                  implication: 'haute'   },
  { num: 2, title: 'Design',        duration: '3-5 jours',   text: 'Maquettes Figma : home, catégorie, fiche produit.',       implication: 'haute'   },
  { num: 3, title: 'Développement', duration: '7-14 jours',  text: 'Thème custom + plugins paiements + config.',              implication: 'faible'  },
  { num: 4, title: 'Migration',     duration: '1-3 jours',   text: 'Import catalogue, clients, commandes si existant.',       implication: 'faible'  },
  { num: 5, title: 'SEO & Tests',   duration: '1-2 jours',   text: 'Yoast, GA4, Search Console, tests cross-browser.',        implication: 'faible'  },
  { num: 6, title: 'Lancement',     duration: '1 jour',      text: 'Go-live, formation 1h, support 30 jours activé.',         implication: 'haute'   },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication' },
}

const GUARANTEES = [
  { icon: Key,           title: 'Code 100% votre propriété',             text: 'Le code source, les plugins et les données vous appartiennent dès le jour 1. Hébergé sur votre serveur.' },
  { icon: Wallet,        title: 'Plugins Wave/OM développés sur mesure', text: 'Pas un module tiers approximatif. Nos plugins Wave CI et Orange Money sont testés en production.' },
  { icon: Shield,        title: 'Hébergement et données sous contrôle',  text: '1ère année d\'hébergement incluse. Vos données restent sur votre serveur, jamais chez un tiers.' },
  { icon: Package,       title: 'Catalogue produits illimité',           text: 'WooCommerce ne limite pas le nombre de produits. Variantes, bundles, numériques — tout est possible.' },
  { icon: GraduationCap, title: 'Formation back-office incluse',         text: '1h de formation. Ajout produits, gestion commandes, promotions — vous êtes autonome dès J1.' },
  { icon: Headphones,    title: 'Support 30 jours',                      text: 'Corrections et ajustements inclus pendant 1 mois. WhatsApp, email, on est là.' },
]

const DIFFERENTIATORS = [
  { icon: Key,        title: '100% propriétaire',       text: 'Code, données, hébergement — tout vous appartient. Pas de vendor lock-in.' },
  { icon: Wallet,     title: 'Wave/OM custom',           text: 'Plugins paiement développés par nos soins. Pas un module tiers approximatif.' },
  { icon: DollarSign, title: '0 abonnement mensuel',     text: 'WooCommerce est open-source. Pas de 29$/mois qui s\'accumulent.' },
  { icon: Code2,      title: 'Extensible à l\'infini',   text: 'Besoin d\'une fonction ? On la développe. Pas de limite plateforme.' },
  { icon: MapPin,     title: 'Basés à Dakar',            text: 'On connaît le marché, les usages, les contraintes réseau.' },
  { icon: Shield,     title: 'Support local réactif',    text: 'WhatsApp, email, en personne. 30 jours inclus, maintenance longue durée dispo.' },
]

const FAQ_ITEMS = [
  { q: 'WooCommerce ou Shopify ?',           a: 'WooCommerce = propriétaire, flexible, 0 abonnement. Shopify = plus simple mais abonnement mensuel et données chez eux. On conseille selon votre volume.' },
  { q: 'Budget boutique WooCommerce ?',      a: 'À partir de 450 000 FCFA avec thème custom et paiements locaux intégrés.' },
  { q: 'L\'hébergement est-il inclus ?',     a: 'Oui. 1ère année incluse sur VPS Linux ou Vercel selon l\'architecture.' },
  { q: 'Peut-on migrer depuis Shopify ?',    a: 'Oui. Produits, clients, commandes — migration complète sans perte.' },
  { q: 'Délai de livraison ?',               a: '2 à 4 semaines selon la complexité et le nombre de produits.' },
  { q: 'C\'est quoi WooCommerce headless ?', a: 'Front moderne en Next.js connecté à WooCommerce via API. Performances ×3, UX moderne, SEO optimal. On le recommande pour les projets ambitieux.' },
  { q: 'Le code m\'appartient ?',            a: 'Oui. 100% du code, des plugins et des données dès le jour 1.' },
]

/* Social proof */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'     },
  { target: 98, suffix: '%',    label: 'Clients satisfaits' },
  { target: 4,  suffix: ' sem', label: 'Délai max',         displayValue: '2-4 sem' },
  { target: 24, suffix: 'h',    label: 'Réponse garantie'   },
]
const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const duration  = 1400
    const startTime = performance.now()
    function step(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════════
   MOCKUP — back-office WooCommerce
   ═══════════════════════════════════════════════════════════════ */
function WoocommerceMockup() {
  const products = [
    { name: 'Boubou Wax Premium', price: '45 000', stock: '12' },
    { name: 'Tissu Bazin Riche',  price: '28 000', stock: '47' },
    { name: 'Chaussures Artisan', price: '35 000', stock: '8'  },
  ]
  return (
    <div aria-hidden="true" style={{
      background:   'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border:       '1px solid #1E2535',
      borderRadius: '14px',
      overflow:     'hidden',
      boxShadow:    '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      padding:      '20px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6B7FA3', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          WooCommerce · Admin
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '100px', padding: '3px 10px',
          fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#22C55E',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }} />
          En ligne
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
        {[
          { label: 'Commandes', value: '94', unit: 'ce mois' },
          { label: 'CA net',    value: '3.1M', unit: 'FCFA' },
          { label: 'Produits',  value: '∞', unit: 'illimités' },
        ].map(s => (
          <div key={s.label} style={{
            background:   'rgba(255,255,255,0.04)',
            border:       '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding:      '10px',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#F4F7FC', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#6B7FA3', marginTop: '2px' }}>{s.unit}</p>
          </div>
        ))}
      </div>

      {/* Products list */}
      <div style={{ marginBottom: '14px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Catalogue produits
        </p>
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 10px',
              background:   'rgba(255,255,255,0.03)',
              border:       '1px solid rgba(255,255,255,0.06)',
              borderRadius: '7px',
              marginBottom: '6px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: '#CBD5E0' }}>{p.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--color-orange-500)' }}>{p.price} FCFA</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#6B7FA3' }}>Stock: {p.stock}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ownership badge */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {['🔑 Votre propriété', '🌊 Wave natif', '💳 0 commission'].map(b => (
          <span key={b} style={{
            fontFamily:  'var(--font-body)', fontSize: '10px', fontWeight: 600,
            background:  'rgba(232,97,26,0.10)', border: '1px solid rgba(232,97,26,0.20)',
            color:       'var(--color-orange-400)', borderRadius: '6px', padding: '4px 10px',
          }}>{b}</span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const pills = [
    { label: '100% propriétaire', delay: 0,   position: { top: '-18px', right: '6%' }     as React.CSSProperties },
    { label: 'Wave + OM',         delay: 1.2, position: { bottom: '32%', left: '-24px' }  as React.CSSProperties },
    { label: '0 abonnement',      delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
  ]

  return (
    <section className="hero-bg" style={{ paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}>
      <div className="container">
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap:                 '48px',
          alignItems:          'center',
        }}>
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '20px' }}>
              <span style={EYEBROW_STYLE}>Service · Boutique WooCommerce</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Votre boutique en ligne<br />100% propriétaire,<br />
              <span style={{ color: 'var(--color-orange-500)' }}>0% de commission.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              WordPress + WooCommerce sur mesure. Wave et Orange Money intégrés. Vos données vous appartiennent.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display:      'inline-block',
                fontFamily:   'var(--font-body)',
                fontSize:     '13px',
                fontWeight:   500,
                color:        '#CBD5E0',
                background:   'rgba(255,255,255,0.08)',
                border:       '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                padding:      '6px 14px',
              }}>
                100% propriétaire · Wave natif · Catalogue illimité
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=woocommerce"
                className="font-body font-semibold"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     '#E8622A',
                  color:          '#FFFFFF',
                  fontSize:       '15px',
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  transition:     'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C9501E'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#E8622A'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              >
                Créer ma boutique <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="font-body font-semibold"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  height:         '52px',
                  padding:        '0 24px',
                  background:     'transparent',
                  color:          '#F9FAFB',
                  fontSize:       '15px',
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  border:         '1.5px solid rgba(255,255,255,0.3)',
                  transition:     'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.12)'; el.style.borderColor = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                Voir nos boutiques
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <WoocommerceMockup />
            {pills.map(({ label, delay, position }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
                style={{
                  position:     'absolute',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '8px',
                  background:   '#FFFFFF',
                  border:       '1px solid #E5E7EB',
                  borderRadius: '9999px',
                  padding:      '7px 14px 7px 10px',
                  boxShadow:    '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
                  zIndex:       10,
                  ...position,
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-orange-500)', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: '#1B2A4A', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 02 · SOCIAL PROOF
   ═══════════════════════════════════════════════════════════════ */
function SocialProofSection() {
  return (
    <section className="section-base" style={{ paddingTop: '3rem' }}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-heading font-bold"
          style={{
            textAlign:     'center',
            color:         'var(--text-primary)',
            fontSize:      'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight:    1.15,
            letterSpacing: '-0.025em',
            marginBottom:  'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          Ils nous font confiance
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '1px',
            background:          'var(--border-default)',
            border:              '1px solid var(--border-default)',
            borderRadius:        '16px',
            overflow:            'hidden',
            marginBottom:        'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {SP_METRICS.map(({ target, suffix, label, displayValue }) => (
            <div
              key={label}
              style={{
                background:    '#FFFFFF',
                padding:       'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
                textAlign:     'center',
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           '6px',
              }}
            >
              <span
                className="font-heading font-bold"
                style={{
                  fontSize:           'clamp(1.5rem, 2.5vw, 2rem)',
                  lineHeight:         1,
                  letterSpacing:      '-0.04em',
                  color:              'var(--color-orange-500)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {displayValue ?? <AnimatedCounter target={target} suffix={suffix} />}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>
                {label}
              </span>
              <span aria-hidden="true" style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-orange-500)', borderRadius: '2px', marginTop: '2px', opacity: 0.4 }} />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px' }}>
            ILS NOUS FONT CONFIANCE
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {LOGO_WIDTHS.map((w, i) => (
              <div key={i} aria-hidden="true" style={{ width: `${w}px`, height: '36px', background: '#F1F3F7', borderRadius: '6px', border: '1px solid var(--border-subtle)' }} />
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.6 }}>
            Boutiques, PME et entrepreneurs au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 03 · PROBLÈMES
   ═══════════════════════════════════════════════════════════════ */
function ProblemsSection() {
  return (
    <section aria-labelledby="problems-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <p style={EYEBROW_STYLE}>Vos défis</p>
          <h2 id="problems-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Pourquoi quitter Shopify (ou ne pas y aller)
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '16px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {PROBLEMS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{ padding: '28px', border: '1px solid #E2E8F0', borderRadius: '12px', background: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
            >
              <motion.div
                variants={iconHover} initial="rest" whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3 className="font-heading font-bold text-[--text-primary]" style={{ fontSize: '20px', marginBottom: '10px' }}>
                {title}
              </h3>
              <p className="font-body text-[--text-secondary]" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}>
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 04 · APPROCHE
   ═══════════════════════════════════════════════════════════════ */
function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="section-brand">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ ...EYEBROW_STYLE }}>Notre méthode</p>
          <h2 id="approach-heading" className="font-heading font-bold" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            Votre boutique, vos règles
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row" style={{ alignItems: 'flex-start' }}>
          {PILLARS.map(({ num, title, text }, i) => (
            <div key={num} style={{ flex: 1, display: 'contents' }}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div className="font-heading font-bold" style={{
                  width:          '56px',
                  height:         '56px',
                  borderRadius:   '50%',
                  background:     'rgba(232,97,26,0.12)',
                  border:         '1px solid rgba(232,97,26,0.35)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '16px',
                  fontWeight:     700,
                  color:          'var(--color-orange-500)',
                  marginBottom:   '20px',
                  flexShrink:     0,
                  letterSpacing:  '0.02em',
                }}>
                  {num}
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '20px', color: '#F9FAFB', marginBottom: '10px', lineHeight: 1.3 }}>
                  {title}
                </h3>
                <p className="font-body" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', color: '#CBD5E0', lineHeight: 1.7 }}>
                  {text}
                </p>
              </motion.div>

              {i < PILLARS.length - 1 && (
                <>
                  <div className="hidden md:flex" aria-hidden="true" style={{ width: '64px', paddingTop: '27px', alignItems: 'flex-start', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '2px', borderTop: '2px dashed rgba(232,97,26,0.35)' }} />
                  </div>
                  <div className="flex md:hidden" aria-hidden="true" style={{ height: '36px', paddingLeft: '27px', alignSelf: 'stretch', marginTop: '4px', marginBottom: '4px' }}>
                    <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, rgba(232,97,26,0.4), rgba(232,97,26,0.1))', borderRadius: '2px' }} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 05 · TYPES DE BOUTIQUES (grille 3×2)
   ═══════════════════════════════════════════════════════════════ */
function TypesSection() {
  return (
    <section aria-labelledby="types-heading" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 id="types-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Quel type de boutique WooCommerce ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {WOOCOMMERCE_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
            const card = (
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{
                  padding:       '28px',
                  background:    '#FFFFFF',
                  border:        dashed ? '1.5px dashed #CBD5E0' : '1px solid rgba(0,0,0,0.07)',
                  borderRadius:  '16px',
                  boxShadow:     '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  display:       'flex',
                  flexDirection: 'column',
                  height:        '100%',
                }}
              >
                <div style={{
                  width:          '44px',
                  height:         '44px',
                  borderRadius:   '10px',
                  background:     dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   '16px',
                  flexShrink:     0,
                  color:          dashed ? '#94A3B8' : 'var(--color-orange-500)',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold" style={{
                  fontSize:    '18px',
                  color:       dashed ? '#94A3B8' : 'var(--text-primary)',
                  marginBottom:'10px',
                  lineHeight:  1.3,
                  textAlign:   'left',
                }}>
                  {title}
                </h3>
                <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'left', flexGrow: 1 }}>
                  {text}
                </p>
                {link && (
                  <span className="font-body font-medium inline-flex items-center" style={{ marginTop: '16px', gap: '6px', fontSize: '13px', color: dashed ? '#94A3B8' : 'var(--color-blue-800)' }}>
                    {dashed ? 'Discuter de mon projet' : 'En savoir plus'}
                    <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                  </span>
                )}
              </motion.div>
            )
            return link ? (
              <Link key={title} href={link} style={{ textDecoration: 'none', display: 'flex' }}>
                {card}
              </Link>
            ) : (
              <div key={title} style={{ display: 'flex' }}>
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 06 · FONCTIONNALITÉS (slider Embla — 8 items)
   ═══════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

  return (
    <section aria-labelledby="features-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 id="features-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Ce que votre boutique inclut
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, title, benefit, text }) => (
              <div key={title} style={{
                flex:          '0 0 calc(25% - 12px)',
                padding:       '24px',
                background:    '#FFFFFF',
                border:        '1px solid #E2E8F0',
                borderRadius:  '12px',
                boxShadow:     'var(--shadow-sm)',
                display:       'flex',
                flexDirection: 'column',
              }}>
                <motion.div
                  variants={iconHover} initial="rest" whileHover="hover"
                  className="flex items-center justify-center rounded-[--border-radius-md]"
                  style={{ width: '44px', height: '44px', marginBottom: '14px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--color-orange-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {benefit}
                </div>
                <h3 className="font-heading font-bold text-[--text-primary]" style={{ fontSize: '20px', marginBottom: '8px' }}>
                  {title}
                </h3>
                <p className="font-body text-[--text-secondary] flex-grow" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Précédent" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #CBD5E0', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4A5568' }}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Suivant" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #CBD5E0', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4A5568' }}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 07 · PROCESSUS (timeline zigzag)
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection() {
  function StepCard({ title, duration, text, impl }: {
    title: string; duration: string; text: string
    impl: { color: string; bg: string; label: string } | undefined
  }) {
    const isOrange = impl?.color === '#E8611A'
    return (
      <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <h3 className="font-heading font-bold" style={{ fontSize: '18px', color: '#F9FAFB', lineHeight: 1.3 }}>{title}</h3>
          <span className="font-body" style={{ fontSize: '12px', fontWeight: 500, color: '#CBD5E0', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '4px', flexShrink: 0 }}>
            {duration}
          </span>
          {impl && (
            <span className="font-body" style={{ fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#FFFFFF', background: isOrange ? 'rgba(232,97,26,0.85)' : 'rgba(59,130,246,0.30)', padding: '3px 10px', borderRadius: '4px' }}>
              {impl.label}
            </span>
          )}
        </div>
        <p className="font-body" style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}>{text}</p>
      </div>
    )
  }

  return (
    <section aria-labelledby="process-heading" className="section-brand">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <p style={{ ...EYEBROW_STYLE }}>Notre méthode</p>
          <h2 id="process-heading" className="font-heading font-bold" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            Du brief au lancement
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div className="hidden lg:block" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '50%', width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)', zIndex: 0 }} />
          <div className="block lg:hidden" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '23px', width: '2px', background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)', zIndex: 0 }} />

          {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
            const impl   = IMPLICATION_CONFIG[implication]
            const isLeft = i % 2 === 0
            const circle = (
              <div style={{
                width:          '48px',
                height:         '48px',
                borderRadius:   '50%',
                background:     '#2D3E5F',
                border:         '2px solid rgba(232,97,26,0.5)',
                boxShadow:      '0 0 0 3px rgba(232,97,26,0.15)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
                position:       'relative',
                zIndex:         1,
              }}>
                <span className="font-heading font-bold" style={{ fontSize: '13px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '0.03em' }}>
                  {String(num).padStart(2, '0')}
                </span>
              </div>
            )

            return (
              <motion.div key={num} custom={i} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} style={{ marginBottom: i < PROCESS_STEPS.length - 1 ? '28px' : '0' }}>
                <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center' }}>
                  <div style={{ paddingRight: '32px' }}>
                    {isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>{circle}</div>
                  <div style={{ paddingLeft: '32px' }}>
                    {!isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                </div>
                <div className="flex lg:hidden" style={{ alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>{circle}</div>
                  <div style={{ flex: 1, paddingTop: '4px' }}>
                    <StepCard title={title} duration={duration} text={text} impl={impl} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 08 · GARANTIES
   ═══════════════════════════════════════════════════════════════ */
function GuaranteesSection() {
  return (
    <section aria-labelledby="guarantees-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={EYEBROW_STYLE}>Preuves</p>
          <h2 id="guarantees-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Pourquoi nous faire confiance
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '20px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {GUARANTEES.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              style={{
                padding:       '28px',
                background:    '#FFFFFF',
                border:        '1px solid rgba(0,0,0,0.07)',
                borderRadius:  '16px',
                boxShadow:     '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                display:       'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{
                width:          '44px',
                height:         '44px',
                borderRadius:   '10px',
                background:     'rgba(232,97,26,0.10)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                marginBottom:   '16px',
                flexShrink:     0,
                color:          'var(--color-orange-500)',
              }}>
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold" style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.3 }}>
                {title}
              </h3>
              <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, flexGrow: 1 }}>
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 09 · CE QUI FAIT LA DIFFÉRENCE
   ═══════════════════════════════════════════════════════════════ */
function DifferentiatorsSection() {
  return (
    <section aria-labelledby="diff-heading" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 id="diff-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Ce qui fait la différence
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {DIFFERENTIATORS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{ padding: '28px', border: '1px solid #E2E8F0', borderRadius: '12px', background: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
            >
              <motion.div
                variants={iconHover} initial="rest" whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3 className="font-heading font-bold text-[--text-primary]" style={{ fontSize: '20px', marginBottom: '10px' }}>
                {title}
              </h3>
              <p className="font-body text-[--text-secondary]" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}>
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 · FAQ (Accordion Radix UI)
   ═══════════════════════════════════════════════════════════════ */
function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 id="faq-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Questions fréquentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ maxWidth: '760px', margin: '0 auto' }}
        >
          <AccordionRoot type="single" collapsible>
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <AccordionTrigger style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBlock: '20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
                  <span className="font-heading font-semibold text-[--text-primary]" style={{ fontSize: 'var(--faq-question-size)' }}>
                    {q}
                  </span>
                  <ChevronDown size={18} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden="true" />
                </AccordionTrigger>
                <AccordionContent style={{ paddingBottom: '20px' }}>
                  <p className="font-body text-[--text-secondary]" style={{ fontSize: 'var(--faq-answer-size)', lineHeight: 1.7, textAlign: 'justify' }}>
                    {a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function WoocommercePageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <TypesSection />
      <FeaturesSection />
      <ProcessSection />
      <GuaranteesSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
