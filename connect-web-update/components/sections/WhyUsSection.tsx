// components/sections/WhyUsSection.tsx
// Source : CONTENT.md > Home > Section 05 — Pourquoi Nous
// CLAUDE.md v3.1 — section-alt (bg-#F7F8FA) — grille 2×2 (4 cards obligatoires)

'use client'

import { motion } from 'framer-motion'
import { Code2, Target, Clock, HeartHandshake } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────
// Source : CONTENT.md
const ARGUMENTS = [
  {
    icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
    title: 'Expertise technique',
    description:
      'Stack moderne, code propre, performances optimisées. On livre des solutions fiables et évolutives qui tiennent dans la durée.',
  },
  {
    icon: <Target className="w-5 h-5" aria-hidden="true" />,
    title: 'Design orienté conversion',
    description:
      'Un parcours pensé pour transformer visiteurs en clients. Chaque interface est conçue pour guider, convaincre et convertir.',
  },
  {
    icon: <Clock className="w-5 h-5" aria-hidden="true" />,
    title: 'Délais respectés',
    description:
      'Un planning clair dès le départ, des livrables à chaque étape. Vous savez toujours où en est votre projet.',
  },
  {
    icon: <HeartHandshake className="w-5 h-5" aria-hidden="true" />,
    title: 'Accompagnement dédié',
    description:
      'Un interlocuteur unique du brief à la mise en ligne. Support WhatsApp réactif, formation incluse à la livraison.',
  },
]

// ── Variants ──────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, delay, ease: 'easeOut' },
})

// ── Composant ─────────────────────────────────────────────────────────────
export function WhyUsSection() {
  return (
    <section className="section-alt" id="pourquoi-nous">
      <div className="container">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="section-header center">
          <p className="text-eyebrow">POURQUOI NOUS CHOISIR</p>
          <h2 className="text-h2 font-heading mt-2 mb-4">
            Ce qui nous distingue
          </h2>
          <p className="text-body max-w-lg mx-auto">
            Une agence jeune et dynamique qui comprend votre marché, vos
            contraintes et vos ambitions.
          </p>
        </motion.div>

        {/* ── Grille 2×2 — 4 arguments obligatoires ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARGUMENTS.map((arg, i) => (
            <motion.div
              key={arg.title}
              {...fadeUp(0.1 + i * 0.08)}
              className="flex gap-4 p-6 bg-white border border-[--border-default]
                         rounded-lg shadow-sm
                         hover:border-orange-200 hover:shadow-glow
                         transition-all duration-200"
            >
              {/* Icône */}
              <div className="card-icon shrink-0">
                {arg.icon}
              </div>

              {/* Texte */}
              <div>
                <h3 className="font-heading font-semibold text-[--text-primary] mb-1.5"
                    style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: 1.35 }}>
                  {arg.title}
                </h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">
                  {arg.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
