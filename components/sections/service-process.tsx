'use client'

// Source  : CONTENT.md > SERVICES > Section Processus de Développement (générique)
// Design  : Light theme · Timeline 6 étapes · Horizontal desktop · Vertical mobile
//           Stagger 0.2s au scroll · Ligne de progression animée scaleX
// RÈGLE N°0 CLAUDE.md v3.2 — Tout spacing via style={{}} inline

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare, PenTool, Code2, TestTube2,
  Rocket, GraduationCap, type LucideIcon,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   LOOKUP ICÔNES
   ─────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare, PenTool, Code2, TestTube2, Rocket, GraduationCap,
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface ProcessStep {
  iconName:    string
  step:        string   /* ex: "01" */
  title:       string
  description: string
  badge?:      string   /* ex: "1h · Gratuit" */
}

export interface ServiceProcessProps {
  eyebrow?:    string
  title:       string
  description?: string
  steps:       ProcessStep[]
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const EASE      = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]
const EASE_SNAP = [0.04, 0.62, 0.23, 0.98] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ProgressLine (ligne de progression animée)
   Visible desktop uniquement — scaleX 0→1 depuis la gauche
   ─────────────────────────────────────────────────────────────── */
function ProgressLine() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top:      '28px',          /* centre vertical du cercle (56px / 2) */
        left:     'calc(100% / 12)',
        right:    'calc(100% / 12)',
        height:   '2px',
        background: '#E2E8F0',
        zIndex:   0,
      }}
    >
      {/* Trait orangé animé */}
      <motion.div
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE_SNAP, delay: 0.3 }}
        style={{
          position:        'absolute',
          inset:           0,
          background:      'linear-gradient(90deg, var(--color-orange-500), var(--color-orange-400))',
          transformOrigin: 'left',
          borderRadius:    '2px',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — StepCard (desktop — vertical dans la colonne)
   ─────────────────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  total,
}: {
  step:  ProcessStep
  index: number
  total: number
}) {
  const Icon      = ICON_MAP[step.iconName] ?? Code2
  const isLast    = index === total - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.2 }}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
        position:       'relative',
        zIndex:         1,
      }}
    >
      {/* ── Cercle numéroté ── */}
      <div
        style={{
          position:       'relative',
          width:          '56px',
          height:         '56px',
          borderRadius:   '50%',
          background:     '#FFFFFF',
          border:         '2px solid var(--color-orange-500)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          boxShadow:      '0 0 0 5px rgba(232,97,26,0.08)',
          marginBottom:   '20px',
          flexShrink:     0,
        }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--color-orange-500)' }} />

        {/* Badge numéro */}
        <span
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '-6px',
            right:         '-6px',
            width:         '20px',
            height:        '20px',
            borderRadius:  '50%',
            background:    'var(--color-orange-500)',
            color:         '#FFFFFF',
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      '10px',
            display:       'flex',
            alignItems:    'center',
            justifyContent: 'center',
            lineHeight:    1,
          }}
        >
          {step.step}
        </span>
      </div>

      {/* ── Badge durée/type optionnel ── */}
      {step.badge && (
        <span
          style={{
            display:       'inline-block',
            background:    'rgba(232,97,26,0.07)',
            border:        '1px solid rgba(232,97,26,0.15)',
            borderRadius:  '100px',
            padding:       '2px 8px',
            fontFamily:    'var(--font-body)',
            fontSize:      '10px',
            fontWeight:    600,
            letterSpacing: '0.06em',
            color:         'var(--color-orange-500)',
            marginBottom:  '8px',
            whiteSpace:    'nowrap',
          }}
        >
          {step.badge}
        </span>
      )}

      {/* ── Titre ── */}
      <h3
        style={{
          fontFamily:    'var(--font-heading)',
          fontWeight:    700,
          fontSize:      'clamp(0.875rem, 1.1vw, 0.9375rem)',
          lineHeight:    1.3,
          letterSpacing: '-0.005em',
          color:         '#0A0B0E',
          marginBottom:  '8px',
        }}
      >
        {step.title}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '12.5px',
          color:      '#9CA3AF',
          lineHeight: 1.6,
          margin:     0,
          textAlign:  'justify',
        }}
      >
        {step.description}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — StepRow (mobile — layout horizontal par étape)
   ─────────────────────────────────────────────────────────────── */
function StepRow({
  step,
  index,
  isLast,
}: {
  step:   ProcessStep
  index:  number
  isLast: boolean
}) {
  const Icon = ICON_MAP[step.iconName] ?? Code2

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.12 }}
      style={{ display: 'flex', gap: '16px' }}
    >
      {/* ── Colonne gauche : cercle + trait vertical ── */}
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          flexShrink:    0,
        }}
      >
        {/* Cercle */}
        <div
          style={{
            width:          '44px',
            height:         '44px',
            borderRadius:   '50%',
            background:     '#FFFFFF',
            border:         '2px solid var(--color-orange-500)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 0 0 4px rgba(232,97,26,0.08)',
            position:       'relative',
            flexShrink:     0,
          }}
        >
          <Icon size={17} strokeWidth={1.75} style={{ color: 'var(--color-orange-500)' }} />

          {/* Badge numéro */}
          <span
            aria-hidden="true"
            style={{
              position:       'absolute',
              top:            '-5px',
              right:          '-5px',
              width:          '18px',
              height:         '18px',
              borderRadius:   '50%',
              background:     'var(--color-orange-500)',
              color:          '#FFFFFF',
              fontFamily:     'var(--font-heading)',
              fontWeight:     700,
              fontSize:       '9px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              lineHeight:     1,
            }}
          >
            {step.step}
          </span>
        </div>

        {/* Trait vertical entre les étapes */}
        {!isLast && (
          <div
            style={{
              width:      '2px',
              flexGrow:   1,
              minHeight:  '28px',
              background: 'linear-gradient(180deg, var(--color-orange-500), #E2E8F0)',
              borderRadius: '2px',
              marginTop:  '6px',
            }}
          />
        )}
      </div>

      {/* ── Colonne droite : contenu ── */}
      <div style={{ paddingBottom: isLast ? 0 : '28px', paddingTop: '2px' }}>
        {step.badge && (
          <span
            style={{
              display:       'inline-block',
              background:    'rgba(232,97,26,0.07)',
              border:        '1px solid rgba(232,97,26,0.15)',
              borderRadius:  '100px',
              padding:       '2px 8px',
              fontFamily:    'var(--font-body)',
              fontSize:      '10px',
              fontWeight:    600,
              letterSpacing: '0.06em',
              color:         'var(--color-orange-500)',
              marginBottom:  '6px',
            }}
          >
            {step.badge}
          </span>
        )}

        <h3
          style={{
            fontFamily:    'var(--font-heading)',
            fontWeight:    700,
            fontSize:      '0.9375rem',
            lineHeight:    1.3,
            letterSpacing: '-0.005em',
            color:         '#0A0B0E',
            marginBottom:  '6px',
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '13.5px',
            color:      '#9CA3AF',
            lineHeight: 1.6,
            margin:     0,
            textAlign:  'justify',
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ServiceProcess
   ─────────────────────────────────────────────────────────────── */
export function ServiceProcess({
  eyebrow = 'Notre méthode',
  title,
  description,
  steps,
}: ServiceProcessProps) {
  return (
    <section
      aria-labelledby="process-heading"
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        background:   '#F7F8FA',
        borderTop:    '1px solid #E2E8F0',
      }}
    >
      <div className="container">

        {/* ── En-tête centré ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
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

          <h2
            id="process-heading"
            style={{
              fontFamily:    'var(--font-heading)',
              fontWeight:    800,
              fontSize:      'clamp(1.625rem, 3vw, 2.25rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.03em',
              color:         '#0A0B0E',
              marginBottom:  description ? '14px' : 0,
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'clamp(0.9375rem, 1.3vw, 1rem)',
                color:      '#6B7280',
                lineHeight: 1.65,
                maxWidth:   '520px',
                margin:     '0 auto',
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* ══════ DESKTOP — Timeline horizontale ══════ */}
        <div
          className="hidden lg:block"
          style={{ position: 'relative' }}
        >
          {/* Ligne de fond grise + progression orange animée */}
          <ProgressLine />

          {/* Grille des étapes */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              gap:                 'clamp(0.5rem, 1.5vw, 1rem)',
            }}
          >
            {steps.map((step, i) => (
              <StepCard
                key={step.step}
                step={step}
                index={i}
                total={steps.length}
              />
            ))}
          </div>
        </div>

        {/* ══════ MOBILE/TABLETTE — Timeline verticale ══════ */}
        <div
          className="lg:hidden"
          style={{ maxWidth: '560px' }}
        >
          {steps.map((step, i) => (
            <StepRow
              key={step.step}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
