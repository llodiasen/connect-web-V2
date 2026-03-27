'use client'

// Source  : CONTENT.md > SERVICES > Section Problèmes / Pain Points (générique)
// Design  : Light theme · Cards rouge/gris · Shake hover · Icônes warning
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import {
  AlertTriangle, Gauge, Smartphone, Search,
  Clock, ShieldOff, BarChart2, type LucideIcon,
} from 'lucide-react'
import { EASE as EASE_SHARED, VIEWPORT, staggerGrid } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────
   LOOKUP ICÔNES
   ─────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  AlertTriangle, Gauge, Smartphone, Search,
  Clock, ShieldOff, BarChart2,
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface PainPointItem {
  iconName:    string
  title:       string
  description: string
}

export interface ServicePainPointsProps {
  eyebrow?:    string
  title:       string
  description?: string
  items:       PainPointItem[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   VARIANTS — entrée (fade-up) + shake hover combinés
   initial="hidden" → animate="visible" au scroll
   whileHover="shake" déclenché indépendamment
   ─────────────────────────────────────────────────────────────── */
function getCardVariants(delay: number) {
  return {
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE, delay },
    },
    shake: {
      x: [0, -5, 5, -4, 4, -2, 2, 0],
      transition: { duration: 0.45, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] },
    },
  }
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — PainCard
   ─────────────────────────────────────────────────────────────── */
function PainCard({
  item,
  index,
}: {
  item:  PainPointItem
  index: number
}) {
  const Icon = ICON_MAP[item.iconName] ?? AlertTriangle

  const cardVariants = getCardVariants(index * 0.09)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover="shake"
      style={{
        position:      'relative',
        background:    '#FFFFFF',
        borderRadius:  '14px',
        border:        '1px solid #E2E8F0',
        borderLeft:    '4px solid #DC2626',
        padding:       'clamp(1.25rem, 2.5vw, 1.75rem)',
        display:       'flex',
        flexDirection: 'column',
        gap:           '14px',
        boxShadow:     '0 2px 8px rgba(0,0,0,0.04)',
        overflow:      'hidden',
      }}
    >
      {/* ── Numéro — arrière-plan décoratif ── */}
      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '12px',
          right:         '16px',
          fontFamily:    'var(--font-heading)',
          fontWeight:    800,
          fontSize:      '3rem',
          lineHeight:    1,
          color:         'rgba(220,38,38,0.06)',
          userSelect:    'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Icône ── */}
      <div
        style={{
          width:           '44px',
          height:          '44px',
          borderRadius:    '10px',
          background:      'rgba(220,38,38,0.07)',
          border:          '1px solid rgba(220,38,38,0.15)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          color:           '#DC2626',
          flexShrink:      0,
        }}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>

      {/* ── Titre ── */}
      <h3
        className="font-heading font-bold"
        style={{
          fontSize:      'var(--card-title-size)',
          lineHeight:    1.25,
          letterSpacing: '-0.015em',
          color:         '#0A0B0E',
          margin:        0,
        }}
      >
        {item.title}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
          color:      '#6B7280',
          lineHeight: 1.65,
          textAlign:  'justify',
          margin:     0,
        }}
      >
        {item.description}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServicePainPoints
   ─────────────────────────────────────────────────────────────── */
export function ServicePainPoints({
  eyebrow = 'Les problèmes que nous résolvons',
  title,
  description,
  items,
}: ServicePainPointsProps) {
  return (
    <section
      aria-labelledby="pain-heading"
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        background:   '#FFFFFF',
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
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          {/* Eyebrow avec badge rouge */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            '8px',
              marginBottom:   '16px',
            }}
          >
            <span
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '6px',
                background:    'rgba(220,38,38,0.07)',
                border:        '1px solid rgba(220,38,38,0.18)',
                borderRadius:  '100px',
                padding:       '4px 12px',
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#DC2626',
              }}
            >
              {/* Pulse dot */}
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span
                  style={{
                    width:        '6px',
                    height:       '6px',
                    borderRadius: '50%',
                    background:   '#DC2626',
                    display:      'block',
                  }}
                />
              </span>
              {eyebrow}
            </span>
          </div>

          {/* Titre */}
          <h2
            id="pain-heading"
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
                maxWidth:   '560px',
                margin:     '0 auto',
                lineHeight: 1.65,
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* ── Grille de cards ── */}
        {/*
          5 items → 3 colonnes desktop : rangée 1 = 3 items, rangée 2 = 2 items centrés
          On laisse le CSS grid gérer naturellement (les 2 derniers s'alignent à gauche)
        */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(1rem, 2vw, 1.25rem)' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {items.map((item, i) => (
            <PainCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>

        {/* ── Note de transition vers les solutions ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          style={{
            marginTop:   'clamp(2rem, 4vw, 3rem)',
            paddingTop:  'clamp(1.5rem, 3vw, 2rem)',
            borderTop:   '1px solid #F1F3F7',
            display:     'flex',
            alignItems:  'center',
            gap:         '10px',
          }}
        >
          <span
            style={{
              width:        '4px',
              height:       '4px',
              borderRadius: '50%',
              background:   'var(--color-orange-500)',
              flexShrink:   0,
            }}
          />
          <p
            style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '14px',
              color:       '#9CA3AF',
              lineHeight:  1.5,
              margin:      0,
            }}
          >
            Ces problèmes vous parlent ?{' '}
            <strong style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
              Voici exactement comment on les résout.
            </strong>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
