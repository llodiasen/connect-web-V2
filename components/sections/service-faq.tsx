'use client'

// Source  : CONTENT.md > SERVICES > Section FAQ (générique)
// Design  : Light theme · Accordion exclusif · Icône + rotation 45° → ×
//           AnimatePresence · Schema.org FAQPage JSON-LD
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight, MessageCircle } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface FaqItem {
  question: string
  answer:   string
}

export interface ServiceFaqProps {
  eyebrow?:    string
  title:       string
  description?: string
  items:       FaqItem[]
  ctaLabel?:   string
  ctaHref?:    string
  /** Génère un <script type="application/ld+json"> FAQPage */
  withSchema?: boolean
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const EASE      = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]
const EASE_SNAP = [0.04, 0.62, 0.23, 0.98] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FaqRow
   ─────────────────────────────────────────────────────────────── */
function FaqRow({
  item,
  id,
  isOpen,
  onToggle,
  isLast,
}: {
  item:     FaqItem
  id:       string
  isOpen:   boolean
  onToggle: () => void
  isLast:   boolean
}) {
  return (
    <div
      style={{
        borderBottom: isLast ? 'none' : '1px solid #F1F3F7',
      }}
    >
      {/* ── Bouton question ── */}
      <button
        id={`${id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        style={{
          padding:    '22px 0',
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          gap:        '16px',
        }}
      >
        {/* Texte question */}
        <span
          style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    600,
            fontSize:      'var(--faq-question-size)',
            lineHeight:    1.4,
            letterSpacing: '-0.01em',
            color:         isOpen ? 'var(--brand-primary)' : '#0A0B0E',
            transition:    'color 200ms ease',
          }}
        >
          {item.question}
        </span>

        {/* Icône + → rotation 45° → × */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE_SNAP }}
          aria-hidden="true"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
            width:          '32px',
            height:         '32px',
            borderRadius:   '50%',
            border:         `1.5px solid ${isOpen ? 'var(--color-orange-500)' : '#E2E8F0'}`,
            background:     isOpen ? 'rgba(232,97,26,0.07)' : '#FFFFFF',
            color:          isOpen ? 'var(--color-orange-500)' : '#9CA3AF',
            transition:     'background 200ms ease, border-color 200ms ease, color 200ms ease',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.span>
      </button>

      {/* ── Panneau réponse ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: 0.32, ease: EASE_SNAP },
              opacity: { duration: 0.22, ease: EASE },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'var(--faq-answer-size)',
                color:        '#6B7280',
                lineHeight:   1.7,
                paddingBottom:'24px',
                maxWidth:     '640px',
                textAlign:    'justify',
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceFaq
   ─────────────────────────────────────────────────────────────── */
export function ServiceFaq({
  eyebrow = 'Questions fréquentes',
  title,
  description,
  items,
  ctaLabel = 'Poser ma question',
  ctaHref  = '/contact',
  withSchema = true,
}: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  /* ── Schema.org FAQPage ── */
  const schemaJson = withSchema
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type':    'FAQPage',
        mainEntity: items.map((item) => ({
          '@type':        'Question',
          name:           item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      })
    : null

  return (
    <section
      aria-labelledby="faq-service-heading"
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        background:   '#F7F8FA',
        borderTop:    '1px solid #E2E8F0',
      }}
    >
      {/* Schema.org FAQPage */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}

      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]"
          style={{ gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'start' }}
        >

          {/* ══ COLONNE GAUCHE — En-tête sticky ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:sticky"
            style={{ top: 'calc(var(--nav-height) + 2rem)' }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--brand-primary)',
                marginBottom:  '12px',
              }}
            >
              {eyebrow}
            </p>

            {/* Titre */}
            <h2
              id="faq-service-heading"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    800,
                fontSize:      'clamp(1.5rem, 2.8vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.03em',
                color:         '#0A0B0E',
                marginBottom:  description ? '16px' : '28px',
              }}
            >
              {title}
            </h2>

            {description && (
              <p
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     'clamp(0.9375rem, 1.3vw, 1rem)',
                  color:        '#6B7280',
                  lineHeight:   1.65,
                  marginBottom: '28px',
                }}
              >
                {description}
              </p>
            )}

            {/* Compteur de questions */}
            <div
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '8px',
                background:   '#FFFFFF',
                border:       '1px solid #E2E8F0',
                borderRadius: '10px',
                padding:      '10px 16px',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize:   '22px',
                  color:      'var(--color-orange-500)',
                  lineHeight: 1,
                }}
              >
                {items.length}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '13px',
                  color:      '#6B7280',
                  lineHeight: 1.3,
                }}
              >
                questions<br />répondues
              </span>
            </div>

            {/* CTA WhatsApp-style */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                href={ctaHref}
                className="inline-flex items-center font-semibold"
                style={{
                  gap:            '8px',
                  padding:        '12px 20px',
                  background:     'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
                  borderRadius:   '10px',
                  fontSize:       '14px',
                  color:          '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow:      '0 2px 8px rgba(232,97,26,0.22)',
                  transition:     'box-shadow 200ms ease, transform 150ms ease',
                  alignSelf:      'flex-start',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,97,26,0.35)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,97,26,0.22)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {ctaLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '12px',
                  color:      '#9CA3AF',
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '5px',
                }}
              >
                <MessageCircle size={12} aria-hidden="true" />
                Réponse sous 24h · Consultation gratuite
              </p>
            </div>
          </motion.div>

          {/* ══ COLONNE DROITE — Accordion ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            style={{
              background:   '#FFFFFF',
              borderRadius: '16px',
              border:       '1px solid #E2E8F0',
              boxShadow:    '0 2px 8px rgba(0,0,0,0.04)',
              padding:      '0 32px',
            }}
          >
            {items.map((item, i) => (
              <FaqRow
                key={i}
                item={item}
                id={`faq-service-${i}`}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isLast={i === items.length - 1}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
