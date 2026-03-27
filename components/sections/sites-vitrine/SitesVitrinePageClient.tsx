'use client'

// Source   : CONTENT.md > PAGE : Sites Vitrine
// URL      : /services/sites-vitrine
// REFONTE  : REFONTE-VITRINE.md — 11 sections
// RÈGLE N°0 CLAUDE.md v4.0 — Tout spacing via style={{}} inline
// Typo de référence : logiciels-saas (clamp H2, 20px H3, font-body text-secondary)

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Root    as AccordionRoot,
  Item    as AccordionItem,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from '@radix-ui/react-accordion'
import {
  PenOff, Smartphone, SearchX, Lock,
  Palette, Layout, Pencil, Search, MessageSquare, Globe,
  Gauge, BarChart2, Shield, Languages, GraduationCap, Headphones,
  Clock, MapPin, DollarSign,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react'
import { EASE, VIEWPORT, staggerGrid, gridChild, iconHover } from '@/lib/motion'
import { CTASection } from '@/components/sections/CTASection'

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES ANIMATION
   ─────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity:    1,
    y:          0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
}

/* ─────────────────────────────────────────────────────────────────
   HELPERS TYPOGRAPHIE — identiques à logiciels-saas
   ─────────────────────────────────────────────────────────────── */
const H2_STYLE: React.CSSProperties = {
  fontSize:      'clamp(1.25rem, 2.5vw, 2rem)',
  lineHeight:    1.25,
  letterSpacing: '-0.02em',
  color:         '#1B2A4A',
}

const EYEBROW_STYLE: React.CSSProperties = {
  fontFamily:    'var(--font-body)',
  fontSize:      '11px',
  fontWeight:    600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         'var(--color-orange-500)',
  marginBottom:  '12px',
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ─────────────────────────────────────────────────────────────── */
const PROBLEMS = [
  {
    icon:  PenOff,
    title: 'Design vieilli ou générique',
    text:  'Votre site vitrine ressemble à un template. Vos prospects ne perçoivent pas le sérieux de votre entreprise.',
  },
  {
    icon:  Smartphone,
    title: 'Illisible sur mobile',
    text:  'Plus de 60% du trafic sénégalais est mobile. Un site vitrine non responsive perd la majorité de ses visiteurs.',
  },
  {
    icon:  SearchX,
    title: 'Introuvable sur Google',
    text:  'Pas de SEO, pas de sitemap, pas de balises. Votre site web professionnel est invisible.',
  },
  {
    icon:  Lock,
    title: 'Impossible à mettre à jour',
    text:  "Pour changer un texte ou une photo, vous devez appeler un développeur. Pas d'autonomie sur votre site vitrine.",
  },
]

const PILLARS = [
  {
    num:   '01',
    title: 'Design unique',
    text:  'Pas de template retouché. Votre site vitrine professionnel est conçu à partir de votre identité visuelle. Il vous ressemble.',
  },
  {
    num:   '02',
    title: 'Lighthouse 95+ garanti',
    text:  'Performance, accessibilité, SEO — tout vert. Votre site vitrine charge vite, partout, y compris sur mobile.',
  },
  {
    num:   '03',
    title: 'CMS pour votre autonomie',
    text:  'Sanity ou Strapi intégré. Vous modifiez textes et images seul. Formation 1h incluse pour votre site web.',
  },
]

const INCLUDES = [
  { icon: Palette,       title: 'Design unique',          text: 'Pas de template. Site vitrine conçu à partir de votre charte graphique et votre identité.',                      link: undefined, dashed: false },
  { icon: Layout,        title: '5 à 10 pages',           text: 'Accueil, à propos, services, portfolio, contact — les pages essentielles de votre site web professionnel.',        link: undefined, dashed: false },
  { icon: Pencil,        title: 'CMS intégré',            text: 'Modifiez textes et images seul. Aucune compétence technique requise.',                                            link: undefined, dashed: false },
  { icon: Search,        title: 'SEO de base',            text: 'Meta tags, sitemap, vitesse, schema.org. Votre site vitrine trouvable sur Google.',                               link: undefined, dashed: false },
  { icon: MessageSquare, title: 'WhatsApp intégré',        text: 'Bouton WhatsApp + formulaire de contact. Vos clients vous joignent en 1 clic.',                                  link: undefined, dashed: false },
  { icon: Globe,         title: 'Hébergement 1ère année', text: 'Vercel + domaine + SSL tout inclus. Votre site vitrine en ligne sans frais cachés.',                              link: undefined, dashed: false },
]

const FEATURES = [
  { icon: Gauge,         title: 'Lighthouse 95+',   benefit: 'Rapide',         text: "Performance garantie. Votre site vitrine charge en moins d'1 seconde.",             link: undefined },
  { icon: Smartphone,    title: 'Mobile-first',      benefit: 'Responsive',     text: 'Testé sur 10+ appareils. Parfait sur Samsung, iPhone, Tecno.',                       link: undefined },
  { icon: Search,        title: 'SEO technique',     benefit: 'Trouvable',      text: 'Sitemap, schema.org, Core Web Vitals verts pour votre site web.',                    link: undefined },
  { icon: BarChart2,     title: 'Google Analytics',  benefit: 'Data',           text: "GA4 configuré. Vous savez d'où viennent vos visiteurs.",                            link: undefined },
  { icon: Shield,        title: 'SSL + sécurité',    benefit: 'Confiance',      text: 'Certificat SSL, headers sécurisés, RGPD.',                                           link: undefined },
  { icon: Languages,     title: 'Multilingue',       benefit: 'International',  text: 'Français, anglais, wolof si besoin. i18n natif.',                                    link: undefined },
  { icon: GraduationCap, title: 'Formation 1h',      benefit: 'Autonomie',      text: 'Vous modifiez votre site vitrine seul après la formation.',                          link: undefined },
  { icon: Headphones,    title: 'Support 30j',       benefit: 'Sérénité',       text: 'Corrections et ajustements inclus post-lancement.',                                  link: undefined },
]

const PROCESS_STEPS = [
  { num: 1, title: 'Brief',        duration: '1 jour',   text: 'Objectifs, pages, contenu, identité pour votre site vitrine.',                    implication: 'haute'   },
  { num: 2, title: 'Design',       duration: '2-3 jours',text: 'Maquettes Figma desktop et mobile de votre site web professionnel.',             implication: 'haute'   },
  { num: 3, title: 'Développement',duration: '3-5 jours',text: 'Intégration Next.js, CMS, responsive.',                                         implication: 'faible'  },
  { num: 4, title: 'Contenu',      duration: '1-2 jours',text: 'Intégration textes, images, optimisation.',                                      implication: 'moyenne' },
  { num: 5, title: 'Tests & SEO',  duration: '1 jour',   text: 'Lighthouse, mobile, SEO, cross-browser.',                                        implication: 'faible'  },
  { num: 6, title: 'Lancement',    duration: '1 jour',   text: 'Go-live, formation 1h CMS, support 30j activé.',                                 implication: 'haute'   },
]

const IMPLICATION_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  haute:   { color: '#E8611A', bg: 'rgba(232,97,26,0.08)',  label: 'Forte implication'     },
  moyenne: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Implication modérée'   },
  faible:  { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  label: 'Faible implication'    },
}

const GUARANTEES = [
  'Lighthouse 95+ garanti',
  'Design unique (pas de template)',
  'CMS + formation 1h',
  'Hébergement 1ère année',
  'SEO inclus',
  'Support 30j',
]

const DIFFERENTIATORS = [
  { icon: Palette,    title: 'Design unique',         text: 'Pas de template retouché. Site vitrine professionnel conçu pour votre marque.'                    },
  { icon: Gauge,      title: 'Lighthouse 95+',        text: 'Performance garantie. Création site vitrine aux standards internationaux.'                        },
  { icon: Clock,      title: 'Livré en 1-2 semaines', text: 'Process rodé. Brief → design → dev → live. Record : 3 jours pour 5 pages.'                       },
  { icon: Pencil,     title: 'CMS pour vous',         text: 'Modifiez votre site web professionnel seul. Formation incluse.'                                   },
  { icon: MapPin,     title: 'Basés à Dakar',         text: 'Agence création site vitrine au Sénégal. WhatsApp, réunions en personne.'                         },
  { icon: DollarSign, title: 'À partir de 350k FCFA', text: 'Prix site vitrine compétitif. Devis gratuit et détaillé.'                                         },
]

const FAQ_ITEMS = [
  {
    q:    'Combien coûte un site vitrine à Dakar ?',
    a:    'À partir de 350 000 FCFA. Le prix du site vitrine dépend du nombre de pages et des fonctionnalités.',
    link: { href: '/tarifs', label: 'Voir les tarifs →' },
  },
  { q: 'Puis-je avoir mon site vitrine en 1 semaine ?',   a: 'Oui, si vous fournissez rapidement textes et images. Plus vous êtes réactif, plus on livre vite. Record : 3 jours pour 5 pages.',                                               link: undefined },
  { q: "En quoi c'est différent d'un template ?",         a: 'Un template est utilisé par des milliers de sites. Votre site vitrine professionnel est conçu à partir de votre identité visuelle. Il vous ressemble.',                          link: undefined },
  { q: 'Pourrai-je modifier le site seul ?',               a: 'Oui. CMS intégré (Sanity ou Strapi) + formation 1h incluse. Zéro compétence technique pour votre site web.',                                                                   link: undefined },
  { q: "L'hébergement est-il inclus ?",                   a: 'Oui. Hébergement Vercel + domaine + SSL inclus première année pour votre site vitrine.',                                                                                        link: undefined },
  {
    q:    'Et si je veux ajouter une boutique plus tard ?',
    a:    'Architecture évolutive. Vous pouvez ajouter un blog, une boutique en ligne ou un espace client à tout moment.',
    link: { href: '/services/sites-ecommerce', label: 'Voir nos sites e-commerce →' },
  },
  { q: 'Le SEO est-il inclus ?',                          a: 'Oui. Meta tags, sitemap, schema.org, Core Web Vitals — SEO de base inclus dans chaque site vitrine.',                                                                           link: undefined },
]

/* Données social proof — compteurs animés */
const SP_METRICS: { target: number; suffix: string; label: string; displayValue?: string }[] = [
  { target: 50, suffix: '+',    label: 'Projets livrés'    },
  { target: 98, suffix: '%',    label: 'Clients satisfaits' },
  { target: 2,  suffix: ' sem', label: 'Délai de livraison', displayValue: '1-2 sem' },
  { target: 95, suffix: '+',    label: 'Score Lighthouse'  },
]
const LOGO_WIDTHS = [140, 110, 125, 95, 130, 105]

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Compteur animé
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const duration  = 1400
    const startTime = performance.now()
    function step(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function SocialProofSection() {
  return (
    <section className="section-base" style={{ paddingTop: '3rem' }}>
      <div className="container">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-heading font-bold"
          style={{
            textAlign: 'center', color: 'var(--text-primary)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          Ils nous font confiance pour leur site vitrine
        </motion.h2>

        {/* Grille métriques avec diviseurs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'var(--border-default)',
            border: '1px solid var(--border-default)', borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {SP_METRICS.map(({ target, suffix, label, displayValue }) => (
            <div
              key={label}
              style={{
                background: '#FFFFFF',
                padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
                textAlign: 'center', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
              }}
            >
              <span
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1,
                  letterSpacing: '-0.04em', color: 'var(--color-orange-500)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {displayValue ?? <AnimatedCounter target={target} suffix={suffix} />}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: 'var(--text-secondary)', letterSpacing: '0.01em',
              }}>
                {label}
              </span>
              <span aria-hidden="true" style={{
                display: 'block', width: '24px', height: '2px',
                background: 'var(--color-orange-500)', borderRadius: '2px',
                marginTop: '2px', opacity: 0.4,
              }} />
            </div>
          ))}
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
            color: 'var(--text-tertiary)', letterSpacing: '0.08em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px',
          }}>
            ILS NOUS FONT CONFIANCE
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {LOGO_WIDTHS.map((w, i) => (
              <div key={i} aria-hidden="true" style={{
                width: `${w}px`, height: '36px',
                background: '#F1F3F7', borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
              }} />
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.6,
          }}>
            Entreprises, startups et indépendants au Sénégal et en Afrique de l&apos;Ouest.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 01 · HERO — mockup site vitrine
   ═══════════════════════════════════════════════════════════════ */
function SiteVitrineMockup() {
  return (
    <div aria-hidden="true" style={{
      background: 'linear-gradient(145deg, #161B27 0%, #0D1117 100%)',
      border: '1px solid #1E2535', borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
    }}>
      {/* Browser bar */}
      <div style={{
        background: '#161B27', borderBottom: '1px solid #1E2535',
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '5px', marginRight: '8px' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: '22px', background: '#0D1117', borderRadius: '5px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#4B5563', fontSize: '11px', fontFamily: 'var(--font-body)' }}>
            votre-entreprise.sn
          </span>
        </div>
      </div>
      {/* Website content */}
      <div style={{ background: '#FFFFFF' }}>
        {/* Nav */}
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid #F1F3F7',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ width: '70px', height: '16px', background: '#1B2A4A', borderRadius: '4px', opacity: 0.8 }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            {[50, 40, 55, 45].map((w, i) => (
              <div key={i} style={{ width: `${w}px`, height: '10px', background: '#E2E8F0', borderRadius: '3px' }} />
            ))}
          </div>
          <div style={{ width: '80px', height: '24px', background: '#E8611A', borderRadius: '5px', opacity: 0.9 }} />
        </div>
        {/* Hero */}
        <div style={{ padding: '20px 16px', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)' }}>
          <div style={{ width: '55%', height: '12px', background: '#1B2A4A', borderRadius: '4px', marginBottom: '8px', opacity: 0.85 }} />
          <div style={{ width: '75%', height: '8px', background: '#CBD5E0', borderRadius: '3px', marginBottom: '5px' }} />
          <div style={{ width: '60%', height: '8px', background: '#CBD5E0', borderRadius: '3px', marginBottom: '14px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '90px', height: '24px', background: '#1B2A4A', borderRadius: '5px' }} />
            <div style={{ width: '80px', height: '24px', background: 'transparent', border: '1.5px solid #CBD5E0', borderRadius: '5px' }} />
          </div>
        </div>
        {/* Cards row */}
        <div style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
          {[['#E8611A', 'Design'], ['#1B2A4A', 'SEO'], ['#22C55E', 'CMS']].map(([color, label]) => (
            <div key={label} style={{
              flex: 1, padding: '10px', borderRadius: '6px',
              border: '1px solid #E2E8F0', background: '#FAFAFA',
            }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: color, opacity: 0.15, marginBottom: '6px' }} />
              <div style={{ width: '100%', height: '8px', background: '#1B2A4A', borderRadius: '3px', marginBottom: '4px', opacity: 0.7 }} />
              <div style={{ width: '80%', height: '6px', background: '#CBD5E0', borderRadius: '3px' }} />
            </div>
          ))}
        </div>
        {/* Lighthouse score */}
        <div style={{
          margin: '0 16px 12px', padding: '8px 12px', borderRadius: '6px',
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', fontFamily: 'var(--font-heading)' }}>97</span>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#15803D', fontFamily: 'var(--font-body)' }}>Lighthouse Performance</div>
            <div style={{ fontSize: '9px', color: '#86EFAC', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Excellent · Mobile + Desktop</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const pills = [
    { icon: Clock,  label: '1-2 semaines',  delay: 0,   position: { top: '-18px', right: '6%' } as React.CSSProperties },
    { icon: Gauge,  label: 'Lighthouse 95+', delay: 1.2, position: { bottom: '30%', left: '-24px' } as React.CSSProperties },
    { icon: Search, label: 'SEO inclus',    delay: 2.4, position: { bottom: '-18px', right: '10%' } as React.CSSProperties },
  ]

  return (
    <section className="hero-bg" style={{ paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}>
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: '20px' }}>
              <span style={EYEBROW_STYLE}>Service · Sites Vitrine</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F9FAFB', marginBottom: '20px' }}
            >
              Un site vitrine<br />professionnel qui donne<br />
              <span style={{ color: 'var(--color-orange-500)' }}>envie de vous contacter.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.65, marginBottom: '32px', maxWidth: '520px' }}
            >
              Design sur mesure, Lighthouse 95+, SEO optimisé. Création site vitrine à Dakar en 1-2 semaines.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 500, color: '#CBD5E0',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '6px 14px',
              }}>
                Livré en 1-2 semaines · SEO inclus · Mobile-first
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href="/contact?service=sites-vitrine"
                className="font-body font-semibold"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  height: '52px', padding: '0 32px',
                  background: '#E8622A', color: '#FFFFFF',
                  fontSize: '15px', borderRadius: '8px', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C9501E'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 12px rgba(232, 98, 42, 0.30)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#E8622A'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              >
                Créer mon site vitrine <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="font-body font-semibold"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  height: '52px', padding: '0 24px',
                  background: 'transparent', color: '#F9FAFB',
                  fontSize: '15px', borderRadius: '8px', textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.12)'; el.style.borderColor = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                Voir nos réalisations
              </Link>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <SiteVitrineMockup />
            {pills.map(({ icon: Icon, label, delay, position }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
                style={{
                  position: 'absolute', display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '9999px',
                  padding: '7px 14px 7px 8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 10,
                  ...position,
                }}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'rgba(232,97,26,0.12)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--color-orange-500)', flexShrink: 0,
                }}>
                  <Icon size={12} aria-hidden="true" />
                </div>
                <span className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: '#1B2A4A', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 03 · PROBLÈMES
   ═══════════════════════════════════════════════════════════════ */
function ProblemsSection() {
  return (
    <section aria-labelledby="problems-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <p style={EYEBROW_STYLE}>Vos défis</p>
          <h2
            id="problems-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Votre image en ligne ne vous représente pas
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
          {PROBLEMS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                padding: '28px',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                background: '#FFFFFF', boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
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

/* ═══════════════════════════════════════════════════════════════
   SECTION 04 · APPROCHE
   ═══════════════════════════════════════════════════════════════ */
function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="section-brand">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ ...EYEBROW_STYLE }}>NOTRE MÉTHODE</p>
          <h2
            id="approach-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE, color: '#F9FAFB' }}
          >
            Un site vitrine sur mesure, livré en 1-2 semaines
          </h2>
        </motion.div>

        {/* ── Process roadmap ── */}
        <div className="flex flex-col md:flex-row" style={{ alignItems: 'flex-start' }}>
          {PILLARS.map(({ num, title, text }, i) => (
            <div key={num} style={{ flex: 1, display: 'contents' }}>

              {/* Step */}
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                {/* Number circle */}
                <div
                  className="font-heading font-bold"
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(232, 97, 26, 0.12)',
                    border: '1px solid rgba(232, 97, 26, 0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700, color: 'var(--color-orange-500)',
                    marginBottom: '20px', flexShrink: 0, letterSpacing: '0.02em',
                  }}
                >
                  {num}
                </div>

                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: '20px', color: '#F9FAFB', marginBottom: '10px', lineHeight: 1.3 }}
                >
                  {title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', color: '#CBD5E0', lineHeight: 1.7 }}
                >
                  {text}
                </p>
              </motion.div>

              {/* Connector */}
              {i < PILLARS.length - 1 && (
                <>
                  {/* Desktop — horizontal dashed line at circle midpoint */}
                  <div
                    className="hidden md:flex"
                    aria-hidden="true"
                    style={{ width: '64px', paddingTop: '27px', alignItems: 'flex-start', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <div style={{ width: '100%', height: '2px', borderTop: '2px dashed rgba(232, 97, 26, 0.35)' }} />
                  </div>

                  {/* Mobile — vertical fade line */}
                  <div
                    className="flex md:hidden"
                    aria-hidden="true"
                    style={{ height: '36px', paddingLeft: '27px', alignSelf: 'stretch', marginTop: '4px', marginBottom: '4px' }}
                  >
                    <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, rgba(232,97,26,0.4), rgba(232,97,26,0.1))', borderRadius: '2px' }} />
                  </div>
                </>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 05 · CE QUI EST INCLUS (grille 3×2)
   ═══════════════════════════════════════════════════════════════ */
function IncludesSection() {
  return (
    <section aria-labelledby="includes-heading" className="section-alt">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            id="includes-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Ce que votre site vitrine inclut
          </h2>
        </motion.div>

        {/* Grille 1col → 2col → 3col */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {INCLUDES.map(({ icon: Icon, title, text, link, dashed }, i) => {
            const card = (
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{
                  padding: '28px',
                  background: '#FFFFFF',
                  border: dashed ? '1.5px dashed #CBD5E0' : '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', height: '100%',
                }}
              >
                {/* Icône */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: dashed ? '#F7F8FA' : 'rgba(232,97,26,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px', flexShrink: 0,
                  color: dashed ? '#94A3B8' : 'var(--color-orange-500)',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>

                {/* Titre */}
                <h3
                  className="font-heading font-bold"
                  style={{
                    fontSize: '18px', color: dashed ? '#94A3B8' : 'var(--text-primary)',
                    marginBottom: '10px', lineHeight: 1.3, textAlign: 'left',
                  }}
                >
                  {title}
                </h3>

                {/* Texte */}
                <p
                  className="font-body"
                  style={{
                    fontSize: '14px', color: 'var(--text-secondary)',
                    lineHeight: 1.75, textAlign: 'left', flexGrow: 1,
                  }}
                >
                  {text}
                </p>

                {/* Lien optionnel */}
                {link && (
                  <span
                    className="font-body font-medium inline-flex items-center"
                    style={{ marginTop: '16px', gap: '6px', fontSize: '13px', color: 'var(--color-blue-800)' }}
                  >
                    En savoir plus
                    <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                  </span>
                )}
              </motion.div>
            )

            return link ? (
              <Link key={title} href={link} style={{ textDecoration: 'none', display: 'flex' }}>
                {card}
              </Link>
            ) : (
              <div key={title} style={{ display: 'flex' }}>
                {card}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 06 · FONCTIONNALITÉS (slider Embla — 8 items)
   ═══════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

  return (
    <section aria-labelledby="features-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2
            id="features-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Fonctionnalités de votre site vitrine professionnel
          </h2>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, title, benefit, text, link }) => (
              <div key={title} style={{
                flex: '0 0 calc(25% - 12px)',
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
              }}>
                <motion.div
                  variants={iconHover}
                  initial="rest"
                  whileHover="hover"
                  className="flex items-center justify-center rounded-[--border-radius-md]"
                  style={{ width: '44px', height: '44px', marginBottom: '14px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  color: 'var(--color-orange-500)', letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  {benefit}
                </div>
                <h3
                  className="font-heading font-bold text-[--text-primary]"
                  style={{ fontSize: '20px', marginBottom: '8px' }}
                >
                  {title}
                </h3>
                <p
                  className="font-body text-[--text-secondary] flex-grow"
                  style={{ fontSize: 'var(--card-text-size)',
              fontWeight: 'var(--card-text-weight)', lineHeight: 1.7, textAlign: 'justify' }}
                >
                  {text}
                </p>
                {link && (
                  <Link
                    href={link}
                    className="font-body font-medium inline-flex items-center transition-colors duration-200"
                    style={{ marginTop: '12px', gap: '6px', fontSize: '13px', color: 'var(--color-blue-800)', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-orange-500)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-blue-800)' }}
                  >
                    En savoir plus <ArrowRight style={{ width: '14px', height: '14px' }} aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Précédent" style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid #CBD5E0', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#4A5568',
          }}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Suivant" style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid #CBD5E0', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#4A5568',
          }}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 07 · PROCESSUS (timeline)
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection() {

  /* ── Carte réutilisable ── */
  function StepCard({ title, duration, text, impl }: {
    title: string
    duration: string
    text: string
    impl: { color: string; bg: string; label: string } | undefined
  }) {
    const isOrange = impl?.color === '#E8611A'
    return (
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <h3
            className="font-heading font-bold"
            style={{ fontSize: '18px', color: '#F9FAFB', lineHeight: 1.3 }}
          >
            {title}
          </h3>
          <span
            className="font-body"
            style={{
              fontSize: '12px', fontWeight: 500, color: '#CBD5E0',
              background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
              padding: '3px 10px', borderRadius: '4px', flexShrink: 0,
            }}
          >
            {duration}
          </span>
          {impl && (
            <span
              className="font-body"
              style={{
                fontSize: '11px', fontWeight: 600, flexShrink: 0, color: '#FFFFFF',
                background: isOrange ? 'rgba(232,97,26,0.85)' : impl.color === '#22C55E' ? 'rgba(34,197,94,0.55)' : 'rgba(59,130,246,0.30)',
                padding: '3px 10px', borderRadius: '4px',
              }}
            >
              {impl.label}
            </span>
          )}
        </div>
        <p
          className="font-body"
          style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}
        >
          {text}
        </p>
      </div>
    )
  }

  return (
    <section aria-labelledby="process-heading" className="section-brand">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <p style={{ ...EYEBROW_STYLE }}>NOTRE MÉTHODE</p>
          <h2
            id="process-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE, color: '#F9FAFB' }}
          >
            De la maquette au site en ligne
          </h2>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: 'relative' }}>

          {/* Ligne centrale — desktop */}
          <div
            className="hidden lg:block"
            aria-hidden="true"
            style={{
              position: 'absolute', top: '24px', bottom: '24px', left: '50%',
              width: '2px', transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.5) 0%, rgba(232,97,26,0.15) 100%)',
              zIndex: 0,
            }}
          />

          {/* Ligne latérale — mobile */}
          <div
            className="block lg:hidden"
            aria-hidden="true"
            style={{
              position: 'absolute', top: '24px', bottom: '24px', left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(232,97,26,0.4) 0%, rgba(232,97,26,0.1) 100%)',
              zIndex: 0,
            }}
          />

          {PROCESS_STEPS.map(({ num, title, duration, text, implication }, i) => {
            const impl = IMPLICATION_CONFIG[implication]
            const isLeft = i % 2 === 0

            const circle = (
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#2D3E5F', border: '2px solid rgba(232,97,26,0.5)',
                boxShadow: '0 0 0 3px rgba(232,97,26,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
              }}>
                <span
                  className="font-heading font-bold"
                  style={{ fontSize: '13px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '0.03em' }}
                >
                  {String(num).padStart(2, '0')}
                </span>
              </div>
            )

            return (
              <motion.div
                key={num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUp}
                style={{ marginBottom: i < PROCESS_STEPS.length - 1 ? '28px' : '0' }}
              >

                {/* Desktop — zigzag */}
                <div
                  className="hidden lg:grid"
                  style={{ gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center' }}
                >
                  <div style={{ paddingRight: '32px', paddingLeft: '0' }}>
                    {isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    {circle}
                  </div>
                  <div style={{ paddingLeft: '32px' }}>
                    {!isLeft ? <StepCard title={title} duration={duration} text={text} impl={impl} /> : <div />}
                  </div>
                </div>

                {/* Mobile — vertical gauche */}
                <div
                  className="flex lg:hidden"
                  style={{ alignItems: 'flex-start', gap: '16px' }}
                >
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    {circle}
                  </div>
                  <div style={{ flex: 1, paddingTop: '4px' }}>
                    <StepCard title={title} duration={duration} text={text} impl={impl} />
                  </div>
                </div>

              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 08 · GARANTIES (grille 3×2 — check cercle orange)
   ═══════════════════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="section-alt">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={EYEBROW_STYLE}>Preuves</p>
          <h2
            id="trust-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Pourquoi nous faire confiance
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
          {GUARANTEES.map((guarantee, i) => (
            <motion.div
              key={guarantee}
              custom={i}
              variants={gridChild}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(232,97,26,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckCircle2 size={22} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
              </div>
              <p
                className="font-heading font-bold text-[--text-primary]"
                style={{ fontSize: '16px', lineHeight: 1.3 }}
              >
                {guarantee}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 09 · DIFFÉRENCIATEURS
   ═══════════════════════════════════════════════════════════════ */
function DifferentiatorsSection() {
  return (
    <section aria-labelledby="diff-heading" className="section-base">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            id="diff-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Ce qui fait la différence — site vitrine à Dakar
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
          {DIFFERENTIATORS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={gridChild}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)', borderColor: 'rgba(232,97,26,0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                padding: '28px',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                background: '#FFFFFF', boxShadow: 'var(--shadow-sm)',
              }}
            >
              <motion.div
                variants={iconHover}
                initial="rest"
                whileHover="hover"
                className="flex items-center justify-center rounded-[--border-radius-md]"
                style={{ width: '44px', height: '44px', marginBottom: '16px', backgroundColor: 'rgba(232,97,26,0.08)', color: 'var(--color-orange-500)' }}
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

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 · FAQ (Accordion Radix UI)
   ═══════════════════════════════════════════════════════════════ */
function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            id="faq-heading"
            className="font-heading font-bold"
            style={{ ...H2_STYLE }}
          >
            Questions fréquentes sur la création de site vitrine
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ maxWidth: '760px', margin: '0 auto' }}
        >
          <AccordionRoot type="single" collapsible>
            {FAQ_ITEMS.map(({ q, a, link }, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                <AccordionTrigger style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  width: '100%', paddingBlock: '20px',
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
                }}>
                  <span
                    className="font-heading font-semibold text-[--text-primary]"
                    style={{ fontSize: 'var(--faq-question-size)' }}
                  >
                    {q}
                  </span>
                  <ChevronDown size={18} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden="true" />
                </AccordionTrigger>
                <AccordionContent style={{ paddingBottom: '20px' }}>
                  <p
                    className="font-body text-[--text-secondary]"
                    style={{ fontSize: 'var(--faq-answer-size)', lineHeight: 1.7, textAlign: 'justify' }}
                  >
                    {a}
                  </p>
                  {link && (
                    <Link
                      href={link.href}
                      className="font-body font-semibold inline-flex items-center transition-colors duration-200"
                      style={{ fontSize: '14px', color: 'var(--color-orange-500)', textDecoration: 'none', marginTop: '12px' }}
                    >
                      {link.label}
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 · CTA FINAL — props pour CTASection partagé
   ═══════════════════════════════════════════════════════════════ */
const CTA_PROPS = {
  service:         'sites-vitrine',
  titre:           'Créez votre site vitrine\nprofessionnel aujourd\'hui',
  sousTitre:       'Premier échange offert à Dakar — réponse sous 24h.',
  titreCarte:      'Votre site vitrine vous attend',
  sousTitreCarte:  'Devis gratuit — réponse sous 24h.',
  placeholder:     'Ex : Site vitrine 5-7 pages, intégration CMS, logo existant, délai souhaité 2 semaines…',
  intentionDefaut: 'Obtenir un devis',
} as const

/* ═══════════════════════════════════════════════════════════════
   PAGE CLIENT — assemblage des 11 sections
   ═══════════════════════════════════════════════════════════════ */
export function SitesVitrinePageClient() {
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <ProblemsSection />
      <ApproachSection />
      <IncludesSection />
      <FeaturesSection />
      <ProcessSection />
      <TrustSection />
      <DifferentiatorsSection />
      <FaqSection />
      <CTASection {...CTA_PROPS} />
    </main>
  )
}
