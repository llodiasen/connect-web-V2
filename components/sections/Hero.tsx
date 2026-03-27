'use client'

// Source  : CONTENT.md > HOME > Section Hero
// Design  : Fond sombre #0D0D0D · deux colonnes · slider images droite
// RÈGLE N°0 — spacing pixel-précis via style{{}} inline uniquement

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Database, Zap, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   CONTENU
   ───────────────────────────────────────────────────────────────── */
const SURTITRE = 'Connect-Web · Agence de développement digital'

const SUBTITLE =
  'Chaque business a ses défis. On prend le temps de les comprendre avant ' +
  "d\u2019\u00E9crire la moindre ligne de code. Site web, application mobile, " +
  'ERP, CRM, logiciel de gestion\u00A0\u2014 on vous accompagne avec la solution ' +
  'qui correspond vraiment à vos objectifs, pas à un template.'

interface Badge { Icon: LucideIcon; label: string }

const BADGES: Badge[] = [
  { Icon: Globe,      label: 'Sites Web & E-commerce' },
  { Icon: Smartphone, label: 'Applications Mobile'    },
  { Icon: Database,   label: 'ERP · CRM · SaaS'       },
  { Icon: Zap,        label: 'Lighthouse 95+'          },
  { Icon: Clock,      label: 'Livraison 2–8 sem.'      },
]

/* ─────────────────────────────────────────────────────────────────
   SLIDER — fond plein écran, autoplay 5s, fade, pause au hover
   ───────────────────────────────────────────────────────────────── */
const SLIDES = [
  { src: '/images/hero/hero-image.png', alt: 'Connect-Web — agence digitale Dakar'    },
  { src: '/images/hero/apropos.jpg',    alt: 'Équipe Connect-Web — développement web' },
]

const AUTOPLAY_DELAY = 5000

function HeroBgSlider({ paused, current }: { paused: boolean; current: number }) {
  return (
    <>
      {/* Images en fond absolu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay sombre pour lisibilité du texte */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     1,
          background: 'rgba(13,13,13,0.65)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────
   FRAMER MOTION VARIANTS
   ───────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const itemV = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — Hero
   ───────────────────────────────────────────────────────────────── */
export function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, AUTOPLAY_DELAY)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <section
      aria-labelledby="hero-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position:        'relative',
        minHeight:       '100dvh',
        display:         'flex',
        alignItems:      'center',
        backgroundColor: '#0D0D0D',
        overflow:        'hidden',
      }}
    >
      {/* ── Images en fond plein écran ───────────────────────────── */}
      <HeroBgSlider paused={paused} current={current} />

      {/* ── Contenu — z-index au-dessus de l'overlay ────────────── */}
      <div
        className="container relative"
        style={{
          paddingTop:    'calc(var(--nav-height) + 3rem)',
          paddingBottom: 'clamp(5rem, 8vw, 8rem)',
          zIndex:        2,
        }}
      >
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
          style={{ gap: '28px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
        >

          {/* Surtitre */}
          <motion.div variants={itemV}>
            <span
              className="inline-flex items-center"
              style={{
                gap:           '8px',
                fontFamily:    'var(--font-body)',
                fontSize:      '12px',
                fontWeight:    500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.5)',
              }}
            >
              <span
                aria-hidden="true"
                className="animate-pulse"
                style={{
                  width:        7,
                  height:       7,
                  borderRadius: '50%',
                  background:   '#22C55E',
                  boxShadow:    '0 0 8px rgba(34,197,94,0.7)',
                  flexShrink:   0,
                  display:      'inline-block',
                }}
              />
              {SURTITRE}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            variants={itemV}
            className="font-heading font-bold"
            style={{
              color:         '#FFFFFF',
              margin:        0,
              fontSize:      'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight:    1.08,
              letterSpacing: '-0.03em',
              width:         '100%',
              whiteSpace:    'pre-wrap',
            }}
          >
            <span style={{ display: 'block' }}>Des solutions digitales</span>
            <span style={{ display: 'block' }}>sur mesure pour accélérer</span>
            <span style={{ display: 'block' }}>
              votre{' '}
              <em style={{ fontStyle: 'normal', color: '#F97316' }}>
                transformation numérique
              </em>
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={itemV}
            className="text-hero-subtitle"
            style={{
              maxWidth: '560px',
              margin:   '0 auto',
            }}
          >
            {SUBTITLE}
          </motion.p>

          {/* Badges pills — 5 max, 2 lignes (3+2) */}
          <motion.div
            variants={itemV}
            style={{
              display:              'grid',
              gridTemplateColumns:  'repeat(3, max-content)',
              justifyContent:       'center',
              gap:                  '8px',
            }}
          >
            {BADGES.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center"
                style={{
                  gap:            '6px',
                  padding:        '6px 14px',
                  borderRadius:   '999px',
                  background:     'rgba(0,0,0,0.35)',
                  border:         '1px solid rgba(255,255,255,0.25)',
                  fontSize:       '12px',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     'var(--font-light)',
                  color:          '#FFFFFF',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Icon
                  aria-hidden="true"
                  style={{ width: 13, height: 13, color: '#F97316', flexShrink: 0 }}
                />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemV}
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px', paddingTop: '4px' }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center font-semibold rounded-xl"
              style={{
                height:         '44px',
                padding:        '0 24px',
                background:     '#FFFFFF',
                color:          '#1B2A4A',
                gap:            '8px',
                fontSize:       '14px',
                fontFamily:     'var(--font-body)',
                textDecoration: 'none',
                transition:     'background 150ms ease, color 150ms ease',
                flexShrink:     0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#F97316'
                e.currentTarget.style.color      = '#FFFFFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.color      = '#1B2A4A'
              }}
            >
              Démarrer mon projet
              <ArrowRight
                aria-hidden="true"
                style={{ width: 16, height: 16, transition: 'transform 150ms ease' }}
                className="group-hover:translate-x-0.5"
              />
            </Link>

            <span
              aria-hidden="true"
              className="hidden sm:block"
              style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)' }}
            />

            <Link
              href="/portfolio"
              className="group inline-flex items-center font-medium"
              style={{
                gap:            '6px',
                fontSize:       '14px',
                fontFamily:     'var(--font-body)',
                color:          'rgba(255,255,255,0.65)',
                textDecoration: 'none',
                transition:     'color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'                }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            >
              Voir nos réalisations
              <ArrowRight
                aria-hidden="true"
                style={{ width: 14, height: 14, color: '#F97316', transition: 'transform 150ms ease' }}
                className="group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Dots + barre de progression — bas de section ────────── */}
      <div
        style={{
          position:       'absolute',
          bottom:         '32px',
          left:           0,
          right:          0,
          zIndex:         3,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '10px',
          pointerEvents:  'none',
        }}
      >
        {/* Dots */}
        <div
          aria-label="Navigation du diaporama"
          style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              style={{
                width:        i === current ? '22px' : '6px',
                height:       '6px',
                borderRadius: '999px',
                border:       'none',
                cursor:       'pointer',
                padding:      0,
                background:   i === current ? '#F97316' : 'rgba(255,255,255,0.4)',
                transition:   'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>

        {/* Barre de progression */}
        <div
          aria-hidden="true"
          style={{
            width:        '48px',
            height:       '2px',
            borderRadius: '999px',
            overflow:     'hidden',
            background:   'rgba(255,255,255,0.12)',
          }}
        >
          <motion.div
            key={current}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
            style={{
              height:          '100%',
              background:      '#F97316',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      {/* Fade bas vers la section suivante */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '100px',
          background:    'linear-gradient(to bottom, transparent, #0D0D0D)',
          pointerEvents: 'none',
          zIndex:        2,
        }}
      />
    </section>
  )
}
