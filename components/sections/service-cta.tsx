'use client'

// Source  : CONTENT.md > SERVICES > Section CTA Final (générique)
// Design  : Gradient orange-to-dark · Centré · Trust badges · Pas de form inline
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, ThumbsUp, MessageCircle } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface TrustItem {
  iconName: 'Shield' | 'Zap' | 'ThumbsUp' | 'MessageCircle'
  label:    string
}

export interface ServiceCtaProps {
  title:       string
  subtitle:    string
  cta1:        { label: string; href: string }
  cta2?:       { label: string; href: string }
  trustItems?: TrustItem[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

const ICON_MAP = { Shield, Zap, ThumbsUp, MessageCircle }

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceCta
   ─────────────────────────────────────────────────────────────── */
export function ServiceCta({
  title,
  subtitle,
  cta1,
  cta2,
  trustItems = [],
}: ServiceCtaProps) {
  return (
    <section
      aria-label="Démarrer votre projet"
      style={{
        position:   'relative',
        background: 'linear-gradient(150deg, #C44D0E 0%, #E8611A 35%, #3D1508 75%, #080C12 100%)',
        overflow:   'hidden',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      {/* ── Lueur centrale diffuse ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%, -50%)',
          width:      '70vw',
          height:     '70vw',
          maxWidth:   '800px',
          maxHeight:  '800px',
          background: 'radial-gradient(circle, rgba(255,122,32,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Lueur coin haut-droit ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '-20%',
          right:      '-10%',
          width:      '45vw',
          height:     '45vw',
          maxWidth:   '500px',
          maxHeight:  '500px',
          background: 'radial-gradient(circle, rgba(232,97,26,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Grille de points décorative ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 'clamp(1.5rem, 3vw, 2rem)' }}
        >

          {/* ── Badge eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '7px',
                background:    'rgba(255,255,255,0.12)',
                border:        '1px solid rgba(255,255,255,0.20)',
                borderRadius:  '100px',
                padding:       '5px 16px',
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.85)',
              }}
            >
              <span
                style={{
                  width:        '5px',
                  height:       '5px',
                  borderRadius: '50%',
                  background:   '#FFD580',
                  flexShrink:   0,
                }}
              />
              Premier échange gratuit
            </span>
          </motion.div>

          {/* ── Titre ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    800,
              fontSize:      'clamp(1.875rem, 4.5vw, 3.25rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.03em',
              color:         '#FFFFFF',
              maxWidth:      '760px',
              margin:        0,
            }}
          >
            {title}
          </motion.h2>

          {/* ── Sous-titre ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1rem, 1.5vw, 1.125rem)',
              color:      'rgba(255,255,255,0.70)',
              lineHeight: 1.65,
              maxWidth:   '520px',
              margin:     0,
            }}
          >
            {subtitle}
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px' }}
          >
            {/* CTA 1 — Primaire blanc */}
            <Link
              href={cta1.href}
              className="inline-flex items-center font-semibold"
              style={{
                gap:          '8px',
                padding:      '14px 30px',
                background:   '#FFFFFF',
                borderRadius: '12px',
                fontSize:     '15px',
                fontWeight:   700,
                color:        'var(--color-orange-600)',
                textDecoration: 'none',
                boxShadow:    '0 4px 20px rgba(0,0,0,0.25)',
                transition:   'box-shadow 200ms ease, transform 150ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {cta1.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            {/* CTA 2 — Ghost blanc optionnel */}
            {cta2 && (
              <Link
                href={cta2.href}
                className="inline-flex items-center font-semibold"
                style={{
                  gap:          '8px',
                  padding:      '13px 28px',
                  background:   'transparent',
                  border:       '1px solid rgba(255,255,255,0.30)',
                  borderRadius: '12px',
                  fontSize:     '15px',
                  color:        'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  transition:   'border-color 200ms ease, background 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'
                  e.currentTarget.style.background  = 'transparent'
                }}
              >
                {cta2.label}
              </Link>
            )}
          </motion.div>

          {/* ── Trust badges ── */}
          {trustItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 'clamp(16px, 3vw, 32px)' }}
            >
              {trustItems.map((item) => {
                const Icon = ICON_MAP[item.iconName]
                return (
                  <span
                    key={item.label}
                    style={{
                      display:    'inline-flex',
                      alignItems: 'center',
                      gap:        '7px',
                      fontFamily: 'var(--font-body)',
                      fontSize:   '13px',
                      fontWeight: 500,
                      color:      'rgba(255,255,255,0.65)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon
                      size={14}
                      aria-hidden="true"
                      style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}
                    />
                    {item.label}
                  </span>
                )
              })}

              {/* Séparateurs visuels entre badges */}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}
