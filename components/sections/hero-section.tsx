'use client'

// Source  : CONTENT.md > HOME > Section Hero
// Design  : Light theme — hero-bg (#FAFAFA + radial orange 7%)
//           Terminal VS Code Light · trust pills · 2 CTAs
// RÈGLE N°0 — spacing pixel-précis via style{{}} inline uniquement

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Zap, Wallet, Clock } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   CONTENU — Source : CONTENT.md > HOME > Section Hero
   ───────────────────────────────────────────────────────────────── */
const CONTENT = {
  badge:     '🇸🇳 Agence digitale · Dakar, Sénégal',
  h1: {
    before:    'Votre projet digital\n',
    highlight: 'livré.',
    after:     ' Pas promis.',
  },
  subtitle:
    'De la maquette au déploiement Vercel\u00A0— en 2 à 8 semaines.',
  trust: [
    { Icon: Zap,    label: '50+ projets livrés'    },
    { Icon: Wallet, label: 'Wave & Orange Money'   },
    { Icon: Clock,  label: 'Réponse sous 24h'      },
  ],
  ctaPrimary:   { label: 'Démarrer mon projet',   href: '/contact'   },
  ctaSecondary: { label: 'Voir nos réalisations', href: '/portfolio' },
} as const

/* ─────────────────────────────────────────────────────────────────
   TERMINAL — VS Code Light theme (typing animation)
   ───────────────────────────────────────────────────────────────── */
type LineType = 'brace' | 'prop' | 'string' | 'success' | 'comment' | 'number' | 'empty'

const CODE_LINES: { text: string; type: LineType }[] = [
  { text: 'const projet = {',                   type: 'brace'   },
  { text: '  client:   "Votre entreprise",',    type: 'prop'    },
  { text: '  service:  "Sur mesure",',          type: 'string'  },
  { text: '  délai:    "2 semaines",',          type: 'string'  },
  { text: '  stack:    "Next.js · Sanity",',    type: 'string'  },
  { text: '  résultat: "🚀 Live & Optimisé",',  type: 'success' },
  { text: '}',                                  type: 'brace'   },
  { text: '',                                   type: 'empty'   },
  { text: '// Scores Lighthouse',               type: 'comment' },
  { text: 'performance:   98 / 100,',           type: 'number'  },
  { text: 'accessibility: 100 / 100,',          type: 'number'  },
  { text: 'seo:           100 / 100,',          type: 'number'  },
]

const LINE_COLOR: Record<LineType, string> = {
  brace:   '#1F2937',
  prop:    '#6B7280',
  string:  '#B45309',
  success: '#047857',
  comment: '#9CA3AF',
  number:  '#1D4ED8',
  empty:   '',
}

function CodeTerminal() {
  const [done, setDone] = useState(0)
  const [char, setChar] = useState(0)
  const less            = useReducedMotion()

  useEffect(() => {
    if (less) { setDone(CODE_LINES.length); return }
    if (done >= CODE_LINES.length) return
    const line = CODE_LINES[done]
    if (char < line.text.length) {
      const t = setTimeout(() => setChar(c => c + 1), 28)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => { setDone(d => d + 1); setChar(0) }, 80)
    return () => clearTimeout(t)
  }, [done, char, less])

  return (
    <div
      role="img"
      aria-label="Exemple de projet Connect Web — scores Lighthouse 100"
      style={{
        background:   '#FFFFFF',
        borderRadius: '16px',
        border:       '1px solid #E2E8F0',
        boxShadow:    '0 1px 3px rgba(0,0,0,0.07), 0 20px 48px rgba(0,0,0,0.08)',
        overflow:     'hidden',
      }}
    >
      {/* Barre titre macOS light */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '6px',
        padding:       '10px 16px',
        borderBottom:  '1px solid #F1F3F7',
        background:    '#F9FAFB',
      }}>
        <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
        <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
        <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.03em' }}>
            connect-web / projet.ts
          </span>
        </div>
      </div>

      {/* Code */}
      <div style={{
        padding:    '16px 20px',
        fontFamily: 'var(--font-mono)',
        fontSize:   '13px',
        lineHeight: 1.8,
        minHeight:  '280px',
        background: '#FAFAFA',
      }}>
        {CODE_LINES.slice(0, done).map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '20px' }}>
            <span aria-hidden="true" style={{ userSelect: 'none', color: '#D1D5DB', width: '16px', textAlign: 'right', flexShrink: 0, fontSize: '12px' }}>
              {i + 1}
            </span>
            <span style={{ whiteSpace: 'pre', color: LINE_COLOR[line.type] }}>
              {line.text || '\u00A0'}
            </span>
          </div>
        ))}
        {done < CODE_LINES.length && (
          <div style={{ display: 'flex', gap: '20px' }}>
            <span aria-hidden="true" style={{ userSelect: 'none', color: '#D1D5DB', width: '16px', textAlign: 'right', flexShrink: 0, fontSize: '12px' }}>
              {done + 1}
            </span>
            <span style={{ whiteSpace: 'pre', color: LINE_COLOR[CODE_LINES[done].type] }}>
              {CODE_LINES[done].text.slice(0, char)}
              <span
                aria-hidden="true"
                style={{
                  display:         'inline-block',
                  width:           '2px',
                  height:          '1.1em',
                  background:      'var(--color-orange-500)',
                  verticalAlign:   'middle',
                  animation:       'pulse 1s infinite',
                }}
              />
            </span>
          </div>
        )}
      </div>

      {/* Footer status */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '8px 20px',
        borderTop:      '1px solid #F1F3F7',
        background:     '#F9FAFB',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#9CA3AF' }}>
          TypeScript · UTF-8
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A' }} aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7280' }}>
            Build passing
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS FRAMER MOTION
   ───────────────────────────────────────────────────────────────── */
const EASE_OUT    = [0.0, 0.0, 0.2, 1.0]        as [number,number,number,number]
const EASE_SPRING = [0.175, 0.885, 0.32, 1.275] as [number,number,number,number]

const container  = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}
const terminalMv = {
  hidden:  { opacity: 0, x: 32, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.75, ease: EASE_OUT, delay: 0.2 } },
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — HeroSection
   ───────────────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-bg"
      style={{
        position:   'relative',
        minHeight:  '100dvh',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
      }}
    >
      {/* Dot grid subtil */}
      <div
        aria-hidden="true"
        style={{
          position:            'absolute',
          inset:               0,
          pointerEvents:       'none',
          backgroundImage:     'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize:      '28px 28px',
        }}
      />

      {/* Blob orange — coin bas gauche */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          bottom:       '-80px',
          left:         '-80px',
          width:        '500px',
          height:       '500px',
          borderRadius: '50%',
          pointerEvents:'none',
          background:   'radial-gradient(circle, rgba(232,97,26,0.05) 0%, transparent 70%)',
          filter:       'blur(40px)',
        }}
      />

      {/* Contenu */}
      <div
        className="container relative"
        style={{
          paddingTop:    'calc(var(--nav-height) + 2rem)',
          paddingBottom: 'clamp(2rem, 4vw, 4rem)',
          zIndex:        1,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center" style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}>

          {/* ── Colonne gauche ─────────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-[580px]"
            style={{ gap: '28px' }}
          >
            {/* Badge localisation */}
            <motion.div variants={item}>
              <span
                className="inline-flex items-center"
                style={{ gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width:      7,
                    height:     7,
                    borderRadius:'50%',
                    background: '#16A34A',
                    boxShadow:  '0 0 7px rgba(22,163,74,0.5)',
                    flexShrink: 0,
                    animation:  'pulse 2s infinite',
                  }}
                />
                {CONTENT.badge}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              variants={item}
              className="font-heading font-bold"
              style={{
                color:         '#FFFFFF',
                whiteSpace:    'pre-wrap',
                margin:        0,
                fontSize:      'clamp(2rem, 3.75vw, 3rem)',
                lineHeight:    1.08,
                letterSpacing: '-0.03em',
              }}
            >
              {CONTENT.h1.before}
              <span style={{ color: 'var(--color-orange-500)' }}>
                {CONTENT.h1.highlight}
              </span>
              {CONTENT.h1.after}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={item}
              className="text-hero-subtitle"
              style={{ maxWidth: '460px' }}
            >
              {CONTENT.subtitle}
            </motion.p>

            {/* Trust pills */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center"
              style={{ gap: '6px' }}
            >
              {CONTENT.trust.map(({ Icon, label }, i) => (
                <span
                  key={label}
                  className="inline-flex items-center"
                  style={{
                    gap:          '6px',
                    padding:      '7px 14px',
                    borderRadius: '999px',
                    background:   'rgba(255,255,255,0.08)',
                    border:       '1px solid rgba(255,255,255,0.15)',
                    fontSize:     '13px',
                    fontWeight:   500,
                    color:        'rgba(255,255,255,0.8)',
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    style={{ width: 14, height: 14, color: 'var(--color-orange-500)', flexShrink: 0 }}
                  />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center"
              style={{ gap: '12px', paddingTop: '4px' }}
            >
              {/* CTA primaire — bg #111111 */}
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: EASE_SPRING }}
              >
                <Link
                  href={CONTENT.ctaPrimary.href}
                  className="group inline-flex items-center font-semibold rounded-xl transition-opacity duration-150 hover:opacity-90"
                  style={{
                    height:         '38px',
                    padding:        '0 20px',
                    background:     '#FFFFFF',
                    color:          '#1B2A4A',
                    gap:            '6px',
                    fontSize:       '14px',
                    textDecoration: 'none',
                  }}
                >
                  {CONTENT.ctaPrimary.label}
                  <ArrowRight
                    aria-hidden="true"
                    style={{ width: 16, height: 16, transition: 'transform 150ms ease' }}
                    className="group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>

              {/* Séparateur vertical */}
              <span aria-hidden="true" className="hidden sm:block" style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)' }} />

              {/* CTA secondaire — ghost */}
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={CONTENT.ctaSecondary.href}
                  className="group inline-flex items-center font-medium transition-colors duration-150"
                  style={{
                    gap:            '6px',
                    fontSize:       '14px',
                    color:          'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {CONTENT.ctaSecondary.label}
                  <ArrowRight
                    aria-hidden="true"
                    style={{ width: 14, height: 14, color: 'var(--color-orange-500)', transition: 'transform 150ms ease' }}
                    className="group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Colonne droite — Terminal ─────────────────────── */}
          <motion.div
            variants={terminalMv}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col"
            style={{ gap: '12px' }}
          >
            <CodeTerminal />
            <div
              aria-hidden="true"
              style={{
                height:     '1px',
                width:      '60%',
                margin:     '0 auto',
                background: 'linear-gradient(90deg, transparent, rgba(232,97,26,0.2), transparent)',
                filter:     'blur(3px)',
              }}
            />
            <p style={{
              textAlign:     'center',
              fontFamily:    'var(--font-mono)',
              fontSize:      '11px',
              color:         'rgba(255,255,255,0.4)',
              letterSpacing: '0.04em',
            }}>
              Un projet type · Livré en 2 semaines
            </p>
          </motion.div>

        </div>
      </div>

      {/* Fade bas vers section suivante */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '80px',
          background: 'linear-gradient(to bottom, transparent, #0A0B0E)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
