'use client'

// Source  : CONTENT.md > SERVICES > Section Features Grid (générique)
// Design  : Light theme · Grille 4 col · Checkmark orange · Stagger scroll
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Gauge, Smartphone, Search, PenTool,
  Layers, Shield, Globe, BarChart3,
  Zap, ShoppingCart, Code2, RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────
   LOOKUP ICÔNES
   ─────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Gauge, Smartphone, Search, PenTool,
  Layers, Shield, Globe, BarChart3,
  Zap, ShoppingCart, Code2, RefreshCw,
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface FeatureItem {
  iconName:    string
  title:       string
  description: string
}

export interface ServiceFeaturesProps {
  eyebrow?:     string
  title:        string
  description?: string
  items:        FeatureItem[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FeatureCard
   ─────────────────────────────────────────────────────────────── */
function FeatureCard({
  item,
  index,
}: {
  item:  FeatureItem
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICON_MAP[item.iconName] ?? Gauge

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    '#FFFFFF',
        border:        `1px solid ${hovered ? 'rgba(232,97,26,0.22)' : '#E2E8F0'}`,
        borderRadius:  '14px',
        padding:       'clamp(1.25rem, 2.5vw, 1.625rem)',
        display:       'flex',
        flexDirection: 'column',
        gap:           '14px',
        boxShadow:     hovered
          ? '0 8px 24px rgba(232,97,26,0.08), 0 2px 4px rgba(0,0,0,0.04)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform:     hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:    'border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease',
      }}
    >
      {/* ── Icône principale + checkmark ── */}
      <div
        style={{
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Icône service */}
        <div
          style={{
            width:           '42px',
            height:          '42px',
            borderRadius:    '10px',
            background:      hovered
              ? 'rgba(232,97,26,0.12)'
              : 'rgba(232,97,26,0.07)',
            border:          `1px solid ${hovered
              ? 'rgba(232,97,26,0.28)'
              : 'rgba(232,97,26,0.12)'}`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           'var(--color-orange-500)',
            transition:      'background 220ms ease, border-color 220ms ease',
            flexShrink:      0,
          }}
        >
          <Icon size={19} strokeWidth={1.75} />
        </div>

        {/* Checkmark ✓ orange — badge de validation */}
        <CheckCircle2
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          style={{
            color:      hovered
              ? 'var(--color-orange-500)'
              : '#D1D5DB',
            transition: 'color 220ms ease',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Titre ── */}
      <h3
        style={{
          fontFamily:    'var(--font-heading)',
          fontWeight:    700,
          fontSize:      'clamp(0.875rem, 1.2vw, 0.9375rem)',
          lineHeight:    1.35,
          letterSpacing: '-0.005em',
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
          fontSize:   '13px',
          color:      '#9CA3AF',
          lineHeight: 1.6,
          margin:     0,
          flexGrow:   1,
          textAlign:  'justify',
        }}
      >
        {item.description}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceFeatures
   ─────────────────────────────────────────────────────────────── */
export function ServiceFeatures({
  eyebrow = 'Ce qui est inclus',
  title,
  description,
  items,
}: ServiceFeaturesProps) {
  return (
    <section
      aria-labelledby="features-heading"
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        background:   '#FFFFFF',
        borderTop:    '1px solid #E2E8F0',
      }}
    >
      <div className="container">

        {/* ── En-tête centré ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
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
            id="features-heading"
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
                maxWidth:   '520px',
                margin:     '0 auto',
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* ── Grille 4 colonnes ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
        >
          {items.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* ── Barre de garantie ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          style={{
            marginTop:      'clamp(2rem, 4vw, 3rem)',
            background:     'rgba(232,97,26,0.04)',
            border:         '1px solid rgba(232,97,26,0.12)',
            borderRadius:   '12px',
            padding:        'clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 3vw, 2rem)',
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            'clamp(1rem, 3vw, 2.5rem)',
          }}
        >
          {[
            'Délais respectés',
            'Code livré avec documentation',
            'Support 1 mois inclus',
            'Formation à la prise en main',
          ].map((guarantee) => (
            <span
              key={guarantee}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        '7px',
                fontFamily: 'var(--font-body)',
                fontSize:   '13px',
                fontWeight: 500,
                color:      '#4A5568',
                whiteSpace: 'nowrap',
              }}
            >
              <CheckCircle2
                size={14}
                strokeWidth={2.5}
                style={{ color: 'var(--color-orange-500)', flexShrink: 0 }}
                aria-hidden="true"
              />
              {guarantee}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
