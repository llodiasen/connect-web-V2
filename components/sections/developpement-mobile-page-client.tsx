'use client'

// Source   : CONTENT.md > PAGE : Développement Mobile — Sections 05–12
// URL      : /services/developpement-mobile
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, ShoppingCart, Briefcase, Rocket, Heart, MessageCircle,
  Bell, WifiOff, CreditCard, MapPin, Fingerprint, BarChart2, Plug, MessageSquare,
  ArrowRight, Plus,
  Users, Eye, Wallet, Shield,
} from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────
   SECTION 05 — TYPES D'APPLICATIONS
   section-alt · 6 cards (3×2 desktop)
   ─────────────────────────────────────────────────────────────── */
const APP_TYPES = [
  {
    Icon: Smartphone,
    title: 'Cross-platform',
    text: 'Un seul code pour iOS et Android. React Native ou Flutter selon votre besoin.',
    href: '/services/applications-mobile',
    dashed: false,
  },
  {
    Icon: ShoppingCart,
    title: 'E-commerce mobile',
    text: 'Catalogue, paiement Wave/OM, suivi commande, notifications push.',
    href: '/services/sites-ecommerce',
    dashed: false,
  },
  {
    Icon: Briefcase,
    title: 'Apps métier & terrain',
    text: 'Gestion de flotte, CRM mobile, collecte données, mode hors ligne.',
    href: '/contact',
    dashed: false,
  },
  {
    Icon: Rocket,
    title: 'MVP rapide',
    text: 'Votre idée testée en 4-6 semaines. Itération rapide, budget maîtrisé.',
    href: '/contact',
    dashed: false,
  },
  {
    Icon: Heart,
    title: 'Santé & bien-être',
    text: 'Suivi patient, téléconsultation, objets connectés.',
    href: '/contact',
    dashed: false,
  },
  {
    Icon: MessageCircle,
    title: 'Un besoin spécifique ?',
    text: 'Décrivez votre projet, on vous propose la solution adaptée.',
    href: '/contact',
    dashed: true,
  },
]

function AppTypesSection() {
  return (
    <section aria-labelledby="app-types-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            id="app-types-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            Quel type d'app vous faut-il ?
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {APP_TYPES.map(({ Icon, title, text, href, dashed }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: dashed ? '#CBD5E0' : 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                border: dashed ? '1.5px dashed #CBD5E0' : '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{
                  width: '44px', height: '44px', marginBottom: '16px',
                  backgroundColor: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.08)',
                  color: dashed ? '#94A3B8' : 'var(--color-orange-500)',
                }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '20px', marginBottom: '10px' }}
              >
                {title}
              </h3>
              <p
                className="font-body font-light text-[--text-secondary] flex-grow"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
              >
                {text}
              </p>
              <Link
                href={href}
                className="inline-flex items-center font-body font-medium transition-colors duration-200"
                style={{
                  marginTop: '16px', gap: '6px', fontSize: '13px',
                  color: dashed ? '#94A3B8' : 'var(--color-blue-800)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-orange-500)' }}
                onMouseLeave={e => { e.currentTarget.style.color = dashed ? '#94A3B8' : 'var(--color-blue-800)' }}
              >
                {dashed ? 'Discuter de mon projet' : 'En savoir plus'}
                <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 06 — TECHNOLOGIES
   section-base · 3 tech cards
   ─────────────────────────────────────────────────────────────── */
const TECHS = [
  {
    name: 'React Native',
    tagline: 'Un code, deux stores',
    text: 'Idéal pour MVP, apps métier, budget maîtrisé. -40% vs natif.',
    tags: ['MVP', 'Logique métier', 'Budget'],
    highlight: true,
  },
  {
    name: 'Flutter',
    tagline: 'Design pixel-perfect',
    text: 'Interfaces visuelles riches, animations, multi-plateforme.',
    tags: ['UI riche', 'Animations', 'Multi-plateforme'],
    highlight: false,
  },
  {
    name: 'Swift / Kotlin',
    tagline: 'Puissance native',
    text: 'Accès hardware (caméra, AR, capteurs), jeux, features OS avancées.',
    tags: ['Hardware', 'AR', 'Performance critique'],
    highlight: false,
  },
]

function TechSection() {
  return (
    <section aria-labelledby="tech-heading" className="section-base">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '16px', textAlign: 'center' }}
        >
          <h2
            id="tech-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A', marginBottom: '12px',
            }}
          >
            La bonne techno pour le bon projet
          </h2>
          <p
            className="font-body text-[--text-secondary]"
            style={{ fontSize: '15px', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 48px' }}
          >
            Le choix technique est une décision business. On recommande ce qui maximise votre ROI.
          </p>
        </motion.div>

        {/* marginTop: 12px sur le wrapper pour laisser place au badge "Recommandé" sur toutes les cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '24px', alignItems: 'stretch', marginTop: '12px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {TECHS.map(({ name, tagline, text, tags, highlight }) => (
            <motion.div
              key={name}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: highlight ? '0 20px 56px rgba(27,42,74,0.18), 0 6px 16px rgba(27,42,74,0.10)' : '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: highlight ? 'rgba(232,97,26,0.5)' : 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#FFFFFF',
                border: highlight ? '2px solid #1B2A4A' : '1px solid #E2E8F0',
                borderRadius: '16px',
                /* paddingTop uniforme pour toutes les cards = espace badge (12px) + padding normal */
                padding: '40px 28px 28px',
                boxShadow: highlight ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Badge "Recommandé" — uniquement sur React Native */}
              {highlight && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: '#1B2A4A', color: '#FFFFFF',
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  padding: '3px 12px', borderRadius: '100px', whiteSpace: 'nowrap',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  Recommandé
                </div>
              )}
              <div
                className="font-heading font-bold"
                style={{ fontSize: '20px', color: '#1B2A4A', marginBottom: '4px' }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 600,
                  color: 'var(--color-orange-500)', marginBottom: '12px',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}
              >
                {tagline}
              </div>
              <p
                className="font-body text-[--text-secondary]"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify', marginBottom: '20px', flexGrow: 1 }}
              >
                {text}
              </p>
              <div className="flex flex-wrap" style={{ gap: '6px' }}>
                {tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                      color: '#4A5568', background: '#F7F8FA',
                      border: '1px solid #E2E8F0', borderRadius: '6px',
                      padding: '3px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
          className="text-center"
          style={{ marginTop: '36px' }}
        >
          <p
            className="font-body text-[--text-secondary]"
            style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6 }}
          >
            Besoin d'aide pour choisir ?{' '}
            <Link
              href="/contact"
              style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', fontWeight: 600 }}
            >
              On analyse votre projet gratuitement.
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 07 — FONCTIONNALITÉS
   section-alt · 8 feature cards (4×2 desktop)
   ─────────────────────────────────────────────────────────────── */
const FEATURES = [
  { Icon: Bell,         title: 'Push intelligents',  benefit: 'Rétention ×3',       text: 'Bon message, bon moment, bon utilisateur.' },
  { Icon: WifiOff,      title: 'Mode hors ligne',    benefit: 'Zéro frustration',   text: 'Fonctionne sans réseau, sync auto au retour.' },
  { Icon: CreditCard,   title: 'Paiement mobile',    benefit: 'Wave & OM natifs',   text: 'Wave, Orange Money, Free Money, Stripe.' },
  { Icon: MapPin,       title: 'Géolocalisation',    benefit: 'Contextuel',         text: 'Store locator, tracking, suggestions locales.' },
  { Icon: Fingerprint,  title: 'Auth sécurisée',     benefit: 'Confiance',          text: 'Biométrie, SSO, 2FA.' },
  { Icon: BarChart2,    title: 'Analytics',          benefit: 'Data-driven',        text: 'KPI temps réel, comportement, entonnoirs.' },
  { Icon: Plug,         title: 'Intégration API',    benefit: 'Connecté',           text: 'ERP, CRM, paiement, bases existantes.' },
  { Icon: MessageSquare,title: 'Chat in-app',        benefit: 'Engagement',         text: 'Communication users/support, notifs temps réel.' },
]

function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            id="features-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            Ce que votre app peut faire
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '16px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {FEATURES.map(({ Icon, title, benefit, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{
                  width: '44px', height: '44px', marginBottom: '14px',
                  backgroundColor: 'rgba(232,97,26,0.08)',
                  color: 'var(--color-orange-500)',
                }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <div
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  color: 'var(--color-orange-500)', letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '6px',
                }}
              >
                {benefit}
              </div>
              <h3
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '20px', marginBottom: '8px' }}
              >
                {title}
              </h3>
              <p
                className="font-body text-[--text-secondary]"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6, textAlign: 'justify' }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 08 — PROCESSUS ROADMAP
   section-base · timeline horizontale desktop / verticale mobile
   ─────────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { num: '1', title: 'Analyse UX',    duree: '1 sem',     text: 'Parcours utilisateur, wireframes mobile.',           implication: 'haute'   },
  { num: '2', title: 'Design UI',     duree: '1-2 sem',   text: 'Maquettes Figma HD, design system mobile.',          implication: 'haute'   },
  { num: '3', title: 'Développement', duree: '4-8 sem',   text: 'Sprints 2 semaines, preview TestFlight/APK.',        implication: 'moyenne' },
  { num: '4', title: 'Tests QA',      duree: '1-2 sem',   text: 'Appareils réels iOS & Android, 10+ devices.',        implication: 'faible'  },
  { num: '5', title: 'Publication',   duree: '3-7 jours', text: 'Soumission stores, validation, lancement.',          implication: 'faible'  },
  { num: '6', title: 'Support',       duree: 'continu',   text: 'Mises à jour, corrections, nouvelles features.',     implication: 'moyenne' },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication' },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée' },
  faible:  { color: '#16A34A', bg: 'rgba(22,163,74,0.08)',  label: 'Faible implication' },
}

function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="section-base">
      <div className="container">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--color-orange-500)', marginBottom: '12px',
          }}>
            Notre méthode
          </p>
          <h2
            id="process-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            De l'idée au lancement
          </h2>
        </motion.div>

        {/* ═══ DESKTOP ROADMAP (lg+) — ligne horizontale ═══ */}
        <div className="hidden lg:block">

          {/* Connecteurs + cercles */}
          <div style={{ position: 'relative', marginBottom: '32px' }}>

            {/* Ligne de fond (grise) */}
            <div style={{
              position: 'absolute',
              top: '28px', left: 'calc(100% / 12)', right: 'calc(100% / 12)',
              height: '2px', background: '#E2E8F0', zIndex: 0,
            }} />

            {/* Ligne de progression orange (animée) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '28px', left: 'calc(100% / 12)', right: 'calc(100% / 12)',
                height: '2px',
                background: 'linear-gradient(90deg, var(--color-orange-500) 0%, #3B82F6 60%, #16A34A 100%)',
                zIndex: 0, transformOrigin: 'left center',
              }}
            />

            {/* Cercles numérotés */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', position: 'relative', zIndex: 1 }}>
              {PROCESS_STEPS.map(({ num, implication }, i) => {
                const cfg = IMPLICATION_CONFIG[implication]
                return (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {/* Cercle */}
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: '#FFFFFF',
                      border: `2px solid ${cfg.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 0 6px ${cfg.bg}, var(--shadow-sm)`,
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 800,
                        fontSize: '18px', color: cfg.color, lineHeight: 1,
                      }}>
                        {num}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Cards sous les cercles */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {PROCESS_STEPS.map(({ num, title, duree, text, implication }, i) => {
              const cfg = IMPLICATION_CONFIG[implication]
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.4 + i * 0.1 }}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderTop: `3px solid ${cfg.color}`,
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Durée — même style que benefit label dans FeaturesSection */}
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                    color: cfg.color, letterSpacing: '0.06em',
                    textTransform: 'uppercase', marginBottom: '6px',
                  }}>
                    {duree}
                  </div>

                  <h3
                    className="font-heading font-bold text-[--text-primary]"
                    style={{ fontSize: '20px', marginBottom: '8px', lineHeight: 1.3 }}
                  >
                    {title}
                  </h3>

                  <p
                    className="font-body text-[--text-secondary]"
                    style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6, textAlign: 'justify', marginBottom: '12px' }}
                  >
                    {text}
                  </p>

                  {/* Badge implication */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500,
                    color: '#94A3B8',
                  }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: cfg.color, flexShrink: 0,
                    }} />
                    {cfg.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ═══ MOBILE ROADMAP (< lg) — ligne verticale ═══ */}
        <div className="lg:hidden" style={{ position: 'relative' }}>

          {/* Ligne verticale de fond */}
          <div style={{
            position: 'absolute',
            top: '28px', bottom: '28px', left: '27px',
            width: '2px', background: '#E2E8F0', zIndex: 0,
          }} />

          {/* Ligne verticale de progression */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '28px', bottom: '28px', left: '27px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--color-orange-500) 0%, #3B82F6 60%, #16A34A 100%)',
              zIndex: 0, transformOrigin: 'top center',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {PROCESS_STEPS.map(({ num, title, duree, text, implication }, i) => {
              const cfg = IMPLICATION_CONFIG[implication]
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.1 }}
                  className="flex items-start"
                  style={{ gap: '20px', position: 'relative', zIndex: 1 }}
                >
                  {/* Cercle */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                    background: '#FFFFFF',
                    border: `2px solid ${cfg.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 0 6px ${cfg.bg}, var(--shadow-sm)`,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontWeight: 800,
                      fontSize: '18px', color: cfg.color, lineHeight: 1,
                    }}>
                      {num}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderLeft: `3px solid ${cfg.color}`,
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    marginTop: '4px',
                  }}>
                    <div className="flex flex-wrap items-center" style={{ gap: '8px', marginBottom: '8px' }}>
                      <h3
                        className="font-heading font-bold text-[--text-primary]"
                        style={{ fontSize: '20px' }}
                      >
                        {title}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
                        color: cfg.color, background: cfg.bg,
                        padding: '2px 10px', borderRadius: '100px',
                      }}>
                        {duree}
                      </span>
                    </div>
                    <p
                      className="font-body text-[--text-secondary]"
                      style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.6, textAlign: 'justify', marginBottom: '10px' }}
                    >
                      {text}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                      color: '#94A3B8',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: cfg.color, flexShrink: 0,
                      }} />
                      {cfg.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 09 — POURQUOI NOUS FAIRE CONFIANCE
   section-alt · stats + garanties
   ─────────────────────────────────────────────────────────────── */
const TRUST_STATS = [
  { value: '50+',  label: 'projets livrés',            sub: 'depuis 2021' },
  { value: '98%',  label: 'clients satisfaits',         sub: 'sur l\'ensemble des projets' },
  { value: '3+',   label: 'ans d\'expérience mobile',  sub: 'iOS, Android & cross-platform' },
  { value: '24h',  label: 'délai de réponse',          sub: 'garanti' },
]


function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--color-orange-500)', marginBottom: '12px',
          }}>
            Preuves
          </p>
          <h2
            id="trust-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            Pourquoi nous faire confiance
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '24px', marginBottom: '48px' }}
        >
          {TRUST_STATS.map(({ value, label, sub }) => (
            <div
              key={label}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="font-heading font-bold"
                style={{ fontSize: '36px', color: 'var(--color-orange-500)', lineHeight: 1, marginBottom: '6px' }}
              >
                {value}
              </div>
              <div
                className="font-body font-semibold text-[--text-primary]"
                style={{ fontSize: '13px', marginBottom: '4px' }}
              >
                {label}
              </div>
              <div
                className="font-body text-[--text-tertiary]"
                style={{ fontSize: '11px' }}
              >
                {sub}
              </div>
            </div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 10 — POURQUOI CONNECT WEB
   section-base · 6 arguments 3×2
   ─────────────────────────────────────────────────────────────── */
const DIFF_ITEMS = [
  { Icon: MapPin,   title: 'Basés à Dakar',          text: 'On connaît votre marché, vos utilisateurs, vos contraintes réseau.' },
  { Icon: Users,    title: 'Équipe senior',           text: 'Pas de juniors sur votre projet. Développeurs expérimentés uniquement.' },
  { Icon: Eye,      title: 'Transparence totale',     text: 'Accès au code, au backlog et aux démos à chaque sprint.' },
  { Icon: Wallet,   title: 'Wave & OM en standard',   text: 'Paiement mobile africain intégré nativement, pas en option.' },
  { Icon: WifiOff,  title: 'Offline-first',           text: 'Apps conçues pour fonctionner avec une connexion limitée.' },
  { Icon: Shield,   title: 'Support post-lancement',  text: 'On reste après la livraison. Mises à jour, corrections, évolutions.' },
]

function DifferenceSection() {
  return (
    <section aria-labelledby="difference-heading" className="section-base">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            id="difference-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            Ce qui fait la différence
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {DIFF_ITEMS.map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{
                  width: '44px', height: '44px', marginBottom: '16px',
                  backgroundColor: 'rgba(26,42,74,0.06)',
                  color: '#1B2A4A',
                }}
              >
                <Icon size={20} aria-hidden="true" />
              </motion.div>
              <h3
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '20px', marginBottom: '10px' }}
              >
                {title}
              </h3>
              <p
                className="font-body text-[--text-secondary]"
                style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 11 — FAQ
   section-alt · accordion 7 questions
   ─────────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'Dois-je faire une app native ou cross-platform ?',
    a: 'Pour 90% des projets, React Native ou Flutter suffisent. Performances quasi-natives, coût divisé par deux. On conseille selon votre budget et délai.',
  },
  {
    q: 'Mon app fonctionnera-t-elle sans internet ?',
    a: 'Oui. On développe en offline-first — adapté aux zones à connectivité limitée. Sync auto au retour du réseau.',
  },
  {
    q: 'Budget pour une application mobile ?',
    a: 'À partir de 600 000 FCFA pour un MVP. App métier complète : 1,5M à 5M FCFA. Devis gratuit après premier échange.',
    link: { text: 'Voir nos tarifs', href: '/tarifs' },
  },
  {
    q: 'Peut-on intégrer Wave et Orange Money ?',
    a: "Oui, c'est notre spécialité. Intégrés en standard sur tous nos projets.",
  },
  {
    q: 'Combien de temps pour publier sur les stores ?',
    a: 'Apple : 1-3 jours. Google Play : 2-7 jours. On gère toute la soumission.',
  },
  {
    q: "Le code m'appartient ?",
    a: 'Oui. 100% du code source vous appartient dès le jour 1. Hébergé sur votre repo GitHub/GitLab.',
  },
  {
    q: 'Proposez-vous un support après livraison ?',
    a: 'Oui. Support inclus 30 jours. Contrats maintenance disponibles pour le long terme.',
  },
]

function FaqMobileSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section aria-labelledby="faq-mobile-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            id="faq-mobile-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.25,
              letterSpacing: '-0.02em', color: '#1B2A4A',
            }}
          >
            Questions fréquentes
          </h2>
        </motion.div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {FAQ_ITEMS.map(({ q, a, link }, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
              style={{
                borderBottom: '1px solid #E2E8F0',
                marginBottom: i === FAQ_ITEMS.length - 1 ? 0 : undefined,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left"
                style={{
                  padding: '20px 0',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  gap: '16px',
                }}
                aria-expanded={openIndex === i}
              >
                <h3
                  className="font-heading font-bold text-[--text-primary]"
                  style={{ fontSize: 'var(--faq-question-size)', lineHeight: 1.4 }}
                >
                  {q}
                </h3>
                <span
                  style={{
                    flexShrink: 0, color: 'var(--color-orange-500)',
                    transition: 'transform 200ms ease',
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <Plus size={18} aria-hidden="true" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingBottom: '20px' }}>
                      <p
                        className="font-body text-[--text-secondary]"
                        style={{ fontSize: 'var(--faq-answer-size)', lineHeight: 1.7, textAlign: 'justify' }}
                      >
                        {a}
                        {link && (
                          <>
                            {' '}
                            <Link
                              href={link.href}
                              style={{
                                color: 'var(--color-orange-500)',
                                textDecoration: 'underline', fontWeight: 600,
                              }}
                            >
                              {link.text}
                            </Link>
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPORT — Sections 05–12 de la page Développement Mobile
   ─────────────────────────────────────────────────────────────── */
export function DeveloppementMobilePageClient() {
  return (
    <>
      {/* 05 Types d'apps    → section-alt  */}
      <AppTypesSection />
      {/* 06 Technologies    → section-base */}
      <TechSection />
      {/* 07 Fonctionnalités → section-alt  */}
      <FeaturesSection />
      {/* 08 Processus       → section-base */}
      <ProcessSection />
      {/* 09 Preuves         → section-alt  */}
      <TrustSection />
      {/* 10 Différences     → section-base */}
      <DifferenceSection />
      {/* 11 FAQ             → section-alt  */}
      <FaqMobileSection />
      {/* 12 CTA Final       → section-brand */}
      <CTASection
        service="developpement-mobile"
        titre="Construisons votre app mobile ensemble"
        sousTitre="Premier échange offert à Dakar — réponse sous 24h."
        titreCarte="Construisons votre app mobile ensemble"
        sousTitreCarte="Premier échange offert — réponse sous 24h."
        placeholder="Type d'app, fonctionnalités clés, cible utilisateurs, iOS/Android/les deux..."
        intentionDefaut="Obtenir un devis"
      />
    </>
  )
}
