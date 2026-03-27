# PROMPT DEV : Implémentation des 7 pages institutionnelles Connect-Web.tech

---

## OBJECTIF

Implémenter les **7 pages institutionnelles** à partir des fichiers `CONTENU-*.md` générés.

**Entrée** : Fichiers CONTENU-*.md (contenu rédigé, SEO, maillage)
**Sortie** : Composants Next.js fonctionnels dans `app/(marketing)/`

---

## RÔLES

Agis simultanément en tant que :

1. **Senior Product Designer** — Expert UX/UI, CRO, design systems, interfaces mobile-first

2. **Senior Full Stack Developer** — Maîtrise Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion

---

## RÈGLE FONDAMENTALE

> **TOUT LE STYLE DOIT PROVENIR DU DESIGN SYSTEM EXISTANT**

Avant de commencer toute implémentation :

1. **Lire CLAUDE.md** — Source de vérité pour les règles de style, composants, couleurs, typographie, spacing
2. **Lire les fichiers du design system** — `styles/`, `components/ui/`, `lib/` selon la structure du projet
3. **Identifier les tokens et composants existants** — Ne jamais hardcoder de valeurs

**Interdictions** :
- ❌ Hardcoder des couleurs (`#F97316`, `text-orange-500`)
- ❌ Hardcoder des fonts (`font-syne`, `font-dm-sans`)
- ❌ Hardcoder des spacing arbitraires
- ❌ Créer des composants qui dupliquent des existants
- ❌ Ignorer les conventions du projet

**Obligations** :
- ✅ Utiliser les CSS variables définies
- ✅ Utiliser les composants UI existants
- ✅ Respecter les conventions de nommage du projet
- ✅ Suivre les patterns d'animation déjà en place
- ✅ Référencer CLAUDE.md pour toute décision de style

---

## ÉTAPE 0 : AUDIT DU DESIGN SYSTEM (OBLIGATOIRE)

**Avant toute implémentation, exécuter ces commandes :**

```bash
# 1. Lire le fichier de référence du projet
cat CLAUDE.md

# 2. Explorer la structure des composants
ls -la components/
ls -la components/ui/

# 3. Identifier les tokens de style
cat tailwind.config.ts
cat styles/globals.css

# 4. Lister les composants existants
find components -name "*.tsx" | head -30

# 5. Vérifier les conventions d'animation
grep -r "framer-motion" components/ | head -10
```

**Documenter les éléments trouvés :**

| Élément | Fichier source | Usage |
|---------|----------------|-------|
| Couleurs | `tailwind.config.ts` ou CSS vars | Utiliser les noms de tokens |
| Typographie | CLAUDE.md / globals.css | Classes ou variables définies |
| Spacing | CLAUDE.md | Conventions py-X, px-X |
| Composants UI | `components/ui/` | Réutiliser tel quel |
| Animations | Composants existants | Copier les patterns |

---

## CONTEXTE TECHNIQUE

### Stack (à vérifier dans le projet)

| Technologie | Où vérifier |
|-------------|-------------|
| **Framework** | `package.json` → version Next.js |
| **Styling** | `tailwind.config.ts` → tokens |
| **Animations** | Composants existants → patterns Framer |
| **Route group** | Structure `app/` |

### Design Tokens — EXTRAIRE DU PROJET

> ⚠️ **Ne pas utiliser de valeurs hardcodées. Extraire de CLAUDE.md et tailwind.config.ts**

```bash
# Extraire les couleurs
grep -A 20 "colors:" tailwind.config.ts

# Extraire les fonts
grep -A 10 "fontFamily:" tailwind.config.ts

# Extraire les conventions CLAUDE.md
cat CLAUDE.md | grep -A 5 "couleur\|color\|spacing\|font"
```

### Composants existants — IDENTIFIER

```bash
# Lister tous les composants disponibles
find components -name "*.tsx" -exec basename {} \; | sort | uniq
```

**Composants typiques à rechercher :**

| Composant recherché | Noms possibles |
|---------------------|----------------|
| Wrapper de section | `Section`, `SectionWrapper`, `Container` |
| Titre de section | `SectionTitle`, `Heading`, `Title` |
| Bouton CTA | `Button`, `CTAButton`, `LinkButton` |
| Card | `Card`, `FeatureCard`, `ServiceCard` |

---

## ARCHITECTURE DES FICHIERS

```
app/
└── (marketing)/
    ├── a-propos/
    │   ├── notre-histoire/
    │   │   └── page.tsx
    │   └── equipe/
    │       └── page.tsx
    ├── temoignages/
    │   └── page.tsx
    ├── blog/
    │   ├── page.tsx (index)
    │   └── [slug]/
    │       └── page.tsx (template)
    ├── mentions-legales/
    │   └── page.tsx
    ├── confidentialite/
    │   └── page.tsx
    └── cgv/
        └── page.tsx
```

---

## PATTERNS À EXTRAIRE DU PROJET

### Pattern 1 : Section Wrapper

```bash
grep -r "SectionWrapper\|<section" components/ app/ | head -10
```

**Si existant** : Réutiliser tel quel
**Si inexistant** : Créer selon les conventions CLAUDE.md

### Pattern 2 : Animations Framer Motion

```bash
grep -r "whileInView\|initial=\|animate=" components/ | head -10
```

**Extraire les variants utilisés** et les réutiliser.

### Pattern 3 : Responsive

```bash
grep -r "sm:\|md:\|lg:\|xl:" components/ | head -20
```

**Suivre les mêmes breakpoints** que le reste du projet.

### Pattern 4 : Spacing des sections

Chercher dans CLAUDE.md :
- Padding vertical des sections
- Padding horizontal container
- Gap entre éléments

---

## SPÉCIFICATIONS PAR PAGE

> **Pour chaque page, le style DOIT provenir du design system.**
> **Les specs ci-dessous sont des guides de structure, pas de style.**

---

### PAGE 1 : Notre Histoire

**Fichier** : `app/(marketing)/a-propos/notre-histoire/page.tsx`
**Source contenu** : `CONTENU-NOTRE-HISTOIRE.md`

#### Metadata

```typescript
export const metadata: Metadata = {
  title: '[Copier du fichier CONTENU]',
  description: '[Copier du fichier CONTENU]',
  openGraph: {
    title: '[Title]',
    description: '[Description]',
    url: 'https://connect-web.tech/a-propos/notre-histoire',
    type: 'website',
  },
}
```

#### Structure sections

| # | Section | Structure | Fond |
|---|---------|-----------|------|
| 1 | Hero | Centré, H1 + sous-titre + 2 CTA | [Design system] |
| 2 | Origine & Mission | 2 colonnes texte/image | [Alterner selon CLAUDE.md] |
| 3 | Nos Valeurs | Grid 4 cards | [Alterner] |
| 4 | Chiffres Clés | 4 metrics en ligne | [Alterner] |
| 5 | Notre Vision | Texte centré | [Alterner] |
| 6 | CTA Final | Bandeau CTA | [Design system] |

#### Composants à utiliser

| Besoin | Action |
|--------|--------|
| Wrapper section | Utiliser composant existant du projet |
| Titre section | Utiliser composant existant |
| Card valeur | Utiliser `Card` existant ou adapter |
| Bouton CTA | Utiliser `Button` existant avec variant |
| Counter animé | Utiliser pattern animation existant |

---

### PAGE 2 : Équipe

**Fichier** : `app/(marketing)/a-propos/equipe/page.tsx`
**Source contenu** : `CONTENU-EQUIPE.md`

#### Structure sections

| # | Section | Structure | Fond |
|---|---------|-----------|------|
| 1 | Hero | Centré | [Design system] |
| 2 | Fondateur | Card large horizontale | [Alterner] |
| 3 | L'Équipe | Grid cards membres | [Alterner] |
| 4 | Valeurs Humaines | Liste ou grid | [Alterner] |
| 5 | On Recrute | Bandeau [PLACEHOLDER] | [Alterner] |
| 6 | CTA Final | Contact | [Design system] |

#### Composants à utiliser

| Besoin | Action |
|--------|--------|
| Card fondateur | Adapter `Card` existant |
| Card membre | Réutiliser pattern card du projet |
| Icônes | Utiliser librairie d'icônes du projet |

---

### PAGE 3 : Témoignages

**Fichier** : `app/(marketing)/temoignages/page.tsx`
**Source contenu** : `CONTENU-TEMOIGNAGES.md`

#### Structure sections

| # | Section | Structure | Fond |
|---|---------|-----------|------|
| 1 | Hero | Centré + chiffre | [Design system] |
| 2 | Chiffres Clés | Barre metrics | [Alterner] |
| 3 | Témoignages | Tabs + carousel/grid | [Alterner] |
| 4 | Résultats | 3 cards | [Alterner] |
| 5 | Logos Clients | Grid logos | [Alterner] |
| 6 | CTA Final | Rejoignez-les | [Design system] |

#### Composants à utiliser

| Besoin | Action |
|--------|--------|
| Tabs | Chercher composant `Tabs` existant |
| Carousel | Utiliser même lib que le projet (Embla ?) |
| Card témoignage | Adapter pattern card existant |

---

### PAGE 4 : Blog

**Fichiers** : 
- `app/(marketing)/blog/page.tsx` (index)
- `app/(marketing)/blog/[slug]/page.tsx` (article)

**Source contenu** : `CONTENU-BLOG.md`

#### Index — Structure

| # | Section | Structure | Fond |
|---|---------|-----------|------|
| 1 | Hero | Centré | [Design system] |
| 2 | Articles | Grid 3 colonnes | [Alterner] |
| 3 | Filtres | Tabs catégories | - |
| 4 | Newsletter | Bandeau inscription | [Alterner] |
| 5 | CTA | Contact | [Design system] |

#### Article — Structure

| # | Section | Structure | Fond |
|---|---------|-----------|------|
| 1 | Header | Image + meta | [Design system] |
| 2 | Contenu | Prose centré | [Design system] |
| 3 | Auteur | Card auteur | [Alterner] |
| 4 | Articles Liés | Grid 3 cards | [Alterner] |
| 5 | CTA | Contact | [Design system] |

#### Composants à utiliser

| Besoin | Action |
|--------|--------|
| Article card | Créer selon pattern card du projet |
| Prose styling | Utiliser styles existants ou `@tailwindcss/typography` |
| Badge catégorie | Utiliser `Badge` existant |

---

### PAGES 5, 6, 7 : Pages Légales

**Fichiers** : 
- `app/(marketing)/mentions-legales/page.tsx`
- `app/(marketing)/confidentialite/page.tsx`
- `app/(marketing)/cgv/page.tsx`

**Sources** : `CONTENU-MENTIONS-LEGALES.md`, `CONTENU-CONFIDENTIALITE.md`, `CONTENU-CGV.md`

#### Structure commune

Pages légales simples :
- Container étroit (selon design system)
- H1 + sections H2
- Style prose pour lisibilité
- Pas d'animations élaborées
- Fond selon design system

#### Styles

Utiliser les classes prose/texte définies dans le projet.

---

## SCHEMA.ORG

Chercher le pattern existant :

```bash
grep -r "application/ld+json\|JsonLd" app/ components/ | head -5
```

| Page | Schema Type |
|------|-------------|
| Notre Histoire | Organization |
| Équipe | Person + Organization |
| Témoignages | Organization + AggregateRating + Review |
| Blog Index | Blog |
| Blog Article | Article |
| Mentions/Confidentialité/CGV | Aucun |

---

## CHECKLIST QUALITÉ PAR PAGE

### Conformité Design System
- [ ] Tous les styles proviennent de CLAUDE.md / tailwind.config
- [ ] Aucune couleur hardcodée
- [ ] Composants existants réutilisés
- [ ] Conventions de spacing respectées
- [ ] Patterns d'animation du projet utilisés

### SEO
- [ ] Metadata title et description
- [ ] H1 unique avec mot-clé
- [ ] H2 structurés
- [ ] Alt sur images
- [ ] Schema.org injecté

### UX/UI
- [ ] Mobile-first selon conventions projet
- [ ] Animations cohérentes avec le reste du site
- [ ] CTA selon design system

### Performance
- [ ] Images via next/image
- [ ] Lazy loading si pattern existant
- [ ] Fonts du projet (next/font)

---

## INSTRUCTIONS D'EXÉCUTION

### Étape 0 : Audit obligatoire

```bash
# OBLIGATOIRE avant toute implémentation
cat CLAUDE.md
cat tailwind.config.ts
ls components/ui/
```

**Documenter :**
- Tokens de couleur disponibles
- Composants UI existants
- Conventions de spacing
- Patterns d'animation

### Étape 1 : Lire les fichiers CONTENU

```bash
ls CONTENU-*.md
cat CONTENU-NOTRE-HISTOIRE.md
```

### Étape 2 : Identifier composants à créer vs réutiliser

| Besoin | Existe ? | Action |
|--------|----------|--------|
| Section wrapper | Vérifier | Réutiliser ou créer selon design system |
| Card | Vérifier | Réutiliser ou adapter |
| Button | Vérifier | Réutiliser |

### Étape 3 : Implémenter les pages

Pour chaque page :

1. Créer le fichier au bon chemin
2. Copier metadata du fichier CONTENU
3. Implémenter sections avec composants du design system
4. Copier contenu textuel
5. Ajouter animations selon patterns projet
6. Injecter Schema.org
7. Tester responsive

### Étape 4 : Vérification

```bash
npm run build
npm run dev
```

### Ordre d'implémentation recommandé

1. `mentions-legales` — Plus simple
2. `confidentialite` — Même template
3. `cgv` — Même template
4. `notre-histoire` — Composants principaux
5. `equipe` — Réutilise composants
6. `temoignages` — Plus complexe
7. `blog` — Le plus complexe

---

## RAPPEL FINAL

> **Le design system est la source de vérité.**
> 
> Si un élément de style n'est pas défini dans CLAUDE.md ou le design system, **demander clarification** avant d'implémenter.
> 
> Ne jamais inventer de styles non cohérents avec le projet.

---

## OUTPUT ATTENDU

7 pages **visuellement cohérentes avec le reste du site** :

- `/a-propos/notre-histoire`
- `/a-propos/equipe`
- `/temoignages`
- `/blog` + `/blog/[slug]`
- `/mentions-legales`
- `/confidentialite`
- `/cgv`

Confirmer après chaque page : `✅ [nom-page] implémenté — conforme au design system`
