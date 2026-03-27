'use client'

// Source   : CONTENT.md > PAGE : Email Marketing
// URL      : /services/email-marketing
// REFONTE  : REFONTE-EMAIL-MARKETING.md — 11 sections
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Typo de référence : logiciels-saas (clamp H2, 20px H3, font-body text-secondary)

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
  Mail, MailX, ShoppingCart, Unplug, Palette,
  GitBranch, ShoppingBag, BarChart2, MessageCircle,
  Settings, Users, Workflow, Plug, Shield, Headphones,
  Target, MapPin, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

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
   HELPERS TYPOGRAPHIE — identiques à logiciels-saas
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
  {
    icon:  MailX,
    title: "Taux d'ouverture <15%",
    text:  "Objet générique, pas de segmentation, même message pour tout le monde. Votre email marketing ne fonctionne pas.",
  },
  {
    icon:  ShoppingCart,
    title: 'Abandon panier sans relance',
    text:  "70% de paniers abandonnés. Sans séquence email automatique d'abandon panier, ces ventes sont perdues.",
  },
  {
    icon:  Unplug,
    title: 'Outil déconnecté',
    text:  "Votre outil email ne parle pas à votre CRM ni à votre boutique. Les données sont en silos.",
  },
  {
    icon:  Palette,
    title: 'Templates génériques',
    text:  "Emails qui ne ressemblent pas à votre marque. Aucun template email sur mesure, aucune identité cohérente.",
  },
]

const PILLARS = [
  {
    num:   '01',
    title: 'Le bon outil pour vous',
    text:  "Klaviyo pour l'email marketing e-commerce. Brevo pour les PME sénégalaises (prix FCFA). Mailchimp pour débuter. On conseille selon votre contexte.",
  },
  {
    num:   '02',
    title: 'Automatisation email intelligente',
    text:  "Welcome, séquence abandon panier, post-achat, nurturing — vos emails tournent pendant que vous dormez.",
  },
  {
    num:   '03',
    title: 'Mesure et optimisation',
    text:  "Dashboard revenus par email, A/B testing objets, taux conversion. On ajuste votre email marketing en continu.",
  },
]

const EMAIL_TYPES = [
  { icon: Mail,          title: 'Configuration Mailchimp/Brevo/Klaviyo', text: "Configuration complète de votre outil email. Domaine, SPF/DKIM, listes, segmentation.",                                    link: undefined,           dashed: false },
  { icon: GitBranch,     title: 'Séquences email automatisées',          text: "Welcome, abandon panier, relance, nurturing. Automatisation email qui vend pendant que vous dormez.",                           link: undefined,           dashed: false },
  { icon: ShoppingBag,   title: 'Email marketing e-commerce',            text: "Klaviyo + Shopify ou WooCommerce connectés. Segmentation achat, post-achat, cross-sell.",                                       link: '/services/shopify', dashed: false },
  { icon: Palette,       title: 'Templates email sur mesure',            text: "Design HTML responsive à votre image. Pas un template email générique retouché.",                                               link: undefined,           dashed: false },
  { icon: BarChart2,     title: 'Audit & optimisation',                  text: "On analyse vos campagnes email existantes et propose un plan d'amélioration.",                                                   link: undefined,           dashed: false },
  { icon: MessageCircle, title: 'Un besoin spécifique ?',                text: "Décrivez votre besoin en email marketing.",                                                                                       link: '/contact',          dashed: true  },
]

const FEATURES = [
  { icon: Settings,   title: 'Config complète',          benefit: "Prêt à l'emploi", text: "Compte Mailchimp, Klaviyo ou Brevo configuré. Domaine, SPF/DKIM, listes."             },
  { icon: Users,      title: 'Segmentation',             benefit: 'Ciblé',            text: "Comportement, achats, géographie. Le bon email au bon segment."                        },
  { icon: Workflow,   title: 'Automatisation email',     benefit: '24/7',             text: "Welcome, abandon panier, post-achat, relance — ça tourne tout seul."                   },
  { icon: Palette,    title: 'Templates email custom',   benefit: 'Votre image',      text: "HTML responsive, identité visuelle cohérente, mobile-first."                           },
  { icon: Plug,       title: 'CRM + boutique connectés', benefit: 'Sync auto',        text: "Contacts, commandes, comportement synchronisés. Zéro export CSV manuel."              },
  { icon: BarChart2,  title: 'Dashboard performances',  benefit: 'ROI visible',      text: "Ouvertures, clics, revenus par campagne email."                                        },
  { icon: Shield,     title: 'RGPD conforme',            benefit: 'Légal',            text: "Opt-in, désabonnement, consentement configurés dès le départ."                         },
  { icon: Headphones, title: 'Suivi J+30',               benefit: 'Optimisé',         text: "Rapport performances email marketing, ajustements, recommandations."                   },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Audit',              duration: '1-2 jours', text: "État liste, outil email existant, objectifs d'email marketing.",          implication: 'haute'   },
  { num: 2, title: 'Configuration',      duration: '1-2 jours', text: 'Compte, domaine, SPF/DKIM, authentification email.',                       implication: 'faible'  },
  { num: 3, title: 'Import & nettoyage', duration: '1-2 jours', text: 'Nettoyage liste, dédoublonnage, segmentation.',                            implication: 'moyenne' },
  { num: 4, title: 'Templates',          duration: '2-3 jours', text: 'Design HTML template email responsive sur mesure.',                         implication: 'moyenne' },
  { num: 5, title: 'Automatisations',    duration: '2-3 jours', text: 'Séquences email configurées, testées, activées.',                           implication: 'faible'  },
  { num: 6, title: 'Suivi',              duration: 'J+30',      text: 'Rapport performances, ajustements, optimisation email marketing.',          implication: 'moyenne' },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication'   },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication'  },
}

const GUARANTEES = [
  'Configuration outil complète',
  '3+ séquences email automatisées',
  'Templates HTML sur mesure',
  'CRM + boutique connectés',
  'RGPD conforme',
  'Suivi J+30 inclus',
]

const DIFFERENTIATORS = [
  { icon: Target,   title: 'Le bon outil pour vous',      text: "Klaviyo, Brevo, Mailchimp — on recommande selon votre contexte, pas notre préférence. Expertise email marketing au Sénégal." },
  { icon: Workflow, title: 'Automatisation email réelle',  text: "Pas juste une newsletter. Des séquences email qui vendent pendant que vous dormez."                                      },
  { icon: Plug,     title: 'CRM + boutique connectés',    text: "Sync automatique. Zéro export CSV. Votre email marketing est connecté à tout."                                          },
  { icon: Palette,  title: 'Templates à votre image',     text: "Templates email HTML responsive sur mesure. Pas un design retouché."                                                     },
  { icon: MapPin,   title: 'Marché africain',              text: "Brevo en FCFA, usages WhatsApp, contraintes bande passante. On connaît le terrain."                                    },
  { icon: Shield,   title: 'RGPD dès le départ',          text: "Opt-in, consentement, désabonnement — configurés correctement pour votre email marketing."                               },
]

const FAQ_ITEMS = [
  {
    q:    'Quel outil email recommandez-vous au Sénégal ?',
    a:    "Klaviyo pour l'email marketing e-commerce. Brevo pour les PME sénégalaises (facturation en FCFA, support français). Mailchimp pour débuter. On conseille selon usage et budget.",
    link: undefined,
  },
  {
    q:    'Combien coûte la configuration email marketing ?',
    a:    "À partir de 200 000 FCFA avec 3 séquences email automatisées et templates sur mesure. Audit offert.",
    link: { href: '/tarifs', label: 'Voir les tarifs →' },
  },
  {
    q:    'Peut-on reprendre notre liste email existante ?',
    a:    "Oui. Import, nettoyage et segmentation inclus. Nettoyage obligatoire pour éviter le spam.",
    link: undefined,
  },
  {
    q:    "Combien d'emails par mois ?",
    a:    "Brevo : 9 000 emails/mois gratuits. Klaviyo facture selon les contacts actifs. On optimise le coût de votre email marketing.",
    link: undefined,
  },
  {
    q:    "La séquence abandon panier fonctionne avec Shopify ?",
    a:    "Oui. Klaviyo + Shopify — connexion native, séquence email abandon panier préconfigurée et optimisée.",
    link: { href: '/services/shopify', label: 'En savoir plus →' },
  },
  {
    q:    "Comment mesurer le ROI de l'email marketing ?",
    a:    "Dashboard revenus par email, taux conversion, coût par acquisition — tout configuré dans votre outil d'email marketing.",
    link: undefined,
  },
  {
    q:    "C'est RGPD conforme ?",
    a:    "Oui. Opt-in, consentement, lien désabonnement — tout est configuré dès le départ. Votre email marketing est légal.",
    link: undefined,
  },
]

/* Données social proof — compteurs animés */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'    },
  { target: 98, suffix: '%',    label: 'Clients satisfaits' },
  { target: 2,  suffix: ' sem', label: 'Config livrée',     displayValue: '1-2 sem' },
  { target: 24, suffix: 'h',    label: 'Délai de réponse'  },
]
const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Compteur animé
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
          Ils nous font confiance pour leur email marketing
        </motion.h2>

        {/* Grille métriques avec diviseurs */}
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
            Startups, PME et e-commerçants au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO
   ═══════════════════════════════════════════════════════════════ */
function EmailCampaignMockup() {
  const campaigns = ['Welcome Series', 'Abandon Panier', 'Post-achat', 'Nurturing']
  return (
    <div aria-hidden="true" style={{
      background: 'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border: '1px solid #1E2535', borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
    }}>
      {/* Browser bar */}
      <div style={{
        background: '#161B27', borderBottom: '1px solid #1E2535',
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '5px', marginRight: '8px' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: '22px', background: '#0D1117', borderRadius: '5px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#4B5563', fontSize: '11px', fontFamily: 'var(--font-body)' }}>
            app.klaviyo.com/campaigns
          </span>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
        {/* Métriques */}
        <div style={{ width: '108px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Taux ouverture', value: '38%',   color: '#22C55E' },
            { label: 'Clics',          value: '12%',   color: '#E8611A' },
            { label: 'Revenus',        value: '840k F', color: '#F9FAFB' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
              padding: '10px', border: '1px solid #1E2535', textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '3px' }}>{label}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color, fontFamily: 'var(--font-heading)' }}>{value}</div>
            </div>
          ))}
        </div>
        {/* Séquences */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>Séquences actives</div>
          {campaigns.map((c, i) => (
            <div key={c} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'rgba(255,255,255,0.04)', borderRadius: '6px',
              padding: '6px 10px', border: '1px solid #1E2535',
            }}>
              <span style={{ fontSize: '11px', color: '#D1D5DB', fontFamily: 'var(--font-body)' }}>{c}</span>
              <span style={{
                fontSize: '10px',
                color: i === 0 ? '#22C55E' : '#E8611A',
                background: i === 0 ? 'rgba(34,197,94,0.1)' : 'rgba(232,97,26,0.1)',
                padding: '2px 6px', borderRadius: '4px',
              }}>
                {i === 0 ? 'Actif' : 'Live'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { icon: Users,    label: 'Segmentation avancée', delay: 0,   position: { top: '-18px', right: '6%' } as React.CSSProperties },
    { icon: Workflow, label: 'Automatisation',        delay: 1.2, position: { bottom: '32%', left: '-24px' } as React.CSSProperties },
    { icon: Shield,   label: 'RGPD conforme',         delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
  ]

  return (
    <section className="hero-bg" style={{ paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}>
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '20px' }}>
              <span style={EYEBROW_STYLE}>Service · Email Marketing</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Automatisez vos emails<br />et{' '}
              <span style={{ color: 'var(--color-orange-500)' }}>boostez<br />vos conversions.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              Mailchimp, Klaviyo, Brevo — on configure, automatise et connecte à votre CRM. Email marketing à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                Mailchimp · Klaviyo · Brevo · Automatisation email
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=email-marketing"
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
                Automatiser mes emails <ArrowRight size={16} aria-hidden="true" />
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
                Voir nos réalisations
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
            <EmailCampaignMockup />
            {pills.map(({ icon: Icon, label, delay, position }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
                style={{
                  position: 'absolute', display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '9999px',
                  padding: '7px 14px 7px 8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 10,
                  ...position,
                }}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'rgba(232,97,26,0.12)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--color-orange-500)', flexShrink: 0,
                }}>
                  <Icon size={12} aria-hidden="true" />
                </div>
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
          <h2
            id="problems-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Vos emails ne performent pas
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
              style={{
                padding: '28px',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                background: '#FFFFFF', boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '20px', marginBottom: '10px' }}
              >
                {title}
              </h3>
              <p
                className="font-body text-[--text-secondary]"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
              >
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
          <h2
            id="approach-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE, color: '#F9FAFB' }}
          >
            Configurer, automatiser, mesurer — notre méthode email marketing
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
                <div
                  className="font-heading font-bold"
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(232, 97, 26, 0.12)',
                    border: '1px solid rgba(232, 97, 26, 0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700, color: 'var(--color-orange-500)',
                    marginBottom: '20px', flexShrink: 0, letterSpacing: '0.02em',
                  }}
                >
                  {num}
                </div>

                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: '20px', color: '#F9FAFB', marginBottom: '10px', lineHeight: 1.3 }}
                >
                  {title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', color: '#CBD5E0', lineHeight: 1.7 }}
                >
                  {text}
                </p>
              </motion.div>

              {i < PILLARS.length - 1 && (
                <>
                  <div
                    className="hidden md:flex"
                    aria-hidden="true"
                    style={{ width: '64px', paddingTop: '27px', alignItems: 'flex-start', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <div style={{ width: '100%', height: '2px', borderTop: '2px dashed rgba(232, 97, 26, 0.35)' }} />
                  </div>
                  <div
                    className="flex md:hidden"
                    aria-hidden="true"
                    style={{ height: '36px', paddingLeft: '27px', alignSelf: 'stretch', marginTop: '4px', marginBottom: '4px' }}
                  >
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
   SECTION 05 · TYPES DE SERVICES (grille 3×2)
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
          <h2
            id="types-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Quel type d&apos;email marketing ?
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {EMAIL_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
            const card = (
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{
                  padding: '28px',
                  background: '#FFFFFF',
                  border: dashed ? '1.5px dashed #CBD5E0' : '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', height: '100%',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px', flexShrink: 0,
                  color: dashed ? '#94A3B8' : 'var(--color-orange-500)',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>

                <h3
                  className="font-heading font-bold"
                  style={{
                    fontSize: '18px',
                    color: dashed ? '#94A3B8' : 'var(--text-primary)',
                    marginBottom: '10px', lineHeight: 1.3, textAlign: 'left',
                  }}
                >
                  {title}
                </h3>

                <p
                  className="font-body"
                  style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'left', flexGrow: 1 }}
                >
                  {text}
                </p>

                {link && (
                  <span
                    className="font-body font-medium inline-flex items-center"
                    style={{ marginTop: '16px', gap: '6px', fontSize: '13px', color: dashed ? '#94A3B8' : 'var(--color-blue-800)' }}
                  >
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
          <h2
            id="features-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Ce que vous obtenez — automatisation email complète
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, title, benefit, text }) => (
              <div key={title} style={{
                flex: '0 0 calc(25% - 12px)',
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
              }}>
                <motion.div
                  variants={iconHover}
                  initial="rest"
                  whileHover="hover"
                  className="flex items-center justify-center rounded-[--border-radius-md]"
                  style={{ width: '44px', height: '44px', marginBottom: '14px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  color: 'var(--color-orange-500)', letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  {benefit}
                </div>
                <h3
                  className="font-heading font-bold text-[--text-primary]"
                  style={{ fontSize: '20px', marginBottom: '8px' }}
                >
                  {title}
                </h3>
                <p
                  className="font-body text-[--text-secondary] flex-grow"
                  style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Précédent" style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid #CBD5E0', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#4A5568',
          }}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Suivant" style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid #CBD5E0', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#4A5568',
          }}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 07 · PROCESSUS (timeline)
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection() {

  function StepCard({ title, duration, text, impl }: {
    title: string
    duration: string
    text: string
    impl: { color: string; bg: string; label: string } | undefined
  }) {
    const isOrange = impl?.color === '#E8611A'
    return (
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <h3
            className="font-heading font-bold"
            style={{ fontSize: '18px', color: '#F9FAFB', lineHeight: 1.3 }}
          >
            {title}
          </h3>
          <span
            className="font-body"
            style={{
              fontSize: '12px', fontWeight: 500, color: '#CBD5E0',
              background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
              padding: '3px 10px', borderRadius: '4px', flexShrink: 0,
            }}
          >
            {duration}
          </span>
          {impl && (
            <span
              className="font-body"
              style={{
                fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#FFFFFF',
                background: isOrange ? 'rgba(232,97,26,0.85)' : 'rgba(59,130,246,0.30)',
                padding: '3px 10px', borderRadius: '4px',
              }}
            >
              {impl.label}
            </span>
          )}
        </div>
        <p
          className="font-body"
          style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}
        >
          {text}
        </p>
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
          <h2
            id="process-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE, color: '#F9FAFB' }}
          >
            De l&apos;audit au premier envoi
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>

          {/* Ligne centrale — desktop */}
          <div
            className="hidden lg:block"
            aria-hidden="true"
            style={{
              position: 'absolute', top: '24px', bottom: '24px', left: '50%',
              width: '2px', transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)',
              zIndex: 0,
            }}
          />

          {/* Ligne latérale — mobile */}
          <div
            className="block lg:hidden"
            aria-hidden="true"
            style={{
              position: 'absolute', top: '24px', bottom: '24px', left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)',
              zIndex: 0,
            }}
          />

          {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
            const impl    = IMPLICATION_CONFIG[implication]
            const isLeft  = i % 2 === 0

            const circle = (
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#2D3E5F',
                border: '2px solid rgba(232,97,26,0.5)',
                boxShadow: '0 0 0 3px rgba(232,97,26,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
              }}>
                <span
                  className="font-heading font-bold"
                  style={{ fontSize: '13px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '0.03em' }}
                >
                  {String(num).padStart(2, '0')}
                </span>
              </div>
            )

            return (
              <motion.div
                key={num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{ marginBottom: i < PROCESS_STEPS.length - 1 ? '28px' : '0' }}
              >
                {/* Desktop — zigzag */}
                <div
                  className="hidden lg:grid"
                  style={{ gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center' }}
                >
                  <div style={{ paddingRight: '32px' }}>
                    {isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    {circle}
                  </div>
                  <div style={{ paddingLeft: '32px' }}>
                    {!isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                </div>

                {/* Mobile — vertical gauche */}
                <div
                  className="flex lg:hidden"
                  style={{ alignItems: 'flex-start', gap: '16px' }}
                >
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
function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p style={EYEBROW_STYLE}>Preuves</p>
          <h2
            id="trust-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Pourquoi nous faire confiance
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
          {GUARANTEES.map((g) => (
            <motion.div
              key={g}
              variants={gridChild}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(27,42,74,0.10), 0 2px 8px rgba(27,42,74,0.06)', borderColor: 'rgba(232,97,26,0.30)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 24px', borderRadius: '12px',
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(232,97,26,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
              </div>
              <span className="font-body" style={{ fontSize: '15px', fontWeight: 600, color: '#1B2A4A', lineHeight: 1.4 }}>{g}</span>
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
          <h2
            id="diff-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Ce qui fait la différence — email marketing à Dakar
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
              style={{
                padding: '28px',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                background: '#FFFFFF', boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '20px', marginBottom: '10px' }}
              >
                {title}
              </h3>
              <p
                className="font-body text-[--text-secondary]"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
              >
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
          <h2
            id="faq-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Questions fréquentes sur l&apos;email marketing
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
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                <AccordionTrigger style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  width: '100%', paddingBlock: '20px',
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
                }}>
                  <span
                    className="font-heading font-semibold text-[--text-primary]"
                    style={{ fontSize: 'var(--faq-question-size)' }}
                  >
                    {q}
                  </span>
                  <ChevronDown size={18} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden="true" />
                </AccordionTrigger>
                <AccordionContent style={{ paddingBottom: '20px' }}>
                  <p
                    className="font-body text-[--text-secondary]"
                    style={{ fontSize: 'var(--faq-answer-size)', lineHeight: 1.7, textAlign: 'justify' }}
                  >
                    {a}
                  </p>
                  {link && (
                    <Link
                      href={link.href}
                      className="font-body font-semibold inline-flex items-center transition-colors duration-200"
                      style={{ fontSize: '14px', color: 'var(--color-orange-500)', textDecoration: 'none', marginTop: '12px' }}
                    >
                      {link.label}
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
   SECTION 11 · CTA FINAL — props pour CTASection partagé
   ═══════════════════════════════════════════════════════════════ */
const CTA_PROPS = {
  service:         'email-marketing',
  titre:           'Automatisez vos campagnes\nemail dès maintenant',
  sousTitre:       'Audit email gratuit à Dakar — on identifie les gains rapides.',
  titreCarte:      'Automatisez vos campagnes email',
  sousTitreCarte:  'Audit offert — réponse sous 24h.',
  placeholder:     'Outil email actuel, objectifs, taille liste, e-commerce ou B2B...',
  intentionDefaut: 'Obtenir un devis',
} as const

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function EmailMarketingPageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <TypesSection />
      <FeaturesSection />
      <ProcessSection />
      <TrustSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
