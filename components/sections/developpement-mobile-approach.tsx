'use client'

// Source : CONTENT.md > PAGE : Développement Mobile > SECTION 04 : NOTRE APPROCHE
// RÈGLE N°0 CLAUDE.md v4.2 — Tout spacing via style={{}} inline

import { motion } from 'framer-motion'
import { EASE, VIEWPORT, staggerGrid, gridChild } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num:   '01',
    titre: "Stratégie d'abord",
    texte: "Avant de coder, on analyse votre marché et vos utilisateurs. Chaque décision technique sert un objectif business.",
  },
  {
    num:   '02',
    titre: 'Sprints visibles',
    texte: "Démo toutes les 2 semaines. Vous voyez l'avancement, vous validez, vous gardez le contrôle.",
  },
  {
    num:   '03',
    titre: 'Qualité non négociable',
    texte: 'Tests sur appareils réels (Samsung, iPhone, Tecno, Infinix). Votre app marche partout.',
  },
]

const ORANGE    = 'var(--color-orange-500)'
const ORANGE_BG = 'rgba(232,97,26,0.08)'

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT — DeveloppementMobileApproach
   ─────────────────────────────────────────────────────────────── */
export function DeveloppementMobileApproach() {
  return (
    <section className="section-base" aria-labelledby="approach-heading">
      <div className="container">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          viewport={VIEWPORT}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: ORANGE, marginBottom: '12px',
          }}>
            Notre méthode
          </p>
          <h2
            id="approach-heading"
            className="font-heading font-bold"
            style={{
              color: '#1B2A4A',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight: 1.15, letterSpacing: '-0.025em',
            }}
          >
            Simple, transparent, sans surprise
          </h2>
        </motion.div>

        {/* ══ DESKTOP (sm+) — roadmap horizontal ══ */}
        <div className="hidden sm:block">

          {/* Ligne + cercles */}
          <div style={{ position: 'relative', marginBottom: '28px' }}>

            {/* Ligne de fond grise */}
            <div style={{
              position: 'absolute',
              top: '28px', left: 'calc(100% / 6)', right: 'calc(100% / 6)',
              height: '2px', background: '#E2E8F0', zIndex: 0,
            }} />

            {/* Ligne orange animée */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '28px', left: 'calc(100% / 6)', right: 'calc(100% / 6)',
                height: '2px',
                background: `linear-gradient(90deg, ${ORANGE} 0%, #E8611A 100%)`,
                zIndex: 0, transformOrigin: 'left center',
              }}
            />

            {/* Cercles */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', position: 'relative', zIndex: 1 }}>
              {PILLARS.map(({ num }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.15 }}
                  className="flex justify-center"
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: '#FFFFFF',
                    border: `2px solid ${ORANGE}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 0 6px ${ORANGE_BG}, var(--shadow-sm)`,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontWeight: 800,
                      fontSize: '18px', color: ORANGE, lineHeight: 1,
                    }}>
                      {num}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <motion.div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {PILLARS.map(({ num, titre, texte }) => (
              <motion.div
                key={num}
                variants={gridChild}
                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
                transition={{ duration: 0.25 }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderTop: `3px solid ${ORANGE}`,
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Label */}
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  color: ORANGE, letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  Étape {num}
                </div>

                {/* Titre */}
                <h3
                  className="font-heading font-bold text-[--text-primary]"
                  style={{ fontSize: '20px', marginBottom: '8px', lineHeight: 1.3 }}
                >
                  {titre}
                </h3>

                {/* Texte */}
                <p
                  className="font-body text-[--text-secondary]"
                  style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6, textAlign: 'justify' }}
                >
                  {texte}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ MOBILE (< sm) — roadmap vertical ══ */}
        <div className="sm:hidden" style={{ position: 'relative' }}>

          {/* Ligne verticale de fond */}
          <div style={{
            position: 'absolute',
            top: '28px', bottom: '28px', left: '27px',
            width: '2px', background: '#E2E8F0', zIndex: 0,
          }} />

          {/* Ligne orange animée */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '28px', bottom: '28px', left: '27px',
              width: '2px', background: ORANGE,
              zIndex: 0, transformOrigin: 'top center',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {PILLARS.map(({ num, titre, texte }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.12 }}
                className="flex items-start"
                style={{ gap: '20px', position: 'relative', zIndex: 1 }}
              >
                {/* Cercle */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                  background: '#FFFFFF',
                  border: `2px solid ${ORANGE}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 0 6px ${ORANGE_BG}, var(--shadow-sm)`,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: '18px', color: ORANGE, lineHeight: 1,
                  }}>
                    {num}
                  </span>
                </div>

                {/* Contenu */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 10px 32px rgba(27,42,74,0.11), 0 2px 8px rgba(27,42,74,0.06)' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderLeft: `3px solid ${ORANGE}`,
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    marginTop: '4px',
                  }}>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                    color: ORANGE, letterSpacing: '0.06em',
                    textTransform: 'uppercase', marginBottom: '6px',
                  }}>
                    Étape {num}
                  </div>
                  <h3
                    className="font-heading font-bold text-[--text-primary]"
                    style={{ fontSize: '20px', marginBottom: '8px', lineHeight: 1.3 }}
                  >
                    {titre}
                  </h3>
                  <p
                    className="font-body text-[--text-secondary]"
                    style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6, textAlign: 'justify' }}
                  >
                    {texte}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
