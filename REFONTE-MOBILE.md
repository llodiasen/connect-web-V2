# REFONTE-MOBILE.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/developpement-mobile
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
# sed -n '1281,1300p' CLAUDE.md  → SEO + Schema.org
# sed -n '1624,1648p' CLAUDE.md  → Interdictions

# ── Composants — vérifier ──
# ls components/sections/ && ls components/ui/ && ls components/seo/


# ══════════════════════════════════════════════════════════
# STRATÉGIE SEO — PAGE DÉVELOPPEMENT MOBILE
# ══════════════════════════════════════════════════════════
#
# Mot-clé principal : "développement application mobile" (2 400/mois, élevée)
#
# Mots-clés secondaires + placement :
#   "agence développement mobile" (1 300/mois) → H2 section 10, meta description
#   "créer une application mobile" (3 600/mois) → H2 processus, FAQ, contenu
#   "application mobile sur mesure" (720/mois) → H2 section 04, sous-titres
#   "développeur React Native" (880/mois) → section technologies, FAQ
#   "développeur Flutter" (590/mois) → section technologies, FAQ
#   "coût application mobile" (4 400/mois) → FAQ développée
#   "combien coûte une app" (2 900/mois) → FAQ Q3
#   "application mobile entreprise" (480/mois) → types d'apps, section 05
#   "refonte application mobile" (320/mois) → section problèmes, CTA
#
# Structure Hn :
#   H1 : Applications mobiles pensées pour l'utilisateur africain
#   H2 : Vous rencontrez ces obstacles ?
#   H2 : Une application mobile sur mesure, pas un template
#   H2 : Quel type d'application mobile ?
#   H2 : React Native, Flutter ou natif — la bonne techno pour votre projet
#     H3 : React Native — Le meilleur des deux mondes
#     H3 : Flutter — Performance et design sur mesure
#     H3 : Swift / Kotlin — Puissance native
#   H2 : Ce que votre application mobile peut faire
#   H2 : De l'idée au lancement sur les stores
#   H2 : Pourquoi nous faire confiance pour votre app mobile
#   H2 : Ce qui fait la différence avec Connect Web
#   H2 : Questions fréquentes sur le développement mobile
#     H3 : Combien coûte une application mobile au Sénégal ?
#     H3 : React Native ou Flutter : comment choisir ?
#     H3 : (chaque FAQ en H3)
#   H2 : Créez votre application mobile dès maintenant


# ══════════════════════════════════════════════════════════
# STRATÉGIE CRO
# ══════════════════════════════════════════════════════════
#
# Preuves sociales :
#   - Trust pills Hero : "iOS & Android" · "Offline-first" · "Wave & OM intégrés"
#   - Section 02 : compteurs animés (50+ / 98% / 3+ ans / 24h)
#   - Section 09 : chiffres + garanties + [PLACEHOLDER témoignages]
#
# Micro-copy :
#   - Sous CTA Hero : (trust pills suffisent)
#   - Sous CTA technologies : "Besoin d'aide pour choisir ? On analyse votre projet gratuitement."
#   - Bouton formulaire : "Envoyer ma demande" (PAS "Envoyer")
#   - Sous formulaire : "Vos informations ne sont jamais partagées."
#   - Après soumission : "Merci ! On revient vers vous sous 24h."
#
# Points de conversion :
#   - Hero : 2 CTAs
#   - Après technologies : CTA inline "analyse gratuite"
#   - CTA final : formulaire + WhatsApp


# ══════════════════════════════════════════════════════════
# MAILLAGE INTERNE
# ══════════════════════════════════════════════════════════
#
# Technologies → futurs articles blog :
#   "React Native vs Flutter en 2026" → /blog/react-native-vs-flutter (quand créé)
# FAQ "Combien coûte" → /tarifs
# Types d'apps → pages services liées :
#   "E-commerce mobile" → /services/sites-ecommerce
#   "App métier" → /services/applications-web
# CTA formulaire → /contact?service=developpement-mobile
# Section confiance → /portfolio (cas clients quand dispo)


# ══════════════════════════════════════════════════════════
# CLUSTER DE CONTENU RECOMMANDÉ
# ══════════════════════════════════════════════════════════
#
# Articles à créer pour renforcer l'autorité :
#   - "Combien coûte une application mobile au Sénégal en 2026 ? Guide complet"
#   - "React Native vs Flutter : comparatif pour décideurs"
#   - "Les 10 erreurs qui font échouer un projet mobile en Afrique"
#   - "Comment rédiger un cahier des charges pour une app mobile"
#   - "App native vs cross-platform : impact sur la performance"
#   - "Wave et Orange Money : intégrer le paiement mobile dans votre app"


# ══════════════════════════════════════════════════════════
# CONTENU REFONTÉ (mots-clés tissés naturellement)
# ══════════════════════════════════════════════════════════

# ---BEGIN CONTENU---

### PAGE : Développement Mobile
**URL** : `/services/developpement-mobile`
**Sections** : 12

### Section 01 : Hero
Badge eyebrow : "Service · Développement Mobile"
H1            : "Applications mobiles\npensées pour\nl'utilisateur africain."
                (mot "l'utilisateur africain" coloré var(--orange))
Sous-titre    : "React Native · Flutter · Wave & Orange Money intégrés. Agence développement mobile à Dakar."
Badge diff    : "iOS & Android · Offline-first · Paiement mobile natif"
CTA primaire  : "Créer mon application" → /contact?service=developpement-mobile
CTA secondaire: "Voir nos apps" → /portfolio
Métriques pills : "iOS & Android" · "Offline-first" · "Wave & OM intégrés"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance pour créer leurs applications mobiles"
Métriques :
  - 50+ · "Projets livrés"
  - 98% · "Clients satisfaits"
  - 3+  · "Ans d'expérience"
  - 24h · "Délai de réponse"
Logos     : [PLACEHOLDER — logos clients]
Note      : "Startups, PME et grands groupes au Sénégal et en Afrique de l'Ouest."

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Vous rencontrez ces obstacles ?"
Problèmes :
  - icône: ZapOff
    titre: "App lente et instable"
    texte: "Vos utilisateurs désinstallent. 53% abandonnent une application mobile qui charge en plus de 3 secondes."
  - icône: HelpCircle
    titre: "Quel choix technique ?"
    texte: "iOS, Android, les deux ? React Native ou Flutter ? Le mauvais choix peut doubler votre budget de développement mobile."
  - icône: AlertTriangle
    titre: "Prestataire décevant"
    texte: "Livré en retard, hors budget, qualité médiocre. 68% des projets d'application mobile dépassent leur budget initial."
  - icône: WifiOff
    titre: "Inutilisable hors connexion"
    texte: "En Afrique de l'Ouest, la connectivité n'est pas garantie. Votre app doit fonctionner partout, même sans réseau."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "Une application mobile sur mesure, pas un template"
Piliers :
  - numero: 01
    titre: "Stratégie d'abord"
    texte: "Avant de coder, on analyse votre marché et vos utilisateurs. Chaque décision technique sert un objectif business."
  - numero: 02
    titre: "Sprints visibles"
    texte: "Démo toutes les 2 semaines. Vous voyez l'avancement de votre application mobile, vous validez, vous gardez le contrôle."
  - numero: 03
    titre: "Qualité non négociable"
    texte: "Tests sur appareils réels (Samsung, iPhone, Tecno, Infinix). Votre app marche sur tous les smartphones du marché sénégalais."

### Section 05 : Types d'applications
Titre H2  : "Quel type d'application mobile ?"
Types :
  - icône: Smartphone
    titre: "Cross-platform"
    texte: "Un seul code pour iOS et Android. React Native ou Flutter — idéal pour créer une application mobile à budget maîtrisé."
  - icône: ShoppingCart
    titre: "E-commerce mobile"
    texte: "Catalogue, paiement Wave/Orange Money, suivi commande, notifications push."
    lien interne: /services/sites-ecommerce
  - icône: Briefcase
    titre: "Application mobile entreprise"
    texte: "Gestion de flotte, CRM mobile, collecte terrain, mode hors ligne. Conçu pour le terrain africain."
  - icône: Rocket
    titre: "MVP rapide"
    texte: "Testez votre idée d'application mobile en 4-6 semaines. Itération rapide, budget maîtrisé."
  - icône: Heart
    titre: "Santé & bien-être"
    texte: "Suivi patient, téléconsultation, objets connectés."
  - icône: MessageCircle
    titre: "Un besoin spécifique ?"
    texte: "Décrivez votre projet de développement mobile, on propose la solution."
    lien: /contact
    style: border-dashed

### Section 06 : Technologies
Titre H2  : "React Native, Flutter ou natif — la bonne techno pour votre projet"
Intro     : "Le choix technique est une décision business. On recommande la stack qui maximise votre ROI en développement application mobile."
Technologies :
  - H3: "React Native — Le meilleur des deux mondes"
    texte: "Un seul code source pour iOS et Android. Idéal pour MVP, apps métier, budget maîtrisé. Réduction de 30-40% du coût vs natif. Utilisé par Meta, Shopify, Discord. Notre stack de prédilection comme développeur React Native à Dakar."
    cas: "MVP · Logique métier · Budget maîtrisé"
  - H3: "Flutter — Performance et design sur mesure"
    texte: "Le framework de Google pour des interfaces pixel-perfect. Idéal pour apps visuelles, animations complexes. Notre expertise de développeur Flutter au Sénégal."
    cas: "UI riche · Animations · Multi-plateforme"
  - H3: "Swift / Kotlin — Puissance native"
    texte: "Développement spécifique par plateforme. Accès hardware poussé (caméra, AR, capteurs), jeux, dernières features OS."
    cas: "Hardware · AR · Performance critique"
CTA inline : "Besoin d'aide pour choisir ? On analyse votre projet gratuitement."
Micro-copy : texte accent, lien → /contact?service=developpement-mobile

### Section 07 : Fonctionnalités
Titre H2  : "Ce que votre application mobile peut faire"
Features :
  - icône: Bell       | titre: "Push intelligents"    | bénéfice: "Rétention ×3"         | texte: "Le bon message, au bon moment, au bon utilisateur."
  - icône: WifiOff    | titre: "Mode hors ligne"      | bénéfice: "Zéro frustration"     | texte: "Fonctionne sans réseau, sync auto au retour. Essentiel en Afrique."
  - icône: CreditCard | titre: "Paiement mobile"      | bénéfice: "Wave & OM natifs"     | texte: "Wave, Orange Money, Free Money, Stripe intégrés nativement."
  - icône: MapPin     | titre: "Géolocalisation"      | bénéfice: "Contextuel"           | texte: "Store locator, tracking, suggestions basées sur la position."
  - icône: Fingerprint| titre: "Auth sécurisée"       | bénéfice: "Confiance"            | texte: "Biométrie, SSO, 2FA."
  - icône: BarChart2  | titre: "Analytics"             | bénéfice: "Data-driven"          | texte: "KPI temps réel, comportement, entonnoirs de conversion."
  - icône: Plug       | titre: "Intégration API"      | bénéfice: "Connecté"             | texte: "ERP, CRM, paiement, bases de données existantes."
  - icône: MessageSquare | titre: "Chat in-app"        | bénéfice: "Engagement"           | texte: "Communication utilisateurs/support, notifications temps réel."

### Section 08 : Processus
Titre H2  : "De l'idée au lancement sur les stores"
Étapes :
  - num: 1 | titre: "Analyse UX"      | durée: "1 sem"      | texte: "Parcours utilisateur, wireframes. On comprend vos utilisateurs avant de créer l'application mobile." | implication: haute
  - num: 2 | titre: "Design UI"       | durée: "1-2 sem"    | texte: "Maquettes Figma HD, design system mobile adapté au marché africain."                              | implication: haute
  - num: 3 | titre: "Développement"   | durée: "4-8 sem"    | texte: "Sprints 2 semaines, preview TestFlight/APK à chaque itération."                                   | implication: moyenne
  - num: 4 | titre: "Tests QA"        | durée: "1-2 sem"    | texte: "Appareils réels iOS & Android, 10+ devices (Samsung, iPhone, Tecno, Infinix)."                    | implication: faible
  - num: 5 | titre: "Publication"     | durée: "3-7 jours"  | texte: "Soumission App Store et Google Play. On gère tout le processus de validation."                    | implication: faible
  - num: 6 | titre: "Support"         | durée: "continu"    | texte: "Mises à jour, corrections, nouvelles features. Votre application mobile évolue."                  | implication: moyenne

### Section 09 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance pour votre app mobile"

Bloc chiffres :
  - 50+  · "projets livrés depuis 2021"
  - 98%  · "clients satisfaits"
  - 3+   · "ans d'expérience en développement mobile"
  - 24h  · "délai de réponse garanti"

Bloc témoignages : [PLACEHOLDER — NE PAS afficher de fausses citations]

Bloc résultats : [PLACEHOLDER — projets avec métriques quand disponibles]

Bloc garanties :
  - "Code 100% votre propriété dès le jour 1"
  - "NDA systématique"
  - "Accès repo Git en temps réel"
  - "Tests sur appareils réels africains (Tecno, Infinix, Samsung)"
  - "Wave & Orange Money intégrés en standard"
  - "Support post-lancement inclus 30 jours"

### Section 10 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence avec Connect Web"
Arguments :
  - icône: MapPin     | titre: "Agence mobile à Dakar"             | texte: "On connaît votre marché, vos utilisateurs, vos contraintes réseau. Pas une agence parisienne qui découvre l'Afrique."
  - icône: Users      | titre: "Développeurs seniors"              | texte: "Pas de juniors sur votre projet. Développeurs React Native et Flutter expérimentés."
  - icône: Eye        | titre: "Transparence totale"               | texte: "Accès au code, au backlog et aux démos à chaque sprint."
  - icône: Wallet     | titre: "Wave & OM en standard"             | texte: "Paiement mobile africain intégré nativement, pas en option."
  - icône: WifiOff    | titre: "Offline-first"                     | texte: "Applications mobiles conçues pour fonctionner avec une connexion limitée."
  - icône: Shield     | titre: "Support post-lancement"            | texte: "On reste après la livraison. Mises à jour, corrections, évolutions."

### Section 11 : FAQ
Titre H2  : "Questions fréquentes sur le développement mobile"
Questions :
  Q1 (H3) : "Combien coûte une application mobile au Sénégal ?"
  R  : À partir de 600 000 FCFA pour un MVP. Application mobile complète : 1,5M à 5M FCFA. Le coût dépend des fonctionnalités et de la complexité. Devis gratuit après premier échange.
  Lien interne : → /tarifs

  Q2 (H3) : "React Native ou Flutter : comment choisir ?"
  R  : React Native si votre équipe connaît JavaScript ou pour un MVP rapide. Flutter pour des interfaces visuellement riches et des animations complexes. En tant que développeur React Native et Flutter à Dakar, on vous conseille selon votre contexte.

  Q3 (H3) : "Mon application mobile fonctionnera-t-elle sans internet ?"
  R  : Oui. On développe en offline-first — adapté aux zones à connectivité limitée en Afrique de l'Ouest. Synchronisation automatique au retour du réseau.

  Q4 (H3) : "Peut-on intégrer Wave et Orange Money ?"
  R  : Oui, c'est notre spécialité. Wave, Orange Money, Free Money intégrés en standard sur chaque application mobile sur mesure que nous développons.

  Q5 (H3) : "Combien de temps pour publier sur les stores ?"
  R  : Apple App Store : 1-3 jours de validation. Google Play : 2-7 jours. On gère toute la soumission pour vous.

  Q6 (H3) : "Le code source m'appartient ?"
  R  : Oui. 100% du code de votre application mobile vous appartient dès le jour 1. Hébergé sur votre repo GitHub ou GitLab.

  Q7 (H3) : "Proposez-vous un support après livraison ?"
  R  : Oui. 30 jours de support inclus. Contrats de maintenance disponibles pour le long terme — mises à jour, corrections, nouvelles features.

### Section 12 : CTA Final
Titre H2   : "Créez votre application mobile\ndès maintenant"
Sous-titre : "Premier échange offert à Dakar — réponse sous 24h."
Service    : 'developpement-mobile'
Formulaire : Prénom + Nom + Email + Téléphone/WhatsApp + Service (défaut: developpement-mobile) + Budget (< 500k · 500k-2M · 2M-5M · 5M+ · Je ne sais pas) + Description (optionnel) + Bouton "Envoyer ma demande"
Micro-copy sous formulaire : "Vos informations ne sont jamais partagées."
Micro-copy après soumission : "Merci ! On revient vers vous sous 24h."
WhatsApp   : wa.me/+221779006282
Trust      : ✓ Réponse sous 24h · ✓ Premier échange offert · ✓ Sans engagement

# ---END CONTENU---


# ══════════════════════════════════════════════════════════
# SCHEMA.ORG — À intégrer dans le JSX
# ══════════════════════════════════════════════════════════
#
# 2 balises <script type="application/ld+json">
#
# 1. Service :
# {
#   "@context": "https://schema.org",
#   "@type": "Service",
#   "name": "Développement Application Mobile",
#   "description": "Développement d'applications mobiles iOS et Android sur mesure à Dakar. React Native, Flutter, Wave & Orange Money intégrés.",
#   "provider": {
#     "@type": "LocalBusiness",
#     "name": "Connect Web",
#     "url": "https://connect-web.tech",
#     "address": { "@type": "PostalAddress", "addressLocality": "Dakar", "addressCountry": "SN" }
#   },
#   "areaServed": ["Sénégal", "Afrique de l'Ouest"],
#   "url": "https://connect-web.tech/services/developpement-mobile"
# }
#
# 2. FAQPage :
# {
#   "@context": "https://schema.org",
#   "@type": "FAQPage",
#   "mainEntity": [ les 7 questions ci-dessus en format Question/Answer ]
# }


# ══════════════════════════════════════════════════════════
# TÂCHE 1 — CONTENT.md
# ══════════════════════════════════════════════════════════
# Remplace ### PAGE : Développement Mobile → prochain --- par le contenu ci-dessus.

# ══════════════════════════════════════════════════════════
# TÂCHE 2 — app/(marketing)/services/developpement-mobile/page.tsx
# ══════════════════════════════════════════════════════════
# AVANT : ls components/sections/ && ls components/ui/ && ls components/seo/
#
# Metadata :
# export const metadata: Metadata = {
#   title: "Développement Application Mobile iOS & Android | Connect Web Dakar",
#   description: "Agence développement application mobile à Dakar. React Native, Flutter, Swift, Kotlin. Wave & Orange Money intégrés. Offline-first. +50 projets. Devis gratuit.",
#   keywords: "développement application mobile, créer application mobile, agence développement mobile dakar, développeur react native dakar, développeur flutter sénégal, coût application mobile, application mobile sur mesure",
#   openGraph: {
#     title: "Développement Application Mobile | Connect Web Dakar",
#     description: "Applications mobiles iOS & Android pensées pour l'utilisateur africain. React Native, Flutter, paiement mobile natif.",
#     url: "https://connect-web.tech/services/developpement-mobile",
#   },
# }
#
# Sections et fonds :
# 01. Hero                     → hero-bg
# 02. Social Proof             → section-base
# 03. Problèmes                → section-alt
# 04. Notre approche           → section-base
# 05. Types d'apps             → section-alt
# 06. Technologies             → section-base
# 07. Fonctionnalités          → section-alt
# 08. Processus                → section-base
# 09. Confiance                → section-alt
# 10. Pourquoi nous            → section-base
# 11. FAQ                      → section-alt
# 12. CTA Final                → section-brand
#
# IMPORTANT :
#   - Textes = contenu du bloc ci-dessus (mots-clés déjà tissés)
#   - H3 sur chaque question FAQ ET sur chaque technologie (React Native, Flutter, Swift)
#   - Liens internes actifs (<Link>) dans types d'apps et FAQ
#   - Micro-copy sous CTA techno + sous formulaire
#   - Schema.org Service + FAQPage en bas du JSX
#   - Bouton formulaire = "Envoyer ma demande"

# ══════════════════════════════════════════════════════════
# TÂCHE 3 — Vérification
# ══════════════════════════════════════════════════════════
# □ 12 sections dans l'ordre
# □ Alternance fonds correcte
# □ Textes = ce fichier (mots-clés inclus)
# □ [PLACEHOLDER] conservés
# □ Spacing inline (RÈGLE N°0)
# □ Hero template CLAUDE.md, gradient orange CTA, pas text-h1
# □ Fonts Syne/DM Sans
# □ <section><div className="container"> partout
# □ Formulaire → POST /api/contact
# □ WhatsApp : wa.me/+221779006282
# □ SEO : "Dakar" dans sous-titre Hero, section 10, FAQ Q1/Q2
# □ SEO : "développement application mobile" dans H1 (implicite), meta, H2 section 04
# □ SEO : "créer une application mobile" dans section 05, FAQ
# □ SEO : "coût application mobile" / "combien coûte" dans FAQ Q1
# □ SEO : "développeur React Native" et "développeur Flutter" dans section 06
# □ SEO : "application mobile sur mesure" dans section 04, FAQ Q4
# □ SEO : "application mobile entreprise" dans section 05
# □ SEO : chaque FAQ dans <h3>, chaque techno dans <h3>
# □ SEO : FAQ Q1 lien interne → /tarifs
# □ SEO : Type e-commerce lien interne → /services/sites-ecommerce
# □ SEO : Schema.org Service + FAQPage (2 scripts ld+json)
# □ SEO : metadata contient keywords
# □ CRO : micro-copy sous CTA techno ("analyse gratuite")
# □ CRO : micro-copy sous formulaire
# □ CRO : bouton = "Envoyer ma demande"
# □ CRO : trust badges sous CTA final
#
# Si un point échoue → corrige immédiatement.

# Exécute les 3 tâches. Ne demande pas de confirmation.
