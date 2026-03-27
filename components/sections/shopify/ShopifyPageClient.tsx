'use client'

// Source   : REFONTE-SHOPIFY.md
// URL      : /services/shopify
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Design   : identique à architecture-api (section-base/alt/brand, embla, zigzag)

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
  Copy, CreditCard, Puzzle, SearchX, ShoppingBag, RefreshCw, Zap,
  Store, MessageCircle, Palette, Wallet, Search, Mail, BarChart2,
  Package, GraduationCap, Headphones, MapPin, Clock, Shield,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

const CTA_PROPS = {
  service:         'shopify',
  titre:           'Lancez votre boutique Shopify en 2 semaines',
  sousTitre:       'Premier échange gratuit — devis sous 24h.',
  titreCarte:      'Démarrons votre boutique Shopify',
  sousTitreCarte:  'Premier échange gratuit — devis sous 24h.',
  placeholder:     'Type de boutique, catalogue produits, plateforme actuelle, intégrations souhaitées...',
  intentionDefaut: 'Créer ma boutique Shopify',
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
  { icon: Copy,       title: 'Thème générique',              text: 'Même design que des milliers de boutiques. Vos clients ne vous distinguent pas de la concurrence.' },
  { icon: CreditCard, title: 'Pas de Wave ni Orange Money',  text: 'Shopify ne supporte pas nativement les paiements mobiles africains. Vos clients abandonnent au checkout.' },
  { icon: Puzzle,     title: 'Apps coûteuses et complexes',  text: '20$/mois par app, 10 apps installées = 200$/mois. Et aucune ne fait exactement ce dont vous avez besoin.' },
  { icon: SearchX,    title: 'Invisible sur Google',         text: 'SEO Shopify mal configuré : URLs dupliquées, meta vides, schema absent. Vos produits n\'apparaissent pas.' },
]

const PILLARS = [
  { num: '01', title: 'Design unique',              text: 'Thème Liquid conçu à partir de votre identité visuelle. Pas de template générique customisé.' },
  { num: '02', title: 'Paiements africains natifs', text: 'Wave CI et Orange Money intégrés en standard. Vos clients paient comme ils en ont l\'habitude.' },
  { num: '03', title: 'Vous êtes autonome',         text: 'Formation Shopify incluse. Ajout produits, gestion commandes, promotions — vous faites tout seul.' },
]

const SHOP_TYPES = [
  { icon: ShoppingBag,    title: 'Boutique standard',         text: 'Thème premium customisé, catalogue produits, paiements locaux et internationaux.', link: undefined,   dashed: false },
  { icon: CreditCard,     title: 'Shopify + Wave/OM',         text: 'Paiements mobiles africains intégrés en standard. Checkout optimisé mobile.',                  link: undefined,   dashed: false },
  { icon: RefreshCw,      title: 'Migration vers Shopify',    text: 'On migre votre boutique WooCommerce, PrestaShop ou autre vers Shopify sans perte.',           link: undefined,   dashed: false },
  { icon: Zap,            title: 'Shopify avancé',            text: 'Klaviyo, Metafields, automatisations marketing, apps sur mesure.',                            link: undefined,   dashed: false },
  { icon: Store,          title: 'Shopify + point de vente',  text: 'Shopify POS connecté. Stock unifié boutique physique + en ligne.',                            link: undefined,   dashed: false },
  { icon: MessageCircle,  title: 'Un besoin spécifique ?',    text: 'Décrivez votre projet, on propose la solution.',                                               link: '/contact',  dashed: true  },
]

const FEATURES = [
  { icon: Palette,       title: 'Thème Liquid custom',   benefit: 'Unique',        text: 'Design sur mesure, pas un template retouché.' },
  { icon: Wallet,        title: 'Wave + Orange Money',   benefit: 'Paiement local', text: 'Vos clients sénégalais paient en 2 taps.' },
  { icon: Search,        title: 'SEO complet',           benefit: 'Visibilité',    text: 'URLs propres, schema Product, meta optimisées.' },
  { icon: Mail,          title: 'Emails automatiques',   benefit: 'Rétention',     text: 'Klaviyo ou Brevo connectés. Relance abandon panier.' },
  { icon: BarChart2,     title: 'Analytics',             benefit: 'Data-driven',   text: 'GA4 + Hotjar configurés. Comportement client visible.' },
  { icon: Package,       title: 'Migration catalogue',   benefit: 'Zéro perte',    text: 'Import produits, clients, commandes depuis votre ancienne plateforme.' },
  { icon: GraduationCap, title: 'Formation incluse',     benefit: 'Autonomie',     text: '1h de formation back-office Shopify. Vous gérez seul.' },
  { icon: Headphones,    title: 'Support 30 jours',      benefit: 'Sérénité',      text: 'Corrections et ajustements inclus 1 mois après lancement.' },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Brief',         duration: '1-2 jours', text: 'Objectifs, catalogue existant, charte visuelle.',    implication: 'haute'  },
  { num: 2, title: 'Design',        duration: '3-4 jours', text: 'Maquettes Figma : home, fiche produit, checkout.',   implication: 'haute'  },
  { num: 3, title: 'Développement', duration: '5-7 jours', text: 'Thème Liquid + intégrations Wave/OM + apps.',        implication: 'faible' },
  { num: 4, title: 'Migration',     duration: '1-2 jours', text: 'Import catalogue produits et clients.',               implication: 'faible' },
  { num: 5, title: 'SEO & Tests',   duration: '1-2 jours', text: 'GA4, Search Console, schema markup, cross-browser.', implication: 'faible' },
  { num: 6, title: 'Lancement',     duration: '1 jour',    text: 'Go-live, formation 1h, support 30 jours activé.',    implication: 'haute'  },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:  { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  faible: { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication' },
}

const GUARANTEES = [
  { icon: Palette,       title: 'Thème Liquid 100% custom',       text: 'Design conçu pour votre marque. Aucun template retouché, aucun concurrent avec le même rendu.' },
  { icon: Wallet,        title: 'Wave + Orange Money en standard', text: 'Paiements mobiles africains intégrés sur chaque boutique. Pas un plugin bricolé.' },
  { icon: GraduationCap, title: 'Formation back-office incluse',   text: '1h de formation. Ajout produits, gestion commandes, promotions — vous êtes autonome dès J1.' },
  { icon: Headphones,    title: 'Support 30 jours',                text: 'Corrections et ajustements inclus pendant 1 mois. WhatsApp, email, on est là.' },
  { icon: Search,        title: 'SEO complet (schema + meta)',     text: 'URLs propres, schema Product, meta optimisées. Vos produits apparaissent sur Google.' },
  { icon: Package,       title: 'Migration catalogue sans perte',  text: 'Produits, clients, commandes importés depuis WooCommerce, PrestaShop ou autre. Zéro donnée perdue.' },
]

const DIFFERENTIATORS = [
  { icon: MapPin,        title: 'Experts paiement africain', text: 'Wave CI et Orange Money intégrés sur chaque boutique. Pas un plugin bricolé.' },
  { icon: Palette,       title: 'Design unique Liquid',      text: 'Thème conçu pour votre marque, pas un template retouché.' },
  { icon: Clock,         title: '2 semaines, pas 2 mois',    text: 'Process rodé. Brief → design → dev → lancement en 14 jours.' },
  { icon: GraduationCap, title: 'Vous êtes autonome',        text: 'Formation incluse. Ajout produits, promos, commandes — vous faites tout.' },
  { icon: Store,         title: 'Online + physique',         text: 'Shopify POS configuré si vous avez une boutique physique.' },
  { icon: Shield,        title: 'Support réactif',           text: '30 jours inclus. WhatsApp, email, on est là.' },
]

const FAQ_ITEMS = [
  { q: 'Budget boutique Shopify ?',                          a: 'À partir de 500 000 FCFA avec thème custom et paiements locaux intégrés.', link: undefined },
  { q: 'Shopify ou WooCommerce pour le Sénégal ?',           a: 'Shopify est plus simple à gérer au quotidien. WooCommerce est plus flexible et sans abonnement. On conseille selon votre volume et votre niveau technique.', link: undefined },
  { q: 'L\'abonnement Shopify est-il inclus ?',              a: 'Non. Shopify Basic à 29 $/mois est à votre charge. On vous aide à choisir le bon plan.', link: undefined },
  { q: 'Peut-on vendre en boutique physique aussi ?',        a: 'Oui. Shopify POS connecte boutique en ligne et physique — stock unifié en temps réel.', link: undefined },
  { q: 'Délai de livraison ?',                               a: '2 à 3 semaines selon complexité du thème et nombre de produits.', link: undefined },
  { q: 'Peut-on migrer depuis WooCommerce ?',                a: 'Oui. Produits, clients, commandes — migration complète sans perte de données.', link: undefined },
  { q: 'Wave et Orange Money fonctionnent sur Shopify ?',    a: 'Oui. On intègre Wave CI et Orange Money nativement. Vos clients sénégalais paient en 2 taps.', link: undefined },
]

const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'           },
  { target: 98, suffix: '%',    label: 'Clients satisfaits'        },
  { target: 2,  suffix: ' sem', label: 'Délai boutique Shopify', displayValue: '2 sem' },
  { target: 24, suffix: 'h',    label: 'Réponse garantie'         },
]
const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   COMPTEUR ANIMÉ
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
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
            textAlign: 'center', color: 'var(--text-primary)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          Ils nous font confiance
        </motion.h2>

        {/* Grille métriques */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'var(--border-default)',
            border: '1px solid var(--border-default)', borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {SP_METRICS.map(({ target, suffix, label, displayValue }) => (
            <div
              key={label}
              style={{
                background: '#FFFFFF',
                padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
                textAlign: 'center', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
              }}
            >
              <span
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1,
                  letterSpacing: '-0.04em', color: 'var(--color-orange-500)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {displayValue ?? <AnimatedCounter target={target} suffix={suffix} />}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: 'var(--text-secondary)', letterSpacing: '0.01em',
              }}>
                {label}
              </span>
              <span aria-hidden="true" style={{
                display: 'block', width: '24px', height: '2px',
                background: 'var(--color-orange-500)', borderRadius: '2px',
                marginTop: '2px', opacity: 0.4,
              }} />
            </div>
          ))}
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
            color: 'var(--text-tertiary)', letterSpacing: '0.08em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px',
          }}>
            ILS NOUS FONT CONFIANCE
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {LOGO_WIDTHS.map((w, i) => (
              <div key={i} aria-hidden="true" style={{
                width: `${w}px`, height: '36px',
                background: '#F1F3F7', borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
              }} />
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.6,
          }}>
            Boutiques en ligne au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO MOCKUP
   ═══════════════════════════════════════════════════════════════ */
function ShopifyStoreMockup() {
  return (
    <div aria-hidden="true" style={{
      background: 'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border: '1px solid #1E2535', borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      padding: '20px',
    }}>
      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
        <div style={{
          flex: 1, marginLeft: '8px', height: '22px',
          background: 'rgba(255,255,255,0.06)', borderRadius: '5px',
          display: 'flex', alignItems: 'center', padding: '0 10px',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
            votre-boutique.myshopify.com
          </span>
        </div>
      </div>

      {/* Product cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        {[
          { label: 'Boubou Wax', price: '45 000 FCFA', tag: 'Nouveau' },
          { label: 'Tissu Bazin',  price: '28 000 FCFA', tag: 'Top vente' },
        ].map(({ label, price, tag }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.07)', borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden',
          }}>
            <div style={{ height: '72px', background: 'linear-gradient(135deg, #1E2535 0%, #252D3F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '22px' }}>🛍️</span>
            </div>
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '8px', fontWeight: 600, color: 'var(--color-orange-500)', background: 'rgba(232,97,26,0.15)', padding: '2px 5px', borderRadius: '3px', whiteSpace: 'nowrap' }}>
                  {tag}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>{price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '10px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Paiement
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['🌊 Wave', '🍊 Orange Money', '💳 CB'].map(m => (
            <span key={m} style={{
              fontFamily: 'var(--font-body)', fontSize: '8px', fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '4px', padding: '3px 6px', whiteSpace: 'nowrap',
            }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { label: 'Thème custom',  delay: 0,   position: { top: '-18px', right: '6%' }  as React.CSSProperties },
    { label: 'Wave + OM',     delay: 1.2, position: { bottom: '30%', left: '-28px' } as React.CSSProperties },
    { label: '2 semaines',    delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
  ]

  return (
    <section className="hero-bg" style={{ paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '48px', alignItems: 'center',
        }}>
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '20px' }}>
              <span style={EYEBROW_STYLE}>Service · Boutique Shopify</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Votre boutique Shopify<br />sur mesure,<br />opérationnelle{' '}
              <span style={{ color: 'var(--color-orange-500)' }}>en 2 semaines.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              Thème Liquid custom, Wave et Orange Money intégrés, SEO optimisé.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                Thème custom · Wave natif · 2 semaines
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=shopify"
                className="font-body font-semibold"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  height: '52px', padding: '0 32px',
                  background: '#E8622A', color: '#FFFFFF',
                  fontSize: '15px', borderRadius: '8px', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C9501E'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#E8622A'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              >
                Créer ma boutique Shopify <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="font-body font-semibold"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  height: '52px', padding: '0 24px',
                  background: 'transparent', color: '#F9FAFB',
                  fontSize: '15px', borderRadius: '8px', textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.12)'; el.style.borderColor = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                Voir nos boutiques
              </Link>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <ShopifyStoreMockup />
            {pills.map(({ label, delay, position }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
                style={{
                  position: 'absolute', display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '9999px',
                  padding: '7px 14px 7px 10px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
                  zIndex: 10,
                  ...position,
                }}
              >
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--color-orange-500)', flexShrink: 0,
                }} />
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
            Votre boutique Shopify mérite mieux
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
          <p style={{ ...EYEBROW_STYLE }}>NOTRE MÉTHODE</p>
          <h2 id="approach-heading" className="font-heading font-bold" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            Du brief au lancement en 2 semaines
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
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(232,97,26,0.12)', border: '1px solid rgba(232,97,26,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 700, color: 'var(--color-orange-500)',
                  marginBottom: '20px', flexShrink: 0, letterSpacing: '0.02em',
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
   SECTION 05 · TYPES DE BOUTIQUES (slider Embla — 6 items)
   ═══════════════════════════════════════════════════════════════ */
function TypesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

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
            Quel type de boutique Shopify ?
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {SHOP_TYPES.map(({ icon: Icon, title, text, link, dashed }) => {
              const card = (
                <div style={{
                  flex: '0 0 calc(33.333% - 14px)',
                  minWidth: '260px',
                  padding: '28px', background: '#FFFFFF',
                  border: dashed ? '1.5px dashed #CBD5E0' : '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', height: '100%',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px', flexShrink: 0,
                    color: dashed ? '#94A3B8' : 'var(--color-orange-500)',
                  }}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold" style={{
                    fontSize: '18px', color: dashed ? '#94A3B8' : 'var(--text-primary)',
                    marginBottom: '10px', lineHeight: 1.3, textAlign: 'left',
                  }}>
                    {title}
                  </h3>
                  <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'left', flexGrow: 1 }}>
                    {text}
                  </p>
                  {link && (
                    <span className="font-body font-medium inline-flex items-center" style={{ marginTop: '16px', gap: '6px', fontSize: '13px', color: dashed ? '#94A3B8' : 'var(--color-blue-800)' }}>
                      Discuter de mon projet <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                    </span>
                  )}
                </div>
              )
              return link ? (
                <Link key={title} href={link} style={{ textDecoration: 'none', display: 'flex', flex: '0 0 calc(33.333% - 14px)', minWidth: '260px' }}>
                  {card}
                </Link>
              ) : (
                <div key={title} style={{ display: 'flex', flex: '0 0 calc(33.333% - 14px)', minWidth: '260px' }}>
                  {card}
                </div>
              )
            })}
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
            Ce que votre boutique Shopify inclut
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, title, benefit, text }) => (
              <div key={title} style={{
                flex: '0 0 calc(25% - 12px)',
                padding: '24px', background: '#FFFFFF',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
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
            <span className="font-body" style={{ fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#FFFFFF', background: isOrange ? 'rgba(232,97,26,0.85)' : 'rgba(34,197,94,0.30)', padding: '3px 10px', borderRadius: '4px' }}>
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
          <p style={{ ...EYEBROW_STYLE }}>NOTRE MÉTHODE</p>
          <h2 id="process-heading" className="font-heading font-bold" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            Du brief au lancement
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Ligne centrale desktop */}
          <div className="hidden lg:block" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '50%', width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)', zIndex: 0 }} />
          {/* Ligne latérale mobile */}
          <div className="block lg:hidden" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '23px', width: '2px', background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)', zIndex: 0 }} />

          {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
            const impl = IMPLICATION_CONFIG[implication]
            const isLeft = i % 2 === 0
            const circle = (
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#2D3E5F', border: '2px solid rgba(232,97,26,0.5)',
                boxShadow: '0 0 0 3px rgba(232,97,26,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
              }}>
                <span className="font-heading font-bold" style={{ fontSize: '13px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '0.03em' }}>
                  {String(num).padStart(2, '0')}
                </span>
              </div>
            )

            return (
              <motion.div key={num} custom={i} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} style={{ marginBottom: i < PROCESS_STEPS.length - 1 ? '28px' : '0' }}>
                {/* Desktop zigzag */}
                <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center' }}>
                  <div style={{ paddingRight: '32px' }}>
                    {isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>{circle}</div>
                  <div style={{ paddingLeft: '32px' }}>
                    {!isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                </div>
                {/* Mobile vertical */}
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
                padding: '28px', background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(232,97,26,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', flexShrink: 0,
                color: 'var(--color-orange-500)',
              }}>
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold" style={{
                fontSize: '17px', color: 'var(--text-primary)',
                marginBottom: '10px', lineHeight: 1.3,
              }}>
                {title}
              </h3>
              <p className="font-body" style={{
                fontSize: '14px', color: 'var(--text-secondary)',
                lineHeight: 1.75, flexGrow: 1,
              }}>
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
   SECTION 09 · DIFFÉRENCIATEURS
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
            {FAQ_ITEMS.map(({ q, a, link }, i) => (
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
                  {link && (
                    <Link href={(link as { href: string }).href} className="font-body font-semibold inline-flex items-center transition-colors duration-200" style={{ fontSize: '14px', color: 'var(--color-orange-500)', textDecoration: 'none', marginTop: '12px' }}>
                      {(link as { label: string }).label}
                    </Link>
                  )}
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
export function ShopifyPageClient() {
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
