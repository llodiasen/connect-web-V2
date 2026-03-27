# CLAUDE.md — Connect Web
# Instructions permanentes pour Claude Code
# Version 3.1 — Light theme enforced + tokens spacing + cards fix + typo clamp
# Ce fichier est lu automatiquement à chaque session

---

## 🔴 RÈGLE N°1 — SOURCE DE VÉRITÉ CONTENU

**Avant de créer ou modifier TOUTE page, composant, ou texte UI :**
→ Lire le fichier `CONTENT.md` à la racine du projet.

`CONTENT.md` contient **l'intégralité du contenu** du site :
- Identité et positionnement de l'agence Connect Web
- Textes exacts : titres H1, sous-titres, CTA, descriptions
- Contenu de chaque page (Home, Services, À propos, Contact, etc.)
- Pricing, FAQ, témoignages, chiffres clés
- Mots-clés SEO par page

**Aucun texte générique ou inventé n'est autorisé.**
Tout le copy doit venir de `CONTENT.md`. Si une valeur est `[PLACEHOLDER]`
ou `[X]`, utilise-la telle quelle — ne l'invente pas.

---

## 🏢 IDENTITÉ DU PROJET

```
Projet    : Site web Connect Web — Refonte complète
Agence    : Connect Web — agence digitale jeune & dynamique
Ville     : Dakar, Sénégal 🇸🇳
Marché    : Sénégal · Afrique de l'Ouest · Diaspora africaine
URL       : connect-web.tech
Email     : contact@connect-web.tech
Studio    : /studio (Sanity embedé)
```

---

## 🛠️ STACK TECHNIQUE

```
Framework     : Next.js 15 (App Router) — SSG/SSR hybride
CMS           : Sanity.io (headless) — GROQ queries
Hébergement   : Vercel — Edge Network, preview URLs
CI/CD         : GitHub Actions + Vercel auto-deploy
Langue        : TypeScript strict
Styling       : Tailwind CSS 3.4+
Animations    : Framer Motion 11 + Lenis (smooth scroll)
Icônes        : lucide-react (SVG inline, tree-shakeable)
Formulaires   : react-hook-form + zod
Emails        : Resend
UI primitives : Radix UI (@radix-ui/react-dialog, accordion…)
Carousel      : embla-carousel-react
SEO types     : schema-dts (Schema.org)
Tests         : Vitest (unit) + Playwright (E2E) + axe-core (a11y)
```

**package.json (dépendances clés) :**
```json
{
  "next": "^15.0.0", "react": "^19.0.0", "typescript": "^5.4.0",
  "next-sanity": "^9.0.0", "@sanity/image-url": "^1.0.0",
  "tailwindcss": "^3.4.0", "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0", "tailwind-merge": "^2.3.0",
  "framer-motion": "^11.0.0", "lenis": "^1.1.0",
  "lucide-react": "^0.400.0",
  "react-hook-form": "^7.51.0", "zod": "^3.23.0", "resend": "^3.2.0",
  "schema-dts": "^1.1.0", "embla-carousel-react": "^8.1.0",
  "@radix-ui/react-dialog": "^1.0.5", "@radix-ui/react-accordion": "^1.1.2"
}
```

---

## 📁 STRUCTURE DU PROJET

```
connect-web/
├── CLAUDE.md                               ← ce fichier
├── CONTENT.md                              ← source de vérité contenu
├── architecture-connect-web.md             ← référence technique complète
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx                      ← Header + Footer global
│   │   ├── page.tsx                        ← / Accueil
│   │   ├── a-propos/page.tsx               ← /a-propos
│   │   ├── contact/page.tsx                ← /contact
│   │   ├── portfolio/
│   │   │   ├── page.tsx                    ← /portfolio
│   │   │   └── [slug]/page.tsx             ← /portfolio/[slug]
│   │   ├── tarifs/page.tsx                 ← /tarifs
│   │   ├── blog/
│   │   │   ├── page.tsx                    ← /blog
│   │   │   └── [slug]/page.tsx             ← /blog/[slug]
│   │   ├── services/
│   │   │   ├── page.tsx                    ← /services (hub)
│   │   │   ├── developpement-web/page.tsx
│   │   │   ├── developpement-mobile/page.tsx
│   │   │   ├── applications-web/page.tsx
│   │   │   ├── applications-mobile/page.tsx
│   │   │   ├── logiciels-saas/page.tsx
│   │   │   ├── integration-erp/page.tsx
│   │   │   ├── integration-crm/page.tsx
│   │   │   ├── sites-ecommerce/page.tsx
│   │   │   ├── sites-vitrine/page.tsx
│   │   │   └── carte-visite-nfc/page.tsx
│   │   ├── mentions-legales/page.tsx
│   │   └── confidentialite/page.tsx
│   ├── not-found.tsx                       ← Page 404 custom
│   ├── api/
│   │   ├── contact/route.ts                ← Server Action formulaire
│   │   └── revalidate/route.ts             ← Webhook Sanity → ISR
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx                          ← Root layout (fonts, analytics)
├── components/
│   ├── ui/                                 ← Composants atomiques
│   ├── sections/                           ← Sections réutilisables
│   ├── layout/
│   │   ├── Header.tsx                      ← Nav + mega menu + mobile
│   │   └── Footer.tsx                      ← 5 colonnes + newsletter
│   └── seo/                                ← Schema.org, métadonnées
├── lib/
│   ├── sanity/                             ← Client + GROQ queries
│   ├── actions/                            ← Server Actions
│   └── utils/
├── styles/
│   └── globals.css                         ← Design tokens CSS
├── public/images/
├── sanity/schemas/
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗺️ SITEMAP COMPLET — TOUTES LES PAGES

### Pages principales
| URL | Fichier | Sections |
|-----|---------|---------|
| `/` | `(marketing)/page.tsx` | 13 sections (voir détail ci-dessous) |
| `/a-propos` | `a-propos/page.tsx` | 6 sections |
| `/contact` | `contact/page.tsx` | 3 sections |
| `/portfolio` | `portfolio/page.tsx` | 3 sections |
| `/tarifs` | `tarifs/page.tsx` | 5 sections |
| `/blog` | `blog/page.tsx` | 2 sections |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | 1 layout complet |
| `/mentions-legales` | `mentions-legales/page.tsx` | 1 section |
| `/confidentialite` | `confidentialite/page.tsx` | 1 section |
| `/404` | `not-found.tsx` | 1 section |

### Pages services (10 services)
| URL | Service |
|-----|---------|
| `/services/developpement-web` | Développement Web |
| `/services/developpement-mobile` | Développement Mobile |
| `/services/applications-web` | Applications Web |
| `/services/applications-mobile` | Applications Mobile |
| `/services/logiciels-saas` | Logiciels SaaS |
| `/services/integration-erp` | Intégration ERP |
| `/services/integration-crm` | Intégration CRM |
| `/services/sites-ecommerce` | Sites E-commerce |
| `/services/sites-vitrine` | Sites Vitrine |
| `/services/carte-visite-nfc` | Carte de Visite NFC |

**Chaque page service contient 11 sections dans cet ordre :**
1. Hero (badge + H1 + sous-titre + CTAs + visuel + métriques)
2. Service Overview (sous-catégories en grille)
3. Problèmes — Pain Points (cards rouge/gris)
4. Solutions (layout 2 col avant/après avec flèche animée)
5. Features Grid (grille 4 col avec checkmarks orange)
6. Processus de Développement (timeline 6 étapes)
7. Technologies (logos groupés par catégorie)
8. Case Studies / Réalisations (grille 2 projets)
9. Benefits / Pourquoi Connect Web vs Alternatives (tableau comparatif)
10. FAQ (accordion Radix, 5 questions)
11. CTA Final (gradient + bouton → /contact?service=slug)

---

## 📄 DÉTAIL DES SECTIONS PAR PAGE

### HOME `/` — 13 sections
```
01. Header/Navigation  → /components/layout/Header.tsx
02. Hero               → H1 animé + 2 CTAs + visuel typing
03. Barre Clients      → Logo scroll CSS infini (8-12 logos)
04. Services           → Grille filtrée 10 services (filtres tabs)
05. Pourquoi Nous      → Grille 2×2 (4 arguments)
06. Notre Méthode      → Timeline 4 étapes (horizontal desktop)
07. Portfolio          → Preview 4 projets (grille masonry)
08. Chiffres Clés      → 4 compteurs animés au scroll
09. Témoignages        → Carousel Embla (3 slides desktop)
10. Pricing            → 3 plans (Starter/Pro/Sur mesure) + toggle FCFA/EUR
11. FAQ                → Accordion 7 questions
12. CTA Final          → Formulaire inline rapide + WhatsApp/email
13. Footer             → /components/layout/Footer.tsx (5 colonnes)
```

### CONTACT `/contact` — 3 sections
```
01. Hero         → H1 + 3 cards canaux (email/WhatsApp/tél) + adresse
02. Formulaire   → react-hook-form + zod → API route → Resend + WhatsApp
03. Infos        → Process 3 étapes + horaires + Google Maps
```

### PORTFOLIO `/portfolio` — 3 sections
```
01. Hero         → H1 + filtres catégories (6 catégories)
02. Grille       → Masonry 3col, filtres AnimatePresence, modale au clic
03. CTA          → « Votre projet sera le prochain ? »
```

### TARIFS `/tarifs` — 5 sections
```
01. Hero         → H1 + toggle FCFA/EUR
02. Grille       → Cards par catégorie avec fourchettes prix
03. Tableau      → Comparatif Starter/Pro/Sur mesure (header orange)
04. FAQ          → 4 questions (TVA, modalités, frais cachés, 3x)
05. CTA          → « Demandez une estimation » → /contact
```

### À PROPOS `/a-propos` — 6 sections
```
01. Hero         → H1 + sous-titre + photo équipe
02. Notre Histoire → Timeline verticale (2021→2024)
03. Nos Valeurs  → 4 cards (Excellence, Transparence, Impact, Partnership)
04. L'Équipe     → Grille profils avec hover bio
05. Chiffres Clés → Stats + 5 pays + 2 certifications
06. CTA Final    → « Rejoignez les entreprises... »
```

### BLOG `/blog` — 2 sections + page article
```
/blog :
  01. Hero         → H1 + barre de recherche
  02. Articles     → Grille + sidebar (filtres, récents, newsletter, tags)

/blog/[slug] :
  01. Layout article → Breadcrumb + hero + MDX + TOC sticky
                       + partage (LinkedIn/Facebook/Twitter)
                       + auteur + articles liés + CTA bas de page
```

### PAGES UTILITAIRES
```
/404              → Illustration créative 404 + liens rapides
/mentions-legales → 6 sections (éditeur, hébergeur, PI, responsabilité, liens, cookies)
/confidentialite  → 6 sections (données, finalités, durée, droits, cookies, DPO)
```

---

## 🧩 COMPOSANTS — INVENTAIRE COMPLET

### Layout — `components/layout/`

**Header.tsx**
```typescript
// Navigation sticky avec backdrop-blur + légère ombre au scroll
// Logo gauche · Nav centrale · CTA « Démarrer un projet » (orange) droite
// Switch langue FR/EN
// Mega menu Services (4 colonnes) :
//   Développement : Dev Web · Dev Mobile · Apps Web · Apps Mobile · SaaS
//   Intégration   : ERP · CRM
//   Web           : E-commerce · Sites Vitrine
//   Produit       : Carte NFC
// Mobile : hamburger → drawer animé Framer Motion
// Active state : border-bottom orange sur page courante (usePathname)
//   → className après:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-[--color-orange-500]
// Fermeture mega-menu : clic extérieur + Escape
```

**Footer.tsx**
```typescript
// 5 colonnes :
//   1. Logo + description + réseaux (LinkedIn, Facebook, Instagram)
//   2. Services (10 liens)
//   3. Entreprise (À propos · Portfolio · Tarifs · Blog · Contact)
//   4. Contact (email · tél · WhatsApp · adresse Dakar)
//   5. Newsletter (input + bouton)
// Bottom bar : © Connect Web · Mentions légales · Confidentialité · CGV
// Top : séparateur border orange 2px
// Titres : --color-primary, uppercase, letter-spacing
// Liens hover : orange + translateX(4px)
```

### Atomiques — `components/ui/`

```typescript
<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" />
// primary  → bg orange + hover: scale(1.04) + shadow-glow
// secondary→ bg dark-700 + hover dark-600
// outline  → border orange + hover bg-orange/10
// ghost    → transparent + hover dark-700

<Badge variant="default|success|warning|error|info|popular" />
<Card variant="default|elevated|bordered" padding="sm|md|lg" />
<Heading level={1|2|3|4} eyebrow="texte optionnel" />
<GradientText />            // dégradé orange-brand
<Input type label error hint />
<Textarea label error />
<Select label options />
<FormField />               // wrapper label + error message
<Alert variant="success|error|warning|info" />
<Skeleton />                // loading placeholder
<Container maxWidth="default|wide|narrow" />
<Section id className />
<Grid cols={1|2|3|4} gap="sm|md|lg" />
<OptimizedImage />          // wrapper next/image avec lqip blur
```

### Sections réutilisables — `components/sections/`

```typescript
<SectionHeader eyebrow title description align="left|center" />
<FeatureGrid items cols={2|3|4} />   // checkmarks orange, 4 col desktop
<TestimonialsCarousel testimonials />// Embla, autoplay 5s, pause hover
<StatsRow stats />                   // counter animé Intersection Observer
<CTABanner primaryCta secondaryCta />
<FAQAccordion items />               // Radix, un seul ouvert, icône +/× animée
<PricingCard plan featured />        // toggle FCFA/EUR
<ProcessStep step title description />
<ComparisonTable />                  // tableau Connect Web vs alternatives
<TechStack technologies />           // logos groupés par catégorie
<CaseStudyCard project />            // screenshot + métriques orange
<PainPoints items />                 // cards rouge/gris + animation shake hover
<BeforeAfter leftItems rightItems /> // layout 2 col avant/après + flèche animée
```

### Sections Home spécifiques

```typescript
<HeroSection />       // bg-white + radial orange 7% opacity, typing animation, fade+slide Framer
<LogoScrollBanner />  // CSS keyframes infini, pause hover, masques dégradé
<ServicesGrid />      // filtres tabs (AnimatePresence), hover: glow + translateY(-4px)
<PortfolioPreview />  // 4 projets, overlay hover, grille masonry/2×2
<PricingSection />    // 3 plans, central scale + border orange
<CTAFinalSection />   // formulaire inline rapide + liens WhatsApp/email
```

---

## 🎨 DESIGN SYSTEM

> Défini dans `styles/globals.css` et `tailwind.config.ts`.
> **Ne jamais hardcoder des valeurs** — toujours utiliser les tokens CSS.

### Philosophie
**Light theme UNIQUEMENT** (Stripe / Linear / Vercel) + accent orange brand. WCAG AA minimum (4.5:1).
Fond blanc `#FFFFFF`, texte near-black `#0A0B0E`, sections alternées `#F7F8FA`.
**⛔ Aucun fond dark/navy/slate sur les sections de contenu — seul le Footer est autorisé en dark.**

### Couleurs

```css
:root {
  /* Orange brand — inchangé */
  --color-orange-500: #E8611A;   /* Brand primary */
  --color-orange-400: #FF7A20;   /* Hover */
  --color-orange-600: #C44D0E;   /* Active */

  /* Blue secondary */
  --color-blue-800:  #1A2A4A;

  /* ── TOKENS SÉMANTIQUES — Light theme ── */

  /* Surfaces */
  --bg-base:         #FFFFFF;        /* Fond body */
  --bg-elevated:     #F7F8FA;        /* Sections alternées, cards */
  --bg-overlay:      #ECEEF3;        /* Hover, overlays */

  /* Texte */
  --text-primary:    #0A0B0E;        /* 19:1  ✅ near-black */
  --text-secondary:  #4A5568;        /* 7.0:1 ✅ */
  --text-tertiary:   #718096;        /* 4.6:1 ✅ */
  --text-disabled:   #A0AEC0;        /* décoratif */

  /* Bordures */
  --border-subtle:   #F1F3F7;
  --border-default:  #E2E8F0;
  --border-strong:   #CBD5E0;

  /* Brand */
  --brand-primary:   var(--color-orange-500);
  --brand-hover:     var(--color-orange-400);
  --ring-focus:      var(--color-orange-500);
  --ring-offset:     #FFFFFF;

  /* États */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error:   #DC2626;
  --color-info:    #2563EB;

  /* Ombres — light theme */
  --shadow-sm:      0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:      0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg:      0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);
  --shadow-glow:    0 0 24px rgba(232, 97, 26, 0.22);
  --shadow-glow-sm: 0 0 12px rgba(232, 97, 26, 0.15);
}
```

### Règles de style Light theme

```
Header scroll    : rgba(255,255,255,0.92) + blur(20px) + border rgba(0,0,0,0.07)
Mega menu        : #FFFFFF + border #E2E8F0 + shadow légère
Cards            : #FFFFFF + border #E2E8F0 + shadow-sm
Sections alt     : bg #F7F8FA
Terminal/Code    : bg #FAFAFA + border #E2E8F0 (VS Code Light theme — PAS dark)
Particles        : rgba(0,0,0,0.04) dots — très subtils
Gradient bg hero : bg-white + radial-gradient ellipse orange 7% opacity max (haut de page)
Footer           : bg #0A0B0E — SEUL élément dark autorisé
CTA Final        : bg --color-orange-500 — seule exception colorée avant le Footer
```

### Alternance des fonds de sections — HOME (ordre obligatoire)

```
01. Hero               → bg-white    (+ radial orange 7%)
02. Barre Clients      → bg-#F7F8FA
03. Services           → bg-white
04. Pourquoi Nous      → bg-#F7F8FA
05. Notre Méthode      → bg-white
06. Portfolio          → bg-#F7F8FA
07. Chiffres Clés      → bg-white
08. Témoignages        → bg-#F7F8FA
09. Pricing            → bg-white
10. FAQ                → bg-#F7F8FA
11. CTA Final          → bg-#E8611A  (--color-orange-500)
12. Footer             → bg-#0A0B0E  (seul fond dark autorisé)
```

### Classes utilitaires CSS à définir dans `globals.css`

```css
/* ─── Section wrappers — utiliser sur TOUTE balise <section> ─── */
.section-base {
  background-color: var(--bg-base);       /* #FFFFFF */
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

.section-alt {
  background-color: var(--bg-elevated);   /* #F7F8FA */
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

.section-brand {
  background-color: var(--color-orange-500);
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* ─── Container centré ─── */
.container {
  max-width:      var(--container-max-width); /* 1200px */
  margin-inline:  auto;
  padding-inline: var(--section-padding-x);
}

/* ─── Hero background ─── */
.hero-bg {
  background-color: var(--bg-base);
  background-image: radial-gradient(
    ellipse 80% 50% at 50% -10%,
    rgba(232, 97, 26, 0.07) 0%,
    transparent 70%
  );
}
```

### Typographie

```css
:root {
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
/*
  Display/Hero → 800 clamp(2.5rem,6vw,4.5rem)/1.1 heading | tracking: -0.03em
  H1           → 700 clamp(2rem,4vw,3rem)/1.15 heading
  H2           → 700 clamp(1.5rem,3vw,2.25rem)/1.25 heading
  H3           → 600 clamp(1.125rem,2vw,1.5rem)/1.35 heading
  Body         → 400 1rem/1.6 body
  Eyebrow      → 600 0.75rem/1.4 body | uppercase | tracking: 0.12em
*/
```

**`tailwind.config.ts` — fontSize avec clamp() (obligatoire) :**

```javascript
theme: {
  extend: {
    fontSize: {
      'display': ['clamp(2.5rem,6vw,4.5rem)', { lineHeight:'1.1',  fontWeight:'800', letterSpacing:'-0.03em' }],
      'h1':      ['clamp(2rem,4vw,3rem)',       { lineHeight:'1.15', fontWeight:'700' }],
      'h2':      ['clamp(1.5rem,3vw,2.25rem)',  { lineHeight:'1.25', fontWeight:'700' }],
      'h3':      ['clamp(1.125rem,2vw,1.5rem)', { lineHeight:'1.35', fontWeight:'600' }],
      'eyebrow': ['0.75rem',                    { lineHeight:'1.4',  fontWeight:'600', letterSpacing:'0.12em' }],
    },
    fontFamily: {
      heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      body:    ['Inter', 'system-ui', 'sans-serif'],
    },
  }
}
```

**Usage dans les composants :**
```tsx
// H2 de section
<h2 className="text-h2 font-bold font-heading text-[--text-primary]">

// Eyebrow
<p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-[--color-orange-500]">

// ⛔ Interdit : text-3xl, text-4xl, text-5xl hardcodés sans clamp
```

### Espacement & Layout

```css
:root {
  --section-padding-y:   clamp(4rem, 8vw, 7rem);
  --section-padding-x:   clamp(1rem, 5vw, 2rem);
  --container-max-width: 1200px;
  --nav-height:          72px;
  --border-radius-md:    0.75rem;
  --border-radius-lg:    1rem;
  --border-radius-xl:    1.5rem;
}
```

**Usage obligatoire dans les composants :**
```tsx
// ✅ Correct — tokens CSS via classes utilitaires
<section className="section-base">       {/* bg-white + padding tokens */}
<section className="section-alt">        {/* bg-#F7F8FA + padding tokens */}
<section className="section-brand">      {/* bg-orange + padding tokens */}
<section className="hero-bg">            {/* bg-white + radial orange */}
  <div className="container">            {/* max-width 1200px + centrage */}

// ⛔ Interdit — valeurs hardcodées
<section className="py-16">             {/* → utiliser section-base */}
<section className="py-20 px-4">        {/* → utiliser section-base */}
<section className="bg-gray-950">       {/* → fond dark interdit */}
<section className="bg-slate-900">      {/* → fond dark interdit */}
```

### Standards Cards

```
Cards            : bg-white + border #E2E8F0 + shadow-sm + rounded-[--border-radius-lg]
Padding interne  : p-6 (24px) — uniforme sur toutes les cards
Structure        : flex flex-col h-full — obligatoire pour hauteur uniforme
Icône container  : w-10 h-10 + bg-orange-50 + text-[--color-orange-500] + rounded-[--border-radius-md]
CTA interne      : mt-auto — ancré en bas quelle que soit la hauteur du contenu
Hover            : scale(1.03) + shadow-glow + translateY(-4px) via Framer whileHover
Transition       : duration-200 ease-out
```

**Pattern card obligatoire (ServiceCard / toute card de service) :**
```tsx
<motion.div
  className="flex flex-col h-full bg-white border border-[--border-default]
             rounded-[--border-radius-lg] [box-shadow:var(--shadow-sm)] p-6"
  whileHover={{ scale: 1.03, y: -4 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  style={{ boxShadow: undefined }} // laisser Framer gérer au hover
>
  {/* Icône */}
  <div className="w-10 h-10 flex items-center justify-center
                  rounded-[--border-radius-md] bg-orange-50
                  text-[--color-orange-500] mb-4">
    {icon}
  </div>
  {/* Titre */}
  <h3 className="text-h3 font-heading font-semibold text-[--text-primary] mb-2">
    {title}
  </h3>
  {/* Description — flex-grow pour pousser le CTA en bas */}
  <p className="text-sm text-[--text-secondary] leading-relaxed flex-grow">
    {description}
  </p>
  {/* CTA — toujours en bas grâce à mt-auto */}
  <a href={href}
     className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium
                text-[--color-orange-500] hover:gap-2.5 transition-all duration-200">
    En savoir plus <ArrowRight className="w-3.5 h-3.5" />
  </a>
</motion.div>
```

**Grille services — gestion carte orpheline :**
```tsx
// 10 services → grille 3 colonnes → dernière ligne = 1 carte seule
// La centrer avec col-start-2 pour éviter l'étirement
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
  {services.map((s, i) => (
    <div key={s.id} className={cn(
      services.length % 3 === 1 && i === services.length - 1 && "lg:col-start-2"
    )}>
      <ServiceCard {...s} />
    </div>
  ))}
</div>
```

```typescript
// Entrée standard sections
fadeInUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }
// Stagger enfants : 0.15s entre chaque
// Counter stats : 0 → valeur finale, 1.5s ease-out, au scroll
// Hover cards : scale(1.03) + shadow-glow + translateY(-4px)
// Hover CTA primary : scale(1.04) + shadow-glow
// Mega menu : fade + slide-down (Framer Motion)
// Filtre services : AnimatePresence (fade + scale)
// FAQ accordion : fade-in + expand (AnimatePresence)
// Logo scroll : CSS keyframes infini (pas Framer, pour les perfs)
// Timeline process : stagger 0.2s par étape au scroll
```

### Breakpoints

```javascript
// tailwind.config.ts
screens: { 'xs':'375px', 'sm':'640px', 'md':'768px', 'lg':'1024px', 'xl':'1280px', '2xl':'1536px' }
```

---

## 📊 STRATÉGIE DE RENDU PAR PAGE

| Page | Stratégie | Revalidation |
|------|-----------|-------------|
| `/` | SSG + ISR | 24h |
| `/services/[slug]` | SSG | statique |
| `/portfolio/[slug]` | SSG + ISR | 1h |
| `/blog/[slug]` | SSG + ISR | 30min |
| `/contact` | SSG + Server Action | statique |
| `/a-propos`, `/tarifs` | SSG | statique |

---

## 📝 FORMULAIRE CONTACT — SPECS COMPLÈTES

```typescript
// Champs (react-hook-form + zod)
- Prénom + Nom (2 colonnes)
- Email professionnel
- Téléphone / WhatsApp
- Service (select : 10 services)
- Budget :
    < 500 000 FCFA | 500k–2M | 2M–5M | 5M+ | Je ne sais pas
- Délai :
    ASAP | 1-3 mois | 3-6 mois | Flexible
- Description (textarea, min 100 chars)
- Pièce jointe optionnelle (brief, maquette, PDF)
- Case CGV

// Soumission
// → API route Next.js /api/contact
// → Resend (email) + notification WhatsApp
// → Honeypot anti-spam (pas de reCAPTCHA visible)
// → Success state : animation + message de confirmation + étapes suivantes

// Query param pré-sélection service
// Ex: /contact?service=developpement-web → select pré-rempli
```

---

## 🔑 SEO — MÉTADONNÉES

Chaque `page.tsx` exporte `generateMetadata()` depuis `CONTENT.md > MOTS-CLÉS SEO`.

```typescript
// Root layout
metadataBase: new URL('https://connect-web.tech')
title.template: '%s | Connect-Web Agence'
openGraph: { locale: 'fr_FR', siteName: 'Connect-Web Agence' }
robots: { index: true, follow: true }
```

**Schema.org :**
- `/` → `LocalBusiness` + `WebSite`
- `/services/*` → `Service` + `FAQPage`
- `/portfolio/*` → `CreativeWork`
- `/blog/*` → `Article` + `BreadcrumbList`
- `/contact` → `ContactPage`

---

## 🏷️ MEGA MENU SERVICES — STRUCTURE

```
Services ▼
┌─────────────────┬──────────────┬─────────────────┬──────────────┐
│ Développement   │ Intégration  │ Web             │ Produit      │
├─────────────────┼──────────────┼─────────────────┼──────────────┤
│ Dev Web         │ ERP          │ Sites E-commerce│ Carte NFC    │
│ Dev Mobile      │ CRM          │ Sites Vitrine   │              │
│ Apps Web        │              │                 │              │
│ Apps Mobile     │              │                 │              │
│ Logiciels SaaS  │              │                 │              │
└─────────────────┴──────────────┴─────────────────┴──────────────┘
```

---

## 💰 PRICING — RÉFÉRENCE RAPIDE

```
Sites Vitrine    : 350k–600k FCFA (Starter) | 600k–1.2M (Pro)
E-commerce       : 600k–1.2M FCFA (Starter) | 1.2M–3M (Pro)
Applications Web : 800k–2M FCFA (MVP) | Sur devis (complexe)
Logiciels SaaS   : 2M–5M FCFA (MVP) | Sur devis (scale)
ERP/CRM          : à partir de 500k FCFA
Carte NFC        : 15 000 FCFA/unité | 60 000 FCFA (Team 5) | Sur devis (Business)

Plans Home :
  Starter    → « Sur devis · Fourchette basse » | délai 1-2 sem.
  Pro        → « Sur devis · Fourchette intermédiaire » | délai 2-4 sem. ⭐ recommandé
  Sur mesure → « Sur devis · Fourchette haute » | délai 4-8 sem.

Toggle FCFA / EUR disponible sur toutes les pages pricing
Modalités : 40% commande · 60% livraison | Paiement 3x dispo > 1M FCFA
```

---

## 🌍 VARIABLES D'ENVIRONNEMENT

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=contact@connect-web.tech
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_AXEPTIO_CLIENT_ID=
```

---

## 🗺️ REDIRECTIONS 301 (next.config.ts)

```javascript
/nos-services          → /services                           301
/service-developpement → /services/developpement-web         301
/service-refonte       → /services/sites-vitrine             301
/service-ecommerce     → /services/sites-ecommerce           301
/nos-realisations      → /portfolio                          301
/nos-tarifs            → /tarifs                             301
/?page_id=*            → /                                   301
/wp-admin              → 403 bloqué
/wp-login.php          → 403 bloqué
```

---

## 🎯 OBJECTIFS PERFORMANCE

| Métrique | Objectif |
|----------|----------|
| Lighthouse mobile | **95+** |
| LCP | **< 1.2s** |
| CLS | **< 0.05** |
| INP | **< 100ms** |
| Poids page accueil | **< 400 Ko** |
| TTFB | **< 100ms** |

---

## 📋 PLAN DE SPRINTS

```
SPRINT 0 (3j) : Next.js 15 + Sanity + Vercel + tokens CSS + composants atomiques UI
SPRINT 1 (5j) : Header/Footer + Home Hero/Stats/Services + redirections 301 + SEO global
SPRINT 2 (5j) : Home complet (13 sections) + Contact + Pages légales + 404
SPRINT 3 (5j) : 5 pages services (Dev Web/Mobile, Apps Web/Mobile, SaaS)
SPRINT 4 (5j) : 5 pages services (ERP, CRM, E-commerce, Vitrine, NFC)
SPRINT 5 (4j) : Portfolio + Tarifs + À Propos + Blog
SPRINT 6 (4j) : Sitemap + Schema.org + OG images + Lighthouse 95+ + tests
SPRINT 7 (3j) : Migration contenu + redirections + go-live
TOTAL : ~29 jours ouvrés
```

---

## 🚫 INTERDICTIONS

- ❌ Ne jamais inventer du contenu — tout vient de `CONTENT.md`
- ❌ Ne jamais hardcoder couleurs/typos/espacements — utiliser les tokens CSS
- ❌ Ne jamais utiliser `localStorage` / `sessionStorage`
- ❌ Ne jamais utiliser `<form>` HTML — utiliser `react-hook-form` + Server Actions
- ❌ Ne pas écrire les textes des pages directement dans les composants
- ❌ Ne pas installer de librairies non listées sans justification
- ❌ `[PLACEHOLDER]` et `[X]` dans `CONTENT.md` restent tels quels
- ❌ Ne jamais utiliser `bg-gray-900`, `bg-gray-950`, `bg-slate-900`, `bg-zinc-900` ou toute couleur dark sur les sections — **le site est entièrement light theme**
- ❌ Ne jamais hardcoder `py-16`, `py-20`, `py-24`, `px-4`, `px-6` sur les `<section>` — utiliser les classes `.section-base` / `.section-alt` / `.section-brand`
- ❌ Ne jamais utiliser `text-3xl`, `text-4xl`, `text-5xl` pour les titres — utiliser `text-display`, `text-h1`, `text-h2`, `text-h3` définis avec clamp() dans `tailwind.config.ts`
- ❌ Ne jamais dupliquer les stats (une seule occurrence via `<StatsRow>` en section dédiée)

---

## ✅ WORKFLOW PAR SECTION

Pour chaque section, appliquer ce pattern :

```typescript
// 1. En-tête de fichier
// Source : CONTENT.md > [PAGE] > Section [NOM]
// Prompt ref : ConnectWeb_Prompt_Templates_FULL.pdf > [PAGE] → [N°]

// 2. Importer le contenu depuis @/content (jamais hardcodé)
// 3. Utiliser les tokens CSS (jamais de valeurs en dur)
// 4. TypeScript strict (interface Props explicite)
// 5. Responsive mobile-first (xs → 2xl)
// 6. Animations Framer Motion (fade-in + slide-up, stagger 0.15s)
// 7. Accessibilité WCAG AA (contrastes, focus ring, aria labels)

// 8. Background obligatoire — utiliser les classes utilitaires :
//    sections impaires  → className="section-base"   (bg-white)
//    sections paires    → className="section-alt"    (bg-#F7F8FA)
//    CTA final          → className="section-brand"  (bg-orange)
//    Hero               → className="hero-bg"        (bg-white + radial)
//    ⛔ JAMAIS bg-gray-900 / bg-slate-900 / bg-zinc-900 / bg-gray-950

// 9. Wrapping interne obligatoire :
//    <section className="section-base | section-alt | section-brand | hero-bg">
//      <div className="container">   {/* max-width 1200px centré */}
//        {/* contenu */}
//      </div>
//    </section>
```

---

*CLAUDE.md v3.1 — Connect Web — Dakar, Sénégal*
*Sources : CONTENT.md v1.0 + architecture-connect-web.md v1.0 + ConnectWeb_Prompt_Templates_FULL*
*Dernière mise à jour : Mars 2026 — Light theme enforced, tokens spacing, cards pattern, typo clamp*
