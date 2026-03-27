# AUDIT COMPLET — connect-web.tech
### Rapport de préparation à la refonte — Mars 2026

> **Auditeur :** Expert UX & Stratégie Digitale  
> **Date :** 12 Mars 2026  
> **Version :** 1.0 — Confidentiel

---

## RÉSUMÉ EXÉCUTIF

Connect-web.tech est le site vitrine d'une agence de développement web. L'analyse visuelle révèle une identité graphique sombre (dark theme) avec une palette orange/bleu marine, un positionnement de prestataire technique proposant développement de sites, refontes et e-commerce. Le site est construit sur WordPress avec un thème personnalisé ou page builder.

### Scores globaux

| Axe d'analyse | Score | Statut |
|---|---|---|
| 1. Technique (stack, performance, sécurité, responsive) | **5.5 / 10** | ⚠ Critique |
| 2. Contenu & Structure (IA, inventaire, valeur) | **6.0 / 10** | ~ Moyen |
| 3. UX & Design (friction, cohérence, accessibilité) | **5.0 / 10** | ⚠ Critique |
| 4. SEO (URLs, balises, hiérarchie) | **5.5 / 10** | ⚠ Critique |
| **SCORE GLOBAL** | **5.5 / 10** | **🔴 À REFONDRE** |

---

## AXE 1 — TECHNIQUE
### Score : 5.5 / 10

### 1.1 Stack technique détectée

| Composant | Détail |
|---|---|
| CMS | WordPress (très probable — structure, classes CSS type WP) |
| Page Builder | Elementor ou WPBakery (sections modulaires, ancres de navigation) |
| Thème | Custom dark theme ou thème premium modifié (Avada / Divi style) |
| Hébergement | Hébergeur mutualisé probable (OVH, LWS ou similaire — TLD .tech) |
| SSL | HTTPS actif ✅ |
| CDN | Non détecté |
| Formulaires | Contact Form 7 ou WPForms probable |

### 1.2 Performance

Problèmes identifiés depuis l'analyse visuelle :

- **Images hero non optimisées** : photo de fond en plein écran (likely > 500 Ko) sans lazy loading apparent
- **Background sombre** chargé via CSS ou image : à convertir en WebP si image
- **Nombreuses sections avec animations** potentielles (page builder = JS lourd)
- **Polices multiples** : au moins 2-3 familles typographiques, requêtes Google Fonts multiples
- **Absence de skeleton loading** ou indicateurs de chargement progressif

**Indicateurs estimés :**

| Métrique | Valeur estimée | Seuil Google |
|---|---|---|
| LCP | > 3.5s | < 2.5s |
| CLS | Modéré | < 0.1 |
| Score Lighthouse mobile | 45–60 / 100 | > 90 |
| Score Lighthouse desktop | 60–75 / 100 | > 90 |
| Poids page estimé | 3–6 Mo | < 1 Mo |

### 1.3 Responsive & Compatibilité Mobile

- Navigation : menu desktop visible — navigation mobile (hamburger) non testée
- Grille 3 colonnes pour les services : risque de breakpoint mal géré sur tablette
- Section pricing (3 cards) : potentiel scroll horizontal ou compression sur mobile
- Hero text centré : fonctionne bien en responsive ✅
- La barre d'annonce top (bandeau orange) peut poser problème sur petit écran
- **Score mobile estimé : 5/10** — à valider avec DevTools

### 1.4 Sécurité visible

- ✅ **HTTPS actif** (point positif)
- ⚠ **Headers de sécurité** : Non vérifiable visuellement — audit via SecurityHeaders.com recommandé
- ⚠ **WordPress** : Risque de version non maintenue, plugins obsolètes
- ⚠ **Formulaires** : Présence de reCAPTCHA non confirmée
- 🔴 **RGPD** : Bandeau cookie non visible sur capture — potentiel problème légal CNIL
- ⚠ **Exposition WordPress** : /wp-admin accessible publiquement probable

---

## AXE 2 — CONTENU & STRUCTURE
### Score : 6 / 10

### 2.1 Inventaire des pages détectées

| Page | Contenu observé | Action recommandée |
|---|---|---|
| Accueil (/) | Hero, services, méthode, pricing, CTA | Refonte complète — restructurer |
| À Propos | Présentation agence | Migrer + enrichir avec équipe/valeurs |
| Services | Développement, Refonte, E-commerce | Créer pages dédiées par service |
| Portfolio | Réalisations | Conserver + améliorer présentation |
| Blog | Articles | Auditer le contenu existant |
| Contact | Formulaire + coordonnées | Migrer — améliorer UX du formulaire |

### 2.2 Contenu à forte valeur — À CONSERVER ✅

- **Proposition de valeur principale** : « Créez des Expériences Digitales Qui Génèrent des Résultats Mesurables » — message fort, à peaufiner
- **Les 3 offres de services** (Développement, Refonte, E-commerce) : structure claire et pertinente
- **La méthode de travail en 4 étapes** (Découverte → CDC → Développement → Suivi) : démarche rassurante
- **Les 3 plans tarifaires** (Starter, intermédiaire, premium) : transparence des prix = avantage concurrentiel fort
- **Les coordonnées** dans le footer (téléphone, email)
- **Le CTA « Parler à un expert »** dans la navigation : bien positionné

### 2.3 Contenu obsolète ou à retravailler ⚠

- Texte hero trop court et peu différenciant — sous-titre générique
- Descriptions des services trop compactes (3-4 lignes) — manque de bénéfices concrets
- Section « Suivi & Amélioration » : texte visuellement coupé / trop pâle, illisible
- Plans tarifaires : mentions probablement tronquées dans l'affichage
- Footer : mentions légales, politique de confidentialité à vérifier
- Plan premium : cible floue (« Plateformes, SaaS, Applications »)

### 2.4 Hiérarchie de l'information actuelle (IA)

```
1. Bandeau top        → Appel à l'action urgent (devis gratuit)
2. Header             → Logo + Navigation + CTA 'Parler à un expert'
3. Hero               → Headline + sous-titre + 2 CTAs
4. Présentation agence→ Texte + Image (bloc flottant)
5. Nos Services Web   → 3 services en cards
6. Notre méthode      → 4 étapes
7. Plans tarifaires   → 3 offres avec features
8. CTA global         → 'Avez-vous un projet ou une idée ?'
9. Footer             → Logo + Liens + Contact + Newsletter
```

> ⚠ **Problème d'IA détecté** : Le parcours mêle trop de messages simultanément. Il manque une section « Pourquoi nous choisir » avec preuves sociales (témoignages, stats, logos clients) entre les services et la méthode.

---

## AXE 3 — UX & DESIGN
### Score : 5 / 10

### 3.1 Points de friction dans le parcours utilisateur

| Friction identifiée | Impact | Solution |
|---|---|---|
| Bandeau orange fixe en haut | Réduit l'espace hero, distrait | Rendre dismissable ou intégrer au hero |
| Hero sans preuve sociale | Manque de réassurance immédiate | Ajouter logos clients ou note de satisfaction |
| Section présentation agence flottante | Coupure visuelle abrupte | Intégrer dans une section dédiée À Propos |
| Textes des services trop petits | Lecture difficile sur fond sombre | Augmenter taille et contraste |
| Étape 4 (Suivi) illisible | Information perdue, mauvaise finition | Corriger immédiatement le contraste |
| 2 CTAs hero de même poids visuel | Dilution de l'attention | 1 CTA primaire + 1 secondaire hiérarchisés |
| Plans tarifaires sans mise en avant | Difficulté à choisir | Badge « Populaire » ou « Recommandé » |
| Newsletter footer sans valeur promise | Taux d'inscription faible | Ajouter le bénéfice : « Recevez nos conseils » |

### 3.2 Cohérence visuelle

**Palette identifiée :**
- Fond principal : Noir/bleu très sombre (`#0D1117` ou similaire)
- Accent : Orange (`#E8611A` ou similaire) — CTAs et mises en valeur
- Texte : Blanc et gris clair sur fond sombre

**Points positifs ✅**
- L'orange est utilisé de manière cohérente pour les CTAs
- Le dark theme crée une identité forte et différenciante dans le secteur
- Le logo « CONNECT » est lisible et bien intégré

**Points négatifs ⚠**
- Contraste insuffisant : plusieurs textes gris clair passent sous le ratio WCAG 4.5:1 requis
- Typographie : 3+ graisses sans système établi — manque de scale typographique
- Espacement : grandes zones noires vides entre sections qui alourdissent la page
- Icônes services génériques (Bootstrap Icons / FontAwesome) — manque de personnalité
- Section méthode : fond légèrement différent sans valeur ajoutée

### 3.3 Accessibilité

| Point | Niveau | Détail |
|---|---|---|
| Contraste texte/fond | 🔴 CRITIQUE | Ratio insuffisant sur sections sombres avec texte gris |
| Étape 4 illisible | 🔴 CRITIQUE | Texte très clair sur fond clair — invisible |
| Navigation clavier | ⚠ MOYEN | Probablement insuffisante (WordPress standard) |
| Alt text images | ⚠ MOYEN | Souvent omis dans les thèmes WordPress |
| Focus visible | ⚠ MOYEN | Absence probable de styles :focus sur les CTAs |
| Structure H1-H6 | ⚠ MOYEN | Page builder génère souvent une hiérarchie cassée |

### 3.4 Micro-interactions et feedback visuel

- **CTAs** : Effet hover probable (page builder standard) mais non différenciant
- **Animations scroll** : Probablement présentes — risque de surcharge
- **Formulaires** : Aucune validation inline visible, messages d'erreur probablement basiques
- **Navigation** : Aucun indicateur de page active visible clairement dans le menu
- **Plans tarifaires** : Absence d'animation ou highlight au survol

---

## AXE 4 — SEO
### Score : 5.5 / 10

### 4.1 Structure des URLs

| URL | Statut |
|---|---|
| `/` | ✅ Propre |
| `/a-propos` | ✅ Lisible |
| `/services` | ⚠ À décliner par service |
| `/portfolio` | ✅ OK |
| `/blog` | ✅ OK |
| `/contact` | ✅ OK |

- Les URLs semblent propres et lisibles ✅
- Le TLD `.tech` est pertinent mais moins connu que `.fr` ou `.com`
- Absence de dates dans les URLs du blog (bonne pratique) ✅
- Risque : URLs générées par Elementor peuvent contenir des ancres non SEO-friendly

### 4.2 Balises Meta et structure H1-H6

| Balise | Contenu observé | Recommandation |
|---|---|---|
| `<title>` | **"connect-web"** 🔴 | Ex : « Agence Web Dakar \| Création Sites & E-commerce \| Connect-Web » |
| Meta description | Non vérifiable | Rédiger 155 chars ciblés avec mot-clé principal |
| H1 | Vraisemblablement le hero headline | Vérifier unicité + mot-clé cible |
| H2 | Titres de sections | Intégrer des mots-clés secondaires |
| H3 | Titres des cards services | OK si bien structurés |
| Open Graph | Probablement absent | Ajouter og:title, og:description, og:image |
| Schema.org | Probablement absent | Ajouter LocalBusiness + WebPage schemas |
| Canonical | Non vérifiable | Vérifier l'absence de contenu dupliqué |

> 🚨 **CRITIQUE** : Le title tag `connect-web` est extrêmement pauvre en SEO. C'est l'un des signaux les plus importants pour le référencement et il ne contient ni mot-clé, ni géolocalisation, ni description de l'activité.

### 4.3 Observations SEO complémentaires

- **Contenu textuel faible** : descriptions de services très courtes (< 50 mots par service)
- **Images** : alt texts probablement absents ou génériques
- **Vitesse de chargement** : impact négatif sur les Core Web Vitals (signal Google depuis 2021)
- **Maillage interne** : structure one-page = peu de liens internes, nuisible au crawl
- **Blog** : potentiel SEO énorme si alimenté régulièrement — à développer en priorité
- **Mots-clés cibles probables** : « agence web [ville] », « création site web », « refonte site WordPress », « site e-commerce »

---

## LISTE PRIORISÉE DES PROBLÈMES

### 🔴 CRITIQUE

| # | Problème | Action recommandée |
|---|---|---|
| 1 | Title tag « connect-web » (SEO nul) | Réécrire avec mots-clés métier + localisation |
| 2 | Contraste texte insuffisant (accessibilité WCAG) | Revoir palette — passer textes secondaires en blanc pur |
| 3 | Performance : images non optimisées, LCP > 3.5s | Convertir en WebP, implémenter lazy loading |
| 4 | Absence totale de preuve sociale | Ajouter section avis clients / logos / stats |
| 5 | Étape 4 (Suivi & Amélioration) illisible | Corriger immédiatement le contraste de couleur |
| 6 | Bandeau RGPD / cookies absent probable | Implémenter solution conforme (Axeptio, Complianz...) |

### 🟡 MOYEN

| # | Problème | Action recommandée |
|---|---|---|
| 7 | Hero avec 2 CTAs de même poids visuel | 1 CTA primaire (orange plein) + 1 secondaire (outline) |
| 8 | Descriptions services trop courtes (SEO + conversion) | Rédiger 100-200 mots par service avec bénéfices |
| 9 | Meta descriptions absentes ou génériques | Rédiger une meta unique pour chaque page |
| 10 | Aucun schema.org implémenté | Ajouter LocalBusiness + Service schemas |
| 11 | Navigation mobile non optimisée (probable) | Tester et optimiser le menu hamburger |
| 12 | Plans tarifaires sans plan mis en avant | Ajouter badge « Recommandé » + différenciation visuelle |
| 13 | Section présentation agence mal positionnée | Déplacer après le hero en section dédiée |
| 14 | Absence de canal de contact instantané | Intégrer WhatsApp, Tidio ou Calendly |

### 🟢 FAIBLE

| # | Problème | Action recommandée |
|---|---|---|
| 15 | Icônes services génériques | Créer des icônes custom ou illustratives |
| 16 | Footer newsletter sans proposition de valeur | Ajouter texte incitatif et lead magnet |
| 17 | Animations scroll potentiellement excessives | Limiter à 2-3 animations subtiles par page |
| 18 | Absence de FAQ sur les pages services | Ajouter FAQ pour le SEO et la conversion |
| 19 | Blog non alimenté (probable) | Définir stratégie éditoriale : 2 articles/mois minimum |

---

## RECOMMANDATIONS POUR LA REFONTE

### 5.1 Stack technique recommandée

**Option A — WordPress optimisé (évolution douce)**
- Conserver WordPress mais migrer vers Gutenberg natif (abandonner Elementor)
- Thème : Kadence ou GeneratePress (performance élevée, < 200 Ko)
- Cache : WP Rocket ou LiteSpeed Cache
- Images : ShortPixel ou Imagify pour WebP automatique
- Sécurité : Wordfence + WP Hide & Security Enhancer
- ⏱ Délai : 3-4 semaines | 💰 Coût : Moyen

**Option B — Next.js + Headless CMS (refonte ambitieuse)**
- Front-end : Next.js 14 (App Router) pour performance maximale
- CMS : Sanity.io ou Contentful pour la gestion de contenu
- Hébergement : Vercel ou Cloudflare Pages (CDN global inclus)
- Formulaires : Resend + react-hook-form
- ✅ Scores Lighthouse 95+/100, SEO optimal, DX supérieure
- ⏱ Délai : 6-10 semaines | 💰 Coût : Plus élevé mais ROI long terme

### 5.2 Nouvelle architecture de l'information recommandée

```
1. Navigation fixe    → Logo + Menu + CTA « Devis gratuit » (sans bandeau intrusif)
2. Hero               → Headline fort + bénéfices + 1 CTA + social proof (50+ projets)
3. Chiffres clés      → 3-4 stats (projets livrés, années, taux de satisfaction)
4. Services           → Cards détaillées avec liens vers pages dédiées
5. Témoignages        → 3 avis vérifiés avec photo et nom
6. Méthode de travail → Section simplifiée et lisible
7. Réalisations       → 3-4 projets en vedette (Portfolio)
8. Plans tarifaires   → Avec plan recommandé mis en valeur
9. CTA final          → Fort + rassurant (« Consultation gratuite de 30 min »)
10. Footer            → Liens légaux complets + contact + réseaux
```

### 5.3 Recommandations Design

- Conserver le dark theme comme identité forte mais améliorer les contrastes
- Implémenter un design system (tokens : couleurs, typographie, espacements)
- Réduire la palette à 3 couleurs max : noir profond, orange vibrant, blanc
- Choisir une typographie premium : **Inter** ou **Plus Jakarta Sans**
- Réduire les grandes zones vides noires entre les sections
- Ajouter des éléments graphiques subtils (grilles, dégradés, formes géométriques)
- Soigner les états `:hover`, `:focus`, `:active` sur tous les éléments interactifs

### 5.4 Recommandations SEO

- Refaire intégralement tous les title tags et meta descriptions
- Créer des pages séparées pour chaque service (meilleur ciblage SEO)
- Implémenter les données structurées Schema.org (LocalBusiness, Service, FAQPage)
- Optimiser toutes les images (WebP, alt text descriptifs)
- Lancer une stratégie de contenu blog : 2 articles SEO/mois sur des requêtes longue traîne
- Créer une fiche Google Business Profile complète et liée au site
- Viser les mots-clés : « agence web [ville] », « création site WordPress », « refonte site e-commerce »

---

## PLAN DE MIGRATION DU CONTENU

| Contenu | Action | Priorité | Notes |
|---|---|---|---|
| Headline hero principal | MIGRER + OPTIMISER | 🔴 Haute | Réécrire pour le SEO |
| Descriptions des 3 services | RECRÉER | 🔴 Haute | Trop courtes — réécrire entièrement |
| Section méthode 4 étapes | MIGRER + ENRICHIR | 🔴 Haute | Bonne base, à compléter |
| Plans tarifaires + features | MIGRER + RÉVISER | 🔴 Haute | Vérifier les prix et les features |
| Coordonnées (tel, email, adresse) | MIGRER | 🔴 Haute | Vérifier l'exactitude |
| Articles de blog existants | AUDITER puis MIGRER | 🟡 Moyenne | Garder si > 100 vues/mois |
| Portfolio / réalisations | MIGRER + AMÉLIORER | 🔴 Haute | Ajouter des case studies détaillées |
| Page À Propos | RECRÉER | 🟡 Moyenne | Ajouter équipe, valeurs, histoire |
| Témoignages clients | CRÉER (absent) | 🔴 Critique | Collecter et afficher des avis |
| Chiffres clés agence | CRÉER (absent) | 🔴 Haute | Projets livrés, années, satisfaction |
| Title tags & meta descriptions | RECRÉER intégralement | 🔴 Critique | Tout est à réécrire |
| Images hero et sections | RECRÉER | 🔴 Haute | Photos libres de droits HD + WebP |
| Mentions légales / CGV | MIGRER + VÉRIFIER | 🟡 Moyenne | Conformité RGPD à vérifier |

---

## CONCLUSION & PROCHAINES ÉTAPES

Le site connect-web.tech dispose d'une identité visuelle reconnaissable et d'une structure de services cohérente. Cependant, plusieurs problèmes critiques freinent significativement ses performances en termes de SEO, de conversion et d'accessibilité.

### Les 3 chantiers prioritaires de la refonte

1. **SEO fondamental** : Title tags, meta descriptions, schema.org — impact immédiat sur le trafic organique
2. **Conversion** : Ajouter la preuve sociale, hiérarchiser les CTAs, améliorer les descriptions — impact direct sur le taux de contact
3. **Performance technique** : Optimisation images, réduction du code bloat — impact sur le classement Google et l'UX mobile

### Planning de refonte suggéré

| Semaine | Tâche |
|---|---|
| S1 – S2 | Audit technique approfondi (PageSpeed Insights, Ahrefs, Screaming Frog) |
| S2 – S3 | Wireframes nouvelle IA + maquettes Design System |
| S3 – S5 | Intégration & développement (nouveau thème ou migration stack) |
| S5 – S6 | Rédaction de tous les contenus optimisés SEO |
| S6 – S7 | Tests (responsive, performance, accessibilité, cross-browser) |
| S7 – S8 | Migration, redirections 301, mise en ligne & monitoring |

---

*Rapport rédigé le 12 Mars 2026 — Sur la base de l'analyse visuelle du site connect-web.tech*
