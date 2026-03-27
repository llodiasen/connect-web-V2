'use client'

// Source  : CONTENT.md > IDENTITÉ + SITEMAP complet
// Design  : Dark theme · 5 colonnes · Séparateur orange 2px · Hover translateX(4px)
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md
   ─────────────────────────────────────────────────────────────── */
const SERVICES_LINKS = [
  { label: 'Développement web & mobile', href: '/services/developpement'   },
  { label: 'E-Commerce & boutique en ligne', href: '/services/ecommerce'   },
  { label: 'Intégration & automatisation', href: '/services/integration'   },
  { label: 'Solutions NFC',              href: '/services/nfc'             },
]

const COMPANY_LINKS = [
  { label: 'À propos',         href: '/a-propos'         },
  { label: 'Réalisations',     href: '/portfolio'        },
  { label: 'Offres',           href: '/offres'           },
  { label: 'Contact',          href: '/contact'          },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité',  href: '/confidentialite'  },
  { label: 'CGV',              href: '/cgv'              },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales',  href: '/mentions-legales'  },
  { label: 'Confidentialité',   href: '/confidentialite'   },
  { label: 'CGV',               href: '/cgv'               },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/company/connect-web-tech/',
    Icon:  Linkedin,
  },
  {
    label: 'Facebook',
    href:  'https://www.facebook.com/share/1CRzjeUSYM/',
    Icon:  Facebook,
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/connect_web_agency',
    Icon:  Instagram,
  },
]

/* ─────────────────────────────────────────────────────────────────
   TOKENS DARK
   ─────────────────────────────────────────────────────────────── */
const C = {
  bg:        '#080C12',   // --color-dark-950
  bgAlt:     '#0D1117',   // --color-dark-900
  border:    '#161B27',   // --color-dark-800
  muted:     '#FFFFFF',   // texte discret → blanc
  secondary: '#FFFFFF',   // texte corps → blanc
  primary:   '#FFFFFF',   // texte fort → blanc
  orange:    '#E8611A',   // --color-orange-500
  orangeHov: '#FF7A20',   // --color-orange-400
} as const

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FooterLink
   Hover : color orange + translateX(4px)
   ─────────────────────────────────────────────────────────────── */
function FooterLink({
  href,
  children,
  external,
}: {
  href:      string
  children:  React.ReactNode
  external?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const props = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color:          hovered ? C.orange : C.secondary,
        transform:      hovered ? 'translateX(4px)' : 'translateX(0)',
        transition:     'color 180ms ease, transform 180ms ease',
        textDecoration: 'none',
        fontSize:       '14px',
        lineHeight:     1.5,
        display:        'block',
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ColumnTitle
   ─────────────────────────────────────────────────────────────── */
function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily:    'var(--font-body)',
        fontSize:      '11px',
        fontWeight:    700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color:         C.orange,
        marginBottom:  '20px',
      }}
    >
      {children}
    </h3>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — NewsletterBlock
   ─────────────────────────────────────────────────────────────── */
function NewsletterBlock() {
  const [email,    setEmail]    = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [sent,     setSent]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim())   { setEmailErr('Email requis');  inputRef.current?.focus(); return }
    if (!re.test(email)) { setEmailErr('Email invalide'); inputRef.current?.focus(); return }
    setEmailErr('')
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, service: 'newsletter', intention: 'Newsletter' }),
      })
    } finally {
      setLoading(false)
      setSent(true)
    }
  }

  return (
    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
      <h3 style={{
        fontFamily:    'var(--font-body)',
        fontSize:      '11px',
        fontWeight:    700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color:         C.orange,
        marginBottom:  '6px',
      }}>
        Newsletter
      </h3>
      <p style={{
        fontFamily:  'var(--font-body)',
        fontSize:    '12px',
        color:       'rgba(255,255,255,0.45)',
        lineHeight:  1.55,
        marginBottom: '12px',
      }}>
        Conseils web, digital et SaaS —&nbsp;1&nbsp;email par mois, pas de spam.
      </p>

      {sent ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#22C55E' }}>
          ✓ Merci&nbsp;! Vous êtes inscrit.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailErr('') }}
                placeholder="votre@email.com"
                autoComplete="email"
                style={{
                  flex:        1,
                  height:      '36px',
                  padding:     '0 10px',
                  fontFamily:  'var(--font-body)',
                  fontSize:    '12px',
                  color:       '#F1F5F9',
                  background:  C.bgAlt,
                  border:      `1px solid ${emailErr ? '#EF4444' : C.border}`,
                  borderRadius:'7px',
                  outline:     'none',
                  minWidth:    0,
                  boxSizing:   'border-box',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  height:      '36px',
                  padding:     '0 14px',
                  background:  loading ? '#374151' : btnHover ? '#C9501E' : '#E8622A',
                  color:       '#FFFFFF',
                  fontFamily:  'var(--font-body)',
                  fontSize:    '12px',
                  fontWeight:  600,
                  borderRadius:'7px',
                  border:      'none',
                  cursor:      loading ? 'not-allowed' : 'pointer',
                  whiteSpace:  'nowrap',
                  flexShrink:  0,
                  transition:  'background 0.2s',
                }}
              >
                {loading ? '…' : "S'abonner"}
              </button>
            </div>
            {emailErr && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#EF4444' }}>{emailErr}</p>
            )}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>
            Pas de spam. Désabonnement en 1&nbsp;clic.
          </p>
        </form>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — Footer
   ─────────────────────────────────────────────────────────────── */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Pied de page"
      style={{
        background: C.bg,
        borderTop:  `2px solid ${C.orange}`,
      }}
    >
      {/* ── Grille principale ─────────────────────────────────── */}
      <div className="container">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap:          'clamp(2rem, 4vw, 3rem)',
            paddingBlock: 'clamp(3.5rem, 6vw, 5rem)',
          }}
        >

          {/* ── COL 1 : Description + Réseaux ────────────────────── */}
          <div>
            {/* Description */}
            <p
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '13px',
                color:       C.secondary,
                lineHeight:  1.7,
                marginBottom:'24px',
                textAlign:   'justify',
              }}
            >
              Connect Web accompagne les entreprises et startups
              avec des solutions web et digitales sur mesure —
              sites, applications et logiciels SaaS pensés pour performer.
              De l&apos;idée au lancement, on construit avec vous.
            </p>

            {/* Réseaux sociaux */}
            <div
              role="list"
              aria-label="Réseaux sociaux"
              style={{ display: 'flex', gap: '10px' }}
            >
              {SOCIALS.map(({ label, href, Icon }) => (
                <SocialIcon key={label} label={label} href={href} Icon={Icon} />
              ))}
            </div>
          </div>

          {/* ── COL 2 : Services ─────────────────────────────────── */}
          <div>
            <ColumnTitle>Services</ColumnTitle>
            <nav aria-label="Navigation services">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {SERVICES_LINKS.map(link => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COL 3 : Entreprise ───────────────────────────────── */}
          <div>
            <ColumnTitle>Entreprise</ColumnTitle>
            <nav aria-label="Navigation entreprise">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {COMPANY_LINKS.map(link => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COL 4 : Contact + Newsletter ─────────────────────── */}
          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <address
              style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           '14px',
                fontStyle:     'normal',
              }}
            >
              <ContactItem
                Icon={Mail}
                href="mailto:contact@connect-web.tech"
                label="Envoyer un email"
              >
                contact@connect-web.tech
              </ContactItem>

              <ContactItem
                Icon={Phone}
                href="tel:+221779006282"
                label="Appeler"
              >
                +221 77 900 62 82
              </ContactItem>

              <ContactItem
                Icon={Phone}
                href="tel:+221783438249"
                label="Appeler"
              >
                +221 78 343 82 49
              </ContactItem>

              <ContactItem
                Icon={MessageCircle}
                href="https://wa.me/221779006282"
                label="Contacter sur WhatsApp"
                external
              >
                WhatsApp disponible
              </ContactItem>

              <ContactItem
                Icon={MapPin}
                href="/contact"
                label="Voir notre adresse"
              >
                Dakar, Sénégal 🇸🇳
              </ContactItem>
            </address>

            {/* ── Newsletter ── */}
            <NewsletterBlock />
          </div>

        </div>
      </div>

      {/* ── Séparateur ───────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="container">
          <div
            className="flex flex-col sm:flex-row items-center justify-between"
            style={{ paddingBlock: '20px', gap: '12px' }}
          >
            {/* Copyright */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '12px',
                color:      C.muted,
              }}
            >
              © {year} Connect Web — Tous droits réservés.
            </p>

            {/* Liens légaux */}
            <nav aria-label="Liens légaux">
              <ul
                className="flex flex-wrap items-center justify-center sm:justify-end"
                style={{
                  gap:       '4px',
                  listStyle: 'none',
                  padding:   0,
                  margin:    0,
                }}
              >
                {LEGAL_LINKS.map((link, i) => (
                  <li
                    key={link.href}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        style={{ color: C.muted, fontSize: '11px', userSelect: 'none' }}
                      >
                        ·
                      </span>
                    )}
                    <LegalLink href={link.href}>{link.label}</LegalLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HELPERS — SocialIcon / ContactItem / LegalLink
   ─────────────────────────────────────────────────────────────── */
function SocialIcon({
  label,
  href,
  Icon,
}: {
  label: string
  href:  string
  Icon:  React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      role="listitem"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '36px',
        height:          '36px',
        borderRadius:    '8px',
        background:      hovered ? C.orange : C.bgAlt,
        border:          `1px solid ${hovered ? C.orange : C.border}`,
        color:           hovered ? '#FFFFFF' : C.secondary,
        transition:      'background 180ms ease, border-color 180ms ease, color 180ms ease',
        textDecoration:  'none',
        flexShrink:      0,
      }}
    >
      <Icon size={16} aria-hidden="true" />
    </Link>
  )
}

function ContactItem({
  Icon,
  href,
  label,
  children,
  external,
}: {
  Icon:     React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>
  href:     string
  label:    string
  children: React.ReactNode
  external?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <Link
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        alignItems:     'flex-start',
        gap:            '10px',
        color:          hovered ? C.orange : C.secondary,
        textDecoration: 'none',
        fontSize:       '13px',
        lineHeight:     1.5,
        transition:     'color 180ms ease',
      }}
      {...props}
    >
      <span style={{ flexShrink: 0, marginTop: '2px', display: 'inline-flex' }}>
        <Icon size={14} aria-hidden="true" />
      </span>
      {children}
    </Link>
  )
}

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize:       '12px',
        color:          hovered ? C.secondary : C.muted,
        textDecoration: 'none',
        transition:     'color 150ms ease',
        padding:        '2px 4px',
      }}
    >
      {children}
    </Link>
  )
}
