'use client'

// Source   : REFONTE-DEV-WEB.md — 11 sections
// URL      : /services/developpement-web
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Design   : identique à marketplace (section-base/alt/brand, embla, zigzag)

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Gauge, Smartphone, SearchX, PenOff,
  Globe, Globe2, Layers, RefreshCw, MessageCircle,
  Search, Edit, Shield, BarChart2, Languages, Headphones,
  Code2, Clock, MapPin,
  ChevronDown, ArrowRight,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'

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
  fontFamily:    'Clash Display, var(--font-montserrat), sans-serif',
  fontSize:      '2rem',
  fontWeight:    500,
  lineHeight:    1.15,
  letterSpacing: '-0.03em',
  color:         'var(--text-primary)',
}

const EYEBROW_STYLE: React.CSSProperties = {
  fontFamily:    'var(--font-heading)',
  fontSize:      '11px',
  fontWeight:    700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color:         '#E8611A',
  marginBottom:  '16px',
}

const SUBTITLE_STYLE: React.CSSProperties = {
  fontFamily:  'var(--font-body)',
  fontSize:    '17px',
  fontWeight:  400,
  color:       '#4A5568',
  lineHeight:  1.6,
  maxWidth:    '620px',
  margin:      '12px auto 0',
  textAlign:   'center',
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: Gauge,      title: 'Site trop lent',            text: 'Lighthouse sous 50. Vos visiteurs partent. Google vous pénalise. La création d\'un site web performant commence par la vitesse.' },
  { icon: Smartphone, title: 'Non responsive',            text: '60% du trafic sénégalais vient du mobile. Un site non adapté perd 6 visiteurs sur 10.' },
  { icon: SearchX,    title: 'Invisible sur Google',      text: 'Pas de sitemap, Core Web Vitals rouges, balisage absent. Vos clients à Dakar ne vous trouvent pas.' },
  { icon: PenOff,     title: 'Impossible à mettre à jour',text: 'Pour changer un texte, vous appelez votre développeur. Ça prend 3 jours et coûte cher.' },
]

const PILLARS = [
  { num: '01', title: 'Next.js, pas WordPress',       text: 'Sites statiques ultra-rapides, SEO natif, Vercel Edge. Stack moderne de développement web à Dakar.' },
  { num: '02', title: 'Lighthouse 95+ garanti',       text: 'On ne livre pas tant que le score n\'est pas atteint. Performance, accessibilité, SEO — tout vert.' },
  { num: '03', title: 'CMS pour votre autonomie',     text: 'Sanity ou Strapi intégré. Vous modifiez textes et images seul. Formation 1h incluse.' },
]

const SITE_TYPES = [
  { icon: Globe,         title: 'Site vitrine professionnel', text: '3 à 10 pages. CMS inclus, SEO de base, Lighthouse 95+. Création site vitrine à Dakar en 1-2 semaines.',           link: '/services/sites-vitrine', dashed: false },
  { icon: Smartphone,    title: 'Progressive Web App',        text: 'Installable, offline-ready, notifications push. Performances app native sans les stores.',                          link: undefined,                 dashed: false },
  { icon: Layers,        title: 'Architecture headless',      text: 'Next.js en front, Sanity ou Strapi en backend. Vitesse maximale pour votre site web professionnel.',               link: undefined,                 dashed: false },
  { icon: RefreshCw,     title: 'Refonte de site web',        text: 'Votre site est lent ou vieilli ? On le reconstruit avec une stack moderne. Refonte site web complète.',             link: undefined,                 dashed: false },
  { icon: Globe2,        title: 'Site multilingue',           text: 'Français, anglais, wolof — i18n Next.js natif pour le marché ouest-africain.',                                     link: undefined,                 dashed: false },
  { icon: MessageCircle, title: 'Un besoin spécifique ?',     text: 'Décrivez votre projet.',                                                                                           link: '/contact',                dashed: false },
]

const FEATURES = [
  { icon: Gauge,      title: 'Lighthouse 95+',   benefit: 'Garanti',           text: 'Performance, accessibilité, SEO — tout vert à la livraison.' },
  { icon: Smartphone, title: 'Mobile-first',     benefit: '100% responsive',   text: 'Testé sur 10+ appareils. Samsung, iPhone, Tecno, Infinix.' },
  { icon: Search,     title: 'SEO technique',    benefit: 'Trouvable sur Google', text: 'Sitemap, schema.org, Core Web Vitals, meta optimisées.' },
  { icon: Edit,       title: 'CMS intégré',      benefit: 'Autonomie',         text: 'Sanity ou Strapi. Modifiez tout sans développeur.' },
  { icon: Shield,     title: 'Sécurité',         benefit: 'SSL + RGPD',        text: 'Headers sécurisés, SSL, conformité RGPD.' },
  { icon: BarChart2,  title: 'Analytics',        benefit: 'Data',              text: 'GA4 ou Plausible configuré.' },
  { icon: Languages,  title: 'Multilingue',      benefit: 'International',     text: 'i18n Next.js natif.' },
  { icon: Headphones, title: 'Support 30j',      benefit: 'Sérénité',          text: 'Corrections et ajustements post-lancement.' },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Brief',         duration: '1 jour',    text: 'Objectifs, pages, contenu, identité visuelle.',         implication: 'haute'  },
  { num: 2, title: 'Design',        duration: '2-3 jours', text: 'Wireframes + maquettes Figma desktop et mobile.',       implication: 'haute'  },
  { num: 3, title: 'Développement', duration: '5-10 jours',text: 'Sprints 1 semaine, preview Vercel.',                    implication: 'faible' },
  { num: 4, title: 'Tests',         duration: '1-2 jours', text: 'Lighthouse, cross-browser, WCAG, mobile.',              implication: 'faible' },
  { num: 5, title: 'Déploiement',   duration: '1 jour',    text: 'DNS, SSL, monitoring.',                                 implication: 'faible' },
  { num: 6, title: 'Formation',     duration: '1h',        text: 'CMS + support 30 jours activé.',                       implication: 'haute'  },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:  { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  faible: { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication' },
}

const GUARANTEES = [
  { icon: Gauge,      title: 'Lighthouse 95+ garanti',         text: 'On ne livre pas tant que le score n\'est pas atteint. Performance, accessibilité, SEO — tout vert.' },
  { icon: Edit,       title: 'CMS + formation 1h',             text: 'Sanity ou Strapi intégré. Vous modifiez tout seul après 1h de formation. Zéro dépendance.' },
  { icon: Globe,      title: 'Hébergement Vercel 1ère année',  text: 'Vercel Edge Network, CDN mondial, SSL, domaine — tout inclus la première année.' },
  { icon: Search,     title: 'SEO technique complet',          text: 'Sitemap, schema.org, Core Web Vitals verts, meta optimisées pour Google Dakar.' },
  { icon: Headphones, title: 'Support 30 jours',               text: 'Corrections et ajustements inclus pendant 1 mois. WhatsApp, email, on est là.' },
  { icon: Code2,      title: 'Code 100% propriétaire',         text: 'Le code source de votre site web vous appartient dès le jour 1. Hébergé sur votre GitHub.' },
]

const DIFFERENTIATORS = [
  { icon: Gauge,      title: 'Lighthouse 95+ ou rien',   text: 'On ne livre pas tant que le score n\'est pas atteint. Agence développement web à Dakar qui garantit la performance.' },
  { icon: Code2,      title: 'Next.js, pas WordPress',   text: 'Stack 2024. Votre site web professionnel est rapide, sécurisé et dure 5 ans.' },
  { icon: Clock,      title: '1-3 semaines',             text: 'Process rodé de création site web. Brief → design → dev → live.' },
  { icon: Edit,       title: 'CMS pour vous',            text: 'Vous modifiez tout seul. Formation incluse. Zéro dépendance.' },
  { icon: MapPin,     title: 'Basés à Dakar',            text: 'Agence web sénégalaise. On connaît le marché, Wave, Orange Money.' },
  { icon: Shield,     title: 'Support réactif',          text: '30 jours inclus. WhatsApp, email, on est là.' },
]

const FAQ_ITEMS = [
  { q: 'Combien coûte un site web à Dakar ?',        a: 'À partir de 350 000 FCFA pour un site vitrine. Le prix d\'un site web à Dakar dépend du nombre de pages et des fonctionnalités. Consultez nos tarifs pour les fourchettes complètes.', link: { href: '/tarifs', label: 'Voir nos tarifs →' } },
  { q: 'Quel est le délai pour un site vitrine ?',   a: '1 à 2 semaines si le contenu est fourni. La création de site web à Dakar est notre spécialité — on accompagne aussi la rédaction si besoin.', link: undefined },
  { q: 'L\'hébergement est-il inclus ?',             a: 'Oui. Hébergement Vercel + domaine + SSL tout inclus première année.', link: undefined },
  { q: 'Pourrai-je mettre à jour le site seul ?',    a: 'Oui. CMS intégré (Sanity ou Strapi) + formation 1h incluse. Zéro compétence technique requise.', link: undefined },
  { q: 'Pourquoi Next.js et pas WordPress ?',        a: 'Next.js est plus rapide (Lighthouse 95+), plus sécurisé et mieux référencé. WordPress convient pour un blog. Pour un site web professionnel à Dakar, Next.js est le bon choix.', link: undefined },
  { q: 'Proposez-vous la maintenance de site web ?', a: 'Oui. 30 jours inclus. Contrats maintenance longue durée disponibles — mises à jour, sauvegardes, monitoring.', link: undefined },
  { q: 'Le code source m\'appartient ?',             a: 'Oui. 100% du code source de votre site web dès le jour 1.', link: undefined },
]

/* Social proof */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',   label: 'Projets livrés'     },
  { target: 98, suffix: '%',   label: 'Clients satisfaits' },
  { target: 3,  suffix: ' sem',label: 'Délai max',         displayValue: '1-3 sem' },
  { target: 95, suffix: '+',   label: 'Score Lighthouse',  displayValue: '95+'     },
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
   MOCKUP — Lighthouse / site web
   ═══════════════════════════════════════════════════════════════ */
function WebDevMockup() {
  return (
    <div aria-hidden="true" style={{
      background:   'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border:       '1px solid #1E2535',
      borderRadius: '14px',
      overflow:     'hidden',
      boxShadow:    '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      padding:      '20px',
    }}>
      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
        <div style={{ flex: 1, marginLeft: '8px', height: '22px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>
            votre-site.vercel.app
          </span>
        </div>
      </div>

      {/* Lighthouse scores */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, color: '#6B7FA3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Lighthouse Report
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { label: 'Performance', score: '98' },
            { label: 'Accessibility', score: '96' },
            { label: 'Best Practices', score: '100' },
            { label: 'SEO', score: '97' },
          ].map(({ label, score }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                border:         '3px solid #22C55E',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                margin:         '0 auto 6px',
                background:     'rgba(34,197,94,0.10)',
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#22C55E', lineHeight: 1 }}>{score}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#6B7FA3', lineHeight: 1.3 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Site preview */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
        <div style={{ height: '8px', background: 'rgba(232,97,26,0.4)', borderRadius: '4px', marginBottom: '6px', width: '60%' }} />
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '4px', width: '90%' }} />
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', width: '75%' }} />
      </div>

      {/* Tech badges */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {['⚡ Next.js 15', '🌍 Vercel Edge', '🔍 SEO A+'].map(b => (
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
    { label: 'Lighthouse 95+',   delay: 0,   position: { top: '-18px', right: '6%' }     as React.CSSProperties },
    { label: '100% responsive',  delay: 1.2, position: { bottom: '32%', left: '-24px' }  as React.CSSProperties },
    { label: 'SEO A+',           delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
  ]

  return (
    <section
      className="hero-bg"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Image background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/Hero/hero-image.png"
          alt="Développement web à Dakar — Connect Web"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)' }} />
      </div>

      {/* Grille de points décorative */}
      <div aria-hidden="true" style={{
        position:        'absolute',
        inset:           0,
        zIndex:          1,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize:  '32px 32px',
        pointerEvents:   'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(6rem, 12vw, 9rem)', paddingBottom: 'clamp(4rem, 8vw, 6rem)' }}>
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
            <motion.div variants={fadeUp} style={{ marginBottom: '28px' }}>
              <span style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '8px',
                background:    'rgba(232,97,26,0.12)',
                border:        '1px solid rgba(232,97,26,0.30)',
                borderRadius:  '100px',
                padding:       '5px 16px',
                fontFamily:    'var(--font-body)',
                fontSize:      '12px',
                fontWeight:    400,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color:         '#FFFFFF',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-orange-500)', flexShrink: 0 }} />
                Agence digitale · Développement Web
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '20px' }}
            >
              Des sites web rapides,<br />beaux et{' '}
              <span style={{ color: 'var(--color-orange-500)' }}>trouvables.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.6, marginBottom: '32px', maxWidth: '520px' }}
            >
              Next.js · Lighthouse 95+ · Livré en 1 à 3 semaines. Agence développement web à Dakar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display:      'inline-block',
                fontFamily:   'var(--font-body)',
                fontSize:     '13px',
                fontWeight:   500,
                color:        '#FFFFFF',
                background:   'rgba(255,255,255,0.08)',
                border:       '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                padding:      '6px 14px',
              }}>
                Stack moderne · Support Dakar · Pas de WordPress par défaut
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=developpement-web"
                className="font-body font-semibold"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  padding:        '8px 16px',
                  background:     '#E8622A',
                  color:          '#FFFFFF',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                  fontWeight:     600,
                  borderRadius:   '6px',
                  border:         'none',
                  textDecoration: 'none',
                  cursor:         'pointer',
                  transition:     'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1B2B4B'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 12px rgba(232,98,42,0.30)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#E8622A'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              >
                Démarrer mon projet web <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="font-body font-semibold"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  padding:        '8px 16px',
                  background:     'transparent',
                  color:          '#FFFFFF',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                  fontWeight:     600,
                  borderRadius:   '6px',
                  textDecoration: 'none',
                  border:         '1.5px solid rgba(255,255,255,0.40)',
                  transition:     'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1B2B4B'; el.style.borderColor = '#1B2B4B' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.40)' }}
              >
                Voir nos réalisations
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
            <WebDevMockup />
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
function StatsSection() {
  return (
    <section className="section-base" style={{ paddingBlock: '2rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 0 }}
        >
          {SP_METRICS.map(({ target, suffix, label, displayValue }, i) => (
            <div key={label} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '24px 16px', borderRight: i < SP_METRICS.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', color: '#E8611A' }}>
                {displayValue ?? <AnimatedCounter target={target} suffix={suffix} />}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: '#4A5568' }}>
                {label}
              </span>
              <span aria-hidden="true" style={{ display: 'block', width: '24px', height: '2px', background: '#E8611A', borderRadius: '2px', opacity: 0.4 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SocialProofSection() {
  return (
    <section className="section-base" style={{ paddingTop: '1rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
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
            Startups, PME et entrepreneurs au Sénégal et en Afrique de l&apos;Ouest.
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
          <h3 id="problems-heading" className="font-heading" style={{ ...H2_STYLE, textAlign: 'center' }}>
            Votre site actuel vous freine
          </h3>
          <p style={SUBTITLE_STYLE}>Un site lent, invisible ou impossible à mettre à jour coûte des clients chaque jour.</p>
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
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{ padding: '28px', border: '1px solid #DDE3EE', borderRadius: '12px', background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <motion.div
                variants={iconHover} initial="rest" whileHover="hover"
                className="flex items-center justify-center"
                style={{ width: '44px', height: '44px', borderRadius: '10px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: '#E8611A' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3 className="font-heading" style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 500, color: '#1B2A4A', marginBottom: '10px' }}>
                {title}
              </h3>
              <p className="font-body" style={{ fontSize: 'var(--card-text-size)', color: '#4A5568', lineHeight: 1.65, textAlign: 'justify' }}>
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
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <p style={{ ...EYEBROW_STYLE, color: '#E8611A' }}>Notre méthode</p>
          <h3 id="approach-heading" className="font-heading" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            Rapide, propre, livré.
          </h3>
          <p style={{ ...SUBTITLE_STYLE, color: '#FFFFFF' }}>Stack moderne, performance garantie, autonomie assurée — livré en 1 à 3 semaines.</p>
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
              fontWeight: 'var(--card-text-weight)', color: '#FFFFFF', lineHeight: 1.7 }}>
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
   SECTION 05 · TYPES DE SITES (grille 3×2)
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
          <p style={EYEBROW_STYLE}>Nos solutions</p>
          <h3 id="types-heading" className="font-heading" style={{ ...H2_STYLE }}>
            Quel type de site web vous faut-il ?
          </h3>
          <p style={SUBTITLE_STYLE}>Du site vitrine à l&apos;architecture headless — choisissez le format adapté à votre activité.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {SITE_TYPES.map(({ icon: Icon, title, text, link, dashed }, i) => {
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
                <h3 className="font-heading" style={{
                  fontSize:     'clamp(18px, 2.5vw, 20px)',
                  fontWeight:   500,
                  color:        dashed ? '#94A3B8' : '#1B2A4A',
                  marginBottom: '10px',
                  lineHeight:   1.3,
                  textAlign:    'left',
                }}>
                  {title}
                </h3>
                <p className="font-body" style={{ fontSize: 'var(--card-text-size)', color: '#4A5568', lineHeight: 1.65, textAlign: 'left', flexGrow: 1 }}>
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
          <p style={EYEBROW_STYLE}>Inclus</p>
          <h3 id="features-heading" className="font-heading" style={{ ...H2_STYLE }}>
            Ce que votre site web inclut
          </h3>
          <p style={SUBTITLE_STYLE}>Tout ce dont votre site a besoin pour performer, se référencer et rester à jour.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
          {FEATURES.map(({ icon: Icon, title, benefit, text }, idx) => (
            <FeatureCard key={title} Icon={Icon} title={title} benefit={benefit} text={text} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ Icon, title, benefit, text, idx }: {
  Icon: React.ElementType; title: string; benefit: string; text: string; idx: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: EASE, delay: idx * 0.07 }}
      style={{
        padding:       '28px',
        background:    '#FFFFFF',
        border:        '1px solid #DDE3EE',
        borderRadius:  '12px',
        boxShadow:     hovered ? '0 8px 24px rgba(0,0,0,0.09)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform:     hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:    'all 0.2s ease',
        display:       'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(232,97,26,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Icon size={20} style={{ color: '#E8611A' }} aria-hidden="true" />
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 700, color: '#E8611A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
        {benefit}
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 500, color: '#1B2A4A', marginBottom: '10px', lineHeight: 1.25 }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--card-text-size)', color: '#4A5568', lineHeight: 1.65, flex: 1 }}>
        {text}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 07 · PROCESSUS (4 colonnes — style homepage)
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection() {
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
          <p style={{ ...EYEBROW_STYLE, color: '#E8611A' }}>Notre processus</p>
          <h3 id="process-heading" className="font-heading" style={{ ...H2_STYLE, color: '#F9FAFB' }}>
            De la maquette au site en ligne
          </h3>
          <p style={{ ...SUBTITLE_STYLE, color: 'rgba(255,255,255,0.65)' }}>Brief, design, développement, tests, déploiement — jalons partagés, délais tenus.</p>
        </motion.div>

        {/* Timeline horizontale — 6 colonnes sur desktop */}
        <div style={{ position: 'relative', overflowX: 'auto' }}>
          <div aria-hidden="true" className="hidden lg:block" style={{
            position: 'absolute', top: '20px', left: '0', right: '0',
            height: '2px',
            background: `linear-gradient(to right, rgba(232,97,26,0.10), #E8611A, rgba(232,97,26,0.10))`,
            borderRadius: '2px', zIndex: 0,
          }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6" style={{ gap: '12px', minWidth: '0' }}>
            {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={num}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={fadeUp}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {/* Cercle numéroté */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background:     isEven ? '#E8611A' : 'rgba(255,255,255,0.10)',
                    border:         '2px solid #E8611A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1, flexShrink: 0,
                    boxShadow: isEven ? '0 0 0 4px rgba(232,97,26,0.18)' : '0 0 0 4px rgba(255,255,255,0.06)',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '12px', color: '#FFFFFF', letterSpacing: '0.02em' }}>
                      {String(num).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Carte */}
                  <div
                    style={{
                      width: '100%', flex: 1,
                      background:   isEven ? 'rgba(232,98,42,0.10)' : 'rgba(255,255,255,0.05)',
                      border:       isEven ? '1px solid rgba(232,98,42,0.28)' : '1px solid rgba(255,255,255,0.10)',
                      borderTop:    `3px solid ${isEven ? '#E8611A' : 'rgba(255,255,255,0.20)'}`,
                      borderRadius: '10px', padding: '14px',
                      boxShadow:    '0 2px 12px rgba(0,0,0,0.20)',
                      transition:   'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = isEven ? '0 10px 28px rgba(232,98,42,0.22)' : '0 8px 22px rgba(0,0,0,0.35)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.20)' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '15px', color: '#F9FAFB', marginBottom: '6px', lineHeight: 1.3 }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6, color: '#FFFFFF', margin: '0 0 12px' }}>
                      {text}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#E8611A', background: 'rgba(232,98,42,0.12)', border: '1px solid rgba(232,98,42,0.30)', borderRadius: '6px', padding: '3px 8px', whiteSpace: 'nowrap' }}>
                      {duration}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
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
          <h3 id="guarantees-heading" className="font-heading" style={{ ...H2_STYLE }}>
            Pourquoi nous faire confiance pour votre site web
          </h3>
          <p style={SUBTITLE_STYLE}>Des engagements concrets, vérifiables à la livraison — pas des promesses.</p>
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
              <h3 className="font-heading" style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 500, color: '#1B2A4A', marginBottom: '10px', lineHeight: 1.3 }}>
                {title}
              </h3>
              <p className="font-body" style={{ fontSize: 'var(--card-text-size)', color: '#4A5568', lineHeight: 1.65, flexGrow: 1 }}>
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
          <p style={EYEBROW_STYLE}>Pourquoi nous</p>
          <h3 id="diff-heading" className="font-heading" style={{ ...H2_STYLE }}>
            Ce qui fait la différence avec Connect Web
          </h3>
          <p style={SUBTITLE_STYLE}>Ce que les autres agences web à Dakar ne font pas — et que nous garantissons.</p>
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
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{ padding: '28px', border: '1px solid #DDE3EE', borderRadius: '12px', background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <motion.div
                variants={iconHover} initial="rest" whileHover="hover"
                className="flex items-center justify-center"
                style={{ width: '44px', height: '44px', borderRadius: '10px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: '#E8611A' }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3 className="font-heading" style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 500, color: '#1B2A4A', marginBottom: '10px' }}>
                {title}
              </h3>
              <p className="font-body" style={{ fontSize: 'var(--card-text-size)', color: '#4A5568', lineHeight: 1.65, textAlign: 'justify' }}>
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
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section aria-labelledby="faq-heading" className="section-base" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={EYEBROW_STYLE}>FAQ</p>
          <h3 id="faq-heading" className="font-heading" style={{ ...H2_STYLE }}>
            Questions fréquentes sur la création de site web à Dakar
          </h3>
          <p style={SUBTITLE_STYLE}>Tout ce que vous devez savoir avant de lancer votre projet web.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          {FAQ_ITEMS.map(({ q, a, link }, i) => (
            <div
              key={i}
              style={{
                borderRadius: '10px',
                border:       '1px solid #DDE3EE',
                overflow:     'hidden',
                background:   '#FFFFFF',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                style={{
                  width:          '100%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  gap:            '16px',
                  padding:        '24px 20px',
                  background:     openIdx === i ? '#1B2A4A' : '#FFFFFF',
                  border:         'none',
                  cursor:         'pointer',
                  textAlign:      'left',
                  transition:     'background 0.2s',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize:   'var(--faq-question-size)',
                  fontWeight: 600,
                  color:      openIdx === i ? '#FFFFFF' : '#1B2A4A',
                  lineHeight: 1.4,
                }}>
                  {q}
                </span>
                <ChevronDown
                  size={18}
                  color={openIdx === i ? '#FF7A20' : '#E8611A'}
                  style={{
                    flexShrink: 0,
                    transform:  openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                  aria-hidden="true"
                />
              </button>
              {openIdx === i && (
                <div style={{ padding: '4px 20px 20px', background: '#FAFAFA' }}>
                  <p className="font-body" style={{ fontSize: 'var(--faq-answer-size)', color: '#4A5568', lineHeight: 1.7, textAlign: 'justify', margin: 0 }}>
                    {a}
                  </p>
                  {link && (
                    <Link href={link.href} className="font-body font-semibold inline-flex items-center transition-colors duration-200" style={{ fontSize: '14px', color: '#E8611A', textDecoration: 'none', marginTop: '12px' }}>
                      {link.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 · CONTACT
   ═══════════════════════════════════════════════════════════════ */
interface ContactForm {
  nom:        string
  email:      string
  typeProjet: string
  besoin:     string
  source:     string
}

const BL_DARK_DEV = '#1B2A4A'
const OR_DEV      = '#E8611A'
const BTN_PRI_DEV = '#F05A28'
const BTN_HOV_DEV = '#1B2A3B'

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          nom:     data.nom,
          email:   data.email,
          message: `Type: ${data.typeProjet} | Budget: — | Source: ${data.source}\n\n${data.besoin}`,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("Une erreur est survenue. Contactez-nous directement.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily:   'var(--font-body)',
    fontSize:     '15px',
    color:        '#FFFFFF',
    background:   'rgba(255,255,255,0.07)',
    border:       '1px solid rgba(255,255,255,0.16)',
    borderRadius: '8px',
    padding:      '0 16px',
    height:       '46px',
    width:        '100%',
    boxSizing:    'border-box',
    outline:      'none',
    transition:   'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily:   'var(--font-body)',
    fontSize:     '13px',
    fontWeight:   600,
    color:        '#FFFFFF',
    marginBottom: '6px',
    display:      'block',
  }

  return (
    <section id="contact" className="section-brand">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', marginBottom: '48px' }}
        >
          <p style={{ ...EYEBROW_STYLE, color: OR_DEV }}>TRAVAILLONS ENSEMBLE</p>
          <h2 style={{ ...H2_STYLE, color: '#FFFFFF', fontSize: '2rem' }}>
            Prenons le temps d&apos;analyser votre projet.
          </h2>
          <p style={{ ...SUBTITLE_STYLE, color: 'rgba(255,255,255,0.65)', margin: '12px auto 0' }}>
            2 minutes&nbsp;· Réponse sous 24h&nbsp;· Première analyse gratuite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'flex-start' }}
          className="flex-col lg:flex-row"
        >
          {/* Formulaire — 60% */}
          <div style={{ flex: '1 1 60%' }}>
            {submitted ? (
              <div style={{
                padding:      '28px',
                background:   'rgba(232,97,26,0.12)',
                border:       '1px solid rgba(232,97,26,0.30)',
                borderRadius: '12px',
                textAlign:    'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <p style={{ fontFamily: 'var(--font-body)', color: '#FF7A20', fontWeight: 600, fontSize: '16px', margin: 0 }}>
                  Demande envoyée&nbsp;! On vous répond sous 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label htmlFor="dw-nom" style={labelStyle}>Prénom &amp; Nom</label>
                    <input
                      id="dw-nom" type="text" placeholder="Jean Dupont"
                      style={{ ...inputStyle, borderColor: errors.nom ? OR_DEV : 'rgba(255,255,255,0.16)' }}
                      {...register('nom', { required: true })}
                    />
                  </div>
                  <div>
                    <label htmlFor="dw-email" style={labelStyle}>Email</label>
                    <input
                      id="dw-email" type="email" placeholder="vous@entreprise.com"
                      style={{ ...inputStyle, borderColor: errors.email ? OR_DEV : 'rgba(255,255,255,0.16)' }}
                      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                  </div>
                  <div>
                    <label htmlFor="dw-type" style={labelStyle}>Type de projet</label>
                    <select id="dw-type" style={{ ...inputStyle }} {...register('typeProjet', { required: true })}>
                      <option value=""                  style={{ background: BL_DARK_DEV }}>Sélectionner...</option>
                      <option value="site-vitrine"      style={{ background: BL_DARK_DEV }}>Site vitrine</option>
                      <option value="ecommerce"         style={{ background: BL_DARK_DEV }}>E-commerce</option>
                      <option value="app-web"           style={{ background: BL_DARK_DEV }}>App web / PWA</option>
                      <option value="refonte"           style={{ background: BL_DARK_DEV }}>Refonte de site</option>
                      <option value="autre"             style={{ background: BL_DARK_DEV }}>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dw-source" style={labelStyle}>Vous nous avez connus via</label>
                    <select id="dw-source" style={{ ...inputStyle }} {...register('source')}>
                      <option value=""               style={{ background: BL_DARK_DEV }}>Sélectionner...</option>
                      <option value="google"         style={{ background: BL_DARK_DEV }}>Google</option>
                      <option value="recommandation" style={{ background: BL_DARK_DEV }}>Recommandation</option>
                      <option value="linkedin"       style={{ background: BL_DARK_DEV }}>LinkedIn</option>
                      <option value="autre"          style={{ background: BL_DARK_DEV }}>Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="dw-besoin" style={labelStyle}>Votre besoin</label>
                  <textarea
                    id="dw-besoin" rows={3}
                    placeholder="Décrivez votre projet web en quelques lignes..."
                    style={{ ...inputStyle, height: 'auto', padding: '12px 16px', resize: 'vertical', lineHeight: 1.6 }}
                    {...register('besoin', { required: true })}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#FF7A20', margin: 0 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit" disabled={loading}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', width: '100%',
                    padding: '0 32px', height: '52px',
                    background: loading ? 'rgba(240,90,40,0.4)' : BTN_PRI_DEV,
                    color: '#FFFFFF', fontFamily: 'var(--font-body)',
                    fontSize: '15px', fontWeight: 700,
                    border: 'none', borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!loading) { const el = e.currentTarget; el.style.background = BTN_HOV_DEV; el.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { if (!loading) { const el = e.currentTarget; el.style.background = BTN_PRI_DEV; el.style.transform = 'translateY(0)' } }}
                >
                  {loading ? 'Envoi...' : 'Envoyer ma demande — Réponse sous 24h'}
                  {!loading && <ArrowRight size={16} aria-hidden="true" />}
                </button>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', margin: 0 }}>
                  🔒 Informations confidentielles&nbsp;· Aucun démarchage&nbsp;· Devis gratuit
                </p>
              </form>
            )}
          </div>

          {/* Colonne droite — infos contact */}
          <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📍', text: 'Dakar — Sacré-Cœur 3' },
                { icon: '📧', text: 'contact@connect-web.tech' },
                { icon: '📞', text: '+221 77 900 62 82' },
                { icon: '🕐', text: 'Lun–Ven · 8h–18h WAT' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.80)' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['✓ Réponse sous 24h', '✓ Devis gratuit', '✓ Sans engagement'].map(b => (
                <div key={b} style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  padding:      '8px 16px',
                  background:   'rgba(255,255,255,0.06)',
                  border:       '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '14px',
                  fontWeight:   500,
                  color:        '#FFFFFF',
                }}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des sections
   ═══════════════════════════════════════════════════════════════ */
export function DeveloppementWebPageClient() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProblemsSection />
      <ApproachSection />
      <TypesSection />
      <FeaturesSection />
      <ProcessSection />
      <GuaranteesSection />
      <DifferentiatorsSection />
      <SocialProofSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
