'use client'

// Source  : CONTENT.md > Home > Section Hero
// Design  : hero-bg · 3 slides · auto-play 6s · layout 60/40 · mockups JSX illustratifs
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline uniquement

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Zap, Globe, Code2, Smartphone, BarChart3, RefreshCw, Gauge,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────── */
interface Cta   { label: string; href: string }
interface Slide {
  id:         string
  badge:      string
  titre:      string
  accentWord: string
  texte:      string
  cta1:       Cta
  cta2:       Cta
  visualKey:  'browser' | 'code' | 'dashboard'
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Home > Section Hero
   ───────────────────────────────────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    id:         'slide-1',
    badge:      'Connect Web · Agence de développement web',
    titre:      'Des solutions digitales\nsur mesure pour votre\nbusiness.',
    accentWord: 'sur mesure',
    texte:      'Vous avez un projet web, mobile ou un logiciel à construire ? On prend en charge votre projet de A à Z — design, développement, déploiement et support inclus. Dans les délais, sans surprise.',
    cta1:       { label: 'Démarrer mon projet', href: '/contact' },
    cta2:       { label: 'Nos réalisations',    href: '/portfolio' },
    visualKey:  'browser',
  },
  {
    id:         'slide-2',
    badge:      'Développement Web & Mobile',
    titre:      'Confiez-nous\nvotre projet de\ndéveloppement.',
    accentWord: 'développement',
    texte:      'Site web, application mobile ou logiciel sur mesure — on prend en charge votre projet de A à Z. Design, développement, déploiement et support inclus.',
    cta1:       { label: 'Lancer mon projet', href: '/contact?service=developpement-web' },
    cta2:       { label: 'Nos réalisations',  href: '/portfolio' },
    visualKey:  'code',
  },
  {
    id:         'slide-3',
    badge:      'Intégration ERP · CRM · Automatisation',
    titre:      'Vos systèmes connectés.\nVos opérations\nautomatisées.',
    accentWord: 'automatisées',
    texte:      'Vous gérez encore vos opérations manuellement ? On connecte vos outils, centralise vos données et automatise vos processus métiers. Odoo, HubSpot ou API sur mesure.',
    cta1:       { label: 'Automatiser mon business', href: '/contact?service=erp-crm' },
    cta2:       { label: 'Nos intégrations',          href: '/services' },
    visualKey:  'dashboard',
  },
]

const AUTOPLAY_DELAY = 6000
const TOTAL          = SLIDES.length
const EASE           = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   HELPER — splitAccent
   ───────────────────────────────────────────────────────────────── */
function splitAccent(titre: string, accentWord: string): React.ReactNode {
  const idx = titre.toLowerCase().indexOf(accentWord.toLowerCase())
  if (idx === -1) return titre
  return (
    <>
      {titre.slice(0, idx)}
      <span style={{ color: 'var(--color-orange-500)' }}>{titre.slice(idx, idx + accentWord.length)}</span>
      {titre.slice(idx + accentWord.length)}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FloatingPill
   ───────────────────────────────────────────────────────────────── */
function FloatingPill({
  icon: Icon, label, delay, position,
}: {
  icon:     React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>
  label:    string
  delay:    number
  position: React.CSSProperties
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position:       'absolute',
        display:        'flex',
        alignItems:     'center',
        gap:            '8px',
        background:     '#FFFFFF',
        border:         '1px solid #E5E7EB',
        borderRadius:   '9999px',
        padding:        '7px 14px 7px 8px',
        boxShadow:      '0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)',
        zIndex:         10,
        ...position,
      }}
    >
      <div style={{
        width:          '22px',
        height:         '22px',
        borderRadius:   '50%',
        background:     'rgba(232,97,26,0.12)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          'var(--color-orange-500)',
        flexShrink:     0,
      }}>
        <Icon size={12} aria-hidden="true" />
      </div>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '12px',
        fontWeight: 600,
        color:      '#111827',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}>
        {label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VISUEL 1 — BrowserMockup (slide-1 : Solutions digitales)
   ───────────────────────────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      {/* Pills flottantes */}
      <FloatingPill icon={Gauge}  label="Lighthouse 95+"   delay={0}   position={{ top: '-16px', right: '5%' }} />
      <FloatingPill icon={Globe}  label="Next.js 15"        delay={1.2} position={{ bottom: '25%', left: '-20px' }} />
      <FloatingPill icon={Zap}    label="Livraison 3 sem."  delay={2.4} position={{ bottom: '-16px', right: '10%' }} />

      {/* Fenêtre navigateur */}
      <div style={{
        background:   '#161B27',
        border:       '1px solid #1E2535',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Chrome bar */}
        <div style={{
          background:     '#0D1117',
          padding:        '10px 14px',
          display:        'flex',
          alignItems:     'center',
          gap:            '10px',
          borderBottom:   '1px solid #1E2535',
        }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* Address bar */}
          <div style={{
            flex:         1,
            background:   '#161B27',
            border:       '1px solid #1E2535',
            borderRadius: '6px',
            padding:      '4px 10px',
            display:      'flex',
            alignItems:   'center',
            gap:          '6px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28C840' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#5A6E8F' }}>
              connect-web.tech
            </span>
          </div>
        </div>

        {/* Website preview */}
        <div style={{ background: '#0A0B0E', padding: '18px 16px' }}>
          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--color-orange-500)' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 700, color: '#F4F7FC' }}>Connect Web</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Services','Portfolio','Contact'].map(l => (
                <span key={l} style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F' }}>{l}</span>
              ))}
            </div>
            <div style={{ background: 'var(--color-orange-500)', borderRadius: '4px', padding: '4px 8px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, color: '#fff' }}>Démarrer</span>
            </div>
          </div>

          {/* Hero section preview */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ height: '8px', width: '45%', background: '#F4F7FC', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '6px', width: '70%', background: '#2A3142', borderRadius: '4px', marginBottom: '5px' }} />
            <div style={{ height: '6px', width: '55%', background: '#2A3142', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ background: 'var(--color-orange-500)', borderRadius: '5px', padding: '5px 12px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#fff', fontWeight: 600 }}>Démarrer →</span>
              </div>
              <div style={{ border: '1px solid #2A3142', borderRadius: '5px', padding: '5px 12px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F' }}>Portfolio</span>
              </div>
            </div>
          </div>

          {/* Cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Site Vitrine', val: '350k FCFA', color: '#61AFEF' },
              { label: 'E-commerce',  val: '600k FCFA', color: '#98C379' },
              { label: 'Application', val: '800k FCFA', color: '#E5C07B' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#161B27', border: '1px solid #1E2535', borderRadius: '8px', padding: '8px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#5A6E8F', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 700, color }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VISUEL 2 — CodeEditorMockup (slide-2 : Développement)
   ───────────────────────────────────────────────────────────────── */
const CODE_LINES = [
  { ln: '01', tokens: [{ t: 'import ', c: '#C678DD' }, { t: '{ HeroSection }', c: '#61AFEF' }, { t: ' from ', c: '#C678DD' }, { t: "'@/components'", c: '#98C379' }] },
  { ln: '02', tokens: [] },
  { ln: '03', tokens: [{ t: 'export default ', c: '#C678DD' }, { t: 'function ', c: '#61AFEF' }, { t: 'HomePage', c: '#E5C07B' }, { t: '() {', c: '#F4F7FC' }] },
  { ln: '04', tokens: [{ t: '  return (', c: '#F4F7FC' }] },
  { ln: '05', tokens: [{ t: '    <', c: '#5A6E8F' }, { t: 'main', c: '#E06C75' }, { t: '>', c: '#5A6E8F' }] },
  { ln: '06', tokens: [{ t: '      <', c: '#5A6E8F' }, { t: 'HeroSection', c: '#61AFEF' }, { t: ' /', c: '#5A6E8F' }, { t: '>', c: '#5A6E8F' }] },
  { ln: '07', tokens: [{ t: '    </', c: '#5A6E8F' }, { t: 'main', c: '#E06C75' }, { t: '>', c: '#5A6E8F' }] },
  { ln: '08', tokens: [{ t: '  )', c: '#F4F7FC' }] },
  { ln: '09', tokens: [{ t: '}', c: '#F4F7FC' }] },
]

function CodeEditorMockup() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      {/* Pills flottantes */}
      <FloatingPill icon={Code2}      label="TypeScript strict"  delay={0}   position={{ top: '-16px', right: '5%' }} />
      <FloatingPill icon={Smartphone} label="React Native"        delay={1.3} position={{ bottom: '35%', left: '-20px' }} />
      <FloatingPill icon={Zap}        label="Deploy → Vercel"     delay={2.5} position={{ bottom: '-16px', right: '8%' }} />

      {/* Éditeur VS Code */}
      <div style={{
        background:   '#1E1E2E',
        border:       '1px solid #2A2D3E',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Title bar */}
        <div style={{
          background:     '#12121F',
          padding:        '10px 14px',
          display:        'flex',
          alignItems:     'center',
          gap:            '10px',
          borderBottom:   '1px solid #2A2D3E',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1px' }}>
            {['page.tsx', 'layout.tsx'].map((tab, i) => (
              <div key={tab} style={{
                padding:      '4px 12px',
                borderRadius: '4px 4px 0 0',
                background:   i === 0 ? '#1E1E2E' : 'transparent',
                borderTop:    i === 0 ? '1px solid var(--color-orange-500)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: i === 0 ? '#F4F7FC' : '#5A6E8F' }}>{tab}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code area */}
        <div style={{ padding: '14px 16px', background: '#1E1E2E' }}>
          {CODE_LINES.map(({ ln, tokens }) => (
            <div key={ln} style={{ display: 'flex', gap: '16px', marginBottom: '3px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#3A3D5C', minWidth: '14px', textAlign: 'right' }}>{ln}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', lineHeight: 1.6 }}>
                {tokens.length === 0
                  ? <>&nbsp;</>
                  : tokens.map((tok, i) => (
                    <span key={i} style={{ color: tok.c }}>{tok.t}</span>
                  ))
                }
              </span>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div style={{ background: '#12121F', borderTop: '1px solid #2A2D3E', padding: '10px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F' }}>TERMINAL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#5A6E8F' }}>$</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#98C379' }}>✓ Compiled successfully · Deployed on Vercel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#5A6E8F' }}>$</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#61AFEF' }}>→ connect-web.tech · Lighthouse 97/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VISUEL 3 — DashboardMockup (slide-3 : ERP/CRM/Automatisation)
   ───────────────────────────────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      {/* Pills flottantes */}
      <FloatingPill icon={BarChart3}  label="Odoo ERP"             delay={0}   position={{ top: '-16px', right: '5%' }} />
      <FloatingPill icon={RefreshCw}  label="Wave & Orange Money"   delay={1.4} position={{ bottom: '30%', left: '-20px' }} />
      <FloatingPill icon={Zap}        label="Automatisé"            delay={2.6} position={{ bottom: '-16px', right: '10%' }} />

      {/* Dashboard panel */}
      <div style={{
        background:   '#0D1117',
        border:       '1px solid #1E2535',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Header dashboard */}
        <div style={{
          background:     '#080C12',
          padding:        '12px 16px',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          borderBottom:   '1px solid #1E2535',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#F4F7FC', marginBottom: '2px' }}>
              Tableau de bord ERP
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#5A6E8F' }}>
              Dernière sync · il y a 2 min
            </div>
          </div>
          <div style={{ background: 'rgba(152,195,121,0.12)', border: '1px solid rgba(152,195,121,0.3)', borderRadius: '6px', padding: '4px 10px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#98C379', fontWeight: 600 }}>● En ligne</span>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: '14px 16px' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            {[
              { label: 'CA Mensuel',  value: '4.2M',  unit: 'FCFA', color: 'var(--color-orange-500)', delta: '+24%' },
              { label: 'Commandes',   value: '287',   unit: '',     color: '#61AFEF',                  delta: '+12%' },
              { label: 'Clients',     value: '1 340', unit: '',     color: '#98C379',                  delta: '+8%'  },
            ].map(({ label, value, unit, color, delta }) => (
              <div key={label} style={{ background: '#161B27', border: '1px solid #1E2535', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#5A6E8F', marginBottom: '5px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>
                  {value}
                  {unit && <span style={{ fontSize: '8px', fontWeight: 500, marginLeft: '2px' }}>{unit}</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#98C379', marginTop: '3px' }}>{delta}</div>
              </div>
            ))}
          </div>

          {/* Automation flows */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Flux automatisés actifs
            </div>
            {[
              { label: 'Commandes → Factures',  pct: 100, color: '#98C379' },
              { label: 'Stock → Réapprovi.',    pct: 78,  color: '#61AFEF' },
              { label: 'CRM → Relances auto',   pct: 91,  color: '#E5C07B' },
            ].map(({ label, pct, color }) => (
              <div key={label} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#8899BB' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color, fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: '4px', background: '#1E2535', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '9999px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Paiements */}
          <div style={{ background: '#161B27', border: '1px solid #1E2535', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#5A6E8F' }}>Paiements Wave & Orange Money</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ background: '#1A3A5C', borderRadius: '4px', padding: '3px 7px' }}>
                <span style={{ fontSize: '8px', color: '#61AFEF', fontWeight: 700 }}>Wave</span>
              </div>
              <div style={{ background: '#2A1A0D', borderRadius: '4px', padding: '3px 7px' }}>
                <span style={{ fontSize: '8px', color: '#E8611A', fontWeight: 700 }}>Orange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   ROUTER VISUAL — retourne le bon mockup selon le slide
   ───────────────────────────────────────────────────────────────── */
function SlideVisual({ visualKey }: { visualKey: Slide['visualKey'] }) {
  if (visualKey === 'browser')   return <BrowserMockup />
  if (visualKey === 'code')      return <CodeEditorMockup />
  if (visualKey === 'dashboard') return <DashboardMockup />
  return null
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS Framer Motion
   ───────────────────────────────────────────────────────────────── */
const slideVariants = {
  enter:   { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
  exit:    { opacity: 0, transition: { duration: 0.4, ease: EASE } },
}

const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const visualVariants = {
  hidden:  { opacity: 0, scale: 0.94, x: 30 },
  visible: { opacity: 1, scale: 1,    x: 0,  transition: { duration: 0.7, ease: EASE, delay: 0.35 } },
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — NavButton
   ───────────────────────────────────────────────────────────────── */
function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Slide précédente' : 'Slide suivante'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:          '44px',
        height:         '44px',
        borderRadius:   '50%',
        border:         `1px solid ${hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
        background:     hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
        color:          '#FFFFFF',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         'pointer',
        flexShrink:     0,
        transition:     'background 200ms ease, border-color 200ms ease',
      }}
    >
      {direction === 'prev' ? <ChevronLeft size={18} aria-hidden="true" /> : <ChevronRight size={18} aria-hidden="true" />}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — HeroSlider
   ───────────────────────────────────────────────────────────────── */
export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)

  const goNext = useCallback(() => setCurrent(c => (c + 1) % TOTAL), [])
  const goPrev = useCallback(() => setCurrent(c => (c - 1 + TOTAL) % TOTAL), [])
  const goTo   = useCallback((i: number) => setCurrent(i), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(goNext, AUTOPLAY_DELAY)
    return () => clearInterval(t)
  }, [paused, goNext])

  const slide = SLIDES[current]

  return (
    <section
      className="hero-bg"
      role="region"
      aria-label="Présentation Connect Web"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh' }}
    >
      {/* Grille de points décorative */}
      <div aria-hidden="true" style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize:  '32px 32px',
        pointerEvents:   'none',
      }} />

      {/* ── Contenu slider ──────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position:      'relative',
          zIndex:        2,
          display:       'flex',
          alignItems:    'center',
          minHeight:     '100dvh',
          paddingTop:    'calc(var(--nav-height) + 4rem)',
          paddingBottom: 'clamp(6rem, 10vw, 9rem)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={slideVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            aria-roledescription="slide"
            aria-label={`Slide ${current + 1} sur ${TOTAL}`}
            style={{ width: '100%' }}
          >
            {/* Grid 60 / 40 */}
            <div
              className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center"
              style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {/* ── Colonne texte (60%) ── */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
                style={{ gap: '28px' }}
              >
                {/* Badge eyebrow */}
                <motion.div variants={itemVariants}>
                  <span className="inline-flex items-center" style={{
                    gap:           '8px',
                    fontFamily:    'var(--font-body)',
                    fontSize:      '13px',
                    fontWeight:    500,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color:         'var(--color-orange-500)',
                  }}>
                    <span aria-hidden="true" className="animate-pulse" style={{
                      width:        '7px',
                      height:       '7px',
                      borderRadius: '50%',
                      background:   'var(--color-orange-500)',
                      boxShadow:    '0 0 8px rgba(232,97,26,0.6)',
                      flexShrink:   0,
                      display:      'inline-block',
                    }} />
                    {slide.badge}
                  </span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                  variants={itemVariants}
                  className="font-heading font-bold"
                  style={{
                    color:         '#FFFFFF',
                    margin:        0,
                    whiteSpace:    'pre-wrap',
                    fontSize:      'clamp(2rem, 3.75vw, 3rem)',
                    lineHeight:    1.08,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {splitAccent(slide.titre, slide.accentWord)}
                </motion.h1>

                {/* Texte corps */}
                <motion.p
                  variants={itemVariants}
                  className="text-hero-subtitle"
                  style={{ margin: 0 }}
                >
                  {slide.texte}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center"
                  style={{ gap: '12px' }}
                >
                  <CtaPrimary   href={slide.cta1.href} label={slide.cta1.label} />
                  <CtaSecondary href={slide.cta2.href} label={slide.cta2.label} />
                </motion.div>
              </motion.div>

              {/* ── Colonne visuel (40%) ── */}
              <motion.div
                className="hidden lg:flex items-center justify-center"
                variants={visualVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideVisual visualKey={slide.visualKey} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Contrôles bas : dots + flèches ──────────────────────── */}
      <div style={{
        position:       'absolute',
        bottom:         '36px',
        left:           0,
        right:          0,
        zIndex:         3,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '20px',
      }}>
        <NavButton direction="prev" onClick={goPrev} />

        <div role="tablist" aria-label="Navigation slides" className="flex items-center" style={{ gap: '8px' }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Aller au slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width:        i === current ? '24px' : '8px',
                height:       '8px',
                borderRadius: '999px',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                background:   i === current ? 'var(--color-orange-500)' : 'rgba(255,255,255,0.35)',
                transition:   'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>

        <NavButton direction="next" onClick={goNext} />
      </div>

      {/* Fade bas */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        bottom:        0,
        left:          0,
        right:         0,
        height:        '120px',
        background:    'linear-gradient(to bottom, transparent, #0A0B0E)',
        pointerEvents: 'none',
        zIndex:        1,
      }} />
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MICRO-COMPOSANTS — CTAs
   ───────────────────────────────────────────────────────────────── */
function CtaPrimary({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} className="inline-flex items-center font-semibold rounded-xl"
      style={{
        height: '52px', padding: '0 32px', gap: '8px', fontSize: '15px',
        fontFamily: 'var(--font-body)',
        background: hovered ? '#E8611A' : '#1B2A4A',
        color: '#FFFFFF', textDecoration: 'none',
        transition: 'background 200ms ease', flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <ArrowRight aria-hidden="true" style={{ width: '16px', height: '16px', transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 200ms ease' }} />
    </Link>
  )
}

function CtaSecondary({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} className="inline-flex items-center font-medium rounded-xl"
      style={{
        height: '52px', padding: '0 32px', gap: '8px', fontSize: '15px',
        fontFamily: 'var(--font-body)',
        background: 'transparent',
        color: hovered ? '#E8611A' : '#FFFFFF',
        border: `1px solid ${hovered ? '#E8611A' : 'rgba(255,255,255,0.35)'}`,
        textDecoration: 'none',
        transition: 'color 200ms ease, border-color 200ms ease', flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <ArrowRight aria-hidden="true" style={{ width: '16px', height: '16px', transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 200ms ease' }} />
    </Link>
  )
}
