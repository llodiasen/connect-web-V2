'use client'

// Source : CONTENT.md > PAGE : Développement Mobile > SECTION 02 : SOCIAL PROOF
// RÈGLE N°0 CLAUDE.md v4.2 — Tout spacing via style={{}} inline

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]
const VIEWPORT = { once: true, amount: 0.3 }

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Métriques
   Source : CONTENT.md > Développement Mobile > Section 02
   ─────────────────────────────────────────────────────────────── */
interface Metric {
  target:  number
  suffix:  string
  label:   string
}

const METRICS: Metric[] = [
  { target: 50, suffix: '+',  label: 'Projets livrés'    },
  { target: 98, suffix: '%',  label: 'Clients satisfaits' },
  { target: 3,  suffix: '+',  label: "Ans d'expérience"  },
  { target: 24, suffix: 'h',  label: 'Délai de réponse'  },
]

/* 6 logos placeholders */
const LOGO_PLACEHOLDERS = [140, 110, 125, 95, 130, 105] // largeurs variées pour naturel

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — AnimatedCounter
   ─────────────────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return

    const duration = 1400
    const startTime = performance.now()

    function step(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — DeveloppementMobileSocialProof
   ─────────────────────────────────────────────────────────────── */
export function DeveloppementMobileSocialProof() {
  return (
    <section className="section-base" style={{ paddingTop: '3rem' }}>
      <div className="container">

        {/* ── Titre ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          viewport={VIEWPORT}
          className="font-heading font-bold"
          style={{
            textAlign:     'center',
            color:         'var(--text-primary)',
            fontSize:      'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight:    1.15,
            letterSpacing: '-0.025em',
            marginBottom:  'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          Ils nous font confiance
        </motion.h2>

        {/* ── Grille métriques — 2×2 mobile / 4 colonnes desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          viewport={VIEWPORT}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '1px',
            background:          'var(--border-default)',
            border:              '1px solid var(--border-default)',
            borderRadius:        '16px',
            overflow:            'hidden',
            marginBottom:        'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              style={{
                background:  '#FFFFFF',
                padding:     'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
                textAlign:   'center',
                display:     'flex',
                flexDirection: 'column',
                alignItems:  'center',
                gap:         '6px',
              }}
            >
              {/* Numéro animé */}
              <span
                className="font-heading font-bold"
                style={{
                  fontSize:           'clamp(1.5rem, 2.5vw, 2rem)',
                  lineHeight:         1,
                  letterSpacing:      '-0.04em',
                  color:              'var(--color-orange-500)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <AnimatedCounter target={metric.target} suffix={metric.suffix} />
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '13px',
                  fontWeight:    500,
                  color:         'var(--text-secondary)',
                  letterSpacing: '0.01em',
                }}
              >
                {metric.label}
              </span>

              {/* Trait orange sous le premier chiffre seulement — accent subtil */}
              {i === 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    display:      'block',
                    width:        '24px',
                    height:       '2px',
                    background:   'var(--color-orange-500)',
                    borderRadius: '2px',
                    marginTop:    '2px',
                    opacity:      0.4,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Zone logos ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          viewport={VIEWPORT}
        >
          {/* Titre zone logos */}
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '12px',
              fontWeight:    600,
              color:         'var(--text-tertiary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign:     'center',
              marginBottom:  '20px',
            }}
          >
            Ils nous font confiance
          </p>

          {/* Grille placeholders logos */}
          <div
            style={{
              display:        'flex',
              flexWrap:       'wrap',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            'clamp(16px, 3vw, 32px)',
              marginBottom:   'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            {LOGO_PLACEHOLDERS.map((width, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  width:        `${width}px`,
                  height:       '36px',
                  background:   '#F1F3F7',
                  borderRadius: '6px',
                  border:       '1px solid var(--border-subtle)',
                }}
              />
            ))}
          </div>

          {/* Note */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '14px',
              color:      'var(--text-tertiary)',
              textAlign:  'center',
              lineHeight: 1.6,
            }}
          >
            Startups, PME et grands groupes au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
