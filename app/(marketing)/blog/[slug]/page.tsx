// Server Component — ISR 30min + generateStaticParams
// Source  : CONTENU-BLOG.md
// URL     : /blog/[slug]

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  BLOG_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  type BlogArticle,
} from '@/lib/blog-articles'

/* ─────────────────────────────────────────────────────────────────
   STATIC PARAMS — pré-render les 5 articles piliers
   ─────────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.slug }))
}

export const revalidate = 1800 // ISR 30min

/* ─────────────────────────────────────────────────────────────────
   METADATA — dynamique par article
   ─────────────────────────────────────────────────────────────── */
interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article introuvable | Connect Web' }
  return {
    title: `${article.title} | Blog Connect Web Dakar`,
    description: article.excerpt,
    alternates: { canonical: `https://connect-web.tech/blog/${slug}` },
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://connect-web.tech/blog/${slug}`,
      type: 'article',
      publishedTime: article.isoDate,
      authors: ['Amadou W. Diallo'],
    },
  }
}

/* ─────────────────────────────────────────────────────────────────
   CONTENU PAR ARTICLE — outlines depuis CONTENU-BLOG.md
   ─────────────────────────────────────────────────────────────── */
interface ArticleSection {
  h2:    string
  paras: string[]
}

const ARTICLE_CONTENT: Record<string, ArticleSection[]> = {
  'creer-boutique-en-ligne-dakar': [
    {
      h2: 'Pourquoi lancer un e-commerce au Sénégal en 2025',
      paras: [
        'Le commerce en ligne au Sénégal connaît une croissance de 35% par an. La pénétration mobile dépasse 80% et les paiements Wave et Orange Money ont levé le principal frein à l\'achat en ligne : l\'absence de carte bancaire.',
        'Pour un entrepreneur sénégalais, créer une boutique en ligne aujourd\'hui c\'est accéder à un marché national de 18 millions d\'habitants, mais aussi à la diaspora africaine qui souhaite commander depuis l\'étranger.',
      ],
    },
    {
      h2: 'Choisir sa plateforme : Shopify vs WooCommerce',
      paras: [
        'Shopify est une solution SaaS clé en main : aucune maintenance serveur, interface intuitive, support 24h/24. Idéal si vous voulez vous concentrer sur la vente, pas sur la technique. Comptez entre 30 et 80 USD/mois.',
        'WooCommerce s\'installe sur WordPress et offre plus de flexibilité. Les coûts d\'hébergement sont plus faibles, mais la maintenance est plus exigeante. Recommandé si vous avez déjà un site WordPress ou un budget limité.',
      ],
    },
    {
      h2: 'Intégrer les paiements locaux (Wave, Orange Money)',
      paras: [
        'C\'est le point clé. Une boutique sans Wave perd immédiatement 40% de ses clients potentiels. Wave propose une API officielle pour les marchands. L\'intégration prend 2 à 3 jours de développement.',
        'Orange Money est plus complexe à intégrer mais essentiel pour toucher les clients Orange. Connect Web a développé des intégrations natives pour WooCommerce et des solutions Shopify personnalisées.',
      ],
    },
    {
      h2: 'Optimiser pour le mobile (80% du trafic)',
      paras: [
        'Au Sénégal, 4 visiteurs sur 5 arrivent depuis un smartphone. Votre boutique doit charger en moins de 2 secondes sur une connexion 4G moyenne. Les images doivent être compressées, les boutons d\'achat bien dimensionnés pour le tactile.',
        'Lighthouse 90+ sur mobile n\'est pas un luxe : c\'est la condition pour apparaître dans les premiers résultats Google. Chaque seconde de chargement supplémentaire coûte 7% de conversions.',
      ],
    },
    {
      h2: 'Premiers pas pour attirer des clients',
      paras: [
        'Référencez votre boutique sur Google My Business dès le premier jour. Créez du contenu autour des mots-clés de votre secteur en français et en wolof si votre cible est locale. Les réseaux sociaux (Facebook, Instagram, TikTok) sont vos meilleurs leviers d\'acquisition au Sénégal.',
        'Prévoyez un budget publicité de 50 000 à 100 000 FCFA/mois pour les premiers mois. Le ROI d\'une campagne Facebook bien ciblée sur Dakar dépasse souvent 300% pour les produits de grande consommation.',
      ],
    },
  ],
  'wave-orange-money-ecommerce-guide': [
    {
      h2: 'Pourquoi les paiements mobiles sont essentiels au Sénégal',
      paras: [
        'Wave compte plus de 7 millions d\'utilisateurs actifs au Sénégal. Orange Money en compte 5 millions supplémentaires. Ensemble, ces deux solutions couvrent plus de 60% de la population adulte sénégalaise.',
        'Sans intégration de paiement mobile, vous excluez la majorité de vos clients potentiels. Les cartes bancaires Visa/Mastercard sont utilisées par moins de 15% de la population.',
      ],
    },
    {
      h2: 'Wave : fonctionnement et intégration technique',
      paras: [
        'Wave propose une API REST complète pour les marchands. L\'authentification se fait via une clé API générée depuis votre espace marchand Wave Business. L\'intégration nécessite un compte business vérifié.',
        'Le flux de paiement : votre boutique génère une requête de paiement → Wave envoie une notification push au client → le client confirme → votre serveur reçoit une notification webhook de confirmation. Le processus prend moins de 30 secondes.',
      ],
    },
    {
      h2: 'Orange Money : étapes d\'intégration',
      paras: [
        'Orange Money passe par l\'API Orange Developer. L\'inscription comme marchand nécessite des documents officiels (NINEA, RCCM). Le délai d\'activation est de 5 à 10 jours ouvrables.',
        'L\'API Orange Money utilise OAuth 2.0. Le flow est similaire à Wave mais avec un environnement de test (sandbox) plus complet, ce qui facilite le développement.',
      ],
    },
    {
      h2: 'Comparatif Wave vs Orange Money pour e-commerce',
      paras: [
        'Wave : frais de 1% par transaction (plafond 2 000 FCFA), API moderne et bien documentée, support réactif. Temps d\'intégration : 2-3 jours.',
        'Orange Money : frais variables selon le volume (0.5% à 1.5%), base d\'utilisateurs plus âgée, démarches administratives plus lourdes. Temps d\'intégration : 5-7 jours.',
      ],
    },
    {
      h2: 'Bonnes pratiques et erreurs à éviter',
      paras: [
        'Toujours implémenter les webhooks pour les confirmations de paiement. Ne jamais valider une commande avant réception de la confirmation serveur — les confirmations côté client peuvent être falsifiées.',
        'Gérez les timeouts : si le client ne confirme pas en 10 minutes, annulez automatiquement la réservation de stock. Implémentez un système de retry pour les notifications webhook manquées.',
      ],
    },
  ],
  'site-web-mobile-first-senegal': [
    {
      h2: '80% du trafic sénégalais vient du mobile : les chiffres',
      paras: [
        'Selon les données Statcounter 2024, 81% des sessions web au Sénégal proviennent d\'appareils mobiles. C\'est 15 points de plus que la moyenne mondiale. La raison : le smartphone est souvent le premier et seul accès à internet pour de nombreux Sénégalais.',
        'Cette réalité a des conséquences directes sur votre business. Un site non optimisé mobile perd immédiatement 4 visiteurs sur 5 avant même d\'afficher votre contenu.',
      ],
    },
    {
      h2: 'Ce que mobile-first signifie vraiment',
      paras: [
        'Mobile-first ne signifie pas "avoir un site qui s\'affiche sur mobile". Cela signifie concevoir d\'abord pour les contraintes mobiles : connexion lente, petit écran, interaction tactile, et seulement ensuite enrichir pour le desktop.',
        'Concrètement : images compressées et au format WebP, pas de menu caché sous de petits boutons, textes lisibles sans zoom, formulaires avec clavier adapté (numérique pour les téléphones, email pour les mails).',
      ],
    },
    {
      h2: 'Comment savoir si votre site est optimisé mobile',
      paras: [
        'Testez avec PageSpeed Insights de Google (gratuit). Un score inférieur à 70 sur mobile est un signal d\'alarme. Vérifiez également avec l\'outil Mobile-Friendly Test de Google Search Console.',
        'Les indicateurs clés : LCP (temps d\'affichage du contenu principal) < 2.5s, CLS (stabilité visuelle) < 0.1, FID (réactivité) < 100ms. Ces métriques impactent directement votre référencement depuis 2021.',
      ],
    },
    {
      h2: 'Impact sur votre référencement Google',
      paras: [
        'Depuis 2019, Google utilise l\'indexation "mobile-first" : c\'est la version mobile de votre site qui est analysée et référencée, pas la version desktop. Un site mal optimisé mobile sera mal référencé, même si la version desktop est parfaite.',
        'Les Core Web Vitals (LCP, INP, CLS) sont officiellement des facteurs de classement depuis 2021. Améliorer ces métriques peut faire gagner plusieurs positions sur des requêtes compétitives.',
      ],
    },
    {
      h2: 'Solutions pour optimiser votre site existant',
      paras: [
        'Si votre site est récent (moins de 3 ans), une optimisation est souvent possible sans refonte complète : compression d\'images, lazy loading, minification CSS/JS, passage au format WebP. Budget : 150 000 à 300 000 FCFA.',
        'Si votre site a plus de 5 ans ou est basé sur une technologie obsolète, une refonte est plus rentable à long terme. Un site Next.js moderne atteint Lighthouse 95+ par défaut, contre 40-60 pour un site WordPress non optimisé.',
      ],
    },
  ],
  'marketplace-multi-vendeurs-afrique': [
    {
      h2: 'Le potentiel des marketplaces en Afrique de l\'Ouest',
      paras: [
        'L\'Afrique de l\'Ouest compte 400 millions d\'habitants dont 60% ont moins de 25 ans. Cette population jeune, mobile et connectée représente un marché de consommation en forte croissance, sous-servi par le commerce en ligne traditionnel.',
        'Les succès de Jumia, Afrimarket et des plateformes régionales prouvent la viabilité du modèle. Mais ces plateformes generalistes laissent de la place pour des marketplaces verticales (mode, artisanat, services professionnels, formation).',
      ],
    },
    {
      h2: 'Modèles économiques : commission, abonnement, hybride',
      paras: [
        'Le modèle commission (5-15% par vente) est le plus courant et le plus sécurisé : vous ne gagnez que si vos vendeurs gagnent. Idéal pour démarrer avec peu de vendeurs.',
        'L\'abonnement mensuel (15 000 à 50 000 FCFA/mois) génère des revenus prévisibles mais exige une vraie valeur ajoutée pour justifier le paiement avant les premières ventes. Le modèle hybride (abonnement faible + commission réduite) est souvent le meilleur compromis.',
      ],
    },
    {
      h2: 'Fonctionnalités essentielles d\'une marketplace',
      paras: [
        'Les indispensables : inscription vendeur avec vérification d\'identité, tableau de bord vendeur (commandes, paiements, analytics), système de notation acheteur/vendeur, messagerie interne, paiements sécurisés avec Wave et Orange Money.',
        'Les différenciateurs : programme de fidélité acheteur, badges de confiance vendeur (vendeur vérifié, vendeur premium), système de litiges avec médiation, logistique intégrée avec partenaires comme Géniki ou DHL.',
      ],
    },
    {
      h2: 'Choisir la bonne technologie',
      paras: [
        'Pour une marketplace e-commerce : WooCommerce + Dokan est la solution la plus économique (à partir de 800 000 FCFA). Scalabilité limitée mais suffisante pour 100-500 vendeurs actifs.',
        'Pour une marketplace à fort volume ou avec des besoins spécifiques (services, enchères, location) : une application web sur mesure avec Next.js + API est recommandée. Budget : à partir de 2M FCFA, mais sans plafond de scalabilité.',
      ],
    },
    {
      h2: 'Attirer vos premiers vendeurs et acheteurs',
      paras: [
        'Le paradoxe de la poule et de l\'œuf : les acheteurs viennent si il y a des vendeurs, les vendeurs viennent si il y a des acheteurs. La solution : commencez par recruter manuellement 20-30 vendeurs de qualité avant l\'ouverture, et offrez-leur 3 mois gratuits.',
        'Pour les acheteurs : partenariats avec des influenceurs sénégalais, campagnes Facebook hyper-ciblées, programme de parrainage (1 000 FCFA offerts pour chaque ami inscrit). Le bouche-à-oreille reste le canal le plus efficace au Sénégal.',
      ],
    },
  ],
  'shopify-vs-woocommerce-senegal': [
    {
      h2: 'Présentation des deux plateformes',
      paras: [
        'Shopify est une plateforme SaaS fondée en 2006, utilisée par plus de 2 millions de marchands dans le monde. Tout est géré par Shopify : hébergement, sécurité, mises à jour. Vous payez un abonnement mensuel et vous vous concentrez sur la vente.',
        'WooCommerce est une extension open-source pour WordPress. Gratuit à la base, il nécessite un hébergement, un domaine et des extensions payantes pour les fonctionnalités avancées. Plus de flexibilité, mais plus de responsabilités.',
      ],
    },
    {
      h2: 'Comparatif : coûts, fonctionnalités, facilité d\'utilisation',
      paras: [
        'Shopify Basic : 39 USD/mois (environ 24 000 FCFA). Inclut hébergement, SSL, support 24h/24, 2 comptes staff. Frais de transaction : 2% (ou 0% avec Shopify Payments, non disponible au Sénégal). Coût total estimé première année : 500 000 à 800 000 FCFA avec un thème premium.',
        'WooCommerce : hébergement 5 000-15 000 FCFA/mois, extensions 50 000-200 000 FCFA une fois. Coût total estimé première année : 300 000 à 600 000 FCFA. Moins cher mais plus de temps de maintenance.',
      ],
    },
    {
      h2: 'Intégration Wave et Orange Money : avantage WooCommerce ?',
      paras: [
        'WooCommerce dispose de plugins Wave et Orange Money développés par la communauté africaine. L\'intégration est documentée et testée. Connect Web peut déployer une boutique WooCommerce avec paiements mobiles en 2 semaines.',
        'Shopify nécessite un développement personnalisé pour Wave et Orange Money car Shopify Payments n\'est pas disponible au Sénégal. C\'est faisable mais plus coûteux. Comptez 150 000 à 250 000 FCFA supplémentaires pour l\'intégration.',
      ],
    },
    {
      h2: 'Pour qui Shopify ? Pour qui WooCommerce ?',
      paras: [
        'Choisissez Shopify si : vous n\'avez pas de compétences techniques, vous voulez vous concentrer uniquement sur la vente, vous prévoyez de vendre à l\'international (Shopify est mieux optimisé pour les devises multiples), votre budget mensuel le permet.',
        'Choisissez WooCommerce si : vous avez déjà un site WordPress, vous avez besoin de fonctionnalités très spécifiques (réservation, abonnements, téléchargements numériques), votre budget initial est limité, ou vous voulez la propriété totale de vos données.',
      ],
    },
    {
      h2: 'Notre recommandation selon votre profil',
      paras: [
        'PME sénégalaise, premier e-commerce, budget 500K-1M FCFA : WooCommerce. Vous obtenez plus de flexibilité pour le même budget et les intégrations Wave/Orange Money sont plus simples.',
        'Boutique mode ou artisanat avec ambitions export, budget > 1M FCFA : Shopify. L\'interface est plus moderne, l\'écosystème d\'applications plus riche, et la crédibilité internationale est meilleure pour conquérir la diaspora.',
      ],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug, article.category)
  const sections = ARTICLE_CONTENT[slug] ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: {
      '@type': 'Person',
      name: 'Amadou W. Diallo',
      url: 'https://connect-web.tech/a-propos/equipe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Connect Web',
      logo: { '@type': 'ImageObject', url: 'https://connect-web.tech/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://connect-web.tech/blog/${slug}`,
    },
    articleSection: article.category,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>

        {/* ── HEADER ARTICLE ───────────────────────────────────── */}
        <section
          className="section-brand"
          style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}
        >
          <div
            className="container"
            style={{ maxWidth: '760px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
          >
            {/* Fil d'ariane */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Link
                href="/blog"
                style={{
                  fontFamily:     'var(--font-body)',
                  fontSize:       '13px',
                  color:          '#718096',
                  textDecoration: 'none',
                }}
              >
                Blog
              </Link>
              <span style={{ color: '#718096', fontSize: '13px' }}>›</span>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color:         'var(--color-orange-500)',
              }}>
                {article.category}
              </span>
            </div>

            <h1
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.03em',
                color:         '#F9FAFB',
                marginBottom:  '20px',
              }}
            >
              {article.title}
            </h1>

            <p
              className="font-body"
              style={{
                fontSize:     '17px',
                color:        '#CBD5E0',
                lineHeight:   1.65,
                marginBottom: '28px',
              }}
            >
              {article.excerpt}
            </p>

            {/* Meta auteur + date */}
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '16px',
              flexWrap:   'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width:          '36px',
                  height:         '36px',
                  borderRadius:   '50%',
                  background:     'var(--color-orange-500)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '13px',
                  fontWeight:     700,
                  color:          '#FFFFFF',
                }}>
                  AW
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#F9FAFB', margin: 0 }}>
                    Amadou W. Diallo
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#718096', margin: 0 }}>
                    Fondateur Connect Web
                  </p>
                </div>
              </div>
              <span style={{ color: '#4A5568', fontSize: '13px' }}>·</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#718096' }}>
                {article.date}
              </span>
              <span style={{ color: '#4A5568', fontSize: '13px' }}>·</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#718096' }}>
                {article.readTime} de lecture
              </span>
            </div>
          </div>
        </section>

        {/* ── CORPS ARTICLE ────────────────────────────────────── */}
        <section className="section-base">
          <div
            className="container"
            style={{ maxWidth: '720px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
          >
            {/* Introduction */}
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '18px',
              color:        '#2D3748',
              lineHeight:   1.8,
              marginBottom: '40px',
              borderLeft:   '3px solid var(--color-orange-500)',
              paddingLeft:  '20px',
            }}>
              {article.excerpt}
            </p>

            {/* Sections H2 */}
            {sections.map((section, i) => (
              <div key={i} style={{ marginBottom: '40px' }}>
                <h2
                  className="font-heading font-bold"
                  style={{
                    fontSize:      'clamp(1.25rem, 2.5vw, 1.625rem)',
                    lineHeight:    1.2,
                    letterSpacing: '-0.02em',
                    color:         '#1B2A4A',
                    marginBottom:  '20px',
                  }}
                >
                  {section.h2}
                </h2>
                {section.paras.map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '17px',
                      color:        '#4A5568',
                      lineHeight:   1.8,
                      marginBottom: '16px',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

            {/* Conclusion */}
            <div style={{
              background:   '#F4F6FA',
              border:       '1px solid #DDE3EE',
              borderRadius: '12px',
              padding:      '28px',
              marginTop:    '40px',
            }}>
              <h3
                className="font-heading font-bold"
                style={{
                  fontSize:     'var(--card-title-size)',
                  color:        '#1B2A4A',
                  marginBottom: '12px',
                  letterSpacing:'-0.01em',
                }}
              >
                Conclusion
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '16px',
                color:      '#4A5568',
                lineHeight: 1.7,
              }}>
                Connect Web accompagne les entreprises sénégalaises dans la mise en œuvre de
                ces bonnes pratiques. De la conception à la mise en ligne,{' '}
                <Link
                  href={article.serviceLink}
                  style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  découvrez notre approche
                </Link>{' '}
                et obtenez une estimation gratuite de votre projet.
              </p>
            </div>
          </div>
        </section>

        {/* ── CARD AUTEUR ──────────────────────────────────────── */}
        <section className="section-alt">
          <div
            className="container"
            style={{ maxWidth: '720px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--color-orange-500)',
              marginBottom:  '16px',
            }}>
              À propos de l&apos;auteur
            </p>
            <div style={{
              display:      'flex',
              gap:          '20px',
              alignItems:   'flex-start',
              background:   '#FFFFFF',
              border:       '1px solid #DDE3EE',
              borderRadius: '12px',
              padding:      '28px',
            }}>
              <div style={{
                flexShrink:     0,
                width:          '56px',
                height:         '56px',
                borderRadius:   '50%',
                background:     '#1B2A4A',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontFamily:     'var(--font-body)',
                fontSize:       '18px',
                fontWeight:     700,
                color:          '#FFFFFF',
              }}>
                AW
              </div>
              <div>
                <p
                  className="font-heading font-bold"
                  style={{ fontSize: '17px', color: '#1B2A4A', marginBottom: '4px', letterSpacing: '-0.01em' }}
                >
                  Amadou W. Diallo
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-orange-500)', fontWeight: 600, marginBottom: '12px' }}>
                  Fondateur Connect Web
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#4A5568', lineHeight: 1.65 }}>
                  Développeur Full Stack et Product Designer, Amadou partage son expertise du web
                  au service des entreprises sénégalaises. Basé à Dakar depuis 2025.
                </p>
                <Link
                  href="/a-propos/equipe"
                  style={{
                    display:             'inline-block',
                    marginTop:           '12px',
                    fontFamily:          'var(--font-body)',
                    fontSize:            '14px',
                    fontWeight:          600,
                    color:               'var(--color-orange-500)',
                    textDecoration:      'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  En savoir plus →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLES LIÉS ────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="section-base">
            <div className="container">
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--color-orange-500)',
                marginBottom:  '16px',
                textAlign:     'center',
              }}>
                À lire également
              </p>
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                  lineHeight:    1.15,
                  letterSpacing: '-0.025em',
                  color:         '#1B2A4A',
                  textAlign:     'center',
                  marginBottom:  '48px',
                }}
              >
                Dans la même catégorie
              </h2>
              <div style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap:                 '24px',
              }}>
                {related.map((a: BlogArticle) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      background:   '#FFFFFF',
                      border:       '1px solid #DDE3EE',
                      borderRadius: '12px',
                      padding:      '24px',
                    }}>
                      <span style={{
                        display:       'inline-block',
                        fontFamily:    'var(--font-body)',
                        fontSize:      '11px',
                        fontWeight:    600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color:         'var(--color-orange-500)',
                        background:    'rgba(232,97,26,0.08)',
                        borderRadius:  '4px',
                        padding:       '4px 10px',
                        marginBottom:  '12px',
                      }}>
                        {a.category}
                      </span>
                      <h3
                        className="font-heading font-bold"
                        style={{
                          fontSize:     'var(--card-title-size)',
                          color:        '#1B2A4A',
                          lineHeight:   1.3,
                          marginBottom: '10px',
                          letterSpacing:'-0.01em',
                        }}
                      >
                        {a.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   '13px',
                        color:      '#718096',
                      }}>
                        {a.readTime} de lecture · {a.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA FIN D'ARTICLE ────────────────────────────────── */}
        <section
          className="section-brand"
          style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.125rem)',
                lineHeight:    1.15,
                letterSpacing: '-0.025em',
                color:         '#F9FAFB',
                marginBottom:  '16px',
              }}
            >
              Besoin d&apos;aide pour votre projet&nbsp;?
            </h2>
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '17px',
              color:        '#CBD5E0',
              lineHeight:   1.6,
              maxWidth:     '500px',
              margin:       '0 auto 36px',
            }}>
              Cet article vous a été utile&nbsp;? Connect Web accompagne les entreprises
              sénégalaises dans leur transformation digitale. Discutons de vos besoins.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link
                href="/contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     '#F9FAFB',
                  color:          '#1B2A4A',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  letterSpacing:  '-0.01em',
                }}
              >
                Demander un devis gratuit
              </Link>
              <Link
                href="/services"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  height:         '52px',
                  padding:        '0 32px',
                  background:     'transparent',
                  color:          '#CBD5E0',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '15px',
                  fontWeight:     600,
                  borderRadius:   '8px',
                  textDecoration: 'none',
                  border:         '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Découvrir nos services →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
