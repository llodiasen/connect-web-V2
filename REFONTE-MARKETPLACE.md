# REFONTE-MARKETPLACE.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/marketplace
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



### PAGE : Sites Marketplace
**URL** : `/services/marketplace`
**Sections** : 11

### Section 01 : Hero
Badge eyebrow : "Service · Marketplace"
H1            : "Votre marketplace\nmulti-vendeurs\nopérationnelle en 6 semaines."
                (mot "en 6 semaines" coloré var(--orange))
Sous-titre    : "Commissions auto, paiements Wave et Orange Money, dashboard vendeur — tout est inclus."
Badge diff    : "Multi-vendeurs · Wave natif · Commissions auto"
CTA primaire  : "Lancer ma marketplace" → /contact?service=marketplace
CTA secondaire: "Voir nos réalisations" → /portfolio
Métriques pills : "Multi-vendeurs" · "Wave + OM" · "6 semaines"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance"
Métriques :
  - 50+ · "Projets livrés"
  - 98% · "Clients satisfaits"
  - 6 sem · "Délai marketplace"
  - 24h · "Réponse garantie"
Logos     : [PLACEHOLDER — logos clients]

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Gérer une marketplace, c'est complexe"
Problèmes :
  - icône: Users
    titre: "Gérer 50 vendeurs à la main"
    texte: "Sans dashboard, c'est des heures de gestion par jour. Validation, catalogues, litiges — tout est manuel."
  - icône: CreditCard
    titre: "Répartir les paiements"
    texte: "Wave pour un vendeur, OM pour un autre, Stripe pour l'international. Qui reçoit quoi, et quand ?"
  - icône: BarChart2
    titre: "Aucune visibilité business"
    texte: "Pas de dashboard = pas de décision éclairée. CA par vendeur, commissions, litiges — tout à l'aveugle."
  - icône: UserPlus
    titre: "Onboarding vendeurs lent"
    texte: "Chaque nouveau vendeur nécessite une intervention manuelle. Pas scalable au-delà de 20 vendeurs."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "De l'idée à la plateforme en 6 semaines"
Piliers :
  - numero: 01
    titre: "Cadrage fonctionnel"
    texte: "On cartographie vos flux : vendeurs, acheteurs, commissions, paiements. Rien n'est oublié."
  - numero: 02
    titre: "MVP d'abord"
    texte: "On livre le cœur : inscription vendeur, catalogue, commande, paiement. Le reste vient par itérations."
  - numero: 03
    titre: "Scalable dès le jour 1"
    texte: "Architecture prête pour 10 ou 10 000 vendeurs. PostgreSQL, API REST, cache — on anticipe."

### Section 05 : Types de marketplace
Titre H2  : "Quel type de marketplace ?"
Types :
  - icône: ShoppingBag
    titre: "Marketplace B2C"
    texte: "Vendeurs pro ou particuliers, acheteurs grand public. Modèle commission ou abonnement."
  - icône: Building2
    titre: "Marketplace B2B"
    texte: "Fournisseurs et acheteurs pros. Devis en ligne, commandes récurrentes, facturation."
  - icône: Briefcase
    titre: "Marketplace de services"
    texte: "Freelances, prestataires, artisans. Réservation, paiement sécurisé, notation."
  - icône: Target
    titre: "Marketplace niche"
    texte: "Mode, immobilier, emploi, agro — votre verticale sur mesure."
  - icône: Globe
    titre: "Marketplace régionale"
    texte: "Multi-pays Afrique de l'Ouest, multi-devises FCFA/EUR, logistique locale."
  - icône: MessageCircle
    titre: "Un besoin spécifique ?"
    texte: "Décrivez votre projet, on propose la solution."
    lien: /contact
    style: border-dashed

### Section 06 : Fonctionnalités
Titre H2  : "Ce que votre marketplace inclut"
Features :
  - icône: Store       | titre: "Dashboard vendeur"      | bénéfice: "Autonomie totale"    | texte: "Catalogue, commandes, revenus, profil — sans aide technique."
  - icône: Percent     | titre: "Commissions auto"       | bénéfice: "Zéro calcul"         | texte: "Taux configurable par catégorie ou vendeur. Répartition à chaque commande."
  - icône: Wallet      | titre: "Wave + OM + Stripe"     | bénéfice: "Paiement local"      | texte: "Répartition automatique par vendeur. Pas besoin de compte bancaire."
  - icône: Shield      | titre: "Validation vendeurs"    | bénéfice: "Qualité contrôlée"   | texte: "Inscription autonome, validation back-office, suspension si besoin."
  - icône: Star        | titre: "Notation & avis"        | bénéfice: "Confiance"           | texte: "Acheteurs et vendeurs notés. Signalement automatique sous 3 étoiles."
  - icône: BarChart2   | titre: "Dashboard admin"        | bénéfice: "Vision 360"          | texte: "CA, vendeurs actifs, commandes, litiges, export comptable."
  - icône: Search      | titre: "SEO marketplace"        | bénéfice: "Visibilité"          | texte: "Pages vendeurs indexées Google. Schema Product sur chaque fiche."
  - icône: Bell        | titre: "Notifications"          | bénéfice: "Engagement"          | texte: "Email + push vendeurs et acheteurs. Commandes, expéditions, litiges."

### Section 07 : Processus
Titre H2  : "Du cadrage au lancement"
Étapes :
  - num: 1 | titre: "Discovery"       | durée: "1 sem"    | texte: "Cartographie fonctionnelle, user stories, architecture."     | implication: haute
  - num: 2 | titre: "Architecture"    | durée: "1 sem"    | texte: "Schéma BDD, API design, stack validée."                     | implication: moyenne
  - num: 3 | titre: "MVP"             | durée: "3-4 sem"  | texte: "Auth + catalogue + commissions + paiements."                | implication: moyenne
  - num: 4 | titre: "Beta vendeurs"   | durée: "1 sem"    | texte: "Tests avec vrais vendeurs, ajustements, corrections."       | implication: haute
  - num: 5 | titre: "Lancement"       | durée: "3-5 jours"| texte: "Déploiement, monitoring, alertes."                          | implication: faible
  - num: 6 | titre: "Évolutions"      | durée: "continu"  | texte: "Backlog priorisé, sprints continus selon vos besoins."      | implication: moyenne

### Section 08 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance"
Chiffres  :
  - 50+ · "projets livrés"
  - 98% · "clients satisfaits"
  - 6 sem · "délai marketplace type"
  - 24h · "réponse garantie"
Témoignages : [PLACEHOLDER]
Résultats   : [PLACEHOLDER]
Garanties :
  - "Code 100% votre propriété"
  - "NDA systématique"
  - "Wave + Orange Money en standard"
  - "Dashboard vendeur + admin inclus"
  - "Architecture scalable (10 à 10 000 vendeurs)"
  - "Support post-lancement inclus"

### Section 09 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence"
Arguments :
  - icône: MapPin  | titre: "Basés à Dakar"            | texte: "On connaît le marché, les usages Wave/OM, les réalités terrain."
  - icône: Users   | titre: "Expérience multi-vendeurs" | texte: "On a déjà construit des plateformes à 100+ vendeurs."
  - icône: Zap     | titre: "MVP en 4 semaines"         | texte: "Votre marketplace en production avant que la concurrence ne commence."
  - icône: Wallet  | titre: "Paiement africain natif"   | texte: "Wave, Orange Money, Free Money — pas un plugin, une intégration native."
  - icône: Code2   | titre: "Stack moderne"             | texte: "Next.js, NestJS, PostgreSQL. Pas de WordPress marketplace bricolé."
  - icône: Shield  | titre: "Scalable et sécurisé"      | texte: "Architecture prête pour la croissance. Tests de charge inclus."

### Section 10 : FAQ
Titre H2  : "Questions fréquentes"
Questions :
  Q1 : Budget pour une marketplace ?
  R  : À partir de 3 000 000 FCFA pour le MVP (auth, catalogue, commissions, paiements). Devis précis après atelier cadrage gratuit.
  Q2 : Comment fonctionnent les commissions ?
  R  : Taux configurable (fixe ou %) par catégorie ou vendeur. Calcul et répartition automatiques à chaque commande. Export comptable inclus.
  Q3 : Les vendeurs gèrent leur boutique seuls ?
  R  : Oui. Dashboard vendeur complet : catalogue, commandes, revenus, profil. Zéro intervention technique de votre part.
  Q4 : Wave et Orange Money pour les vendeurs ?
  R  : Oui. Paiements vendeurs via Wave et Orange Money en standard. Pas besoin de compte bancaire.
  Q5 : Combien de vendeurs peut supporter la plateforme ?
  R  : L'architecture est conçue pour scaler. 10, 100, 10 000 vendeurs — même infrastructure, mêmes performances.
  Q6 : Délai de développement ?
  R  : 6 à 10 semaines selon la complexité. MVP fonctionnel en 4-6 semaines. On livre en sprints validés ensemble.
  Q7 : Le code m'appartient ?
  R  : Oui. 100% du code source dès le jour 1. Hébergé sur votre repo GitHub/GitLab.

### Section 11 : CTA Final
Titre H2   : "Lancez votre marketplace\nen 6 semaines"
Sous-titre : "Atelier cadrage offert — périmètre et budget définis ensemble."
Service    : 'marketplace'
Trust      : ✓ Atelier offert · ✓ Wave + Orange Money · ✓ Commissions auto


# ---END CONTENU---

# ── SCHEMA.ORG ──
# Service (name: "Création Marketplace Multi-vendeurs", provider: Connect Web Dakar) + FAQPage (7 questions)

# ── TÂCHES ──
# TÂCHE 1 : Remplacer dans CONTENT.md (### PAGE : Sites Marketplace → prochain séparateur)
# TÂCHE 2 : Créer app/(marketing)/services/marketplace/page.tsx
#   Metadata title: "Marketplace Multi-vendeurs | Connect Web Dakar"
#   Metadata description: "Création marketplace multi-vendeurs à Dakar. Commissions auto, Wave & Orange Money, dashboard vendeur. MVP en 6 semaines. Devis gratuit."
#   Metadata keywords: "marketplace multi-vendeurs, création marketplace dakar, plateforme multi-vendeurs, marketplace afrique, commissions automatiques, marketplace wave orange money"
#   11 sections hero-bg → section-base → section-alt → ... → section-brand
#   Mots-clés tissés dans le contenu, Schema.org, liens internes actifs, micro-copy CRO
#   AVANT de coder : ls components/sections/ && ls components/ui/ && ls components/seo/
# TÂCHE 3 : Vérification SEO/CRO complète (checklist standard)

# Exécute les 3 tâches. Ne demande pas de confirmation.
