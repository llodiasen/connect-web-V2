# REFONTE-ARCHITECTURE-API.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/architecture-api
# CONTENU + SEO + CRO + SCHEMA.ORG — tout est dans ce fichier.
# ═══════════════════════════════════════════════════════════

# ── CLAUDE.md — mêmes lignes que les autres REFONTE ──

# ══════════════════════════════════════════════════════════
# STRATÉGIE SEO
# ══════════════════════════════════════════════════════════
#
# Mot-clé principal : "développement api rest" (390/mois)
# Secondaires :
#   "api graphql" (320/mois) → section types, FAQ
#   "architecture microservices" (480/mois) → section types, approche
#   "développement api dakar" (faible, opportunité) → meta, Pourquoi nous
#   "documentation api openapi" (170/mois) → features, FAQ
#   "audit architecture technique" (140/mois) → section types, CTA
#   "intégration api erp crm" (210/mois) → features, FAQ
#
# Structure Hn :
#   H1 : Des APIs robustes et une architecture qui tient la charge
#   H2 : Votre architecture ne suit plus
#   H2 : Concevoir pour durer — développement API sur mesure
#   H2 : Quel type de besoin en architecture et API ?
#   H2 : Ce que vous obtenez — API REST et GraphQL
#   H2 : De l'audit au déploiement
#   H2 : Pourquoi nous faire confiance
#   H2 : Ce qui fait la différence — développement API à Dakar
#   H2 : Questions fréquentes sur l'architecture et les API
#   H2 : Construisons l'architecture qui porte votre croissance

# ══════════════════════════════════════════════════════════
# CRO + MAILLAGE + CLUSTER
# ══════════════════════════════════════════════════════════
# Maillage : "microservices" → /services/logiciels-saas, FAQ prix → /tarifs, "ERP" → /services/integration-erp
# Cluster : "REST vs GraphQL pour décideurs", "Quand migrer vers les microservices", "Documentation API : pourquoi c'est critique"


# ---BEGIN CONTENU---

### PAGE : Architecture & API
**URL** : `/services/architecture-api`
**Sections** : 11

### Section 01 : Hero
Badge eyebrow : "Service · Architecture & API"
H1            : "Des APIs robustes\net une architecture\nqui tient la charge."
                (mot "tient la charge" coloré var(--orange))
Sous-titre    : "REST, GraphQL, microservices — on conçoit et développe vos API sur mesure à Dakar."
Badge diff    : "REST · GraphQL · Scalable · Documentation OpenAPI"
CTA primaire  : "Auditer mon architecture" → /contact?service=architecture-api
CTA secondaire: "Voir nos réalisations" → /portfolio
Métriques pills : "REST & GraphQL" · "Scalable" · "Doc OpenAPI"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance pour leur architecture technique"
Métriques : 50+ projets · 98% satisfaits · 2-6 sem délai · 24h réponse
Logos     : [PLACEHOLDER]

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Votre architecture ne suit plus"
Problèmes :
  - icône: FileX | titre: "API non documentée" | texte: "Personne ne sait comment l'utiliser. Chaque intégration API prend 2 semaines au lieu de 2 jours."
  - icône: Server | titre: "Monolithe ingérable" | texte: "Tout est couplé. Modifier une fonctionnalité casse 3 autres. Impossible de scaler votre architecture."
  - icône: Gauge | titre: "API lente" | texte: "Temps de réponse >500ms. Vos utilisateurs et intégrateurs se plaignent. Le développement API doit être optimisé."
  - icône: ShieldOff | titre: "Sécurité douteuse" | texte: "Pas d'auth robuste, pas de rate limiting, pas de CORS. Vos données sont exposées."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "Concevoir pour durer — développement API sur mesure"
Piliers :
  - 01 · "Audit d'abord" — On analyse votre architecture existante avant de proposer. Pas de refactoring inutile. On cible ce qui bloque.
  - 02 · "API-first" — Le schéma API REST ou GraphQL est conçu et documenté avant le code. Front, mobile, tiers — tout se branche facilement.
  - 03 · "Tests et monitoring" — Tests automatisés, CI/CD, monitoring en prod. Votre API ne tombe pas un vendredi soir.

### Section 05 : Types de services
Titre H2  : "Quel type de besoin en architecture et API ?"
Types :
  - icône: Network | titre: "API REST sur mesure" | texte: "CRUD, auth, rate limiting, versioning, documentation OpenAPI complète. Développement API REST professionnel."
  - icône: GitBranch | titre: "API GraphQL" | texte: "Schéma typé, resolvers, subscriptions temps réel. Idéal pour frontends complexes."
  - icône: Layers | titre: "Architecture microservices" | texte: "Services indépendants, orchestration, fault tolerance. Quand le monolithe ne suffit plus."
    lien interne: /services/logiciels-saas
  - icône: SearchCheck | titre: "Audit & refactoring" | texte: "On analyse votre architecture technique existante et on propose un plan d'optimisation."
  - icône: FileText | titre: "Documentation API" | texte: "OpenAPI/Swagger complète pour votre API existante. Exemples, schémas, playground interactif."
  - icône: MessageCircle | titre: "Un besoin spécifique ?" | texte: "Décrivez votre problème d'architecture." | lien: /contact | style: border-dashed

### Section 06 : Fonctionnalités
Titre H2  : "Ce que vous obtenez — API REST et GraphQL"
Features :
  - icône: Network | titre: "API REST/GraphQL" | bénéfice: "Standard" | texte: "Endpoints documentés, versionnés, testés. Développement API aux standards internationaux."
  - icône: Lock | titre: "Auth robuste" | bénéfice: "Sécurisé" | texte: "OAuth2, JWT, API Keys, rate limiting, CORS configurés."
  - icône: FileText | titre: "Doc OpenAPI" | bénéfice: "Intégrable" | texte: "Swagger UI, exemples, playground. Documentation API complète pour vos intégrateurs."
  - icône: TestTube | titre: "Tests automatisés" | bénéfice: "Fiable" | texte: "Jest + Supertest. Tests unitaires, intégration, charge."
  - icône: GitBranch | titre: "CI/CD" | bénéfice: "Déployé" | texte: "GitHub Actions. Chaque push testé et déployé automatiquement."
  - icône: Activity | titre: "Monitoring" | bénéfice: "Surveillé 24/7" | texte: "Alertes temps de réponse, erreurs, uptime."
  - icône: Database | titre: "Cache & performance" | bénéfice: "<100ms" | texte: "Redis, CDN Edge, optimisation requêtes. API rapide."
  - icône: Plug | titre: "Connecteurs ERP/CRM" | bénéfice: "Interopérable" | texte: "Intégration API vers SAP, Odoo, Salesforce, HubSpot, Wave."
    lien interne: /services/integration-erp

### Section 07 : Processus
Titre H2  : "De l'audit au déploiement"
Étapes :
  - num: 1 | titre: "Audit" | durée: "2-3 jours" | texte: "Analyse architecture et API existantes." | implication: haute
  - num: 2 | titre: "Conception" | durée: "3-5 jours" | texte: "Schéma API REST ou GraphQL, modèle données, stack." | implication: haute
  - num: 3 | titre: "Développement" | durée: "2-4 sem" | texte: "Endpoints, middleware, auth, développement API." | implication: moyenne
  - num: 4 | titre: "Tests" | durée: "3-5 jours" | texte: "Unitaires, intégration, charge. Rien ne passe sans tests." | implication: faible
  - num: 5 | titre: "Documentation" | durée: "2-3 jours" | texte: "OpenAPI/Swagger complète, exemples, playground." | implication: faible
  - num: 6 | titre: "Déploiement" | durée: "1-2 jours" | texte: "CI/CD, monitoring, alertes configurés." | implication: faible

### Section 08 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance"
Chiffres  : 50+ projets · 98% satisfaits · 2-6 sem · 24h réponse
Témoignages : [PLACEHOLDER]
Résultats   : [PLACEHOLDER]
Garanties : "Documentation OpenAPI complète" · "Tests automatisés inclus" · "CI/CD configuré" · "Monitoring production" · "Code 100% propriétaire" · "Audit architecture offert"

### Section 09 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence — développement API à Dakar"
Arguments :
  - icône: SearchCheck | titre: "Audit offert" | texte: "On analyse votre architecture avant de proposer. Pas de refactoring inutile."
  - icône: FileText | titre: "Documentation incluse" | texte: "OpenAPI/Swagger complète. Documentation API livrée avec chaque projet."
  - icône: TestTube | titre: "Tests systématiques" | texte: "Rien ne part en prod sans tests. Développement API fiable et professionnel."
  - icône: Code2 | titre: "Stack moderne" | texte: "NestJS, PostgreSQL, Prisma, Redis. Pas de techno datée."
  - icône: MapPin | titre: "Basés à Dakar" | texte: "Agence développement API au Sénégal. On connaît les contraintes réseau et intégrations locales."
  - icône: Shield | titre: "Support 24/7" | texte: "Monitoring, alertes, corrections. Votre API tourne en permanence."

### Section 10 : FAQ
Titre H2  : "Questions fréquentes sur l'architecture et les API"
Questions :
  Q1 (H3) : "Combien coûte le développement d'une API sur mesure ?"
  R  : À partir de 600 000 FCFA pour une API REST avec auth, CRUD et documentation OpenAPI complète.
  Lien interne : → /tarifs

  Q2 (H3) : "API REST ou GraphQL : comment choisir ?"
  R  : REST pour les API simples et intégrations tierces. GraphQL pour les frontends complexes avec besoins flexibles. On conseille selon votre contexte de développement API.

  Q3 (H3) : "Peut-on connecter l'API à nos outils existants ?"
  R  : Oui. Connecteurs ERP (SAP, Odoo), CRM (Salesforce, HubSpot), paiements (Wave, Stripe) ou toute intégration API tierce sur mesure.

  Q4 (H3) : "La documentation API est-elle incluse ?"
  R  : Oui. Documentation OpenAPI/Swagger complète livrée avec chaque projet. Playground interactif pour vos intégrateurs.

  Q5 (H3) : "Quel est le délai de développement d'une API ?"
  R  : 2 à 6 semaines selon la complexité. Audit architecture offert avant tout devis.

  Q6 (H3) : "Microservices ou monolithe ?"
  R  : On recommande un monolithe modulaire pour démarrer votre architecture. Migration microservices quand le besoin se fait sentir. Pas avant.

  Q7 (H3) : "Le code m'appartient ?"
  R  : Oui. 100% du code, de la documentation API et des tests dès le jour 1.

### Section 11 : CTA Final
Titre H2   : "Construisons l'architecture\nqui porte votre croissance"
Sous-titre : "Audit technique offert à Dakar — on analyse avant de proposer."
Service    : 'architecture-api'
Trust      : ✓ Audit offert · ✓ Documentation incluse · ✓ Tests automatisés
Micro-copy : "Vos informations ne sont jamais partagées."
Bouton     : "Envoyer ma demande"

# ---END CONTENU---

# ── SCHEMA.ORG ──
# Service (name: "Architecture & Développement API", provider: Connect Web Dakar) + FAQPage (7 questions)

# ── TÂCHES ──
# TÂCHE 1 : Remplacer dans CONTENT.md (### PAGE : Architecture & API → ---)
# TÂCHE 2 : Créer app/(marketing)/services/architecture-api/page.tsx
#   Metadata title: "Architecture & API REST/GraphQL | Connect Web Dakar"
#   Metadata description: "Développement API REST et GraphQL à Dakar. Architecture microservices, documentation OpenAPI, tests automatisés. Audit offert. +50 projets."
#   Metadata keywords: "développement api rest, api graphql, architecture microservices, développement api dakar, documentation api openapi, intégration api erp crm"
# TÂCHE 3 : Vérification SEO/CRO complète

# Exécute les 3 tâches. Ne demande pas de confirmation.
