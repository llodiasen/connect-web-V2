'use client'

// Source  : CONTENT.md > HOME > Section Témoignages
// Design  : section-base (bg-white) · style Google Reviews · Embla carousel
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
   ───────────────────────────────────────────────────────────────── */
interface Review {
  id:       string
  name:     string
  initials: string
  color:    string   // couleur fond avatar
  date:     string
  stars:    number
  text:     string
}

const REVIEWS: Review[] = [
  {
    id:       'r1',
    name:     'Mame Diarra',
    initials: 'MD',
    color:    '#4285F4',
    date:     'il y a 2 ans',
    stars:    5,
    text:     'Honnêtement, on avait peur de confier notre projet à une agence. Thiossane porte une mission sérieuse pour la jeunesse sénégalaise et on ne pouvait pas se permettre un résultat banal. Connect Web a pris le temps de comprendre notre travail avant d\'écrire la moindre ligne de code. Le site reflète vraiment qui nous sommes. On est fiers de le partager.',
  },
  {
    id:       'r2',
    name:     'Mamadou Danfakha',
    initials: 'MD',
    color:    '#1B2A4A',
    date:     'il y a 2 ans',
    stars:    5,
    text:     'Ce qui m\'a convaincu c\'est leur façon d\'écouter. On leur a expliqué notre combat pour la souveraineté alimentaire des femmes rurales africaines — ils ont tout de suite compris l\'enjeu. Site livré proprement, délais tenus. Rien à redire.',
  },
  {
    id:       'r3',
    name:     'Ibou Mbaye',
    initials: 'IM',
    color:    '#2D6A4F',
    date:     'il y a 1 an',
    stars:    5,
    text:     'Vendre du matériel informatique en ligne au Sénégal c\'est pas simple — les clients veulent voir les prix, comparer, payer facilement. Connect Web a tout compris. Catalogue bien structuré, paiements Wave et Orange Money qui fonctionnent, gestion des commandes claire. Depuis le lancement, mes ventes ont augmenté et je gère tout depuis mon téléphone.',
  },
  {
    id:       'r4',
    name:     'Atta Africa',
    initials: 'AA',
    color:    '#6366F1',
    date:     'il y a 1 an',
    stars:    5,
    text:     'Notre marque a une identité forte et on tenait à ce que la boutique en ligne la reflète. Connect Web a livré un Shopify sur mesure qui dépasse ce qu\'on imaginait. Nos clientes nous disent régulièrement que le site est beau et agréable à utiliser.',
  },
  {
    id:       'r5',
    name:     'Tapsir Niane',
    initials: 'TN',
    color:    '#0F766E',
    date:     'il y a 8 mois',
    stars:    5,
    text:     'Dans notre secteur, la crédibilité passe par l\'image. On avait un site vieilli qui ne nous représentait plus. Connect Web a refait notre présence digitale de A à Z — design professionnel, contenu structuré, optimisé SEO. Nos partenaires internationaux ont remarqué le changement dès les premières semaines.',
  },
  {
    id:       'r6',
    name:     'Mr Diaw',
    initials: 'D',
    color:    '#B45309',
    date:     'il y a 6 mois',
    stars:    5,
    text:     'Ce que j\'apprécie chez Connect Web c\'est qu\'ils ne font pas que développer — ils réfléchissent avec vous. Notre plateforme éducative avait des contraintes spécifiques et ils ont trouvé les bonnes solutions à chaque étape. Équipe sérieuse, à l\'écoute et compétente.',
  },
  {
    id:       'r7',
    name:     'David Betka',
    initials: 'DB',
    color:    '#7C3AED',
    date:     'il y a 5 mois',
    stars:    5,
    text:     'Franchement je suis bluffé. J\'avais un budget limité et des exigences élevées — ils ont trouvé le bon équilibre. Mon portfolio est rapide, bien référencé et me ressemble vraiment. J\'ai décroché mes premiers clients la semaine du lancement.',
  },
  {
    id:       'r8',
    name:     'Ousmane Diop',
    initials: 'OD',
    color:    '#DC2626',
    date:     'il y a 4 mois',
    stars:    5,
    text:     'Dans la production vidéo, le site c\'est ta carte de visite principale. Connect Web a créé quelque chose qui met vraiment notre travail en valeur. Le showreel s\'intègre parfaitement, la galerie est fluide, le formulaire de contact ramène des demandes concrètes.',
  },
  {
    id:       'r9',
    name:     'Tidiane Kassé',
    initials: 'TK',
    color:    '#0369A1',
    date:     'il y a 3 mois',
    stars:    5,
    text:     'Bonne expérience de bout en bout. L\'équipe a été réactive, les délais respectés et le résultat est à la hauteur de notre mission. Notre plateforme est claire, accessible et bien référencée. Je recommande.',
  },
  {
    id:       'r10',
    name:     'Ibrahima Gueye',
    initials: 'IG',
    color:    '#9B2335',
    date:     'il y a 2 mois',
    stars:    5,
    text:     'Avant Connect Web je gérais mes commandes sur WhatsApp — c\'était le chaos. Maintenant j\'ai une vraie épicerie en ligne. Mes clients commandent, paient avec Wave, je reçois la notification directement. Connect Web a complètement transformé la façon dont je travaille.',
  },
]

const TOTAL = REVIEWS.length
const EASE  = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────
   ICÔNE GOOGLE — SVG inline
   ───────────────────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — ReviewCard
   ───────────────────────────────────────────────────────────────── */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        flex:    '0 0 300px',
        minWidth: 0,
      }}
      className="sm:flex-[0_0_320px]"
    >
      <div
        style={{
          background:    '#FFFFFF',
          border:        '1px solid #E2E8F0',
          borderRadius:  '12px',
          boxShadow:     '0 1px 3px rgba(0,0,0,0.06)',
          padding:       '20px',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          gap:           '12px',
        }}
      >
        {/* Header : avatar + nom + date + Google icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: '10px' }}>
            {/* Avatar */}
            <div
              aria-hidden="true"
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     review.color,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
                fontSize:       '14px',
                fontWeight:     700,
                color:          '#FFFFFF',
                fontFamily:     'var(--font-heading)',
              }}
            >
              {review.initials}
            </div>
            <div>
              <p style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    600,
                fontSize:      '14px',
                color:         '#0A0B0E',
                lineHeight:    1.3,
                letterSpacing: '-0.01em',
              }}>
                {review.name}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-light)',
                fontSize:   '12px',
                color:      '#9CA3AF',
                marginTop:  '2px',
              }}>
                {review.date}
              </p>
            </div>
          </div>
          <GoogleIcon />
        </div>

        {/* Étoiles */}
        <div className="flex items-center" style={{ gap: '2px' }}>
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill="#FBBC05"
              style={{ color: '#FBBC05' }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Texte */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--card-text-weight)',
          fontSize:   'var(--card-text-size)',
          color:      '#4A5568',
          lineHeight: 1.65,
          flex:       1,
          textAlign:  'justify',
        }}>
          {review.text}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — TestimonialsCarousel
   ───────────────────────────────────────────────────────────────── */
export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:          false,
    align:         'start',
    containScroll: false,
  })

  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap())
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-alt"
      style={{ borderTop: '1px solid #DDE3EE' }}
    >
      <div className="container" style={{ paddingInline: 0 }}>

        {/* ── En-tête avec navigation ──────────────────────────── */}
        <div
          className="grid grid-cols-3 items-end"
          style={{ marginBottom: '32px' }}
        >
          {/* Spacer gauche */}
          <div />

          {/* Titre centré */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-center"
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '8px',
            }}>
              Témoignages
            </p>
            <h2
              id="testimonials-heading"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    700,
                fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#1B2A4A',
              }}
            >
              Ce que nos clients disent de nous
            </h2>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
            className="flex items-center justify-end"
            style={{ gap: '8px' }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '13px',
              color:      '#9CA3AF',
              minWidth:   '36px',
              textAlign:  'right',
            }}>
              {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>

            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Avis précédent"
              className="flex items-center justify-center transition-all duration-150"
              style={{
                width:        '36px',
                height:       '36px',
                borderRadius: '8px',
                border:       '1px solid #DDE3EE',
                background:   '#FFFFFF',
                color:        canPrev ? '#4A5568' : '#D1D5DB',
                cursor:       canPrev ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => { if (canPrev) e.currentTarget.style.borderColor = '#C5CFDF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDE3EE' }}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Avis suivant"
              className="flex items-center justify-center transition-all duration-150"
              style={{
                width:        '36px',
                height:       '36px',
                borderRadius: '8px',
                border:       '1px solid #DDE3EE',
                background:   '#FFFFFF',
                color:        canNext ? '#4A5568' : '#D1D5DB',
                cursor:       canNext ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => { if (canNext) e.currentTarget.style.borderColor = '#C5CFDF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDE3EE' }}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* ── Bandeau EXCELLENT Google ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex items-center"
          style={{ gap: '10px', marginBottom: '28px' }}
        >
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    700,
            fontSize:      '15px',
            color:         '#0A0B0E',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Excellent
          </span>
          <div className="flex items-center" style={{ gap: '2px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="#FBBC05" style={{ color: '#FBBC05' }} aria-hidden="true" />
            ))}
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize:   '14px',
            color:      '#4A5568',
          }}>
            40 avis
          </span>
          <GoogleIcon />
        </motion.div>

        {/* ── Carousel ─────────────────────────────────────────── */}
        <div ref={emblaRef} style={{ overflow: 'hidden' }} aria-label="Avis clients Google">
          <div className="flex" style={{ gap: '20px' }}>
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* ── Dots ─────────────────────────────────────────────── */}
        <div
          className="flex justify-center items-center"
          style={{ gap: '6px', marginTop: '28px' }}
          aria-hidden="true"
        >
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                width:        current === i ? '20px' : '6px',
                height:       '6px',
                borderRadius: '999px',
                background:   current === i ? '#1B2A4A' : '#D1D5DB',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
