'use client'

import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────────── */
export interface DeliveryItem {
  icon: LucideIcon
  iconColor: 'navy' | 'orange' | 'green' | 'blue'
  titre: string
  description: string
  badge: string
  badgeColor: 'navy' | 'orange' | 'green' | 'blue'
  featured?: boolean
}

interface DeliveriesSectionProps {
  items: DeliveryItem[]
  /** true = rendu grid seul, sans wrapper <section> ni <header> (usage dans tabs) */
  asGrid?: boolean
}

/* ─────────────────────────────────────────────────────────────────
   Style maps
   ───────────────────────────────────────────────────────────────── */
const ICON_STYLES: Record<DeliveryItem['iconColor'], { background: string; color: string }> = {
  navy:   { background: '#EEF2FF', color: '#1B2A4A' },
  orange: { background: '#FFF4EE', color: '#E8611A' },
  green:  { background: '#F0FDF4', color: '#16A34A' },
  blue:   { background: '#EFF6FF', color: '#2563EB' },
}

const BADGE_STYLES: Record<DeliveryItem['badgeColor'], { background: string; color: string }> = {
  navy:   { background: '#EEF2FF', color: '#1B2A4A' },
  orange: { background: '#FFF4EE', color: '#C2410C' },
  green:  { background: '#F0FDF4', color: '#15803D' },
  blue:   { background: '#EFF6FF', color: '#1D4ED8' },
}

const VIEWPORT = { once: true }

/* ─────────────────────────────────────────────────────────────────
   Composant
   ───────────────────────────────────────────────────────────────── */
export default function DeliveriesSection({ items, asGrid }: DeliveriesSectionProps) {
  const grid = (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      style={{ gap: '12px', marginTop: asGrid ? '0' : '48px' }}
    >
      {items.map((item, i) => {
        const Icon      = item.icon
        const iconStyle = ICON_STYLES[item.iconColor]
        const badgeStyle = BADGE_STYLES[item.badgeColor]

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2, borderColor: '#1B2A4A' }}
            style={{
              background:   'white',
              borderStyle:  'solid',
              borderWidth:  item.featured ? '1.5px' : '0.5px',
              borderColor:  item.featured ? '#E8611A' : '#E5E7EB',
              borderRadius: '14px',
              padding:      '20px',
              display:      'flex',
              flexDirection:'column',
              gap:          '14px',
              cursor:       'default',
            }}
          >
            {/* card-top : icône + titre */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

              {/* Icône wrapper */}
              <div style={{
                background:     iconStyle.background,
                width:          '40px',
                height:         '40px',
                borderRadius:   '10px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}>
                <Icon size={18} color={iconStyle.color} aria-hidden="true" />
              </div>

              {/* Titre */}
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize:   'var(--card-title-size)',
                fontWeight: 700,
                color:      '#111827',
                lineHeight: 1.3,
              }}>
                {item.titre}
              </p>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
              color:      '#374151',
              lineHeight: 1.6,
            }}>
              {item.description}
            </p>

            {/* Badge */}
            <span style={{
              background:   badgeStyle.background,
              color:        badgeStyle.color,
              fontSize:     '10px',
              fontWeight:   500,
              padding:      '3px 8px',
              borderRadius: '20px',
              width:        'fit-content',
              display:      'inline-flex',
            }}>
              {item.badge}
            </span>

          </motion.div>
        )
      })}
    </div>
  )

  if (asGrid) return grid

  return (
    <section className="section-base">
      <div className="container">

        {/* En-tête centré */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color:         'var(--color-orange-500)',
            marginBottom:  '12px',
            fontWeight:    600,
          }}>
            NOTRE OFFRE
          </p>
          <h2 style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      'clamp(1.375rem, 2.5vw, 1.875rem)',
            lineHeight:    1.2,
            letterSpacing: '-0.02em',
            color:         '#111827',
          }}>
            Ce que vous obtenez
          </h2>
        </div>

        {grid}

      </div>
    </section>
  )
}
