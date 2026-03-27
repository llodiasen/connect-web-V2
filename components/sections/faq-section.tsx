'use client'

// Source  : CONTENT.md > HOME > Section FAQ Home
// Design  : section-alt (bg-#F7F8FA) · Accordion exclusif · icône + rotation 45° → ×
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > HOME > Section FAQ (5 questions)
   ─────────────────────────────────────────────────────────────── */
interface FaqItem {
  id:       string
  question: string
  answer:   ReactNode
}

const FAQS: FaqItem[] = [
  {
    id:       'faq-1',
    question: '\u00cates-vous vraiment bas\u00e9s \u00e0 Dakar\u00a0?',
    answer:   'Oui. Toute l\u2019\u00e9quipe Connect Web est \u00e0 Dakar, S\u00e9n\u00e9gal. On int\u00e8gre Wave, Orange Money et les usages mobiles africains nativement. Vous parlez \u00e0 une agence digitale qui conna\u00eet votre march\u00e9.',
  },
  {
    id:       'faq-2',
    question: 'Combien co\u00fbte un site web \u00e0 Dakar\u00a0?',
    answer: (
      <>
        Un site vitrine d\u00e9marre \u00e0 350\u202f000\u00a0FCFA. Une application mobile \u00e0 partir de 600\u202f000\u00a0FCFA. Chaque devis est gratuit et d\u00e9taill\u00e9\u00a0— consultez notre{' '}
        <Link href="/tarifs" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline' }}>
          page tarifs
        </Link>{' '}
        pour les fourchettes compl\u00e8tes.
      </>
    ),
  },
  {
    id:       'faq-3',
    question: 'Quels sont vos d\u00e9lais de livraison\u00a0?',
    answer:   'Site vitrine\u00a0: 1-2 semaines. Application mobile\u00a0: 4-8 semaines. 98\u00a0% de nos projets livr\u00e9s \u00e0 la date convenue.',
  },
  {
    id:       'faq-4',
    question: 'Proposez-vous un support apr\u00e8s livraison\u00a0?',
    answer:   'Oui. 30 jours de support inclus \u00e0 la livraison. Contrats de maintenance longue dur\u00e9e disponibles.',
  },
  {
    id:       'faq-5',
    question: 'Travaillez-vous avec des clients hors du S\u00e9n\u00e9gal\u00a0?',
    answer:   'Oui. S\u00e9n\u00e9gal, Afrique de l\u2019Ouest et diaspora africaine (Europe, Am\u00e9rique du Nord). Suivi de projet \u00e0 distance sans friction.',
  },
  {
    id:       'faq-6',
    question: 'Pourquoi Next.js et pas WordPress\u00a0?',
    answer:   'WordPress convient pour un blog. Pour un site performant ou une application web, Next.js est plus rapide (Lighthouse\u00a095+), plus s\u00e9curis\u00e9 et mieux r\u00e9f\u00e9renc\u00e9. C\u2019est le choix de notre agence de d\u00e9veloppement web \u00e0 Dakar.',
  },
  {
    id:       'faq-7',
    question: 'Le code source m\u2019appartient\u00a0?',
    answer:   'Oui. 100\u00a0% du code vous appartient d\u00e8s le jour\u00a01. H\u00e9berg\u00e9 sur votre repo GitHub ou GitLab.',
  },
]

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE      = [0.0, 0.0, 0.2, 1.0]        as [number, number, number, number]
const EASE_SNAP = [0.04, 0.62, 0.23, 0.98]    as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — FaqRow
   ─────────────────────────────────────────────────────────────── */
function FaqRow({
  item,
  isOpen,
  onToggle,
  isLast,
}: {
  item:     FaqItem
  isOpen:   boolean
  onToggle: () => void
  isLast:   boolean
}) {
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid #E2E8F0' }}>

      {/* Bouton question */}
      <button
        id={`${item.id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange-500)] focus-visible:ring-offset-2"
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
            color:         isOpen ? 'var(--color-orange-500)' : '#0A0B0E',
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

      {/* Panneau réponse — AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-panel`}
            role="region"
            aria-labelledby={`${item.id}-btn`}
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
                fontWeight:   300,
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
   COMPOSANT PRINCIPAL — FaqSection
   ─────────────────────────────────────────────────────────────── */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      aria-labelledby="faq-heading"
      className="section-base"
    >
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: '56px' }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '12px',
            }}
          >
            FAQ
          </p>

          {/* H2 */}
          <h2
            id="faq-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    700,
              fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
              color:         '#0A0B0E',
              marginBottom:  '16px',
            }}
          >
            Tout ce que vous voulez savoir
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize:   'clamp(0.9375rem, 1.5vw, 1rem)',
              color:      '#6B7280',
              lineHeight: 1.6,
              maxWidth:   '460px',
              margin:     '0 auto',
            }}
          >
            Des réponses directes. Pas de jargon.
          </p>
        </motion.div>

        {/* ── Accordion ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          style={{
            maxWidth:     '720px',
            margin:       '0 auto',
            background:   '#FFFFFF',
            borderRadius: '16px',
            border:       '1px solid #E2E8F0',
            boxShadow:    '0 1px 3px rgba(0,0,0,0.05)',
            padding:      '0 32px',
          }}
        >
          {FAQS.map((item, i) => (
            <FaqRow
              key={item.id}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              isLast={i === FAQS.length - 1}
            />
          ))}
        </motion.div>

        {/* ── CTA bas ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          className="text-center"
          style={{ marginTop: '40px' }}
        >
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '16px' }}>
            Vous ne trouvez pas votre réponse\u00a0?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center font-semibold rounded-xl transition-all duration-150"
            style={{
              gap:        '8px',
              padding:    '13px 28px',
              fontSize:   '14px',
              background: '#E8622A',
              color:      '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9501E'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Poser ma question
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
