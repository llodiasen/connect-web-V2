'use client'

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────────── */
interface Pair {
  probleme: {
    titre: string
    description: string
  }
  solution: {
    titre: string
    description: string
  }
}

interface ProblemsSectionProps {
  pairs: Pair[]
}

/* ─────────────────────────────────────────────────────────────────
   Icônes SVG inline
   ───────────────────────────────────────────────────────────────── */
function IconXCircle({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}

function IconCheckCircle({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconX({ size = 13, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function IconCheck({ size = 13, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

const VIEWPORT = { once: true }

/* ─────────────────────────────────────────────────────────────────
   Composant
   ───────────────────────────────────────────────────────────────── */
export default function ProblemsSection({ pairs }: ProblemsSectionProps) {
  return (
    <section className="section-alt">
      <div className="container">

        {/* En-tête centré */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontSize:      '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color:         'var(--color-orange-500)',
            marginBottom:  '12px',
            fontWeight:    600,
          }}>
            PROBLÈMES RÉSOLUS
          </p>
          <h2
            className="text-h2"
            style={{ color: '#111' }}
          >
            Vos problèmes. Nos solutions.
          </h2>
        </div>

        {/* Grid 2 colonnes */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            gap:          '3px',
            borderRadius: '16px',
            overflow:     'hidden',
            border:       '0.5px solid #E5E7EB',
          }}
        >

          {/* ── Colonne gauche — Problèmes ── */}
          <div style={{ background: '#FEF2F2' }}>

            {/* Header colonne */}
            <div style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              padding:       '16px 22px',
              fontSize:      '12px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         '#B91C1C',
            }}>
              <IconXCircle size={16} color="#B91C1C" />
              Vos problèmes actuels
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '3px' }}>
              {pairs.map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -2, borderColor: 'var(--color-orange-500)', boxShadow: '0 4px 16px rgba(232,97,26,0.10)' }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.15 }}
                  style={{
                    background:   'white',
                    borderRadius: '10px',
                    padding:      '20px 22px',
                    display:      'flex',
                    gap:          '16px',
                    alignItems:   'flex-start',
                    border:       '0.5px solid #E5E7EB',
                    cursor:       'default',
                  }}
                >
                  {/* Numéro */}
                  <span style={{
                    fontSize:   '11px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    color:      '#FCA5A5',
                    minWidth:   '20px',
                    paddingTop: '3px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icône X cerclée */}
                  <div style={{
                    width:          '32px',
                    height:         '32px',
                    borderRadius:   '50%',
                    background:     '#FEE2E2',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                  }}>
                    <IconX size={14} color="#EF4444" />
                  </div>

                  {/* Texte */}
                  <div>
                    <div style={{
                      fontFamily:   'var(--font-heading)',
                      fontSize:     'var(--card-title-size)',
                      fontWeight:   700,
                      color:        '#111827',
                      marginBottom: '6px',
                      lineHeight:   1.3,
                    }}>
                      {pair.probleme.titre}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                      color:      '#374151',
                      lineHeight: 1.6,
                    }}>
                      {pair.probleme.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite — Solutions ── */}
          <div style={{ background: '#F0FDF4' }}>

            {/* Header colonne */}
            <div style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              padding:       '16px 22px',
              fontSize:      '12px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         '#15803D',
            }}>
              <IconCheckCircle size={16} color="#15803D" />
              Avec Connect Web
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '3px' }}>
              {pairs.map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -2, borderColor: 'var(--color-orange-500)', boxShadow: '0 4px 16px rgba(232,97,26,0.10)' }}
                  viewport={VIEWPORT}
                  transition={{ delay: i * 0.08, duration: 0.15 }}
                  style={{
                    background:   'white',
                    borderRadius: '10px',
                    padding:      '20px 22px',
                    display:      'flex',
                    gap:          '16px',
                    alignItems:   'flex-start',
                    border:       '0.5px solid #E5E7EB',
                    cursor:       'default',
                  }}
                >
                  {/* Numéro */}
                  <span style={{
                    fontSize:   '11px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    color:      '#86EFAC',
                    minWidth:   '20px',
                    paddingTop: '3px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icône Check cerclée */}
                  <div style={{
                    width:          '32px',
                    height:         '32px',
                    borderRadius:   '50%',
                    background:     '#DCFCE7',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                  }}>
                    <IconCheck size={14} color="#16A34A" />
                  </div>

                  {/* Texte */}
                  <div>
                    <div style={{
                      fontFamily:   'var(--font-heading)',
                      fontSize:     'var(--card-title-size)',
                      fontWeight:   700,
                      color:        '#111827',
                      marginBottom: '6px',
                      lineHeight:   1.3,
                    }}>
                      {pair.solution.titre}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                      color:      '#374151',
                      lineHeight: 1.6,
                    }}>
                      {pair.solution.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Badge bas de section */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <div style={{
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '6px',
            background:  '#1B2A4A',
            color:       'white',
            fontSize:    '11px',
            padding:     '6px 14px',
            borderRadius:'20px',
          }}>
            <span style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   'var(--color-orange-500)',
              flexShrink:   0,
              display:      'inline-block',
            }} />
            Chaque problème a une solution concrète — pas une promesse
          </div>
        </div>

      </div>
    </section>
  )
}
