'use client'

// Source  : CONTENT.md > SERVICES > Section Hero (générique)
// Design  : Dark gradient · 2-col layout · Code editor mockup · Floating metrics
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Smartphone, Search, Globe, Code2, ShoppingCart, Cpu, BarChart3, type LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   LOOKUP ICÔNES — résout les noms depuis les Server Components
   ─────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Smartphone, Search, Globe, Code2, ShoppingCart, Cpu, BarChart3,
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface ServiceMetric {
  iconName: string   /* clé dans ICON_MAP — pas de LucideIcon passé en prop */
  value:    string
  label:    string
  accent:   string
  delay?:   number
}

export interface ServiceHeroProps {
  badge:      string
  title:      string
  subtitle:   string
  cta1:       { label: string; href: string }
  cta2:       { label: string; href: string }
  metrics:    ServiceMetric[]
  techPills?: string[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FloatingMetric
   ─────────────────────────────────────────────────────────────── */
function FloatingMetric({
  metric,
  style,
}: {
  metric: ServiceMetric
  style:  React.CSSProperties
}) {
  const { iconName, value, label, accent, delay = 0 } = metric
  const Icon = ICON_MAP[iconName] ?? Zap

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position:      'absolute',
        background:    'rgba(22, 27, 39, 0.92)',
        border:        '1px solid #2A3347',
        borderRadius:  '10px',
        padding:       '10px 14px',
        display:       'flex',
        alignItems:    'center',
        gap:           '10px',
        boxShadow:     '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex:        10,
        ...style,
      }}
    >
      {/* Icône */}
      <div
        style={{
          width:           '32px',
          height:          '32px',
          borderRadius:    '8px',
          background:      `${accent}22`,
          border:          `1px solid ${accent}44`,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
          color:           accent,
        }}
      >
        <Icon size={15} />
      </div>

      {/* Valeur + label */}
      <div>
        <div
          style={{
            fontFamily:         'var(--font-heading)',
            fontWeight:         700,
            fontSize:           '15px',
            lineHeight:         1,
            color:              '#F4F7FC',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '10px',
            color:      '#5A6E8F',
            marginTop:  '3px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — CodeEditorMockup
   ─────────────────────────────────────────────────────────────── */
function CodeEditorMockup() {
  /* Couleurs syntaxe One Dark Pro */
  const kw  = '#C678DD'   /* keywords: import, export, function, const, return */
  const fn  = '#61AFEF'   /* function names, types */
  const str = '#98C379'   /* strings */
  const tag = '#E06C75'   /* JSX tags */
  const att = '#D19A66'   /* JSX attributes */
  const mut = '#5A6E8F'   /* line numbers */
  const sym = '#ABB2BF'   /* symbols, default text */

  type Token = { t: string; c?: string }
  type CodeLine = Token[]

  const lines: CodeLine[] = [
    [{ t: 'import', c: kw }, { t: ' { ' }, { t: 'Metadata', c: fn }, { t: ' } ' }, { t: 'from', c: kw }, { t: " 'next'", c: str }],
    [],
    [{ t: 'export const', c: kw }, { t: ' metadata', c: sym }, { t: ': ' }, { t: 'Metadata', c: fn }, { t: ' = {' }],
    [{ t: '  title', c: att }, { t: ': ' }, { t: "'Mon Site | Connect Web'", c: str }, { t: ',' }],
    [{ t: '  description', c: att }, { t: ': ' }, { t: "'Performant & SEO'", c: str }, { t: ',' }],
    [{ t: '}' }],
    [],
    [{ t: 'export default function', c: kw }, { t: ' ', c: sym }, { t: 'HomePage', c: fn }, { t: '() {' }],
    [{ t: '  return', c: kw }, { t: ' (' }],
    [{ t: '    <', c: sym }, { t: 'main', c: tag }, { t: ' ', c: sym }, { t: 'className', c: att }, { t: '=' }, { t: '"hero"', c: str }, { t: '>' }],
    [{ t: '      <', c: sym }, { t: 'h1', c: tag }, { t: '>' }, { t: 'Performance & Impact', c: str }, { t: '</', c: sym }, { t: 'h1', c: tag }, { t: '>' }],
    [{ t: '    </', c: sym }, { t: 'main', c: tag }, { t: '>' }],
    [{ t: '  )' }],
    [{ t: '}' }],
  ]

  return (
    <div
      style={{
        background:   '#0D1117',
        border:       '1px solid #161B27',
        borderRadius: '12px',
        overflow:     'hidden',
        boxShadow:    '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        fontFamily:   'var(--font-mono)',
        fontSize:     '12.5px',
        lineHeight:   1.75,
      }}
    >
      {/* ── Barre titre ── */}
      <div
        style={{
          background:   '#161B27',
          borderBottom: '1px solid #1E2535',
          padding:      '10px 14px',
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '6px', marginRight: '8px' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>

        {/* Onglet */}
        <span
          style={{
            background:   '#0D1117',
            border:       '1px solid #2A3347',
            borderBottom: 'none',
            borderRadius: '5px 5px 0 0',
            padding:      '2px 10px',
            fontSize:     '11px',
            color:        '#8899BB',
          }}
        >
          page.tsx
        </span>
      </div>

      {/* ── Lignes de code ── */}
      <div
        style={{
          padding:   '16px 0 20px 0',
          overflowX: 'auto',
        }}
      >
        {lines.map((tokens, i) => (
          <div
            key={i}
            style={{
              display:    'flex',
              alignItems: 'baseline',
              paddingLeft: '0',
            }}
          >
            {/* Numéro de ligne */}
            <span
              style={{
                display:       'inline-block',
                width:         '40px',
                textAlign:     'right',
                paddingRight:  '16px',
                color:         mut,
                flexShrink:    0,
                userSelect:    'none',
                fontSize:      '11px',
              }}
            >
              {i + 1}
            </span>

            {/* Tokens */}
            <span style={{ color: sym }}>
              {tokens.map((tok, j) => (
                <span key={j} style={tok.c ? { color: tok.c } : undefined}>
                  {tok.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceHero
   ─────────────────────────────────────────────────────────────── */
export function ServiceHero({
  badge,
  title,
  subtitle,
  cta1,
  cta2,
  metrics,
  techPills = [],
}: ServiceHeroProps) {
  return (
    <section
      aria-label={badge}
      style={{
        position:   'relative',
        background: 'linear-gradient(160deg, #080C12 0%, #0D1117 55%, #0F1520 100%)',
        overflow:   'hidden',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* ── Lueur orange ambiance (haut gauche) ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          top:          '-10%',
          left:         '-5%',
          width:        '50vw',
          height:       '50vw',
          maxWidth:     '700px',
          maxHeight:    '700px',
          background:   'radial-gradient(circle, rgba(232,97,26,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Lueur bleue ambiance (bas droite) ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          bottom:       '-15%',
          right:        '-5%',
          width:        '45vw',
          height:       '45vw',
          maxWidth:     '600px',
          maxHeight:    '600px',
          background:   'radial-gradient(circle, rgba(26,42,74,0.35) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Grille de points décorative ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }}
        >

          {/* ══════════════ COLONNE GAUCHE — Contenu ══════════════ */}
          <div>

            {/* ── Badge ── */}
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
                {/* Dot */}
                <span
                  style={{
                    width:        '5px',
                    height:       '5px',
                    borderRadius: '50%',
                    background:   'var(--color-orange-500)',
                    flexShrink:   0,
                  }}
                />
                {badge}
              </span>
            </motion.div>

            {/* ── H1 ── */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
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
              {title}
            </motion.h1>

            {/* ── Sous-titre ── */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
              className="text-hero-subtitle"
              style={{
                marginBottom: '36px',
                maxWidth:     '480px',
              }}
            >
              {subtitle}
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
              className="flex flex-wrap items-center"
              style={{ gap: '12px', marginBottom: '40px' }}
            >
              {/* CTA 1 — Primaire orange */}
              <Link
                href={cta1.href}
                className="inline-flex items-center font-semibold"
                style={{
                  gap:        '8px',
                  padding:    '13px 26px',
                  background: 'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
                  borderRadius: '10px',
                  fontSize:   '14px',
                  color:      '#FFFFFF',
                  boxShadow:  '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)',
                  transition: 'box-shadow 200ms ease, transform 150ms ease',
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
                {cta1.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              {/* CTA 2 — Ghost */}
              <Link
                href={cta2.href}
                className="inline-flex items-center font-semibold"
                style={{
                  gap:        '8px',
                  padding:    '12px 24px',
                  background: 'transparent',
                  border:     '1px solid #2A3347',
                  borderRadius: '10px',
                  fontSize:   '14px',
                  color:      '#B8C8E0',
                  transition: 'border-color 200ms ease, color 200ms ease, background 200ms ease',
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
                {cta2.label}
              </Link>
            </motion.div>

            {/* ── Tech pills ── */}
            {techPills.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
                className="flex flex-wrap"
                style={{ gap: '8px' }}
              >
                {techPills.map((pill) => (
                  <span
                    key={pill}
                    style={{
                      display:      'inline-block',
                      background:   '#161B27',
                      border:       '1px solid #1E2535',
                      borderRadius: '6px',
                      padding:      '4px 10px',
                      fontFamily:   'var(--font-mono)',
                      fontSize:     '11px',
                      color:        '#5A6E8F',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {/* ══════════════ COLONNE DROITE — Visuel ══════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* ── Code Editor ── */}
            <CodeEditorMockup />

            {/* ── Métriques flottantes ── */}
            {metrics.map((metric, i) => {
              /* Positions prédéfinies pour 1, 2 ou 3 métriques */
              const positions: React.CSSProperties[] = [
                { top: '-18px',  right: '-18px' },
                { bottom: '15%', left:  '-22px' },
                { bottom: '-18px', right: '10%' },
              ]
              return (
                <FloatingMetric
                  key={metric.label}
                  metric={{ ...metric, delay: i * 1.1 }}
                  style={positions[i] ?? {}}
                />
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
