'use client'

// Source   : REFONTE-APPS-WEB.md — 11 sections
// URL      : /services/applications-web
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline

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
  FileSpreadsheet, Clock, EyeOff, Lock,
  LayoutDashboard, Users, Briefcase, Database, Workflow, MessageCircle,
  Bell, BarChart2, Plug, Upload, Search, Smartphone, Headphones,
  MapPin, Zap, Shield, Code2,
  BarChart3, Settings,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  GitFork,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

const CTA_PROPS = {
  service:         'applications-web',
  titre:           'Automatisez votre gestion\navec un outil sur mesure',
  sousTitre:       'Premier échange offert à Dakar — réponse sous 24h.',
  titreCarte:      'Lancer votre application web',
  sousTitreCarte:  'Premier échange offert — réponse sous 24h.',
  placeholder:     'Type d\'application (dashboard, portail, outil métier), processus à automatiser, nombre d\'utilisateurs, intégrations souhaitées...',
  intentionDefaut: 'Obtenir un devis',
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
  { icon: FileSpreadsheet, title: 'Excel partout',       text: 'Stocks, commandes, clients — tout dans des fichiers Excel partagés par WhatsApp. Erreurs garanties. Une application web sur mesure élimine ça.' },
  { icon: Clock,           title: 'Tâches répétitives',  text: 'Vos équipes passent des heures sur des actions qu\'un outil métier ferait en 2 secondes.' },
  { icon: EyeOff,          title: 'Zéro visibilité',     text: 'Pas de tableau de bord, pas de reporting. Vous prenez des décisions business à l\'aveugle.' },
  { icon: Lock,            title: 'Données dispersées',  text: 'Chaque département a ses fichiers, ses outils. Rien n\'est connecté ni centralisé.' },
]

const PILLARS = [
  { num: '01', title: 'On comprend votre métier d\'abord', text: 'Avant de coder, on cartographie vos processus. Chaque fonctionnalité de l\'application web résout un problème réel.' },
  { num: '02', title: 'MVP puis itérations',                text: 'On livre le cœur fonctionnel en 4-6 semaines. Le reste vient par sprints selon vos retours terrain.' },
  { num: '03', title: 'Connecté à vos outils',              text: 'ERP, CRM, Wave, Orange Money — votre application web parle avec vos systèmes existants via API.' },
]

const APP_TYPES = [
  { icon: LayoutDashboard, title: 'Tableau de bord sur mesure',  text: 'KPI, graphiques, reporting temps réel. Vos données visibles en un coup d\'œil. Idéal pour PME sénégalaises.',              link: undefined,                    dashed: false },
  { icon: Users,           title: 'Portail client web',           text: 'Espace client sécurisé. Commandes, factures, support, documents partagés.',                                                link: undefined,                    dashed: false },
  { icon: Briefcase,       title: 'Outil métier sur mesure',      text: 'Gestion de terrain, suivi production, planification — conçu pour votre activité spécifique.',                               link: undefined,                    dashed: false },
  { icon: Database,        title: 'Back-office & admin',          text: 'Administration, gestion stocks, commandes, utilisateurs. Votre centre de contrôle.',                                        link: undefined,                    dashed: false },
  { icon: Workflow,        title: 'Automatisation processus',     text: 'Workflows automatisés. Notifications, validations, escalades — zéro intervention manuelle.',                                link: '/services/logiciels-saas',    dashed: false },
  { icon: MessageCircle,   title: 'Un besoin spécifique ?',        text: 'Décrivez votre besoin d\'application web.',                                                                                link: '/contact',                   dashed: true  },
]

const FEATURES = [
  { icon: Lock,        title: 'Auth & rôles',       benefit: 'Sécurisé',      text: 'Login, permissions par rôle, SSO, 2FA.' },
  { icon: BarChart2,   title: 'Dashboard',          benefit: 'Vision claire',  text: 'KPI, graphiques, filtres, export PDF/Excel.' },
  { icon: Plug,        title: 'API REST',            benefit: 'Connecté',      text: 'Intégrations ERP, CRM, Wave, Orange Money.' },
  { icon: Bell,        title: 'Notifications',      benefit: 'Réactif',       text: 'Email, push, WhatsApp. Alertes configurables.' },
  { icon: Upload,      title: 'Import/Export',      benefit: 'Pratique',      text: 'CSV, Excel, PDF. Migration données facilitée.' },
  { icon: Search,      title: 'Recherche avancée',  benefit: 'Efficace',      text: 'Filtres multiples, full-text, tri intelligent.' },
  { icon: Smartphone,  title: 'Responsive',         benefit: 'Mobile',        text: 'Utilisable sur tablette et smartphone.' },
  { icon: Headphones,  title: 'Support 30j',        benefit: 'Sérénité',      text: 'Corrections, ajustements, formation inclus.' },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Analyse métier',  duration: '1 sem',     text: 'Cartographie processus, user stories, architecture de votre application web.',   implication: 'haute'   },
  { num: 2, title: 'Design UX',       duration: '1-2 sem',   text: 'Wireframes, prototypes cliquables, validation.',                                   implication: 'haute'   },
  { num: 3, title: 'Développement',   duration: '3-6 sem',   text: 'Sprints 2 semaines, démo à chaque sprint.',                                        implication: 'moyenne' },
  { num: 4, title: 'Tests',           duration: '1 sem',     text: 'Unitaires, intégration, charge, cross-browser.',                                   implication: 'faible'  },
  { num: 5, title: 'Déploiement',     duration: '2-3 jours', text: 'Mise en production, monitoring, alertes.',                                          implication: 'faible'  },
  { num: 6, title: 'Formation',       duration: '1-2h',      text: 'Formation utilisateurs + documentation + support 30j.',                             implication: 'haute'   },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication' },
}

const GUARANTEES = [
  { icon: Code2,       title: 'Code 100% votre propriété',  text: 'Le code source de votre application web vous appartient dès le premier commit. Hébergé sur votre repo GitHub ou GitLab.' },
  { icon: Plug,        title: 'API REST documentée',         text: 'Documentation Swagger/OpenAPI livrée avec votre application. Vos équipes peuvent intégrer et faire évoluer.' },
  { icon: Settings,    title: 'Tests automatisés',           text: 'Tests unitaires et d\'intégration inclus. Votre application web reste stable à chaque évolution.' },
  { icon: Users,       title: 'Formation utilisateurs',      text: '1-2h de formation incluse + documentation utilisateur complète. Prise en main garantie.' },
  { icon: Headphones,  title: 'Support 30j inclus',          text: 'Corrections, ajustements, accompagnement après la mise en production.' },
  { icon: GitFork,     title: 'Architecture scalable',       text: 'Conçue pour grandir. De 10 à 10 000 utilisateurs, même infrastructure, mêmes performances.' },
]

const DIFFERENTIATORS = [
  { icon: Briefcase,  title: 'On comprend le métier',   text: 'Pas juste du code. On analyse vos processus avant de développer votre application web sur mesure.' },
  { icon: Zap,        title: 'MVP en 4-6 semaines',     text: 'Votre outil métier en production rapidement. Itérations ensuite selon vos retours.' },
  { icon: Plug,       title: 'Connecté à tout',         text: 'ERP, CRM, Wave, Orange Money, Stripe — vos systèmes communiquent.' },
  { icon: Users,      title: 'Équipe senior',           text: 'React, Next.js, Node.js, PostgreSQL. Développement web au Sénégal par des seniors.' },
  { icon: MapPin,     title: 'Basés à Dakar',           text: 'Réunions en personne possibles. WhatsApp, fuseau WAT.' },
  { icon: Shield,     title: 'Support continu',         text: '30 jours inclus. Maintenance longue durée disponible.' },
]

const FAQ_ITEMS = [
  { q: 'Quelle différence entre un site web et une application web\u00a0?',  a: 'Un site présente de l\'information. Une application web permet d\'agir\u00a0: gérer commandes, suivre stocks, analyser données. C\'est un outil de travail, pas une vitrine.',                                                  link: undefined },
  { q: 'Combien coûte une application web sur mesure\u00a0?',                a: 'À partir de 800\u202f000\u00a0FCFA pour un MVP. Application web complète\u00a0: 2M à 8M FCFA selon la complexité. Devis gratuit après premier échange.',                                                                         link: { href: '/tarifs', label: 'Voir nos tarifs →' } },
  { q: 'L\'application web sera accessible sur mobile\u00a0?',              a: 'Oui, responsive par défaut. Si vous avez besoin d\'offline ou de push natif, on recommande une application mobile dédiée.',                                                                                                      link: { href: '/services/developpement-mobile', label: 'Voir le développement mobile →' } },
  { q: 'Peut-on connecter l\'app à notre ERP ou CRM\u00a0?',                a: 'Oui. Intégrations API sur mesure vers SAP, Odoo, Salesforce, HubSpot ou tout outil avec une API.',                                                                                                                              link: undefined },
  { q: 'Quel est le délai de développement\u00a0?',                         a: 'MVP application web en 4-6 semaines. App complète\u00a0: 2-4 mois. Sprints validés ensemble.',                                                                                                                                   link: undefined },
  { q: 'Formation des utilisateurs incluse\u00a0?',                         a: 'Oui. 1-2h de formation incluse + documentation utilisateur complète.',                                                                                                                                                           link: undefined },
  { q: 'Le code m\'appartient\u00a0?',                                       a: 'Oui. 100\u00a0% du code de votre application web dès le jour\u00a01.',                                                                                                                                                          link: undefined },
]

const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'         },
  { target: 98, suffix: '%',    label: 'Clients satisfaits'     },
  { target: 6,  suffix: ' sem', label: 'Délai MVP',  displayValue: '4-8 sem' },
  { target: 24, suffix: 'h',   label: 'Réponse garantie'       },
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
   SECTION 01 · HERO — MOCKUP dashboard
   ═══════════════════════════════════════════════════════════════ */
function DashboardMockup() {
  const barHeights = [45, 70, 55, 90, 65, 80, 40]
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
          border: '1px solid #2A3347', display: 'flex', alignItems: 'center', paddingLeft: '10px', gap: '6px',
        }}>
          <Lock size={9} color="#3B4A6B" aria-hidden="true" />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#3B4A6B' }}>
            app.connect-web.tech/dashboard
          </span>
        </div>
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'flex', height: '300px' }}>
        {/* Sidebar */}
        <div style={{
          width: '52px', background: '#0A0E18', borderRight: '1px solid #1E2535',
          display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: '16px',
        }}>
          {[BarChart3, Users, Settings, Database].map((Icon, i) => (
            <div key={i} style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: i === 0 ? 'rgba(232,97,26,0.15)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i === 0 ? 'var(--color-orange-500)' : '#3B4A6B',
            }}>
              <Icon size={15} aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'CA ce mois', value: '12.4M', unit: 'FCFA', up: true },
              { label: 'Commandes', value: '248',  unit: 'en cours', up: true },
              { label: 'Utilisateurs', value: '1 240', unit: 'actifs', up: false },
            ].map(k => (
              <div key={k.label} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px', padding: '10px',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{k.label}</p>
                <p style={{ fontFamily: 'var(--font-heading, var(--font-body))', fontSize: '15px', fontWeight: 700, color: '#F4F7FC', lineHeight: 1 }}>{k.value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: k.up ? '#22C55E' : '#6B7FA3', marginTop: '2px' }}>{k.unit}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px', padding: '12px',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>Ventes / 7 jours</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
              {barHeights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                  style={{
                    flex: 1, background: i === 3
                      ? 'linear-gradient(to top, var(--color-orange-500), rgba(232,97,26,0.5))'
                      : 'rgba(255,255,255,0.12)',
                    borderRadius: '4px 4px 0 0',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { label: 'Sur mesure', delay: 0,   position: { top: '-18px', right: '6%' }     as React.CSSProperties },
    { label: 'API REST',   delay: 1.2, position: { bottom: '32%', left: '-24px' }  as React.CSSProperties },
    { label: 'Scalable',   delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
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
              <span style={EYEBROW_STYLE}>Service · Applications Web</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Des outils web<br />qui{' '}
              <span style={{ color: 'var(--color-orange-500)' }}>automatisent</span>
              <br />votre gestion.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              Dashboards, portails clients, plateformes métier — applications web sur mesure à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                Sur mesure · API REST · Rôles &amp; permissions
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=applications-web"
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
                Discuter de mon projet <ArrowRight size={16} aria-hidden="true" />
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
            <DashboardMockup />
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
          Ils nous font confiance pour leurs applications web
        </motion.h2>

        {/* Métriques */}
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
    <section aria-labelledby="problems-heading" className="section-alt">
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
            Votre gestion est encore manuelle
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
   SECTION 04 · NOTRE APPROCHE
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
            Votre métier, notre code — application web sur mesure
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
   SECTION 05 · TYPES D'APPLICATIONS (grille 3×2)
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
            Quel type d&apos;application web&nbsp;?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {APP_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
            const card = (
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{
                  padding: '28px', background: '#FFFFFF',
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
            Ce que votre application web inclut
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
            De l&apos;analyse métier au déploiement
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Ligne centrale desktop */}
          <div className="hidden lg:block" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '50%', width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)', zIndex: 0 }} />
          {/* Ligne latérale mobile */}
          <div className="block lg:hidden" aria-hidden="true" style={{ position: 'absolute', top: '24px', bottom: '24px', left: '23px', width: '2px', background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)', zIndex: 0 }} />

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
   SECTION 08 · POURQUOI NOUS FAIRE CONFIANCE
   ═══════════════════════════════════════════════════════════════ */
function GuaranteesSection() {
  return (
    <section aria-labelledby="guarantees-heading" className="section-alt">
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
   SECTION 09 · CE QUI FAIT LA DIFFÉRENCE
   ═══════════════════════════════════════════════════════════════ */
function DifferentiatorsSection() {
  return (
    <section aria-labelledby="diff-heading" className="section-base">
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
    <section aria-labelledby="faq-heading" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 id="faq-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Questions fréquentes sur le développement d&apos;applications web
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
                  <h3 className="font-heading font-semibold text-[--text-primary]" style={{ fontSize: 'var(--faq-question-size)', margin: 0 }}>
                    {q}
                  </h3>
                  <ChevronDown size={18} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden="true" />
                </AccordionTrigger>
                <AccordionContent style={{ paddingBottom: '20px' }}>
                  <p className="font-body text-[--text-secondary]" style={{ fontSize: 'var(--faq-answer-size)', lineHeight: 1.7, textAlign: 'justify' }}>
                    {a}
                  </p>
                  {link && (
                    <Link href={link.href} className="font-body font-semibold inline-flex items-center transition-colors duration-200" style={{ fontSize: '14px', color: 'var(--color-orange-500)', textDecoration: 'none', marginTop: '12px' }}>
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
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function ApplicationsWebPageClient() {
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
