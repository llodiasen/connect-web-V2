// components/sections/HeroSection.tsx
// Source : CONTENT.md > Home > Section 02 — Hero
// CLAUDE.md v3.1 — hero-bg (bg-white + radial orange 7%) — ⛔ PAS de fond dark

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react'

// ── Variants d'animation ──────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

// ── Composant ─────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="hero-bg min-h-[90vh] flex items-center" id="hero">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Colonne gauche : texte ── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-eyebrow mb-4"
            >
              ✦ Agence digitale · Dakar, Sénégal
            </motion.p>

            {/* H1 Display */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-heading font-extrabold text-[--text-primary] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Créez des{' '}
              <span className="text-gradient">Expériences Digitales</span>{' '}
              Qui Génèrent des Résultats Mesurables
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-body text-[--text-secondary] text-lg mb-8 max-w-lg"
            >
              Connect Web transforme vos idées en produits digitaux performants —
              sites web, applications mobiles et logiciels sur mesure pour les
              entreprises sénégalaises et l'Afrique de l'Ouest.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link href="/contact" className="btn btn-primary btn-lg">
                Démarrer mon projet
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-lg">
                Voir nos réalisations
              </Link>
            </motion.div>

            {/* Badges de réassurance */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-wrap gap-4"
            >
              {[
                '+50 projets livrés',
                '+3 ans d'expérience',
                'Support WhatsApp',
              ].map(item => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-[--text-tertiary]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[--color-orange-500] shrink-0" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Colonne droite : Terminal VS Code Light ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            {/* Window chrome */}
            <div className="code-block relative overflow-hidden">

              {/* Barre de titre */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[--border-default]">
                {/* Dots */}
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 text-xs text-[--text-tertiary] font-mono">
                  connect-web / projet.ts
                </span>
              </div>

              {/* Code — VS Code Light theme */}
              <pre className="font-mono text-sm leading-[1.7] text-[--text-primary] overflow-x-auto">
                <code>
                  <span className="token-keyword">const</span>
                  <span className="text-[--text-primary]"> projet </span>
                  <span className="text-[--text-secondary]">= {'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="token-property">client</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-string">"Votre entreprise"</span>
                  <span className="text-[--text-secondary]">,</span>
                  {'\n'}
                  {'  '}
                  <span className="token-property">service</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-string">"Sur mesure"</span>
                  <span className="text-[--text-secondary]">,</span>
                  {'\n'}
                  {'  '}
                  <span className="token-property">délai</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-string">"2-3 semaines"</span>
                  <span className="text-[--text-secondary]">,</span>
                  {'\n'}
                  {'  '}
                  <span className="token-property">stack</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-string">"Next.js + Sanity"</span>
                  <span className="text-[--text-secondary]">,</span>
                  {'\n'}
                  {'  '}
                  <span className="token-property">résultat</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-string">"🔥 Live & Optimisé"</span>
                  <span className="text-[--text-secondary]">,</span>
                  {'\n'}
                  <span className="text-[--text-secondary]">{'}'}</span>
                  {'\n'}
                  {'\n'}
                  <span className="token-comment">// Scores Lighthouse</span>
                  {'\n'}
                  <span className="token-property">performance</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-number">98</span>
                  <span className="text-[--text-secondary]"> / 100,</span>
                  {'\n'}
                  <span className="token-property">accessibility</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-number">100</span>
                  <span className="text-[--text-secondary]"> / 100,</span>
                  {'\n'}
                  <span className="token-property">seo</span>
                  <span className="text-[--text-secondary]">: </span>
                  <span className="token-number">100</span>
                  <span className="text-[--text-secondary]"> / 100,</span>
                </code>
              </pre>

              {/* Status bar */}
              <div className="mt-4 pt-3 border-t border-[--border-default] flex items-center justify-between">
                <span className="text-xs text-[--text-tertiary] font-mono">TypeScript · UTF-8</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-[--color-success]">
                  <span className="w-2 h-2 rounded-full bg-[--color-success]" />
                  Build passing
                </span>
              </div>
            </div>

            {/* Label sous le terminal */}
            <p className="mt-3 text-center text-xs text-[--text-tertiary]">
              Un projet type · Livré en 2 semaines
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
