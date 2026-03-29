'use client'

// Source   : CONTENT_HOMEPAGE_V4.md — SOURCE UNIQUE ET ABSOLUE DU TEXTE
// Design   : CLAUDE.md v4.1 — #1B2B4B brand blue · orange accent (#E8611A) · section classes
// Animations : IntersectionObserver + CSS transitions (no Framer Motion)
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline
// RÈGLE couleurs — Boutons CTA : #E8622A défaut · #C9501E hover · Orange accent = eyebrow/icônes UNIQUEMENT

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useForm } from 'react-hook-form'

import {
  Code2, ShoppingCart, Layers, Wifi,
  ChevronDown, ChevronLeft, ChevronRight,
  Check, ArrowRight, Mail, Phone, Calendar,
  MessageSquare, Cpu, Globe, Zap, CreditCard, Smartphone,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   PALETTE — CLAUDE.md v4.0 (bleu logo dominant, orange accents)
   ─────────────────────────────────────────────────────────────── */
const BL_DARK  = '#1B2A4A'   // section-brand, fonds dark, FAQ toggle, carousel — PAS les boutons CTA
const BL_MED   = '#2D3E5F'   // section-brand-medium, hover dark sections
const OR_500   = '#E8611A'   // var(--color-orange-500) — eyebrow, icônes, accents UNIQUEMENT
const OR_400   = '#FF7A20'   // var(--color-orange-400) — accents sur fond sombre

/* Boutons — design system v4.2 SMALL */
const BTN_PRI     = '#F05A28'  // CTA primaire défaut
const BTN_PRI_HOV = '#1B2A3B'  // CTA primaire hover
const BTN_SEC_HOV = '#1B2A3B'  // CTA secondaire hover
const BTN_SMALL: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: '8px 16px', fontSize: '14px', borderRadius: '6px',
  fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer',
  textDecoration: 'none', transition: 'all 300ms ease',
}
const BTN_PRI_STYLE: React.CSSProperties  = { ...BTN_SMALL, background: BTN_PRI,    color: '#FFFFFF', border: 'none' }
const BTN_SEC_STYLE: React.CSSProperties  = { ...BTN_SMALL, background: 'transparent', color: '#F05A28', border: '1.5px solid #F05A28' }

/* ─────────────────────────────────────────────────────────────────
   STYLES PARTAGÉS — tokens CLAUDE.md
   ─────────────────────────────────────────────────────────────── */
const eyebrow: React.CSSProperties = {
  fontFamily:    'var(--font-heading)',
  fontSize:      '12px',
  fontWeight:    500,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color:         'var(--color-orange-500)',   // orange UNIQUEMENT pour eyebrow
  display:       'block',
  textAlign:     'center',
  marginBottom:  '16px',
}

const sectionTitle: React.CSSProperties = {
  fontFamily:    'var(--font-heading)',
  fontWeight:    500,
  fontSize:      'clamp(1.8rem, 4vw, 2.8rem)',
  lineHeight:    1.15,
  letterSpacing: '-0.03em',
  color:         'var(--text-primary)',        // #1B2A4A
  textAlign:     'center',
  margin:        '0 auto 20px',
}

const sectionSubtitle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize:   'var(--card-text-size)',
  fontWeight: 'var(--font-light)' as unknown as number,
  lineHeight: 1.7,
  color:      '#0A0A0A',
  maxWidth:   '620px',
  margin:     '0 auto',
  textAlign:  'center',
}

/* ─────────────────────────────────────────────────────────────────
   HOOK — useReveal (IntersectionObserver · déclenché une fois)
   ─────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { threshold, rootMargin: '-40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible] as const
}

/* Animation helper */
function reveal(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  }
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED COUNTER — cubic ease-out · déclenché une fois au scroll
   ─────────────────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix, prefix = '' }: { target: number; suffix: string; prefix?: string }) {
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

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* Métriques — données page d'accueil */
const SP_METRICS: { target: number; suffix: string; prefix?: string; label: string; desc: string; displayValue?: string }[] = [
  { target: 15, suffix: '+',    label: 'Projets livrés',     desc: ''  },
  { target: 98, suffix: '%',    label: 'Satisfaction client', desc: ''       },
  { target: 8,  suffix: ' sem', label: 'Délai moyen',         desc: '', displayValue: '2–8 sem.' },
  { target: 100, suffix: '%',   label: 'Projets livrés dans les délais', desc: '' },
]

/* ─────────────────────────────────────────────────────────────────
   SECTION 1 — HERO
   hero-bg class (#0A0B0E) + image cover + overlay
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 1
   ─────────────────────────────────────────────────────────────── */
const CLIENT_LOGOS = [
  { name: 'NSS/WAS Africa',   src: '/Clients/Logo-NSS1-1.webp'             },
  { name: 'ATTA Africa',      src: '/Clients/ATTA_15.avif'                 },
  { name: 'Linkshop.sn',      src: '/Clients/LINKSHOP.webp'                },
  { name: 'SD Group',         src: '/Clients/SD-GROUP-e1755513842717.webp' },
  { name: 'Cosaan Education', src: '/Clients/Cosaan-Education-Network.png' },
  { name: 'Fahamu Africa',    src: '/Clients/logofahamu1.webp'             },
  { name: 'Sunu Thiossane',   src: '/Clients/sunu-thiossane1-.webp'        },
  { name: 'Client',           src: '/Clients/logo (1).jpg'                 },
  { name: 'Client 2',         src: '/Clients/images (5).jpg'               },
]

const HERO_CSS = `
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-title   { font-size: clamp(2rem, 4.5vw, 3rem) !important; }
  .hero-eyebrow { font-size: clamp(0.65rem, 1.5vw, 0.875rem) !important; }
}
@media (max-width: 767px) {
  .hero-title   { font-size: clamp(1.6875rem, 4vw, 3.1875rem) !important; }
  .hero-eyebrow { font-size: clamp(0.6rem, 2.5vw, 0.875rem) !important; }
}
`

function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-bg"
      aria-label="Accueil Connect-Web — Agence digitale à Dakar"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Image background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/Hero/hero-image.png"
          alt="Agence digitale Connect-Web — solutions web et e-commerce pour entrepreneurs et PME"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
        />
        {/* Overlay sombre standard — lisibilité maximale */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 60%, rgba(232,97,26,0.12) 100%)',
        }} />
      </div>

      <style>{HERO_CSS}</style>

      {/* Grille de points décorative */}
      <div aria-hidden="true" style={{
        position:        'absolute',
        inset:           0,
        zIndex:          1,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize:  '32px 32px',
        pointerEvents:   'none',
      }} />

      {/* Contenu hero */}
      <div
        className="container"
        style={{
          position:      'relative',
          zIndex:        2,
          paddingTop:    'clamp(6rem, 12vw, 9rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div style={{ maxWidth: '760px' }}>

          {/* Badge eyebrow — orange (CLAUDE.md : eyebrow = orange) */}
          <span className="hero-eyebrow" style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '8px',
            background:    'rgba(232,97,26,0.12)',
            border:        '1px solid rgba(232,97,26,0.30)',
            borderRadius:  '100px',
            padding:       '5px 16px',
            fontFamily:    'var(--font-body)',
            fontSize:      '12px',
            fontWeight:    600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color:         '#FFFFFF',
            marginBottom:  '28px',
          }}>
            <span style={{
              width:      '6px',
              height:     '6px',
              borderRadius:'50%',
              background: 'var(--color-orange-500)',
              flexShrink: 0,
            }} />
            Agence digitale · Dakar, Sénégal
          </span>

          {/* H1 */}
          <h1 className="hero-title" style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    600,
            fontSize:      'clamp(2.075rem, 5vw, 3.625rem)',
            lineHeight:    1.1,
            letterSpacing: '-0.01em',
            color:         '#FFFFFF',
            marginBottom:  '24px',
          }}>
            Votre projet digital livré.
            <span style={{ color: 'var(--color-orange-400)', display: 'block' }}>Pas promis.</span>
          </h1>

          {/* Sous-titre */}
          <p style={{
            fontFamily:   'var(--font-jost)',
            fontSize:     'clamp(1rem, 1.8vw, 1.125rem)',
            fontWeight:   400,
            lineHeight:   1.75,
            color:        '#FFFFFF',
            opacity:      1,
            maxWidth:     '640px',
            marginBottom: '36px',
            textAlign:    'justify',
          }}>
            Nous développons sur mesure les solutions digitales qui font grandir les entreprises — applications mobile, applications web, SaaS, sites performants, boutiques en ligne, automatisation IA.
          </p>

          {/* CTAs — CLAUDE.md : CTA primaire #1B2A4A, hover orange */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <Link
              href="/contact"
              style={{ ...BTN_PRI_STYLE, gap: '8px' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI_HOV; el.style.borderColor = BTN_PRI_HOV }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }}
              onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
              onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
            >
              Lancer mon projet <ArrowRight size={14} />
            </Link>
            <Link
              href="/portfolio"
              style={{ ...BTN_SEC_STYLE, gap: '8px' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_SEC_HOV; el.style.borderColor = BTN_SEC_HOV; el.style.color = '#FFFFFF' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = '#F05A28'; el.style.color = '#F05A28' }}
              onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
              onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
            >
              Voir nos réalisations
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}

const EASE_CUBIC = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

function StatsGrid() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section style={{ width: '100%', background: '#FFFFFF', borderTop: '1px solid #DDE3EE', borderBottom: '1px solid #DDE3EE', paddingBlock: '24px' }}>

      {/* Grille 4 colonnes */}
      <div
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-4"
      >
        {SP_METRICS.map(({ target, suffix, prefix, label, desc, displayValue }, i) => (
          <div
            key={label}
            style={{
              display:          'flex',
              flexDirection:    'column',
              alignItems:       'center',
              textAlign:        'center',
              paddingBlock:     '20px',
              paddingInline:    'clamp(1rem, 3vw, 2rem)',
              borderRight:      i < 3 ? '1px solid #DDE3EE' : 'none',
              opacity:          inView ? 1 : 0,
              transform:        inView ? 'translateY(0)' : 'translateY(12px)',
              transition:       `opacity 0.45s ease ${i * 100}ms, transform 0.45s cubic-bezier(0,0,0.2,1) ${i * 100}ms`,
            }}
          >
            {/* Trait décoratif */}
            <div aria-hidden="true" style={{ width: '20px', height: '2px', borderRadius: '2px', background: 'var(--color-orange-500)', marginBottom: '10px' }} />

            {/* Chiffre */}
            <span className="font-heading font-bold" style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--color-orange-500)', fontVariantNumeric: 'tabular-nums', marginBottom: '4px' }}>
              {displayValue ?? <AnimatedCounter target={target} suffix={suffix} prefix={prefix} />}
            </span>

            {/* Label */}
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, letterSpacing: '-0.005em', marginBottom: '2px' }}>
              {label}
            </p>

            {/* Description muted — masquée sur mobile */}
            <p className="hidden sm:block" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 'var(--font-light)' as unknown as number, color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ClientLogos() {
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="section-base" style={{ background: '#FFFFFF', paddingBlock: '40px', overflow: 'hidden' }}>
      <div className="container" style={{ overflow: 'hidden' }}>

        {/* Logo carousel — seamless scroll */}
        <style>{`
          @keyframes cw-logo-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .cw-logo-track {
            display:     flex;
            align-items: center;
            gap:         52px;
            width:       max-content;
            animation:   cw-logo-scroll 28s linear infinite;
          }
          .cw-logo-track:hover { animation-play-state: paused; }
          .cw-logo-item img {
            filter:     grayscale(100%);
            opacity:    0.45;
            transition: filter 0.35s ease, opacity 0.35s ease;
          }
          .cw-logo-item:hover img { filter: grayscale(0%); opacity: 1; }
        `}</style>

        <p style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          color:         'rgba(0,0,0,0.30)',
          marginBottom:  '20px',
          textAlign:     'center',
        }}>
          Entrepreneurs et PME qui nous font confiance
        </p>

        <div style={{
          maskImage:       'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          overflow:        'hidden',
        }}>
          <div className="cw-logo-track">
            {doubled.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="cw-logo-item" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{ height: '40px', width: 'auto', maxWidth: '130px', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 2 — ABOUT / POSITIONNEMENT
   Architecture B : texte 55% + image 45% · piliers en bullet points
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 2
   ─────────────────────────────────────────────────────────────── */

// CSS responsive injecté une seule fois — évite Tailwind pour les breakpoints complexes
const ABOUT_CSS = `
@media (min-width: 768px) and (max-width: 1023px) {
  .about-grid  { flex-direction: column !important; }
  .about-img   { order: -1; height: 320px !important; min-height: unset !important; margin-right: 0 !important; border-radius: 12px !important; }
  .about-title { font-size: clamp(1.5rem, 3.5vw, 2rem) !important; }
  .about-body  { font-size: 16px !important; }
}
@media (max-width: 767px) {
  .about-grid  { flex-direction: column !important; }
  .about-img   { order: -1; height: 280px !important; min-height: unset !important; margin-right: 0 !important; border-radius: 12px !important; }
  .about-title { font-size: clamp(1.6875rem, 5vw, 2.1875rem) !important; }
  .about-body  { font-size: 16px !important; }
}
.about-img-inner { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
.about-img:hover .about-img-inner { transform: scale(1.03); }
`

function StatsBand() {
  const [ref, visible] = useReveal()
  return (
    <section style={{ background: '#EEF2F7' }}>
      <div className="container" style={{ paddingBlock: 0 }}>
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            ...reveal(visible, 0),
            gap:        '1px',
            background: 'var(--border-default)',
          }}
        >
          {STATS_BAND.map(s => (
            <div key={s.value} style={{ background: '#FFFFFF', padding: '28px 24px', textAlign: 'center' }}>
              <div style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    700,
                fontSize:      'clamp(1.8rem, 3vw, 2.5rem)',
                letterSpacing: '-0.04em',
                color:         'var(--text-primary)',
                lineHeight:    1,
                marginBottom:  '6px',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '13px',
                color:      'var(--text-tertiary)',
                fontWeight: 500,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ABOUT_ITEMS: React.ReactNode[] = [
  <>Plus de leads grâce à des sites pensés pour la conversion</>,
  <>Plus de ventes avec des boutiques en ligne qui performent</>,
]

const ABOUT_PILLS = [
  '15+ projets livrés',
  '98% satisfaction',
  'ROI moyen x3',
] as const

function AboutSection() {
  const [ref, visible] = useReveal()

  return (
    <section
      id="about"
      className="section-base"
      style={{ background: '#FFFFFF', paddingBlock: 'clamp(5rem, 9vw, 8rem)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: ABOUT_CSS }} />
      <div className="container">

        <div
          ref={ref}
          className="about-grid"
          style={{
            display:     'flex',
            gap:         'clamp(4rem, 7vw, 6rem)',
            alignItems:  'center',
          }}
        >

          {/* ── COLONNE GAUCHE 55% — Texte ── */}
          <div
            style={{
              flex:          '0 0 55%',
              display:       'flex',
              flexDirection: 'column',
              justifyContent:'center',
              paddingBlock:  'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >

            {/* Eyebrow */}
            <span style={{ ...eyebrow, ...reveal(visible, 0), textAlign: 'left', marginBottom: '20px' }}>
              CONNECT WEB
            </span>

            {/* Titre H2 */}
            <h2
              className="about-title"
              style={{
                ...sectionTitle,
                ...reveal(visible, 70),
                fontFamily:    'Clash Display, var(--font-montserrat), sans-serif',
                fontSize:      'clamp(2.125rem, 2.8vw, 2.375rem)',
                fontWeight:    600,
                lineHeight:    1.25,
                letterSpacing: '-0.03em',
                color:         'var(--text-primary)',
                textAlign:     'left',
                margin:        0,
                marginBottom:  '20px',
                maxWidth:      'none',
              }}
            >
              Solutions digitales{' '}
              <span style={{ color: 'var(--color-orange-500)', whiteSpace: 'nowrap' }}>sur mesure</span>
              <br />
              pour votre croissance.
            </h2>

            {/* Paragraphe — 2 phrases, voix unique */}
            <p
              className="about-body"
              style={{
                ...sectionSubtitle,
                ...reveal(visible, 130),
                maxWidth:     'none',
                fontSize:     '18px',
                lineHeight:   1.7,
                marginBottom: '32px',
                color:        '#0A0A0A',
                textAlign:    'justify',
              }}
            >
              Projets abandonnés, outils inadaptés, prestataires qui disparaissent — trop d&apos;entreprises subissent le digital au lieu d&apos;en profiter. Connect-Web est là pour changer ça : nous accompagnons les entreprises, PME, commerces et entrepreneurs qui veulent faire du digital un vrai levier de croissance, pas une source de frustration.
              <br /><br />
              Notre mission : concevoir des solutions concrètes face aux vraies problématiques — visibilité en ligne, génération de leads, automatisation des processus et ventes en ligne.
            </p>



            {/* CTA — outline orange */}
            <div style={{ ...reveal(visible, 270) }}>
              <Link
                href="/a-propos"
                style={{ ...BTN_SEC_STYLE, gap: '8px' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_SEC_HOV; el.style.borderColor = BTN_SEC_HOV; el.style.color = '#FFFFFF' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = '#F05A28'; el.style.color = '#F05A28' }}
                onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
                onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
              >
                En savoir plus
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

          {/* ── COLONNE DROITE 45% — Image ── */}
          <div
            className="about-img"
            style={{
              flex:         '1 1 45%',
              position:     'relative',
              borderRadius: '12px',
              overflow:     'hidden',
              alignSelf:    'stretch',
              minHeight:    '300px',
              flexShrink:   0,
              boxShadow:    '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="about-img-inner"
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image
                src="/Hero/apropos.jpg"
                alt="Connect Web — Agence digitale à Dakar, Sénégal"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 3 — SERVICES / NOS EXPERTISES
   section-base (#FFFFFF) · tabs filtrage · carousel Embla
   "tous" = 4 cartes + peek · autres tabs = exactement 3 cartes
   ─────────────────────────────────────────────────────────────── */
type ServiceFilter = 'tous' | 'dev' | 'ecom' | 'integration' | 'nfc'


interface Service {
  icon:  React.ElementType
  titre: string
  desc:  string
  techs: string[]
  href:  string
  dark:  boolean
}

const SERVICES_MAP: Record<ServiceFilter, Service[]> = {
  tous: [
    {
      icon:  Code2,
      titre: 'Applications web & mobile',
      desc:  "Sites haute performance, apps métier et mobiles. Nous intégrons l'IA et l'automatisation dès la conception pour transformer votre présence en ligne en outil de conversion.",
      techs: ['Next.js', 'React', 'React Native', 'Node.js'],
      href:  '/services/developpement',
      dark:  false,
    },
    {
      icon:  ShoppingCart,
      titre: 'E-Commerce & boutique',
      desc:  "Boutiques optimisées pour la conversion et la croissance. Recommandations IA, automatisation marketing et analytics pour augmenter votre chiffre d'affaires.",
      techs: ['Shopify', 'WooCommerce', 'Stripe', 'Paiement mobile'],
      href:  '/services/ecommerce',
      dark:  false,
    },
    {
      icon:  Layers,
      titre: 'ERP & automatisation',
      desc:  "Connectez vos outils, automatisez vos workflows, éliminez les tâches répétitives. ERP, CRM et automatisation marketing pour scaler votre entreprise.",
      techs: ['Odoo', 'HubSpot', 'API REST', 'Webhooks'],
      href:  '/services/integration',
      dark:  false,
    },
    {
      icon:  Wifi,
      titre: 'Solutions NFC',
      desc:  "Cartes de visite intelligentes, menus digitaux et check-in hôteliers. Technologie sans contact couplée à l'analytics pour des interactions mesurables et un avantage concurrentiel immédiat.",
      techs: ['NFC', 'QR Code', 'Dashboard analytics', 'Données temps réel', 'Profil digital', 'vCard', 'Check-in hôtel', 'Multi-langues'],
      href:  '/services/nfc',
      dark:  false,
    },
  ],
  dev: [
    {
      icon:  Code2,
      titre: 'Applications web & mobile',
      desc:  "Sites haute performance, apps métier et mobiles. Nous intégrons l'IA et l'automatisation dès la conception pour transformer votre présence en ligne en outil de conversion.",
      techs: ['Next.js', 'React', 'React Native', 'Node.js'],
      href:  '/services/developpement',
      dark:  false,
    },
    {
      icon:  Cpu,
      titre: 'Logiciels SaaS',
      desc:  "Plateformes SaaS sur mesure, outils internes et dashboards analytics. Architecture multi-tenant, API documentée et déploiement continu — votre produit tient la charge et évolue sans refonte.",
      techs: ['SaaS', 'TypeScript', 'PostgreSQL', 'Vercel', 'Docker', 'Redis', 'CI/CD', 'Stripe'],
      href:  '/services/saas',
      dark:  false,
    },
    {
      icon:  Globe,
      titre: 'Sites vitrine & landing pages',
      desc:  "Pages à fort taux de conversion, sites corporate et landing pages. Lighthouse 95+ garanti, SEO natif et CMS intégré pour mettre à jour vos contenus sans passer par un développeur.",
      techs: ['Next.js', 'Sanity CMS', 'SEO', 'Lighthouse 95+', 'Vercel', 'Tailwind CSS', 'Analytics', 'Schema.org'],
      href:  '/services/vitrine',
      dark:  false,
    },
  ],
  ecom: [
    {
      icon:  ShoppingCart,
      titre: 'E-Commerce & boutique',
      desc:  "Boutiques optimisées pour la conversion et la croissance. Recommandations IA, automatisation marketing et analytics pour augmenter votre chiffre d'affaires.",
      techs: ['Shopify', 'WooCommerce', 'Stripe', 'Paiement mobile'],
      href:  '/services/ecommerce',
      dark:  false,
    },
    {
      icon:  Layers,
      titre: 'Boutique Shopify',
      desc:  "Configuration complète de votre boutique Shopify : thème sur mesure, paiement Wave & Orange Money, synchronisation stock, applications marketing — opérationnel en 2 semaines. Vos clients paient comme ils le font chaque jour. Votre boutique tourne sans vous même la nuit.",
      techs: ['Shopify', 'Liquid', 'Wave', 'Orange Money', 'Klaviyo', 'Apps marketing', 'Analytics', 'SEO'],
      href:  '/services/shopify',
      dark:  false,
    },
    {
      icon:  Globe,
      titre: 'Marketplace',
      desc:  "Plateformes multi-vendeurs adaptées au marché ouest-africain : gestion des commissions, paiement mobile intégré, interface vendeur autonome et tableau de bord analytics en temps réel. Vos vendeurs gèrent leur stock depuis leur téléphone. Vous encaissez votre commission automatiquement.",
      techs: ['Multi-vendeurs', 'Wave', 'Orange Money', 'Analytics', 'API', 'Commissions', 'Dashboard', 'Notifications'],
      href:  '/services/marketplace',
      dark:  false,
    },
  ],
  integration: [
    {
      icon:  Layers,
      titre: 'ERP & automatisation',
      desc:  "Connectez vos outils, automatisez vos workflows, éliminez les tâches répétitives. ERP, CRM et automatisation marketing pour scaler votre entreprise.",
      techs: ['Odoo', 'HubSpot', 'API REST', 'Webhooks'],
      href:  '/services/integration',
      dark:  false,
    },
    {
      icon:  MessageSquare,
      titre: 'CRM & relation client',
      desc:  "Implémentation et personnalisation de CRM adaptés à votre process commercial. Suivi des leads, pipelines de vente, automatisation des relances — vos équipes se concentrent sur la vente, pas sur l'administration. Aucun lead ne tombe plus dans l'oubli. Votre taux de conversion augmente dès le premier mois.",
      techs: ['HubSpot', 'Odoo CRM', 'Pipedrive', 'Automatisation', 'Reporting', 'Email', 'Segments', 'Analytics'],
      href:  '/services/crm',
      dark:  false,
    },
    {
      icon:  Zap,
      titre: 'API & intégrations',
      desc:  "Synchronisation en temps réel entre vos outils métier : ERP, CRM, plateformes e-commerce, outils marketing. Éliminez les doubles saisies et les erreurs de synchronisation définitivement. Vos données circulent sans friction entre tous vos systèmes. Un seul tableau de bord pour piloter l'ensemble.",
      techs: ['API REST', 'GraphQL', 'Webhooks', 'n8n', 'Zapier', 'Make', 'Stripe', 'Slack'],
      href:  '/services/api',
      dark:  false,
    },
  ],
  nfc: [
    {
      icon:  Wifi,
      titre: 'Solutions NFC',
      desc:  "Cartes de visite intelligentes, menus digitaux et check-in hôteliers. Technologie sans contact couplée à l'analytics pour des interactions mesurables et un avantage concurrentiel immédiat.",
      techs: ['NFC', 'QR Code', 'Dashboard analytics', 'Données temps réel', 'Profil digital', 'vCard', 'Check-in hôtel', 'Multi-langues'],
      href:  '/services/nfc',
      dark:  false,
    },
    {
      icon:  CreditCard,
      titre: 'Carte NFC',
      desc:  "Partagez votre profil, portfolio ou contact en un tap. Carte NFC personnalisée livrée en 5 jours, dashboard analytics inclus — combien de personnes ont consulté votre profil cette semaine ? Vous mettez à jour vos infos sans changer de carte. Votre réseau professionnel toujours à jour.",
      techs: ['NFC', 'Profil digital', 'Analytics', 'vCard', 'QR Code', 'RFID', 'Personnalisation', 'Partage instantané'],
      href:  '/services/carte-nfc',
      dark:  false,
    },
    {
      icon:  Smartphone,
      titre: 'Menu digital',
      desc:  "Menu QR code pour restaurants, hôtels et cafés. Mise à jour en temps réel sans impression, multi-langues, commande directe optionnelle — réduisez vos coûts et améliorez l'expérience client. Vos prix changent en 30 secondes depuis votre téléphone. Fini les menus imprimés obsolètes.",
      techs: ['QR Code', 'Menu digital', 'Multi-langues', 'Commande en ligne', 'Analytics', 'Réservation', 'Paiement', 'Temps réel'],
      href:  '/services/menu-digital',
      dark:  false,
    },
  ],
}

const SERVICES_TOP6: Service[] = [
  SERVICES_MAP.tous[0],  // Dev. web & mobile
  SERVICES_MAP.tous[1],  // E-Commerce & boutique
  SERVICES_MAP.tous[2],  // ERP & automatisation
  SERVICES_MAP.dev[1],   // Logiciels SaaS
  SERVICES_MAP.dev[2],   // Sites vitrine & landing pages
  SERVICES_MAP.tous[3],  // Solutions NFC
]

const SERVICES_CSS = `
@media (max-width: 639px)  { .svc-grid { grid-template-columns: 1fr !important; } }
@media (min-width: 640px) and (max-width: 1023px) { .svc-grid { grid-template-columns: repeat(2,1fr) !important; } }
@media (max-width: 767px) {
  .svc-section          { overflow-x: hidden !important; }
  .svc-container        { padding-left: 16px !important; padding-right: 16px !important; }
  .svc-grid             { width: 100% !important; margin: 0 !important; padding: 0 !important; }
  .svc-grid > *         { width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; }
  .svc-grid .card-icon  { margin-left: auto !important; margin-right: auto !important; }
  .svc-grid h3          { text-align: center !important; }
  .svc-grid p           { text-align: center !important; }
  .svc-grid .card-link  { justify-content: center !important; }
  .svc-grid .card-techs { justify-content: center !important; }
  .svc-btn              { margin-top: 16px !important; }
}
`

/* ── ServiceCard — hover state isolé par carte ── */
function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const [hovered, setHovered] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(wrapRef, { once: true, margin: '-50px' })
  const Icon    = svc.icon

  return (
    <div
      ref={wrapRef}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s cubic-bezier(0,0,0.2,1) ${index * 90}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        'flex',
          flexDirection:  'column',
          height:         '100%',
          minHeight:      '360px',
          padding:        '25px 28px 28px',
          background:     '#FFFFFF',
          borderRadius:   '14px',
          border:         '1px solid var(--border-default)',
          borderTop:      hovered ? `3px solid ${OR_500}` : '3px solid transparent',
          boxShadow:      hovered ? '0 14px 44px rgba(27,42,74,0.11)' : '0 1px 3px rgba(0,0,0,0.04)',
          transform:      hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition:     'box-shadow 0.25s ease, transform 0.25s ease, border-top-color 0.25s ease',
          cursor:         'default',
        }}
      >
        {/* Icône */}
        <div className="card-icon" style={{
          width:          '44px',
          height:         '44px',
          borderRadius:   '10px',
          background:     hovered ? OR_500 : 'rgba(232,97,26,0.08)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          marginBottom:   '16px',
          flexShrink:     0,
          transition:     'background 0.25s ease',
        }}>
          <Icon size={20} color={hovered ? '#FFFFFF' : OR_500} strokeWidth={1.8} style={{ transition: 'color 0.25s ease' }} />
        </div>

        {/* Titre */}
        <h3 style={{
          fontFamily:   'var(--font-heading)',
          fontWeight:   500,
          fontSize:     'clamp(18px, 2.5vw, 20px)',
          color:        'var(--text-primary)',
          marginBottom: '10px',
          lineHeight:   1.25,
        }}>
          {svc.titre}
        </h3>

        {/* Description — clamp 4 lignes */}
        <p style={{
          fontFamily:      'var(--font-body)',
          fontSize:        'var(--card-text-size)',
          fontWeight:      'var(--card-text-weight)',
          lineHeight:      1.65,
          color:           '#0A0A0A',
          marginBottom:    '16px',
          textAlign:       'left',
          display:         '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow:        'hidden',
        }}>
          {svc.desc}
        </p>

        {/* Badges techs */}
        <div className="card-techs" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px', overflow: 'hidden' }}>
          {svc.techs.slice(0, 4).map(t => (
            <span key={t} style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '11px',
              fontWeight:   500,
              color:        BL_DARK,
              background:   hovered ? 'rgba(232,97,26,0.07)' : 'rgba(27,42,74,0.06)',
              border:       `1px solid ${hovered ? 'rgba(232,97,26,0.15)' : 'rgba(27,42,74,0.09)'}`,
              borderRadius: '5px',
              padding:      '3px 8px',
              whiteSpace:   'nowrap',
              lineHeight:   1.4,
              transition:   'background 0.25s ease, border-color 0.25s ease',
            }}>{t}</span>
          ))}
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* CTA — séparateur + lien */}
        <div className="card-link" style={{
          paddingTop:  '16px',
          borderTop:   `1px solid ${hovered ? 'rgba(232,97,26,0.12)' : 'rgba(0,0,0,0.06)'}`,
          transition:  'border-top-color 0.25s ease',
          display:     'flex',
        }}>
          <Link
            href={svc.href}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            hovered ? '10px' : '6px',
              fontFamily:     'var(--font-body)',
              fontSize:       '14px',
              fontWeight:     600,
              color:          OR_500,
              textDecoration: 'none',
              transition:     'gap 0.2s ease',
            }}
          >
            Découvrir <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServicesSection() {
  const [ref, visible] = useReveal()

  return (
    <section id="services" className="section-base svc-section" style={{ background: '#F5F5F3' }}>
      <style dangerouslySetInnerHTML={{ __html: SERVICES_CSS }} />
      <div className="container svc-container" style={{ paddingBlock: 0 }}>

        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0) }}>NOS EXPERTISES</span>
          <h2 style={{ ...sectionTitle, ...reveal(visible, 80), fontSize: '1.875rem', fontFamily: 'Clash Display, var(--font-montserrat), sans-serif', fontWeight: 500 }}>
            Nos expertises, au service de votre croissance.
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Des sites, boutiques en ligne et outils automatisés qui convertissent. Chaque solution est pensée pour générer du ROI et accélérer votre croissance.
          </p>
        </div>

        {/* Grille 3×2 — align-items stretch */}
        <div
          className="svc-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            alignItems:          'stretch',
            gap:                 '20px',
            marginBottom:        '40px',
          }}
        >
          {SERVICES_TOP6.map((svc, i) => (
            <ServiceCard key={svc.titre} svc={svc} index={i} />
          ))}
        </div>

        {/* Bouton Voir plus */}
        <div className="svc-btn" style={{ textAlign: 'center', ...reveal(visible, 320) }}>
          <Link
            href="/services"
            style={{ ...BTN_PRI_STYLE, gap: '8px' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI_HOV; el.style.borderColor = BTN_PRI_HOV }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }}
            onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
            onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
          >
            Voir tous nos services <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 4 — PROCESS + ENGAGEMENTS
   section-base (#FFFFFF) · stepper vertical 4 étapes
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 4
   ─────────────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', titre: 'Audit & diagnostic',          desc: "Analyse de votre existant, identification des blocages et opportunités.",                badge: 'Audit livré en 48h'           },
  { num: '02', titre: 'Stratégie & architecture',    desc: "Choix technologiques, roadmap priorisée, estimation budgétaire transparente.",                                      badge: 'Stack validée avec vous'      },
  { num: '03', titre: 'Développement agile',          desc: "Code propre, testé, documenté. Vous suivez l'avancement en temps réel sur votre tableau de bord.",            badge: 'Accès tableau de bord live'   },
  { num: '04', titre: 'Lancement & optimisation',    desc: "Mise en production, monitoring, formation équipe. On reste là après le go-live.",                                  badge: 'Suivi post-lancement inclus'  },
]

function ProcessSection() {
  const [ref, visible] = useReveal()

  return (
    <section id="process" className="section-base" style={{ background: '#FFFFFF' }}>
      <div className="container" style={{ paddingBlock: 0 }}>

        {/* Header centré */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0) }}>NOTRE MÉTHODE</span>
          <h2 style={{ ...sectionTitle, ...reveal(visible, 80), fontSize: '2rem', fontFamily: 'Clash Display, var(--font-montserrat), sans-serif', fontWeight: 500 }}>
            Simple, transparent, sans surprise.
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Un process éprouvé avec des entrepreneurs, PME et startups. De la première prise de contact à la mise en production, vous gardez le contrôle.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', overflowX: 'hidden', ...reveal(visible, 220) }}>

          {/* Ligne horizontale — desktop uniquement */}
          <div aria-hidden="true" className="hidden lg:block" style={{
            position:     'absolute',
            top:          '20px',
            left:         '0',
            right:        '0',
            height:       '2px',
            background:   `linear-gradient(to right, rgba(232,98,42,0.15), ${OR_500}, rgba(232,98,42,0.15))`,
            borderRadius: '2px',
            zIndex:       0,
          }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px' }}>
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Cercle numéroté */}
                  <div style={{
                    width:           '40px',
                    height:          '40px',
                    borderRadius:    '50%',
                    background:      isEven ? OR_500 : '#FFFFFF',
                    border:          `2px solid ${OR_500}`,
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    position:        'relative',
                    zIndex:          1,
                    flexShrink:      0,
                    boxShadow:       isEven ? `0 0 0 5px rgba(232,98,42,0.12)` : `0 0 0 5px rgba(232,98,42,0.06)`,
                    marginBottom:    '20px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: isEven ? '#FFFFFF' : OR_500, letterSpacing: '0.02em' }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Carte */}
                  <div
                    style={{
                      width:        '100%',
                      flex:         1,
                      background:   isEven ? '#FAFAFA' : '#FFFFFF',
                      border:       isEven ? `1px solid rgba(232,98,42,0.15)` : `1px solid var(--border-default)`,
                      borderTop:    `3px solid ${isEven ? OR_500 : 'var(--border-default)'}`,
                      borderRadius: '10px',
                      padding:      '20px',
                      boxShadow:    isEven ? '0 2px 8px rgba(232,98,42,0.06)' : '0 1px 4px rgba(0,0,0,0.05)',
                      transition:   'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = 'translateY(-3px)'
                      el.style.boxShadow = isEven ? '0 10px 28px rgba(232,98,42,0.13)' : '0 8px 22px rgba(0,0,0,0.09)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = isEven ? '0 2px 8px rgba(232,98,42,0.06)' : '0 1px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(17px, 2.5vw, 19px)', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3, textAlign: 'left' }}>
                      {step.titre}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '16.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: '0 0 14px', textAlign: 'justify', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {step.desc}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 600, color: OR_500, background: 'rgba(232,98,42,0.07)', border: '1px solid rgba(232,98,42,0.18)', borderRadius: '6px', padding: '5px 10px', whiteSpace: 'nowrap' }}>
                      <Check size={11} color={OR_500} strokeWidth={2.5} />
                      {step.badge}
                    </span>
                  </div>

                </div>
              )
            })}
          </div>
        </div>


      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 5 — RÉALISATIONS
   section-alt (#F4F6FA) · stats band · carousel Embla · 3 projets
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 5
   ─────────────────────────────────────────────────────────────── */
const STATS_BAND = [
  { value: '50+', label: 'projets livrés'          },
  { value: '98%', label: 'de satisfaction client'   },
  { value: '2-8', label: 'semaines de délai moyen' },
  { value: 'x3',  label: 'ROI moyen constaté'      },
]

/* ─────────────────────────────────────────────────────────────────
   SECTION 6 — TÉMOIGNAGES
   section-base (#FFFFFF) · 3 cartes · central = section-brand
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 6
   ─────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:  "Connect-Web a transformé notre présence en ligne en véritable outil de génération de leads. Le ROI a été visible dès le premier trimestre — notre trafic a triplé et les demandes de contact ont explosé.",
    name:   '[Nom responsable NSS]',
    role:   'Coordinatrice, NSS/WAS Africa',
    dark:   false,
  },
  {
    quote:  "Je voulais vendre en ligne sans perdre l'identité de ma marque. Connect-Web a créé une boutique en ligne qui convertit vraiment — le taux de conversion a dépassé nos attentes dès le premier mois.",
    name:   '[Nom fondatrice ATTA]',
    role:   'Fondatrice & entrepreneure, ATTA Africa',
    dark:   true,
  },
  {
    quote:  "L'automatisation de notre ERP a réduit nos tâches administratives de 60%. En tant que PME, on n'a pas de temps à perdre — Connect-Web nous a permis de nous concentrer sur la croissance de notre business.",
    name:   '[Nom client Odoo]',
    role:   'Directeur, [Entreprise]',
    dark:   false,
  },
]

function TestimonialsSection() {
  const [ref, visible] = useReveal()

  return (
    <section id="temoignages" className="section-base" style={{ background: '#EEF2F7' }}>
      <div className="container" style={{ paddingBlock: 0 }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0), display: 'block' }}>ILS NOUS FONT CONFIANCE</span>
          <h2 style={{
            ...sectionTitle,
            ...reveal(visible, 80),
            maxWidth:   '700px',
            margin:     '0 auto',
            fontSize:   '2rem',
            textAlign:  'center',
            fontFamily: 'Clash Display, var(--font-montserrat), sans-serif',
            fontWeight: 500,
          }}>
            Pas des promesses,{' '}
            <span style={{ color: 'var(--color-orange-500)' }}>des preuves.</span>
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Des entrepreneurs et dirigeants de PME témoignent des résultats obtenus. Plus de leads, plus de ventes — ils racontent leur transformation digitale.
          </p>
        </div>

        {/* 3 témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              style={{
                ...reveal(visible, 120 + i * 100),
                margin:        0,
                padding:       '28px',
                background:    t.dark ? BL_DARK : '#F4F6FA',
                borderRadius:  '16px',
                border:        t.dark
                  ? `1px solid ${BL_MED}`
                  : '1px solid var(--border-default)',
                display:       'flex',
                flexDirection: 'column',
                gap:           '20px',
              }}
            >
              {/* Étoiles */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M7 1l1.5 4H13L9.5 8l1.5 4L7 10l-4 2 1.5-4L1 5h4.5z"
                      fill={t.dark ? OR_400 : OR_500}
                    />
                  </svg>
                ))}
              </div>

              {/* Citation */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--card-text-size)',
                fontWeight: 'var(--card-text-weight)',
                lineHeight: 1.7,
                color:      t.dark ? 'var(--text-on-dark-muted)' : '#0A0A0A',
                fontStyle:  'italic',
                flexGrow:   1,
                margin:     0,
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Auteur */}
              <footer>
                <div style={{
                  fontFamily:   'var(--font-heading)',
                  fontWeight:   700,
                  fontSize:     '14px',
                  color:        t.dark ? '#FFFFFF' : 'var(--text-primary)',
                  marginBottom: '2px',
                }}>{t.name}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '13px',
                  color:      t.dark ? 'rgba(255,255,255,0.45)' : 'var(--text-tertiary)',
                }}>{t.role}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 7 — OFFRES (tabs 4 domaines × 3 offres + FAQ)
   section-base (#FFFFFF) · REMPLACE tarifs — PAS de prix
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 7
   ─────────────────────────────────────────────────────────────── */
interface Offre {
  categorie: string
  titre:     string
  features:  string[]
  idealPour: string
  populaire: boolean
}

const OFFRES_HOME: Offre[] = [
  {
    categorie: 'E-Commerce',
    titre:     'Boutique en ligne',
    features:  [
      'Boutique WordPress + WooCommerce',
      'Design personnalisé orienté conversion',
      'Catalogue illimité + variantes',
      'Paiement Wave, Orange Money, CB',
      'SEO avancé + blog intégré',
      'Automatisation email marketing',
      'Formation admin incluse',
      'Support 30 jours post-lancement',
    ],
    idealPour: 'Commerçants, grossistes, PME avec catalogues larges',
    populaire: false,
  },
  {
    categorie: 'Développement Web',
    titre:     'Application web',
    features:  [
      'Application full-stack React / Next.js',
      'Auth, rôles et permissions',
      'Dashboard analytics & reporting',
      'Workflows automatisés par IA',
      'API REST + tests CI/CD',
      'Notifications temps réel',
      'Hébergement cloud inclus',
      '3 mois de support inclus',
    ],
    idealPour: 'Entreprises digitales en croissance, startups, workflows complexes',
    populaire: true,
  },
  {
    categorie: 'Intégration',
    titre:     'ERP Odoo',
    features:  [
      'Audit processus & choix modules',
      'Configuration comptabilité + stock',
      'Gestion ventes et CRM intégrée',
      'Migration données existantes',
      'Workflows personnalisés + IA',
      'Formation équipes par module',
      'Reporting avancé',
      'Support 3 mois post-déploiement',
    ],
    idealPour: 'PME structurées, industrie, distribution',
    populaire: false,
  },
]

const FAQ_ITEMS = [
  {
    q: 'Comment se déroule un projet avec Connect-Web ?',
    a: "Chaque projet commence par un appel de cadrage gratuit. Que vous soyez un entrepreneur qui lance son business en ligne ou une PME qui veut optimiser sa conversion, on définit ensemble vos objectifs de croissance, le périmètre et le planning. Vous recevez une proposition avec ROI estimé sous 48h.",
  },
  {
    q: 'Quels sont vos délais de livraison ?',
    a: "Selon la complexité\u00a0: 1-2 semaines pour un site vitrine, 2-3 semaines pour une boutique en ligne Shopify, 4-6 semaines pour un e-commerce WooCommerce, 6-12 semaines pour une application sur-mesure. Chaque proposition inclut un planning précis avec des jalons.",
  },
  {
    q: 'Proposez-vous de la maintenance après livraison ?',
    a: "Oui. Chaque projet inclut une période de support (1 à 6 mois selon la formule). Au-delà, nous proposons des contrats de maintenance, d'optimisation de conversion et d'accompagnement à la croissance digitale.",
  },
  {
    q: 'Travaillez-vous avec des clients internationaux ?',
    a: "Oui. Basés à Dakar, nous collaborons avec des entrepreneurs et des entreprises partout — Sénégal, Afrique, Europe et au-delà. PME locale ou startup internationale, nos outils (Figma, Slack, visio) permettent un suivi fluide à distance.",
  },
  {
    q: "Comment intégrez-vous l'IA et l'automatisation ?",
    a: "Nous utilisons l'intelligence artificielle et l'automatisation là où elles apportent une valeur concrète pour votre business\u00a0: automatisation de workflows, recommandations produit pour le e-commerce, génération de contenu SEO, chatbots, scoring de leads, analytics prédictifs. Pas d'IA pour le buzz — de l'IA pour le ROI et la conversion.",
  },
]

function OffresSection() {
  const [ref, visible] = useReveal()

  return (
    <section
      id="offres"
      className="section-base"
      style={{ background: '#FFFFFF' }}
    >
      <div className="container" style={{ paddingBlock: 0 }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0), display: 'block' }}>NOS OFFRES</span>
          <h2 style={{
            ...sectionTitle,
            ...reveal(visible, 80),
            maxWidth:  '640px',
            margin:    '0 auto 16px',
            fontSize:  '2rem',
            textAlign: 'center',
          }}>
            Une offre claire pour chaque besoin.
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Chaque entreprise a des besoins différents. Découvrez nos formules adaptées aux entrepreneurs, commerçants et PME — du site vitrine à l'application.
          </p>
        </div>

        {/* Cartes offres — 3 offres statiques : Dev · Ecom · Intégration */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', marginBottom: '40px' }}>
          {OFFRES_HOME.map(offre => (
            <div
              key={offre.titre}
              style={{
                display:        'flex',
                flexDirection:  'column',
                padding:        '28px',
                background:     offre.populaire ? BL_DARK : '#FFFFFF',
                borderRadius:   '16px',
                border:         offre.populaire
                  ? `2px solid ${BL_MED}`
                  : '1px solid var(--border-default)',
                position:       'relative',
              }}
            >
              {/* Badge populaire — CLAUDE.md : bg-[#111111] text-white → on utilise BL_DARK */}
              {offre.populaire && (
                <span style={{
                  position:      'absolute',
                  top:           '-12px',
                  left:          '50%',
                  transform:     'translateX(-50%)',
                  background:    OR_500,
                  color:         '#FFFFFF',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '11px',
                  fontWeight:    700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderRadius:  '100px',
                  padding:       '4px 14px',
                  whiteSpace:    'nowrap',
                }}>
                  Populaire
                </span>
              )}

              {/* Niveau */}
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '12px',
                fontWeight:    600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color:         offre.populaire ? OR_400 : 'var(--color-orange-500)',
                marginBottom:  '8px',
                display:       'block',
              }}>{offre.categorie}</span>

              {/* Titre */}
              <h3 style={{
                fontFamily:   'var(--font-heading)',
                fontWeight:   500,
                fontSize:     'clamp(18px, 2.5vw, 20px)',
                color:        offre.populaire ? '#FFFFFF' : 'var(--text-primary)',
                marginBottom: '24px',
                lineHeight:   1.2,
                whiteSpace:   'nowrap',
              }}>{offre.titre}</h3>

              {/* Features */}
              <ul style={{
                listStyle:     'none',
                padding:       0,
                margin:        '0 0 24px 0',
                display:       'flex',
                flexDirection: 'column',
                gap:           '10px',
                flexGrow:      1,
              }}>
                {offre.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check
                      size={14}
                      color={offre.populaire ? OR_400 : OR_500}
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginTop: '3px' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '16px',
                      fontWeight: 'var(--font-light)',
                      lineHeight: 1.55,
                      color:      offre.populaire ? '#FFFFFF' : '#0A0A0A',
                      whiteSpace: 'nowrap',
                    }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Idéal pour */}
              <div style={{
                padding:      '12px',
                background:   offre.populaire ? 'rgba(232,97,26,0.12)' : 'rgba(27,42,74,0.05)',
                borderRadius: '8px',
                marginBottom: '20px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '14px',
                  fontWeight: 600,
                  color:      offre.populaire ? OR_400 : 'var(--color-orange-500)',
                }}>Idéal pour&nbsp;: </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '14px',
                  color:      offre.populaire ? 'var(--text-on-dark-muted)' : '#0A0A0A',
                }}>{offre.idealPour}</span>
              </div>

              {/* CTA — CLAUDE.md : #1B2A4A défaut, hover orange */}
              <Link
                href="/contact"
                style={{ ...BTN_PRI_STYLE, gap: '6px', width: '100%' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI_HOV; el.style.borderColor = BTN_PRI_HOV }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }}
                onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
                onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
              >
                Démarrer ce projet <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bouton Voir les offres */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link
            href="/services"
            style={{ ...BTN_SEC_STYLE, gap: '8px' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_SEC_HOV; el.style.borderColor = BTN_SEC_HOV; el.style.color = '#FFFFFF' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = '#F05A28'; el.style.color = '#F05A28' }}
            onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
            onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
          >
            Voir toutes les offres <ArrowRight size={15} />
          </Link>
        </div>

        {/* CTA full-width image de fond */}
        <div style={{ marginBottom: '64px' }} />

      </div>
    </section>
  )
}

function CtaBannerSection() {
  return (
    <section style={{
      position:           'relative',
      width:              '100%',
      backgroundImage:    "url('/Hero/hero-image.png')",
      backgroundSize:     'cover',
      backgroundPosition: 'center',
      backgroundRepeat:   'no-repeat',
    }}>
      {/* Overlay */}
      <div aria-hidden="true" style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        bottom:     0,
        background: 'rgba(13,27,42,0.72)',
        zIndex:     0,
      }} />

      {/* Contenu — par dessus l'overlay */}
      <div style={{
        position:       'relative',
        zIndex:         1,
        paddingTop:     '6rem',
        paddingBottom:  '6rem',
        paddingLeft:    'clamp(1rem, 5vw, 2rem)',
        paddingRight:   'clamp(1rem, 5vw, 2rem)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
      }}>

        {/* Eyebrow */}
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '12px',
          fontWeight:    600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color:         'var(--color-orange-500)',
          marginBottom:  '16px',
        }}>
          Travaillons ensemble
        </span>

        {/* Titre */}
        <h2 style={{
          fontFamily:    'Clash Display, var(--font-montserrat), sans-serif',
          fontWeight:    500,
          fontSize:      'clamp(1.75rem, 3.5vw, 2.5rem)',
          lineHeight:    1.1,
          letterSpacing: '-0.03em',
          color:         '#FFFFFF',
          marginBottom:  '20px',
          maxWidth:      '640px',
        }}>
          Votre projet mérite mieux.
        </h2>

        {/* Sous-titre */}
        <p style={{
          fontFamily:   'var(--font-jost)',
          fontSize:     'clamp(0.9375rem, 1.5vw, 1.0625rem)',
          fontWeight:   400,
          lineHeight:   1.65,
          color:        'rgba(255,255,255,0.75)',
          marginBottom: '36px',
          maxWidth:     '480px',
        }}>
          Estimation gratuite, réponse sous 48h. Sans engagement.
        </p>

        {/* Boutons */}
        <div style={{
          display:        'flex',
          flexDirection:  'row',
          alignItems:     'center',
          justifyContent: 'center',
          flexWrap:       'wrap',
          gap:            '16px',
        }}>
          <Link
            href="/contact"
            style={{ ...BTN_PRI_STYLE, gap: '8px' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI_HOV; el.style.borderColor = BTN_PRI_HOV }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }}
            onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
            onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
          >
            Démarrer mon projet <ArrowRight size={16} />
          </Link>

          <Link
            href="/realisations"
            style={{ ...BTN_SEC_STYLE, gap: '8px', background: '#1B2A3B', color: '#FFFFFF', borderColor: '#1B2A3B' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#1B2A3B'; el.style.borderColor = '#1B2A3B' }}
            onMouseDown={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
            onMouseUp={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
          >
            Voir nos réalisations
          </Link>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [ref, visible] = useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="section-base" style={{ background: '#F7F8FA' }}>
      <div className="container" style={{ paddingBlock: 0 }}>

        {/* Header — même style que Nos Offres */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0), display: 'block' }}>BESOIN D'AIDE&nbsp;?</span>
          <h2 style={{
            ...sectionTitle,
            ...reveal(visible, 80),
            maxWidth:  '640px',
            margin:    '0 auto 16px',
            fontSize:  '2rem',
            textAlign: 'center',
          }}>
            Questions fréquentes
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Délais, technologies, maintenance — retrouvez les réponses aux questions fréquentes avant de démarrer votre projet de transformation digitale.
          </p>
        </div>

        {/* Accordéon */}
        <div
          style={{
            maxWidth:      '720px',
            margin:        '0 auto',
            display:       'flex',
            flexDirection: 'column',
            gap:           '6px',
            ...reveal(visible, 200),
          }}
        >
          {FAQ_ITEMS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: '10px',
                border:       '1px solid var(--border-default)',
                overflow:     'hidden',
                background:   '#FFFFFF',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                style={{
                  width:          '100%',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  gap:            '16px',
                  padding:        '18px 20px',
                  background:     openFaq === i ? BL_DARK : '#FFFFFF',
                  border:         'none',
                  cursor:         'pointer',
                  textAlign:      'left',
                  transition:     'background 0.2s',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '15px',
                  fontWeight: 500,
                  color:      openFaq === i ? '#FFFFFF' : 'var(--text-primary)',
                  lineHeight: 1.4,
                }}>{faq.q}</span>
                <ChevronDown
                  size={18}
                  color={openFaq === i ? OR_400 : OR_500}
                  style={{
                    flexShrink: 0,
                    transform:  openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
              {openFaq === i && (
                <div style={{ padding: '4px 20px 20px', background: '#FAFAFA' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '15px',
                    fontWeight: 'var(--font-light)' as unknown as number,
                    lineHeight: 1.7,
                    color:      '#0A0A0A',
                    margin:     0,
                    textAlign:  'justify',
                  }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 8 — CTA CONTACT
   section-brand (#1B2A4A) · 2 col (form + alternatives)
   Source : CONTENT_HOMEPAGE_V4.md > SECTION 8
   ─────────────────────────────────────────────────────────────── */
interface ContactForm {
  nom:       string
  email:     string
  entreprise: string
  contact:   string
  profil:    string
  message:   string
}

const SERVICES_BY_PROFIL: Record<string, string[]> = {
  entrepreneur: ['Site vitrine', 'Boutique en ligne', 'Application web', 'Automatisation IA'],
  commercant:   ['Boutique en ligne', 'Site vitrine', 'Automatisation IA', 'Refonte site'],
  pme:          ['Application web', 'ERP / CRM', 'Automatisation IA', 'Refonte site'],
  startup:      ['Application web', 'Boutique en ligne', 'Site vitrine', 'Automatisation IA'],
  autre:        ['Site vitrine', 'Boutique en ligne', 'Application web', 'ERP / CRM', 'Automatisation IA', 'Refonte site'],
}

function ContactCTASection() {
  const [ref, visible]           = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ContactForm>()
  const profil        = watch('profil')
  const servicesList  = profil ? (SERVICES_BY_PROFIL[profil] ?? []) : []

  useEffect(() => { setSelectedServices([]) }, [profil])

  const onSubmit = async (data: ContactForm) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: data.email, nom: data.nom, entreprise: data.entreprise, contact: data.contact, profil: data.profil, services: selectedServices, message: data.message }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("Une erreur est survenue. Contactez-nous directement par WhatsApp ou email.")
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
      <div className="container" style={{ paddingBlock: 0 }}>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3rem)' }}>

          {/* 1 — Titre, sous-titre, intro */}
          <div style={{ ...reveal(visible, 0), textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span style={{ ...eyebrow, textAlign: 'center' }}>
              Prêt à accélérer votre croissance digitale&nbsp;?
            </span>
            <h2 style={{
              fontFamily:    'Clash Display, var(--font-montserrat), sans-serif',
              fontWeight:    500,
              fontSize:      '2rem',
              lineHeight:    1.15,
              letterSpacing: '-0.03em',
              color:         '#FFFFFF',
              marginBottom:  '12px',
            }}>
              Prenons le temps d&apos;analyser votre projet.
            </h2>
          </div>

          {/* Formulaire centré max-width 600px */}
          <div style={{ ...reveal(visible, 160), maxWidth: '600px', width: '100%', margin: '0 auto' }}>
            {submitted ? (
              <div style={{
                padding:      '28px',
                background:   'rgba(232,97,26,0.12)',
                border:       '1px solid rgba(232,97,26,0.30)',
                borderRadius: '12px',
                textAlign:    'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  color:      'var(--color-orange-400)',
                  fontWeight: 600,
                  fontSize:   '16px',
                  margin:     0,
                }}>
                  Demande envoyée ! On vous répond sous 24h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {/* Nom + Email — 50/50 sur desktop, colonne sur mobile/tablette */}
                <div className="flex flex-col lg:flex-row" style={{ gap: '12px' }}>
                  <div style={{ flex: '1 1 50%' }}>
                    <label htmlFor="c-nom" style={labelStyle}>Nom complet</label>
                    <input
                      id="c-nom"
                      type="text"
                      placeholder="Votre nom"
                      style={{ ...inputStyle, borderColor: errors.nom ? OR_500 : 'rgba(255,255,255,0.16)' }}
                      {...register('nom', { required: true })}
                    />
                  </div>
                  <div style={{ flex: '1 1 50%' }}>
                    <label htmlFor="c-email" style={labelStyle}>Email</label>
                    <input
                      id="c-email"
                      type="email"
                      placeholder="votre@email.com"
                      style={{ ...inputStyle, borderColor: errors.email ? OR_500 : 'rgba(255,255,255,0.16)' }}
                      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                  </div>
                </div>

                {/* Entreprise + Contact — 50/50 sur desktop, colonne sur mobile/tablette */}
                <div className="flex flex-col lg:flex-row" style={{ gap: '12px' }}>
                  <div style={{ flex: '1 1 50%' }}>
                    <label htmlFor="c-entreprise" style={labelStyle}>Nom d&apos;entreprise</label>
                    <input
                      id="c-entreprise"
                      type="text"
                      placeholder="Votre entreprise"
                      style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.16)' }}
                      {...register('entreprise')}
                    />
                  </div>
                  <div style={{ flex: '1 1 50%' }}>
                    <label htmlFor="c-contact" style={labelStyle}>Téléphone / WhatsApp</label>
                    <input
                      id="c-contact"
                      type="tel"
                      placeholder="+221 77 000 00 00"
                      style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.16)' }}
                      {...register('contact')}
                    />
                  </div>
                </div>

                {/* Profil */}
                <div>
                  <label htmlFor="c-profil" style={labelStyle}>Vous êtes</label>
                  <select
                    id="c-profil"
                    style={{ ...inputStyle }}
                    {...register('profil', { required: true })}
                  >
                    <option value=""            style={{ background: BL_DARK }}>Sélectionner...</option>
                    <option value="entrepreneur" style={{ background: BL_DARK }}>Entrepreneur</option>
                    <option value="commercant"   style={{ background: BL_DARK }}>Commerçant</option>
                    <option value="pme"          style={{ background: BL_DARK }}>PME</option>
                    <option value="startup"      style={{ background: BL_DARK }}>Startup</option>
                    <option value="autre"        style={{ background: BL_DARK }}>Autre</option>
                  </select>
                </div>

                {/* Services souhaités */}
                {servicesList.length > 0 && (
                  <div>
                    <label style={labelStyle}>Services souhaités</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
                      {servicesList.map(s => {
                        const active = selectedServices.includes(s)
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedServices(prev =>
                              active ? prev.filter(x => x !== s) : [...prev, s]
                            )}
                            style={{
                              fontFamily:   'var(--font-body)',
                              fontSize:     '13px',
                              fontWeight:   600,
                              padding:      '6px 14px',
                              borderRadius: '100px',
                              border:       active ? '1.5px solid #E8622A' : '1.5px solid rgba(255,255,255,0.22)',
                              background:   active ? 'rgba(232,98,42,0.18)' : 'rgba(255,255,255,0.07)',
                              color:        active ? '#E8622A' : 'rgba(255,255,255,0.80)',
                              cursor:       'pointer',
                              transition:   'all 0.18s ease',
                            }}
                          >
                            {s}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="c-message" style={labelStyle}>Votre projet</label>
                  <textarea
                    id="c-message"
                    rows={4}
                    placeholder="Décrivez votre projet — lancer une boutique en ligne, créer un site vitrine, automatiser vos processus, développer une application..."
                    style={{
                      ...inputStyle,
                      height:     'auto',
                      padding:    '12px 16px',
                      resize:     'vertical',
                      lineHeight: 1.6,
                    }}
                    {...register('message', { required: true })}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-orange-400)', margin: 0 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...BTN_PRI_STYLE,
                    gap:        '8px',
                    width:      '100%',
                    background: loading ? 'rgba(240,90,40,0.4)' : BTN_PRI,
                    cursor:     loading ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!loading) { const el = e.currentTarget as HTMLButtonElement; el.style.background = BTN_PRI_HOV; el.style.borderColor = BTN_PRI_HOV }
                  }}
                  onMouseLeave={e => {
                    if (!loading) { const el = e.currentTarget as HTMLButtonElement; el.style.background = BTN_PRI; el.style.borderColor = BTN_PRI }
                  }}
                  onMouseDown={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
                  onMouseUp={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                >
                  {loading ? 'Envoi...' : 'Envoyer ma demande'} {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPORT PRINCIPAL — HomePageClient
   Structure sémantique : <main> · IDs d'ancrage sur chaque section
   ─────────────────────────────────────────────────────────────── */
export function HomePageClient() {
  return (
    <main style={{ overflowX: 'hidden', maxWidth: '100%' }}>
      <HeroSection />
      <StatsGrid />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ClientLogos />
      <TestimonialsSection />
      <OffresSection />
      <CtaBannerSection />
      <FaqSection />
      <ContactCTASection />
    </main>
  )
}
