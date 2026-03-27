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
style={{ padding: '28px' }}                    // jamais p-7
style={{ marginBottom: '56px' }}               // jamais mb-12 / mb-14
style={{ height: '52px', padding: '0 32px' }} // jamais h-13 px-8
style={{ width: '44px', height: '44px' }}     // jamais w-11 h-11
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
Fonts         : Montserrat (titres) + Jost (corps) — via next/font/google
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
- ❌ Ne jamais utiliser `bg-gray-900`, `bg-gray-950`, `bg-slate-900`, `bg-zinc-900` sur les sections de contenu — seuls `section-brand` (#111111) et Footer (#0A0B0E) sont autorisés en dark
- ❌ Ne jamais hardcoder `py-16`, `py-20`, `py-24`, `px-4`, `px-6` sur les `<section>` — utiliser `.section-base` / `.section-alt` / `.section-brand`
- ❌ Ne jamais utiliser `text-3xl`, `text-4xl`, `text-5xl` pour les titres — utiliser `text-display`, `text-h1`, `text-h2`, `text-h3` définis avec clamp() dans `tailwind.config.ts`
- ❌ Ne jamais dupliquer les stats (une seule occurrence via `<StatsRow>` en section dédiée)
- ❌ Ne jamais utiliser `bg-[#E8611A]`, `bg-orange-500` ou toute variante orange en fond de section — l'orange est réservé aux textes eyebrow, icônes, liens internes et underline nav actif UNIQUEMENT
- ❌ Ne jamais dépasser 42px (2.625rem) pour `text-display` — le clamp est plafonné, ne pas l'augmenter
- ❌ Ne jamais afficher plus de 4 cartes en grille statique sans activer `embla-carousel-react`
- ❌ Ne jamais utiliser `Plus Jakarta Sans` ou `Inter` — les fonts du projet sont `Montserrat` (titres) et `Jost` (corps)
- ❌ Ne jamais appliquer `shadow-glow` orange sur les cartes ou boutons — supprimé du design system
- ❌ Ne jamais recréer la route `/api/contact` — utiliser l'existante pour le formulaire CTA des pages services
- ❌ Ne jamais utiliser bg-[#111111] ou bg-[#0A0B0E] (noir) — remplacer par bg-[#1B2B4B] (bleu logo) ou bg-[#243659] (bleu medium)

## 🔘 SYSTÈME DE BOUTONS — v4.1

Tous les styles de boutons OBLIGATOIREMENT en inline styles. `transition: 'all 0.2s ease'` sur tous.

```
Primaire (CTA action)
  défaut  : background #E8622A · color #FFFFFF
  hover   : background #C9501E · transform translateY(-1px) · box-shadow 0 4px 12px rgba(232,98,42,0.30)
  token   : var(--btn-primary-bg) / var(--btn-primary-hover)
  usage   : Démarrer mon projet · Envoyer · Obtenir une estimation

Secondaire (CTA navigation)
  défaut  : background #1B2B4B · color #FFFFFF
  hover   : background #243659 · transform translateY(-1px)
  token   : var(--btn-secondary-bg) / var(--btn-secondary-hover)
  usage   : Navbar CTA · Lancer mon projet · Boutons de section moins prioritaires

Ghost (CTA discret)
  défaut  : background transparent · border 1.5px solid #1B2B4B · color #1B2B4B
  hover   : background #1B2B4B · color #FFFFFF
  token   : var(--btn-ghost-border) / var(--btn-ghost-hover-bg)
  usage   : Boutons sur fond clair, options secondaires
```

- ❌ Ne jamais mettre bg-orange-* ou bg-[#E8611A] en fond de bouton — l'orange bouton est `#E8622A` uniquement
- ❌ Ne jamais utiliser text-[--color-orange-500] comme couleur par défaut d'un lien de navigation
- ✅ Bouton submit formulaire : `#E8622A` défaut · `#C9501E` hover
- ✅ Sur fond sombre (hero) : ghost blanc `rgba(255,255,255,0.10)` border `rgba(255,255,255,0.25)` autorisé

---

## ✅ WORKFLOW PAR SECTION (pattern obligatoire)

```
1. Lire CONTENT.md > [PAGE] > Section [NOM] — jamais hardcoder le texte
2. Importer le contenu depuis @/content — utiliser les tokens CSS, jamais de valeurs en dur
3. TypeScript strict (interface Props explicite) + responsive mobile-first (xs → 2xl)
4. Structure : <section className="section-base|section-alt|section-brand|hero-bg">
                 <div className="container"> ... </div>
               </section>
5. > 4 items dans la section → slider embla-carousel-react obligatoire (❌ grille statique)
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

## 📚 RÉFÉRENCES — CLAUDE-refs.md

> Lire `CLAUDE-refs.md` uniquement si demandé explicitement ou si la tâche en cours concerne :

| Sujet | Contenu dans CLAUDE-refs.md |
|-------|-----------------------------|
| Header.tsx / navItems | Structure navItems complète, specs détaillées |
| Mega-menus | ASCII art complet Services / Solutions / Ressources |
| Design system détaillé | Tokens CSS couleurs, typographie, espacement, classes utilitaires |
| Template Hero | Code TSX complet Hero service (RÈGLE v4.2) |
| Patterns cards | ServiceCard, cards-flush, slider Embla complet |
| Structure projet | Arborescence fichiers, sitemap, sections par page |
| Composants | Inventaire Header, Footer, atomiques, sections réutilisables |
| Rendu & SEO | Stratégie SSG/ISR, generateMetadata, Schema.org |
| Formulaire contact | Specs champs, validation zod, API route |
| Variables d'env | NEXT_PUBLIC_*, SANITY_*, RESEND_*, GA_* |
| Redirections 301 | Liste complète next.config.ts |
| Plan de sprints | Sprint 0→7, détail par sprint |
| Animations | Patterns Framer Motion, breakpoints, règle hero |

---

*CLAUDE.md v4.0 — Connect Web — Dakar, Sénégal*
*Dernière mise à jour : Mars 2026 — Refonte design system : Montserrat/Jost, section-brand #111111, slider rule, cards flush, orange accent-only*
