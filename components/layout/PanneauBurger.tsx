'use client'

// Source   : prompt Navbar — PanneauBurger
// Slide-in droite : 380px desktop / 100vw mobile
// Focus trap + Escape + overlay + scroll lock

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight, Linkedin, Instagram } from 'lucide-react'

const EASE: [number, number, number, number] = [0.4, 0.0, 0.2, 1.0]

/* ── Données ───────────────────────────────────────────────── */
const SERVICES = [
  { label: 'Développement Web',    href: '/services/developpement-web'    },
  { label: 'Développement Mobile', href: '/services/developpement-mobile' },
  { label: 'E-commerce',           href: '/services/sites-ecommerce'      },
  { label: 'Mobile Banking',       href: '/services/mobile-banking', badge: 'Beta' },
  { label: 'UI/UX Design',         href: '/services/design'               },
  { label: 'Consulting Tech',      href: '/services/consulting'           },
]

const ENTREPRISE = [
  { label: 'Portfolio',  href: '/portfolio'  },
  { label: 'Tarifs',     href: '/tarifs'     },
  { label: 'Blog',       href: '/blog'       },
  { label: 'À propos',   href: '/a-propos'   },
  { label: 'Contact',    href: '/contact'    },
]

const LEGAL = [
  { label: 'Politique de confidentialité', href: '/confidentialite'    },
  { label: 'Mentions légales',             href: '/mentions-legales'   },
  { label: 'CGU',                          href: '/cgu'                },
  { label: 'CGV',                          href: '/cgv'                },
  { label: 'Cookies',                      href: '/cookies'            },
]

/* ── Focus trap ─────────────────────────────────────────────── */
function useFocusTrap(containerRef: React.RefObject<HTMLDivElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return
    const container = containerRef.current
    const SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(SELECTOR))
    if (!focusable.length) return
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    // Focus initial
    requestAnimationFrame(() => first.focus())
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }
    container.addEventListener('keydown', handleTab)
    return () => container.removeEventListener('keydown', handleTab)
  }, [isActive, containerRef])
}

/* ── Lien panneau (services & entreprise) ───────────────────── */
function PanneauLink({
  href, children, badge, onClose,
}: {
  href: string; children: React.ReactNode; badge?: string; onClose: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 0', borderBottom: '1px solid #f1f3f5',
        fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px',
        color: '#4A5568', textDecoration: 'none',
        transition: 'color 150ms ease, padding-left 150ms ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#1a1a2e'; e.currentTarget.style.paddingLeft = '4px' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#4A5568'; e.currentTarget.style.paddingLeft = '0'  }}
    >
      {children}
      {badge && (
        <span style={{
          background: 'rgba(232,89,60,0.12)', color: '#E8593C',
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px',
        }}>
          {badge}
        </span>
      )}
    </Link>
  )
}

/* ── Section label ──────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8',
      marginBottom: '4px',
    }}>
      {children}
    </p>
  )
}

/* ── Composant principal ───────────────────────────────────── */
export interface PanneauBurgerProps {
  isOpen: boolean
  onClose: () => void
}

export function PanneauBurger({ isOpen, onClose }: PanneauBurgerProps) {
  const [lang, setLang]       = useState<'FR' | 'EN'>('FR')
  const [ctaHovered, setCtaH] = useState(false)
  const panelRef              = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen)

  /* Escape */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [isOpen, onClose])

  /* Scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSocialHover = useCallback((e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const svg = e.currentTarget.querySelector('svg') as SVGElement | null
    if (svg) svg.style.color = enter ? '#E8593C' : '#94A3B8'
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay ── */}
          <motion.div
            key="burger-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99 }}
          />

          {/* ── Panneau ── */}
          <motion.div
            key="burger-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(380px, 100vw)',
              background: '#ffffff',
              zIndex: 100,
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Header panneau */}
            <div
              className="flex items-center justify-between"
              style={{ padding: '20px 24px', borderBottom: '1px solid #DDE3EE', flexShrink: 0 }}
            >
              <Link href="/" onClick={onClose} aria-label="Connect Web — Accueil">
                <Image
                  src="/logo.webp"
                  alt="Connect Web"
                  width={120} height={36}
                  style={{ height: '36px', width: 'auto', display: 'block' }}
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[#f8f9fa] focus-visible:outline-none"
                style={{ width: '36px', height: '36px', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} style={{ color: '#4A5568' }} aria-hidden="true" />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>

              {/* SERVICES */}
              <SectionLabel>Services</SectionLabel>
              <div style={{ marginBottom: '28px' }}>
                {SERVICES.map(({ label, href, badge }) => (
                  <PanneauLink key={href} href={href} badge={badge} onClose={onClose}>
                    {label}
                  </PanneauLink>
                ))}
              </div>

              {/* ENTREPRISE */}
              <SectionLabel>Entreprise</SectionLabel>
              <div style={{ marginBottom: '28px' }}>
                {ENTREPRISE.map(({ label, href }) => (
                  <PanneauLink key={href} href={href} onClose={onClose}>
                    {label}
                  </PanneauLink>
                ))}
              </div>

              {/* LÉGAL */}
              <SectionLabel>Légal</SectionLabel>
              <div>
                {LEGAL.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    style={{
                      display: 'block', padding: '6px 0',
                      fontFamily: 'var(--font-body)', fontSize: '12px',
                      color: '#94A3B8', textDecoration: 'none',
                      transition: 'color 150ms ease, padding-left 150ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1a1a2e'; e.currentTarget.style.paddingLeft = '4px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.paddingLeft = '0'  }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer panneau */}
            <div style={{ padding: '0 24px 28px', flexShrink: 0, borderTop: '1px solid #f1f3f5' }}>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center w-full font-bold"
                style={{
                  height: '48px', borderRadius: '10px', margin: '20px 0 16px',
                  background: ctaHovered ? '#C9501E' : '#E8622A',
                  color: '#ffffff', fontFamily: 'var(--font-body)',
                  fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                  gap: '8px', transition: 'all 0.2s ease',
                  transform: ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: ctaHovered ? '0 4px 12px rgba(232,98,42,0.30)' : 'none',
                }}
                onMouseEnter={() => setCtaH(true)}
                onMouseLeave={() => setCtaH(false)}
              >
                Démarrer un projet
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              {/* Langue + réseaux */}
              <div className="flex items-center justify-between">

                {/* Toggle FR / EN */}
                <div className="flex items-center" style={{ gap: '2px' }}>
                  {(['FR', 'EN'] as const).map(code => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      style={{
                        padding: '4px 12px', borderRadius: '6px',
                        border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                        background: lang === code ? '#1a1a2e' : 'transparent',
                        color:      lang === code ? '#ffffff' : '#94A3B8',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {code}
                    </button>
                  ))}
                </div>

                {/* Réseaux sociaux */}
                <div className="flex items-center" style={{ gap: '14px' }}>
                  <a
                    href="https://linkedin.com/company/connect-web"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn Connect Web"
                    onMouseEnter={e => handleSocialHover(e, true)}
                    onMouseLeave={e => handleSocialHover(e, false)}
                  >
                    <Linkedin size={18} style={{ color: '#94A3B8', transition: 'color 150ms ease', display: 'block' }} aria-hidden="true" />
                  </a>
                  <a
                    href="https://instagram.com/connectweb"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Instagram Connect Web"
                    onMouseEnter={e => handleSocialHover(e, true)}
                    onMouseLeave={e => handleSocialHover(e, false)}
                  >
                    <Instagram size={18} style={{ color: '#94A3B8', transition: 'color 150ms ease', display: 'block' }} aria-hidden="true" />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
