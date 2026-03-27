/**
 * lib/motion.ts — Connect Web
 * Variants Framer Motion partagés — Design System v5.0
 * Source de vérité pour toutes les animations du site.
 * Importer depuis ce fichier dans TOUS les composants.
 */

/* ─────────────────────────────────────────────────────────────────
   COURBES D'ACCÉLÉRATION
   ─────────────────────────────────────────────────────────────── */
export const EASE       = [0.0, 0.0, 0.2, 1.0]       as [number, number, number, number]
export const EASE_OUT   = [0.0, 0.0, 0.2, 1.0]       as [number, number, number, number]
export const EASE_IN    = [0.4, 0.0, 1.0, 1.0]       as [number, number, number, number]
export const EASE_SNAP  = [0.04, 0.62, 0.23, 0.98]   as [number, number, number, number]
export const EASE_SPRING = [0.34, 1.56, 0.64, 1.0]   as [number, number, number, number]

export const VIEWPORT = { once: true, amount: 0.15 } as const

/* ─────────────────────────────────────────────────────────────────
   VARIANTS ENTRÉE — sections & éléments
   ─────────────────────────────────────────────────────────────── */

/** Fade + slide vers le haut — usage général */
export const fadeInUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

/** Fade simple — pour les contenus qui ne doivent pas se déplacer */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
}

/** Scale + fade — badges, icônes, chiffres */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: EASE_SPRING },
  },
}

/** Slide depuis la gauche */
export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

/** Slide depuis la droite */
export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS GRILLE — stagger enfants automatique
   ─────────────────────────────────────────────────────────────── */

/** Conteneur grille — déclenche le stagger sur ses enfants */
export const staggerGrid = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

/** Enfant de grille — utilisé avec staggerGrid */
export const gridChild = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

/** Stagger plus rapide pour grilles denses */
export const staggerGridFast = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS HOVER — cartes
   Utilisation : initial="rest" whileHover="hover" whileInView="visible"
   ─────────────────────────────────────────────────────────────── */

/** Hover carte standard — lift + ombre */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(27,42,74,0.08), 0 1px 2px rgba(27,42,74,0.05)',
    borderColor: '#DDE3EE',
    transition: { duration: 0.25, ease: EASE },
  },
  hover: {
    y: -6,
    boxShadow: '0 16px 48px rgba(27,42,74,0.14), 0 4px 12px rgba(27,42,74,0.08)',
    borderColor: 'rgba(232,97,26,0.35)',
    transition: { duration: 0.25, ease: EASE },
  },
}

/** Hover carte subtil — pour grilles flush ou sections alt */
export const cardHoverSubtle = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(27,42,74,0.06)',
    transition: { duration: 0.2, ease: EASE },
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 32px rgba(27,42,74,0.11), 0 2px 8px rgba(27,42,74,0.06)',
    transition: { duration: 0.2, ease: EASE },
  },
}

/** Hover carte dark (sections hero / section-brand) */
export const cardHoverDark = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
    borderColor: 'rgba(255,255,255,0.08)',
    transition: { duration: 0.25, ease: EASE },
  },
  hover: {
    y: -5,
    boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
    borderColor: 'rgba(232,97,26,0.4)',
    transition: { duration: 0.25, ease: EASE },
  },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS HOVER — icônes de cartes
   ─────────────────────────────────────────────────────────────── */

/** Hover icône — scale + couleur orange */
export const iconHover = {
  rest: {
    scale: 1,
    backgroundColor: 'rgba(27,42,74,0.06)',
    color: '#2D3E5F',
    transition: { duration: 0.2, ease: EASE },
  },
  hover: {
    scale: 1.1,
    backgroundColor: 'rgba(232,97,26,0.1)',
    color: '#E8611A',
    transition: { duration: 0.2, ease: EASE },
  },
}

/** Hover icône — version fond error (sections problèmes) */
export const iconHoverError = {
  rest: {
    scale: 1,
    transition: { duration: 0.2, ease: EASE },
  },
  hover: {
    scale: 1.12,
    transition: { duration: 0.2, ease: EASE_SPRING },
  },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS HOVER — boutons & liens
   ─────────────────────────────────────────────────────────────── */

/** Hover flèche → glisse vers la droite */
export const arrowHover = {
  rest:  { x: 0, transition: { duration: 0.2, ease: EASE } },
  hover: { x: 4, transition: { duration: 0.2, ease: EASE } },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS TIMELINE / ROADMAP
   ─────────────────────────────────────────────────────────────── */

/** Cercle roadmap — scale depuis 0 */
export const circleReveal = (delay: number) => ({
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: EASE_SPRING, delay },
  },
})

/** Ligne horizontale roadmap */
export const lineRevealX = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE, delay: 0.3 },
  },
}

/** Ligne verticale roadmap */
export const lineRevealY = {
  hidden:  { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.0, ease: EASE, delay: 0.2 },
  },
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS FAQ
   ─────────────────────────────────────────────────────────────── */

export const faqPanel = {
  hidden:  { height: 0, opacity: 0 },
  visible: {
    height: 'auto', opacity: 1,
    transition: {
      height:  { duration: 0.32, ease: EASE_SNAP },
      opacity: { duration: 0.22, ease: EASE },
    },
  },
  exit: {
    height: 0, opacity: 0,
    transition: {
      height:  { duration: 0.28, ease: EASE_SNAP },
      opacity: { duration: 0.18, ease: EASE },
    },
  },
}

/* ─────────────────────────────────────────────────────────────────
   HELPERS — délais stagger
   ─────────────────────────────────────────────────────────────── */

/** Génère un délai stagger : delay(0) = 0.1s, delay(1) = 0.2s, etc. */
export const staggerDelay = (i: number, base = 0.1, step = 0.1) =>
  base + i * step
