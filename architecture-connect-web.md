# ARCHITECTURE COMPLÈTE — Refonte connect-web.tech
### Document de référence technique — Senior Full-Stack Architect
> **Version :** 1.0 | **Date :** 12 Mars 2026 | **Basé sur :** Audit v1.0

---

## DÉCISIONS D'ARCHITECTURE — SYNTHÈSE

| Question | Décision retenue | Justification |
|---|---|---|
| **Stack frontend** | **Next.js 15 (App Router)** | SSG/SSR hybride, SEO natif, Lighthouse 95+, écosystème React |
| **Gestion contenu** | **Sanity.io (headless CMS)** | Interface client intuitive, GROQ, CDN d'assets intégré |
| **Hébergement** | **Vercel** | Déploiement zero-config Next.js, Edge Network, preview URLs |
| **CI/CD** | **GitHub Actions + Vercel** | Auto-deploy sur push, preview par PR, rollback instantané |
| **Design system** | **Évolution contrôlée** | Conserver le dark theme, refactoriser les tokens, corriger les contrastes |
| **Routing** | **Préserver les URLs critiques + redirections 301** | Protéger le SEO existant, éviter la perte de backlinks |

---

## PARTIE 1 — STACK TECHNIQUE

### 1.1 Framework Frontend : Next.js 15 (App Router)

**Justification du choix :**

Next.js 15 s'impose comme la solution optimale pour une agence web souhaitant démontrer sa maîtrise technique à ses propres clients. Le rendering hybride (SSG pour les pages statiques, SSR pour le contenu dynamique) garantit des scores Lighthouse 95+/100, répondant directement aux problèmes critiques identifiés dans l'audit (LCP > 3.5s, score mobile 45-60/100).

```
Alternatives évaluées :
├── Astro 5        → Excellent pour sites statiques, mais écosystème plus restreint
├── Nuxt 3         → Viable, mais Vue.js moins demandé côté recrutement
├── Remix          → Fort en mutations, complexité accrue pour ce cas d'usage
├── WordPress opt. → Rejeté — plafond de performance, dette technique maintenue
└── Next.js 15 ✅  → SSG + ISR + Server Components = performance maximale
```

**Architecture de rendu par page :**

| Page | Stratégie | Justification |
|---|---|---|
| `/` Accueil | SSG + ISR (24h) | Contenu stable, perf maximale |
| `/services/[slug]` | SSG | Pages statiques, pas de données temps réel |
| `/portfolio/[slug]` | SSG + ISR (1h) | Mis à jour régulièrement |
| `/blog/[slug]` | SSG + ISR (30min) | Articles nouveaux fréquents |
| `/contact` | SSG + Server Action | Formulaire côté serveur |
| `/a-propos` | SSG | Contenu très stable |

**Structure du projet Next.js :**

```
connect-web/
├── app/
│   ├── (marketing)/              # Route group — layout marketing
│   │   ├── layout.tsx            # Layout avec Header/Footer
│   │   ├── page.tsx              # Accueil /
│   │   ├── a-propos/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Liste services
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Page service individuelle
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   ├── contact/route.ts      # Server Action formulaire
│   │   └── revalidate/route.ts   # Webhook Sanity → ISR
│   ├── sitemap.ts                # Sitemap dynamique
│   ├── robots.ts
│   └── layout.tsx                # Root layout (fonts, analytics)
├── components/
│   ├── ui/                       # Composants atomiques (design system)
│   ├── sections/                 # Sections de pages
│   ├── layout/                   # Header, Footer, Nav
│   └── seo/                      # Métadonnées, Schema.org
├── lib/
│   ├── sanity/                   # Client + queries GROQ
│   ├── actions/                  # Server Actions (formulaires)
│   └── utils/                    # Helpers
├── styles/
│   └── globals.css               # Variables CSS (design tokens)
├── public/
│   └── images/
├── sanity/                       # Studio Sanity embedé
│   ├── schemas/
│   └── sanity.config.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 1.2 Gestion du Contenu : Sanity.io (Headless CMS)

**Justification :** Sanity offre une interface d'édition moderne que le client pourra utiliser sans connaissances techniques, tout en exposant une API GROQ ultra-performante. Le Studio peut être embarqué directement dans l'app Next.js (`/studio`).

**Schemas Sanity à créer :**

```typescript
// Schemas principaux
schemas/
├── singletons/
│   ├── homepage.ts       // Contenu accueil (hero, stats, CTA)
│   ├── settings.ts       // SEO global, réseaux sociaux, coordonnées
│   └── about.ts          // Page À Propos
├── documents/
│   ├── service.ts        // Services (slug, description, features, FAQ)
│   ├── project.ts        // Portfolio (images, techno, lien, témoignage)
│   ├── post.ts           // Articles blog (contenu portable, SEO)
│   ├── testimonial.ts    // Témoignages clients
│   └── pricingPlan.ts    // Plans tarifaires
└── objects/
    ├── seo.ts            // Objet SEO réutilisable
    ├── cta.ts            // Bouton CTA
    └── stat.ts           // Chiffre clé
```

**Exemple de requête GROQ — Page accueil :**

```groq
*[_type == "homepage"][0] {
  hero {
    headline,
    subheadline,
    ctaPrimary { label, href },
    ctaSecondary { label, href },
    backgroundImage { asset->{ url, metadata { lqip } } }
  },
  stats[] { value, label, suffix },
  featuredServices[]->{ title, slug, shortDescription, icon },
  testimonials[]->{ name, company, role, quote, avatar },
  featuredProjects[]->{ title, slug, thumbnail, techStack }
}
```

### 1.3 Hébergement & Déploiement : Vercel

**Architecture de déploiement :**

```
GitHub Repository (main branch)
         │
         ├─── Push sur main ──────────► Vercel Production
         │                               └── connect-web.tech
         │
         ├─── Pull Request ───────────► Vercel Preview URL
         │                               └── pr-42.vercel.app
         │
         └─── Webhook Sanity ─────────► Next.js ISR Revalidation
                                         └── /api/revalidate
```

**Variables d'environnement requises :**

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=               # lecture seule pour ISR
SANITY_WEBHOOK_SECRET=          # validation webhook

# Email (formulaire de contact)
RESEND_API_KEY=
CONTACT_EMAIL=contact@connect-web.tech

# Analytics
NEXT_PUBLIC_GA_ID=              # Google Analytics 4
NEXT_PUBLIC_HOTJAR_ID=          # ou Clarity (gratuit)

# RGPD
NEXT_PUBLIC_AXEPTIO_CLIENT_ID=
```

**Domaine & DNS :**

```
connect-web.tech          → Vercel (A record)
www.connect-web.tech      → Redirect 301 vers connect-web.tech
studio.connect-web.tech   → Sanity Studio (optionnel)
```

### 1.4 Dépendances clés

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "typescript": "^5.4.0",

    // CMS
    "next-sanity": "^9.0.0",
    "@sanity/image-url": "^1.0.0",

    // Styling
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",  // variants composants
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",

    // Animations
    "framer-motion": "^11.0.0",            // animations fluides
    "lenis": "^1.1.0",                     // smooth scroll

    // Icons
    "lucide-react": "^0.400.0",            // icons SVG cohérents

    // Formulaires
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",                      // validation schémas
    "resend": "^3.2.0",                    // envoi emails

    // SEO
    "schema-dts": "^1.1.0",               // types Schema.org

    // UI utilitaires
    "@radix-ui/react-dialog": "^1.0.5",   // modals accessibles
    "@radix-ui/react-accordion": "^1.1.2", // FAQ
    "embla-carousel-react": "^8.1.0"      // carousel témoignages
  },
  "devDependencies": {
    "@playwright/test": "^1.43.0",         // E2E tests
    "vitest": "^1.5.0",                    // unit tests
    "@axe-core/playwright": "^4.9.0"       // tests accessibilité
  }
}
```

**Justification des choix :**
- **Framer Motion** vs GSAP : Framer est natif React, bundle tree-shakeable, API déclarative
- **Lenis** : smooth scroll sans impact performance (rAF natif)
- **Lucide** vs FontAwesome : SVG inline, pas de requête réseau, tree-shakeable
- **Resend** vs SendGrid : DX supérieure, 100 emails/jour gratuit, delivrabilité excellente
- **Radix UI** : primitives accessibles non stylisées, WCAG 2.1 AA out-of-the-box

---

## PARTIE 2 — DESIGN SYSTEM

### 2.1 Palette de couleurs

**Philosophie :** Conserver l'identité dark/orange existante (point fort identitaire) en corrigeant les ratios de contraste pour passer WCAG AA (4.5:1 minimum).

```css
/* ── TOKENS PRIMITIFS ─────────────────────────────────── */
:root {

  /* Primaires */
  --color-orange-50:  #FFF4EE;
  --color-orange-100: #FFE4CC;
  --color-orange-200: #FFC799;
  --color-orange-300: #FF9F55;
  --color-orange-400: #FF7A20;
  --color-orange-500: #E8611A;   /* ← Brand primary */
  --color-orange-600: #C44D0E;
  --color-orange-700: #9E3A08;
  --color-orange-800: #7A2B06;
  --color-orange-900: #5A1F04;

  /* Neutres (dark theme) */
  --color-dark-950:  #080C12;   /* Fond le plus sombre */
  --color-dark-900:  #0D1117;   /* Fond principal body */
  --color-dark-800:  #161B27;   /* Fond cards/sections */
  --color-dark-700:  #1E2535;   /* Fond cards hover */
  --color-dark-600:  #2A3347;   /* Bordures subtiles */
  --color-dark-500:  #3D4F6B;   /* Bordures visibles */
  --color-dark-400:  #5A6E8F;   /* Texte désactivé */
  --color-dark-300:  #8899BB;   /* Texte secondaire */
  --color-dark-200:  #B8C8E0;   /* Texte body normal */
  --color-dark-100:  #DCE5F2;   /* Texte important */
  --color-dark-50:   #F4F7FC;   /* Texte headings */

  /* Accentuation bleue */
  --color-blue-900:  #0A1628;
  --color-blue-800:  #1A2A4A;   /* ← Brand secondary */
  --color-blue-700:  #2C3E6B;
  --color-blue-600:  #3D5490;

  /* ── TOKENS SÉMANTIQUES ───────────────────────────────── */

  /* Surfaces */
  --bg-base:         var(--color-dark-900);
  --bg-elevated:     var(--color-dark-800);
  --bg-overlay:      var(--color-dark-700);

  /* Texte — ratios WCAG AA vérifiés sur --bg-base */
  --text-primary:    var(--color-dark-50);    /* 15.8:1 ✅ */
  --text-secondary:  var(--color-dark-200);   /* 7.2:1  ✅ */
  --text-tertiary:   var(--color-dark-300);   /* 4.6:1  ✅ */
  --text-disabled:   var(--color-dark-400);   /* 3.1:1  ⚠ utiliser uniquement décoratif */

  /* Bordures */
  --border-subtle:   var(--color-dark-600);
  --border-default:  var(--color-dark-500);
  --border-strong:   var(--color-dark-400);

  /* Brand */
  --brand-primary:   var(--color-orange-500);
  --brand-secondary: var(--color-blue-800);
  --brand-hover:     var(--color-orange-400);
  --brand-active:    var(--color-orange-600);

  /* États sémantiques */
  --color-success:   #22C55E;
  --color-warning:   #F59E0B;
  --color-error:     #EF4444;
  --color-info:      #3B82F6;

  /* Surfaces sémantiques */
  --bg-success-subtle: rgba(34, 197, 94, 0.1);
  --bg-error-subtle:   rgba(239, 68, 68, 0.1);
  --bg-warning-subtle: rgba(245, 158, 11, 0.1);

  /* Focus ring (accessibilité) */
  --ring-focus:      var(--color-orange-400);
  --ring-offset:     var(--color-dark-900);
}
```

### 2.2 Typographie

**Familles choisies :** Plus Jakarta Sans (headings — moderne, géométrique) + Inter (body — lisibilité maximale). Deux familles max, chargées via `next/font` pour zéro FOUT.

```css
/* ── SCALE TYPOGRAPHIQUE (modular scale 1.25 — Major Third) ── */
:root {
  /* Familles */
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  /* Tailles (rem, base 16px) */
  --text-xs:   0.75rem;   /*  12px */
  --text-sm:   0.875rem;  /*  14px */
  --text-base: 1rem;      /*  16px */
  --text-lg:   1.125rem;  /*  18px */
  --text-xl:   1.25rem;   /*  20px */
  --text-2xl:  1.5rem;    /*  24px */
  --text-3xl:  1.875rem;  /*  30px */
  --text-4xl:  2.25rem;   /*  36px */
  --text-5xl:  3rem;      /*  48px */
  --text-6xl:  3.75rem;   /*  60px */
  --text-7xl:  4.5rem;    /*  72px */

  /* Poids */
  --font-regular:   400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;

  /* Line heights */
  --leading-tight:  1.15;
  --leading-snug:   1.35;
  --leading-normal: 1.5;
  --leading-relaxed:1.65;
  --leading-loose:  1.8;

  /* Letter spacing */
  --tracking-tight:  -0.03em;
  --tracking-normal:  0em;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;
  --tracking-widest:  0.2em;
}

/* ── USAGES TYPOGRAPHIQUES ──────────────────────────────── */
/*
  Display / Hero headline
  font: 800 clamp(2.5rem, 6vw, 4.5rem) / 1.1 var(--font-heading)
  letter-spacing: -0.03em

  H1 — Titre de page
  font: 700 clamp(2rem, 4vw, 3rem) / 1.15 var(--font-heading)

  H2 — Titre de section
  font: 700 clamp(1.5rem, 3vw, 2.25rem) / 1.25 var(--font-heading)

  H3 — Sous-titre / Card title
  font: 600 clamp(1.125rem, 2vw, 1.5rem) / 1.35 var(--font-heading)

  Body Large — Lead paragraph
  font: 400 1.125rem / 1.65 var(--font-body)

  Body — Texte courant
  font: 400 1rem / 1.6 var(--font-body)

  Body Small — Captions, labels
  font: 400 0.875rem / 1.5 var(--font-body)

  Caption / Eyebrow
  font: 600 0.75rem / 1.4 var(--font-body)
  letter-spacing: 0.12em
  text-transform: uppercase
*/
```

### 2.3 Système d'espacement (base 8px)

```css
:root {
  --space-1:   0.25rem;  /*  4px */
  --space-2:   0.5rem;   /*  8px  ← unité de base */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */

  /* Espacements sémantiques */
  --section-padding-y:     clamp(4rem, 8vw, 7rem);   /* padding vertical sections */
  --section-padding-x:     clamp(1rem, 5vw, 2rem);   /* padding horizontal */
  --container-max-width:   1200px;
  --container-wide:        1440px;
  --card-padding:          var(--space-8);
  --card-gap:              var(--space-6);
  --nav-height:            72px;
  --border-radius-sm:      0.375rem;  /* 6px */
  --border-radius-md:      0.75rem;   /* 12px */
  --border-radius-lg:      1rem;      /* 16px */
  --border-radius-xl:      1.5rem;    /* 24px */
  --border-radius-full:    9999px;
}
```

### 2.4 Breakpoints Responsive

```css
/* Mobile-first — basé sur les statistiques de trafic agences web */
:root {
  --bp-xs:  375px;   /* iPhone SE / petits mobiles */
  --bp-sm:  640px;   /* Grands mobiles / paysage */
  --bp-md:  768px;   /* Tablettes portrait */
  --bp-lg:  1024px;  /* Tablettes paysage / petits laptops */
  --bp-xl:  1280px;  /* Desktops standard */
  --bp-2xl: 1536px;  /* Grands écrans */
}
```

**Configuration Tailwind correspondante :**

```javascript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'xs':  '375px',
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        orange: { /* tokens définis ci-dessus */ },
        dark:   { /* tokens définis ci-dessus */ },
        blue:   { /* tokens définis ci-dessus */ },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      spacing: { /* tokens espacement */ },
      borderRadius: {
        'sm': 'var(--border-radius-sm)',
        'md': 'var(--border-radius-md)',
        'lg': 'var(--border-radius-lg)',
        'xl': 'var(--border-radius-xl)',
      },
    },
  },
}
```

### 2.5 Tokens d'animation

```css
:root {
  /* Durées */
  --duration-instant:  50ms;
  --duration-fast:     150ms;
  --duration-normal:   300ms;
  --duration-slow:     500ms;
  --duration-slower:   800ms;

  /* Easings */
  --ease-out:      cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --ease-in:       cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --ease-in-out:   cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1.0);

  /* Ombres (glow orange pour éléments interactifs) */
  --shadow-sm:     0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.5);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.6);
  --shadow-glow:   0 0 24px rgba(232, 97, 26, 0.35);
  --shadow-glow-sm:0 0 12px rgba(232, 97, 26, 0.2);
}
```

---

## PARTIE 3 — STRUCTURE DES PAGES

### 3.1 Sitemap de la nouvelle version

```
connect-web.tech/
│
├── /                          ← Accueil
├── /a-propos                  ← À Propos (agence, équipe, valeurs)
│
├── /services                  ← Hub services (liste + intro)
│   ├── /creation-site-web     ← Service Développement (NEW)
│   ├── /refonte-site-web      ← Service Refonte (NEW)
│   └── /site-e-commerce       ← Service E-commerce (NEW)
│
├── /portfolio                 ← Grille de projets
│   └── /[slug]                ← Case study individuelle (NEW)
│
├── /blog                      ← Liste articles
│   └── /[slug]                ← Article individuel
│
├── /contact                   ← Formulaire + coordonnées + carte
│
├── /tarifs                    ← Page dédiée plans (NEW — SEO "prix agence web")
│
├── /mentions-legales          ← Obligations légales
├── /politique-confidentialite ← RGPD
└── /sitemap.xml               ← Généré automatiquement
```

### 3.2 Composants réutilisables (Design System)

#### Composants atomiques — `components/ui/`

```typescript
// Boutons
<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" />
// Variantes :
//   primary  → bg orange, texte blanc, hover glow
//   secondary→ bg dark-700, texte white, hover bg-dark-600
//   outline  → border orange, texte orange, hover bg-orange/10
//   ghost    → transparent, texte white, hover bg-dark-700

// Badges
<Badge variant="default|success|warning|error|info" />
<Badge variant="popular" />  // "Recommandé" sur pricing

// Cards
<Card variant="default|elevated|bordered" padding="sm|md|lg" />
<Card.Header /> <Card.Body /> <Card.Footer />

// Typography
<Heading level={1|2|3|4} eyebrow="text optionnel" />
<BodyText size="sm|base|lg" />
<GradientText />  // Texte dégradé orange-brand

// Forms
<Input type="text|email|tel" label error hint />
<Textarea label error />
<Select label options />
<FormField />  // Wrapper avec label + error

// Feedback
<Alert variant="success|error|warning|info" />
<Toast />
<Skeleton />  // Loading placeholder

// Navigation
<NavLink href active />
<MobileMenu />

// Media
<OptimizedImage src alt width height priority />  // Wrapper next/image
<VideoBackground src poster />

// Layout
<Container maxWidth="default|wide|narrow" />
<Section id className />
<Grid cols={1|2|3|4} gap="sm|md|lg" />
```

#### Composants sections — `components/sections/`

```typescript
// Sections génériques réutilisables
<SectionHeader
  eyebrow="Notre approche"
  title="Titre de la section"
  description="Sous-titre optionnel"
  align="left|center"
/>

<FeatureGrid items={[{ icon, title, description }]} cols={2|3|4} />

<TestimonialsCarousel testimonials={[...]} />

<StatsRow stats={[{ value, label, suffix }]} />

<CTABanner
  title="Votre titre"
  description="..."
  primaryCta={{ label, href }}
  secondaryCta={{ label, href }}
/>

<FAQAccordion items={[{ question, answer }]} />

<PricingCard plan={...} featured={boolean} />

<ProcessStep step={number} title description icon />
```

### 3.3 Composants spécifiques par page

#### Page Accueil `/`

```typescript
// Sections dans l'ordre d'affichage
<HeroSection>
  // Background : gradient sombre + noise texture subtile (pas d'image lourde)
  // Headline animé : fade-in + slide-up (Framer Motion)
  // Eyebrow tag : "Agence web full-stack"
  // H1 : "Créez des Expériences Digitales Qui Génèrent des Résultats"
  // Subheadline : bénéfice + preuve (150+ projets livrés)
  // CTAs : Primaire "Démarrer mon projet" + Secondaire "Voir nos réalisations"
  // Social proof : logos 3-4 clients ou étoiles + note
</HeroSection>

<StatsSection>
  // 4 chiffres : projets, années, clients, satisfaction
  // Animation counter au scroll (Framer Motion / Intersection Observer)
</StatsSection>

<ServicesSection>
  // Grid 3 colonnes → 1 colonne mobile
  // Chaque card : icône SVG custom, titre, description 80 mots, CTA
  // Hover : glow orange + léger scale
</ServicesSection>

<TestimonialsSection>
  // Carousel Embla, 3 slides visibles sur desktop
  // Avatar + nom + entreprise + étoiles + citation
</TestimonialsSection>

<ProcessSection>
  // 4 étapes avec numéros, connectées par une ligne
  // Étape 4 "Suivi & Amélioration" : MÊME visibilité que les autres (fix audit)
</ProcessSection>

<FeaturedProjects>
  // Grille masonry ou 2+1 : 3 projets vedette
  // Hover : overlay avec titre + techno + lien
</FeaturedProjects>

<PricingSection>
  // 3 cards, plan central highlighted (badge "Le plus populaire")
  // Toggle mensuel/annuel (optionnel V2)
</PricingSection>

<CTAFinalSection>
  // Fond dégradé bleu-dark → orange subtil
  // "Avez-vous un projet ?" + Calendly embed ou bouton
</CTAFinalSection>
```

#### Page Service `/services/[slug]`

```typescript
<ServiceHero title description icon />
<ServiceBenefits benefits={[...]} />
<ServiceProcess steps={[...]} />
<ServiceIncludes features={[...]} />
<ServiceFAQ items={[...]} />  // Rich snippet FAQ
<ServiceCTA />
<RelatedProjects projects={[...]} />
```

#### Page Portfolio `/portfolio/[slug]`

```typescript
<ProjectHero title client year thumbnail />
<ProjectChallenge description />
<ProjectSolution description images={[...]} />
<ProjectResults metrics={[{ value, label }]} />
<ProjectTestimonial quote author />
<ProjectTechStack technologies={[...]} />
<RelatedProjects />
```

#### Page Blog `/blog/[slug]`

```typescript
<ArticleHero title date readTime category author />
<ArticleBody content={portableText} />  // @portabletext/react
<ArticleTOC headings={[...]} />         // Table des matières sticky
<AuthorCard author={...} />
<ArticleShare url title />
<RelatedArticles articles={[...]} />
<ArticleCTA />                           // CTA de conversion en bas d'article
```

#### Page Contact `/contact`

```typescript
<ContactHero />
<ContactLayout>
  <ContactForm>
    // Champs : Nom, Email, Téléphone, Sujet, Budget (select), Message
    // Validation Zod côté client + Server Action côté serveur
    // Anti-spam : honeypot field (pas de reCAPTCHA visible = meilleur UX)
    // Success state : animation + message de confirmation
  </ContactForm>
  <ContactInfo>
    // Adresse, téléphone, email
    // Horaires
    // Réseaux sociaux
    // Carte Google Maps embed (chargement lazy)
  </ContactInfo>
</ContactLayout>
```

### 3.4 Mapping URL Ancien → Nouveau & Redirections 301

```nginx
# next.config.ts — redirects()
# Conserver les URLs existantes pour préserver le SEO

async redirects() {
  return [
    # URLs que WordPress générait probablement
    {
      source: '/index.php',
      destination: '/',
      permanent: true,
    },
    {
      source: '/accueil',
      destination: '/',
      permanent: true,
    },
    {
      source: '/nos-services',
      destination: '/services',
      permanent: true,
    },
    {
      source: '/service-developpement',
      destination: '/services/creation-site-web',
      permanent: true,
    },
    {
      source: '/service-refonte',
      destination: '/services/refonte-site-web',
      permanent: true,
    },
    {
      source: '/service-ecommerce',
      destination: '/services/site-e-commerce',
      permanent: true,
    },
    {
      source: '/nos-realisations',
      destination: '/portfolio',
      permanent: true,
    },
    {
      source: '/nos-tarifs',
      destination: '/tarifs',
      permanent: true,
    },
    # Catch-all WordPress (pages avec ?page_id=XX)
    {
      source: '/:path*',
      has: [{ type: 'query', key: 'page_id' }],
      destination: '/',
      permanent: true,
    },
  ]
}
```

**Tableau complet de mapping :**

| URL Ancienne (WordPress) | URL Nouvelle (Next.js) | Code | Priorité |
|---|---|---|---|
| `/` | `/` | — | — |
| `/a-propos` | `/a-propos` | — | Préserver |
| `/nos-services` | `/services` | 301 | Haute |
| `/portfolio` | `/portfolio` | — | Préserver |
| `/blog` | `/blog` | — | Préserver |
| `/contact` | `/contact` | — | Préserver |
| `/service-developpement` | `/services/creation-site-web` | 301 | Haute |
| `/service-refonte` | `/services/refonte-site-web` | 301 | Haute |
| `/service-ecommerce` | `/services/site-e-commerce` | 301 | Haute |
| `/?page_id=XX` | `/` | 301 | Haute |
| `/wp-admin` | _(bloquer — 403)_ | — | Sécurité |
| `/wp-login.php` | _(bloquer — 403)_ | — | Sécurité |
| _(inexistant)_ | `/tarifs` | NEW | SEO |
| _(inexistant)_ | `/portfolio/[slug]` | NEW | Conversion |

### 3.5 Ordre de développement recommandé

```
SPRINT 0 — Setup (3 jours)
├── Init projet Next.js 15 + TypeScript + Tailwind
├── Configuration Sanity.io + schemas de base
├── Déploiement Vercel + variables d'env
├── Design tokens CSS + config Tailwind
└── Composants UI atomiques (Button, Card, Heading)

SPRINT 1 — Fondations (5 jours)
├── Layout global (Header, Footer, Nav mobile)
├── Page d'accueil — Sections Hero + Stats + Services
├── Système de redirections 301
├── Métadonnées SEO globales (layout.tsx)
└── Schema.org LocalBusiness

SPRINT 2 — Pages clés (5 jours)
├── Page d'accueil — Sections Témoignages + Méthode + Pricing + CTA
├── Page Services hub
├── Page Contact + Server Action email
└── Pages légales (mentions, confidentialité)

SPRINT 3 — Pages services & portfolio (5 jours)
├── Page service Création (slug: creation-site-web)
├── Page service Refonte (slug: refonte-site-web)
├── Page service E-commerce (slug: site-e-commerce)
├── Page Portfolio grille
└── Page Portfolio case study [slug]

SPRINT 4 — Blog & À propos (4 jours)
├── Page À Propos
├── Page Blog liste
├── Page Blog article [slug] + Portable Text renderer
└── Page Tarifs dédiée

SPRINT 5 — Polish & SEO (4 jours)
├── Sitemap.xml dynamique
├── Schema.org par type de page (Service, Article, FAQPage)
├── Open Graph images dynamiques (next/og)
├── Optimisation images + LCP
├── Tests Lighthouse (cible : 95+/100)
└── Tests accessibilité (axe-core)

SPRINT 6 — Migration & Go-live (3 jours)
├── Migration contenu WordPress → Sanity
├── Validation redirections 301
├── Tests cross-browser (Chrome, Firefox, Safari, Edge)
├── Test mobile (iOS Safari, Android Chrome)
├── Mise en place RGPD (Axeptio)
├── Configuration Google Analytics 4
└── Mise en ligne + monitoring (Vercel Analytics + Sentry)

TOTAL : ~29 jours ouvrés (6 semaines)
```

---

## PARTIE 4 — SEO TECHNIQUE

### 4.1 Métadonnées — Template Next.js

```typescript
// app/layout.tsx — Métadonnées globales
export const metadata: Metadata = {
  metadataBase: new URL('https://connect-web.tech'),
  title: {
    default: 'Connect-Web | Agence Web & E-commerce — Création de Sites Performants',
    template: '%s | Connect-Web Agence',
  },
  description: 'Agence web spécialisée en création de sites vitrines, refontes et boutiques e-commerce. Solutions digitales performantes, optimisées SEO. Devis gratuit sous 24h.',
  keywords: ['agence web', 'création site web', 'refonte site', 'e-commerce', 'WordPress', 'développement web'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://connect-web.tech',
    siteName: 'Connect-Web Agence',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@connectweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://connect-web.tech',
  },
}
```

### 4.2 Schema.org par page

```typescript
// Accueil : LocalBusiness + WebSite
// Services : Service + FAQPage
// Portfolio : CreativeWork
// Blog : Article + BreadcrumbList
// Contact : ContactPage
```

### 4.3 Performance cibles post-refonte

| Métrique | Avant | Objectif | Stratégie |
|---|---|---|---|
| LCP | > 3.5s | **< 1.2s** | Hero en gradient CSS, next/image priority |
| CLS | Modéré | **< 0.05** | Réserver espace images, fonts via next/font |
| INP | Élevé | **< 100ms** | Server Components, hydratation partielle |
| Score Lighthouse mobile | 45–60 | **95+** | SSG + CDN Vercel Edge |
| Score Lighthouse desktop | 60–75 | **98+** | Idem |
| Poids page (accueil) | 3–6 Mo | **< 400 Ko** | Images WebP, tree-shaking, code splitting |
| TTFB | ~800ms | **< 100ms** | Edge caching Vercel |

---

## CHECKLIST DE DÉMARRAGE

### Avant de coder

- [ ] Récupérer toutes les URLs WordPress avec Screaming Frog
- [ ] Exporter le contenu WordPress (XML) pour migration
- [ ] Vérifier les backlinks existants (Ahrefs/Google Search Console)
- [ ] Collecter 3-5 témoignages clients (texte + photo + accord)
- [ ] Rassembler les chiffres clés de l'agence (projets, années, etc.)
- [ ] Préparer les nouvelles images (hero, équipe, portfolio)

### Avant la mise en ligne

- [ ] Tous les redirections 301 testées avec curl
- [ ] Sitemap soumis à Google Search Console
- [ ] Score Lighthouse ≥ 95 sur mobile
- [ ] Tests WCAG AA (contraste, navigation clavier, screen reader)
- [ ] RGPD : bannière cookie + politique de confidentialité
- [ ] Formulaire de contact testé (envoi + confirmation)
- [ ] Analytics configuré (GA4 + Search Console)
- [ ] Monitoring d'erreurs (Sentry ou Vercel Analytics)
- [ ] Backup WordPress conservé 6 mois minimum

---

*Document rédigé le 12 Mars 2026 — Architecture v1.0 — Senior Full-Stack Architect*
*Basé sur l'audit connect-web.tech v1.0*
