'use client'

// Source  : CONTENT.md > SERVICES > Section Technologies (générique)
// Design  : Light theme · Cards par catégorie · Pills brand colors · Grille 2×2
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface TechItem {
  name:       string
  color:      string  /* couleur brand de la techno — fond pill à 12% d'opacité */
  textColor?: string  /* override texte si besoin de contraste */
}

export interface TechCategory {
  label:       string   /* ex: "Frontend" */
  accent:      string   /* couleur de l'accent catégorie */
  techs:       TechItem[]
}

export interface ServiceTechnologiesProps {
  eyebrow?:    string
  title:       string
  description?: string
  categories:  TechCategory[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   HELPER — hexToRgb
   Convertit "#RRGGBB" → "R, G, B" pour rgba()
   ─────────────────────────────────────────────────────────────── */
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — TechPill
   ─────────────────────────────────────────────────────────────── */
function TechPill({ tech }: { tech: TechItem }) {
  const rgb = hexToRgb(tech.color)

  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '6px',
        background:    `rgba(${rgb}, 0.10)`,
        border:        `1px solid rgba(${rgb}, 0.22)`,
        borderRadius:  '8px',
        padding:       '5px 11px',
        fontFamily:    'var(--font-body)',
        fontSize:      '13px',
        fontWeight:    500,
        color:         tech.textColor ?? tech.color,
        whiteSpace:    'nowrap',
        transition:    'background 200ms ease',
      }}
    >
      {/* Dot coloré */}
      <span
        aria-hidden="true"
        style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   tech.color,
          flexShrink:   0,
        }}
      />
      {tech.name}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — CategoryCard
   ─────────────────────────────────────────────────────────────── */
function CategoryCard({
  category,
  index,
}: {
  category: TechCategory
  index:    number
}) {
  const accentRgb = hexToRgb(category.accent)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
      style={{
        background:    '#FFFFFF',
        border:        '1px solid #E2E8F0',
        borderRadius:  '16px',
        overflow:      'hidden',
        boxShadow:     '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Header catégorie ── */}
      <div
        style={{
          padding:      '16px 24px',
          background:   `rgba(${accentRgb}, 0.05)`,
          borderBottom: '1px solid #F1F3F7',
          display:      'flex',
          alignItems:   'center',
          gap:          '10px',
        }}
      >
        {/* Barre accent colorée */}
        <span
          style={{
            width:        '4px',
            height:       '18px',
            borderRadius: '3px',
            background:   category.accent,
            flexShrink:   0,
          }}
        />
        <h3
          style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      '13px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color:         '#0A0B0E',
            margin:        0,
          }}
        >
          {category.label}
        </h3>
        {/* Compteur */}
        <span
          style={{
            marginLeft:    'auto',
            background:    `rgba(${accentRgb}, 0.10)`,
            border:        `1px solid rgba(${accentRgb}, 0.20)`,
            borderRadius:  '100px',
            padding:       '1px 8px',
            fontFamily:    'var(--font-body)',
            fontSize:      '11px',
            fontWeight:    600,
            color:         category.accent,
          }}
        >
          {category.techs.length}
        </span>
      </div>

      {/* ── Pills technologies ── */}
      <div
        style={{
          padding:    '20px 24px',
          display:    'flex',
          flexWrap:   'wrap',
          gap:        '8px',
        }}
      >
        {category.techs.map((tech) => (
          <TechPill key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceTechnologies
   ─────────────────────────────────────────────────────────────── */
export function ServiceTechnologies({
  eyebrow = 'Notre stack technique',
  title,
  description,
  categories,
}: ServiceTechnologiesProps) {
  return (
    <section
      aria-labelledby="tech-heading"
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
            id="tech-heading"
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

        {/* ── Grille 2×2 catégories ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.label} category={cat} index={i} />
          ))}
        </div>

        {/* ── Note stack ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          style={{
            marginTop:   'clamp(1.5rem, 3vw, 2.5rem)',
            fontFamily:  'var(--font-body)',
            fontSize:    '13px',
            color:       '#9CA3AF',
            lineHeight:  1.6,
            maxWidth:    '580px',
          }}
        >
          Chaque stack est choisie{' '}
          <strong style={{ color: '#4A5568', fontWeight: 500 }}>
            selon votre projet, votre équipe et vos contraintes
          </strong>
          {' '}— pas selon la mode du moment. On vous conseille la meilleure
          option lors de l'appel de découverte.
        </motion.p>

      </div>
    </section>
  )
}
