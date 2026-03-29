'use client'

// Navbar v3 — flex pur (xl:grid supprimé, motion(Link) supprimé)
// Layout : [Logo  flex:1] | [nav hidden xl:flex] | [actions flex:1 justify-end]
// Hauteur : 72px → 64px au scroll (300ms)

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { MegaMenuServices }   from './MegaMenuServices'
import { MegaMenuEntreprise } from './MegaMenuEntreprise'
import { PanneauBurger }      from './PanneauBurger'

type MenuKey = 'services' | 'entreprise'
const EASE: [number, number, number, number] = [0.0, 0.0, 0.2, 1.0]

/* ── useScrolled ─────────────────────────────────────────────── */
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])
  return scrolled
}

/* ── Drapeaux SVG inline (emoji non fiables sur Windows) ────── */
function FlagFR() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ borderRadius: '2px', flexShrink: 0 }}>
      <rect width="20" height="14" fill="#ED2939" />
      <rect width="13.4" height="14" fill="#fff" />
      <rect width="6.7" height="14" fill="#002395" />
    </svg>
  )
}
function FlagEN() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" style={{ borderRadius: '2px', flexShrink: 0 }}>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4.8" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7.2" />
    </svg>
  )
}

/* ── LangSwitcher ───────────────────────────────────────────── */
const LANGS: { code: 'FR' | 'EN'; Flag: () => React.JSX.Element; label: string }[] = [
  { code: 'FR', Flag: FlagFR, label: 'Français' },
  { code: 'EN', Flag: FlagEN, label: 'English'  },
]

function LangSwitcher() {
  const [lang, setLang] = useState<'FR' | 'EN'>('FR')
  const [open, setOpen] = useState(false)
  const ref             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const current = LANGS.find(l => l.code === lang)!
  const CurrentFlag = current.Flag

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Sélectionner la langue"
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '0 10px', height: '36px',
          background: open ? '#f4f6fa' : 'transparent',
          border: `1px solid ${open ? '#DDE3EE' : 'transparent'}`,
          borderRadius: '8px', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
          color: open ? '#1a1a2e' : '#4A5568',
          transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#f4f6fa'
          e.currentTarget.style.borderColor = '#DDE3EE'
          e.currentTarget.style.color = '#1a1a2e'
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.color = '#4A5568'
          }
        }}
      >
        <CurrentFlag />
        {lang}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: EASE }}
          style={{ display: 'flex' }}
        >
          <ChevronDown size={12} strokeWidth={2.5} style={{ color: '#94A3B8' }} aria-hidden="true" />
        </motion.span>
      </button>

      {/* ── Dropdown — aligné bord droit du trigger, pas de débordement ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lang-drop"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE }}
            role="listbox"
            aria-label="Langues disponibles"
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: '100px',
              background: '#ffffff',
              border: '1px solid #DDE3EE',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
              padding: '6px',
              zIndex: 200,
            }}
          >
            {LANGS.map(({ code, Flag, label }) => (
              <button
                key={code}
                role="option"
                aria-selected={lang === code}
                onClick={() => { setLang(code); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  width: '100%', padding: '8px 10px',
                  borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  fontWeight: lang === code ? 700 : 500,
                  color:      lang === code ? '#1a1a2e' : '#4A5568',
                  background: lang === code ? '#f4f6fa' : 'transparent',
                  transition: 'background 100ms ease, color 100ms ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => {
                  if (lang !== code) {
                    e.currentTarget.style.background = '#f8f9fa'
                    e.currentTarget.style.color = '#1a1a2e'
                  }
                }}
                onMouseLeave={e => {
                  if (lang !== code) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#4A5568'
                  }
                }}
              >
                <Flag />
                {code}
                {lang === code && (
                  <span style={{
                    marginLeft: 'auto', width: '6px', height: '6px',
                    borderRadius: '50%', background: '#E8593C', flexShrink: 0,
                  }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── CTAButton ───────────────────────────────────────────────── */
function CTAButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href="/contact"
      aria-label="Démarrer un projet avec Connect Web"
      style={{
        display: 'inline-flex', alignItems: 'center',
        height: '40px', padding: '0 20px', gap: '6px',
        background:   hovered ? '#243659' : '#1B2B4B',
        color:        '#ffffff',
        border:       'none',
        borderRadius: '8px',
        fontFamily:   'var(--font-heading)', fontSize: '13px', fontWeight: 600,
        textDecoration: 'none', whiteSpace: 'nowrap',
        transform:    hovered ? 'translateY(-1px)' : 'translateY(0)',
        transition:   'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Lancer mon projet →
    </Link>
  )
}

/* ── BurgerButton ────────────────────────────────────────────── */
function BurgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '40px', height: '40px',
        background: 'transparent', border: 'none', cursor: 'pointer',
        borderRadius: '8px', transition: 'background 150ms ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#f8f9fa' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span key="x"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{ rotate: 90,    opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={20} style={{ color: '#1a1a2e', display: 'block' }} aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span key="menu"
            initial={{ rotate: 90,  opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{ rotate: -90,   opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={20} style={{ color: '#1a1a2e', display: 'block' }} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ── NavLink simple ──────────────────────────────────────────── */
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        style={{
          display: 'flex', alignItems: 'center',
          padding: '0 10px', height: '100%',
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
          color: isActive || hovered ? '#1B2B4B' : '#1B2B4B',
          textDecoration: 'none', transition: 'color 150ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Link>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: '10px', right: '10px',
          height: '2px', background: '#E8593C', transformOrigin: 'left center',
        }}
        animate={{ scaleX: hovered || isActive ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ── NavItemMenu (avec mega-menu) ────────────────────────────── */
function NavItemMenu({
  label, isActive, isOpen, onToggle,
}: {
  label: string; isActive: boolean; isOpen: boolean; onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          display: 'flex', alignItems: 'center', gap: '3px',
          padding: '0 10px', height: '100%',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
          color: isActive || isOpen || hovered ? '#1B2B4B' : '#1B2B4B',
          transition: 'color 150ms ease', whiteSpace: 'nowrap',
        }}
      >
        {label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18, ease: EASE }}
          style={{ display: 'flex' }}
        >
          <ChevronDown
            size={12} strokeWidth={2.5}
            style={{ color: isOpen ? '#E8593C' : '#94A3B8', transition: 'color 150ms ease' }}
            aria-hidden="true"
          />
        </motion.span>
      </button>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: '10px', right: '10px',
          height: '2px', background: '#E8593C', transformOrigin: 'left center',
        }}
        animate={{ scaleX: hovered || isActive || isOpen ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ── Navbar ──────────────────────────────────────────────────── */
export function Navbar() {
  const pathname     = usePathname()
  const scrolled     = useScrolled()
  const [openMenu,   setOpenMenu]   = useState<MenuKey | null>(null)
  const [burgerOpen, setBurgerOpen] = useState(false)

  const closeMenu   = useCallback(() => setOpenMenu(null), [])
  const closeBurger = useCallback(() => setBurgerOpen(false), [])

  const isActive = useCallback((href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href), [pathname])

  const isMenuActive = useCallback((key: MenuKey) => {
    if (key === 'services')   return pathname.startsWith('/services')
    if (key === 'entreprise') return pathname.startsWith('/a-propos') || pathname.startsWith('/blog') || pathname.startsWith('/temoignages')
    return false
  }, [pathname])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenMenu(null); setBurgerOpen(false) }
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  useEffect(() => { setOpenMenu(null); setBurgerOpen(false) }, [pathname])

  const handleBurgerToggle = () => { setOpenMenu(null); setBurgerOpen(v => !v) }
  const handleMenuToggle   = (key: MenuKey) => {
    setBurgerOpen(false)
    setOpenMenu(p => p === key ? null : key)
  }

  const navHeight     = scrolled ? '64px' : '72px'
  const menuTop       = `calc(var(--topbar-height) + ${navHeight})`

  return (
    <>
      {/* ══ HEADER ════════════════════════════════════════════ */}
      <header
        className="fixed left-0 right-0 z-[60]"
        style={{
          top:             'var(--topbar-height)',
          height:          navHeight,
          backgroundColor: '#ffffff',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          borderBottom:    scrolled ? '1px solid #DDE3EE' : '1px solid transparent',
          boxShadow:       scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition:      'height 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
        }}
      >
        {/* ── Conteneur interne ── */}
        <div
          style={{
            display: 'flex', alignItems: 'center',
            height: '100%', maxWidth: '1280px',
            margin: '0 auto', paddingInline: '32px',
          }}
        >
          {/* ── GAUCHE : Logo (flex:1 pour pousser la nav au centre) ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Link
              href="/"
              aria-label="Connect Web — Retour à l'accueil"
              style={{ display: 'flex', alignItems: 'center', outline: 'none' }}
            >
              <Image
                src="/logo.webp" alt="Connect Web"
                width={173} height={52} priority
                style={{ height: '52px', width: 'auto', display: 'block' }}
              />
            </Link>
          </div>

          {/* ── CENTRE : Navigation desktop (caché < xl) ── */}
          <nav
            className="hidden xl:flex"
            role="navigation"
            aria-label="Navigation principale"
            style={{ alignItems: 'center', alignSelf: 'stretch', gap: '4px' }}
          >
            <NavItemMenu
              label="Services"
              isActive={isMenuActive('services')}
              isOpen={openMenu === 'services'}
              onToggle={() => handleMenuToggle('services')}
            />
            <NavLink href="/portfolio"  label="Réalisations" isActive={isActive('/portfolio')} />
            <NavLink href="/offres"     label="Offres"        isActive={isActive('/offres')}    />
            <NavItemMenu
              label="À propos"
              isActive={isMenuActive('entreprise')}
              isOpen={openMenu === 'entreprise'}
              onToggle={() => handleMenuToggle('entreprise')}
            />
            <NavLink href="/contact" label="Contact" isActive={isActive('/contact')} />
          </nav>

          {/* ── DROITE : Actions (flex:1 + justify-end) ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            {/* FR + CTA — desktop uniquement */}
            <div className="hidden xl:flex" style={{ alignItems: 'center', gap: '10px' }}>
              <LangSwitcher />
              <CTAButton />
            </div>
            {/* Burger — toujours visible */}
            <BurgerButton isOpen={burgerOpen} onClick={handleBurgerToggle} />
          </div>
        </div>
      </header>

      {/* ══ OVERLAY fermeture mega-menu ══════════════════════ */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="hidden xl:block fixed inset-0"
            style={{ top: menuTop, zIndex: 55 }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ══ MEGA-MENU SERVICES (760px, centré) ════════════════ */}
      <div
        className="hidden xl:block"
        style={{
          position: 'fixed', top: menuTop, left: '50%',
          transform: 'translateX(-50%)',
          width: '960px', zIndex: 60, paddingTop: '8px',
          pointerEvents: openMenu === 'services' ? 'auto' : 'none',
          transition: 'top 300ms ease',
        }}
      >
        <AnimatePresence>
          {openMenu === 'services' && <MegaMenuServices key="svc" onClose={closeMenu} />}
        </AnimatePresence>
      </div>

      {/* ══ MEGA-MENU ENTREPRISE (320px, centré) ═════════════ */}
      <div
        className="hidden xl:block"
        style={{
          position: 'fixed', top: menuTop, left: '50%',
          transform: 'translateX(-50%)',
          width: '320px', zIndex: 60, paddingTop: '8px',
          pointerEvents: openMenu === 'entreprise' ? 'auto' : 'none',
          transition: 'top 300ms ease',
        }}
      >
        <AnimatePresence>
          {openMenu === 'entreprise' && <MegaMenuEntreprise key="ent" onClose={closeMenu} />}
        </AnimatePresence>
      </div>

      {/* ══ PANNEAU BURGER ════════════════════════════════════ */}
      <PanneauBurger isOpen={burgerOpen} onClose={closeBurger} />
    </>
  )
}
