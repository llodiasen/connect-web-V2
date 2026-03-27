# REFONTE-ERP.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/integration-erp
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


# ══════════════════════════════════════════════════════════
# STRATÉGIE SEO
# ══════════════════════════════════════════════════════════
# Mot-clé principal : "intégration erp" (480/mois)
# Secondaires : "odoo sénégal" (260/mois), "connecteur erp api" (170/mois),
#   "synchronisation erp" (210/mois), "implémentation odoo dakar" (faible, opportunité),
#   "erp pme afrique" (faible, opportunité)
# Maillage : "API" → /services/architecture-api, "CRM" → /services/integration-crm, FAQ prix → /tarifs
# Cluster : "Odoo vs SAP pour PME sénégalaise", "Comment connecter votre ERP à votre site e-commerce"

# ---BEGIN CONTENU---

### PAGE : Intégration ERP
**URL** : `/services/integration-erp`
**Sections** : 11

### Section 01 : Hero
Badge eyebrow : "Service · Intégration ERP"
H1            : "Connectez votre ERP\nà toute votre\ninfrastructure digitale."
                (mot "infrastructure digitale" coloré var(--orange))
Sous-titre    : "Odoo, SAP, Dynamics 365 — synchronisation automatique, zéro ressaisie. Intégration ERP à Dakar."
Badge diff    : "Odoo · SAP · Sync temps réel · Zéro ressaisie"
CTA primaire  : "Analyser mon système" → /contact?service=integration-erp
CTA secondaire: "Voir nos intégrations" → /portfolio
Métriques pills : "Odoo & SAP" · "Sync temps réel" · "Zéro ressaisie"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance pour leur intégration ERP"
Métriques : 50+ projets · 98% satisfaits · 2-6 sem · 24h réponse
Logos     : [PLACEHOLDER]

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Vos systèmes ne communiquent pas"
Problèmes :
  - icône: Copy | titre: "Données dupliquées" | texte: "Mêmes informations saisies dans l'ERP, le site et le CRM. Erreurs et incohérences quotidiennes."
  - icône: PenLine | titre: "Ressaisies manuelles" | texte: "Vos équipes passent des heures à copier des données d'un outil à l'autre. L'intégration ERP élimine ça."
  - icône: PackageX | titre: "Stock désynchronisé" | texte: "Le stock de votre ERP ne correspond pas à votre boutique en ligne. Commandes impossibles à honorer."
  - icône: EyeOff | titre: "Aucune vue consolidée" | texte: "Pas de dashboard unifié. Impossible de piloter votre activité sans ouvrir 5 outils différents."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "Connecter, synchroniser, automatiser — intégration ERP sur mesure"
Piliers :
  - 01 · "Audit de l'existant" — On cartographie vos flux de données avant toute intégration ERP. Quels systèmes, quelles données, quels sens de synchronisation.
  - 02 · "Connecteurs API sur mesure" — Pas de plugin générique. Des connecteurs développés pour votre contexte, votre ERP (Odoo, SAP, Dynamics), vos outils.
  - 03 · "Zéro perturbation" — Tests en environnement isolé. Bascule planifiée hors heures de pointe. Votre activité n'est jamais interrompue.

### Section 05 : ERP et intégrations
Titre H2  : "Quels ERP et systèmes intégrons-nous ?"
Types :
  - icône: Box | titre: "Odoo" | texte: "Partenaire implémentation Odoo au Sénégal. Configuration, personnalisation, intégration complète."
  - icône: Building2 | titre: "SAP Business One" | texte: "Connecteurs SAP sur mesure. Synchronisation stock, commandes, facturation."
  - icône: BarChart2 | titre: "Microsoft Dynamics 365" | texte: "Intégration ERP Dynamics avec votre écosystème web et mobile."
  - icône: Database | titre: "Dolibarr / ERPNext" | texte: "Solutions ERP open-source pour PME sénégalaises. Budget maîtrisé, flexibilité maximale."
  - icône: Plug | titre: "ERP sur mesure" | texte: "Votre ERP interne ou legacy. On développe les connecteurs API nécessaires."
    lien interne: /services/architecture-api
  - icône: MessageCircle | titre: "Un besoin spécifique ?" | texte: "Décrivez votre écosystème ERP." | lien: /contact | style: border-dashed

### Section 06 : Fonctionnalités
Titre H2  : "Ce que votre intégration ERP inclut"
Features :
  - icône: RefreshCw | titre: "Sync bidirectionnelle" | bénéfice: "Temps réel" | texte: "ERP ↔ site ↔ CRM. Les données circulent automatiquement dans les deux sens."
  - icône: Package | titre: "Stock synchronisé" | bénéfice: "Zéro erreur" | texte: "Stock ERP = stock site web. Mises à jour en temps réel."
  - icône: FileText | titre: "Facturation auto" | bénéfice: "Gain de temps" | texte: "Commandes web → factures ERP générées automatiquement."
  - icône: BarChart2 | titre: "Dashboard unifié" | bénéfice: "Vue 360°" | texte: "Toute votre activité visible depuis un seul tableau de bord."
  - icône: Plug | titre: "Connecteurs API" | bénéfice: "Sur mesure" | texte: "Développés spécifiquement pour votre ERP et vos outils."
  - icône: Shield | titre: "Tests complets" | bénéfice: "Fiable" | texte: "Tests de bout en bout en environnement isolé avant la bascule."
  - icône: GraduationCap | titre: "Formation équipes" | bénéfice: "Autonomie" | texte: "Vos équipes formées aux nouveaux flux. Documentation incluse."
  - icône: Headphones | titre: "Support continu" | bénéfice: "Sérénité" | texte: "Monitoring des flux, alertes, corrections. Votre intégration ERP tourne 24/7."

### Section 07 : Processus
Titre H2  : "De l'audit à la synchronisation"
Étapes :
  - num: 1 | titre: "Audit infrastructure" | durée: "2-3 jours" | texte: "Cartographie ERP, outils, flux de données existants." | implication: haute
  - num: 2 | titre: "Architecture connecteurs" | durée: "2-3 jours" | texte: "Schéma d'intégration ERP, endpoints API, mapping données." | implication: haute
  - num: 3 | titre: "Développement" | durée: "2-4 sem" | texte: "Connecteurs API, synchronisation, transformations de données." | implication: moyenne
  - num: 4 | titre: "Tests" | durée: "3-5 jours" | texte: "Bout en bout en environnement isolé. Aucun impact sur votre production." | implication: faible
  - num: 5 | titre: "Bascule" | durée: "1-2 jours" | texte: "Migration planifiée hors heures de pointe. Accompagnement temps réel." | implication: haute
  - num: 6 | titre: "Monitoring" | durée: "continu" | texte: "Surveillance des flux, alertes, support. Votre intégration ERP est maintenue." | implication: moyenne

### Section 08 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance"
Chiffres  : 50+ projets · 98% satisfaits · 2-6 sem · 24h réponse
Témoignages : [PLACEHOLDER]
Résultats   : [PLACEHOLDER]
Garanties : "Audit infrastructure gratuit" · "Connecteurs API sur mesure" · "Tests bout en bout" · "Zéro perturbation" · "Formation équipes" · "Monitoring continu"

### Section 09 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence — intégration ERP à Dakar"
Arguments :
  - icône: Box | titre: "Experts Odoo Sénégal" | texte: "Partenaire implémentation Odoo. Configuration, personnalisation, intégration ERP complète à Dakar."
  - icône: Plug | titre: "Connecteurs sur mesure" | texte: "Pas de plugin générique. API développées pour votre contexte d'intégration ERP."
  - icône: Shield | titre: "Zéro perturbation" | texte: "Tests isolés, bascule planifiée. Votre activité n'est jamais interrompue."
  - icône: BarChart2 | titre: "Dashboard unifié" | texte: "Vue 360° de votre activité. ERP + site + CRM consolidés."
  - icône: MapPin | titre: "Basés à Dakar" | texte: "On connaît Odoo, SAP et les réalités des PME sénégalaises."
  - icône: Headphones | titre: "Support continu" | texte: "Monitoring flux, alertes, corrections. Intégration ERP maintenue 24/7."

### Section 10 : FAQ
Titre H2  : "Questions fréquentes sur l'intégration ERP"
Questions :
  Q1 (H3) : "On utilise déjà un ERP ancien. Peut-on l'intégrer ?"
  R  : Dans la grande majorité des cas, oui. Si votre ERP dispose d'une API, on le connecte. Pour les ERP legacy, on développe des connecteurs sur mesure ou une intégration par fichiers.

  Q2 (H3) : "Combien coûte une intégration ERP ?"
  R  : À partir de 500 000 FCFA pour une intégration simple. Projets complexes (multi-systèmes, Odoo complet) : sur devis. Audit gratuit.
  Lien interne : → /tarifs

  Q3 (H3) : "L'intégration va-t-elle perturber notre activité ?"
  R  : Non. On travaille en environnement de test, puis bascule planifiée hors heures de pointe avec accompagnement temps réel.

  Q4 (H3) : "Proposez-vous l'implémentation complète d'Odoo ?"
  R  : Oui. Au-delà de l'intégration ERP, on implémente et configure Odoo de A à Z : comptabilité, stock, ventes, RH. Partenaire Odoo au Sénégal.

  Q5 (H3) : "Peut-on connecter l'ERP à notre boutique en ligne ?"
  R  : Oui. Stock, commandes, facturation synchronisés en temps réel entre votre ERP et votre site e-commerce.
  Lien interne : → /services/sites-ecommerce

  Q6 (H3) : "Délai d'intégration ERP ?"
  R  : 2 à 6 semaines selon la complexité et le nombre de systèmes à connecter.

  Q7 (H3) : "Le support est-il inclus ?"
  R  : Oui. Monitoring des flux et support inclus. Contrats maintenance longue durée disponibles.

### Section 11 : CTA Final
Titre H2   : "Connectez votre ERP\nà tout votre écosystème"
Sous-titre : "Audit infrastructure offert à Dakar — on analyse avant de proposer."
Service    : 'integration-erp'
Trust      : ✓ Audit offert · ✓ Zéro perturbation · ✓ Odoo & SAP
Micro-copy : "Vos informations ne sont jamais partagées."
Bouton     : "Envoyer ma demande"

# ---END CONTENU---

# ── SCHEMA.ORG ──
# Service (name: "Intégration ERP", provider: Connect Web Dakar) + FAQPage (7 questions)

# ── TÂCHES ──
# TÂCHE 1 : Remplacer dans CONTENT.md (### PAGE : Intégration ERP → prochain séparateur)
# TÂCHE 2 : Créer app/(marketing)/services/integration-erp/page.tsx
#   Metadata title: "Intégration ERP Odoo SAP | Connect Web Dakar"
#   Metadata description: "Intégration ERP à Dakar. Odoo, SAP, Dynamics 365. Synchronisation automatique, zéro ressaisie. Audit gratuit. +50 projets livrés."
#   Metadata keywords: "intégration erp dakar, odoo sénégal, connecteur erp api, synchronisation erp site web, implémentation odoo, erp pme afrique"
#   11 sections hero-bg → section-base → section-alt → ... → section-brand
#   Mots-clés tissés dans le contenu, Schema.org, liens internes actifs, micro-copy CRO
#   AVANT de coder : ls components/sections/ && ls components/ui/ && ls components/seo/
# TÂCHE 3 : Vérification SEO/CRO complète (checklist standard)

# Exécute les 3 tâches. Ne demande pas de confirmation.
