'use client'

// Source  : CONTENT.md > HOME > Section Pourquoi Connect Web
// Design  : section-alt (bg-#F4F6FA) · cards 3×2 · slide-in scroll
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import { Gauge, Clock, Code2, MapPin, Shield, Headphones } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Section Pourquoi Connect Web
   ───────────────────────────────────────────────────────────────── */
interface Argument {
  Icon:  LucideIcon
  title: string
  proof: string
}

const ARGUMENTS: Argument[] = [
  {
    Icon:  Gauge,
    title: 'Lighthouse 95+ garanti',
    proof: 'Pas une estimation. On ne livre pas tant que le score n\u2019est pas atteint.',
  },
  {
    Icon:  Clock,
    title: 'Réponse sous 24h, délais tenus',
    proof: '98% de nos projets livrés dans les délais annoncés. Agence web à Dakar, disponible sur WhatsApp.',
  },
  {
    Icon:  Code2,
    title: 'Stack 2024\u00A0— pas de WordPress par défaut',
    proof: 'Next.js 15, TypeScript strict, Vercel Edge\u00A0— votre site dure 5 ans.',
  },
  {
    Icon:  MapPin,
    title: 'Basés à Dakar, disponibles pour vous',
    proof: 'Wave, Orange Money, fuseau WAT\u00A0— on connaît votre marché. Agence digitale sénégalaise.',
  },
  {
    Icon:  Shield,
    title: 'Code 100\u00A0% propriétaire',
    proof: 'Tout le code vous appartient dès le premier jour. Aucune dépendance, aucun abonnement caché.',
  },
  {
    Icon:  Headphones,
    title: 'Support 30 jours inclus',
    proof: 'Corrections, ajustements, questions\u00A0— on est là 30 jours après la livraison.',
  },
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — WhyUs
   ───────────────────────────────────────────────────────────────── */
export function WhyUs() {
  return (
    <section
      aria-labelledby="whyus-heading"
      className="section-alt"
    >
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: '48px' }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '12px',
            }}
          >
            Pourquoi Connect Web
          </p>

          {/* H2 */}
          <h2
            id="whyus-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    700,
              fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
              color:         '#0A0B0E',
            }}
          >
            Des engagements, pas des promesses
          </h2>
        </motion.div>

        {/* ── Cards 3×2 ────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {ARGUMENTS.map((arg) => (
            <motion.div
              key={arg.title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              className="group"
              style={{
                backgroundColor: '#FFFFFF',
                border:          '1px solid #E2E8F0',
                borderRadius:    '12px',
                padding:         '32px',
              }}
            >
              {/* Icône — 52×52px */}
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(232,97,26,0.1)', color: 'var(--color-orange-500)' }}
                transition={{ duration: 0.2 }}
                style={{
                  width:          '52px',
                  height:         '52px',
                  borderRadius:   '10px',
                  background:     '#FFF4EE',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   '20px',
                  flexShrink:     0,
                }}
              >
                <arg.Icon
                  size={24}
                  style={{ color: 'var(--color-orange-500)' }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Titre */}
              <h3
                className="font-heading font-bold"
                style={{
                  fontSize:      'var(--card-title-size)',
                  lineHeight:    1.25,
                  letterSpacing: '-0.015em',
                  color:         '#0A0B0E',
                  marginBottom:  '12px',
                }}
              >
                {arg.title}
              </h3>

              {/* Preuve */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--card-text-weight)',
                  fontSize:   'var(--card-text-size)',
                  color:      '#6B7280',
                  lineHeight: 1.7,
                  textAlign:  'justify',
                }}
              >
                {arg.proof}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
