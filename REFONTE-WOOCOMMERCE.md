# REFONTE-WOOCOMMERCE.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/woocommerce
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



### PAGE : Boutique WooCommerce
**URL** : `/services/woocommerce`
**Sections** : 11

### Section 01 : Hero
Badge eyebrow : "Service · Boutique WooCommerce"
H1            : "Votre boutique en ligne\n100% propriétaire,\n0% de commission."
                (mot "0% de commission" coloré var(--orange))
Sous-titre    : "WordPress + WooCommerce sur mesure. Wave et Orange Money intégrés. Vos données vous appartiennent."
Badge diff    : "100% propriétaire · Wave natif · Catalogue illimité"
CTA primaire  : "Créer ma boutique" → /contact?service=woocommerce
CTA secondaire: "Voir nos boutiques" → /portfolio
Métriques pills : "100% propriétaire" · "Wave + OM" · "0 abonnement"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance"
Métriques : 50+ projets · 98% satisfaits · 2-4 sem délai · 24h réponse
Logos     : [PLACEHOLDER]

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Pourquoi quitter Shopify (ou ne pas y aller)"
Problèmes :
  - icône: DollarSign
    titre: "Abonnement mensuel qui s'accumule"
    texte: "29$/mois Shopify + 20$/app × 5 apps = 129$/mois. Sur 3 ans, vous avez payé plus que le site lui-même."
  - icône: Lock
    titre: "Vos données chez un tiers"
    texte: "Shopify héberge tout. Si vous partez, exporter vos données est un cauchemar. Vous êtes captif."
  - icône: CreditCard
    titre: "Pas de Wave ni Orange Money natif"
    texte: "Shopify ne supporte pas les paiements mobiles africains. WooCommerce, si — avec nos plugins custom."
  - icône: Ban
    titre: "Limité par la plateforme"
    texte: "Besoin d'une fonction spécifique ? Sur Shopify, vous dépendez des apps. Sur WooCommerce, on développe ce qu'il vous faut."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "Votre boutique, vos règles"
Piliers :
  - numero: 01
    titre: "WordPress, pas un template"
    texte: "Thème 100% custom développé à partir de votre charte. Aucun template générique retouché."
  - numero: 02
    titre: "Paiement africain natif"
    texte: "Plugins Wave CI et Orange Money développés sur mesure. Pas un module tiers approximatif."
  - numero: 03
    titre: "Vous êtes propriétaire de tout"
    texte: "Code, données, hébergement — tout est à vous. Vous pouvez changer de prestataire demain sans perdre une virgule."

### Section 05 : Types de boutiques
Titre H2  : "Quel type de boutique WooCommerce ?"
Types :
  - icône: ShoppingCart
    titre: "WooCommerce standard"
    texte: "Boutique WordPress clé en main, catalogue produits, paiements locaux et internationaux."
  - icône: CreditCard
    titre: "WooCommerce + Wave/OM"
    texte: "Passerelles paiements mobiles africaines intégrées nativement."
  - icône: Zap
    titre: "WooCommerce headless"
    texte: "Front Next.js + WooCommerce API — performances maximales, UX moderne."
  - icône: RefreshCw
    titre: "Migration vers WooCommerce"
    texte: "On migre votre Shopify, PrestaShop ou autre. Produits, clients, commandes — zéro perte."
  - icône: Layers
    titre: "WooCommerce multi-boutiques"
    texte: "Plusieurs boutiques, un seul back-office. Gestion centralisée."
  - icône: MessageCircle
    titre: "Un besoin spécifique ?"
    texte: "Décrivez votre projet, on propose la solution."
    lien: /contact
    style: border-dashed

### Section 06 : Fonctionnalités
Titre H2  : "Ce que votre boutique inclut"
Features :
  - icône: Palette     | titre: "Thème WordPress custom" | bénéfice: "Unique"           | texte: "Design sur mesure à partir de votre identité visuelle."
  - icône: Wallet      | titre: "Wave + Orange Money"    | bénéfice: "Paiement local"   | texte: "Plugins custom développés par nos soins. Pas un module tiers."
  - icône: Package     | titre: "Catalogue illimité"     | bénéfice: "Sans limites"     | texte: "Variantes, bundles, produits numériques, abonnements."
  - icône: Truck       | titre: "Gestion livraisons"     | bénéfice: "Suivi complet"    | texte: "Zones, tarifs, suivi commande automatisé."
  - icône: Search      | titre: "SEO WooCommerce"        | bénéfice: "Visibilité"       | texte: "Yoast SEO, schema Product, URLs optimisées."
  - icône: BarChart2   | titre: "Analytics"              | bénéfice: "Data-driven"      | texte: "GA4 + dashboard WooCommerce. Rapports de ventes automatiques."
  - icône: GraduationCap| titre: "Formation incluse"     | bénéfice: "Autonomie"        | texte: "1h de formation. Ajout produits, promos, gestion commandes."
  - icône: Headphones  | titre: "Support 30 jours"       | bénéfice: "Sérénité"         | texte: "Corrections et ajustements inclus après lancement."

### Section 07 : Processus
Titre H2  : "Du brief au lancement"
Étapes :
  - num: 1 | titre: "Brief"         | durée: "1-2 jours"  | texte: "Objectifs, catalogue, charte visuelle."                | implication: haute
  - num: 2 | titre: "Design"        | durée: "3-5 jours"  | texte: "Maquettes Figma : home, catégorie, fiche produit."     | implication: haute
  - num: 3 | titre: "Développement" | durée: "7-14 jours"  | texte: "Thème custom + plugins paiements + config."            | implication: faible
  - num: 4 | titre: "Migration"     | durée: "1-3 jours"  | texte: "Import catalogue, clients, commandes si existant."      | implication: faible
  - num: 5 | titre: "SEO & Tests"   | durée: "1-2 jours"  | texte: "Yoast, GA4, Search Console, tests cross-browser."       | implication: faible
  - num: 6 | titre: "Lancement"     | durée: "1 jour"     | texte: "Go-live, formation 1h, support 30 jours activé."        | implication: haute

### Section 08 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance"
Chiffres  : 50+ projets · 98% satisfaits · 2-4 sem délai · 24h réponse
Témoignages : [PLACEHOLDER]
Résultats   : [PLACEHOLDER]
Garanties :
  - "Code 100% votre propriété"
  - "Plugins Wave/OM développés sur mesure"
  - "Hébergement et données sous votre contrôle"
  - "Catalogue produits illimité"
  - "Formation back-office incluse"
  - "Support 30 jours"

### Section 09 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence"
Arguments :
  - icône: Key        | titre: "100% propriétaire"       | texte: "Code, données, hébergement — tout vous appartient. Pas de vendor lock-in."
  - icône: Wallet     | titre: "Wave/OM custom"           | texte: "Plugins paiement développés par nos soins. Pas un module tiers approximatif."
  - icône: DollarSign | titre: "0 abonnement mensuel"     | texte: "WooCommerce est open-source. Pas de 29$/mois qui s'accumulent."
  - icône: Code2      | titre: "Extensible à l'infini"    | texte: "Besoin d'une fonction ? On la développe. Pas de limite plateforme."
  - icône: MapPin     | titre: "Basés à Dakar"            | texte: "On connaît le marché, les usages, les contraintes réseau."
  - icône: Shield     | titre: "Support local réactif"    | texte: "WhatsApp, email, en personne. 30 jours inclus, maintenance longue durée dispo."

### Section 10 : FAQ
Titre H2  : "Questions fréquentes"
Questions :
  Q1 : WooCommerce ou Shopify ?
  R  : WooCommerce = propriétaire, flexible, 0 abonnement. Shopify = plus simple mais abonnement mensuel et données chez eux. On conseille selon votre volume.
  Q2 : Budget boutique WooCommerce ?
  R  : À partir de 450 000 FCFA avec thème custom et paiements locaux intégrés.
  Q3 : L'hébergement est-il inclus ?
  R  : Oui. 1ère année incluse sur VPS Linux ou Vercel selon l'architecture.
  Q4 : Peut-on migrer depuis Shopify ?
  R  : Oui. Produits, clients, commandes — migration complète sans perte.
  Q5 : Délai de livraison ?
  R  : 2 à 4 semaines selon la complexité et le nombre de produits.
  Q6 : C'est quoi WooCommerce headless ?
  R  : Front moderne en Next.js connecté à WooCommerce via API. Performances ×3, UX moderne, SEO optimal. On le recommande pour les projets ambitieux.
  Q7 : Le code m'appartient ?
  R  : Oui. 100% du code, des plugins et des données dès le jour 1.

### Section 11 : CTA Final
Titre H2   : "Votre boutique WooCommerce\nsur mesure"
Sous-titre : "Premier échange gratuit — devis sous 24h."
Service    : 'woocommerce'
Trust      : ✓ 100% propriétaire · ✓ Wave + Orange Money · ✓ 0% commission


# ---END CONTENU---

# ── SCHEMA.ORG ──
# Service (name: "Création Boutique WooCommerce", provider: Connect Web Dakar) + FAQPage (7 questions)

# ── TÂCHES ──
# TÂCHE 1 : Remplacer dans CONTENT.md (### PAGE : Boutique WooCommerce → prochain séparateur)
# TÂCHE 2 : Créer app/(marketing)/services/woocommerce/page.tsx
#   Metadata title: "Boutique WooCommerce sur mesure | Connect Web Dakar"
#   Metadata description: "Création boutique WooCommerce à Dakar. 100% propriétaire, Wave & Orange Money, catalogue illimité. 0 abonnement. Devis gratuit."
#   Metadata keywords: "woocommerce dakar, boutique woocommerce, woocommerce sénégal, woocommerce wave orange money, e-commerce wordpress, woocommerce vs shopify"
#   11 sections hero-bg → section-base → section-alt → ... → section-brand
#   Mots-clés tissés dans le contenu, Schema.org, liens internes actifs, micro-copy CRO
#   AVANT de coder : ls components/sections/ && ls components/ui/ && ls components/seo/
# TÂCHE 3 : Vérification SEO/CRO complète (checklist standard)

# Exécute les 3 tâches. Ne demande pas de confirmation.
