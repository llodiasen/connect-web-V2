'use client'

// Source  : CONTENT.md > SERVICES > Section Case Studies / Réalisations (générique)
// Design  : Light theme · 2 cards horizontales · Screenshot + métriques orange · Tech badges
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface CaseMetric {
  label: string   /* ex: "Lighthouse" */
  value: string   /* ex: "98 / 100" */
  delta?: string  /* ex: "+42 pts" — amélioration vs avant */
}

export interface CaseStudy {
  imageSrc:    string
  imageAlt:    string
  name:        string
  sector:      string
  problem:     string   /* 1 ligne */
  result:      string   /* 1 ligne — résultat clé */
  metrics:     CaseMetric[]
  techs:       string[]
  href?:       string
}

export interface ServiceCaseStudiesProps {
  eyebrow?:    string
  title:       string
  description?: string
  studies:     CaseStudy[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — MetricBadge
   ─────────────────────────────────────────────────────────────── */
function MetricBadge({ metric }: { metric: CaseMetric }) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '4px',
      }}
    >
      {/* Valeur principale */}
      <div
        style={{
          display:    'flex',
          alignItems: 'baseline',
          gap:        '6px',
        }}
      >
        <span
          style={{
            fontFamily:         'var(--font-heading)',
            fontWeight:         800,
            fontSize:           'clamp(1.25rem, 2vw, 1.625rem)',
            lineHeight:         1,
            letterSpacing:      '-0.03em',
            color:              'var(--color-orange-500)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {metric.value}
        </span>

        {/* Delta +/- */}
        {metric.delta && (
          <span
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '11px',
              fontWeight:   600,
              color:        '#16A34A',
              background:   'rgba(22,163,74,0.08)',
              border:       '1px solid rgba(22,163,74,0.18)',
              borderRadius: '4px',
              padding:      '1px 5px',
              whiteSpace:   'nowrap',
            }}
          >
            {metric.delta}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '11px',
          fontWeight:    500,
          color:         '#9CA3AF',
          letterSpacing: '0.02em',
        }}
      >
        {metric.label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — CaseStudyCard
   ─────────────────────────────────────────────────────────────── */
function CaseStudyCard({
  study,
  index,
  reverse,
}: {
  study:   CaseStudy
  index:   number
  reverse: boolean
}) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.15 }}
      aria-label={`Étude de cas — ${study.name}`}
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '20px',
        overflow:     'hidden',
        boxShadow:    '0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2`}
        style={{ minHeight: '340px' }}
      >

        {/* ══ IMAGE ══ */}
        <div
          style={{
            position:   'relative',
            background: '#F7F8FA',
            overflow:   'hidden',
            order:      reverse ? 2 : 1,
            minHeight:  '260px',
          }}
        >
          {/* Screenshot du site */}
          <Image
            src={study.imageSrc}
            alt={study.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{
              objectFit:   'cover',
              objectPosition: 'top center',
              transition:  'transform 400ms ease',
              transform:   imgLoaded ? 'scale(1)' : 'scale(1.03)',
            }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Overlay gradient bas → transparent */}
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     '40%',
              background: 'linear-gradient(to top, rgba(247,248,250,0.7), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Badge secteur */}
          <span
            style={{
              position:      'absolute',
              top:           '16px',
              left:          '16px',
              background:    'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border:        '1px solid rgba(0,0,0,0.08)',
              borderRadius:  '100px',
              padding:       '4px 12px',
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color:         '#4A5568',
            }}
          >
            {study.sector}
          </span>
        </div>

        {/* ══ CONTENU ══ */}
        <div
          style={{
            padding:       'clamp(1.75rem, 3vw, 2.25rem)',
            display:       'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap:           '20px',
            order:         reverse ? 1 : 2,
          }}
        >
          {/* ── Titre + accroche ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    800,
                fontSize:      'clamp(1.125rem, 1.8vw, 1.375rem)',
                lineHeight:    1.2,
                letterSpacing: '-0.02em',
                color:         '#0A0B0E',
                margin:        0,
              }}
            >
              {study.name}
            </h3>

            {/* Problème → résultat */}
            <div
              style={{
                display:      'flex',
                flexDirection:'column',
                gap:          '4px',
              }}
            >
              <p
                style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    '13.5px',
                  color:       '#9CA3AF',
                  lineHeight:  1.5,
                  margin:      0,
                  textAlign:   'justify',
                }}
              >
                <span style={{ color: '#DC2626', fontWeight: 500 }}>Problème :</span>{' '}
                {study.problem}
              </p>
              <p
                style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    '13.5px',
                  color:       '#4A5568',
                  lineHeight:  1.5,
                  margin:      0,
                  textAlign:   'justify',
                }}
              >
                <span style={{ color: '#16A34A', fontWeight: 500 }}>Résultat :</span>{' '}
                {study.result}
              </p>
            </div>
          </div>

          {/* ── Séparateur ── */}
          <div style={{ height: '1px', background: '#F1F3F7' }} />

          {/* ── Métriques ── */}
          <div
            className="grid grid-cols-3"
            style={{ gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}
          >
            {study.metrics.map((m) => (
              <MetricBadge key={m.label} metric={m} />
            ))}
          </div>

          {/* ── Séparateur ── */}
          <div style={{ height: '1px', background: '#F1F3F7' }} />

          {/* ── Tech badges + CTA ── */}
          <div
            style={{
              display:     'flex',
              alignItems:  'center',
              flexWrap:    'wrap',
              gap:         '8px',
            }}
          >
            {/* Pills technos */}
            {study.techs.map((tech) => (
              <span
                key={tech}
                style={{
                  display:      'inline-block',
                  background:   'rgba(232,97,26,0.07)',
                  border:       '1px solid rgba(232,97,26,0.16)',
                  borderRadius: '6px',
                  padding:      '3px 9px',
                  fontFamily:   'var(--font-mono)',
                  fontSize:     '11px',
                  fontWeight:   500,
                  color:        'var(--color-orange-500)',
                }}
              >
                {tech}
              </span>
            ))}

            {/* Spacer + CTA */}
            {study.href && (
              <Link
                href={study.href}
                className="inline-flex items-center font-semibold"
                style={{
                  marginLeft:     'auto',
                  gap:            '5px',
                  fontSize:       '13px',
                  color:          'var(--color-orange-500)',
                  textDecoration: 'none',
                  whiteSpace:     'nowrap',
                  transition:     'gap 180ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = '8px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '5px')}
              >
                Voir le projet
                <ExternalLink size={13} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceCaseStudies
   ─────────────────────────────────────────────────────────────── */
export function ServiceCaseStudies({
  eyebrow = 'Nos réalisations',
  title,
  description,
  studies,
}: ServiceCaseStudiesProps) {
  return (
    <section
      aria-labelledby="cases-heading"
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
            id="cases-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    800,
              fontSize:      'clamp(1.625rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.03em',
              color:         '#0A0B0E',
              marginBottom:  description ? '12px' : 0,
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
                maxWidth:   '480px',
                margin:     '0 auto 20px',
              }}
            >
              {description}
            </p>
          )}

          {/* CTA → Portfolio complet */}
          <Link
            href="/portfolio"
            className="inline-flex items-center font-semibold"
            style={{
              gap:            '7px',
              padding:        '11px 22px',
              background:     'transparent',
              border:         '1px solid #E2E8F0',
              borderRadius:   '10px',
              fontSize:       '13.5px',
              color:          '#4A5568',
              textDecoration: 'none',
              transition:     'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(232,97,26,0.35)'
              e.currentTarget.style.color       = 'var(--color-orange-500)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E2E8F0'
              e.currentTarget.style.color       = '#4A5568'
            }}
          >
            Voir tout le portfolio
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          {studies.map((study, i) => (
            <CaseStudyCard
              key={study.name}
              study={study}
              index={i}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
