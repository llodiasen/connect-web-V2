'use client'

// Source  : CONTENT.md > SERVICES > Section Comparatif (générique)
// Design  : Light theme · Tableau 3 colonnes · Colonne Connect Web surlignée orange
//           Indicateurs check/cross/partial · CTA final
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, Minus, ArrowRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export type CellValue =
  | { type: 'yes';     label?: string }
  | { type: 'no';      label?: string }
  | { type: 'partial'; label:  string }
  | { type: 'text';    label:  string }

export interface ComparisonRow {
  criterion:   string        /* ex: "Performances Lighthouse" */
  description?: string       /* sous-ligne optionnelle */
  cells:       [CellValue, CellValue, CellValue]  /* [ConnectWeb, Alt1, Alt2] */
}

export interface ComparisonColumn {
  name:        string        /* ex: "Connect Web" */
  badge?:      string        /* ex: "Recommandé" */
  highlight?:  boolean       /* colonne mise en avant */
}

export interface ServiceComparisonProps {
  eyebrow?:    string
  title:       string
  description?: string
  columns:     [ComparisonColumn, ComparisonColumn, ComparisonColumn]
  rows:        ComparisonRow[]
  ctaLabel?:   string
  ctaHref?:    string
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   HELPER — CellRenderer
   ─────────────────────────────────────────────────────────────── */
function CellRenderer({
  cell,
  highlight,
}: {
  cell:      CellValue
  highlight: boolean
}) {
  if (cell.type === 'yes') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <span
          style={{
            width:           '26px',
            height:          '26px',
            borderRadius:    '50%',
            background:      highlight ? 'rgba(232,97,26,0.12)' : 'rgba(22,163,74,0.10)',
            border:          `1px solid ${highlight ? 'rgba(232,97,26,0.25)' : 'rgba(22,163,74,0.25)'}`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           highlight ? 'var(--color-orange-500)' : '#16A34A',
            flexShrink:      0,
          }}
        >
          <Check size={13} strokeWidth={2.5} />
        </span>
        {cell.label && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: highlight ? 'var(--color-orange-500)' : '#16A34A', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>
            {cell.label}
          </span>
        )}
      </div>
    )
  }

  if (cell.type === 'no') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <span
          style={{
            width:           '26px',
            height:          '26px',
            borderRadius:    '50%',
            background:      'rgba(220,38,38,0.07)',
            border:          '1px solid rgba(220,38,38,0.18)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           '#DC2626',
            flexShrink:      0,
          }}
        >
          <X size={13} strokeWidth={2.5} />
        </span>
        {cell.label && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#DC2626', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>
            {cell.label}
          </span>
        )}
      </div>
    )
  }

  if (cell.type === 'partial') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <span
          style={{
            width:           '26px',
            height:          '26px',
            borderRadius:    '50%',
            background:      'rgba(217,119,6,0.08)',
            border:          '1px solid rgba(217,119,6,0.22)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           '#D97706',
            flexShrink:      0,
          }}
        >
          <Minus size={13} strokeWidth={2.5} />
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D97706', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>
          {cell.label}
        </span>
      </div>
    )
  }

  /* type === 'text' */
  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '12px',
        color:      highlight ? '#0A0B0E' : '#6B7280',
        fontWeight: highlight ? 500 : 'var(--font-light)',
        textAlign:  'center',
        lineHeight: 1.4,
      }}
    >
      {cell.label}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceComparison
   ─────────────────────────────────────────────────────────────── */
export function ServiceComparison({
  eyebrow = 'Pourquoi nous choisir',
  title,
  description,
  columns,
  rows,
  ctaLabel = 'Choisir Connect Web',
  ctaHref  = '/contact',
}: ServiceComparisonProps) {
  const highlightIdx = columns.findIndex((c) => c.highlight)

  /* Largeurs colonnes : critère 28% + 3 colonnes ~24% chacune */
  const colWidths = ['28%', '24%', '24%', '24%']

  return (
    <section
      aria-labelledby="comparison-heading"
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
            id="comparison-heading"
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

        {/* ── Tableau — scroll horizontal mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <table
            style={{
              width:           '100%',
              minWidth:        '580px',
              borderCollapse:  'separate',
              borderSpacing:   0,
              background:      '#FFFFFF',
              border:          '1px solid #E2E8F0',
              borderRadius:    '16px',
              overflow:        'hidden',
            }}
          >
            {/* ── THEAD ── */}
            <thead>
              <tr>
                {/* Cellule critère — vide */}
                <th
                  scope="col"
                  style={{
                    width:         colWidths[0],
                    padding:       '0',
                    background:    '#F7F8FA',
                    borderBottom:  '1px solid #E2E8F0',
                    borderRight:   '1px solid #E2E8F0',
                  }}
                />

                {/* Colonnes solutions */}
                {columns.map((col, ci) => {
                  const isHL = ci === highlightIdx
                  return (
                    <th
                      key={col.name}
                      scope="col"
                      style={{
                        width:        colWidths[ci + 1],
                        padding:      '20px 16px 16px',
                        background:   isHL ? 'rgba(232,97,26,0.04)' : '#F7F8FA',
                        borderBottom: '1px solid #E2E8F0',
                        borderRight:  ci < columns.length - 1 ? '1px solid #E2E8F0' : 'none',
                        borderTop:    isHL ? '3px solid var(--color-orange-500)' : '3px solid transparent',
                        textAlign:    'center',
                        verticalAlign:'bottom',
                        position:     'relative',
                      }}
                    >
                      {/* Badge Recommandé */}
                      {col.badge && (
                        <span
                          style={{
                            display:       'inline-block',
                            background:    'var(--color-orange-500)',
                            borderRadius:  '100px',
                            padding:       '2px 10px',
                            fontFamily:    'var(--font-body)',
                            fontSize:      '10px',
                            fontWeight:    700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color:         '#FFFFFF',
                            marginBottom:  '8px',
                          }}
                        >
                          {col.badge}
                        </span>
                      )}

                      <div
                        style={{
                          fontFamily:    'var(--font-heading)',
                          fontWeight:    700,
                          fontSize:      'clamp(0.8125rem, 1.1vw, 0.9375rem)',
                          color:         isHL ? '#0A0B0E' : '#6B7280',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {col.name}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>

            {/* ── TBODY ── */}
            <tbody>
              {rows.map((row, ri) => {
                const isLast = ri === rows.length - 1
                return (
                  <tr key={row.criterion}>
                    {/* Cellule critère */}
                    <td
                      style={{
                        padding:      '18px 20px',
                        borderBottom: isLast ? 'none' : '1px solid #F1F3F7',
                        borderRight:  '1px solid #E2E8F0',
                        verticalAlign:'middle',
                      }}
                    >
                      <span
                        style={{
                          display:       'block',
                          fontFamily:    'var(--font-heading)',
                          fontWeight:    600,
                          fontSize:      'clamp(0.8125rem, 1.1vw, 0.875rem)',
                          color:         '#0A0B0E',
                          lineHeight:    1.3,
                        }}
                      >
                        {row.criterion}
                      </span>
                      {row.description && (
                        <span
                          style={{
                            display:    'block',
                            fontFamily: 'var(--font-body)',
                            fontSize:   '11.5px',
                            color:      '#9CA3AF',
                            marginTop:  '2px',
                            lineHeight: 1.4,
                          }}
                        >
                          {row.description}
                        </span>
                      )}
                    </td>

                    {/* Cellules valeurs */}
                    {row.cells.map((cell, ci) => {
                      const isHL   = ci === highlightIdx
                      return (
                        <td
                          key={ci}
                          style={{
                            padding:      '18px 12px',
                            background:   isHL ? 'rgba(232,97,26,0.025)' : 'transparent',
                            borderBottom: isLast ? 'none' : '1px solid #F1F3F7',
                            borderRight:  ci < columns.length - 1 ? '1px solid #F1F3F7' : 'none',
                            textAlign:    'center',
                            verticalAlign:'middle',
                          }}
                        >
                          <CellRenderer cell={cell} highlight={isHL} />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        {/* ── CTA sous le tableau ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.25 }}
          className="flex flex-col items-center"
          style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', gap: '12px' }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center font-semibold"
            style={{
              gap:          '8px',
              padding:      '14px 32px',
              background:   'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
              borderRadius: '12px',
              fontSize:     '15px',
              color:        '#FFFFFF',
              textDecoration: 'none',
              boxShadow:    '0 2px 8px rgba(232,97,26,0.25), 0 0 0 1px rgba(232,97,26,0.2)',
              transition:   'box-shadow 200ms ease, transform 150ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,97,26,0.38), 0 0 0 1px rgba(232,97,26,0.3)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,97,26,0.25), 0 0 0 1px rgba(232,97,26,0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {ctaLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '13px',
              color:      '#9CA3AF',
            }}
          >
            Devis gratuit · Réponse sous 24h
          </p>
        </motion.div>

      </div>
    </section>
  )
}
