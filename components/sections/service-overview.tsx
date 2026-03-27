'use client'

// Source  : CONTENT.md > SERVICES > Section Service Overview (générique)
// Design  : Light theme · Grille 2×2 · Cards hover lift · Icône orange
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Monitor, Smartphone, Code2, RefreshCw, ShoppingCart, Globe,
  Cpu, BarChart3, Layers, Zap, PenTool, Database,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────
   LOOKUP ICÔNES
   ─────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Smartphone, Code2, RefreshCw, ShoppingCart, Globe,
  Cpu, BarChart3, Layers, Zap, PenTool, Database,
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface OverviewItem {
  iconName:    string
  title:       string
  description: string
  href?:       string
}

export interface ServiceOverviewProps {
  eyebrow?:    string
  title:       string
  description?: string
  items:       OverviewItem[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — OverviewCard
   ─────────────────────────────────────────────────────────────── */
function OverviewCard({
  item,
  index,
}: {
  item:  OverviewItem
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICON_MAP[item.iconName] ?? Monitor

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    '#FFFFFF',
        border:        `1px solid ${hovered ? 'rgba(232,97,26,0.25)' : '#E2E8F0'}`,
        borderRadius:  '16px',
        padding:       'clamp(1.5rem, 3vw, 2rem)',
        display:       'flex',
        flexDirection: 'column',
        gap:           '16px',
        boxShadow:     hovered
          ? '0 12px 32px rgba(232,97,26,0.10), 0 4px 8px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:    'box-shadow 250ms ease, border-color 250ms ease, transform 250ms ease',
        cursor:        item.href ? 'pointer' : 'default',
        height:        '100%',
      }}
    >
      {/* ── Icône ── */}
      <div
        style={{
          width:           '48px',
          height:          '48px',
          borderRadius:    '12px',
          background:      hovered ? 'rgba(232,97,26,0.12)' : 'rgba(232,97,26,0.07)',
          border:          `1px solid ${hovered ? 'rgba(232,97,26,0.3)' : 'rgba(232,97,26,0.12)'}`,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          color:           'var(--color-orange-500)',
          flexShrink:      0,
          transition:      'background 250ms ease, border-color 250ms ease',
        }}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* ── Titre ── */}
      <h3
        style={{
          fontFamily:    'var(--font-heading)',
          fontWeight:    700,
          fontSize:      'clamp(1rem, 1.5vw, 1.125rem)',
          lineHeight:    1.25,
          letterSpacing: '-0.01em',
          color:         hovered ? 'var(--color-orange-500)' : '#0A0B0E',
          transition:    'color 250ms ease',
          margin:        0,
        }}
      >
        {item.title}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '14px',
          color:       '#6B7280',
          lineHeight:  1.65,
          margin:      0,
          flexGrow:    1,
          textAlign:   'justify',
        }}
      >
        {item.description}
      </p>

      {/* ── Lien optionnel ── */}
      {item.href && (
        <span
          style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '13px',
            fontWeight:  600,
            color:       hovered ? 'var(--color-orange-500)' : '#9CA3AF',
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '4px',
            transition:  'color 250ms ease',
          }}
        >
          En savoir plus
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 250ms ease' }}>
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </motion.div>
  )

  if (item.href) {
    return (
      <Link href={item.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {content}
      </Link>
    )
  }

  return content
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceOverview
   ─────────────────────────────────────────────────────────────── */
export function ServiceOverview({
  eyebrow = 'Ce que nous réalisons',
  title,
  description,
  items,
}: ServiceOverviewProps) {
  return (
    <section
      aria-labelledby="overview-heading"
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
            id="overview-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    800,
              fontSize:      'clamp(1.625rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.03em',
              color:         '#0A0B0E',
              marginBottom:  description ? '16px' : 0,
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
                maxWidth:   '560px',
                margin:     '0 auto',
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* ── Grille de cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          {items.map((item, i) => (
            <OverviewCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
