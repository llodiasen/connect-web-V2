'use client'

// Source   : CONTENT.md > PAGE : Développement Mobile > SECTION 01 : HERO
// URL      : /services/developpement-mobile
// RÈGLE N°0 CLAUDE.md v4.2 — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, WifiOff, CreditCard } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
interface MetricPill {
  icon:     React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>
  label:    string
  delay:    number
  position: React.CSSProperties
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Métriques flottantes
   Source : CONTENT.md > Développement Mobile > Section 01 Hero
   ─────────────────────────────────────────────────────────────── */
const METRIC_PILLS: MetricPill[] = [
  {
    icon:     Smartphone,
    label:    'iOS & Android',
    delay:    0,
    position: { top: '-18px', right: '8%' },
  },
  {
    icon:     WifiOff,
    label:    'Offline-first',
    delay:    1.1,
    position: { bottom: '30%', left: '-20px' },
  },
  {
    icon:     CreditCard,
    label:    'Wave & OM intégrés',
    delay:    2.2,
    position: { bottom: '-18px', right: '12%' },
  },
]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FloatingPill
   ─────────────────────────────────────────────────────────────── */
function FloatingPill({ icon: Icon, label, delay, position }: MetricPill) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position:             'absolute',
        display:              'flex',
        alignItems:           'center',
        gap:                  '8px',
        background:           '#FFFFFF',
        border:               '1px solid #E5E7EB',
        borderRadius:         '9999px',
        padding:              '7px 14px 7px 8px',
        boxShadow:            '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
        backdropFilter:       'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex:               10,
        ...position,
      }}
    >
      <div
        style={{
          width:           '22px',
          height:          '22px',
          borderRadius:    '50%',
          background:      'rgba(232,97,26,0.12)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          color:           'var(--color-orange-500)',
          flexShrink:      0,
        }}
      >
        <Icon size={12} aria-hidden="true" />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '12px',
          fontWeight: 600,
          color:      '#111827',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — PhoneMockup
   ─────────────────────────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:        '100%',
        maxWidth:     '280px',
        margin:       '0 auto',
        background:   'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
        border:       '1px solid #1E2535',
        borderRadius: '36px',
        padding:      '14px',
        boxShadow:    '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Écran */}
      <div
        style={{
          background:   '#080C12',
          borderRadius: '26px',
          overflow:     'hidden',
          padding:      '20px 16px',
        }}
      >
        {/* Barre de statut */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '20px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#5A6E8F', fontWeight: 600 }}>
            9:41
          </span>
          <div
            style={{
              width:        '80px',
              height:       '20px',
              background:   '#000',
              borderRadius: '12px',
            }}
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width:        i * 3 + 'px',
                  height:       '8px',
                  background:   '#5A6E8F',
                  borderRadius: '2px',
                  alignSelf:    'flex-end',
                }}
              />
            ))}
          </div>
        </div>

        {/* Header app */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     '16px',
              fontWeight:   700,
              color:        '#F4F7FC',
              marginBottom: '4px',
            }}
          >
            Tableau de bord
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#5A6E8F' }}>
            Bienvenue 👋 Mamadou
          </div>
        </div>

        {/* Carte revenu */}
        <div
          style={{
            background:   'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-700) 100%)',
            borderRadius: '14px',
            padding:      '14px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginBottom: '6px' }}>
            Ventes du mois
          </div>
          <div
            style={{
              fontFamily:         'var(--font-heading)',
              fontSize:           '22px',
              fontWeight:         800,
              color:              '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              marginBottom:       '6px',
            }}
          >
            2 450 000
            <span style={{ fontSize: '12px', fontWeight: 500, marginLeft: '4px' }}>FCFA</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.85)' }}>
              ↑ +18% vs mois dernier
            </span>
          </div>
        </div>

        {/* Grille de métriques */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
          {[
            { label: 'Commandes',  value: '142',  color: '#61AFEF' },
            { label: 'Clients',    value: '89',   color: '#98C379' },
            { label: 'En attente', value: '7',    color: '#E5C07B' },
            { label: 'Note app',   value: '4.8★', color: '#C678DD' },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background:   '#0D1117',
                border:       '1px solid #1E2535',
                borderRadius: '10px',
                padding:      '10px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F', marginBottom: '4px' }}>
                {label}
              </div>
              <div
                style={{
                  fontFamily:         'var(--font-heading)',
                  fontSize:           '16px',
                  fontWeight:         700,
                  color,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Barre de progression Wave */}
        <div
          style={{
            background:   '#0D1117',
            border:       '1px solid #1E2535',
            borderRadius: '10px',
            padding:      '10px',
          }}
        >
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              marginBottom:   '8px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F' }}>
              Paiements Wave
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize:   '9px',
                color:      '#98C379',
                fontWeight: 600,
              }}
            >
              73%
            </span>
          </div>
          <div
            style={{
              height:       '5px',
              background:   '#1E2535',
              borderRadius: '9999px',
              overflow:     'hidden',
            }}
          >
            <div
              style={{
                width:        '73%',
                height:       '100%',
                background:   'linear-gradient(90deg, #98C379, #61AFEF)',
                borderRadius: '9999px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — DeveloppementMobileHero
   ─────────────────────────────────────────────────────────────── */
export function DeveloppementMobileHero() {
  return (
    <section
      className="hero-bg"
      aria-label="Service · Développement Mobile"
      style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* Lueur bleue bas-droite */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '-15%',
          right:         '-5%',
          width:         '45vw',
          height:        '45vw',
          maxWidth:      '600px',
          maxHeight:     '600px',
          background:    'radial-gradient(circle, rgba(26,42,74,0.35) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grille de points décorative */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize:  '32px 32px',
          pointerEvents:   'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
          style={{ gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }}
        >

          {/* ══ COLONNE GAUCHE 60% — Contenu ══ */}
          <div>

            {/* 1. Badge eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ marginBottom: '24px' }}
            >
              <span
                style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           '6px',
                  background:    'rgba(232,97,26,0.10)',
                  border:        '1px solid rgba(232,97,26,0.25)',
                  borderRadius:  '100px',
                  padding:       '5px 14px',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         'var(--color-orange-400)',
                }}
              >
                <span
                  style={{
                    width:        '5px',
                    height:       '5px',
                    borderRadius: '50%',
                    background:   'var(--color-orange-500)',
                    flexShrink:   0,
                  }}
                />
                Service · Développement Mobile
              </span>
            </motion.div>

            {/* 2. H1 — 3 spans display:block */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="font-heading font-bold"
              style={{
                color:         '#F4F7FC',
                marginBottom:  '20px',
                fontSize:      'clamp(2rem, 3.75vw, 3rem)',
                lineHeight:    1.08,
                letterSpacing: '-0.03em',
                whiteSpace:    'pre-wrap',
              }}
            >
              <span style={{ display: 'block' }}>Applications mobiles</span>
              <span style={{ display: 'block' }}>pensées pour</span>
              <span style={{ display: 'block', color: 'var(--color-orange-500)' }}>
                l&apos;utilisateur africain.
              </span>
            </motion.h1>

            {/* 3. Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.30 }}
              className="text-hero-subtitle"
              style={{ maxWidth: '500px', marginBottom: '28px' }}
            >
              React Native · Flutter · Wave &amp; Orange Money intégrés.
            </motion.p>

            {/* 4. Badge différenciateur */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
              style={{ marginBottom: '36px' }}
            >
              <span
                style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           '8px',
                  background:    '#161B27',
                  border:        '1px solid #1E2535',
                  borderRadius:  '8px',
                  padding:       '7px 14px',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  color:         '#6B7FA3',
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ color: '#3B4A6B', userSelect: 'none' }}>◆</span>
                <span>iOS &amp; Android</span>
                <span style={{ color: '#2A3347', userSelect: 'none' }}>·</span>
                <span>Offline-first</span>
                <span style={{ color: '#2A3347', userSelect: 'none' }}>·</span>
                <span>Paiement mobile natif</span>
              </span>
            </motion.div>

            {/* 5. CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.60 }}
              className="flex flex-wrap items-center"
              style={{ gap: '12px' }}
            >
              {/* CTA primaire — gradient orange */}
              <Link
                href="/contact?service=developpement-mobile"
                className="inline-flex items-center font-semibold"
                style={{
                  gap:            '8px',
                  padding:        '13px 26px',
                  background:     'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
                  borderRadius:   '10px',
                  fontSize:       '14px',
                  color:          '#FFFFFF',
                  boxShadow:      '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)',
                  transition:     'box-shadow 200ms ease, transform 150ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,97,26,0.38), 0 0 0 1px rgba(232,97,26,0.4)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Créer mon application
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              {/* CTA secondaire — outline */}
              <Link
                href="/portfolio"
                className="inline-flex items-center font-semibold"
                style={{
                  gap:            '8px',
                  padding:        '12px 24px',
                  background:     'transparent',
                  border:         '1px solid #2A3347',
                  borderRadius:   '10px',
                  fontSize:       '14px',
                  color:          '#B8C8E0',
                  transition:     'border-color 200ms ease, color 200ms ease, background 200ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232,97,26,0.4)'
                  e.currentTarget.style.color       = '#F4F7FC'
                  e.currentTarget.style.background  = 'rgba(232,97,26,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2A3347'
                  e.currentTarget.style.color       = '#B8C8E0'
                  e.currentTarget.style.background  = 'transparent'
                }}
              >
                Voir nos apps
              </Link>
            </motion.div>

          </div>

          {/* ══ COLONNE DROITE 40% — Visuel + Pills flottantes ══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <PhoneMockup />

            {METRIC_PILLS.map((pill) => (
              <FloatingPill key={pill.label} {...pill} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
