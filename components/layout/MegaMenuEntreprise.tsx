'use client'

// Source   : prompt Navbar — MegaMenuEntreprise
// Trigger  : clic "À propos" — slide-down 200ms ease-out
// Layout   : 1 colonne simple — max-width 260px

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.0, 0.0, 0.2, 1.0]

const ITEMS = [
  { label: 'Notre histoire', href: '/a-propos'          },
  { label: "L'équipe",       href: '/a-propos#equipe'   },
  { label: 'Blog',           href: '/blog'              },
  { label: 'Témoignages',    href: '/temoignages'       },
]

export function MegaMenuEntreprise({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: EASE }}
      style={{
        background: '#ffffff',
        border: '1px solid #DDE3EE',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        width: '100%',
        padding: '8px',
      }}
    >
      {ITEMS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center',
            padding: '10px 12px', borderRadius: '10px',
            fontFamily: 'var(--font-heading)', fontWeight: 500,
            fontSize: '14px', color: '#1a1a2e', textDecoration: 'none',
            transition: 'background 150ms ease, padding-left 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.paddingLeft = '16px' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '12px' }}
        >
          {label}
        </Link>
      ))}
    </motion.div>
  )
}
