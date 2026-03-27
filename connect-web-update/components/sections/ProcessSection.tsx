// components/sections/ProcessSection.tsx
// Source : CONTENT.md > Home > Section 06 — Notre Méthode
// CLAUDE.md v3.1 — section-base (bg-white) — cercles orange via tokens — ⛔ PAS de fond dark

'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Code2, Rocket } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────
// Source : CONTENT.md
const STEPS = [
  {
    number: '01',
    icon: <Search className="w-5 h-5" aria-hidden="true" />,
    title: 'Découverte & Analyse',
    description:
      'On prend le temps d'intégrer le contexte de votre activité, vos objectifs et l'architecture. Vous réfléchissez, nous écoutons avant d'écrire une seule ligne de code.',
  },
  {
    number: '02',
    icon: <FileText className="w-5 h-5" aria-hidden="true" />,
    title: 'Cahier des charges',
    description:
      'Étude détaillée de votre projet pour élaborer le cahier des charges optimal et la stratégie adaptée.',
  },
  {
    number: '03',
    icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
    title: 'Développement agile',
    description:
      'Développement par sprints avec validation des livrables, réduction des itérations et reporting régulier à chaque étape du projet.',
  },
  {
    number: '04',
    icon: <Rocket className="w-5 h-5" aria-hidden="true" />,
    title: 'Livraison & Suivi',
    description:
      'Mise en ligne, formation de votre équipe et accompagnement continu. On reste là après la livraison.',
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
export function ProcessSection() {
  return (
    <section className="section-base" id="methode">
      <div className="container">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="section-header center">
          <p className="text-eyebrow">NOTRE MÉTHODE</p>
          <h2 className="text-h2 font-heading mt-2 mb-4">
            Notre méthode de travail
          </h2>
          <p className="text-body max-w-lg mx-auto">
            De l'analyse de vos besoins à la livraison finale, une approche
            structurée qui garantit qualité et délais.
          </p>
        </motion.div>

        {/* ── Timeline desktop : horizontal / mobile : vertical ── */}

        {/* Desktop — 4 colonnes avec connecteurs */}
        <div className="hidden md:grid grid-cols-4 gap-0 mt-12 relative">

          {/* Ligne de connexion de fond */}
          <div
            className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 opacity-20"
            style={{ background: 'linear-gradient(to right, var(--color-orange-500), var(--border-default))' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              {...fadeUp(0.1 + i * 0.12)}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Cercle numéroté — tokens CLAUDE.md */}
              <div className="process-step-number mb-4 z-10">
                {step.number}
              </div>

              {/* Icône sous le numéro */}
              <div className="w-10 h-10 flex items-center justify-center
                              rounded-lg bg-orange-50 text-[--color-orange-500]
                              mb-3">
                {step.icon}
              </div>

              {/* Titre */}
              <h3 className="font-heading font-semibold text-[--text-primary] mb-2 text-base">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[--text-secondary] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile — vertical avec ligne gauche */}
        <div className="md:hidden mt-10 space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              {...fadeUp(0.1 + i * 0.1)}
              className="flex gap-4 relative"
            >
              {/* Colonne gauche : numéro + ligne */}
              <div className="flex flex-col items-center">
                <div className="process-step-number shrink-0">
                  {step.number}
                </div>
                {/* Ligne verticale entre étapes (sauf dernier) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="w-0.5 flex-1 mt-2 mb-0"
                    style={{ background: 'linear-gradient(to bottom, var(--color-orange-500), var(--border-default))', opacity: 0.3, minHeight: '2.5rem' }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Contenu */}
              <div className="pb-8">
                <div className="w-8 h-8 flex items-center justify-center
                                rounded-md bg-orange-50 text-[--color-orange-500] mb-2">
                  {step.icon}
                </div>
                <h3 className="font-heading font-semibold text-[--text-primary] mb-1 text-base">
                  {step.title}
                </h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
