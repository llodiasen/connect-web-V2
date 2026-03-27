// components/ui/service-card.tsx
// Source : CONTENT.md > Home > Section Services
// CLAUDE.md v3.1 — Cards pattern : flex flex-col h-full + mt-auto + hover Framer

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ── Types ──────────────────────────────────────────────────────────────────
export type ServiceBadge = 'POPULAIRE' | 'NOUVEAU' | 'BONUS'

export interface ServiceCardProps {
  /** Icône Lucide ou composant SVG */
  icon:        React.ReactNode
  /** Titre du service */
  title:       string
  /** Description courte (2–3 phrases max) */
  description: string
  /** URL de la page service */
  href:        string
  /** Badge optionnel */
  badge?:      ServiceBadge
  /** Index pour le stagger d'animation */
  index?:      number
}

// ── Couleurs de badge ─────────────────────────────────────────────────────
const badgeStyles: Record<ServiceBadge, string> = {
  POPULAIRE: 'bg-[--color-orange-500] text-white',
  NOUVEAU:   'bg-[--color-info] text-white',
  BONUS:     'bg-[--color-success] text-white',
}

// ── Composant ─────────────────────────────────────────────────────────────
export function ServiceCard({
  icon,
  title,
  description,
  href,
  badge,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      // ── Entrée animée avec stagger ──
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      // ── Hover : scale + translateY + glow (CLAUDE.md) ──
      whileHover={{ scale: 1.03, y: -4 }}
      className={cn(
        // Structure — hauteur uniforme obligatoire
        'flex flex-col h-full',
        // Apparence — tokens CLAUDE.md
        'bg-white border border-[--border-default]',
        'rounded-lg',
        'shadow-sm',
        'p-7',                          // 28px padding interne
        // Transition
        'transition-shadow transition-colors duration-200',
        'hover:border-orange-200',
        'hover:shadow-glow',
      )}
    >
      {/* ── Badge (optionnel) ── */}
      {badge && (
        <span className={cn(
          'self-start mb-3 px-2 py-0.5 rounded-full',
          'text-[10px] font-bold uppercase tracking-wider',
          badgeStyles[badge],
        )}>
          {badge}
        </span>
      )}

      {/* ── Icône ── */}
      <div className="card-icon mb-4 !w-11 !h-11">
        {icon}
      </div>

      {/* ── Titre H3 — clamp() ── */}
      <h3 className={cn(
        'font-heading font-semibold text-[--text-primary] mb-2.5',
        'text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.35]',
      )}>
        {title}
      </h3>

      {/* ── Description — flex-grow pour pousser le CTA en bas ── */}
      <p className="text-sm text-[--text-secondary] leading-relaxed flex-grow">
        {description}
      </p>

      {/* ── CTA — mt-auto ancre en bas quelle que soit la hauteur ── */}
      <Link
        href={href}
        className={cn(
          'mt-4 inline-flex items-center gap-1.5',
          'text-sm font-medium text-[--color-orange-500]',
          'hover:gap-2.5 transition-all duration-200',
          'group',
        )}
        aria-label={`En savoir plus sur ${title}`}
      >
        En savoir plus
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}
