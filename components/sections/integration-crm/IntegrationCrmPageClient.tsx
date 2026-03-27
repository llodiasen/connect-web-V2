'use client'

// Source   : REFONTE-CRM.md > PAGE : Intégration CRM
// URL      : /services/integration-crm
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Structure identique à integration-erp/IntegrationErpPageClient.tsx

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
  UserX, EyeOff, Clock, FileSpreadsheet,
  Zap, Cloud, BarChart2, Target, Database, MessageCircle,
  UserPlus, Workflow, Users, Mail, Plug, GraduationCap, Headphones,
  MapPin, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, Shield,
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
   HELPERS TYPOGRAPHIE — identiques à integration-erp
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
  textTransform: 'uppercase' as const,
  color:         'var(--color-orange-500)',
  marginBottom:  '12px',
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const PROBLEMS = [
  {
    icon:  UserX,
    title: 'Leads jamais enregistrés',
    text:  'Les contacts de votre site ne tombent pas dans le CRM. Sans intégration CRM, vos leads disparaissent.',
  },
  {
    icon:  EyeOff,
    title: 'Marketing et ventes désalignés',
    text:  "L'équipe commerciale ne voit pas les actions marketing. Opportunités manquées chaque semaine.",
  },
  {
    icon:  Clock,
    title: 'Relances manuelles',
    text:  'Pas de workflow automatisé. Les relances dépendent de la mémoire de vos commerciaux.',
  },
  {
    icon:  FileSpreadsheet,
    title: 'Données clients dispersées',
    text:  'Email, Excel, WhatsApp, CRM — les données sont partout sauf au bon endroit.',
  },
]

const PILLARS = [
  {
    num:   '01',
    title: 'Capture automatique',
    text:  'Chaque formulaire de votre site alimente automatiquement votre CRM. Zéro saisie manuelle. Intégration CRM native.',
  },
  {
    num:   '02',
    title: 'Workflows de relance',
    text:  'Séquences email, attribution leads, scoring — votre CRM travaille pour vous pendant que votre équipe vend.',
  },
  {
    num:   '03',
    title: 'Vue 360° client',
    text:  'Historique, interactions, achats, tickets — tout centralisé. Votre équipe voit tout depuis le CRM.',
  },
]

const CRM_TYPES = [
  { icon: Zap,           title: 'HubSpot',             text: 'Partenaire intégration HubSpot au Sénégal. Gratuit au départ, scalable. Idéal pour PME.',         link: undefined,  dashed: false },
  { icon: Cloud,         title: 'Salesforce',           text: 'Intégration CRM Salesforce pour entreprises avec besoins avancés et équipes structurées.',         link: undefined,  dashed: false },
  { icon: BarChart2,     title: 'Zoho CRM',             text: 'Bon rapport qualité/prix. Intégration CRM Zoho pour PME sénégalaises à budget maîtrisé.',         link: undefined,  dashed: false },
  { icon: Target,        title: 'Pipedrive',            text: 'CRM orienté vente. Pipeline visuel, automatisations, intégration email.',                         link: undefined,  dashed: false },
  { icon: Database,      title: 'CRM sur mesure',       text: 'Besoin spécifique ? On développe votre CRM ou on intègre votre outil existant.',                  link: undefined,  dashed: false },
  { icon: MessageCircle, title: 'Pas encore de CRM ?', text: 'On vous conseille le meilleur CRM selon votre taille et budget.',                                  link: '/contact', dashed: true  },
]

const FEATURES = [
  { icon: UserPlus,      title: 'Capture leads auto',    benefit: '0 lead perdu',    text: 'Formulaires site → CRM en temps réel. Chaque contact enregistré automatiquement.',         link: undefined                  },
  { icon: Workflow,      title: 'Workflows automatisés', benefit: 'Relance 24/7',    text: 'Séquences email, attribution, scoring. Votre CRM relance sans intervention.',              link: undefined                  },
  { icon: BarChart2,     title: 'Pipeline de vente',     benefit: 'Vision claire',   text: 'Étapes de vente visuelles. Chaque opportunité suivie de A à Z.',                          link: undefined                  },
  { icon: Users,         title: 'Vue 360° client',       benefit: 'Tout centralisé', text: 'Historique, interactions, achats, tickets — une fiche client complète.',                  link: undefined                  },
  { icon: Mail,          title: 'Email intégré',         benefit: 'Connecté',        text: 'Emails envoyés et reçus tracés dans le CRM. Contexte toujours disponible.',               link: '/services/email-marketing' },
  { icon: Plug,          title: 'Connecteurs API',       benefit: 'Interopérable',   text: 'Site web, ERP, paiement, marketing — tout connecté au CRM.',                              link: '/services/integration-erp' },
  { icon: GraduationCap, title: 'Formation',             benefit: 'Autonomie',       text: 'Vos commerciaux formés au CRM. Adoption garantie.',                                       link: undefined                  },
  { icon: Headphones,    title: 'Support',               benefit: 'Sérénité',        text: '30 jours inclus. Maintenance CRM longue durée disponible.',                              link: undefined                  },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Audit commercial',    duration: '1-2 jours', text: "Processus de vente, outils existants, objectifs d'intégration CRM.",  implication: 'haute'   },
  { num: 2, title: 'Choix & config CRM', duration: '2-3 jours', text: 'Sélection CRM si besoin, configuration, pipeline, champs custom.',     implication: 'haute'   },
  { num: 3, title: 'Intégration',         duration: '1-2 sem',   text: 'Connecteurs site → CRM, formulaires, workflows, email.',               implication: 'moyenne' },
  { num: 4, title: 'Migration données',   duration: '1-2 jours', text: 'Import contacts existants, nettoyage, dédoublonnage.',                 implication: 'faible'  },
  { num: 5, title: 'Formation',           duration: '2h',        text: 'Formation équipe commerciale. Adoption CRM assurée.',                  implication: 'haute'   },
  { num: 6, title: 'Support',             duration: '30 jours+', text: 'Suivi, ajustements, optimisation de votre intégration CRM.',           implication: 'moyenne' },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication'   },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Implication légère'  },
}

const GUARANTEES = [
  'Audit commercial gratuit',
  'HubSpot, Salesforce, Zoho',
  'Workflows automatisés',
  'Migration données incluse',
  'Formation commerciaux',
  'Support 30j',
]

const DIFFERENTIATORS = [
  { icon: Zap,      title: 'Experts HubSpot Sénégal',  text: 'Partenaire intégration HubSpot. Configuration, personnalisation, formation CRM à Dakar.' },
  { icon: Workflow, title: 'Automatisation réelle',     text: 'Pas juste une base de contacts. Des workflows qui relancent, qualifient et convertissent.' },
  { icon: Plug,     title: 'Connecté à tout',           text: 'Site, ERP, email marketing, paiement — votre CRM parle à tout votre écosystème.' },
  { icon: Users,    title: 'Adoption garantie',         text: 'Formation terrain. Vos commerciaux utilisent le CRM dès le jour 1.' },
  { icon: MapPin,   title: 'Basés à Dakar',             text: 'On connaît les processus commerciaux des PME sénégalaises.' },
  { icon: Shield,   title: 'Support réactif',           text: '30 jours inclus. WhatsApp, email, en personne.' },
]

const FAQ_ITEMS = [
  {
    q:    "On n'a pas encore de CRM. Lequel choisir ?",
    a:    "HubSpot (gratuit au départ) pour les PME. Zoho CRM pour un bon rapport qualité/prix. Salesforce pour les besoins avancés. On conseille et implémente le CRM adapté à votre entreprise sénégalaise.",
    link: undefined,
  },
  {
    q:    'Combien coûte une intégration CRM ?',
    a:    'À partir de 300 000 FCFA pour une intégration CRM basique (formulaires → CRM). Projets complets avec workflows : sur devis.',
    link: { href: '/tarifs', label: 'Voir les tarifs →' },
  },
  {
    q:    'Peut-on connecter notre site web au CRM ?',
    a:    "Oui, c'est notre intégration CRM la plus fréquente. Chaque formulaire alimente automatiquement le CRM avec le contact et la source.",
    link: undefined,
  },
  {
    q:    'Le CRM fonctionne avec Wave et Orange Money ?',
    a:    'Oui. On connecte les données de paiement Wave/OM à votre fiche client CRM pour un suivi complet.',
    link: undefined,
  },
  {
    q:    'Peut-on connecter le CRM à notre ERP ?',
    a:    'Oui. Synchronisation CRM ↔ ERP bidirectionnelle. Contacts, commandes, factures unifiés.',
    link: { href: '/services/integration-erp', label: 'Voir nos solutions ERP →' },
  },
  {
    q:    "Délai d'intégration CRM ?",
    a:    '1 à 3 semaines selon la complexité. Configuration CRM simple : 1 semaine.',
    link: undefined,
  },
  {
    q:    "Formation de l'équipe incluse ?",
    a:    'Oui. 2h de formation pour vos commerciaux. Documentation incluse. Adoption CRM garantie.',
    link: undefined,
  },
]

/* Métriques social proof */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'     },
  { target: 98, suffix: '%',    label: 'Clients satisfaits' },
  { target: 3,  suffix: ' sem', label: 'Délai moyen', displayValue: '1-3 sem' },
  { target: 24, suffix: 'h',    label: 'Délai de réponse'  },
]

const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Compteur animé
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
          Ils nous font confiance pour leur intégration CRM
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
            PME, startups et groupes au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO — Mockup CRM Pipeline
   ═══════════════════════════════════════════════════════════════ */
function CrmPipelineMockup() {
  const pipeline = [
    { stage: 'Prospect',    count: 24, color: '#6B7280' },
    { stage: 'Qualifié',    count: 14, color: '#3B82F6' },
    { stage: 'Démo',        count: 8,  color: '#E8611A' },
    { stage: 'Gagné',       count: 5,  color: '#22C55E' },
  ]
  const feeds = [
    { label: 'Site web → CRM',         status: '● Sync', color: '#22C55E' },
    { label: 'Email tracking actif',    status: '● Actif', color: '#3B82F6' },
    { label: 'Workflows en cours',      status: '● 3 actifs', color: '#E8611A' },
  ]
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
            crm.connect-web.tech/pipeline
          </span>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1E2535', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
        <span style={{ color: '#E2E8F0', fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          CRM actif — 0 lead perdu
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: '11px', fontFamily: 'var(--font-body)',
          color: '#22C55E', background: 'rgba(34,197,94,0.1)',
          padding: '2px 8px', borderRadius: '4px',
        }}>
          Temps réel
        </span>
      </div>

      {/* Pipeline */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1E2535' }}>
        <p style={{ fontSize: '10px', color: '#64748B', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Pipeline de vente
        </p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {pipeline.map(({ stage, count, color }) => (
            <div key={stage} style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid #1E2535',
              borderRadius: '6px', padding: '8px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 700, color, marginBottom: '2px' }}>
                {count}
              </div>
              <div style={{ fontSize: '9px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>{stage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feeds */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {feeds.map(({ label, status, color }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.04)', border: '1px solid #1E2535',
            borderRadius: '6px', padding: '8px 10px',
          }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-body)', color: '#E2E8F0' }}>{label}</span>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-body)', fontWeight: 600, color, background: `${color}18`, padding: '2px 6px', borderRadius: '3px' }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { icon: Zap,          label: 'HubSpot & Salesforce', delay: 0,   position: { top: '-18px', right: '6%' }       as React.CSSProperties },
    { icon: UserPlus,     label: 'Leads auto',            delay: 1.2, position: { bottom: '32%', left: '-24px' }   as React.CSSProperties },
    { icon: Users,        label: 'Vue 360° client',       delay: 2.4, position: { bottom: '-18px', right: '10%' }  as React.CSSProperties },
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
              <span style={EYEBROW_STYLE}>Service · Intégration CRM</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Votre CRM connecté<br />à tout votre<br />
              <span style={{ color: 'var(--color-orange-500)' }}>écosystème commercial.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              HubSpot, Salesforce, Zoho — chaque lead capturé, chaque relance automatisée.
              Intégration CRM à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                HubSpot · Salesforce · Zoho · Automatisation
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=integration-crm"
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
                Connecter mon CRM <ArrowRight size={16} aria-hidden="true" />
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
                Voir nos cas clients
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
            <CrmPipelineMockup />
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
            Vous perdez des leads chaque jour
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
   SECTION 04 · APPROCHE (process horizontal)
   ═══════════════════════════════════════════════════════════════ */
function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="section-brand">
      <div className="container">

        {/* Header */}
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
            Capturer, qualifier, convertir — intégration CRM automatisée
          </h2>
        </motion.div>

        {/* Process roadmap */}
        <div className="flex flex-col md:flex-row" style={{ alignItems: 'flex-start' }}>
          {PILLARS.map(({ num, title, text }, i) => (
            <div key={num} style={{ flex: 1, display: 'contents' }}>

              {/* Step */}
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                {/* Number circle */}
                <div
                  className="font-heading font-bold"
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(232, 97, 26, 0.12)',
                    border: '1px solid rgba(232, 97, 26, 0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700,
                    color: 'var(--color-orange-500)',
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

              {/* Connector */}
              {i < PILLARS.length - 1 && (
                <>
                  {/* Desktop — horizontal dashed line */}
                  <div
                    className="hidden md:flex"
                    aria-hidden="true"
                    style={{ width: '64px', paddingTop: '27px', alignItems: 'flex-start', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <div style={{ width: '100%', height: '2px', borderTop: '2px dashed rgba(232, 97, 26, 0.35)' }} />
                  </div>

                  {/* Mobile — vertical fade line */}
                  <div
                    className="flex md:hidden"
                    aria-hidden="true"
                    style={{ height: '36px', paddingLeft: '27px', alignSelf: 'stretch', marginTop: '4px', marginBottom: '4px' }}
                  >
                    <div style={{
                      width: '2px', height: '100%',
                      background: 'linear-gradient(to bottom, rgba(232,97,26,0.4), rgba(232,97,26,0.1))',
                      borderRadius: '2px',
                    }} />
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
   SECTION 05 · CRM SUPPORTÉS (grille 3×2)
   ═══════════════════════════════════════════════════════════════ */
function CrmTypesSection() {
  return (
    <section aria-labelledby="types-heading" className="section-alt">
      <div className="container">

        {/* Header */}
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
            Quel CRM intégrons-nous ?
          </h2>
        </motion.div>

        {/* Grille 1col → 2col → 3col */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {CRM_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
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
                {/* Icône */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px', flexShrink: 0,
                  color: dashed ? '#94A3B8' : 'var(--color-orange-500)',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>

                {/* Titre */}
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

                {/* Texte */}
                <p
                  className="font-body"
                  style={{
                    fontSize: '14px', color: 'var(--text-secondary)',
                    lineHeight: 1.75, textAlign: 'left', flexGrow: 1,
                  }}
                >
                  {text}
                </p>

                {/* Lien optionnel */}
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
            Ce que votre intégration CRM inclut
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, title, benefit, text, link }) => (
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
                {link && (
                  <Link
                    href={link}
                    className="font-body font-medium inline-flex items-center transition-colors duration-200"
                    style={{ marginTop: '12px', gap: '6px', fontSize: '13px', color: 'var(--color-blue-800)', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-orange-500)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-blue-800)' }}
                  >
                    En savoir plus <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                  </Link>
                )}
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
   SECTION 07 · PROCESSUS (timeline zigzag fond sombre)
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
                fontSize: '11px', fontWeight: 600, flexShrink: 0,
                color: '#FFFFFF',
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

        {/* Header */}
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
            De l&apos;audit au CRM opérationnel
          </h2>
        </motion.div>

        {/* Timeline */}
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
            const impl   = IMPLICATION_CONFIG[implication]
            const isLeft = i % 2 === 0

            const circle = (
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#2D3E5F', border: '2px solid rgba(232,97,26,0.5)',
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
                  <div style={{ paddingRight: '32px', paddingLeft: '0' }}>
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
   SECTION 08 · POURQUOI NOUS FAIRE CONFIANCE (grille 3×2 garanties)
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
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
          {GUARANTEES.map((guarantee, i) => (
            <motion.div
              key={guarantee}
              custom={i}
              variants={gridChild}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 24px',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                background: '#FFFFFF', boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Icône check orange */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(232,97,26,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-orange-500)',
              }}>
                <CheckCircle2 size={18} aria-hidden="true" />
              </div>
              {/* Texte */}
              <span
                className="font-body"
                style={{ fontSize: '15px', fontWeight: 600, color: '#1B2A4A', lineHeight: 1.4 }}
              >
                {guarantee}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 09 · DIFFÉRENCIATEURS (Pourquoi Connect Web)
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
            Ce qui fait la différence — intégration CRM à Dakar
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
            Questions fréquentes sur l&apos;intégration CRM
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
   SECTION 11 · CTA FINAL — CTASection partagé
   ═══════════════════════════════════════════════════════════════ */
const CTA_PROPS = {
  service:         'integration-crm',
  titre:           'Connectez votre CRM\nà tout votre écosystème',
  sousTitre:       'Audit commercial offert à Dakar — on analyse votre processus de vente.',
  titreCarte:      'Connectez votre CRM à tout votre écosystème',
  sousTitreCarte:  'Audit commercial offert — réponse sous 24h.',
  placeholder:     'Décrivez votre situation actuelle, le CRM visé, vos outils existants...',
  intentionDefaut: 'Obtenir un devis',
} as const

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function IntegrationCrmPageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <CrmTypesSection />
      <FeaturesSection />
      <ProcessSection />
      <TrustSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
