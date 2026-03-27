# REFONTE-HOME.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Homepage Connect Web
# CONTENU + SEO + CRO + SCHEMA.ORG — tout est dans ce fichier.
# Ne lis pas CONTENT.md. Lis CLAUDE.md uniquement aux lignes indiquées.
# Exécute les 3 tâches sans pause.
# ═══════════════════════════════════════════════════════════

# ── CLAUDE.md — Sections à lire ──
# sed -n '8,68p' CLAUDE.md       → Spacing inline
# sed -n '90,163p' CLAUDE.md     → Copywriting
# sed -n '410,498p' CLAUDE.md    → Composants existants
# sed -n '502,577p' CLAUDE.md    → Couleurs
# sed -n '579,641p' CLAUDE.md    → Règles style + alternance
# sed -n '643,720p' CLAUDE.md    → Classes CSS
# sed -n '742,826p' CLAUDE.md    → Typo + espacement
# sed -n '847,1067p' CLAUDE.md   → Template Hero
# sed -n '1082,1152p' CLAUDE.md  → Cards flush
# sed -n '1154,1211p' CLAUDE.md  → Slider embla
# sed -n '1253,1278p' CLAUDE.md  → Formulaire
# sed -n '1281,1300p' CLAUDE.md  → SEO métadonnées + Schema.org
# sed -n '1624,1648p' CLAUDE.md  → Interdictions

# ── Composants existants — vérifier avant de coder ──
# ls components/sections/ && ls components/ui/ && ls components/seo/


# ══════════════════════════════════════════════════════════
# STRATÉGIE SEO — HOMEPAGE
# ══════════════════════════════════════════════════════════
#
# Mot-clé principal : "agence digitale dakar"
# Mots-clés secondaires :
#   - "agence web dakar" (880/mois)
#   - "agence développement web sénégal" (390/mois)
#   - "création site web dakar" (720/mois)
#   - "développement application mobile dakar" (480/mois)
#   - "prix site web dakar" (590/mois)
#   - "wave orange money intégration" (320/mois)
#
# Placements obligatoires :
#   H1 → contient "projet digital" + "livré" (différenciateur)
#   Hero sous-titre → contient "Dakar" ou "depuis Dakar"
#   Section 03 H2 → contient "Connect Web"
#   Section 04 → descriptions services avec mots-clés métier
#   FAQ → cible longue traîne : "combien coûte", "prix", "délai"
#   CTA → "à Dakar" dans le sous-titre
#
# Structure Hn :
#   H1 : Votre projet digital livré. Pas promis.
#   H2 : Des engagements, pas des promesses (Pourquoi nous)
#   H2 : Solutions digitales pour accélérer votre transformation numérique
#   H2 : Simple, transparent, sans surprise (Méthode)
#   H2 : Des projets livrés qui parlent d'eux-mêmes (Portfolio)
#   H2 : Des offres adaptées à votre projet (Pricing)
#   H2 : Tout ce que vous voulez savoir (FAQ)
#     H3 : Combien coûte un site web à Dakar ? (+ chaque FAQ)
#   H2 : Prêt à lancer votre projet ? (CTA)


# ══════════════════════════════════════════════════════════
# STRATÉGIE CRO — HOMEPAGE
# ══════════════════════════════════════════════════════════
#
# Preuves sociales :
#   - Trust pills Hero : "50+ projets livrés" · "Wave & Orange Money" · "Réponse sous 24h"
#   - Logos clients immédiatement après Hero
#   - Compteurs animés (50+ / 98% / 2-8 / 100%)
#   - Témoignages (quand disponibles, sinon chiffres seuls)
#
# Micro-copy obligatoire :
#   - Sous CTA Hero : rien (les trust pills suffisent)
#   - Sous CTA services : "Découvrir tous nos services →"
#   - Sous CTA portfolio : "Voir tous nos projets →"
#   - Bouton formulaire : "Envoyer ma demande" (PAS "Envoyer" ou "Soumettre")
#   - Sous formulaire : "Vos informations ne sont jamais partagées."
#   - Sous prix : "Chaque devis est gratuit, détaillé et sans engagement."
#   - Après soumission : "Merci ! On revient vers vous sous 24h."
#
# Points de conversion :
#   - Hero : 2 CTAs (primaire + secondaire)
#   - Après services : CTA "Découvrir tous nos services"
#   - Après portfolio : CTA "Voir tous nos projets"
#   - Pricing : 3 CTAs (un par plan)
#   - CTA final : formulaire + WhatsApp
#   - WhatsApp flottant en bas à droite (si composant existe)


# ══════════════════════════════════════════════════════════
# MAILLAGE INTERNE
# ══════════════════════════════════════════════════════════
#
# Depuis les cards services → lien vers chaque page /services/*
# Depuis les cards portfolio → lien vers /portfolio/[slug]
# Depuis la FAQ → liens vers pages pertinentes :
#   "Combien coûte un site" → /tarifs
#   "Support après livraison" → /contact
# Depuis la section pricing → /contact?service=X pour chaque CTA plan
# Footer gère le reste (déjà en place)


# ══════════════════════════════════════════════════════════
# CLUSTER DE CONTENU RECOMMANDÉ (pour le blog)
# ══════════════════════════════════════════════════════════
#
# Articles à créer pour renforcer l'autorité thématique :
#   - "Combien coûte un site web au Sénégal en 2026 ? Guide complet"
#   - "Next.js vs WordPress : pourquoi on a fait le choix"
#   - "Wave et Orange Money : intégrer le paiement mobile dans votre site"
#   - "Les 5 erreurs qui tuent le SEO d'un site sénégalais"
#   - "Pourquoi votre site doit charger en moins de 2 secondes en Afrique"
#
# (Ces articles ne sont pas à créer maintenant — juste pour le futur maillage)


# ══════════════════════════════════════════════════════════
# CONTENU REFONTÉ (avec mots-clés intégrés naturellement)
# ══════════════════════════════════════════════════════════

# ---BEGIN CONTENU---

## 🏠 PAGE D'ACCUEIL (HOME)

### Section 01 : Hero
Badge eyebrow  : "Agence digitale · Dakar, Sénégal"
H1             : "Votre projet digital\nlivré. Pas promis."
                 (mot "livré" coloré var(--orange))
Sous-titre     : "De la maquette au déploiement — en 2 à 8 semaines, depuis Dakar."
Trust pills    : "50+ projets livrés" · "Wave & Orange Money" · "Réponse sous 24h"
CTA primaire   : "Démarrer mon projet" → /contact
CTA secondaire : "Voir nos réalisations" → /portfolio
Métriques pills : "Lighthouse 95+" · "2-8 semaines" · "Support 30j"

### Section 02 : Logos clients
Titre      : "Ils nous font confiance"
Sous-titre : "Des entreprises sénégalaises et africaines qui ont choisi Connect Web"
Logos      : [PLACEHOLDER — logos clients réels]

### Section 03 : Pourquoi Connect Web
Eyebrow    : "Pourquoi Connect Web"
Titre H2   : "Des engagements, pas des promesses"
Arguments :
  - titre: "Lighthouse 95+ garanti"
    preuve: "Pas une estimation. On ne livre pas tant que le score n'est pas atteint."
    icône: Gauge
  - titre: "Réponse sous 24h, délais tenus"
    preuve: "98% de nos projets livrés dans les délais annoncés. Agence web à Dakar, disponible sur WhatsApp."
    icône: Clock
  - titre: "Stack 2024 — pas de WordPress par défaut"
    preuve: "Next.js 15, TypeScript strict, Vercel Edge — votre site dure 5 ans."
    icône: Code2
  - titre: "Basés à Dakar, disponibles pour vous"
    preuve: "Wave, Orange Money, fuseau WAT — on connaît votre marché. Agence digitale sénégalaise."
    icône: MapPin

### Section 04 : Services
Titre H2   : "Solutions digitales pour accélérer votre transformation numérique"
Note       : PAS de filtres sur la homepage.
Cards (6, grille .cards-flush lg:grid-cols-3) :
  - Développement Web | Globe | Sites web rapides et optimisés SEO. Lighthouse 95+. Livré en 1 à 3 semaines à Dakar. → /services/developpement-web
  - Développement Mobile | Smartphone | Applications mobiles iOS & Android. Wave & Orange Money intégrés. Offline-first. → /services/developpement-mobile
  - Applications Web | Layout | Tableaux de bord, portails clients, outils métier sur mesure pour entreprises sénégalaises. → /services/applications-web
  - Applications Mobile | TabletSmartphone | Solutions cross-platform iOS & Android — une base de code, deux stores. → /services/applications-mobile
  - Logiciels SaaS | Cloud | De l'idée au SaaS en production. Multi-tenant, billing Wave + Stripe. → /services/logiciels-saas
  - Architecture & API | Network | APIs REST, GraphQL, microservices et intégrations ERP/CRM sur mesure. → /services/architecture-api
CTA bas : "Découvrir tous nos services →" → /services
Micro-copy sous CTA : rien (le lien suffit)

### Section 05 : Notre méthode
Eyebrow    : "Notre méthode"
Titre H2   : "Simple, transparent, sans surprise"
Étapes :
  - 01 · Découverte — Brief, objectifs, budget, délai. Livrable : document de cadrage.
  - 02 · Design — Maquettes Figma validées avant de coder. Livrable : prototype cliquable.
  - 03 · Développement — Sprints 1-2 semaines, preview Vercel à chaque sprint. Livrable : app fonctionnelle.
  - 04 · Livraison — Déploiement + formation + support 30 jours. Livrable : projet en production.

### Section 06 : Chiffres clés
Stats (compteurs animés au scroll) :
  - 50+  · "Projets livrés"
  - 98%  · "Clients satisfaits"
  - 2–8  · "Semaines de livraison"
  - 100% · "Code source livré"

### Section 07 : Portfolio
Eyebrow    : "Nos réalisations"
Titre H2   : "Des projets livrés qui parlent d'eux-mêmes"
Sous-titre : "Sites web, applications mobiles et plateformes SaaS livrés à des entreprises au Sénégal et en Afrique de l'Ouest."
Filtres    : [ Tous ] [ Sites Web ] [ Apps ] [ SaaS ]
Projets    : [PLACEHOLDER — 4 projets avec titre, secteur, métriques, stack]
CTA        : "Voir tous nos projets →" → /portfolio

### Section 08 : Témoignages
Titre H2   : "Ce que nos clients disent de nous"
⚠️ PLACEHOLDER — NE PAS AFFICHER de fausses citations.
Afficher uniquement : "98% de satisfaction · 50+ projets livrés à Dakar et en Afrique de l'Ouest"
// TODO: Remplacer par TestimonialsCarousel quand vrais témoignages disponibles.

### Section 09 : Pricing
Titre H2   : "Des offres adaptées à votre projet et votre budget"
Sous-titre : "Chaque devis est construit sur mesure. Voici nos fourchettes indicatives."
Plans :
  STARTER — TPE, artisans · Sur devis, fourchette basse · 1-2 sem · "⚡ Le plus rapide"
    Inclus : Site vitrine 3-7 pages · CMS · SEO de base · WhatsApp · Hébergement 1an · Formation
    CTA : "Demander un devis gratuit" → /contact?service=site-vitrine
  PROFESSIONNEL (mis en avant) — PME, startups · Sur devis, fourchette intermédiaire · 2-4 sem · "⭐ Le plus demandé"
    Inclus : Tout Starter + E-commerce + Wave/OM + Dashboard + Automatisations + Support 3 mois
    CTA : "Démarrer mon projet" → /contact?service=professionnel
  SUR MESURE — SaaS, ERP · Sur devis, fourchette haute · 4-8 sem
    Inclus : Architecture custom + Front & back + ERP/CRM/API + Mobile + SLA + Chef de projet
    CTA : "Discuter de mon projet" → /contact?service=sur-mesure
Note micro-copy : "Chaque devis est gratuit, détaillé et sans engagement."

### Section 10 : FAQ
Eyebrow    : "FAQ"
Titre H2   : "Tout ce que vous voulez savoir"
Sous-titre : "Des réponses directes. Pas de jargon."
Questions :
  Q1 (H3) : "Êtes-vous vraiment basés à Dakar ?"
  R  : Oui. Toute l'équipe Connect Web est à Dakar, Sénégal. On intègre Wave, Orange Money et les usages mobiles africains nativement. Vous parlez à une agence digitale qui connaît votre marché.

  Q2 (H3) : "Combien coûte un site web à Dakar ?"
  R  : Un site vitrine démarre à 350 000 FCFA. Une application mobile à partir de 600 000 FCFA. Chaque devis est gratuit et détaillé — consultez notre page tarifs pour les fourchettes complètes.
  Lien interne : → /tarifs

  Q3 (H3) : "Quels sont vos délais de livraison ?"
  R  : Site vitrine : 1-2 semaines. Application mobile : 4-8 semaines. 98% de nos projets livrés à la date convenue.

  Q4 (H3) : "Proposez-vous un support après livraison ?"
  R  : Oui. 30 jours de support inclus à la livraison. Contrats de maintenance longue durée disponibles.

  Q5 (H3) : "Travaillez-vous avec des clients hors du Sénégal ?"
  R  : Oui. Sénégal, Afrique de l'Ouest et diaspora africaine (Europe, Amérique du Nord). Suivi de projet à distance sans friction.

  Q6 (H3) : "Pourquoi Next.js et pas WordPress ?"
  R  : WordPress convient pour un blog. Pour un site performant ou une application web, Next.js est plus rapide (Lighthouse 95+), plus sécurisé et mieux référencé. C'est le choix de notre agence de développement web à Dakar.

  Q7 (H3) : "Le code source m'appartient ?"
  R  : Oui. 100% du code vous appartient dès le jour 1. Hébergé sur votre repo GitHub ou GitLab.

### Section 11 : CTA Final
Titre H2   : "Prêt à lancer\nvotre projet ?"
Sous-titre : "Premier échange offert à Dakar — réponse sous 24h."
Formulaire : Prénom + Email + Select service + Bouton "Envoyer ma demande"
Micro-copy sous formulaire : "Vos informations ne sont jamais partagées."
Micro-copy après soumission : "Merci ! On revient vers vous sous 24h."
WhatsApp   : wa.me/+221779006282 — texte : "Écrire sur WhatsApp" (icône + texte, proéminent)
Trust      : ✓ Sans engagement · ✓ Réponse sous 24h · ✓ Premier échange offert

# ---END CONTENU---


# ══════════════════════════════════════════════════════════
# SCHEMA.ORG — À intégrer dans le JSX
# ══════════════════════════════════════════════════════════
#
# 3 balises <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />
#
# 1. LocalBusiness :
# {
#   "@context": "https://schema.org",
#   "@type": "LocalBusiness",
#   "name": "Connect Web",
#   "description": "Agence digitale à Dakar. Sites web, applications mobiles, logiciels SaaS. Next.js, React Native, Flutter. Wave & Orange Money intégrés.",
#   "url": "https://connect-web.tech",
#   "email": "contact@connect-web.tech",
#   "telephone": "+221779006282",
#   "address": { "@type": "PostalAddress", "addressLocality": "Dakar", "addressCountry": "SN" },
#   "areaServed": ["Sénégal", "Afrique de l'Ouest"],
#   "sameAs": [
#     "https://www.linkedin.com/company/connect-web-tech/",
#     "https://www.facebook.com/share/1CRzjeUSYM/",
#     "https://www.instagram.com/connect_web_agency"
#   ]
# }
#
# 2. FAQPage :
# {
#   "@context": "https://schema.org",
#   "@type": "FAQPage",
#   "mainEntity": [
#     les 7 questions ci-dessus avec leurs réponses exactes en format Question/Answer
#   ]
# }
#
# 3. WebSite :
# {
#   "@context": "https://schema.org",
#   "@type": "WebSite",
#   "name": "Connect Web",
#   "url": "https://connect-web.tech"
# }
#
# Si un composant components/seo/ existe, l'utiliser. Sinon, inline dans le JSX.


# ══════════════════════════════════════════════════════════
# TÂCHE 1 — Écrire dans CONTENT.md
# ══════════════════════════════════════════════════════════
# Remplace le bloc ## 🏠 PAGE D'ACCUEIL → prochain --- par le contenu ci-dessus.
# NE TOUCHE À RIEN D'AUTRE.


# ══════════════════════════════════════════════════════════
# TÂCHE 2 — Réécrire app/(marketing)/page.tsx
# ══════════════════════════════════════════════════════════
#
# AVANT : ls components/sections/ && ls components/ui/ && ls components/seo/
#
# Metadata :
# export const metadata: Metadata = {
#   title: "Connect Web — Agence Digitale à Dakar | Sites Web, Apps Mobiles, SaaS",
#   description: "Agence digitale à Dakar, Sénégal. Création sites web, applications mobiles, logiciels SaaS. Next.js, React Native. Wave & Orange Money intégrés. +50 projets. Devis gratuit.",
#   keywords: "agence digitale dakar, agence web dakar, création site web dakar, développement application mobile sénégal, prix site web dakar",
#   openGraph: {
#     title: "Connect Web — Agence Digitale à Dakar",
#     description: "Votre projet digital livré. Pas promis. Sites web, apps mobiles, SaaS — livrés en 2 à 8 semaines depuis Dakar.",
#     url: "https://connect-web.tech",
#   },
# }
#
# Sections et fonds :
# 01. Hero                → hero-bg
# 02. Logos clients       → section-base
# 03. Pourquoi nous       → section-alt
# 04. Services            → section-base
# 05. Méthode             → section-alt
# 06. Chiffres clés       → section-base
# 07. Portfolio           → section-alt
# 08. Témoignages         → section-base (placeholder discret)
# 09. Pricing             → section-alt
# 10. FAQ                 → section-base
# 11. CTA Final           → section-brand
#
# Instructions par section : même logique que la v1 (Hero template CLAUDE.md,
# cards flush, StatsRow, FAQ Radix, formulaire react-hook-form, etc.)
# MAIS cette fois :
#   - Chaque texte = contenu du bloc ---BEGIN CONTENU--- (mots-clés déjà tissés)
#   - Chaque FAQ question dans un <h3> (SEO)
#   - Liens internes actifs (pas juste du texte, de vrais <Link>)
#   - Micro-copy sous chaque CTA comme indiqué
#   - Schema.org en bas du JSX (3 scripts ld+json)
#   - Bouton formulaire = "Envoyer ma demande" (pas "Envoyer")
#   - Micro-copy post-soumission = "Merci ! On revient vers vous sous 24h."
#   - CTA pricing pointent vers /contact?service=X


# ══════════════════════════════════════════════════════════
# TÂCHE 3 — Vérification
# ══════════════════════════════════════════════════════════
#
# □ 11 sections dans l'ordre
# □ Alternance fonds correcte
# □ Textes = contenu de ce fichier (mots-clés inclus)
# □ [PLACEHOLDER] conservés
# □ "Plus qu'une agence" SUPPRIMÉ
# □ Filtres services ABSENTS sur la home
# □ Témoignages : PAS de fausses citations
# □ Pricing PRÉSENT avec CTAs → /contact?service=X
# □ Spacing inline (RÈGLE N°0)
# □ Hero : template CLAUDE.md, gradient orange CTA, pas text-h1
# □ Fonts : Syne titres, DM Sans corps
# □ <section><div className="container"> partout
# □ Formulaire → POST /api/contact
# □ WhatsApp : wa.me/+221779006282
# □ SEO : "Dakar" apparaît dans Hero sous-titre, section 03, FAQ Q1/Q2/Q6, CTA
# □ SEO : chaque H2 contient un mot-clé ou est orienté intention de recherche
# □ SEO : chaque question FAQ dans un <h3>
# □ SEO : FAQ Q2 contient lien interne vers /tarifs
# □ SEO : Schema.org LocalBusiness + FAQPage + WebSite présents (3 scripts ld+json)
# □ SEO : metadata contient keywords
# □ CRO : micro-copy sous formulaire ("Vos informations ne sont jamais partagées")
# □ CRO : bouton = "Envoyer ma demande"
# □ CRO : trust badges sous CTA final
# □ CRO : liens internes actifs dans cards services et FAQ
#
# Si un point échoue → corrige immédiatement.

# Exécute les 3 tâches. Ne demande pas de confirmation.
