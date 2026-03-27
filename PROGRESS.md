# PROGRESS — Refonte Connect-Web

> Suivi d'avancement — Sprint 0 terminé, Sprint 1 en cours
> Basé sur ARCHITECTURE.md v1.0

---

## SPRINT 0 — SETUP ✅ TERMINÉ

### Étape 1 — Création du projet ✅
- **Next.js 16.1.6** (compatible API Next.js 15, App Router)
- **React 19.2.3** ✅
- **TypeScript 5** ✅
- **Tailwind CSS v4** (adapté : CSS-first via `@theme inline` au lieu de `tailwind.config.ts`)
- **ESLint** configuré ✅

> Note : Tailwind v4 utilise un paradigme CSS-first. Les tokens du design system sont exposés
> via `@theme inline { }` dans `globals.css`, ce qui est encore plus aligné avec l'approche
> CSS custom properties de l'architecture.

---

### Étape 2 — Dépendances installées ✅

| Package | Version | Usage |
|---|---|---|
| `next-sanity` | ^9 | Client Sanity + GROQ |
| `@sanity/image-url` | ^1 | Optimisation images Sanity |
| `framer-motion` | ^11 | Animations |
| `lenis` | ^1 | Smooth scroll |
| `lucide-react` | ^0.400 | Icônes SVG |
| `react-hook-form` | ^7 | Formulaires |
| `zod` | ^3 | Validation schémas |
| `resend` | ^3 | Envoi emails |
| `schema-dts` | ^1 | Types Schema.org |
| `@radix-ui/react-dialog` | ^1 | Modals accessibles |
| `@radix-ui/react-accordion` | ^1 | FAQ |
| `embla-carousel-react` | ^8 | Carousel témoignages |
| `clsx` + `tailwind-merge` + `class-variance-authority` | latest | Utilitaires CSS |
| `@playwright/test` + `vitest` + `@axe-core/playwright` | latest | Tests |

---

### Étape 3 — Design system ✅

**Fichier :** `app/globals.css`

- ✅ Tous les tokens primitifs : orange (50–900), dark (50–950), blue (600–900)
- ✅ Tokens sémantiques : surfaces, texte (WCAG AA vérifiés), bordures, brand, états
- ✅ Tokens typographiques : scale 1.25, poids, line-heights, letter-spacing
- ✅ Tokens d'espacement : base 8px, scale 1→32
- ✅ Tokens d'animation : durées, easings, ombres (glow orange)
- ✅ Configuration Tailwind v4 via `@theme inline`
- ✅ Styles de base : body, headings, links, scrollbar, selection, focus-visible (a11y)
- ✅ Classes utilitaires : `.container`, `.section`, `.text-display`, `.text-eyebrow`, `.text-gradient`
- ✅ `prefers-reduced-motion` respecté

---

### Étape 4 — Structure de dossiers ✅

```
connect-web/
├── app/
│   ├── (marketing)/          ✅ Route group avec layout Header+Footer
│   │   ├── layout.tsx
│   │   ├── page.tsx          ✅ Accueil /
│   │   ├── a-propos/         ✅
│   │   ├── services/         ✅ + [slug]/ (3 slugs statiques)
│   │   ├── portfolio/        ✅ + [slug]/
│   │   ├── blog/             ✅ + [slug]/
│   │   ├── contact/          ✅
│   │   ├── tarifs/           ✅
│   │   ├── mentions-legales/ ✅
│   │   └── politique-confidentialite/ ✅
│   ├── api/
│   │   ├── contact/route.ts  ✅ (stub Sprint 2)
│   │   └── revalidate/route.ts ✅ Webhook Sanity → ISR
│   ├── not-found.tsx         ✅ 404 personnalisée
│   ├── sitemap.ts            ✅ Sitemap dynamique (toutes les URLs statiques)
│   └── robots.ts             ✅
├── components/
│   ├── ui/                   ✅ Button (4 variants), Card (3 variants + sub-components)
│   ├── sections/             ✅ (prêt Sprint 1–4)
│   ├── layout/               ✅ Header, Footer, MarketingLayout
│   └── seo/                  (Sprint 5)
├── lib/
│   ├── utils/cn.ts           ✅ clsx + tailwind-merge helper
│   ├── sanity/               (Sprint 1)
│   └── actions/              (Sprint 2)
└── sanity/schemas/           (Sprint 0 — Sanity setup à faire)
```

---

### Étape 5 — Composants de base ✅

| Composant | Fichier | Variants |
|---|---|---|
| `Button` | `components/ui/button.tsx` | primary, secondary, outline, ghost × sm/md/lg |
| `Card` | `components/ui/card.tsx` | default, elevated, bordered × sm/md/lg padding |
| `CardHeader/Title/Description/Body/Footer` | idem | — |
| `Header` | `components/layout/header.tsx` | Desktop nav + Mobile menu animé |
| `Footer` | `components/layout/footer.tsx` | 4 colonnes + barre légale |
| `MarketingLayout` | `components/layout/marketing-layout.tsx` | Wrapper Header + main + Footer |

---

### Étape 6 — Routing ✅

| Route | Stratégie | Statut |
|---|---|---|
| `/` | SSG + ISR 24h | ✅ |
| `/a-propos` | SSG | ✅ |
| `/services` | SSG | ✅ |
| `/services/[slug]` | SSG (3 slugs statiques) | ✅ |
| `/portfolio` | ISR 1h | ✅ |
| `/portfolio/[slug]` | ISR 1h | ✅ |
| `/blog` | ISR 30min | ✅ |
| `/blog/[slug]` | ISR 30min | ✅ |
| `/contact` | SSG + Server Action | ✅ |
| `/tarifs` | SSG | ✅ |
| `/mentions-legales` | SSG (noindex) | ✅ |
| `/politique-confidentialite` | SSG (noindex) | ✅ |
| **Redirections 301** | `next.config.ts` | ✅ 8 redirections |
| **Headers sécurité** | `next.config.ts` | ✅ |
| **404** | `app/not-found.tsx` | ✅ |
| **Sitemap** | `app/sitemap.ts` | ✅ |
| **Robots** | `app/robots.ts` | ✅ |

---

### Étape 7 — Polices ✅

- ✅ `Plus Jakarta Sans` → `--font-plus-jakarta-sans` → `--font-heading`
- ✅ `Inter` → `--font-inter` → `--font-body`
- ✅ Chargées via `next/font/google` (zéro FOUT, self-hosted automatique)
- ✅ Injections dans `<html>` via `className` dans `app/layout.tsx`
- ✅ Métadonnées SEO globales complètes dans `app/layout.tsx`
- ✅ TypeScript : `npx tsc --noEmit` → 0 erreur

---

---

## SPRINT 1 — FONDATIONS (en cours)

### Header / Nav ✅ — Production-ready

**Fichier :** `components/layout/header.tsx`

**Features implémentées :**
- ✅ **Scroll-aware** : transparent sur le top → frosted glass (blur 20px) + bordure subtile au scroll
- ✅ **Logo** : wordmark gradient orange + dot vert (statut online, style Linear)
- ✅ **Dropdown Services** : panel avec icône + titre + description par service + footer "Voir tout"
- ✅ **Active link** : détection via `usePathname`, underline animé expand-from-center
- ✅ **CTAs desktop** : ghost "Parler à un expert" + primary "Devis gratuit →" avec glow orange au hover
- ✅ **Mobile burger** : 3 barres animées en X (CSS transform)
- ✅ **Menu mobile** : slide depuis le haut + overlay flou, accordion services, active indicators
- ✅ **Accessibilité** : aria-expanded, aria-label, aria-haspopup, focus-visible, click-outside
- ✅ **Body scroll lock** quand menu mobile ouvert
- ✅ **Auto-close** sur changement de route

**Inspiration design :** Stripe (dropdown avec descriptions) + Linear (dot status, spacing, dark precision)

**Build :** `npm run build` → 19 pages, 0 erreur ✅

---

## PROCHAINES ÉTAPES

### Sprint 0 (suite) — À faire
- [ ] Créer le projet Sanity.io + schemas de base
- [ ] Configurer Vercel + variables d'environnement
- [ ] `.env.local` avec les clés (Sanity, Resend, Analytics, RGPD)

### Sprint 1 — Fondations
- [ ] Sections page d'accueil : Hero, Stats, Services, CTA
- [ ] Schema.org LocalBusiness
- [ ] Composants : SectionHeader, FeatureGrid, StatsRow

---

---

## VALIDATION FINALE SPRINT 0

```
✅ npx tsc --noEmit     → 0 erreur TypeScript
✅ npm run build        → 19 pages générées, 0 erreur
   ○ SSG  : /, /a-propos, /contact, /services, /tarifs, /mentions-legales, /politique-confidentialite
   ● SSG  : /services/[slug] × 3 (création, refonte, e-commerce)
   ISR    : /portfolio (1h), /blog (30min)
   ƒ Dyn  : /portfolio/[slug], /blog/[slug], /api/contact, /api/revalidate
```

*Dernière mise à jour : Sprint 0 terminé — Build production ✅*
