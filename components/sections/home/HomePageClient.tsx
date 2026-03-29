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
  { target: 40,  suffix: '+',    label: 'Projets livrés',    desc: '', displayValue: '40+' },
  { target: 98,  suffix: '%',    label: 'Clients satisfaits', desc: '' },
  { target: 8,   suffix: ' sem', label: 'Délai livraison',    desc: '', displayValue: '2–8 sem.' },
  { target: 100, suffix: '%',    label: 'Sur mesure',          desc: '' },
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
          background: 'rgba(0,0,0,0.55)',
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
            fontWeight:    400,
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
            fontWeight:    500,
            fontSize:      'clamp(1.7rem, 4.625vw, 3.25rem)',
            lineHeight:    1.1,
            letterSpacing: '-0.01em',
            color:         '#FFFFFF',
            marginBottom:  '24px',
          }}>
            Agence de développement{' '}
            <span style={{ color: 'var(--color-orange-400)', display: 'block' }}>de solutions digitales.</span>
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
            marginBottom: '24px',
            textAlign:    'left',
          }}>
            Applications web &amp; mobile, e-commerce, ERP/CRM et solutions NFC — pour les PME et startups d&apos;Afrique et d&apos;Europe.
          </p>

          {/* Stats en ligne — fusionnées dans le hero */}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '36px' }}>
            {SP_METRICS.map((m, i) => (
              <div key={m.label} style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                textAlign:     'center',
                paddingBlock:  '8px',
                paddingLeft:   i === 0 ? '0' : 'clamp(1rem, 2.5vw, 2rem)',
                paddingRight:  i < SP_METRICS.length - 1 ? 'clamp(1rem, 2.5vw, 2rem)' : '0',
                borderRight:   i < SP_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none',
              }}>
                <span style={{
                  fontSize:   'clamp(1.75rem, 2.8vw, 2.25rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  color:      'var(--color-orange-400)',
                  lineHeight: 1,
                }}>
                  {m.displayValue ?? `${m.target}${m.suffix}`}
                </span>
                <span style={{
                  fontSize:   '14.5px',
                  fontWeight: 500,
                  color:      '#FFFFFF',
                  marginTop:  '4px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-heading)',
                }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

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
              style={{ ...BTN_SEC_STYLE, gap: '8px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = BTN_SEC_HOV; el.style.borderColor = BTN_SEC_HOV; el.style.color = '#FFFFFF' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.4)'; el.style.color = '#FFFFFF' }}
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
    <section style={{ width: '100%', background: '#FFFFFF', borderTop: '1px solid #DDE3EE', borderBottom: '1px solid #DDE3EE', paddingBlock: '12px' }}>

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
              paddingBlock:     '10px',
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
    <section className="section-base" style={{ background: '#FFFFFF', paddingTop: '40px', paddingBottom: '40px', overflow: 'hidden' }}>
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
          Partenaires de confiance
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
      style={{ background: '#FFFFFF' }}
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
                fontWeight:    500,
                lineHeight:    1.25,
                letterSpacing: '-0.03em',
                color:         'var(--text-primary)',
                textAlign:     'left',
                margin:        0,
                marginBottom:  '16px',
                maxWidth:      'none',
              }}
            >
              Nous transformons vos idées en produits digitaux sur mesure.
            </h2>

            {/* Sous-titre */}
            <p style={{
              ...reveal(visible, 110),
              fontFamily:   'var(--font-body)',
              fontSize:     '18px',
              fontWeight:   400,
              color:        '#0A0A0A',
              lineHeight:   1.6,
              marginBottom: '20px',
            }}>
              Connect-Web est une agence sénégalaise spécialisée dans le développement web, mobile et l&apos;intégration de systèmes pour les entreprises en croissance.
            </p>

            {/* Corps */}
            <p
              className="about-body"
              style={{
                ...reveal(visible, 140),
                fontFamily:   'var(--font-body)',
                fontSize:     '18px',
                lineHeight:   1.75,
                marginBottom: '28px',
                color:        '#0A0A0A',
                textAlign:    'left',
              }}
            >
              Depuis Dakar, nous accompagnons des PME, startups et organisations sur l&apos;ensemble du cycle de leur projet digital — de la stratégie à la mise en production. Nous utilisons React, Next.js, Shopify et Odoo pour livrer des produits robustes et évolutifs. Chaque projet est traité comme s&apos;il était le nôtre.
            </p>

            {/* 3 points forts */}
            <div style={{ ...reveal(visible, 190), display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {[
                { icon: '⚡', label: 'Livraison rapide', desc: '2 à 8 semaines' },
                { icon: '🔒', label: 'Code maintenable', desc: 'documentation incluse' },
                { icon: '🌍', label: 'Expertise locale', desc: 'standards internationaux' },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#0A0A0A', lineHeight: 1.5 }}>
                    <strong style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.label}</strong>
                    {' — '}{p.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA bouton orange → hover bleu marine */}
            <div style={{ ...reveal(visible, 240) }}>
              <Link
                href="/a-propos"
                style={{
                  ...BTN_PRI_STYLE,
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background  = BL_DARK
                  el.style.transform   = 'translateY(-1px)'
                  el.style.boxShadow   = '0 4px 12px rgba(27,43,75,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background  = BTN_PRI
                  el.style.transform   = 'translateY(0)'
                  el.style.boxShadow   = 'none'
                }}
              >
                Découvrir notre approche <ArrowRight size={15} />
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
    <section id="services" className="section-base svc-section" style={{ background: '#F5F7FA' }}>
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
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--card-text-size)', lineHeight: 1.65, color: 'var(--text-primary)', margin: '0 0 14px', textAlign: 'justify', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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

/* ─────────────────────────────────────────────────────────────────
   SECTION 7 — OFFRES (2 niveaux : 3 tabs × 3 cards)
   section-base (#F5F7FA)
   ─────────────────────────────────────────────────────────────── */
interface ServiceCard {
  title:    string
  badge?:   string
  popular?: boolean
  items:    string[]
  cta:      string
}

interface ServiceTab {
  id:    string
  label: string
  cards: ServiceCard[]
}

const SERVICE_TABS: ServiceTab[] = [
  {
    id:    'dev',
    label: 'Développement',
    cards: [
      {
        title: 'Application Web',
        items: [
          'Interface React / Next.js moderne',
          'Authentification & rôles utilisateurs',
          'Dashboard — données en temps réel',
          'API REST ou GraphQL incluse',
          'Connexion à vos outils existants',
          'Tests & recette avant livraison',
          'Déploiement Vercel ou VPS',
          'Support 3 mois post-livraison',
        ],
        cta: 'Démarrer ce projet',
      },
      {
        title:   'Application Mobile',
        badge:   'iOS & Android',
        popular: true,
        items: [
          'Flutter — une codebase, deux stores',
          'UI personnalisée selon votre charte',
          'Notifications push intégrées',
          'Mode hors-ligne si nécessaire',
          'Paiement Wave / Orange Money',
          'Publication App Store & Play Store',
          'Tests sur devices réels',
          'Support 3 mois post-livraison',
        ],
        cta: 'Obtenir un devis',
      },
      {
        title: 'Logiciel SaaS',
        items: [
          'Architecture multi-tenant scalable',
          'Abonnements & facturation automatisée',
          'Dashboard admin + espace client',
          'Onboarding utilisateur guidé',
          'API publique documentée',
          'Métriques et analytics intégrés',
          'Infrastructure cloud haute dispo',
          'Accompagnement go-to-market',
        ],
        cta: 'Discuter mon projet',
      },
    ],
  },
  {
    id:    'site',
    label: 'Site Internet',
    cards: [
      {
        title: 'Site Vitrine',
        items: [
          'Jusqu\'à 15 pages sur mesure',
          'Design adapté à votre charte',
          'SEO technique — balises, sitemap, schema',
          'Formulaire contact + Google Maps',
          'CMS — mise à jour autonome',
          'Domaine offert la première année',
          'Responsive — testé tous écrans',
          'Lighthouse 95+ garanti',
        ],
        cta: 'Démarrer ce projet',
      },
      {
        title:   'E-commerce',
        badge:   'Le plus demandé',
        popular: true,
        items: [
          'Shopify ou WooCommerce au choix',
          'Catalogue produits illimité',
          'Paiement Wave, Orange Money, carte',
          'Gestion stocks & commandes',
          'Emails transactionnels automatiques',
          'SEO produit optimisé',
          'Tableau de bord ventes en temps réel',
          'Formation équipe incluse',
        ],
        cta: 'Lancer ma boutique',
      },
      {
        title: 'Landing Page',
        items: [
          'Page unique haute conversion',
          'Copywriting orienté résultat inclus',
          'A/B testing configuré',
          'Formulaire lead capture optimisé',
          'Tracking pixels & analytics',
          'Intégration CRM automatique',
          'Chargement < 1 seconde',
          'Livraison en 5 jours ouvrés',
        ],
        cta: 'Créer ma landing page',
      },
    ],
  },
  {
    id:    'integration',
    label: 'Intégration',
    cards: [
      {
        title: 'ERP / Odoo',
        items: [
          'Paramétrage modules métier',
          'Ventes — pipeline, devis, facturation',
          'Stock multi-entrepôt temps réel',
          'RH & paie — congés et employés',
          'Comptabilité — export FEC inclus',
          'Migration données existantes',
          'Formation sessions équipes',
          'Contrat de maintenance disponible',
        ],
        cta: 'Obtenir un devis',
      },
      {
        title:   'CRM',
        badge:   'HubSpot · Salesforce',
        popular: true,
        items: [
          'Configuration pipelines de vente',
          'Automatisation des relances',
          'Scoring et qualification des leads',
          'Connexion formulaires & landing pages',
          'Intégration email marketing',
          'Rapports et dashboards sur mesure',
          'Formation équipe commerciale',
          'Support 1 mois post-déploiement',
        ],
        cta: 'Configurer mon CRM',
      },
      {
        title: 'Email Marketing',
        items: [
          'Mise en place Brevo / Klaviyo / Mailchimp',
          'Templates responsive sur-mesure',
          'Séquences d\'automatisation',
          'Segmentation & personnalisation',
          'Intégration e-commerce native',
          'Tests A/B objet et contenu',
          'Rapports délivrabilité & taux',
          'Formation équipe incluse',
        ],
        cta: 'Lancer mes campagnes',
      },
    ],
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
  const [ref, visible]         = useReveal()
  const [activeTab, setActiveTab] = useState(0)
  const [tabVisible, setTabV]  = useState(true)
  const tab = SERVICE_TABS[activeTab]

  const switchTab = (i: number) => {
    if (i === activeTab) return
    setTabV(false)
    setTimeout(() => {
      setActiveTab(i)
      setTabV(true)
    }, 180)
  }

  return (
    <section
      id="offres"
      className="section-base"
      style={{ background: '#F5F7FA' }}
    >
      <div className="container" style={{ paddingBlock: 0 }}>

        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ ...eyebrow, ...reveal(visible, 0), display: 'block' }}>NOS SERVICES</span>
          <h2 style={{
            ...sectionTitle,
            ...reveal(visible, 80),
            maxWidth:  '640px',
            margin:    '0 auto 16px',
            fontSize:  '2rem',
            textAlign: 'center',
          }}>
            Ce que vous obtenez, concrètement.
          </h2>
          <p style={{ ...sectionSubtitle, ...reveal(visible, 160) }}>
            Choisissez votre domaine — 3 formules claires, livrables précis, prix transparents.
          </p>
        </div>

        {/* Tabs niveau 1 */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {SERVICE_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTab(i)}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                padding:      '10px 28px',
                borderRadius: '100px',
                border:       i === activeTab ? 'none' : '1px solid #DDE3EE',
                background:   i === activeTab ? BL_DARK : '#FFFFFF',
                color:        i === activeTab ? '#FFFFFF' : '#4A5568',
                fontFamily:   'var(--font-heading)',
                fontSize:     '14px',
                fontWeight:   600,
                cursor:       'pointer',
                transition:   'all 0.2s ease',
                whiteSpace:   'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grille 3 cards — niveau 2 */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap:        '24px',
            opacity:    tabVisible ? 1 : 0,
            transition: 'opacity 180ms ease',
          }}
        >
          {tab.cards.map((card) => (
            <OffreCard key={card.title} card={card} />
          ))}
        </div>

        {/* Lien bas de section */}
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/contact"
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: OR_500, textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none' }}
          >
            Besoin d&rsquo;une solution sur mesure&nbsp;? → Parlez-nous directement
          </Link>
        </p>

      </div>
    </section>
  )
}

function OffreCard({ card }: { card: ServiceCard }) {
  const [hovered, setHovered] = useState(false)
  const pop = card.popular === true

  return (
    <div
      style={{
        background:    pop ? BL_DARK : '#FFFFFF',
        borderRadius:  '12px',
        border:        pop ? `2px solid ${BL_DARK}` : '1px solid #DDE3EE',
        padding:       '28px',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        boxShadow:     hovered
          ? pop ? '0 12px 32px rgba(27,43,75,0.35)' : '0 8px 24px rgba(0,0,0,0.09)'
          : pop ? '0 6px 20px rgba(27,43,75,0.20)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform:     hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:    'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge Populaire */}
      {pop && (
        <span style={{
          position:      'absolute',
          top:           '-13px',
          left:          '50%',
          transform:     'translateX(-50%)',
          background:    OR_500,
          color:         '#FFFFFF',
          fontSize:      '11px',
          fontWeight:    700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding:       '4px 14px',
          borderRadius:  '100px',
          whiteSpace:    'nowrap',
          fontFamily:    'var(--font-heading)',
        }}>
          Populaire
        </span>
      )}

      {/* Titre + badge descriptif */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize:   'clamp(18px, 2.5vw, 20px)',
          fontWeight: 500,
          color:      pop ? '#FFFFFF' : BL_DARK,
          margin:     '0 0 6px',
        }}>
          {card.title}
        </h3>
        {card.badge && (
          <span style={{
            display:       'inline-block',
            background:    pop ? 'rgba(255,255,255,0.12)' : 'rgba(232,98,42,0.10)',
            color:         pop ? 'rgba(255,255,255,0.85)' : OR_500,
            fontSize:      '11px',
            fontWeight:    700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding:       '3px 8px',
            borderRadius:  '4px',
          }}>
            {card.badge}
          </span>
        )}
      </div>

      {/* Items */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {card.items.map(item => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: OR_500, fontSize: '14px', lineHeight: '20px', flexShrink: 0 }}>✓</span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '16px',
              color:      pop ? 'rgba(255,255,255,0.80)' : '#4A5568',
              lineHeight: 1.5,
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA full width */}
      <Link
        href="/contact"
        style={{
          ...BTN_PRI_STYLE,
          width:          '100%',
          justifyContent: 'center',
          gap:            '6px',
          background:     hovered ? BTN_PRI_HOV : BTN_PRI,
        }}
      >
        {card.cta} <ArrowRight size={14} />
      </Link>
    </div>
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
    <section id="faq" className="section-base" style={{ background: '#FFFFFF' }}>
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
            gap:           '14px',
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
                  padding:        '24px 20px',
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
  nom:        string
  email:      string
  typeProjet: string
  budget:     string
  besoin:     string
  source:     string
}

function ContactCTASection() {
  const [ref, visible]            = useReveal()
  const [submitted, setSubmitted]  = useState(false)
  const [loading, setLoading]      = useState(false)
  const [error, setError]          = useState<string | null>(null)

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
          message: `Type: ${data.typeProjet} | Budget: ${data.budget} | Source: ${data.source}\n\n${data.besoin}`,
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
      <div className="container" style={{ paddingBlock: 0 }}>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

          {/* Header */}
          <div style={{ ...reveal(visible, 0), textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span style={{ ...eyebrow, textAlign: 'center' }}>TRAVAILLONS ENSEMBLE</span>
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
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              2 minutes&nbsp;· Réponse sous 24h&nbsp;· Première analyse gratuite.
            </p>
          </div>

          {/* Layout 2 colonnes */}
          <div style={{
            ...reveal(visible, 120),
            display:   'flex',
            gap:       'clamp(2rem, 5vw, 4rem)',
            alignItems: 'flex-start',
          }}
          className="flex-col lg:flex-row"
          >

            {/* Colonne gauche — 60% — Formulaire */}
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
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-orange-400)', fontWeight: 600, fontSize: '16px', margin: 0 }}>
                    Demande envoyée&nbsp;! On vous répond sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Grille 2×2 — 4 premiers champs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

                    {/* 1 — Prénom & Nom */}
                    <div>
                      <label htmlFor="c-nom" style={labelStyle}>Prénom &amp; Nom</label>
                      <input
                        id="c-nom" type="text" placeholder="Jean Dupont"
                        style={{ ...inputStyle, borderColor: errors.nom ? OR_500 : 'rgba(255,255,255,0.16)' }}
                        {...register('nom', { required: true })}
                      />
                    </div>

                    {/* 2 — Email */}
                    <div>
                      <label htmlFor="c-email" style={labelStyle}>Email</label>
                      <input
                        id="c-email" type="email" placeholder="vous@entreprise.com"
                        style={{ ...inputStyle, borderColor: errors.email ? OR_500 : 'rgba(255,255,255,0.16)' }}
                        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                      />
                    </div>

                    {/* 3 — Type de projet */}
                    <div>
                      <label htmlFor="c-type" style={labelStyle}>Type de projet</label>
                      <select id="c-type" style={{ ...inputStyle }} {...register('typeProjet', { required: true })}>
                        <option value=""           style={{ background: BL_DARK }}>Sélectionner...</option>
                        <option value="app-web"    style={{ background: BL_DARK }}>App web</option>
                        <option value="ecommerce"  style={{ background: BL_DARK }}>E-commerce</option>
                        <option value="erp-crm"    style={{ background: BL_DARK }}>ERP/CRM</option>
                        <option value="autre"      style={{ background: BL_DARK }}>Autre</option>
                      </select>
                    </div>

                    {/* 4 — Budget */}
                    <div>
                      <label htmlFor="c-budget" style={labelStyle}>Budget</label>
                      <select id="c-budget" style={{ ...inputStyle }} {...register('budget', { required: true })}>
                        <option value=""        style={{ background: BL_DARK }}>Sélectionner...</option>
                        <option value="<500k"   style={{ background: BL_DARK }}>&lt;500k FCFA</option>
                        <option value="500-1.5" style={{ background: BL_DARK }}>500k–1,5M FCFA</option>
                        <option value="1.5-5"   style={{ background: BL_DARK }}>1,5M–5M FCFA</option>
                        <option value=">5M"     style={{ background: BL_DARK }}>+5M FCFA</option>
                      </select>
                    </div>

                  </div>

                  {/* 5 — Votre besoin */}
                  <div>
                    <label htmlFor="c-besoin" style={labelStyle}>Votre besoin</label>
                    <textarea
                      id="c-besoin" rows={4}
                      placeholder="Décrivez votre projet en quelques lignes..."
                      style={{ ...inputStyle, height: 'auto', padding: '12px 16px', resize: 'vertical', lineHeight: 1.6 }}
                      {...register('besoin', { required: true })}
                    />
                  </div>

                  {/* 6 — Source */}
                  <div>
                    <label htmlFor="c-source" style={labelStyle}>Vous nous avez connus via</label>
                    <select id="c-source" style={{ ...inputStyle }} {...register('source')}>
                      <option value=""               style={{ background: BL_DARK }}>Sélectionner...</option>
                      <option value="google"         style={{ background: BL_DARK }}>Google</option>
                      <option value="recommandation" style={{ background: BL_DARK }}>Recommandation</option>
                      <option value="linkedin"       style={{ background: BL_DARK }}>LinkedIn</option>
                      <option value="autre"          style={{ background: BL_DARK }}>Autre</option>
                    </select>
                  </div>

                  {error && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-orange-400)', margin: 0 }}>
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit" disabled={loading}
                    style={{
                      ...BTN_PRI_STYLE,
                      gap:        '8px',
                      width:      '100%',
                      justifyContent: 'center',
                      background: loading ? 'rgba(240,90,40,0.4)' : BTN_PRI,
                      cursor:     loading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = BTN_PRI_HOV }}
                    onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = BTN_PRI }}
                    onMouseDown={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
                    onMouseUp={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                  >
                    {loading ? 'Envoi...' : 'Envoyer ma demande — Réponse sous 24h'} {!loading && <ArrowRight size={16} />}
                  </button>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', margin: 0 }}>
                    🔒 Informations confidentielles&nbsp;· Aucun démarchage&nbsp;· Devis gratuit
                  </p>

                </form>
              )}
            </div>

            {/* Colonne droite — 38% — Infos contact */}
            <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Infos contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: '📍', text: 'Dakar — Sacré-Cœur 3' },
                  { icon: '📧', text: 'contact@connect-web.tech' },
                  { icon: '📞', text: '+221 77 XXX XX XX' },
                  { icon: '🕐', text: 'Lun–Ven · 8h–18h' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.80)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Badges */}
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
      <ClientLogos />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <OffresSection />
      <CtaBannerSection />
      <FaqSection />
      <ContactCTASection />
    </main>
  )
}
