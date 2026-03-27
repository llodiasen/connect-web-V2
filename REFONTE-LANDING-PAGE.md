# REFONTE-LANDING-PAGE.md v2
# ═══════════════════════════════════════════════════════════
# Instructions autonomes — Page /services/landing-page
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



### PAGE : Landing Pages & Tunnels de vente
**URL** : `/services/landing-page`
**Sections** : 11

### Section 01 : Hero
Badge eyebrow : "Service · Landing Pages"
H1            : "Des landing pages\nqui convertissent\nvos visiteurs en clients."
                (mot "convertissent" coloré var(--orange))
Sous-titre    : "Design orienté conversion, pixels Meta/Google configurés, CRM connecté."
Badge diff    : "Conversion optimisée · CRM connecté · 1 semaine"
CTA primaire  : "Créer ma landing page" → /contact?service=landing-page
CTA secondaire: "Voir nos réalisations" → /portfolio
Métriques pills : "Lighthouse 95+" · "CRM connecté" · "1 semaine"

### Section 02 : Social Proof
Titre     : "Ils nous font confiance"
Métriques : 50+ projets · 98% satisfaits · 1 sem délai · 24h réponse
Logos     : [PLACEHOLDER]

### Section 03 : Problèmes clients
Eyebrow   : "Vos défis"
Titre H2  : "Vous dépensez en pub sans convertir"
Problèmes :
  - icône: MousePointerClick
    titre: "Visiteurs qui repartent"
    texte: "Votre page d'accueil est trop générale. Les visiteurs arrivent et ne trouvent pas ce que la pub leur a promis."
  - icône: Unplug
    titre: "Formulaire déconnecté"
    texte: "Les leads tombent dans le vide. Pas de notification, pas de suivi CRM, pas de relance automatique."
  - icône: Eye
    titre: "Aucun tracking"
    texte: "Pas de pixel Meta, pas de tag Google. Impossible de savoir quelle pub génère des clients."
  - icône: Snail
    titre: "Page lente"
    texte: "Page qui met 4 secondes à charger = pénalité Google Ads + 50% d'abandon. Votre budget pub est gaspillé."

### Section 04 : Notre approche
Eyebrow   : "Notre méthode"
Titre H2  : "Chaque élément conçu pour convertir"
Piliers :
  - numero: 01
    titre: "1 page, 1 objectif"
    texte: "Chaque landing a un seul CTA. Pas de menu, pas de distraction. Le visiteur agit ou part."
  - numero: 02
    titre: "Données dès le jour 1"
    texte: "Pixels Meta/Google configurés. Formulaire connecté au CRM. Vous savez exactement ce qui convertit."
  - numero: 03
    titre: "Test et itération"
    texte: "Variantes A/B prêtes dès la livraison. On mesure, on ajuste, on optimise."

### Section 05 : Types de landing pages
Titre H2  : "Quel type de landing page ?"
Types :
  - icône: Target
    titre: "Page produit/service"
    texte: "1 offre, 1 CTA unique, zéro distraction. Taux de conversion 2 à 5× vs page classique."
  - icône: Mail
    titre: "Page de capture"
    texte: "Formulaire optimisé, connexion CRM/Mailchimp auto. Récupérez des leads qualifiés."
  - icône: TrendingUp
    titre: "Tunnel de vente"
    texte: "Landing + upsell + thank you + séquence email. Parcours d'achat complet automatisé."
  - icône: Calendar
    titre: "Page événement"
    texte: "Inscription, compte à rebours, rappels automatiques par email et WhatsApp."
  - icône: Megaphone
    titre: "Page campagne pub"
    texte: "Optimisée Meta Ads / Google Ads. Quality Score élevé, coût par clic réduit."
  - icône: MessageCircle
    titre: "Un besoin spécifique ?"
    texte: "Décrivez votre projet, on propose la solution."
    lien: /contact
    style: border-dashed

### Section 06 : Fonctionnalités
Titre H2  : "Ce que votre landing page inclut"
Features :
  - icône: Paintbrush  | titre: "Design conversion"     | bénéfice: "Taux ×3"         | texte: "Basé sur les heatmaps et best practices. Pas un template."
  - icône: Plug        | titre: "CRM connecté"          | bénéfice: "0 lead perdu"    | texte: "HubSpot, Zoho, Brevo, Mailchimp — formulaire connecté en direct."
  - icône: Crosshair   | titre: "Pixels configurés"     | bénéfice: "Attribution"     | texte: "Meta Pixel + Google Ads Tag. Vous savez quelle pub convertit."
  - icône: Split       | titre: "A/B testing"           | bénéfice: "Optimisation"    | texte: "Variantes activables dès la livraison. On teste, on mesure, on ajuste."
  - icône: Mail        | titre: "Thank you + email"     | bénéfice: "Nurturing"       | texte: "Page de confirmation + email automatique post-formulaire."
  - icône: Gauge       | titre: "Lighthouse 95+"        | bénéfice: "Performance"     | texte: "Chargement <1s même sur 3G. Pas de pénalité Google Ads."
  - icône: BarChart2   | titre: "Analytics conversion"  | bénéfice: "Data"            | texte: "GA4 configuré avec événements conversion. Dashboard prêt."
  - icône: Smartphone  | titre: "Mobile-first"          | bénéfice: "70% du trafic"   | texte: "Conçue mobile d'abord. Responsive parfait sur tous les écrans."

### Section 07 : Processus
Titre H2  : "De l'idée au live en 1 semaine"
Étapes :
  - num: 1 | titre: "Brief conversion" | durée: "1 jour"   | texte: "Objectif, cible, offre, CTA. On définit le parcours."      | implication: haute
  - num: 2 | titre: "Copywriting"      | durée: "1-2 jours" | texte: "Accroche, arguments, CTA. Le texte qui convertit."         | implication: haute
  - num: 3 | titre: "Design"           | durée: "1-2 jours" | texte: "Maquette Figma orientée conversion. Validation rapide."    | implication: moyenne
  - num: 4 | titre: "Développement"    | durée: "2-3 jours" | texte: "Intégration + pixels + CRM + A/B."                        | implication: faible
  - num: 5 | titre: "Tests"            | durée: "1 jour"   | texte: "Lighthouse, cross-browser, mobile, formulaire, tracking."   | implication: faible
  - num: 6 | titre: "Lancement"        | durée: "1 jour"   | texte: "Go-live + suivi conversions J+7. On ajuste si besoin."      | implication: moyenne

### Section 08 : Pourquoi nous faire confiance
Eyebrow   : "Preuves"
Titre H2  : "Pourquoi nous faire confiance"
Chiffres  : 50+ projets · 98% satisfaits · 1 sem délai · 24h réponse
Témoignages : [PLACEHOLDER]
Résultats   : [PLACEHOLDER]
Garanties :
  - "Lighthouse 95+ garanti"
  - "Pixels Meta/Google configurés"
  - "CRM connecté (HubSpot, Brevo, etc.)"
  - "A/B testing activable"
  - "Mobile-first"
  - "Suivi conversions J+7 inclus"

### Section 09 : Pourquoi Connect Web
Titre H2  : "Ce qui fait la différence"
Arguments :
  - icône: Target     | titre: "Obsédés par la conversion" | texte: "Chaque pixel est pensé pour faire agir. Pas juste un beau design."
  - icône: Plug       | titre: "CRM connecté en standard"  | texte: "HubSpot, Zoho, Brevo — formulaires connectés en direct, pas en export CSV."
  - icône: Crosshair  | titre: "Tracking précis"           | texte: "Pixels configurés pour chaque source de trafic. Attribution claire."
  - icône: Gauge      | titre: "Lighthouse 95+"            | texte: "Page rapide = Quality Score élevé = coût par clic réduit."
  - icône: Clock      | titre: "1 semaine, pas 1 mois"     | texte: "Process rodé. Brief → copy → design → dev → live en 7 jours."
  - icône: MapPin     | titre: "Marché africain"            | texte: "On connaît les usages mobile, WhatsApp, les réalités de connexion."

### Section 10 : FAQ
Titre H2  : "Questions fréquentes"
Questions :
  Q1 : Budget pour une landing page ?
  R  : À partir de 150 000 FCFA pour une landing simple. Tunnel complet (3 pages + emails) : à partir de 350 000 FCFA.
  Q2 : Délai de livraison ?
  R  : 5 à 7 jours pour une landing. 2-3 semaines pour un tunnel complet.
  Q3 : Peut-on connecter notre CRM ?
  R  : Oui. HubSpot, Zoho, Salesforce, Brevo, Mailchimp — tout outil avec une API.
  Q4 : Ça marche avec Meta Ads et Google Ads ?
  R  : Oui. Pixels et balises de conversion configurés pour un tracking précis par source.
  Q5 : Peut-on modifier le contenu seuls après ?
  R  : Oui. CMS léger intégré pour modifier textes, images et CTA sans toucher au code.
  Q6 : Et le copywriting ?
  R  : Inclus. On rédige l'accroche, les arguments et le CTA. Vous validez et on ajuste.
  Q7 : A/B testing, ça fonctionne comment ?
  R  : On crée 2 variantes. Le trafic est réparti 50/50. Après 1-2 semaines, on garde la version qui convertit mieux.

### Section 11 : CTA Final
Titre H2   : "Créez votre landing page\nhaute conversion"
Sous-titre : "Premier échange gratuit — livraison en 1 semaine."
Service    : 'landing-page'
Trust      : ✓ Lighthouse 95+ · ✓ CRM connecté · ✓ Pixels configurés


# ---END CONTENU---

# ── SCHEMA.ORG ──
# Service (name: "Création Landing Pages", provider: Connect Web Dakar) + FAQPage (7 questions)

# ── TÂCHES ──
# TÂCHE 1 : Remplacer dans CONTENT.md (### PAGE : Landing Pages & Tunnels de vente → prochain séparateur)
# TÂCHE 2 : Créer app/(marketing)/services/landing-page/page.tsx
#   Metadata title: "Landing Pages Haute Conversion | Connect Web Dakar"
#   Metadata description: "Création landing pages à Dakar. Design conversion, CRM connecté, pixels Meta/Google, A/B testing. Livraison 1 semaine. Devis gratuit."
#   Metadata keywords: "landing page dakar, création landing page, page de capture, tunnel de vente, landing page conversion, landing page sénégal"
#   11 sections hero-bg → section-base → section-alt → ... → section-brand
#   Mots-clés tissés dans le contenu, Schema.org, liens internes actifs, micro-copy CRO
#   AVANT de coder : ls components/sections/ && ls components/ui/ && ls components/seo/
# TÂCHE 3 : Vérification SEO/CRO complète (checklist standard)

# Exécute les 3 tâches. Ne demande pas de confirmation.
