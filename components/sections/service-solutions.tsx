'use client'

// Source  : CONTENT.md > SERVICES > Section Solutions (générique)
// Design  : Light theme · 2 col Avant/Après · Flèche animée · Stagger scroll
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface SolutionPair {
  problem:  string       /* Colonne gauche — "Avant" */
  solution: string       /* Colonne droite — "Après" */
  pills?:   string[]     /* Badges techno/méthode optionnels */
}

export interface ServiceSolutionsProps {
  eyebrow?:    string
  title:       string
  description?: string
  pairs:       SolutionPair[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE      = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]
const EASE_SNAP = [0.04, 0.62, 0.23, 0.98] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — AnimatedArrow
   Flèche SVG qui pulse vers la droite en boucle infinie
   ─────────────────────────────────────────────────────────────── */
function AnimatedArrow() {
  return (
    <div
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}
    >
      {/* Trait gauche */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_SNAP }}
        style={{
          height:          '2px',
          width:           'clamp(16px, 3vw, 28px)',
          background:      'linear-gradient(90deg, transparent, var(--color-orange-500))',
          transformOrigin: 'left',
        }}
      />

      {/* Tête de flèche animée */}
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '32px',
          height:         '32px',
          borderRadius:   '50%',
          background:     'var(--color-orange-500)',
          flexShrink:     0,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7h10M7 2l5 5-5 5"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Trait droit */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_SNAP, delay: 0.1 }}
        style={{
          height:          '2px',
          width:           'clamp(16px, 3vw, 28px)',
          background:      'linear-gradient(90deg, var(--color-orange-500), transparent)',
          transformOrigin: 'right',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — SolutionRow
   ─────────────────────────────────────────────────────────────── */
function SolutionRow({
  pair,
  index,
  isLast,
}: {
  pair:   SolutionPair
  index:  number
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
    >
      {/* ── Ligne ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]"
        style={{
          gap:        'clamp(0.75rem, 2vw, 1rem)',
          alignItems: 'center',
          padding:    'clamp(1.25rem, 2.5vw, 1.75rem) 0',
          borderBottom: isLast ? 'none' : '1px solid #F1F3F7',
        }}
      >

        {/* ── Côté AVANT (gauche) ── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'flex-start',
            gap:        '12px',
          }}
        >
          {/* Icône X rouge */}
          <span
            style={{
              width:           '28px',
              height:          '28px',
              borderRadius:    '50%',
              background:      'rgba(220,38,38,0.08)',
              border:          '1px solid rgba(220,38,38,0.18)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              color:           '#DC2626',
              flexShrink:      0,
              marginTop:       '1px',
            }}
          >
            <X size={13} strokeWidth={2.5} />
          </span>

          <p
            style={{
              fontFamily:  'var(--font-body)',
              fontSize:    'clamp(0.875rem, 1.3vw, 0.9375rem)',
              color:       '#6B7280',
              lineHeight:  1.55,
              margin:      0,
            }}
          >
            {pair.problem}
          </p>
        </div>

        {/* ── Flèche centrale — cachée sur mobile, visible md+ ── */}
        <div className="hidden md:flex" style={{ justifyContent: 'center' }}>
          <AnimatedArrow />
        </div>

        {/* ── Flèche mobile — flèche vers le bas ── */}
        <div
          className="flex md:hidden"
          style={{ justifyContent: 'flex-start', paddingLeft: '40px' }}
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
            style={{
              width:        '24px',
              height:       '24px',
              borderRadius: '50%',
              background:   'var(--color-orange-500)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 1v9M1 6.5l4.5 4.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* ── Côté APRÈS (droite) ── */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '10px',
          }}
        >
          <div
            style={{
              display:    'flex',
              alignItems: 'flex-start',
              gap:        '12px',
            }}
          >
            {/* Icône ✓ verte */}
            <span
              style={{
                width:           '28px',
                height:          '28px',
                borderRadius:    '50%',
                background:      'rgba(22,163,74,0.09)',
                border:          '1px solid rgba(22,163,74,0.22)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                color:           '#16A34A',
                flexShrink:      0,
                marginTop:       '1px',
              }}
            >
              <Check size={13} strokeWidth={2.5} />
            </span>

            <p
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    'clamp(0.875rem, 1.3vw, 0.9375rem)',
                fontWeight:  500,
                color:       '#1A202C',
                lineHeight:  1.55,
                margin:      0,
              }}
            >
              {pair.solution}
            </p>
          </div>

          {/* Pills technos */}
          {pair.pills && pair.pills.length > 0 && (
            <div
              style={{
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '6px',
                paddingLeft: '40px',
              }}
            >
              {pair.pills.map((pill) => (
                <span
                  key={pill}
                  style={{
                    display:      'inline-block',
                    background:   'rgba(232,97,26,0.07)',
                    border:       '1px solid rgba(232,97,26,0.18)',
                    borderRadius: '5px',
                    padding:      '2px 8px',
                    fontFamily:   'var(--font-mono)',
                    fontSize:     '11px',
                    fontWeight:   500,
                    color:        'var(--color-orange-500)',
                    whiteSpace:   'nowrap',
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceSolutions
   ─────────────────────────────────────────────────────────────── */
export function ServiceSolutions({
  eyebrow = 'Nos solutions',
  title,
  description,
  pairs,
}: ServiceSolutionsProps) {
  return (
    <section
      aria-labelledby="solutions-heading"
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        background:   '#F7F8FA',
        borderTop:    '1px solid #E2E8F0',
      }}
    >
      <div className="container">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3rem)' }}
        >
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'var(--brand-primary)',
              marginBottom:  '12px',
            }}
          >
            {eyebrow}
          </p>

          <h2
            id="solutions-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    800,
              fontSize:      'clamp(1.625rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.03em',
              color:         '#0A0B0E',
              marginBottom:  description ? '14px' : 0,
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'clamp(0.9375rem, 1.3vw, 1rem)',
                color:      '#6B7280',
                lineHeight: 1.65,
                maxWidth:   '540px',
                margin:     '0 auto',
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* ── Tableau Avant/Après ── */}
        <div
          style={{
            background:   '#FFFFFF',
            border:       '1px solid #E2E8F0',
            borderRadius: '16px',
            boxShadow:    '0 2px 12px rgba(0,0,0,0.04)',
            overflow:     'hidden',
          }}
        >
          {/* En-têtes colonnes — desktop uniquement */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: '1fr auto 1fr',
              gap:                 'clamp(0.75rem, 2vw, 1rem)',
              padding:             '14px clamp(1.5rem, 3vw, 2rem)',
              background:          '#F7F8FA',
              borderBottom:        '1px solid #E2E8F0',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         '#DC2626',
              }}
            >
              Situation actuelle
            </span>
            {/* Spacer centré */}
            <span style={{ width: 'clamp(80px, 12vw, 120px)', display: 'block' }} />
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         '#16A34A',
              }}
            >
              Avec Connect Web
            </span>
          </div>

          {/* Rows */}
          <div style={{ padding: '0 clamp(1.5rem, 3vw, 2rem)' }}>
            {pairs.map((pair, i) => (
              <SolutionRow
                key={pair.problem}
                pair={pair}
                index={i}
                isLast={i === pairs.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
