# PROMPTS.md — Refonte page /services/developpement-mobile
# ═══════════════════════════════════════════════════════════
# 15 prompts à copier-coller UN PAR UN dans Claude Code.
#
# Prompt 0a : Supprime la règle 6 sections obligatoires de CLAUDE.md
# Prompt 0b : Met à jour CONTENT.md avec le contenu refonté (12 sections)
# Prompts 1→12 : Génère chaque section du composant page
# Prompt 13 : Metadata SEO + vérification finale
#
# ~25-35k tokens total vs ~150k+ en une passe.


# ══════════════════════════════════════════════════════════
# PROMPT 0a — Supprimer la règle 6 sections de CLAUDE.md
# ══════════════════════════════════════════════════════════

```
Dans CLAUDE.md, supprime la contrainte des 6 sections obligatoires pour les pages services. Chaque page service doit pouvoir avoir le nombre de sections qui fait sens pour son contenu.

Modifications à faire :

1. SUPPRIMER tout le bloc `## 📐 STRUCTURE PAGES SERVICES — RÈGLE GLOBALE` (lignes ~1508-1620), c'est-à-dire :
   - Le titre et l'intro "Toutes les pages suivent obligatoirement ces 6 sections..."
   - Le tableau "Logique de chaque section"
   - Les "Règles de fusion"
   - Les sous-sections 02 à 06 (catalogue, problématiques, tabs, case studies, CTA)
   Tout le bloc jusqu'au prochain `---`.

2. Dans la section SITEMAP (~ligne 322), REMPLACER :
   **Chaque page service contient 11 sections dans cet ordre :**
   1. Hero ... 11. CTA Final
   PAR :
   **Chaque page service définit ses propres sections selon le contenu dans CONTENT.md.**

3. Dans la section "Alternance des fonds — pages services" (~ligne 632), REMPLACER le bloc fixe 01-06 PAR :
   ```
   Pages services — alternance libre :
   Hero               → bg-[#0A0B0E] text-white
   Sections impaires  → bg-white (section-base)
   Sections paires    → bg-[#F4F6FA] (section-alt)
   CTA Final          → bg-[#1B2A4A] text-white (section-brand)
   ```

4. Dans les INTERDICTIONS (~ligne 1642), SUPPRIMER la ligne :
   ❌ Ne jamais créer une page `/services/*` avec une structure différente des 6 sections définies dans `## 📐 STRUCTURE PAGES SERVICES`

5. Dans le WORKFLOW PAR SECTION (~ligne 1668), REMPLACER :
   //    sections impaires  → className="section-base"
   //    sections paires    → className="section-alt"
   PAR :
   //    Alterner section-base / section-alt selon la position
   //    Le nombre et l'ordre des sections est défini dans CONTENT.md

Ne touche à RIEN d'autre dans CLAUDE.md. Les règles de design system, spacing, typo, couleurs, Hero template, cards flush, etc. restent intactes.

Confirme les 5 modifications effectuées.
```


# ══════════════════════════════════════════════════════════
# PROMPT 0b — Mettre à jour CONTENT.md (page mobile → 12 sections)
# ══════════════════════════════════════════════════════════

```
Dans CONTENT.md, remplace tout le bloc de la page "Développement Mobile" (entre `### PAGE : Développement Mobile` et le prochain `---` avant `### PAGE : Applications Web`) par le contenu ci-dessous.

La page passe de l'ancien format libre à 12 sections optimisées conversion + SEO.

### PAGE : Développement Mobile
**URL** : `/services/developpement-mobile`
**Sections** : 12

**— SECTION 01 : HERO —**
Badge eyebrow : "Service · Développement Mobile"
H1            : "Applications mobiles\npensées pour\nl'utilisateur africain."
                (mot "l'utilisateur africain" coloré var(--orange))
Sous-titre    : "React Native · Flutter · Wave & Orange Money intégrés."
Badge diff    : "iOS & Android · Offline-first · Paiement mobile natif"
CTA primaire  : "Créer mon application" → /contact?service=developpement-mobile
CTA secondaire: "Voir nos apps" → /portfolio
Métriques pills : "iOS & Android" · "Offline-first" · "Wave & OM intégrés"

**— SECTION 02 : SOCIAL PROOF —**
Titre         : "Ils nous font confiance"
Métriques     :
  - 50+ · "Projets livrés"
  - 98% · "Clients satisfaits"
  - 3+  · "Ans d'expérience"
  - 24h · "Délai de réponse"
Logos         : [PLACEHOLDER — logos clients]
Note          : "Startups, PME et grands groupes au Sénégal et en Afrique de l'Ouest."

**— SECTION 03 : PROBLÈMES CLIENTS —**
Eyebrow       : "Vos défis"
Titre H2      : "Vous rencontrez ces obstacles ?"
Problèmes :
  - icône: ZapOff
    titre: "App lente et instable"
    texte: "Vos utilisateurs désinstallent. 53% abandonnent une app qui charge en +3 secondes."
  - icône: HelpCircle
    titre: "Quel choix technique ?"
    texte: "iOS, Android, les deux ? Le mauvais choix peut doubler votre budget."
  - icône: AlertTriangle
    titre: "Prestataire décevant"
    texte: "Livré en retard, hors budget, qualité médiocre. Ça ne se reproduira pas."
  - icône: WifiOff
    titre: "Inutilisable hors connexion"
    texte: "En Afrique de l'Ouest, la connectivité n'est pas garantie. Votre app doit fonctionner partout."

**— SECTION 04 : NOTRE APPROCHE —**
Eyebrow       : "Notre méthode"
Titre H2      : "Simple, transparent, sans surprise"
Piliers :
  - numero: 01
    titre: "Stratégie d'abord"
    texte: "Avant de coder, on analyse votre marché et vos utilisateurs. Chaque décision technique sert un objectif business."
  - numero: 02
    titre: "Sprints visibles"
    texte: "Démo toutes les 2 semaines. Vous voyez l'avancement, vous validez, vous gardez le contrôle."
  - numero: 03
    titre: "Qualité non négociable"
    texte: "Tests sur appareils réels (Samsung, iPhone, Tecno, Infinix). Votre app marche partout."

**— SECTION 05 : TYPES D'APPLICATIONS —**
Titre H2      : "Quel type d'app vous faut-il ?"
Types :
  - icône: Smartphone
    titre: "Cross-platform"
    texte: "Un seul code pour iOS et Android. React Native ou Flutter selon votre besoin."
  - icône: ShoppingCart
    titre: "E-commerce mobile"
    texte: "Catalogue, paiement Wave/OM, suivi commande, notifications push."
  - icône: Briefcase
    titre: "Apps métier & terrain"
    texte: "Gestion de flotte, CRM mobile, collecte données, mode hors ligne."
  - icône: Rocket
    titre: "MVP rapide"
    texte: "Votre idée testée en 4-6 semaines. Itération rapide, budget maîtrisé."
  - icône: Heart
    titre: "Santé & bien-être"
    texte: "Suivi patient, téléconsultation, objets connectés."
  - icône: MessageCircle
    titre: "Un besoin spécifique ?"
    texte: "Décrivez votre projet, on vous propose la solution adaptée."
    lien: /contact
    style: border-dashed

**— SECTION 06 : TECHNOLOGIES —**
Titre H2      : "La bonne techno pour le bon projet"
Intro         : "Le choix technique est une décision business. On recommande ce qui maximise votre ROI."
Technologies :
  - nom: React Native
    tagline: "Un code, deux stores"
    texte: "Idéal pour MVP, apps métier, budget maîtrisé. -40% vs natif."
    cas: "MVP · Logique métier · Budget"
  - nom: Flutter
    tagline: "Design pixel-perfect"
    texte: "Interfaces visuelles riches, animations, multi-plateforme."
    cas: "UI riche · Animations · Multi-plateforme"
  - nom: Swift / Kotlin
    tagline: "Puissance native"
    texte: "Accès hardware (caméra, AR, capteurs), jeux, features OS avancées."
    cas: "Hardware · AR · Performance critique"
CTA inline    : "Besoin d'aide pour choisir ? On analyse votre projet gratuitement."

**— SECTION 07 : FONCTIONNALITÉS —**
Titre H2      : "Ce que votre app peut faire"
Features :
  - icône: Bell       | titre: "Push intelligents"    | bénéfice: "Rétention ×3"         | texte: "Bon message, bon moment, bon utilisateur."
  - icône: WifiOff    | titre: "Mode hors ligne"      | bénéfice: "Zéro frustration"     | texte: "Fonctionne sans réseau, sync auto au retour."
  - icône: CreditCard | titre: "Paiement mobile"      | bénéfice: "Wave & OM natifs"     | texte: "Wave, Orange Money, Free Money, Stripe."
  - icône: MapPin     | titre: "Géolocalisation"      | bénéfice: "Contextuel"           | texte: "Store locator, tracking, suggestions locales."
  - icône: Fingerprint| titre: "Auth sécurisée"       | bénéfice: "Confiance"            | texte: "Biométrie, SSO, 2FA."
  - icône: BarChart2  | titre: "Analytics"             | bénéfice: "Data-driven"          | texte: "KPI temps réel, comportement, entonnoirs."
  - icône: Plug       | titre: "Intégration API"      | bénéfice: "Connecté"             | texte: "ERP, CRM, paiement, bases existantes."
  - icône: MessageSquare | titre: "Chat in-app"        | bénéfice: "Engagement"           | texte: "Communication users/support, notifs temps réel."

**— SECTION 08 : PROCESSUS —**
Titre H2      : "De l'idée au lancement"
Étapes :
  - num: 1 | titre: "Analyse UX"      | durée: "1 sem"      | texte: "Parcours utilisateur, wireframes mobile."              | implication: haute
  - num: 2 | titre: "Design UI"       | durée: "1-2 sem"    | texte: "Maquettes Figma HD, design system mobile."             | implication: haute
  - num: 3 | titre: "Développement"   | durée: "4-8 sem"    | texte: "Sprints 2 semaines, preview TestFlight/APK."           | implication: moyenne
  - num: 4 | titre: "Tests QA"        | durée: "1-2 sem"    | texte: "Appareils réels iOS & Android, 10+ devices."           | implication: faible
  - num: 5 | titre: "Publication"     | durée: "3-7 jours"  | texte: "Soumission stores, validation, lancement."             | implication: faible
  - num: 6 | titre: "Support"         | durée: "continu"    | texte: "Mises à jour, corrections, nouvelles features."        | implication: moyenne

**— SECTION 09 : POURQUOI NOUS FAIRE CONFIANCE —**
Eyebrow       : "Preuves"
Titre H2      : "Pourquoi nous faire confiance"

Bloc chiffres :
  - 50+  · "projets livrés depuis 2021"
  - 98%  · "clients satisfaits"
  - 3+   · "ans d'expérience mobile"
  - 24h  · "délai de réponse garanti"

Bloc témoignages :
  - [PLACEHOLDER — citation client 1]
  - [PLACEHOLDER — citation client 2]

Bloc résultats :
  - [PLACEHOLDER — projet 1 avec métriques]
  - [PLACEHOLDER — projet 2 avec métriques]

Bloc garanties :
  - "Code 100% votre propriété dès le jour 1"
  - "NDA systématique"
  - "Accès repo Git en temps réel"
  - "Tests sur appareils réels"
  - "Wave & Orange Money intégrés en standard"
  - "Support post-lancement inclus"

**— SECTION 10 : POURQUOI CONNECT WEB —**
Titre H2      : "Ce qui fait la différence"
Arguments :
  - icône: MapPin     | titre: "Basés à Dakar"                   | texte: "On connaît votre marché, vos utilisateurs, vos contraintes réseau."
  - icône: Users      | titre: "Équipe senior"                   | texte: "Pas de juniors sur votre projet. Développeurs expérimentés uniquement."
  - icône: Eye        | titre: "Transparence totale"              | texte: "Accès au code, au backlog et aux démos à chaque sprint."
  - icône: Wallet     | titre: "Wave & OM en standard"            | texte: "Paiement mobile africain intégré nativement, pas en option."
  - icône: WifiOff    | titre: "Offline-first"                    | texte: "Apps conçues pour fonctionner avec une connexion limitée."
  - icône: Shield     | titre: "Support post-lancement"           | texte: "On reste après la livraison. Mises à jour, corrections, évolutions."

**— SECTION 11 : FAQ —**
Titre H2      : "Questions fréquentes"
Questions :
  Q1 : Dois-je faire une app native ou cross-platform ?
  R  : Pour 90% des projets, React Native ou Flutter suffisent. Performances quasi-natives, coût divisé par deux. On conseille selon votre budget et délai.

  Q2 : Mon app fonctionnera-t-elle sans internet ?
  R  : Oui. On développe en offline-first — adapté aux zones à connectivité limitée. Sync auto au retour du réseau.

  Q3 : Budget pour une application mobile ?
  R  : À partir de 600 000 FCFA pour un MVP. App métier complète : 1,5M à 5M FCFA. Devis gratuit après premier échange.

  Q4 : Peut-on intégrer Wave et Orange Money ?
  R  : Oui, c'est notre spécialité. Intégrés en standard sur tous nos projets.

  Q5 : Combien de temps pour publier sur les stores ?
  R  : Apple : 1-3 jours. Google Play : 2-7 jours. On gère toute la soumission.

  Q6 : Le code m'appartient ?
  R  : Oui. 100% du code source vous appartient dès le jour 1. Hébergé sur votre repo GitHub/GitLab.

  Q7 : Proposez-vous un support après livraison ?
  R  : Oui. Support inclus 30 jours. Contrats maintenance disponibles pour le long terme.

**— SECTION 12 : CTA FINAL + FORMULAIRE —**
Titre H2   : "Créez votre application\nmobile dès maintenant"
Sous-titre : "Premier échange offert — réponse sous 24h."
Service    : 'developpement-mobile'
Trust      : ✓ Réponse sous 24h · ✓ Premier échange offert · ✓ Sans engagement

Ne touche à rien d'autre dans CONTENT.md. Confirme quand c'est fait.
```


# ══════════════════════════════════════════════════════════
# PROMPT 1 — Section 01 : Hero
# ══════════════════════════════════════════════════════════

```
Crée app/(marketing)/services/developpement-mobile/page.tsx avec UNIQUEMENT le Hero.

Lis CONTENT.md > Développement Mobile > SECTION 01 HERO.
Applique le template Hero exact de CLAUDE.md (§ RÈGLE HERO — hero-bg, grid 3fr/2fr, framer-motion, floating pills).

- Badge : "Service · Développement Mobile"
- H1 : 3 spans display:block → "Applications mobiles" / "pensées pour" / "l'utilisateur africain." (orange)
- Sous-titre className="text-hero-subtitle" : "React Native · Flutter · Wave & Orange Money intégrés."
- Badge diff : "iOS & Android · Offline-first · Paiement mobile natif"
- CTA primaire gradient orange : "Créer mon application" → /contact?service=developpement-mobile
- CTA secondaire outline : "Voir nos apps" → /portfolio
- Colonne droite : PhoneMockup placeholder (rectangle arrondi + écran gradient)
- 3 pills flottantes animées : "iOS & Android" · "Offline-first" · "Wave & OM intégrés"

Inline styles pour spacing. Pas de className text-h1.
```


# ══════════════════════════════════════════════════════════
# PROMPT 2 — Section 02 : Social Proof
# ══════════════════════════════════════════════════════════

```
Ajoute la section 02 Social Proof SOUS le Hero dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 02 SOCIAL PROOF.

- className="section-base"
- Titre : "Ils nous font confiance"
- 4 métriques en row (50+ projets · 98% satisfaits · 3+ ans · 24h réponse)
- Compteurs animés au scroll (useInView + animation chiffre)
- Zone logos : placeholders rectangulaires gris en grid ou marquee
- Note : "Startups, PME et grands groupes au Sénégal et en Afrique de l'Ouest."
- Responsive : 2×2 grid mobile pour les métriques
```


# ══════════════════════════════════════════════════════════
# PROMPT 3 — Section 03 : Problèmes clients
# ══════════════════════════════════════════════════════════

```
Ajoute la section 03 Problèmes clients dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 03.

- className="section-alt"
- Eyebrow orange : "Vos défis"
- H2 : "Vous rencontrez ces obstacles ?"
- 4 cards grid 2×2 (1 col mobile)
- Chaque card : icône Lucide (ZapOff, HelpCircle, AlertTriangle, WifiOff), titre bold, texte empathique
- Cards avec style .cards-flush ou cards standard avec border
- Framer-motion stagger 0.1s, fade-in au scroll
```


# ══════════════════════════════════════════════════════════
# PROMPT 4 — Section 04 : Notre approche
# ══════════════════════════════════════════════════════════

```
Ajoute la section 04 Notre approche dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 04.

- className="section-base"
- Eyebrow : "Notre méthode"
- H2 : "Simple, transparent, sans surprise"
- 3 piliers en colonnes (stack mobile)
- Chaque pilier : gros numéro stylisé (01, 02, 03) en text-[--color-orange-500] semi-transparent, titre en font-heading, texte en font-body
- Framer-motion stagger
```


# ══════════════════════════════════════════════════════════
# PROMPT 5 — Section 05 : Types d'applications
# ══════════════════════════════════════════════════════════

```
Ajoute la section 05 Types d'applications dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 05.

- className="section-alt"
- H2 : "Quel type d'app vous faut-il ?"
- 6 cards grille .cards-flush lg:grid-cols-3
- Chaque card : icône Lucide wrapper 44×44, titre var(--card-title-size), desc var(--card-text-size)
- Dernière card ("Un besoin spécifique ?") : border-dashed bg-[#F8FAFC], lien → /contact
- Icônes : Smartphone, ShoppingCart, Briefcase, Rocket, Heart, MessageCircle
```


# ══════════════════════════════════════════════════════════
# PROMPT 6 — Section 06 : Technologies
# ══════════════════════════════════════════════════════════

```
Ajoute la section 06 Technologies dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 06.

- className="section-base"
- H2 : "La bonne techno pour le bon projet"
- Texte intro
- 3 cards technos (React Native, Flutter, Swift/Kotlin) — chaque card :
  - Nom en titre, tagline, description, tags de cas d'usage (chips)
- CTA inline en bas : "Besoin d'aide pour choisir ? On analyse votre projet gratuitement." texte accent
- Les cards peuvent être .cards-flush ou des cards standard côte à côte
```


# ══════════════════════════════════════════════════════════
# PROMPT 7 — Section 07 : Fonctionnalités
# ══════════════════════════════════════════════════════════

```
Ajoute la section 07 Fonctionnalités dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 07.

- className="section-alt"
- H2 : "Ce que votre app peut faire"
- Grid 4×2 desktop (2×4 mobile) de feature cards compactes
- Chaque card : icône Lucide, titre, badge bénéfice en tag accent (ex: "Rétention ×3", "Wave & OM natifs"), texte court
- Le badge bénéfice est le hook visuel principal — style pill bg-[--color-orange-50] text-[--color-orange-500]
- Icônes : Bell, WifiOff, CreditCard, MapPin, Fingerprint, BarChart2, Plug, MessageSquare
- Si >4 cards en grille statique → utiliser embla-carousel-react (règle CLAUDE.md)
```


# ══════════════════════════════════════════════════════════
# PROMPT 8 — Section 08 : Processus
# ══════════════════════════════════════════════════════════

```
Ajoute la section 08 Processus dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 08.

- className="section-base"
- H2 : "De l'idée au lancement"
- Timeline verticale avec ligne de connexion
- 6 étapes : numéro dans un cercle accent, titre, durée en badge, description, indicateur implication client (haute/moyenne/faible)
- Sur desktop : aligné à gauche avec la ligne
- Sur mobile : timeline empilée
- Framer-motion progressive au scroll
```


# ══════════════════════════════════════════════════════════
# PROMPT 9 — Section 09 : Pourquoi nous faire confiance
# ══════════════════════════════════════════════════════════

```
Ajoute la section 09 Pourquoi nous faire confiance dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 09.

C'est la section PIVOT de conversion. 4 blocs distincts :

- className="section-alt"
- Eyebrow : "Preuves" — H2 : "Pourquoi nous faire confiance"

Bloc 1 — Chiffres : 4 compteurs en row (50+ · 98% · 3+ · 24h), animation au scroll
Bloc 2 — Témoignages : [PLACEHOLDER] — 2 cards citation, garder les placeholders
Bloc 3 — Résultats : [PLACEHOLDER] — 2 mini-cards projet avec métriques
Bloc 4 — Garanties : grille 2×3 items avec icône Check + texte (code propriété, NDA, Git, tests, Wave/OM, support)

Espacement clair entre les blocs. Le plus important visuellement = les chiffres + les garanties.
```


# ══════════════════════════════════════════════════════════
# PROMPT 10 — Section 10 : Pourquoi Connect Web
# ══════════════════════════════════════════════════════════

```
Ajoute la section 10 Pourquoi Connect Web dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 10.

- className="section-base"
- H2 : "Ce qui fait la différence"
- 6 cards grille .cards-flush lg:grid-cols-3 (ou 2×3)
- Chaque card : icône Lucide wrapper 44×44, titre, texte court (2 lignes max)
- Icônes : MapPin, Users, Eye, Wallet, WifiOff, Shield
- Hover : whileHover={{ y: -2 }}
```


# ══════════════════════════════════════════════════════════
# PROMPT 11 — Section 11 : FAQ
# ══════════════════════════════════════════════════════════

```
Ajoute la section 11 FAQ dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 11.

- className="section-alt"
- H2 : "Questions fréquentes"
- 7 questions en accordéon @radix-ui/react-accordion
- type="single" collapsible
- Question active : text-[--color-orange-500]
- Icône Plus → rotation 45° en X à l'ouverture
- Chaque question dans un <h3> pour le SEO
- Contenu exact depuis CONTENT.md — ne rien inventer
```


# ══════════════════════════════════════════════════════════
# PROMPT 12 — Section 12 : CTA Final + Formulaire
# ══════════════════════════════════════════════════════════

```
Ajoute la section 12 CTA Final dans developpement-mobile/page.tsx.

Lis CONTENT.md > Développement Mobile > SECTION 12.

- className="section-brand" (bg-[#1B2A4A])
- H2 text-white font-heading : "Créez votre application mobile dès maintenant"
- Sous-titre : "Premier échange offert — réponse sous 24h."
- Grid : texte gauche + formulaire droite, stack mobile

Formulaire react-hook-form + zod :
- Prénom + Nom (grid 2 cols)
- Email
- Téléphone / WhatsApp
- Service select → défaut "developpement-mobile"
- Budget select : < 500k FCFA · 500k–2M · 2M–5M · 5M+ · Je ne sais pas
- Description textarea optionnel
- Bouton : text-white bg-white/10 hover:bg-white/20 (sur fond section-brand)
- POST /api/contact (existante — NE PAS recréer)

Trust : ✓ Réponse sous 24h · ✓ Premier échange offert · ✓ Sans engagement
```


# ══════════════════════════════════════════════════════════
# PROMPT 13 — Metadata SEO + vérification finale
# ══════════════════════════════════════════════════════════

```
Ajoute les metadata Next.js en haut de developpement-mobile/page.tsx :

export const metadata: Metadata = {
  title: "Développement Application Mobile iOS & Android | Connect Web Dakar",
  description: "Agence développement mobile à Dakar. React Native, Flutter, Wave & Orange Money intégrés. +50 projets livrés. Estimation gratuite.",
  openGraph: {
    title: "Applications Mobiles iOS & Android | Connect Web",
    description: "Applications mobiles pensées pour l'utilisateur africain. React Native, Flutter, paiement mobile natif.",
    url: "https://connect-web.tech/services/developpement-mobile",
  },
}

Vérifie la page complète — les 12 sections doivent être dans cet ordre :
01. Hero (hero-bg)
02. Social Proof (section-base)
03. Problèmes clients (section-alt)
04. Notre approche (section-base)
05. Types d'apps (section-alt)
06. Technologies (section-base)
07. Fonctionnalités (section-alt)
08. Processus (section-base)
09. Pourquoi nous faire confiance (section-alt)
10. Pourquoi Connect Web (section-base)
11. FAQ (section-alt)
12. CTA Final (section-brand)

Check-list :
□ Aucun texte inventé — tout vient de CONTENT.md
□ [PLACEHOLDER] conservés tels quels
□ Aucun bg-orange en fond de section
□ Aucun className text-h1 sur le H1 Hero
□ Inline styles pour spacing (RÈGLE N°0)
□ CTA Hero = gradient orange
□ Font Syne titres, DM Sans corps
□ Accordion Radix sur la FAQ
□ Formulaire → /api/contact existante
□ Alternance section-base / section-alt correcte
□ Toutes les sections wrappées dans <section className="..."><div className="container">

Corrige tout ce qui ne respecte pas CLAUDE.md.
```


# ══════════════════════════════════════════════════════════
# RECAP
# ══════════════════════════════════════════════════════════
#
# Prompt 0a : Nettoie CLAUDE.md — supprime la règle 6 sections
# Prompt 0b : Met à jour CONTENT.md — 12 sections page mobile
# Prompt 1-12 : Génère chaque section une par une
# Prompt 13 : SEO + vérification
#
# Total : ~30-40k tokens
# vs une passe : ~150k+
# Économie : ~75-80%
#
# ORDRE : toujours 0a → 0b → 1 → 2 → ... → 12 → 13
# Vérifier le rendu après chaque prompt avant de continuer.
