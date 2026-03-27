'use client'

// Source  : CONTENT.md > HOME > Section CTA Final
// Design  : section-alt (bg-#F4F6FA) · formulaire rapide · 2 colonnes desktop
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, Mail, CheckCircle, ChevronDown, Loader2, ShieldCheck } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Services (10 options)
   ─────────────────────────────────────────────────────────────── */
const SERVICES = [
  'Développement Web',
  'Développement Mobile',
  'Applications Web',
  'Applications Mobile',
  'Logiciels SaaS',
  'Intégration ERP',
  'Intégration CRM',
  'Sites E-commerce',
  'Sites Vitrine',
  'Carte de Visite NFC',
] as const

const TRUST_BADGES = [
  'Sans engagement',
  'Réponse sous 24h',
  'Premier échange offert',
]

interface FormData {
  prenom:  string
  email:   string
  service: string
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — GlassInput
   ─────────────────────────────────────────────────────────────── */
function GlassInput({
  id, label, type = 'text', placeholder, value, onChange, required,
}: {
  id: string; label: string; type?: string
  placeholder: string; value: string
  onChange: (v: string) => void; required?: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '11px',
          fontWeight:    600,
          color:         '#4A5568',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={type === 'email' ? 'email' : 'given-name'}
        className="placeholder-[#A0AEC0]"
        style={{
          width:        '100%',
          padding:      '11px 14px',
          borderRadius: '8px',
          background:   '#FAFAFA',
          border:       focused
            ? '1px solid #1B2A4A'
            : '1px solid #DDE3EE',
          outline:      'none',
          color:        '#1B2A4A',
          fontFamily:   'var(--font-body)',
          fontSize:     '14px',
          transition:   'border-color 150ms ease',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — GlassSelect
   ─────────────────────────────────────────────────────────────── */
function GlassSelect({
  id, label, value, onChange, required,
}: {
  id: string; label: string
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '11px',
          fontWeight:    600,
          color:         '#4A5568',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={{
            width:           '100%',
            padding:         '11px 40px 11px 14px',
            borderRadius:    '8px',
            background:      '#FAFAFA',
            border:          focused
              ? '1px solid #1B2A4A'
              : '1px solid #DDE3EE',
            outline:         'none',
            color:           value ? '#1B2A4A' : '#A0AEC0',
            fontFamily:      'var(--font-body)',
            fontSize:        '14px',
            appearance:      'none',
            WebkitAppearance:'none',
            cursor:          'pointer',
            transition:      'border-color 150ms ease',
          }}
        >
          <option value="" disabled style={{ color: '#A0AEC0', background: '#FFFFFF' }}>
            Sélectionner un service
          </option>
          {SERVICES.map(s => (
            <option key={s} value={s} style={{ color: '#1B2A4A', background: '#FFFFFF' }}>
              {s}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          aria-hidden="true"
          style={{
            position:      'absolute',
            right:         '12px',
            top:           '50%',
            transform:     'translateY(-50%)',
            color:         '#A0AEC0',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — SuccessState
   ─────────────────────────────────────────────────────────────── */
function SuccessState({ prenom }: { prenom: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
        padding:        '40px 28px',
        gap:            '14px',
      }}
    >
      <div
        style={{
          width:          '52px',
          height:         '52px',
          borderRadius:   '50%',
          background:     '#F0FDF4',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircle size={26} style={{ color: '#16A34A' }} aria-hidden="true" />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize:   '18px',
          color:      '#1B2A4A',
          lineHeight: 1.3,
        }}
      >
        Merci {prenom}&nbsp;!<br />On revient vers vous sous 24h.
      </p>

      <p style={{ fontSize: '13px', color: '#718096', lineHeight: 1.5 }}>
        En attendant, consultez nos réalisations.
      </p>

      <Link
        href="/portfolio"
        className="inline-flex items-center"
        style={{
          gap:            '6px',
          padding:        '9px 20px',
          borderRadius:   '8px',
          background:     '#F4F6FA',
          border:         '1px solid #DDE3EE',
          color:          '#1B2A4A',
          fontSize:       '13px',
          fontWeight:     600,
          textDecoration: 'none',
          transition:     'background 180ms ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#EEF3FA')}
        onMouseLeave={e => (e.currentTarget.style.background = '#F4F6FA')}
      >
        Voir le portfolio
        <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — CTAFinalSection
   ─────────────────────────────────────────────────────────────── */
interface CTAFinalSectionProps {
  heading?:        ReactNode
  subtitle?:       string
  defaultService?: string
}

export function CTAFinalSection({
  heading        = <>Prêt à lancer<br />votre projet&nbsp;?</>,
  subtitle       = 'Premier échange offert à Dakar — réponse sous 24h.',
  defaultService = '',
}: CTAFinalSectionProps = {}) {
  const [form, setForm]             = useState<FormData>({ prenom: '', email: '', service: defaultService })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [fieldError, setFieldError] = useState('')

  const update = (key: keyof FormData) => (val: string) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (fieldError) setFieldError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.prenom.trim() || !form.email.trim() || !form.service) {
      setFieldError('Merci de remplir tous les champs.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFieldError('Adresse email invalide.')
      return
    }
    setSubmitting(true)
    setFieldError('')
    try {
      await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          prenom:  form.prenom,
          email:   form.email,
          service: form.service,
          message: `Demande rapide depuis la home — service\u00a0: ${form.service}`,
          source:  'cta-home',
        }),
      })
      setSubmitted(true)
    } catch {
      setFieldError('Erreur réseau. Réessayez ou écrivez-nous directement.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      aria-labelledby="cta-final-heading"
      style={{ position: 'relative', overflow: 'hidden', background: '#1B2A4A', paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}
    >

      <div className="container" style={{ paddingInline: 0, position: 'relative', zIndex: 1 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap: 'clamp(2.5rem, 5vw, 5rem)' }}
        >

          {/* ── Colonne gauche — Titre + trust + liens ────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* H2 */}
            <h2
              id="cta-final-heading"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    700,
                fontSize:      'clamp(1.75rem, 2.8vw, 2.5rem)',
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                color:         '#FFFFFF',
                marginBottom:  '16px',
              }}
            >
              {heading}
            </h2>

            {/* Sous-titre */}
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontWeight:   'var(--font-light)',
                fontSize:     'clamp(1rem, 1.5vw, 1.0625rem)',
                color:        'rgba(255,255,255,0.75)',
                lineHeight:   1.65,
                marginBottom: '32px',
              }}
            >
              {subtitle}
            </p>

            {/* Trust badges */}
            <div
              className="flex flex-col"
              style={{ gap: '10px', marginBottom: '36px' }}
            >
              {TRUST_BADGES.map(badge => (
                <div
                  key={badge}
                  className="flex items-center"
                  style={{ gap: '10px' }}
                >
                  <ShieldCheck
                    size={15}
                    style={{ color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '14px',
                      fontWeight: 'var(--font-light)',
                      color:      'rgba(255,255,255,0.85)',
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Liens alternatifs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="https://wa.me/221779006282?text=Bonjour%20Connect%20Web%2C%20je%20souhaite%20discuter%20d%27un%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-fit"
                style={{
                  gap:            '10px',
                  padding:        '12px 20px',
                  borderRadius:   '10px',
                  background:     '#FFFFFF',
                  border:         '1px solid #DDE3EE',
                  color:          '#1B2A4A',
                  textDecoration: 'none',
                  fontWeight:     600,
                  fontSize:       '14px',
                  transition:     'background 180ms ease, border-color 180ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EEF3FA'; e.currentTarget.style.borderColor = '#1B2A4A' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF';  e.currentTarget.style.borderColor = '#DDE3EE' }}
              >
                <MessageCircle size={17} aria-hidden="true" />
                Démarrer sur WhatsApp
              </Link>

              <Link
                href="mailto:contact@connect-web.tech"
                className="inline-flex items-center"
                style={{
                  gap:            '8px',
                  paddingLeft:    '20px',
                  color:          'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontSize:       '13px',
                  transition:     'color 180ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <Mail size={14} aria-hidden="true" />
                contact@connect-web.tech
              </Link>
            </div>
          </motion.div>

          {/* ── Colonne droite — Formulaire glass ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <div
              style={{
                background:   '#FFFFFF',
                border:       '1px solid #DDE3EE',
                borderRadius: '16px',
                overflow:     'hidden',
                boxShadow:    'var(--shadow-md)',
              }}
            >
              {/* En-tête formulaire */}
              <div
                style={{
                  padding:      '22px 28px 18px',
                  borderBottom: '1px solid #DDE3EE',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize:   '16px',
                    color:      '#1B2A4A',
                    lineHeight: 1.3,
                  }}
                >
                  Envoyez-nous votre demande
                </p>
                <p style={{ fontSize: '13px', color: '#E8611A', marginTop: '4px', fontWeight: 500 }}>
                  On revient vers vous dans les 24h.
                </p>
              </div>

              {/* Corps */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" prenom={form.prenom} />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      style={{ padding: '24px 28px 28px' }}
                    >
                      {/* Prénom + Email */}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2"
                        style={{ gap: '12px', marginBottom: '12px' }}
                      >
                        <GlassInput
                          id="cta-prenom"
                          label="Prénom"
                          placeholder="Votre prénom"
                          value={form.prenom}
                          onChange={update('prenom')}
                          required
                        />
                        <GlassInput
                          id="cta-email"
                          label="Email"
                          type="email"
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={update('email')}
                          required
                        />
                      </div>

                      {/* Service */}
                      <div style={{ marginBottom: '20px' }}>
                        <GlassSelect
                          id="cta-service"
                          label="Service concerné"
                          value={form.service}
                          onChange={update('service')}
                          required
                        />
                      </div>

                      {/* Erreur */}
                      <AnimatePresence>
                        {fieldError && (
                          <motion.p
                            key="err"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            role="alert"
                            style={{
                              fontSize:     '13px',
                              color:        '#DC2626',
                              marginBottom: '12px',
                              fontWeight:   500,
                            }}
                          >
                            {fieldError}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Bouton submit — blanc sur fond sombre */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center"
                        style={{
                          gap:        '8px',
                          padding:    '13px 24px',
                          borderRadius:'8px',
                          background: submitting ? 'rgba(232,98,42,0.5)' : '#E8622A',
                          border:     'none',
                          color:      '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700,
                          fontSize:   '14px',
                          cursor:     submitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#C9501E'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' } }}
                        onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' } }}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Envoyer ma demande
                            <ArrowRight size={15} aria-hidden="true" />
                          </>
                        )}
                      </button>

                      {/* Note RGPD */}
                      <p
                        style={{
                          fontSize:   '11px',
                          color:      '#94A3B8',
                          textAlign:  'center',
                          marginTop:  '12px',
                          lineHeight: 1.5,
                        }}
                      >
                        Vos informations ne sont jamais partagées.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
