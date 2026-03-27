'use client'

// Source   : CONTENT.md > PAGE : Logiciels SaaS
// URL      : /services/logiciels-saas
// REFONTE  : REFONTE-SAAS.md — 11 sections
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Typo de référence : developpement-mobile (clamp H2, 20px H3, font-body text-secondary)

import { useState, Suspense, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useForm, type SubmitHandler } from 'react-hook-form'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Root    as AccordionRoot,
  Item    as AccordionItem,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from '@radix-ui/react-accordion'
import {
  Layers, CreditCard, Globe, Users, LayoutDashboard, Rocket,
  Building2, Smartphone, MessageCircle, Lock, BarChart2, UserPlus,
  Plug, Activity, GitBranch, Wallet, MapPin, Shield,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Mail, Clock, Linkedin, Facebook, Instagram,
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
   HELPERS TYPOGRAPHIE — identiques à developpement-mobile
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
    icon:  Layers,
    title: 'Architecture à définir',
    text:  `Multi-tenant, monolithe, microservices ? Le mauvais choix technique coûte 6 mois de refactoring sur votre développement SaaS.`,
  },
  {
    icon:  CreditCard,
    title: 'Billing à gérer',
    text:  'Abonnements, essais gratuits, factures, downgrade — un système de billing SaaS est un projet en soi.',
  },
  {
    icon:  Globe,
    title: 'Double marché à adresser',
    text:  `Vos clients africains paient en Wave. Les internationaux en carte. Votre plateforme SaaS doit gérer les deux dès le départ.`,
  },
  {
    icon:  Users,
    title: 'Onboarding qui rate',
    text:  `Si vos premiers utilisateurs ne comprennent pas votre logiciel SaaS en 5 minutes, ils partent. L'activation est critique.`,
  },
]

const PILLARS = [
  {
    num:   '01',
    title: 'Architecture multi-tenant scalable',
    text:  `On choisit l'architecture adaptée à votre étape de croissance pour créer un SaaS robuste. API-first, prêt pour 10 ou 10 000 utilisateurs.`,
  },
  {
    num:   '02',
    title: 'Billing Wave + Stripe dès le jour 1',
    text:  'Marché africain ET international couvert. Essai gratuit, plans, factures automatiques. Le billing de votre logiciel SaaS est prêt au lancement.',
  },
  {
    num:   '03',
    title: 'On lance tôt, on itère vite',
    text:  'MVP SaaS en 6-10 semaines. Itérations rapides selon les retours marché. Votre plateforme évolue avec vos clients.',
  },
]

const SAAS_TYPES = [
  { icon: LayoutDashboard, title: 'SaaS vertical',         text: 'Solution métier pour un secteur : immobilier, santé, éducation, logistique. Plateforme SaaS ciblée et différenciante.',                    link: undefined,                      dashed: false },
  { icon: Users,           title: 'SaaS horizontal',        text: `Outil transversal : CRM, gestion projet, comptabilité. Large marché adressable pour votre logiciel SaaS.`,                                link: undefined,                      dashed: false },
  { icon: Rocket,          title: 'MVP SaaS',               text: `Testez votre concept en 6-10 semaines. Validez le marché avant d'investir massivement dans le développement SaaS.`,                        link: undefined,                      dashed: false },
  { icon: Building2,       title: 'Plateforme B2B',         text: 'Multi-utilisateurs, rôles, espaces entreprise. Conçu pour la vente aux professionnels.',                                                    link: undefined,                      dashed: false },
  { icon: Smartphone,      title: 'SaaS + app mobile',      text: 'Dashboard web + app mobile compagnon. Vos utilisateurs partout.',                                                                           link: '/services/applications-mobile', dashed: false },
  { icon: MessageCircle,   title: 'Un besoin spécifique ?', text: `Décrivez votre idée de produit SaaS, on évalue la faisabilité.`,                                                                           link: '/contact',                     dashed: true  },
]

const FEATURES = [
  { icon: Layers,     title: 'Multi-tenancy',      benefit: 'Scalable',    text: 'Chaque client dans son espace isolé. Architecture multi-tenant de 10 à 10 000 tenants.',              link: undefined },
  { icon: CreditCard, title: 'Billing automatisé', benefit: 'Revenus',     text: 'Stripe + Wave. Plans, essais, factures, downgrade — tout automatisé pour votre SaaS.',               link: undefined },
  { icon: Lock,       title: 'Auth sécurisée',     benefit: 'Confiance',   text: `Auth.js, Clerk ou Supabase. SSO, 2FA, rôles et permissions.`,                                        link: undefined },
  { icon: BarChart2,  title: 'Dashboard admin',    benefit: 'Vision MRR',  text: 'Tenants, MRR, churn, usage. Pilotez votre business SaaS.',                                           link: undefined },
  { icon: UserPlus,   title: 'Onboarding',         benefit: 'Activation',  text: 'Parcours guidé, tooltips, emails onboarding. Vos users comprennent vite.',                          link: undefined },
  { icon: Plug,       title: 'API REST',            benefit: 'Extensible',  text: `API pour intégrations tierces et partenaires de votre plateforme SaaS.`,                            link: '/services/architecture-api' },
  { icon: Activity,   title: 'Monitoring',         benefit: 'Fiabilité',   text: 'Sentry + alertes. Vous êtes prévenus avant vos utilisateurs.',                                      link: undefined },
  { icon: GitBranch,  title: 'CI/CD',              benefit: 'Déploiement', text: 'GitHub Actions. Chaque commit testé et déployé automatiquement.',                                   link: undefined },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Product discovery', duration: '1-2 sem', text: 'Proposition de valeur, personas, features MVP de votre logiciel SaaS.',   implication: 'haute'   },
  { num: 2, title: 'Architecture',      duration: '1 sem',   text: `Schéma technique, BDD, API, stack validée pour votre plateforme SaaS.`,   implication: 'moyenne' },
  { num: 3, title: 'MVP',               duration: '4-6 sem', text: 'Auth + billing + core features. MVP SaaS déployé sur Vercel.',            implication: 'moyenne' },
  { num: 4, title: 'Beta',              duration: '2 sem',   text: 'Premiers utilisateurs réels. Feedback, bugs, ajustements.',               implication: 'haute'   },
  { num: 5, title: 'Lancement',         duration: '1 sem',   text: 'Go-live, monitoring, alertes, documentation.',                            implication: 'moyenne' },
  { num: 6, title: 'Croissance',        duration: 'continu', text: 'Sprints fonctionnalités, scaling, optimisation de votre SaaS.',          implication: 'moyenne' },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
}

const GUARANTEES = [
  'Architecture multi-tenant scalable',
  'Billing Wave + Stripe dès le jour 1',
  'CI/CD automatisé',
  'Monitoring Sentry inclus',
  'Code 100% propriétaire',
  'Support post-lancement',
]

const DIFFERENTIATORS = [
  { icon: Layers,   title: 'Multi-tenant natif',        text: `Architecture pensée SaaS dès le départ. Pas un monolithe bricolé. Développement logiciel SaaS par des experts.` },
  { icon: Wallet,   title: 'Wave + Stripe',             text: `Vos clients africains ET internationaux paient dès le jour 1 sur votre plateforme SaaS.` },
  { icon: Rocket,   title: 'MVP SaaS en 6-10 semaines', text: `Lancez tôt, itérez vite. Le marché valide, pas vos suppositions.` },
  { icon: Activity, title: 'Monitoring inclus',         text: `Sentry, alertes, uptime. Votre logiciel SaaS est surveillé 24/7.` },
  { icon: MapPin,   title: 'Marché africain',           text: `Agence SaaS à Dakar. On connaît les usages, les contraintes réseau, les attentes locales.` },
  { icon: Shield,   title: 'Scalable',                  text: `Votre SaaS grandit, l'architecture suit. Pas de mur technique.` },
]

const FAQ_ITEMS = [
  {
    q:    `Combien coûte le développement d'un SaaS ?`,
    a:    `À partir de 2 000 000 FCFA pour un MVP SaaS fonctionnel. Le coût de développement SaaS dépend du nombre de features et des intégrations.`,
    link: { href: '/tarifs', label: 'Voir les tarifs →' },
  },
  { q: 'Combien de temps pour un MVP SaaS ?',          a: `6 à 10 semaines pour un MVP bien défini. Notre approche agile de développement SaaS permet de lancer tôt et d'itérer.`,                         link: undefined },
  { q: `Vous gérez l'hébergement du SaaS ?`,           a: `Oui. Déploiement Vercel/Railway/AWS + monitoring + CI/CD. On vous forme au pilotage de votre plateforme SaaS.`,                                   link: undefined },
  { q: 'Wave et Stripe en même temps sur un SaaS ?',   a: `Oui. Double billing configuré dès le départ. Marché africain + international couvert pour votre logiciel SaaS.`,                                 link: undefined },
  { q: 'Et si je veux pivoter ?',                      a: `L'architecture multi-tenant est modulaire. On peut changer de direction sans tout reconstruire.`,                                                  link: undefined },
  { q: `C'est quoi l'architecture multi-tenant ?`,     a: `Chaque client de votre SaaS a son espace isolé, mais tout tourne sur la même infrastructure. Scalable et économique.`,                            link: undefined },
  { q: `Le code m'appartient ?`,                       a: `Oui. 100 % du code source, de l'architecture et des données de votre plateforme SaaS dès le jour 1.`,                                             link: undefined },
]

/* Données social proof — compteurs animés */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'    },
  { target: 98, suffix: '%',    label: 'Clients satisfaits' },
  { target: 10, suffix: ' sem', label: 'MVP livré', displayValue: '6-10 sem' },
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
          Ils nous font confiance pour créer leur logiciel SaaS
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
            Startups, PME et grands groupes au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO
   ═══════════════════════════════════════════════════════════════ */
function SaasDashboardMockup() {
  const tenants = ['Acme Corp', 'StartupX', 'PME Dakar', 'TechCo']
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
            app.connect-web.tech/admin
          </span>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
        {/* Sidebar */}
        <div style={{ width: '110px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['Dashboard', 'Tenants', 'Billing', 'Analytics', 'API'].map((item, i) => (
            <div key={item} style={{
              padding: '7px 10px', borderRadius: '6px',
              background: i === 1 ? 'rgba(232,97,26,0.15)' : 'transparent',
              border: i === 1 ? '1px solid rgba(232,97,26,0.3)' : '1px solid transparent',
            }}>
              <span style={{
                fontSize: '11px', fontFamily: 'var(--font-body)', fontWeight: i === 1 ? 600 : 'var(--font-light)',
                color: i === 1 ? '#E8611A' : '#6B7280',
              }}>{item}</span>
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
            padding: '10px 12px', border: '1px solid #1E2535',
          }}>
            <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>MRR</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F9FAFB', fontFamily: 'var(--font-heading)' }}>2 400 000 F</div>
            <div style={{ fontSize: '10px', color: '#22C55E', fontFamily: 'var(--font-body)', marginTop: '2px' }}>+14% ce mois</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
            padding: '10px 12px', border: '1px solid #1E2535',
          }}>
            <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Tenants actifs</div>
            {tenants.map((t, i) => (
              <div key={t} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBlock: '4px',
                borderBottom: i < tenants.length - 1 ? '1px solid #1E2535' : 'none',
              }}>
                <span style={{ fontSize: '11px', color: '#D1D5DB', fontFamily: 'var(--font-body)' }}>{t}</span>
                <span style={{
                  fontSize: '10px', color: '#22C55E', background: 'rgba(34,197,94,0.1)',
                  padding: '2px 6px', borderRadius: '4px',
                }}>Actif</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { icon: Layers,     label: 'Multi-tenant',  delay: 0,   position: { top: '-18px', right: '6%' } as React.CSSProperties },
    { icon: CreditCard, label: 'Wave + Stripe', delay: 1.2, position: { bottom: '32%', left: '-24px' } as React.CSSProperties },
    { icon: Rocket,     label: 'MVP 6-10 sem',  delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
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
              <span style={EYEBROW_STYLE}>Service · Logiciels SaaS</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              De l'idée au SaaS<br />en production,<br />
              <span style={{ color: 'var(--color-orange-500)' }}>en Afrique.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              Architecture multi-tenant, billing Wave + Stripe, onboarding automatisé.
              Développement SaaS à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                Multi-tenant · Wave + Stripe · Scalable
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=logiciels-saas"
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
                Construire mon SaaS <ArrowRight size={16} aria-hidden="true" />
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
                Voir nos plateformes
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
            <SaasDashboardMockup />
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
   SECTION 02 · SOCIAL PROOF
   ═══════════════════════════════════════════════════════════════ */
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
            Lancer un SaaS, c'est complexe
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
            MVP d&apos;abord, croissance ensuite — notre méthode SaaS
          </h2>
        </motion.div>

        {/* ── Process roadmap ── */}
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
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(232, 97, 26, 0.12)',
                    border: '1px solid rgba(232, 97, 26, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--color-orange-500)',
                    marginBottom: '20px',
                    flexShrink: 0,
                    letterSpacing: '0.02em',
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
                  {/* Desktop — horizontal dashed line at circle midpoint */}
                  <div
                    className="hidden md:flex"
                    aria-hidden="true"
                    style={{
                      width: '64px',
                      paddingTop: '27px',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '2px',
                      borderTop: '2px dashed rgba(232, 97, 26, 0.35)',
                    }} />
                  </div>

                  {/* Mobile — vertical fade line */}
                  <div
                    className="flex md:hidden"
                    aria-hidden="true"
                    style={{
                      height: '36px',
                      paddingLeft: '27px',
                      alignSelf: 'stretch',
                      marginTop: '4px',
                      marginBottom: '4px',
                    }}
                  >
                    <div style={{
                      width: '2px',
                      height: '100%',
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
   SECTION 05 · TYPES DE SAAS (grille 3×2)
   ═══════════════════════════════════════════════════════════════ */
function TypesSection() {
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
            Quel type de plateforme SaaS ?
          </h2>
        </motion.div>

        {/* Grille 1col → 2col → 3col */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {SAAS_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
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
                  border: dashed
                    ? '1.5px dashed #CBD5E0'
                    : '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Icône */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  flexShrink: 0,
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
                    marginBottom: '10px',
                    lineHeight: 1.3,
                    textAlign: 'left',
                  }}
                >
                  {title}
                </h3>

                {/* Texte */}
                <p
                  className="font-body"
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    textAlign: 'left',
                    flexGrow: 1,
                  }}
                >
                  {text}
                </p>

                {/* Lien optionnel */}
                {link && (
                  <span
                    className="font-body font-medium inline-flex items-center"
                    style={{
                      marginTop: '16px',
                      gap: '6px',
                      fontSize: '13px',
                      color: dashed ? '#94A3B8' : 'var(--color-blue-800)',
                    }}
                  >
                    {dashed ? 'Discuter de mon projet' : 'En savoir plus'}
                    <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                  </span>
                )}
              </motion.div>
            )

            return link ? (
              <Link
                key={title}
                href={link}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
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
            Ce que votre logiciel SaaS inclut
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
   SECTION 07 · PROCESSUS (timeline)
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection() {

  /* ── Carte réutilisable ── */
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
        borderRadius: '12px',
        padding: '24px',
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
            De l&apos;idée au lancement — processus de développement SaaS
          </h2>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: 'relative' }}>

          {/* Ligne centrale — desktop */}
          <div
            className="hidden lg:block"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: '50%',
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)',
              zIndex: 0,
            }}
          />

          {/* Ligne latérale — mobile */}
          <div
            className="block lg:hidden"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)',
              zIndex: 0,
            }}
          />

          {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
            const impl = IMPLICATION_CONFIG[implication]
            const isLeft = i % 2 === 0

            const circle = (
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#2D3E5F',
                border: '2px solid rgba(232,97,26,0.5)',
                boxShadow: '0 0 0 3px rgba(232,97,26,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
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
                    {isLeft
                      ? <StepCard title={title} duration={duration} text={text} impl={impl} />
                      : <div />
                    }
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    {circle}
                  </div>
                  <div style={{ paddingLeft: '32px' }}>
                    {!isLeft
                      ? <StepCard title={title} duration={duration} text={text} impl={impl} />
                      : <div />
                    }
                  </div>
                </div>

                {/* Mobile — vertical gauche */}
                <div
                  className="flex lg:hidden"
                  style={{ alignItems: 'flex-start', gap: '16px' }}
                >
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    {circle}
                  </div>
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
   SECTION 08 · CONFIANCE & GARANTIES
   ═══════════════════════════════════════════════════════════════ */
/* TrustSection supprimée — remplacée par SocialProofSection après le Hero */

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
            Ce qui fait la différence — développement SaaS à Dakar
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
            Questions fréquentes sur le développement SaaS
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
  service:         'logiciels-saas',
  titre:           'Construisons votre SaaS ensemble',
  sousTitre:       'Premier échange offert à Dakar — réponse sous 24h.',
  titreCarte:      'Construisons votre SaaS ensemble',
  sousTitreCarte:  'Premier échange offert — réponse sous 24h.',
  placeholder:     'Type de SaaS, fonctionnalités clés, cible utilisateurs, stade actuel...',
  intentionDefaut: 'Obtenir un devis',
} as const

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function LogicielsSaasPageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <TypesSection />
      <FeaturesSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
