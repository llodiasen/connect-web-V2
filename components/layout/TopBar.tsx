'use client'

// TopBar — bandeau fixe 36px au-dessus de la Navbar
// Fond : #1B2A4A · 5 slides en rotation automatique (4s, fade 300ms)
// Masqué sur mobile (hidden sm:flex) — RÈGLE N°0 : hauteurs via style{{}}

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   SLIDES
   ─────────────────────────────────────────────────────────────── */
interface Slide {
  text: string
  href?: string
}

const SLIDES: Slide[] = [
  { text: '📍 Agence digitale basée à Dakar, Sénégal' },
  { text: '📞 +221 77 900 62 82 — Réponse sous 24h', href: 'tel:+221779006282' },
  { text: '✉️ contact@connect-web.tech', href: 'mailto:contact@connect-web.tech' },
  { text: '⚡ Lighthouse 95+ garanti à la livraison' },
  { text: '🕐 Lun–Ven 8h–18h WAT · Devis gratuit et sans engagement' },
]

const INTERVAL_MS = 4000
const FADE_MS     = 300

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
   ─────────────────────────────────────────────────────────────── */
export function TopBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible]  = useState(true)
  const timerRef               = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion          = useRef(false)

  // Détecter prefers-reduced-motion côté client
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const advance = useCallback(() => {
    if (reducedMotion.current) {
      setCurrent(prev => (prev + 1) % SLIDES.length)
      return
    }
    setVisible(false)
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
      setVisible(true)
    }, FADE_MS)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [advance])

  const slide = SLIDES[current]

  const inner = (
    <span
      style={{
        fontFamily:  'var(--font-body)',
        fontSize:    '12px',
        fontWeight:  'var(--font-light)',
        color:       'rgba(255,255,255,0.80)',
        letterSpacing: '0.01em',
        opacity:     visible ? 1 : 0,
        transition:  reducedMotion.current ? 'none' : `opacity ${FADE_MS}ms ease`,
        whiteSpace:  'nowrap',
      }}
    >
      {slide.text}
    </span>
  )

  return (
    <div
      className="hidden sm:flex fixed left-0 right-0 z-[70] items-center justify-center"
      style={{
        top:        0,
        height:     '36px',
        background: '#1B2A4A',
      }}
      aria-label="Informations de contact"
    >
      <div className="container flex items-center justify-center">
        {slide.href ? (
          <Link
            href={slide.href}
            style={{ textDecoration: 'none' }}
            aria-label={slide.text}
          >
            {inner}
          </Link>
        ) : (
          inner
        )}
      </div>
    </div>
  )
}
