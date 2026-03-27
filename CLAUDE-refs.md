# CLAUDE-refs.md — Références détaillées Connect Web
Lire ce fichier uniquement si demandé explicitement.

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

## 🧭 NAVIGATION — navItems & Mega-menus

### Règles Header.tsx — navItems
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

### Mega-menus ASCII

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

### Specs Header.tsx — règles définitives
```tsx
// ─── HAUTEUR & ESPACEMENT ───────────────────────────────────────────
// Hauteur header     : 72px
// Logo height        : 40px (auto width)
// Nav item padding   : 0 16px, height 72px (centré verticalement)
// Gap entre items    : 8px
// CTA height         : 44px, padding 0 24px

// ─── COULEURS ───────────────────────────────────────────────────────
// Fond               : bg-white
// Border bottom      : 1px solid #DDE3EE
// Sticky shadow      : box-shadow 0 2px 20px rgba(27,42,74,0.10)
// Liens nav          : text-[#4A5568] font-medium text-[15px]
//                      hover → text-[#1B2A4A] transition-colors 200ms
// Lien actif         : text-[#1B2A4A] + border-b-2 border-[#E8611A]

// ─── BOUTON CTA ─────────────────────────────────────────────────────
// État normal  : bg-[#1B2A4A] text-white font-semibold
//               height 44px, padding 0 24px, rounded-lg
// Hover        : bg-white text-[#1B2A4A] border border-[#1B2A4A]
//               + box-shadow 0 0 0 3px rgba(27,42,74,0.10)
// ⛔ PAS de bg-[#E8611A] sur le bouton CTA nav

// ─── ANIMATIONS ─────────────────────────────────────────────────────
// Underline actif    : scaleX de 0→1, origin-left, duration 0.3s (Framer)
// Mega menu open     : opacity 0→1 + translateY(-8px→0), 0.2s ease-out
// Mega menu close    : opacity 1→0 + translateY(0→-4px), 0.15s ease-in
// Sticky transition  : box-shadow apparaît en 200ms au scroll

// ─── SWITCHER LANGUE ────────────────────────────────────────────────
// Conteneur : bg-[#F4F6FA] border border-[#DDE3EE] rounded-md
//             height 40px, padding 0 12px, gap 8px
// FR actif  : 🇫🇷 FR — text-[#1B2A4A] font-semibold
// EN inactif: 🇬🇧 EN — text-[#94A3B8]

// ─── MOBILE ─────────────────────────────────────────────────────────
// Breakpoint hamburger : < lg (1024px)
// Drawer              : bg-white, full width, slide-in depuis la droite
//                       Framer Motion x: 100%→0, duration 0.25s
// Items mobile        : height 52px, border-b border-[#F4F6FA]
// Services/Solutions  : accordion Radix, icône ChevronDown rotate 180°
```

---

## 📁 STRUCTURE DU PROJET

```
connect-web/
├── CLAUDE.md / CLAUDE-refs.md
├── CONTENT.md                              ← source de vérité contenu
├── architecture-connect-web.md
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                        ← /
│   │   ├── a-propos/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── portfolio/[slug]/page.tsx
│   │   ├── tarifs/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── services/                       ← 10 sous-pages
│   │   ├── solutions/                      ← 3 sous-pages
│   │   ├── mentions-legales/page.tsx
│   │   └── confidentialite/page.tsx
│   ├── not-found.tsx
│   ├── api/contact/route.ts
│   ├── api/revalidate/route.ts
│   ├── sitemap.ts / robots.ts
│   └── layout.tsx
├── components/
│   ├── ui/          ← atomiques
│   ├── sections/    ← réutilisables
│   ├── layout/Header.tsx + Footer.tsx
│   └── seo/
├── lib/sanity/ + lib/actions/ + lib/utils/
├── styles/globals.css
├── sanity/schemas/
├── next.config.ts / tailwind.config.ts / tsconfig.json
```

### Sitemap — pages services (10)
```
/services/developpement-web
/services/developpement-mobile
/services/applications-web
/services/applications-mobile
/services/logiciels-saas
/services/integration-erp
/services/integration-crm
/services/sites-ecommerce
/services/sites-vitrine
/services/carte-visite-nfc
```

### Sections par page
```
HOME / — 13 sections :
01 Header · 02 Hero · 03 Barre Clients · 04 Services (filtres tabs)
05 Pourquoi Nous · 06 Notre Méthode · 07 Portfolio · 08 Chiffres Clés
09 Témoignages · 10 Pricing · 11 FAQ · 12 CTA Final · 13 Footer

CONTACT /contact — 3 sections : Hero · Formulaire · Infos
PORTFOLIO /portfolio — 3 sections : Hero · Grille masonry · CTA
TARIFS /tarifs — 5 sections : Hero · Grille · Tableau · FAQ · CTA
À PROPOS /a-propos — 6 sections : Hero · Histoire · Valeurs · Équipe · Chiffres · CTA
BLOG /blog — 2 sections · /blog/[slug] — layout article complet
/404 · /mentions-legales · /confidentialite — pages utilitaires
```

---

## 🧩 COMPOSANTS

### Atomiques — `components/ui/`
```typescript
<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" />
// primary  → bg-[#1B2A4A] text-white + hover: bg-[#E8611A] text-white
// secondary→ bg-[--bg-elevated] + hover bg-[--bg-overlay]
// outline  → border-[--border-default] + hover border-[--border-strong]
// ✅ hover primary = bg-[#E8611A] — UNIQUEMENT au hover, jamais par défaut

<Badge variant="default|success|warning|error|info|popular" />
<Card variant="default|elevated|bordered" padding="sm|md|lg" />
<Heading level={1|2|3|4} eyebrow="texte optionnel" />
<Input type label error hint />
<Textarea label error />
<Select label options />
<Alert variant="success|error|warning|info" />
<Skeleton />
<Container maxWidth="default|wide|narrow" />
<Grid cols={1|2|3|4} gap="sm|md|lg" />
<OptimizedImage />   // wrapper next/image avec lqip blur
```

### Sections réutilisables — `components/sections/`
```typescript
<SectionHeader eyebrow title description align="left|center" />
<FeatureGrid items cols={2|3|4} />
<TestimonialsCarousel testimonials />  // Embla, sans autoplay, pause hover
<StatsRow stats />                     // counter animé Intersection Observer
<CTABanner primaryCta secondaryCta />
<FAQAccordion items />                 // Radix, un seul ouvert, icône +/× animée
<PricingCard plan featured />          // toggle FCFA/EUR
<ProcessStep step title description />
<ComparisonTable />
<TechStack technologies />
<CaseStudyCard project />
<PainPoints items />
<BeforeAfter leftItems rightItems />
```

### Sections Home spécifiques
```typescript
<HeroSection />         // bg-white + radial orange 7% opacity
<LogoScrollBanner />    // CSS keyframes infini, pause hover, masques dégradé
<ServicesGrid />        // filtres tabs AnimatePresence
<PortfolioPreview />    // 4 projets, overlay hover, grille masonry
<PricingSection />      // 3 plans, central border-[#111111] 2px
<CTAFinalSection />     // bg-[#1B2A4A] + formulaire inline + WhatsApp/email
```

---

## 🎨 DESIGN SYSTEM — TOKENS DÉTAILLÉS

### Charte couleurs (globals.css)
```css
:root {
  --color-blue-900:  #1B2A4A;   /* Logo CONNECT — boutons, hero */
  --color-blue-800:  #2D3E5F;   /* Logo WEB */
  --color-blue-700:  #3D5278;
  --color-blue-600:  #4D6490;
  --color-blue-100:  #E2EAF4;
  --color-blue-50:   #EEF3FA;

  --color-orange-500: #E8611A;  /* Icône power — eyebrow, hover, accents */
  --color-orange-400: #FF7A20;
  --color-orange-600: #C44D0E;
  --color-orange-50:  #FEF3EC;

  --bg-base:          #FAFAFA;
  --bg-elevated:      #F4F6FA;
  --bg-blue-dark:     #1B2A4A;
  --bg-blue-medium:   #2D3E5F;
  --bg-blue-light:    #EEF3FA;

  --text-primary:     #1B2A4A;
  --text-secondary:   #4A5568;
  --text-tertiary:    #718096;
  --text-on-dark:     #FFFFFF;
  --text-on-dark-muted: rgba(255,255,255,0.65);

  --border-subtle:    #EEF1F7;
  --border-default:   #DDE3EE;
  --border-strong:    #C5CFDF;

  --shadow-sm: 0 1px 3px rgba(27,42,74,0.08), 0 1px 2px rgba(27,42,74,0.05);
  --shadow-md: 0 4px 16px rgba(27,42,74,0.10), 0 2px 4px rgba(27,42,74,0.06);
  --shadow-lg: 0 8px 32px rgba(27,42,74,0.12), 0 4px 8px rgba(27,42,74,0.07);

  --section-padding-y:   clamp(4rem, 8vw, 7rem);
  --section-padding-x:   clamp(1rem, 5vw, 2rem);
  --container-max-width: 1200px;
  --nav-height:          56px;
  --border-radius-md:    0.5rem;
  --border-radius-lg:    0.75rem;
  --border-radius-xl:    1rem;
}
```

### Alternance des fonds — HOME (ordre obligatoire)
```
01. Hero               → bg-[#0A0B0E] text-white   ← Sombre
02. Stats              → bg-[#F4F6FA]
03. Services           → bg-white
04. Pourquoi Nous      → bg-[#F4F6FA]
05. Notre Méthode      → bg-white
06. Portfolio          → bg-[#F4F6FA]
07. Témoignages        → bg-white
08. FAQ                → bg-[#F4F6FA]
09. CTA Final          → bg-[#1B2A4A] text-white    ← Seule section dark de contenu
10. Footer             → bg-[#0A0B0E] text-white

RÈGLE ABSOLUE :
- Hero    → bg-[#0A0B0E] UNIQUEMENT
- Contenu → alternance bg-white / bg-[#F4F6FA] UNIQUEMENT
- CTA     → bg-[#1B2A4A] — seule section de contenu dark autorisée
- Footer  → bg-[#0A0B0E]
- ⛔ PAS de bg-[#1B2A4A] ou bg-[#2D3E5F] sur les sections de contenu
```

### Classes utilitaires (globals.css)
```css
.section-base        { background-color: #FFFFFF;  padding-block: var(--section-padding-y); padding-inline: var(--section-padding-x); }
.section-alt         { background-color: #F4F6FA;  padding-block: var(--section-padding-y); padding-inline: var(--section-padding-x); }
.section-blue-soft   { background-color: #EEF3FA;  padding-block: var(--section-padding-y); padding-inline: var(--section-padding-x); }
.section-brand       { background-color: #1B2A4A;  color: #FFFFFF; padding-block: var(--section-padding-y); padding-inline: var(--section-padding-x); }
.section-brand-medium{ background-color: #2D3E5F;  color: #FFFFFF; padding-block: var(--section-padding-y); padding-inline: var(--section-padding-x); }
.container           { max-width: var(--container-max-width); margin-inline: auto; padding-inline: var(--section-padding-x); }
.hero-bg             { background-color: #0A0B0E; color: #FFFFFF;
                       background-image: radial-gradient(ellipse 60% 50% at 65% 50%, rgba(232,97,26,0.08) 0%, transparent 70%); }
.cards-flush         { display: grid; border: 1px solid #DDE3EE; border-radius: var(--border-radius-lg);
                       overflow: hidden; gap: 1px; background-color: #DDE3EE; }
.cards-flush > *     { background-color: #FFFFFF; padding: 28px; transition: background-color 0.15s ease; }
.cards-flush > *:hover { background-color: #F4F6FA; }
```

### Typographie (tailwind.config.ts)
```javascript
fontSize: {
  'display': ['clamp(1.75rem,4vw,2.625rem)',  { lineHeight:'1.1',  fontWeight:'600', letterSpacing:'-0.03em' }],  // MAX 42px
  'h1':      ['clamp(1.5rem,3vw,2.25rem)',    { lineHeight:'1.15', fontWeight:'600', letterSpacing:'-0.025em' }],
  'h2':      ['clamp(1.25rem,2.5vw,2rem)',    { lineHeight:'1.25', fontWeight:'600', letterSpacing:'-0.02em' }],
  'h3':      ['14px',                          { lineHeight:'1.35', fontWeight:'500' }],
  'eyebrow': ['11px',                          { lineHeight:'1.4',  fontWeight:'500', letterSpacing:'0.08em' }],
},
fontFamily: {
  heading: ['Syne', 'system-ui', 'sans-serif'],
  body:    ['DM Sans', 'system-ui', 'sans-serif'],
}
```

### Chargement fonts (app/layout.tsx)
```tsx
import { Syne, DM_Sans } from 'next/font/google'
const syne   = Syne({ subsets:['latin'], weight:['400','500','600'], variable:'--font-heading', display:'swap' })
const dmSans = DM_Sans({ subsets:['latin'], weight:['300','400','500'], variable:'--font-body', display:'swap' })
```

### Règles de style — boutons & charte
```
CTA primaire   : bg-[#1B2A4A] text-white | hover: bg-[#2D3E5F] + border-[#E8611A]
CTA secondaire : bg-transparent border border-[#DDE3EE] text-[#1B2A4A] | hover: border-[#E8611A] text-[#E8611A]
Liens nav      : text-white/80 (sur header bleu) | hover: text-[#E8611A]
Liens cards    : text-[#1B2A4A] | hover: text-[#E8611A]
Eyebrow        : text-[#E8611A] (orange — toujours)
Icônes wrapper : bg-[#EEF3FA] text-[#1B2A4A] | hover card: bg-[#FEF3EC] text-[#E8611A]

⛔ JAMAIS bg-[#E8611A] ou bg-orange-* en état par défaut — uniquement au :hover
⛔ JAMAIS bg-[#111111] ou bg-[#0A0B0E] — remplacer par #1B2A4A ou #2D3E5F
✅ L'orange = hover boutons + eyebrow + icônes + borders accent
```

---

## 🔴 RÈGLE HERO — STRUCTURE COMPLÈTE (v4.2 — Mars 2026)

> **Référence absolue : `developpement-mobile-hero.tsx`** — Toute page service DOIT reproduire ce pattern.

```tsx
<section className="hero-bg" aria-label="Service · [Nom]"
  style={{ position:'relative', overflow:'hidden',
           paddingTop:'clamp(5rem,10vw,8rem)', paddingBottom:'clamp(4rem,8vw,7rem)' }}>

  {/* Lueur bleue bas-droite */}
  <div aria-hidden="true" style={{ position:'absolute', bottom:'-15%', right:'-5%',
    width:'45vw', height:'45vw', maxWidth:'600px', maxHeight:'600px',
    background:'radial-gradient(circle, rgba(26,42,74,0.35) 0%, transparent 65%)',
    pointerEvents:'none' }} />

  {/* Grille de points décorative */}
  <div aria-hidden="true" style={{ position:'absolute', inset:0,
    backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
    backgroundSize:'32px 32px', pointerEvents:'none' }} />

  <div className="container" style={{ position:'relative', zIndex:1 }}>
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
         style={{ gap:'clamp(3rem,6vw,5rem)', alignItems:'center' }}>

      {/* ══ COLONNE GAUCHE 60% ══ */}
      <div>
        {/* 1. Badge eyebrow */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, ease:EASE }} style={{ marginBottom:'24px' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'6px',
            background:'rgba(232,97,26,0.10)', border:'1px solid rgba(232,97,26,0.25)',
            borderRadius:'100px', padding:'5px 14px',
            fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
            letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--color-orange-400)' }}>
            <span style={{ width:'5px', height:'5px', borderRadius:'50%',
              background:'var(--color-orange-500)', flexShrink:0 }} />
            Service · [Nom du service]
          </span>
        </motion.div>

        {/* 2. H1 — RÈGLES STRICTES
          ❌ className="text-h1" · fontSize > clamp(2rem,3.75vw,3rem) · texte continu sans spans
          ✅ className="font-heading font-bold" · fontSize: clamp(2rem,3.75vw,3rem) · lineHeight:1.08
             letterSpacing:-0.03em · whiteSpace:pre-wrap · display:block sur chaque <span>
             MAX 3 lignes desktop · ~26 chars par ligne (colonne 60% = ~645px à 1200px) */}
        <motion.h1 className="font-heading font-bold"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, ease:EASE, delay:0.15 }}
          style={{ color:'#F4F7FC', marginBottom:'20px',
            fontSize:'clamp(2rem,3.75vw,3rem)', lineHeight:1.08,
            letterSpacing:'-0.03em', whiteSpace:'pre-wrap' }}>
          <span style={{ display:'block' }}>Ligne 1</span>
          <span style={{ display:'block', color:'var(--color-orange-500)' }}>Ligne 2 accent</span>
        </motion.h1>

        {/* 3. Sous-titre — className="text-hero-subtitle" OBLIGATOIRE (jamais style inline fontSize) */}
        <motion.p className="text-hero-subtitle"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, ease:EASE, delay:0.30 }}
          style={{ maxWidth:'500px', marginBottom:'28px' }}>
          [Description courte — 1–2 lignes, orientée résultat]
        </motion.p>

        {/* 4. Badge différenciateur */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, ease:EASE, delay:0.45 }} style={{ marginBottom:'36px' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'8px',
            background:'#161B27', border:'1px solid #1E2535', borderRadius:'8px',
            padding:'7px 14px', fontFamily:'var(--font-body)', fontSize:'12px',
            fontWeight:500, color:'#6B7FA3', letterSpacing:'0.01em' }}>
            <span style={{ color:'#3B4A6B' }}>◆</span>
            <span>Argument 1</span><span style={{ color:'#2A3347' }}>·</span>
            <span>Argument 2</span><span style={{ color:'#2A3347' }}>·</span>
            <span>Argument 3</span>
          </span>
        </motion.div>

        {/* 5. CTAs */}
        <motion.div className="flex flex-wrap items-center"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, ease:EASE, delay:0.60 }} style={{ gap:'12px' }}>
          {/* CTA primaire — gradient orange */}
          <Link href="/contact?service=[slug]" className="inline-flex items-center font-semibold"
            style={{ gap:'8px', padding:'13px 26px', borderRadius:'10px', fontSize:'14px',
              color:'#FFFFFF', textDecoration:'none',
              background:'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
              boxShadow:'0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,97,26,0.3)',
              transition:'box-shadow 200ms ease, transform 150ms ease' }}>
            [Label CTA] <ArrowRight size={15} />
          </Link>
          {/* CTA secondaire — outline */}
          <Link href="/portfolio" className="inline-flex items-center font-semibold"
            style={{ gap:'8px', padding:'12px 24px', background:'transparent',
              border:'1px solid #2A3347', borderRadius:'10px', fontSize:'14px',
              color:'#B8C8E0', textDecoration:'none',
              transition:'border-color 200ms ease, color 200ms ease' }}>
            Voir nos réalisations
          </Link>
        </motion.div>
      </div>

      {/* ══ COLONNE DROITE 40% — Mockup + 3 pills flottantes ══ */}
      <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.7, ease:EASE, delay:0.2 }} style={{ position:'relative' }}>
        <[ServiceMockup] />
        {/* 3 pills : bg-white, border #E5E7EB, rounded-full */}
        {/* animate y:[0,-8,0] duration:3.5s, delay échelonné 0/1.1/2.2 */}
        {/* positions : top:-18px right:8% | bottom:30% left:-20px | bottom:-18px right:12% */}
        {METRIC_PILLS.map(pill => <FloatingPill key={pill.label} {...pill} />)}
      </motion.div>

    </div>
  </div>
</section>
```

**Interdictions hero récapitulatif :**
```
❌ className="text-h1"                       → font-heading font-bold + style inline
❌ fontSize > clamp(2rem, 3.75vw, 3rem)      → plafonné à cette valeur
❌ style.fontFamily / fontWeight sur H1      → porté par les classes Tailwind
❌ Texte H1 continu sans display:block spans
❌ Sous-titre avec style fontSize            → className="text-hero-subtitle"
❌ Plus de 3 lignes desktop
❌ bg-white ou fond clair sur Hero           → uniquement hero-bg (#0A0B0E)
❌ Fond bleu (#1B2A4A) sur Hero              → uniquement hero-bg (#0A0B0E)
```

---

## 🃏 PATTERNS CARDS

### Pattern card standard (ServiceCard)
```tsx
<motion.div className="flex flex-col h-full bg-white border border-[--border-default] rounded-[--border-radius-lg]"
  style={{ padding:'28px', boxShadow:'var(--shadow-sm)' }}
  whileHover={{ y:-2, borderColor:'var(--color-orange-500)' }}
  transition={{ duration:0.2, ease:'easeOut' }}>
  <div className="flex items-center justify-center rounded-[--border-radius-md] bg-[--color-blue-50] text-[--color-blue-800]"
       style={{ width:'44px', height:'44px', marginBottom:'16px' }}>{icon}</div>
  <h3 className="text-h3 font-body font-medium text-[--text-primary]" style={{ marginBottom:'10px' }}>{title}</h3>
  <p className="font-body font-light text-[--text-secondary] leading-[1.7] flex-grow" style={{ fontSize:'14px' }}>{description}</p>
  <a href={href} className="inline-flex items-center font-body font-medium text-[--color-blue-800] hover:text-[--color-orange-500] transition-colors duration-200"
     style={{ marginTop:'16px', gap:'6px', fontSize:'13px' }}>
    En savoir plus <ArrowRight style={{ width:'14px', height:'14px' }} />
  </a>
</motion.div>
```

### Pattern cards flush (≤ 4 cartes)
```tsx
<div className="cards-flush grid-cols-2 lg:grid-cols-4">
  {items.map(item => (
    <div key={item.id}>
      <div className="flex items-center justify-center rounded-[--border-radius-md] bg-orange-50 text-[--color-orange-500]"
           style={{ width:'44px', height:'44px', marginBottom:'16px' }}>{item.icon}</div>
      <h3 className="text-h3 font-body font-medium text-[--text-primary]" style={{ marginBottom:'10px' }}>{item.title}</h3>
      <p className="font-body font-light text-[--text-secondary]" style={{ fontSize:'14px', lineHeight:'1.7' }}>{item.description}</p>
    </div>
  ))}
</div>
```

---

## 🎠 RÈGLE SLIDER — OBLIGATOIRE si > 4 cartes

```typescript
// ✅ embla-carousel-react dès que n > 4 cartes dans une section
// ❌ Jamais > 4 cartes en grille statique sans slider

import useEmblaCarousel from 'embla-carousel-react'
const [emblaRef, emblaApi] = useEmblaCarousel({ loop:false, align:'start', containScroll:false })

// Navigation : boutons ← → (36px, border 1px --border-default, rounded-[--border-radius-md])
//              Compteur « 02 / 06 » text-[--text-tertiary] font-body text-[13px]
//              Dots optionnels si n ≤ 8
// ❌ Pas d'autoplay (sauf TestimonialsCarousel)
// Largeur carte : 300px desktop · 260px tablet · 80vw mobile (peek natif)

// Sections concernées :
// - Témoignages (n > 4) · Technologies (toujours > 4)
// - Services sur mobile (10 items) · Cas clients si > 4 · Items dynamiques Sanity

// Header section avec contrôles slider :
<div className="flex items-end justify-between" style={{ marginBottom:'40px' }}>
  <div>
    <p className="text-eyebrow font-body uppercase text-[--color-orange-500]" style={{ marginBottom:'8px' }}>Eyebrow</p>
    <h2 className="text-h2 font-heading text-[--text-primary]">Titre section</h2>
  </div>
  <div className="flex items-center" style={{ gap:'8px' }}>
    <span className="font-body text-[--text-tertiary]" style={{ fontSize:'13px' }}>{current+1} / {total}</span>
    <button onClick={scrollPrev} className="flex items-center justify-center border border-[--border-default] rounded-[--border-radius-md] hover:border-[--border-strong] transition-all duration-150"
      style={{ width:'36px', height:'36px' }}><ChevronLeft style={{ width:'16px', height:'16px' }} /></button>
    <button onClick={scrollNext} className="flex items-center justify-center border border-[--border-default] rounded-[--border-radius-md] hover:border-[--border-strong] transition-all duration-150"
      style={{ width:'36px', height:'36px' }}><ChevronRight style={{ width:'16px', height:'16px' }} /></button>
  </div>
</div>
```

---

## 🎬 ANIMATIONS

```typescript
fadeInUp: { initial:{ opacity:0, y:20 }, animate:{ opacity:1, y:0 } }
// Stagger enfants : 0.1s
// Counter stats : 0 → valeur finale, 1.5s ease-out, au scroll (Intersection Observer)
// Hover cards : translateY(-2px) + border plus visible — PAS de scale agressif
// Mega menu : fade + slide-down (Framer Motion)
// Filtres services : AnimatePresence (fade + scale)
// FAQ accordion : fade-in + expand (AnimatePresence)
// Logo scroll : CSS keyframes infini (pas Framer, pour les perfs)
// ⛔ Pas de shadow-glow orange sur les éléments
```

### Breakpoints (tailwind.config.ts)
```javascript
screens: { 'xs':'375px', 'sm':'640px', 'md':'768px', 'lg':'1024px', 'xl':'1280px', '2xl':'1536px' }
```

---

## 📊 STRATÉGIE DE RENDU

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

## 📝 FORMULAIRE CONTACT — SPECS

```typescript
// Champs (react-hook-form + zod)
- Prénom + Nom (2 colonnes)
- Email professionnel
- Téléphone / WhatsApp
- Service (select : 10 services)
- Budget : < 500 000 FCFA | 500k–2M | 2M–5M | 5M+ | Je ne sais pas
- Délai : ASAP | 1-3 mois | 3-6 mois | Flexible
- Description (textarea, min 100 chars)
- Pièce jointe optionnelle (brief, maquette, PDF)
- Case CGV

// Soumission → /api/contact (EXISTANTE — ne pas recréer)
// → Resend (email) + notification WhatsApp
// → Honeypot anti-spam (pas de reCAPTCHA visible)
// Query param : /contact?service=developpement-web → select pré-rempli
```

---

## 🔑 SEO — MÉTADONNÉES

```typescript
// Root layout
metadataBase: new URL('https://connect-web.tech')
title.template: '%s | Connect-Web Agence'
openGraph: { locale:'fr_FR', siteName:'Connect-Web Agence' }
robots: { index:true, follow:true }

// Schema.org par route :
/ → LocalBusiness + WebSite
/services/* → Service + FAQPage
/solutions/* → Service + FAQPage + Product
/portfolio/* → CreativeWork
/blog/* → Article + BreadcrumbList
/contact → ContactPage
```

---

*CLAUDE-refs.md — Connect Web — Mars 2026*
