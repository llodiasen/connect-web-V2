'use client'

// Source  : CONTENT.md > HOME > Section Chiffres Clés
// Design  : bande pleine largeur sans card englobante · 4 col desktop · 2 col mobile
//           Count-up cubic ease-out au scroll · staggered · séparateurs lg only
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   TYPES & DONNÉES
   ─────────────────────────────────────────────────────────────── */
interface Stat {
  prefix:      string
  display:     string
  animated:    number | null
  suffix:      string
  label:       string
  description: string
}

const STATS: Stat[] = [
  {
    prefix:      '',
    display:     '15',
    animated:    15,
    suffix:      '+',
    label:       'Projets livrés',
    description: "de l'idée à la mise en production",
  },
  {
    prefix:      '',
    display:     '98',
    animated:    98,
    suffix:      '%',
    label:       'Satisfaction client',
    description: 'taux mesuré en fin de projet',
  },
  {
    prefix:      '',
    display:     '2–8',
    animated:    null,
    suffix:      ' sem.',
    label:       'Délai moyen',
    description: 'de cadrage à livraison',
  },
  {
    prefix:      'x',
    display:     '3',
    animated:    3,
    suffix:      '',
    label:       'ROI moyen constaté',
    description: 'retour sur investissement client',
  },
]

/* ─────────────────────────────────────────────────────────────────
   HOOK — useCountUp · cubic ease-out · once
   ─────────────────────────────────────────────────────────────── */
function useCountUp(
  end: number | null,
  duration: number,
  trigger: boolean,
): number | null {
  const [count, setCount] = useState<number | null>(end === null ? null : 0)

  useEffect(() => {
    if (end === null || !trigger) return
    let raf: number
    let startTime: number | null = null
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(end * easeOut(progress)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, trigger])

  return count
}

const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — StatItem
   ─────────────────────────────────────────────────────────────── */
function StatItem({ stat, index, isLast }: {
  stat:   Stat
  index:  number
  isLast: boolean
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count  = useCountUp(stat.animated, 1200, inView)

  const displayValue =
    stat.animated !== null && count !== null ? String(count) : stat.display

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.1 }}
      className={`flex flex-col items-center text-center${!isLast ? ' lg:border-r' : ''}`}
      style={{
        paddingBlock:     '20px',
        paddingInline:    'clamp(1rem, 3vw, 2rem)',
        borderRightStyle: 'solid',
        borderRightColor: '#DDE3EE',
      }}
    >
      {/* Trait décoratif */}
      <div
        aria-hidden="true"
        style={{
          width:        '20px',
          height:       '2px',
          borderRadius: '2px',
          background:   'var(--color-orange-500)',
          marginBottom: '10px',
        }}
      />

      {/* Chiffre */}
      <div
        aria-label={`${stat.prefix}${stat.display}${stat.suffix} — ${stat.label}`}
        className="flex items-baseline justify-center"
        style={{ marginBottom: '4px' }}
      >
        {stat.prefix && (
          <span style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    800,
            fontSize:      'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight:    1,
            letterSpacing: '-0.03em',
            color:         'var(--color-orange-500)',
            marginRight:   '1px',
          }}>
            {stat.prefix}
          </span>
        )}

        <span style={{
          fontFamily:         'var(--font-heading)',
          fontWeight:         800,
          fontSize:           'clamp(1.375rem, 2.5vw, 1.875rem)',
          lineHeight:         1,
          letterSpacing:      '-0.04em',
          color:              'var(--color-orange-500)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {displayValue}
        </span>

        {stat.suffix && (
          <span style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      stat.suffix === ' sem.'
              ? 'clamp(0.6875rem, 1.1vw, 0.8125rem)'
              : 'clamp(0.875rem, 1.4vw, 1.125rem)',
            lineHeight:    1,
            letterSpacing: '-0.02em',
            color:         'var(--color-orange-500)',
            marginLeft:    stat.suffix === ' sem.' ? '3px' : '1px',
            alignSelf:     stat.suffix === ' sem.' ? 'flex-end' : 'baseline',
            paddingBottom: stat.suffix === ' sem.' ? '2px' : '0',
          }}>
            {stat.suffix.trim()}
          </span>
        )}
      </div>

      {/* Label bold */}
      <p style={{
        fontFamily:    'var(--font-heading)',
        fontSize:      '12.5px',
        fontWeight:    700,
        color:         'var(--text-primary)',
        lineHeight:    1.3,
        letterSpacing: '-0.005em',
        marginBottom:  '2px',
      }}>
        {stat.label}
      </p>

      {/* Description muted */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '11px',
        fontWeight: 'var(--font-light)',
        color:      'var(--text-tertiary)',
        lineHeight: 1.45,
      }}>
        {stat.description}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — StatsSection
   Pleine largeur · sans container · sans card englobante
   ─────────────────────────────────────────────────────────────── */
export function StatsSection() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-40px' })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      style={{
        width:        '100%',
        background:   '#FFFFFF',
        borderTop:    '1px solid #DDE3EE',
        borderBottom: '1px solid #DDE3EE',
        paddingBlock: '24px',
      }}
    >
      <h2 id="stats-heading" className="sr-only">
        Chiffres clés — Connect Web
      </h2>

      {/* Eyebrow — centré pleine largeur */}
      <motion.p
        className="text-eyebrow"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          width:         '100%',
          textAlign:     'center',
          color:         'var(--color-orange-500)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom:  '16px',
        }}
      >
        Résultats mesurés · Clients satisfaits
      </motion.p>

      {/* Grille — pleine largeur, sans card englobante */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatItem
            key={stat.label}
            stat={stat}
            index={i}
            isLast={i === STATS.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
