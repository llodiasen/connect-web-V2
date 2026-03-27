'use client'

// Source   : REFONTE-MOBILE.md — 12 sections
// URL      : /services/developpement-mobile
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
  ZapOff, HelpCircle, AlertTriangle, WifiOff,
  Smartphone, ShoppingCart, Briefcase, Rocket, Heart, MessageCircle,
  Bell, CreditCard, MapPin, Fingerprint, BarChart2, Plug, MessageSquare,
  MapPin as MapPinIcon, Users, Eye, Wallet, Shield,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Code2, GitFork, Headphones,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

const CTA_PROPS = {
  service:         'developpement-mobile',
  titre:           'Créez votre application mobile\ndès maintenant',
  sousTitre:       'Premier échange offert à Dakar — réponse sous 24h.',
  titreCarte:      'Lancer votre application mobile',
  sousTitreCarte:  'Premier échange offert — réponse sous 24h.',
  placeholder:     'Type d\'application, fonctionnalités prioritaires, budget estimé, délai souhaité...',
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
  { icon: ZapOff,        title: 'App lente et instable',       text: 'Vos utilisateurs désinstallent. 53% abandonnent une application mobile qui charge en plus de 3 secondes.' },
  { icon: HelpCircle,    title: 'Quel choix technique ?',       text: 'iOS, Android, les deux ? React Native ou Flutter ? Le mauvais choix peut doubler votre budget de développement mobile.' },
  { icon: AlertTriangle, title: 'Prestataire décevant',         text: 'Livré en retard, hors budget, qualité médiocre. 68% des projets d\'application mobile dépassent leur budget initial.' },
  { icon: WifiOff,       title: 'Inutilisable hors connexion',  text: 'En Afrique de l\'Ouest, la connectivité n\'est pas garantie. Votre app doit fonctionner partout, même sans réseau.' },
]

const PILLARS = [
  { num: '01', title: 'Stratégie d\'abord',      text: 'Avant de coder, on analyse votre marché et vos utilisateurs. Chaque décision technique sert un objectif business.' },
  { num: '02', title: 'Sprints visibles',         text: 'Démo toutes les 2 semaines. Vous voyez l\'avancement de votre application mobile, vous validez, vous gardez le contrôle.' },
  { num: '03', title: 'Qualité non négociable',   text: 'Tests sur appareils réels (Samsung, iPhone, Tecno, Infinix). Votre app marche sur tous les smartphones du marché sénégalais.' },
]

const APP_TYPES = [
  { icon: Smartphone,    title: 'Cross-platform',               text: 'Un seul code pour iOS et Android. React Native ou Flutter — idéal pour créer une application mobile à budget maîtrisé.', link: undefined, dashed: false },
  { icon: ShoppingCart,  title: 'E-commerce mobile',            text: 'Catalogue, paiement Wave/Orange Money, suivi commande, notifications push.',                                               link: '/services/sites-ecommerce', dashed: false },
  { icon: Briefcase,     title: 'Application mobile entreprise', text: 'Gestion de flotte, CRM mobile, collecte terrain, mode hors ligne. Conçu pour le terrain africain.',                      link: undefined, dashed: false },
  { icon: Rocket,        title: 'MVP rapide',                   text: 'Testez votre idée d\'application mobile en 4-6 semaines. Itération rapide, budget maîtrisé.',                             link: undefined, dashed: false },
  { icon: Heart,         title: 'Santé & bien-être',            text: 'Suivi patient, téléconsultation, objets connectés.',                                                                         link: undefined, dashed: false },
  { icon: MessageCircle, title: 'Un besoin spécifique ?',        text: 'Décrivez votre projet de développement mobile, on propose la solution.',                                                    link: '/contact', dashed: true  },
]

const TECHNOLOGIES = [
  {
    h3:   'React Native — Le meilleur des deux mondes',
    text: 'Un seul code source pour iOS et Android. Idéal pour MVP, apps métier, budget maîtrisé. Réduction de 30-40% du coût vs natif. Utilisé par Meta, Shopify, Discord. Notre stack de prédilection comme développeur React Native à Dakar.',
    cas:  'MVP · Logique métier · Budget maîtrisé',
    color: '#61DAFB',
    badge: 'RN',
  },
  {
    h3:   'Flutter — Performance et design sur mesure',
    text: 'Le framework de Google pour des interfaces pixel-perfect. Idéal pour apps visuelles, animations complexes. Notre expertise de développeur Flutter au Sénégal.',
    cas:  'UI riche · Animations · Multi-plateforme',
    color: '#54C5F8',
    badge: 'FL',
  },
  {
    h3:   'Swift / Kotlin — Puissance native',
    text: 'Développement spécifique par plateforme. Accès hardware poussé (caméra, AR, capteurs), jeux, dernières features OS.',
    cas:  'Hardware · AR · Performance critique',
    color: '#FA7343',
    badge: 'NAT',
  },
]

const FEATURES = [
  { icon: Bell,          title: 'Push intelligents',  benefit: 'Rétention ×3',       text: 'Le bon message, au bon moment, au bon utilisateur.' },
  { icon: WifiOff,       title: 'Mode hors ligne',    benefit: 'Zéro frustration',    text: 'Fonctionne sans réseau, sync auto au retour. Essentiel en Afrique.' },
  { icon: CreditCard,    title: 'Paiement mobile',    benefit: 'Wave & OM natifs',    text: 'Wave, Orange Money, Free Money, Stripe intégrés nativement.' },
  { icon: MapPin,        title: 'Géolocalisation',    benefit: 'Contextuel',          text: 'Store locator, tracking, suggestions basées sur la position.' },
  { icon: Fingerprint,   title: 'Auth sécurisée',     benefit: 'Confiance',           text: 'Biométrie, SSO, 2FA.' },
  { icon: BarChart2,     title: 'Analytics',          benefit: 'Data-driven',         text: 'KPI temps réel, comportement, entonnoirs de conversion.' },
  { icon: Plug,          title: 'Intégration API',    benefit: 'Connecté',            text: 'ERP, CRM, paiement, bases de données existantes.' },
  { icon: MessageSquare, title: 'Chat in-app',         benefit: 'Engagement',          text: 'Communication utilisateurs/support, notifications temps réel.' },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Analyse UX',    duration: '1 sem',     text: 'Parcours utilisateur, wireframes. On comprend vos utilisateurs avant de créer l\'application mobile.',   implication: 'haute'   },
  { num: 2, title: 'Design UI',     duration: '1-2 sem',   text: 'Maquettes Figma HD, design system mobile adapté au marché africain.',                                     implication: 'haute'   },
  { num: 3, title: 'Développement', duration: '4-8 sem',   text: 'Sprints 2 semaines, preview TestFlight/APK à chaque itération.',                                           implication: 'moyenne' },
  { num: 4, title: 'Tests QA',      duration: '1-2 sem',   text: 'Appareils réels iOS & Android, 10+ devices (Samsung, iPhone, Tecno, Infinix).',                            implication: 'faible'  },
  { num: 5, title: 'Publication',   duration: '3-7 jours', text: 'Soumission App Store et Google Play. On gère tout le processus de validation.',                            implication: 'faible'  },
  { num: 6, title: 'Support',       duration: 'continu',   text: 'Mises à jour, corrections, nouvelles features. Votre application mobile évolue.',                          implication: 'moyenne' },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication' },
}

const GUARANTEES = [
  { icon: Code2,      title: 'Code 100% votre propriété dès le jour 1',                         text: 'Hébergé sur votre repo GitHub ou GitLab, sans dépendance propriétaire.' },
  { icon: Shield,     title: 'NDA systématique',                                                 text: 'Accord de confidentialité signé avant tout échange projet. Votre concept protégé.' },
  { icon: GitFork,    title: 'Accès repo Git en temps réel',                                     text: 'Vous suivez l\'avancement du développement commit par commit.' },
  { icon: Smartphone, title: 'Tests sur appareils réels africains (Tecno, Infinix, Samsung)',    text: 'On teste sur les téléphones réels du marché sénégalais — pas uniquement des simulateurs.' },
  { icon: Wallet,     title: 'Wave & Orange Money intégrés en standard',                         text: 'Paiement mobile africain natif, pas en option. Testé en production.' },
  { icon: Headphones, title: 'Support post-lancement inclus 30 jours',                           text: 'Corrections, ajustements, accompagnement à la prise en main après la mise en ligne.' },
]

const DIFFERENTIATORS = [
  { icon: MapPinIcon,  title: 'Agence mobile à Dakar',   text: 'On connaît votre marché, vos utilisateurs, vos contraintes réseau. Pas une agence parisienne qui découvre l\'Afrique.' },
  { icon: Users,       title: 'Développeurs seniors',    text: 'Pas de juniors sur votre projet. Développeurs React Native et Flutter expérimentés.' },
  { icon: Eye,         title: 'Transparence totale',     text: 'Accès au code, au backlog et aux démos à chaque sprint.' },
  { icon: Wallet,      title: 'Wave & OM en standard',   text: 'Paiement mobile africain intégré nativement, pas en option.' },
  { icon: WifiOff,     title: 'Offline-first',           text: 'Applications mobiles conçues pour fonctionner avec une connexion limitée.' },
  { icon: Shield,      title: 'Support post-lancement',  text: 'On reste après la livraison. Mises à jour, corrections, évolutions.' },
]

const FAQ_ITEMS = [
  { q: 'Combien coûte une application mobile au Sénégal ?',  a: 'À partir de 600 000 FCFA pour un MVP. Application mobile complète : 1,5M à 5M FCFA. Le coût dépend des fonctionnalités et de la complexité. Devis gratuit après premier échange.', link: { href: '/tarifs', label: 'Voir nos tarifs →' } },
  { q: 'React Native ou Flutter : comment choisir ?',        a: 'React Native si votre équipe connaît JavaScript ou pour un MVP rapide. Flutter pour des interfaces visuellement riches et des animations complexes. En tant que développeur React Native et Flutter à Dakar, on vous conseille selon votre contexte.', link: undefined },
  { q: 'Mon application mobile fonctionnera-t-elle sans internet ?', a: 'Oui. On développe en offline-first — adapté aux zones à connectivité limitée en Afrique de l\'Ouest. Synchronisation automatique au retour du réseau.', link: undefined },
  { q: 'Peut-on intégrer Wave et Orange Money ?',            a: 'Oui, c\'est notre spécialité. Wave, Orange Money, Free Money intégrés en standard sur chaque application mobile sur mesure que nous développons.', link: undefined },
  { q: 'Combien de temps pour publier sur les stores ?',     a: 'Apple App Store : 1-3 jours de validation. Google Play : 2-7 jours. On gère toute la soumission pour vous.', link: undefined },
  { q: 'Le code source m\'appartient ?',                     a: 'Oui. 100% du code de votre application mobile vous appartient dès le jour 1. Hébergé sur votre repo GitHub ou GitLab.', link: undefined },
  { q: 'Proposez-vous un support après livraison ?',         a: 'Oui. 30 jours de support inclus. Contrats de maintenance disponibles pour le long terme — mises à jour, corrections, nouvelles features.', link: undefined },
]

const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'                    },
  { target: 98, suffix: '%',    label: 'Clients satisfaits'                },
  { target: 3,  suffix: '+',    label: 'Ans d\'expérience',  displayValue: '3+ ans' },
  { target: 24, suffix: 'h',   label: 'Délai de réponse'                  },
]

const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref   = useRef<HTMLSpanElement>(null)
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
   SECTION 01 · HERO — MOCKUP application mobile
   ═══════════════════════════════════════════════════════════════ */
function MobileMockup() {
  return (
    <div aria-hidden="true" style={{
      background: 'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border: '1px solid #1E2535', borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      padding: '20px',
    }}>
      {/* Header carte */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6B7FA3', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          App iOS &amp; Android
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Utilisateurs', value: '4 200', unit: 'actifs' },
          { label: 'Note store',   value: '4.8★',  unit: 'App Store' },
          { label: 'Rétention',    value: '78%',   unit: '30 jours' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px', padding: '10px',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-heading, var(--font-body))', fontSize: '16px', fontWeight: 700, color: '#F4F7FC', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#6B7FA3', marginTop: '2px' }}>{s.unit}</p>
          </div>
        ))}
      </div>

      {/* Screen preview */}
      <div style={{ marginBottom: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#6B7FA3', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Écrans</p>
        {[
          { screen: 'Accueil', status: 'Optimisé' },
          { screen: 'Paiement', status: 'Wave + OM' },
          { screen: 'Offline', status: 'Sync auto' },
        ].map((s, i) => (
          <motion.div
            key={s.screen}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 10px', background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
              marginBottom: '5px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: '#CBD5E0' }}>{s.screen}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--color-orange-500)' }}>{s.status}</span>
          </motion.div>
        ))}
      </div>

      {/* Tech badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['⚛ React Native', '🐦 Flutter', '🌊 Wave / OM'].map(p => (
          <span key={p} style={{
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
            background: 'rgba(232,97,26,0.10)', border: '1px solid rgba(232,97,26,0.20)',
            color: 'var(--color-orange-400)', borderRadius: '6px', padding: '4px 10px',
          }}>{p}</span>
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { label: 'iOS & Android', delay: 0,   position: { top: '-18px', right: '6%' }     as React.CSSProperties },
    { label: 'Offline-first', delay: 1.2, position: { bottom: '32%', left: '-24px' }  as React.CSSProperties },
    { label: 'Wave & OM',     delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
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
              <span style={EYEBROW_STYLE}>Service · Développement Mobile</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Applications mobiles<br />pensées pour<br />
              <span style={{ color: 'var(--color-orange-500)' }}>l&apos;utilisateur africain.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              React Native · Flutter · Wave &amp; Orange Money intégrés. Agence développement mobile à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                iOS &amp; Android · Offline-first · Paiement mobile natif
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=developpement-mobile"
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
                Créer mon application <ArrowRight size={16} aria-hidden="true" />
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
                Voir nos apps
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
            <MobileMockup />
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
          Ils nous font confiance pour créer leurs applications mobiles
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
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
            color: 'var(--text-tertiary)', letterSpacing: '0.08em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px',
          }}>
            Startups, PME et grands groupes au Sénégal et en Afrique de l&apos;Ouest.
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
            Vous rencontrez ces obstacles&nbsp;?
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
            Une application mobile sur mesure, pas un template
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
            Quel type d&apos;application mobile&nbsp;?
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
   SECTION 06 · TECHNOLOGIES (React Native, Flutter, Natif)
   ═══════════════════════════════════════════════════════════════ */
function TechnologiesSection() {
  return (
    <section aria-labelledby="tech-heading" className="section-base">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <h2 id="tech-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            React Native, Flutter ou natif — la bonne techno pour votre projet
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="font-body"
          style={{ textAlign: 'center', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 48px' }}
        >
          Le choix technique est une décision business. On recommande la stack qui maximise votre ROI en développement application mobile.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', marginBottom: '40px' }}>
          {TECHNOLOGIES.map(({ h3, text, cas, color, badge }, i) => (
            <motion.div
              key={h3}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={fadeUp}
              style={{
                padding: '28px', background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color, letterSpacing: '0.04em' }}>{badge}</span>
              </div>
              <h3 className="font-heading font-bold" style={{
                fontSize: 'var(--card-title-size)', color: 'var(--text-primary)',
                marginBottom: '10px', lineHeight: 1.3,
              }}>
                {h3}
              </h3>
              <p className="font-body" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify', flexGrow: 1 }}>
                {text}
              </p>
              <div style={{
                marginTop: '16px', display: 'inline-flex', alignItems: 'center',
                background: 'rgba(27,42,74,0.05)', borderRadius: '6px', padding: '6px 12px',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                  {cas}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA inline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: 'center' }}
        >
          <p className="font-body" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Besoin d&apos;aide pour choisir&nbsp;?{' '}
            <Link
              href="/contact?service=developpement-mobile"
              style={{ color: 'var(--color-orange-500)', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
            >
              On analyse votre projet gratuitement.
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 07 · FONCTIONNALITÉS (slider Embla — 8 items)
   ═══════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

  return (
    <section aria-labelledby="features-heading" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 id="features-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Ce que votre application mobile peut faire
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
   SECTION 08 · PROCESSUS (timeline zigzag)
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
            De l&apos;idée au lancement sur les stores
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
   SECTION 09 · POURQUOI NOUS FAIRE CONFIANCE
   ═══════════════════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={EYEBROW_STYLE}>Preuves</p>
          <h2 id="trust-heading" className="font-heading font-bold" style={{ ...H2_STYLE }}>
            Pourquoi nous faire confiance pour votre app mobile
          </h2>
        </motion.div>

        {/* Garanties */}
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
                fontSize: '15px', color: 'var(--text-primary)',
                marginBottom: '10px', lineHeight: 1.4,
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
   SECTION 10 · CE QUI FAIT LA DIFFÉRENCE AVEC CONNECT WEB
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
            Ce qui fait la différence avec Connect Web
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
   SECTION 11 · FAQ (Accordion Radix UI)
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
            Questions fréquentes sur le développement mobile
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
   PAGE CLIENT — assemblage des 12 sections
   ═══════════════════════════════════════════════════════════════ */
export function DeveloppementMobilePageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <TypesSection />
      <TechnologiesSection />
      <FeaturesSection />
      <ProcessSection />
      <TrustSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
