// components/sections/section-header.tsx
// CLAUDE.md v3.1 — Composant header de section réutilisable
// Usage : <SectionHeader eyebrow="..." title="..." description="..." align="center" />

import { cn } from '@/lib/utils/cn'

interface SectionHeaderProps {
  /** Label au-dessus du titre — uppercase orange */
  eyebrow?:     string
  /** Titre principal H2 */
  title:        string
  /** Sous-titre optionnel */
  description?: string
  /** Alignement du bloc */
  align?:       'left' | 'center'
  /** Classes supplémentaires */
  className?:   string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center max-w-2xl mx-auto',
        align === 'left'   && 'text-left max-w-2xl',
        className,
      )}
    >
      {/* Eyebrow — token text-eyebrow */}
      {eyebrow && (
        <p className="text-eyebrow mb-3">
          {eyebrow}
        </p>
      )}

      {/* H2 — token text-h2 avec clamp() */}
      <h2
        className="font-heading font-bold text-[--text-primary]"
        style={{
          fontSize:   'clamp(1.5rem, 3vw, 2.25rem)',
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-4 text-base text-[--text-secondary] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
