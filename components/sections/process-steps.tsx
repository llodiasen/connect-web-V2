'use client'

// Source  : CONTENT.md > HOME > Section Notre méthode
// Design  : section-alt · Timeline 4 étapes · animations Framer Motion scroll
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline

import { motion } from 'framer-motion'
import { Search, Figma, Code2, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ───────────────────────────────────────────────────────────────── */
interface Step {
  num:   string
  Icon:  LucideIcon
  title: string
  text:  string
}

const STEPS: Step[] = [
  { num: '01', Icon: Search, title: 'Découverte',    text: 'Brief, objectifs, budget, délai.'                                    },
  { num: '02', Icon: Figma,  title: 'Design',        text: 'Maquettes Figma validées avant de coder.'                           },
  { num: '03', Icon: Code2,  title: 'Développement', text: 'Sprints 1–2 semaines, preview Vercel à chaque sprint.'              },
  { num: '04', Icon: Rocket, title: 'Livraison',     text: 'Déploiement + formation + support 30 jours.'                       },
]

const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ProcessSteps
   ───────────────────────────────────────────────────────────────── */
export function ProcessSteps() {
  return (
    <section aria-labelledby="process-heading" className="section-alt">
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
          style={{ marginBottom: '56px' }}
        >
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '13px',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-orange-500)',
            marginBottom:  '14px',
          }}>
            Notre méthode
          </p>
          <h2
            id="process-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    700,
              fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
              color:         '#111111',
            }}
          >
            Simple, transparent, sans surprise.
          </h2>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP — timeline horizontale avec ligne animée
           ══════════════════════════════════════════════════════ */}
        <div className="relative">

          {/* Ligne grise — fond statique */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top:        '36px',
              left:       'calc(12.5% + 36px)',
              right:      'calc(12.5% + 36px)',
              height:     '2px',
              background: '#E5E7EB',
            }}
          />

          {/* Ligne orange — fill animé gauche → droite */}
          <div
            aria-hidden="true"
            className="absolute overflow-hidden"
            style={{
              top:    '36px',
              left:   'calc(12.5% + 36px)',
              right:  'calc(12.5% + 36px)',
              height: '2px',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{
                height:          '100%',
                transformOrigin: 'left center',
                background:      'var(--color-orange-500)',
              }}
            />
          </div>

          {/* Grille 4 étapes */}
          <div className="grid grid-cols-4" style={{ gap: '24px' }}>
            {STEPS.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Cercle icône + badge numéro */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div style={{
                    width:          '72px',
                    height:         '72px',
                    borderRadius:   '50%',
                    background:     '#FFFFFF',
                    border:         '2px solid #E5E7EB',
                    boxShadow:      '0 4px 24px rgba(0,0,0,0.08)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                  }}>
                    <step.Icon
                      size={28}
                      style={{ color: 'var(--color-orange-500)' }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Badge numéro — pop au scroll */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: index * 0.15 + 0.3 }}
                    aria-hidden="true"
                    style={{
                      position:       'absolute',
                      top:            '-4px',
                      right:          '-4px',
                      width:          '20px',
                      height:         '20px',
                      borderRadius:   '50%',
                      background:     '#1B2A4A',
                      color:          '#FFFFFF',
                      fontSize:       '10px',
                      fontWeight:     700,
                      fontFamily:     'var(--font-body)',
                      letterSpacing:  '0.02em',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}
                  >
                    {step.num}
                  </motion.span>
                </motion.div>

                {/* Titre */}
                <h3 style={{
                  fontFamily:    'var(--font-heading)',
                  fontWeight:    700,
                  fontSize:      '16px',
                  color:         '#111111',
                  marginTop:     '20px',
                  marginBottom:  '8px',
                }}>
                  {step.title}
                </h3>

                {/* Texte */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize:   '14px',
                  color:      '#666666',
                  lineHeight: 1.65,
                  maxWidth:   '180px',
                  textAlign:  'center',
                }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}
