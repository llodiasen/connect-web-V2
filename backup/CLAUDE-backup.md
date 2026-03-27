# CLAUDE.md — Connect Web
# Instructions permanentes pour Claude Code
# Version 4.0 — Design System refonte minimaliste (Stripe / Resend)
# Ce fichier est lu automatiquement à chaque session

---

## 🔴 RÈGLE N°0 — SPACING & PADDING : TOUJOURS INLINE STYLES

**Ce projet utilise Tailwind v4 CSS-first + Turbopack.**
Ces deux outils combinés ne génèrent pas de façon fiable les classes de spacing.

### ❌ NE JAMAIS utiliser ces classes Tailwind pour le spacing pixel-précis :
```
p-7, p-8, p-9, p-10     → padding
px-2.5, py-2.5, py-3.5  → padding avec .5
mb-2.5, mb-10, mb-12    → margin-bottom
h-9, h-11, h-13, h-14   → hauteur fixe
w-11, h-11, gap-6        → taille / gap
```

### ✅ TOUJOURS utiliser `style={{}}` inline pour :
```tsx
// Padding interne de carte / section
style={{ padding: '28px' }}                    // jamais p-7

// Margin entre éléments
style={{ marginBottom: '56px' }}               // jamais mb-12 / mb-14

// Hauteur de bouton
style={{ height: '52px', padding: '0 32px' }} // jamais h-13 px-8

// Taille d'icône wrapper
style={{ width: '44px', height: '44px' }}     // jamais w-11 h-11

// Gap flex/grid
style={{ gap: '24px' }}                        // jamais gap-6 si critique
```

### Classes Tailwind AUTORISÉES (échelle entière standard) :
```
Mise en page  : grid, flex, items-center, justify-center, container
Couleurs      : text-white, bg-[#...], border-[#...]
Typographie   : text-[13px], font-semibold, leading-relaxed
Bordures      : rounded-lg, rounded-xl, rounded-2xl
Responsive    : sm:, md:, lg:, xl:
Transitions   : transition-all, duration-200
```

### Référence des valeurs standard du projet :
```
Padding carte          : 28px
Padding section        : clamp(4rem, 8vw, 7rem) via paddingBlock
Icône wrapper carte    : width/height 44px
Gap icône → titre      : marginBottom 16px
Gap titre → texte      : marginBottom 10px
Gap texte → lien       : marginTop 16px
Margin header → grid   : marginBottom 48–56px
Hauteur bouton primary : height 52px, padding 0 32px
Hauteur bouton nav     : height 38px, padding 0 18px
Hauteur bouton sm      : height 36px, padding 0 16px

Tokens typographie UI (globals.css) :
--card-title-size    : 20px              → fontSize titre h3 carte (font-heading font-bold)
--card-text-size     : 15.5px           → fontSize description carte (textAlign justify)
--filter-text-size   : 14px             → fontSize boutons filtres/tabs
--faq-question-size  : clamp(1rem, 1.5vw, 1.125rem) → fontSize question FAQ (16–18px)
--faq-answer-size    : 16px             → fontSize réponse FAQ (textAlign justify)
⚠️ Ne jamais hardcoder ces valeurs — toujours utiliser var(--card-title-size) etc.
```

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

## ✍️ RÈGLE COPYWRITING — VOIX & TON CONNECT WEB

Tout texte généré pour ce site respecte ces règles sans exception.
Connect Web est une agence digitale experte basée à Dakar — pas une startup générique.

### La cible
```
Profil     : Dirigeants, fondateurs, responsables digitaux
Marché     : PME/TPE sénégalaises · Startups Afrique de l'Ouest · Diaspora africaine
Douleur    : Ils ont déjà été déçus par un prestataire peu sérieux
Attente    : Résultats mesurables, délais tenus, interlocuteur compétent
Tolérance  : ZÉRO pour le contenu vague, les superlatifs creux, le jargon inutile
```

### Les 6 règles d'écriture

```
1. CONCIS
   Titres H2 : 4 à 7 mots max. Sous-titres : 1 ligne max.
   Descriptions card : 2 lignes max, jamais 3.
   Couper tout mot qui ne porte pas de sens.

2. CONCRET — Chiffres et faits, jamais de vagues.
   ❌ « des performances exceptionnelles »
   ✅ « Lighthouse 95+ garanti à la livraison »
   ❌ « nous accompagnons vos projets »
   ✅ « de la maquette Figma au déploiement Vercel en 3 semaines »

3. ORIENTÉ RÉSULTAT — Le visiteur achète un résultat, pas une technologie.
   ❌ « nous utilisons Next.js 14 avec App Router »
   ✅ « votre site charge en moins d'1 seconde »
   Mentionner la techno uniquement si elle justifie le résultat.

4. VOIX DIRECTE — 2e personne, toujours.
   ❌ « les clients bénéficient de... »
   ✅ « vous obtenez... » / « votre site... » / « vos visiteurs... »

5. ANCRÉ LOCALEMENT — Mentionner Wave, Orange Money, CEDEAO quand pertinent.
   Le visiteur sénégalais doit se sentir compris, pas adressé par une agence parisienne.

6. ZÉRO REMPLISSAGE — Mots interdits sur tout le site :
   ❌ « clé en main » · « à votre écoute » · « qualité premium »
   ❌ « expertise reconnue » · « nous mettons tout en œuvre »
   ❌ « passionné » · « innovant » · « solution complète »
   Si CONTENT.md contient ces mots → les reformuler selon ces règles.
```

### Formules approuvées

```
TITRES H1  : [Résultat] + [différenciateur]
             ✅ « Des sites web qui convertissent — livrés en 3 semaines »

TITRES H2  : Court + direct + orienté visiteur (4–7 mots)
             ✅ « Vos problèmes. Nos solutions. »
             ✅ « Ce que vous obtenez »

CARDS      : [Ce que c'est] + [ce que ça vous apporte] — 2 lignes max
             ✅ « Site rapide, responsive, optimisé SEO. Livré avec CMS
                 pour que vous le mettiez à jour seul. »

BADGES     : 4 mots max, factuel
             ✅ « Livraison 3 semaines » · « Lighthouse 95+ » · « Support 30j »

CTA        : Verbe d'action + objet concret
             ✅ « Démarrer mon projet » · « Obtenir une estimation »
             ❌ « En savoir plus » · « Découvrir » · « Cliquez ici »

FAQ        : Réponse directe d'abord, précision ensuite — 1 à 3 phrases max
             ✅ « À partir de 350 000 FCFA. Le budget final dépend du
                 nombre de pages et des fonctionnalités. »
             ❌ « Cela dépend de nombreux facteurs tels que... »
```

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
│   │   ├── solutions/
│   │   │   ├── page.tsx                    ← /solutions (hub verticaux)
│   │   │   ├── restaurant/page.tsx         ← /solutions/restaurant
│   │   │   ├── hotel/page.tsx              ← /solutions/hotel
│   │   │   └── immobilier/page.tsx         ← /solutions/immobilier
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
| `/` | `(marketing)/page.tsx` | 9 sections |
| `/a-propos` | `a-propos/page.tsx` | 6 sections |
| `/contact` | `contact/page.tsx` | 3 sections |
| `/portfolio` | `portfolio/page.tsx` | 3 sections |
| `/tarifs` | `tarifs/page.tsx` | 5 sections |
| `/blog` | `blog/page.tsx` | 2 sections |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | 1 layout complet |
| `/mentions-legales` | `mentions-legales/page.tsx` | 1 section |
| `/confidentialite` | `confidentialite/page.tsx` | 1 section |
| `/404` | `not-found.tsx` | 1 section |

### Pages solutions verticales (3 solutions packagées)
| URL | Fichier | Description |
|-----|---------|-------------|
| `/solutions` | `solutions/page.tsx` | Hub des 3 solutions |
| `/solutions/restaurant` | `solutions/restaurant/page.tsx` | Solution Resto Connect |
| `/solutions/hotel` | `solutions/hotel/page.tsx` | Solution Hôtel Connect |
| `/solutions/immobilier` | `solutions/immobilier/page.tsx` | Solution Immo Connect |

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

**Chaque page service définit ses propres sections selon le contenu dans CONTENT.md.**

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
03. Tableau      → Comparatif Starter/Pro/Sur mesure (header #111111)
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
// Logo gauche · Nav centrale · CTA « Démarrer un projet » (bg-[#1B2A4A] text-white hover:bg-[#E8611A]) droite
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
// ⛔ Le bouton CTA nav est bg-[#1B2A4A] par défaut — hover bg-[#E8611A] uniquement
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
// Top : séparateur border-[--border-default] 1px (PAS orange)
// Titres : --color-primary, uppercase, letter-spacing
// Liens hover : orange + translateX(4px)
```

### Atomiques — `components/ui/`

```typescript
<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" />
// primary  → bg-[#1B2A4A] text-white + hover: bg-[#E8611A] text-white
// secondary→ bg-[--bg-elevated] + hover bg-[--bg-overlay]
// outline  → border-[--border-default] + hover border-[--border-strong]
// ghost    → transparent + hover bg-[--bg-elevated]
// ✅ hover primary = bg-[#E8611A] orange — UNIQUEMENT sur le hover, jamais en état par défaut

<Badge variant="default|success|warning|error|info|popular" />
<Card variant="default|elevated|bordered" padding="sm|md|lg" />
<Heading level={1|2|3|4} eyebrow="texte optionnel" />
<GradientText />            // dégradé orange-brand (texte uniquement)
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
<TestimonialsCarousel testimonials />// Embla, sans autoplay, pause hover
<StatsRow stats />                   // counter animé Intersection Observer
<CTABanner primaryCta secondaryCta />
<FAQAccordion items />               // Radix, un seul ouvert, icône +/× animée
<PricingCard plan featured />        // toggle FCFA/EUR
<ProcessStep step title description />
<ComparisonTable />                  // tableau Connect Web vs alternatives
<TechStack technologies />           // logos groupés par catégorie
<CaseStudyCard project />            // screenshot + métriques
<PainPoints items />                 // cards rouge/gris + animation shake hover
<BeforeAfter leftItems rightItems /> // layout 2 col avant/après + flèche animée
```

### Sections Home spécifiques

```typescript
<HeroSection />       // bg-white + radial orange 7% opacity, typing animation, fade+slide Framer
<LogoScrollBanner />  // CSS keyframes infini, pause hover, masques dégradé
<ServicesGrid />      // filtres tabs (AnimatePresence), hover: bg-[--bg-elevated] + translateY(-4px)
<PortfolioPreview />  // 4 projets, overlay hover, grille masonry/2×2
<PricingSection />    // 3 plans, central border-[#111111] 2px (PAS bg orange)
<CTAFinalSection />   // bg-[#1B2A4A] + formulaire inline rapide + liens WhatsApp/email
```

---

## 🎨 DESIGN SYSTEM

> Défini dans `styles/globals.css` et `tailwind.config.ts`.
> **Ne jamais hardcoder des valeurs** — toujours utiliser les tokens CSS.

### Philosophie
**Charte logo Connect Web — Bleu foncé dominant + Orange accent.**
Couleurs extraites directement du logo : bleu foncé `#1B2A4A` (texte CONNECT) + bleu medium `#2D3E5F` (WEB) + orange `#E8611A` (icône power).
**Hero uniquement : fond sombre `#0A0B0E` — comme le Hero Dev Web (capture de référence).**
**Toutes les autres sections : fonds soft blancs et gris très clairs — PAS de bleu foncé sur les sections de contenu.**
**⛔ `#1B2A4A` et `#2D3E5F` sont réservés au Hero, Header, Footer et boutons CTA — jamais en fond de section de contenu.**
**⛔ L'orange n'apparaît JAMAIS en fond de section entière — seulement en accent, hover, eyebrow, icônes.**
**✅ Boutons CTA primaires : fond `#1B2A4A` (bleu) par défaut — hover `#E8611A` (orange) + texte blanc.**

### Couleurs

```css
:root {
  /* ── CHARTE LOGO CONNECT WEB ── */
  /* Extrait du logo : CONNECT=#1B2A4A · WEB=#2D3E5F · Icône power=#E8611A */

  /* Bleu brand — couleur dominante */
  --color-blue-900:  #1B2A4A;   /* Logo "CONNECT" — fond Hero, boutons CTA, section dark */
  --color-blue-800:  #2D3E5F;   /* Logo "WEB" — hover sections dark, textes sur fond clair */
  --color-blue-700:  #3D5278;   /* Hover boutons, liens actifs */
  --color-blue-600:  #4D6490;   /* Borders accent bleu */
  --color-blue-100:  #E2EAF4;   /* Fond badge/pill bleu clair */
  --color-blue-50:   #EEF3FA;   /* Fond icône wrapper */

  /* Orange brand — accent uniquement */
  --color-orange-500: #E8611A;  /* Icône power logo — eyebrow, hover, icônes, accents */
  --color-orange-400: #FF7A20;  /* Hover orange */
  --color-orange-600: #C44D0E;  /* Active orange */
  --color-orange-50:  #FEF3EC;  /* Fond badge orange clair */

  /* ── TOKENS SÉMANTIQUES ── */

  /* Surfaces */
  --bg-base:          #FAFAFA;        /* Fond body — blanc cassé */
  --bg-elevated:      #F4F6FA;        /* Sections alternées — légèrement bleuté */
  --bg-blue-dark:     #1B2A4A;        /* Sections dark — bleu logo */
  --bg-blue-medium:   #2D3E5F;        /* Sections dark medium */
  --bg-blue-light:    #EEF3FA;        /* Sections accent bleu très clair */

  /* Texte */
  --text-primary:     #1B2A4A;        /* Bleu logo — remplace le noir */
  --text-secondary:   #4A5568;
  --text-tertiary:    #718096;
  --text-on-dark:     #FFFFFF;
  --text-on-dark-muted: rgba(255,255,255,0.65);

  /* Bordures */
  --border-subtle:    #EEF1F7;
  --border-default:   #DDE3EE;
  --border-strong:    #C5CFDF;
  --border-blue:      var(--color-blue-600);

  /* Brand tokens */
  --brand-primary:    var(--color-blue-900);   /* Bleu logo — boutons, liens */
  --brand-secondary:  var(--color-blue-800);   /* Bleu medium */
  --brand-accent:     var(--color-orange-500); /* Orange — hover et accents */
  --ring-focus:       var(--color-blue-700);
  --ring-offset:      #FFFFFF;

  /* États */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error:   #DC2626;
  --color-info:    var(--color-blue-700);

  /* Ombres — teintées bleu pour cohérence charte */
  --shadow-sm: 0 1px 3px rgba(27,42,74,0.08), 0 1px 2px rgba(27,42,74,0.05);
  --shadow-md: 0 4px 16px rgba(27,42,74,0.10), 0 2px 4px rgba(27,42,74,0.06);
  --shadow-lg: 0 8px 32px rgba(27,42,74,0.12), 0 4px 8px rgba(27,42,74,0.07);
}
```

### Règles de style — charte Connect Web

```
Header scroll    : rgba(27,42,74,0.95) + blur(20px) — bleu logo semi-transparent
Mega menu        : #FFFFFF + border #DDE3EE + shadow-md bleutée
Cards standard   : #FFFFFF + border #DDE3EE + shadow-sm bleutée
Cards flush      : grille divide #DDE3EE, hover bg-[#F4F6FA]
Sections alt     : bg-[#F4F6FA] — bleuté très léger
Hero             : bg-[#1B2A4A] — bleu logo foncé
Footer           : bg-[#1B2A4A] — bleu logo foncé (même que hero)
CTA Finale       : bg-[#2D3E5F] — bleu medium logo

BOUTONS — RÈGLE CHARTE LOGO :
  CTA primaire   : bg-[#1B2A4A] text-white
                   hover: bg-[#2D3E5F] + border-[#E8611A]
  CTA secondaire : bg-transparent border border-[#DDE3EE] text-[#1B2A4A]
                   hover: border-[#E8611A] text-[#E8611A]
  Liens nav      : text-white/80 (sur header bleu)
                   hover: text-[#E8611A]
  Liens cards    : text-[#1B2A4A]
                   hover: text-[#E8611A]
  Eyebrow        : text-[#E8611A] (orange — toujours)
  Icônes wrapper : bg-[#EEF3FA] text-[#1B2A4A]
                   hover card: bg-[#FEF3EC] text-[#E8611A]

⛔ JAMAIS bg-[#E8611A] ou bg-orange-* en état par défaut sur un bouton — uniquement au :hover
⛔ JAMAIS bg-[#111111] ou bg-[#0A0B0E] — remplacer par #1B2A4A ou #2D3E5F
✅ L'orange = hover boutons + eyebrow + icônes + borders accent
```

### Alternance des fonds de sections — HOME (ordre obligatoire)

```
01. Hero               → bg-[#0A0B0E] text-white   ← Sombre (référence Hero Dev Web)
02. Stats              → bg-[#F4F6FA]               ← Gris très léger
03. Services           → bg-white                   ← Blanc pur
04. Pourquoi Nous      → bg-[#F4F6FA]               ← Gris très léger
05. Notre Méthode      → bg-white                   ← Blanc pur
06. Portfolio          → bg-[#F4F6FA]               ← Gris très léger
07. Témoignages        → bg-white                   ← Blanc pur
08. FAQ                → bg-[#F4F6FA]               ← Gris très léger
09. CTA Final          → bg-[#1B2A4A] text-white    ← Bleu logo (exception unique)
10. Footer             → bg-[#0A0B0E] text-white    ← Sombre

RÈGLE ABSOLUE :
- Hero    → bg-[#0A0B0E] UNIQUEMENT
- Contenu → alternance bg-white / bg-[#F4F6FA] UNIQUEMENT
- CTA     → bg-[#1B2A4A] — seule section de contenu dark autorisée
- Footer  → bg-[#0A0B0E]
- ⛔ PAS de bg-[#1B2A4A] ou bg-[#2D3E5F] sur les sections de contenu
- ⛔ PAS de bg-[#EEF3FA] ou bg-blue-* sur les sections
```

### Alternance des fonds — pages services

```
Hero               → bg-[#0A0B0E] text-white
Sections impaires  → bg-white (section-base)
Sections paires    → bg-[#F4F6FA] (section-alt)
CTA Final          → bg-[#1B2A4A] text-white (section-brand)
```

### Classes utilitaires CSS à définir dans `globals.css`

```css
/* ─── Section wrappers — charte Connect Web ─── */

.section-base {
  background-color: #FFFFFF;
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* Bleuté très léger — sections alternées */
.section-alt {
  background-color: #F4F6FA;
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* Bleu très clair — sections accent */
.section-blue-soft {
  background-color: #EEF3FA;
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* Bleu logo foncé — sections dark principales */
.section-brand {
  background-color: #1B2A4A;
  color:            #FFFFFF;
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* Bleu logo medium — sections dark secondaires */
.section-brand-medium {
  background-color: #2D3E5F;
  color:            #FFFFFF;
  padding-block:    var(--section-padding-y);
  padding-inline:   var(--section-padding-x);
}

/* ─── Container centré ─── */
.container {
  max-width:      var(--container-max-width);
  margin-inline:  auto;
  padding-inline: var(--section-padding-x);
}

/* ─── Hero — fond sombre comme Hero Dev Web (référence visuelle) ─── */
/* bg-[#0A0B0E] — titre blanc massif, code animé, badges métriques   */
.hero-bg {
  background-color: #0A0B0E;
  color:            #FFFFFF;
  background-image: radial-gradient(
    ellipse 60% 50% at 65% 50%,
    rgba(232, 97, 26, 0.08) 0%,
    transparent 70%
  );
}

/* ─── Cards flush ─── */
.cards-flush {
  display:          grid;
  border:           1px solid #DDE3EE;
  border-radius:    var(--border-radius-lg);
  overflow:         hidden;
  gap:              1px;
  background-color: #DDE3EE;
}
.cards-flush > * {
  background-color: #FFFFFF;
  padding:          28px;
  transition:       background-color 0.15s ease;
}
.cards-flush > *:hover {
  background-color: #F4F6FA;
}
```

/* ─── Pattern cards flush (style Vercel) ─── */
/* Utiliser pour toute grille de 2, 3 ou 4 cartes */
.cards-flush {
  display:          grid;
  border:           1px solid var(--border-default);
  border-radius:    var(--border-radius-lg);
  overflow:         hidden;
  gap:              1px;
  background-color: var(--border-default); /* la couleur du "gap" entre cartes */
}
.cards-flush > * {
  background-color: #FFFFFF;
  padding:          28px;
  transition:       background-color 0.15s ease;
}
.cards-flush > *:hover {
  background-color: var(--bg-elevated);
}
```

### Typographie

```css
:root {
  --font-heading: 'Syne', system-ui, sans-serif;       /* Titres display + section */
  --font-body:    'DM Sans', system-ui, sans-serif;    /* Corps + UI + boutons */
}
/*
  Display/Hero → Syne 600  clamp(1.75rem,4vw,2.625rem)/1.1  | tracking: -0.03em  [MAX 42px]
  H1           → Syne 600  clamp(1.5rem,3vw,2.25rem)/1.15   | tracking: -0.025em [MAX 36px]
  H2           → Syne 600  clamp(1.25rem,2.5vw,2rem)/1.25   | tracking: -0.02em  [MAX 32px]
  H3           → DM Sans 500  14px/1.35
  Body         → DM Sans 300  15px/1.7
  Eyebrow      → DM Sans 500  11px | uppercase | tracking: 0.08em | color: --color-orange-500
*/
```

**`tailwind.config.ts` — fontSize avec clamp() (obligatoire) :**

```javascript
theme: {
  extend: {
    fontSize: {
      // MAX 42px strict sur le display — jamais dépasser
      'display': ['clamp(1.75rem,4vw,2.625rem)', { lineHeight:'1.1',  fontWeight:'600', letterSpacing:'-0.03em' }],
      'h1':      ['clamp(1.5rem,3vw,2.25rem)',    { lineHeight:'1.15', fontWeight:'600', letterSpacing:'-0.025em' }],
      'h2':      ['clamp(1.25rem,2.5vw,2rem)',    { lineHeight:'1.25', fontWeight:'600', letterSpacing:'-0.02em' }],
      'h3':      ['14px',                          { lineHeight:'1.35', fontWeight:'500' }],
      'eyebrow': ['11px',                          { lineHeight:'1.4',  fontWeight:'500', letterSpacing:'0.08em' }],
    },
    fontFamily: {
      heading: ['Syne', 'system-ui', 'sans-serif'],
      body:    ['DM Sans', 'system-ui', 'sans-serif'],
    },
  }
}
```

**Chargement des fonts dans `app/layout.tsx` :**
```tsx
// Google Fonts — ajouter dans le <head> via next/font/google
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})
```

**Usage dans les composants :**
```tsx
// H2 de section
<h2 className="text-h2 font-heading text-[--text-primary]">

// Eyebrow
<p className="text-eyebrow font-body uppercase tracking-[0.08em] text-[--color-orange-500]">

// Corps
<p className="font-body text-[15px] font-light text-[--text-secondary] leading-[1.7]">

// ⛔ Interdit : text-3xl, text-4xl, text-5xl hardcodés sans clamp
// ⛔ Interdit : Plus Jakarta Sans ou Inter (remplacés par Syne + DM Sans)
```

### Espacement & Layout

```css
:root {
  --section-padding-y:   clamp(4rem, 8vw, 7rem);
  --section-padding-x:   clamp(1rem, 5vw, 2rem);
  --container-max-width: 1200px;
  --nav-height:          56px;         /* réduit de 72px à 56px — plus sobre */
  --border-radius-md:    0.5rem;       /* 8px */
  --border-radius-lg:    0.75rem;      /* 12px */
  --border-radius-xl:    1rem;         /* 16px */
}
```

**Usage obligatoire dans les composants :**
```tsx
// ✅ Correct — tokens CSS via classes utilitaires
<section className="section-base">       {/* bg-white + padding tokens */}
<section className="section-alt">        {/* bg-#F7F8FA + padding tokens */}
<section className="section-brand">      {/* bg-#111111 + padding tokens */}
<section className="hero-bg">            {/* bg-#fafafa + radial orange */}
  <div className="container">            {/* max-width 1200px + centrage */}

// ⛔ Interdit — valeurs hardcodées
<section className="py-16">             {/* → utiliser section-base */}
<section className="py-20 px-4">        {/* → utiliser section-base */}
<section className="bg-gray-950">       {/* → fond dark interdit sauf section-brand/footer */}
<section className="bg-slate-900">      {/* → fond dark interdit */}
<section className="bg-orange-500">     {/* → orange interdit en fond de section */}
<section className="bg-[#E8611A]">      {/* → orange interdit en fond de section */}
```

### 🔴 RÈGLE HERO — STRUCTURE COMPLÈTE OBLIGATOIRE (v4.2 — Mars 2026)

> **Référence absolue : `developpement-mobile-hero.tsx`**
> Toute page service DOIT reproduire exactement ce pattern. Pas d'interprétation.

```tsx
// ═══════════════════════════════════════════════════════════════════
// TEMPLATE HERO — à copier/adapter pour chaque nouvelle page service
// ═══════════════════════════════════════════════════════════════════

<section
  className="hero-bg"
  aria-label="Service · [Nom du service]"
  style={{
    position:      'relative',
    overflow:      'hidden',
    paddingTop:    'clamp(5rem, 10vw, 8rem)',
    paddingBottom: 'clamp(4rem, 8vw, 7rem)',
  }}
>
  {/* Lueur bleue bas-droite */}
  <div aria-hidden="true" style={{
    position: 'absolute', bottom: '-15%', right: '-5%',
    width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
    background: 'radial-gradient(circle, rgba(26,42,74,0.35) 0%, transparent 65%)',
    pointerEvents: 'none',
  }} />

  {/* Grille de points décorative */}
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
    backgroundSize: '32px 32px', pointerEvents: 'none',
  }} />

  <div className="container" style={{ position: 'relative', zIndex: 1 }}>
    <div
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
      style={{ gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }}
    >

      {/* ══ COLONNE GAUCHE 60% — Contenu ══ */}
      <div>

        {/* 1. Badge eyebrow — TOUJOURS ce style exact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: '24px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(232,97,26,0.10)', border: '1px solid rgba(232,97,26,0.25)',
            borderRadius: '100px', padding: '5px 14px',
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--color-orange-400)',
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'var(--color-orange-500)', flexShrink: 0,
            }} />
            Service · [Nom du service]
          </span>
        </motion.div>

        {/* 2. H1 — RÈGLES STRICTES (lire attentivement) */}
        {/*
          ❌ INTERDIT :
             - className="text-h1"  → ~60px, trop grand, wrape en 5+ lignes
             - style.fontFamily inline  → inutile, porté par font-heading
             - style.fontWeight inline  → inutile, porté par font-bold
             - fontSize > clamp(2rem, 3.75vw, 3rem) pour les 2-col
             - Un seul bloc de texte continu sans coupures explicites

          ✅ OBLIGATOIRE :
             - className="font-heading font-bold"
             - fontSize: 'clamp(2rem, 3.75vw, 3rem)'  → ~45px à 1200px
             - lineHeight: 1.08
             - letterSpacing: '-0.03em'
             - whiteSpace: 'pre-wrap'
             - MAX 3 lignes desktop — chaque ligne ≥ 75% largeur colonne
             - display:'block' sur chaque <span> pour forcer les coupures
             - Mot accent en orange : style={{ display:'block', color:'var(--color-orange-500)' }}

          CALCUL REMPLISSAGE (vérifier avant de valider) :
             Colonne 60% à 1200px = ~645px disponibles
             nb_chars × 45px × 0.55 ≤ 645  →  max ~26 chars par ligne
        */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="font-heading font-bold"
          style={{
            color:         '#F4F7FC',
            marginBottom:  '20px',
            fontSize:      'clamp(2rem, 3.75vw, 3rem)',
            lineHeight:    1.08,
            letterSpacing: '-0.03em',
            whiteSpace:    'pre-wrap',
          }}
        >
          <span style={{ display: 'block' }}>Ligne 1 — remplit la colonne</span>
          <span style={{ display: 'block', color: 'var(--color-orange-500)' }}>
            Ligne 2 accent orange
          </span>
        </motion.h1>

        {/* 3. Sous-titre — TOUJOURS className="text-hero-subtitle" */}
        {/*
          ❌ INTERDIT : style.fontFamily / style.fontSize inline sur le sous-titre
          ✅ OBLIGATOIRE : className="text-hero-subtitle" + uniquement maxWidth/marginBottom en style
        */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.30 }}
          className="text-hero-subtitle"
          style={{ maxWidth: '500px', marginBottom: '28px' }}
        >
          [Description courte — 1 à 2 lignes max, orientée résultat]
        </motion.p>

        {/* 4. Badge différenciateur (tech stack / promesse) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          style={{ marginBottom: '36px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#161B27', border: '1px solid #1E2535',
            borderRadius: '8px', padding: '7px 14px',
            fontFamily: 'var(--font-body)', fontSize: '12px',
            fontWeight: 500, color: '#6B7FA3', letterSpacing: '0.01em',
          }}>
            <span style={{ color: '#3B4A6B', userSelect: 'none' }}>◆</span>
            <span>Argument 1</span>
            <span style={{ color: '#2A3347', userSelect: 'none' }}>·</span>
            <span>Argument 2</span>
            <span style={{ color: '#2A3347', userSelect: 'none' }}>·</span>
            <span>Argument 3</span>
          </span>
        </motion.div>

        {/* 5. CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.60 }}
          className="flex flex-wrap items-center"
          style={{ gap: '12px' }}
        >
          {/* CTA primaire — gradient orange */}
          <Link href="/contact?service=[slug]"
            className="inline-flex items-center font-semibold"
            style={{
              gap: '8px', padding: '13px 26px',
              background: 'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
              borderRadius: '10px', fontSize: '14px', color: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)',
              transition: 'box-shadow 200ms ease, transform 150ms ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,97,26,0.38), 0 0 0 1px rgba(232,97,26,0.4)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            [Label CTA primaire]
            <ArrowRight size={15} aria-hidden="true" />
          </Link>

          {/* CTA secondaire — outline */}
          <Link href="/portfolio"
            className="inline-flex items-center font-semibold"
            style={{
              gap: '8px', padding: '12px 24px',
              background: 'transparent', border: '1px solid #2A3347',
              borderRadius: '10px', fontSize: '14px', color: '#B8C8E0',
              transition: 'border-color 200ms ease, color 200ms ease, background 200ms ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(232,97,26,0.4)'
              e.currentTarget.style.color       = '#F4F7FC'
              e.currentTarget.style.background  = 'rgba(232,97,26,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#2A3347'
              e.currentTarget.style.color       = '#B8C8E0'
              e.currentTarget.style.background  = 'transparent'
            }}
          >
            Voir nos réalisations
          </Link>
        </motion.div>

      </div>

      {/* ══ COLONNE DROITE 40% — Visuel + Pills flottantes ══ */}
      <motion.div
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        style={{ position: 'relative' }}
      >
        {/* Mockup spécifique au service (Phone / Browser / Dashboard / Code editor) */}
        <[ServiceMockup] />

        {/* 3 pills flottantes — bg-white, border #E5E7EB, rounded-full */}
        {/* animate={{ y: [0, -8, 0] }}, duration 3.5s, delay échelonné 0 / 1.1 / 2.2 */}
        {/* positions : top:-18px right:8% | bottom:30% left:-20px | bottom:-18px right:12% */}
        {METRIC_PILLS.map(pill => <FloatingPill key={pill.label} {...pill} />)}
      </motion.div>

    </div>
  </div>
</section>
```

**Récapitulatif des interdictions hero :**
```
❌ className="text-h1"                       → remplacer par font-heading font-bold + style inline
❌ fontSize: clamp(2.5rem, 5vw, 4rem)        → remplacer par clamp(2rem, 3.75vw, 3rem)
❌ style.fontFamily ou style.fontWeight sur H1 → porté par les classes Tailwind
❌ Texte H1 continu sans display:block spans  → chaque ligne = un <span style={{display:'block'}}>
❌ Sous-titre avec style.fontFamily/fontSize  → className="text-hero-subtitle" obligatoire
❌ Plus de 3 lignes visuelles sur desktop     → reécrire le titre si nécessaire
❌ bg-white ou fond clair sur un Hero         → uniquement hero-bg (#0A0B0E)
❌ Fond bleu (#1B2A4A) sur un Hero            → uniquement hero-bg (#0A0B0E)
```

```
Cards standard   : bg-white + border #E2E8F0 + shadow-sm + rounded-[--border-radius-lg]
Cards flush      : utiliser la classe .cards-flush (voir globals.css)
Padding interne  : 28px — uniforme
Structure        : flex flex-col h-full — obligatoire pour hauteur uniforme
Icône container  : width/height 44px + bg-orange-50 + text-[--color-orange-500] + rounded-[--border-radius-md]
CTA interne      : mt-auto — ancré en bas
Hover            : translateY(-2px) + border-[--border-strong] — PAS de scale agressif
Transition       : duration-200 ease-out
⛔ Pas de box-shadow glow orange sur les cards
```

**Pattern card standard (ServiceCard) :**
```tsx
<motion.div
  className="flex flex-col h-full bg-white border border-[--border-default]
             rounded-[--border-radius-lg]"
  style={{ padding: '28px', boxShadow: 'var(--shadow-sm)' }}
  whileHover={{ y: -2, borderColor: 'var(--color-orange-500)' }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  {/* Icône — bleu par défaut, orange au hover de la card */}
  <div className="flex items-center justify-center rounded-[--border-radius-md]
                  bg-[--color-blue-50] text-[--color-blue-800]
                  group-hover:bg-orange-50 group-hover:text-[--color-orange-500]
                  transition-colors duration-200"
       style={{ width: '44px', height: '44px', marginBottom: '16px' }}>
    {icon}
  </div>
  {/* Titre */}
  <h3 className="text-h3 font-body font-medium text-[--text-primary]"
      style={{ marginBottom: '10px' }}>
    {title}
  </h3>
  {/* Description */}
  <p className="font-body font-light text-[--text-secondary] leading-[1.7] flex-grow"
     style={{ fontSize: '14px' }}>
    {description}
  </p>
  {/* CTA — bleu par défaut, orange au hover */}
  <a href={href}
     className="inline-flex items-center font-body font-medium
                text-[--color-blue-800] hover:text-[--color-orange-500]
                transition-colors duration-200"
     style={{ marginTop: '16px', gap: '6px', fontSize: '13px' }}>
    En savoir plus <ArrowRight style={{ width: '14px', height: '14px' }} />
  </a>
</motion.div>
```

**Pattern cards flush (quand ≤ 4 cartes en grille statique) :**
```tsx
<div className="cards-flush grid-cols-2 lg:grid-cols-4">
  {items.map(item => (
    <div key={item.id}>
      <div className="flex items-center justify-center rounded-[--border-radius-md] bg-orange-50
                      text-[--color-orange-500]"
           style={{ width: '44px', height: '44px', marginBottom: '16px' }}>
        {item.icon}
      </div>
      <h3 className="text-h3 font-body font-medium text-[--text-primary]"
          style={{ marginBottom: '10px' }}>
        {item.title}
      </h3>
      <p className="font-body font-light text-[--text-secondary]"
         style={{ fontSize: '14px', lineHeight: '1.7' }}>
        {item.description}
      </p>
    </div>
  ))}
</div>
```

### Règle slider — OBLIGATOIRE si > 4 cartes

```typescript
// ✅ Utiliser embla-carousel-react (déjà installé) dès que n > 4 cartes dans une section
// ❌ Jamais afficher > 4 cartes en grille statique sans slider

import useEmblaCarousel from 'embla-carousel-react'

const [emblaRef, emblaApi] = useEmblaCarousel({
  loop:           false,
  align:          'start',
  containScroll:  false,  // peek effect : carte suivante visible à ~30%
})

// Navigation obligatoire :
// - Boutons ← → (height/width 36px, border 1px --border-default, rounded-[--border-radius-md])
// - Compteur texte « 02 / 06 » en text-[--text-tertiary] font-body text-[13px]
// - Dots optionnels si n ≤ 8
// ❌ Pas d'autoplay (sauf TestimonialsCarousel qui reste manuel)

// Largeur carte slider standard :
// Desktop : 300px · Tablet : 260px · Mobile : 80vw (effet peek natif)

// Exemple header de section avec slider :
<div className="flex items-end justify-between" style={{ marginBottom: '40px' }}>
  <div>
    <p className="text-eyebrow font-body uppercase text-[--color-orange-500]"
       style={{ marginBottom: '8px' }}>Eyebrow</p>
    <h2 className="text-h2 font-heading text-[--text-primary]">Titre section</h2>
  </div>
  <div className="flex items-center" style={{ gap: '8px' }}>
    <span className="font-body text-[--text-tertiary]" style={{ fontSize: '13px' }}>
      {current + 1} / {total}
    </span>
    <button onClick={scrollPrev} className="flex items-center justify-center
      border border-[--border-default] rounded-[--border-radius-md]
      text-[--text-secondary] hover:border-[--border-strong]
      hover:text-[--text-primary] transition-all duration-150"
      style={{ width: '36px', height: '36px' }}>
      <ChevronLeft style={{ width: '16px', height: '16px' }} />
    </button>
    <button onClick={scrollNext} className="flex items-center justify-center
      border border-[--border-default] rounded-[--border-radius-md]
      text-[--text-secondary] hover:border-[--border-strong]
      hover:text-[--text-primary] transition-all duration-150"
      style={{ width: '36px', height: '36px' }}>
      <ChevronRight style={{ width: '16px', height: '16px' }} />
    </button>
  </div>
</div>

// Sections concernées (> 4 items → slider obligatoire) :
// - Témoignages (n > 4)
// - Technologies (logos, toujours > 4)
// - Services sur mobile (10 items)
// - Cas clients si > 4
// - Toute section avec items dynamiques depuis Sanity
```

### Animations

```typescript
// Entrée standard sections
fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
// Stagger enfants : 0.1s entre chaque (réduit de 0.15s pour plus de fluidité)
// Counter stats : 0 → valeur finale, 1.5s ease-out, au scroll
// Hover cards : translateY(-2px) + border plus visible — PAS de scale agressif
// Hover CTA primary : opacity 0.85
// Mega menu : fade + slide-down (Framer Motion)
// Filtre services : AnimatePresence (fade + scale)
// FAQ accordion : fade-in + expand (AnimatePresence)
// Logo scroll : CSS keyframes infini (pas Framer, pour les perfs)
// Timeline process : stagger 0.1s par étape au scroll
// ⛔ Pas de shadow-glow orange sur les éléments — supprimé (trop agressif visuellement)
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
| `/solutions/[slug]` | SSG | statique |
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
- `/solutions/*` → `Service` + `FAQPage` + `Product`
- `/portfolio/*` → `CreativeWork`
- `/blog/*` → `Article` + `BreadcrumbList`
- `/contact` → `ContactPage`

---

### Specs Header.tsx — règles définitives

```tsx
// ─── HAUTEUR & ESPACEMENT ───────────────────────────────────────────
// Hauteur header     : 72px (augmentée de 56px → 72px)
// Logo height        : 40px (auto width)
// Nav item padding   : 0 16px, height 72px (centré verticalement)
// Gap entre items    : 8px
// CTA height         : 44px, padding 0 24px (plus généreux)

// ─── COULEURS ───────────────────────────────────────────────────────
// Fond               : bg-white
// Border bottom      : 1px solid #DDE3EE
// Sticky shadow      : box-shadow 0 2px 20px rgba(27,42,74,0.10)

// Liens nav          : text-[#4A5568] font-medium text-[15px]
//                      hover → text-[#1B2A4A] transition-colors 200ms
// Lien actif         : text-[#1B2A4A] + border-b-2 border-[#E8611A]
//                      border positionné en bas du header (pas du texte)

// ─── BOUTON CTA ─────────────────────────────────────────────────────
// État normal  : bg-[#1B2A4A] text-white font-semibold
//               height 44px, padding 0 24px, rounded-lg
//               border border-[#1B2A4A]
// Hover        : bg-white text-[#1B2A4A] border border-[#1B2A4A]
//               + légère ombre : box-shadow 0 0 0 3px rgba(27,42,74,0.10)
// ⛔ PAS de bg-[#E8611A] sur le bouton CTA
// L'orange apparaît UNIQUEMENT sur le underline actif et les eyebrows

// ─── ANIMATIONS ─────────────────────────────────────────────────────
// Liens nav hover    : color transition 150ms ease
// Underline actif    : scaleX de 0→1 au montage (Framer Motion)
//                      origin-left, duration 0.3s
// CTA hover          : bg/border transition 200ms ease
//                      subtle lift : translateY(-1px) duration 150ms
// Mega menu open     : opacity 0→1 + translateY(-8px→0)
//                      Framer Motion, duration 0.2s ease-out
// Mega menu close    : opacity 1→0 + translateY(0→-4px)
//                      duration 0.15s ease-in
// Sticky transition  : box-shadow apparaît en 200ms au scroll

// ─── SWITCHER LANGUE ────────────────────────────────────────────────
// Conteneur : bg-[#F4F6FA] border border-[#DDE3EE] rounded-md
//             height 40px, padding 0 12px, gap 8px
// FR actif  : 🇫🇷 FR — text-[#1B2A4A] font-semibold
// EN inactif: 🇬🇧 EN — text-[#94A3B8]
// Séparateur: border-r border-[#DDE3EE] height 16px
// Hover EN  : text-[#1B2A4A] transition-colors 150ms

// ─── MOBILE ─────────────────────────────────────────────────────────
// Breakpoint hamburger : < lg (1024px)
// Hamburger icon      : 24px, text-[#1B2A4A]
// Drawer              : bg-white, full width, slide-in depuis la droite
//                       Framer Motion x: 100%→0, duration 0.25s
// Items mobile        : height 52px, border-b border-[#F4F6FA]
// Services/Solutions  : accordion Radix, icône ChevronDown rotate 180°
```

```
Navigation principale :
Logo | Accueil | Services ▾ | Solutions ▾ [Beta] | Portfolio | Nos offres | Ressources ▾ | Contact | 🇫🇷 FR / 🇬🇧 EN | CTA

─────────────────────────────────────────────────────────────────────────
MEGA MENU — SERVICES (4 colonnes)
┌─────────────────┬──────────────┬─────────────────┬──────────────┐
│ Développement   │ Intégration  │ Web             │ Produit      │
├─────────────────┼──────────────┼─────────────────┼──────────────┤
│ Dev Web         │ ERP          │ Sites E-commerce│ Carte NFC    │
│ Dev Mobile      │ CRM          │ Sites Vitrine   │              │
│ Apps Web        │              │                 │              │
│ Apps Mobile     │              │                 │              │
│ Logiciels SaaS  │              │                 │              │
└─────────────────┴──────────────┴─────────────────┴──────────────┘

─────────────────────────────────────────────────────────────────────────
MEGA MENU — SOLUTIONS (3 colonnes)
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ 🍽️ Restaurant        │ 🏨 Hôtel              │ 🏠 Immobilier        │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Solution Resto       │ Solution Hôtel       │ Solution Immo        │
│ Connect              │ Connect              │ Connect              │
│ NFC · PWA · Odoo POS │ NFC · PWA · Odoo PMS │ NFC · PWA · Odoo CRM │
│ → /solutions/resto   │ → /solutions/hotel   │ → /solutions/immo    │
└──────────────────────┴──────────────────────┴──────────────────────┘
Badge : "En cours de développement — Rejoignez la beta"

─────────────────────────────────────────────────────────────────────────
MEGA MENU — RESSOURCES (3 colonnes)
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ 📝 Blog & Articles   │ 📄 Guides PDF        │ ❓ FAQ               │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Derniers articles    │ Guide Dev Web        │ Questions fréquentes │
│ sur le digital,      │ Guide Mobile         │ sur nos services,    │
│ la tech et           │ Guide ERP/CRM        │ délais et tarifs     │
│ l'Afrique de l'Ouest │ Guide SaaS           │                      │
│ → /blog              │ → /ressources/guides │ → /faq               │
└──────────────────────┴──────────────────────┴──────────────────────┘
─────────────────────────────────────────────────────────────────────────
```

### Règles Header.tsx
```tsx
const navItems = [
  { label: 'Accueil',    href: '/',            hasMegaMenu: false },
  { label: 'Services',   href: '/services',    hasMegaMenu: true,  type: 'services' },
  { label: 'Solutions',  href: '/solutions',   hasMegaMenu: true,  type: 'solutions', badge: 'Beta' },
  { label: 'Portfolio',  href: '/portfolio',   hasMegaMenu: false },
  { label: 'Nos offres', href: '/nos-offres',  hasMegaMenu: false },
  { label: 'Ressources', href: '/ressources',  hasMegaMenu: true,  type: 'ressources' },
  { label: 'Contact',    href: '/contact',     hasMegaMenu: false },
]
// ⛔ "Tarifs" → renommé "Nos offres" partout dans le code et les URLs
// ⛔ "Blog" retiré de la nav principale → accessible via Ressources ▾
// ⛔ Redirection 301 : /tarifs → /nos-offres à ajouter dans next.config.ts
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

Plan recommandé : border 2px solid #111111 + badge "Populaire" bg-[#111111] text-white
⛔ PAS de border orange ou de fond coloré sur le plan recommandé

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
/tarifs                → /nos-offres                         301
/nos-tarifs            → /nos-offres                         301
/blog                  → /ressources/blog                    301
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

---

## 🚫 INTERDICTIONS

- ❌ Ne jamais inventer du contenu — tout vient de `CONTENT.md`
- ❌ Ne jamais hardcoder couleurs/typos/espacements — utiliser les tokens CSS
- ❌ Ne jamais utiliser `localStorage` / `sessionStorage`
- ❌ Ne jamais utiliser `<form>` HTML — utiliser `react-hook-form` + Server Actions
- ❌ Ne pas écrire les textes des pages directement dans les composants
- ❌ Ne pas installer de librairies non listées sans justification
- ❌ `[PLACEHOLDER]` et `[X]` dans `CONTENT.md` restent tels quels
- ❌ Ne jamais utiliser `bg-gray-900`, `bg-gray-950`, `bg-slate-900`, `bg-zinc-900` sur les sections de contenu — seuls `section-brand` (#111111) et Footer (#0A0B0E) sont autorisés en dark
- ❌ Ne jamais hardcoder `py-16`, `py-20`, `py-24`, `px-4`, `px-6` sur les `<section>` — utiliser `.section-base` / `.section-alt` / `.section-brand`
- ❌ Ne jamais utiliser `text-3xl`, `text-4xl`, `text-5xl` pour les titres — utiliser `text-display`, `text-h1`, `text-h2`, `text-h3` définis avec clamp() dans `tailwind.config.ts`
- ❌ Ne jamais dupliquer les stats (une seule occurrence via `<StatsRow>` en section dédiée)
- ❌ Ne jamais utiliser `bg-[#E8611A]`, `bg-orange-500` ou toute variante orange en fond de section — l'orange est réservé aux textes eyebrow, icônes, liens internes et underline nav actif UNIQUEMENT
- ❌ Ne jamais dépasser 42px (2.625rem) pour `text-display` — le clamp est plafonné, ne pas l'augmenter
- ❌ Ne jamais afficher plus de 4 cartes en grille statique sans activer `embla-carousel-react`
- ❌ Ne jamais utiliser `Plus Jakarta Sans` ou `Inter` — les fonts du projet sont `Syne` (titres) et `DM Sans` (corps)
- ❌ Ne jamais appliquer `shadow-glow` orange sur les cartes ou boutons — supprimé du design system
- ❌ Ne jamais recréer la route `/api/contact` — utiliser l'existante pour le formulaire CTA des pages services
- ❌ Ne jamais mettre bg-[--color-orange-500] ou bg-orange-* sur un bouton CTA — les boutons sont BLEUS (#1B2A4A), l'orange est réservé au hover uniquement
- ❌ Ne jamais utiliser text-[--color-orange-500] comme couleur par défaut d'un lien de navigation ou d'un CTA — uniquement en hover
- ✅ Boutons submit : bg-[#1B2A4A] par défaut, hover bg-[#E8611A] text-white
- ❌ Ne jamais utiliser bg-[#111111] ou bg-[#0A0B0E] (noir) — remplacer par bg-[#1B2A4A] (bleu logo) ou bg-[#2D3E5F] (bleu medium)
- ❌ Ne jamais mettre bg-orange-* ou bg-[#E8611A] en fond de section ou état par défaut d'un bouton

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
// 6. Animations Framer Motion (fade-in + slide-up, stagger 0.1s)
// 7. Accessibilité WCAG AA (contrastes, focus ring, aria labels)

// 8. Background obligatoire — utiliser les classes utilitaires :
//    Alterner section-base / section-alt selon la position
//    Le nombre et l'ordre des sections est défini dans CONTENT.md
//    CTA final          → className="section-brand"  (bg-#111111)
//    Hero               → className="hero-bg"        (bg-#fafafa + radial)
//    ⛔ JAMAIS bg-orange / bg-[#E8611A] en fond de section

// 9. Wrapping interne obligatoire :
//    <section className="section-base | section-alt | section-brand | hero-bg">
//      <div className="container">   {/* max-width 1200px centré */}
//        {/* contenu */}
//      </div>
//    </section>

// 10. Slider obligatoire si items.length > 4 :
//     import useEmblaCarousel from 'embla-carousel-react'
//     Voir pattern complet dans "Règle slider" ci-dessus
```

---

*CLAUDE.md v4.0 — Connect Web — Dakar, Sénégal*
*Sources : CONTENT.md v1.0 + architecture-connect-web.md v1.0 + ConnectWeb_Prompt_Templates_FULL*
*Dernière mise à jour : Mars 2026 — Refonte design system : Syne/DM Sans, section-brand #111111, slider rule, cards flush, orange accent-only*