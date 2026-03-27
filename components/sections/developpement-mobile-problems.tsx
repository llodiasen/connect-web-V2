'use client'

// Source : CONTENT.md > PAGE : Développement Mobile > SECTION 03 : PROBLÈMES CLIENTS
// RÈGLE N°0 CLAUDE.md v4.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import { ZapOff, HelpCircle, AlertTriangle, WifiOff } from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHoverError } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Problèmes clients
   Source : CONTENT.md > Développement Mobile > Section 03
   ─────────────────────────────────────────────────────────────── */
const PROBLEMS = [
  {
    Icon:  ZapOff,
    titre: "App lente et instable",
    texte: "Vos utilisateurs désinstallent. 53% abandonnent une app qui charge en +3 secondes.",
  },
  {
    Icon:  HelpCircle,
    titre: "Quel choix technique ?",
    texte: "iOS, Android, les deux ? Le mauvais choix peut doubler votre budget.",
  },
  {
    Icon:  AlertTriangle,
    titre: "Prestataire décevant",
    texte: "Livré en retard, hors budget, qualité médiocre. Ça ne se reproduira pas.",
  },
  {
    Icon:  WifiOff,
    titre: "Inutilisable hors connexion",
    texte: "En Afrique de l\u2019Ouest, la connectivité n\u2019est pas garantie. Votre app doit fonctionner partout.",
  },
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — DeveloppementMobileProblems
   ─────────────────────────────────────────────────────────────── */
export function DeveloppementMobileProblems() {
  return (
    <section className="section-alt">
      <div className="container">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          viewport={VIEWPORT}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center' }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '10px',
            }}
          >
            Vos défis
          </p>

          {/* H2 */}
          <h2
            className="font-heading font-bold"
            style={{
              color:         'var(--text-primary)',
              fontSize:      'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
            }}
          >
            Vous rencontrez ces obstacles&nbsp;?
          </h2>
        </motion.div>

        {/* ── Grille 4 cards — 1 col mobile / 2×2 desktop ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '20px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {PROBLEMS.map(({ Icon, titre, texte }) => (
            <motion.div
              key={titre}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Icône */}
              <motion.div
                variants={iconHoverError}
                initial="rest"
                whileHover="hover"
                style={{
                  width:           '44px',
                  height:          '44px',
                  borderRadius:    '10px',
                  background:      'var(--bg-error-subtle)',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  color:           'var(--color-error)',
                  marginBottom:    '16px',
                  flexShrink:      0,
                }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>

              {/* Titre */}
              <h3
                className="font-heading font-bold"
                style={{
                  color:         'var(--text-primary)',
                  fontSize:      'var(--card-title-size)',
                  lineHeight:    1.25,
                  letterSpacing: '-0.015em',
                  marginBottom:  '8px',
                }}
              >
                {titre}
              </h3>

              {/* Texte */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                  color:      'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  textAlign:  'justify',
                }}
              >
                {texte}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
