'use client'

// Source   : CONTENU-NOTRE-HISTOIRE.md
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle2, Eye, GraduationCap, MapPin, ArrowRight,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, fadeInUp } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const VALEURS = [
  {
    icon: CheckCircle2,
    titre: 'Livraison réelle',
    texte:
      "Pas de projets fantômes. Chaque site démarre et se termine dans les délais annoncés. Vous suivez l'avancement en temps réel. Vous recevez un livrable fonctionnel, pas une maquette abandonnée.",
  },
  {
    icon: Eye,
    titre: 'Transparence totale',
    texte:
      "Nos devis détaillent chaque prestation et son coût. Pas de frais cachés en cours de projet. Pas de mauvaises surprises à la livraison. Vous savez exactement ce que vous payez et pourquoi.",
  },
  {
    icon: GraduationCap,
    titre: 'Autonomie client',
    texte:
      "Votre site vous appartient vraiment. Nous incluons une formation complète pour que vous puissiez modifier vos contenus, ajouter des produits, gérer vos commandes. Sans rappeler l'agence à chaque mise à jour.",
  },
  {
    icon: MapPin,
    titre: 'Ancrage local',
    texte:
      "Basés à Dakar, nous comprenons le marché sénégalais. Paiement Wave et Orange Money acceptés. Support en français et wolof. Prix adaptés aux réalités locales. Nous construisons avec vous, pas depuis l'étranger.",
  },
]

const STATS = [
  { value: '2025', label: 'Année de fondation', note: 'Une agence nouvelle génération' },
  { value: '50+',  label: 'Projets livrés',     note: 'Sites, e-commerces, applications' },
  { value: '98%',  label: 'Clients satisfaits', note: 'Mesure post-projet' },
  { value: '24h',  label: 'Temps de réponse',   note: 'Support réactif garanti' },
]

/* ─────────────────────────────────────────────────────────────────
   SECTION 01 — HERO
   ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="section-brand"
      aria-label="À propos de Connect Web"
      style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
    >
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ maxWidth: '760px' }}
        >
          <span
            className="text-eyebrow"
            style={{ color: 'var(--color-orange-500)', marginBottom: '16px', display: 'block' }}
          >
            Notre histoire
          </span>

          <h1
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '20px',
            }}
          >
            L'agence web qui comprend le Sénégal
          </h1>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '36px',
              maxWidth: '620px',
            }}
          >
            Fondée à Dakar en 2025, Connect Web accompagne les entreprises sénégalaises dans
            leur transformation digitale. Des sites qui fonctionnent, des résultats concrets.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link
              href="/contact"
              className="font-body font-semibold transition-all duration-200"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                height: '52px', padding: '0 28px',
                background: 'var(--color-orange-500)', color: '#FFFFFF',
                borderRadius: '8px', fontSize: '15px', textDecoration: 'none',
              }}
            >
              Discutons de votre projet <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="font-body font-semibold transition-all duration-200"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                height: '52px', padding: '0 28px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                borderRadius: '8px', fontSize: '15px', textDecoration: 'none',
              }}
            >
              Découvrir nos services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 02 — ORIGINE & MISSION
   ─────────────────────────────────────────────────────────────── */
function OrigineSection() {
  return (
    <section className="section-base" aria-labelledby="origine-heading">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeInUp}
          >
            <span
              className="text-eyebrow"
              style={{ color: 'var(--color-orange-500)', marginBottom: '12px', display: 'block' }}
            >
              Origine & Mission
            </span>
            <h2
              id="origine-heading"
              className="font-heading font-bold"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              Pourquoi Connect Web existe
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                Connect Web est née d'un constat simple : trop d'entreprises sénégalaises
                peinent à trouver une agence web qui comprend leurs réalités.
              </p>
              <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                En 2025, Amadou W. Diallo fonde Connect Web à Dakar avec une mission claire :
                rendre le web professionnel accessible aux PME et startups locales. Pas de
                jargon technique inutile. Pas de projets qui traînent. Des{' '}
                <Link href="/services/site-vitrine" style={{ color: 'var(--color-orange-500)', fontWeight: 600 }}>
                  sites livrés dans les délais
                </Link>
                , optimisés pour le mobile, prêts à générer des résultats.
              </p>
              <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                Notre approche diffère des agences traditionnelles. Nous intégrons nativement
                Wave et Orange Money. Nous concevons pour le mobile d'abord, car 80% du
                trafic au Sénégal vient des smartphones. Nous formons nos clients à gérer
                leur site en autonomie.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } } }}
          >
            <div
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: '16px',
                padding: '36px',
                border: '1px solid var(--border-default)',
              }}
            >
              <p
                className="font-heading font-bold"
                style={{
                  fontSize: '14px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--color-orange-500)',
                  marginBottom: '16px',
                }}
              >
                Notre différence
              </p>
              {[
                'Intégration native Wave et Orange Money',
                'Mobile-first — 80% du trafic sénégalais',
                'Formation client incluse dans chaque projet',
                'Support en français et en wolof',
                'Prix adaptés au marché local',
                'Équipe basée à Dakar, pas à distance',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: 'var(--color-orange-500)', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span className="font-body" style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 03 — NOS VALEURS
   ─────────────────────────────────────────────────────────────── */
function ValeursSection() {
  return (
    <section className="section-alt" aria-labelledby="valeurs-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span
            className="text-eyebrow"
            style={{ color: 'var(--color-orange-500)', marginBottom: '12px', display: 'block' }}
          >
            Nos valeurs
          </span>
          <h2
            id="valeurs-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Ce qui nous guide au quotidien
          </h2>
          <p className="font-body" style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
            Quatre principes non-négociables dans chaque projet que nous acceptons.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGrid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '24px',
          }}
        >
          {VALEURS.map(({ icon: Icon, titre, texte }) => (
            <motion.article
              key={titre}
              variants={gridChild}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '28px',
              }}
            >
              <div
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(27,42,74,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Icon size={20} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
              </div>
              <h3
                className="font-heading font-bold"
                style={{
                  fontSize: 'var(--card-title-size)',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {titre}
              </h3>
              <p
                className="font-body"
                style={{
                  fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  textAlign: 'justify',
                }}
              >
                {texte}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 04 — CHIFFRES CLÉS
   ─────────────────────────────────────────────────────────────── */
function ChiffresSection() {
  return (
    <section className="section-brand" aria-labelledby="chiffres-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            id="chiffres-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Connect Web en chiffres
          </h2>
          <p className="font-body" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)' }}>
            Des résultats mesurables depuis le premier jour.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGrid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '24px',
          }}
        >
          {STATS.map(({ value, label, note }) => (
            <motion.div
              key={label}
              variants={gridChild}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <p
                className="font-heading font-bold"
                style={{ fontSize: '2.5rem', color: 'var(--color-orange-500)', lineHeight: 1.1, marginBottom: '8px' }}
              >
                {value}
              </p>
              <p className="font-body font-semibold" style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>
                {label}
              </p>
              <p className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                {note}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 05 — NOTRE VISION
   ─────────────────────────────────────────────────────────────── */
function VisionSection() {
  const etapes = [
    {
      horizon: 'Court terme',
      titre: 'Référence à Dakar',
      texte: 'Devenir la référence pour les PME qui veulent un site professionnel sans compromis sur la qualité.',
    },
    {
      horizon: 'Moyen terme',
      titre: "Afrique de l'Ouest",
      texte: "Étendre notre expertise à l'Afrique de l'Ouest francophone. Les solutions développées au Sénégal fonctionnent partout sur le continent.",
    },
    {
      horizon: 'Horizon 2030',
      titre: 'Acteur majeur continental',
      texte: "Devenir un acteur majeur du développement web en Afrique de l'Ouest. Prouver que l'excellence technique naît sur le continent.",
    },
  ]

  return (
    <section className="section-base" aria-labelledby="vision-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          style={{ maxWidth: '600px', marginBottom: '48px' }}
        >
          <span
            className="text-eyebrow"
            style={{ color: 'var(--color-orange-500)', marginBottom: '12px', display: 'block' }}
          >
            Notre vision
          </span>
          <h2
            id="vision-heading"
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Où nous allons
          </h2>
          <p className="font-body" style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Chaque projet livré nous rapproche d'un objectif : faire de Connect Web la référence
            du développement web en Afrique de l'Ouest d'ici 2030.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGrid}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {etapes.map(({ horizon, titre, texte }, i) => (
            <motion.div
              key={titre}
              variants={gridChild}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '24px',
                alignItems: 'start',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '28px',
              }}
            >
              <div
                style={{
                  width: '44px', height: '44px', flexShrink: 0,
                  borderRadius: '50%',
                  background: '#1B2A4A',
                  color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700, fontSize: '16px',
                }}
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <div>
                <p
                  className="font-body"
                  style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-orange-500)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}
                >
                  {horizon}
                </p>
                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: 'var(--card-title-size)', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}
                >
                  {titre}
                </h3>
                <p className="font-body" style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {texte}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PAGE CLIENT — composition
   ─────────────────────────────────────────────────────────────── */
export function AProposPageClient() {
  return (
    <>
      <HeroSection />
      <OrigineSection />
      <ValeursSection />
      <ChiffresSection />
      <VisionSection />
      <CTASection
        service="a-propos"
        titre="Prêt à digitaliser votre entreprise ?"
        sousTitre="Premier échange sans engagement. Réponse sous 24h."
        titreCarte="Démarrons votre projet"
        sousTitreCarte="Devis gratuit · Réponse sous 24h"
        placeholder="Décrivez votre projet ou posez vos questions..."
        intentionDefaut="Discuter mon projet"
      />
    </>
  )
}
