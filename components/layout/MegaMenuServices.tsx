'use client'

// MegaMenuServices — 4 colonnes × 16 pages
// Trigger : clic "Services" — slide-down 200ms
// Width   : 960px centré

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const EASE: [number, number, number, number] = [0.0, 0.0, 0.2, 1.0]

/* ── Données — 16 pages ────────────────────────────────────── */
const COLUMNS = [
  {
    label: 'Développement',
    items: [
      { label: 'Développement Web',      href: '/services/developpement-web'    },
      { label: 'Développement Mobile',   href: '/services/developpement-mobile' },
      { label: 'Applications Web',       href: '/services/applications-web'     },
      { label: 'Applications Mobile',    href: '/services/applications-mobile'  },
      { label: 'Logiciels SaaS',         href: '/services/logiciels-saas'       },
    ],
  },
  {
    label: 'E-commerce',
    items: [
      { label: 'Sites E-commerce',       href: '/services/sites-ecommerce'       },
      { label: 'Boutique Shopify',        href: '/services/boutique-shopify'      },
      { label: 'Boutique WooCommerce',    href: '/services/boutique-woocommerce'  },
      { label: 'Marketplace',             href: '/services/marketplace'           },
    ],
  },
  {
    label: 'Intégration',
    items: [
      { label: 'Intégration ERP',         href: '/services/integration-erp'      },
      { label: 'Intégration CRM',         href: '/services/integration-crm'      },
      { label: 'Email Marketing',         href: '/services/email-marketing'      },
      { label: 'Architecture & API',      href: '/services/architecture-api'     },
    ],
  },
  {
    label: 'Web & Produit',
    items: [
      { label: 'Sites Vitrine',           href: '/services/sites-vitrine'        },
      { label: 'Carte NFC',               href: '/services/carte-visite-nfc'     },
      { label: 'Landing Pages',           href: '/services/landing-pages'        },
    ],
  },
]

/* ── Lien individuel ────────────────────────────────────────── */
function MenuItem({ label, href, onClose }: { label: string; href: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: 'block',
        padding: '7px 10px',
        borderRadius: '7px',
        fontFamily: 'var(--font-heading)',
        fontWeight: 500,
        fontSize: '13.5px',
        color: '#4A5568',
        textDecoration: 'none',
        transition: 'background 130ms ease, color 130ms ease, padding-left 130ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#f4f6fa'
        e.currentTarget.style.color = '#1a1a2e'
        e.currentTarget.style.paddingLeft = '14px'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = '#4A5568'
        e.currentTarget.style.paddingLeft = '10px'
      }}
    >
      {label}
    </Link>
  )
}

/* ── Composant principal ───────────────────────────────────── */
export function MegaMenuServices({ onClose }: { onClose: () => void }) {
  const [ctaHovered, setCtaHovered] = useState(false)

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
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* ── Corps 4 colonnes ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '20px 16px 16px',
          gap: '0',
        }}
      >
        {COLUMNS.map((col, i) => (
          <div
            key={col.label}
            style={{
              borderRight: i < COLUMNS.length - 1 ? '1px solid #f1f3f5' : 'none',
              paddingRight: i < COLUMNS.length - 1 ? '8px' : '0',
              paddingLeft: i > 0 ? '8px' : '0',
            }}
          >
            {/* En-tête colonne */}
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#E8593C',
              padding: '0 10px 10px',
              margin: 0,
            }}>
              {col.label}
            </p>

            {/* Liens */}
            {col.items.map(item => (
              <MenuItem key={item.href} label={item.label} href={item.href} onClose={onClose} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#f8f9fa', borderTop: '1px solid #DDE3EE',
          padding: '12px 24px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#94A3B8' }}>
          Vous ne savez pas par où commencer ?
        </span>
        <Link
          href="/contact"
          onClick={onClose}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 16px', borderRadius: '8px',
            background: ctaHovered ? '#d44e34' : '#E8593C',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none',
            transform: ctaHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'background 150ms ease, transform 150ms ease',
          }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          Estimation gratuite
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}
