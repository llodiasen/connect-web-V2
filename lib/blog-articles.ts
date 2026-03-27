// Source : CONTENU-BLOG.md — 5 articles piliers statiques
// Utilisé par : blog/page.tsx + blog/[slug]/page.tsx

export interface BlogArticle {
  slug:        string
  title:       string
  excerpt:     string
  category:    string
  readTime:    string
  date:        string
  isoDate:     string
  keywords:    string
  serviceLink: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug:        'creer-boutique-en-ligne-dakar',
    title:       'Comment créer sa boutique en ligne à Dakar en 2025',
    excerpt:     'Lancer un e-commerce au Sénégal : choisir sa plateforme, intégrer Wave et Orange Money, optimiser pour le mobile. Le guide complet pour entrepreneurs.',
    category:    'E-commerce',
    readTime:    '8 min',
    date:        '15 janvier 2025',
    isoDate:     '2025-01-15',
    keywords:    'créer boutique en ligne Dakar, e-commerce Sénégal, vendre en ligne Dakar',
    serviceLink: '/services/sites-ecommerce',
  },
  {
    slug:        'wave-orange-money-ecommerce-guide',
    title:       'Intégrer Wave et Orange Money à votre boutique : guide complet',
    excerpt:     'Les paiements mobiles représentent 70% des transactions en ligne au Sénégal. Voici comment les intégrer correctement à votre boutique.',
    category:    'E-commerce',
    readTime:    '6 min',
    date:        '28 janvier 2025',
    isoDate:     '2025-01-28',
    keywords:    'intégration Wave e-commerce, Orange Money boutique en ligne, paiement mobile Sénégal',
    serviceLink: '/services/sites-ecommerce',
  },
  {
    slug:        'site-web-mobile-first-senegal',
    title:       'Pourquoi votre site doit être mobile-first au Sénégal',
    excerpt:     '80% du trafic internet sénégalais vient des smartphones. Un site non optimisé mobile perd la majorité de ses visiteurs avant la première page.',
    category:    'Web',
    readTime:    '5 min',
    date:        '10 février 2025',
    isoDate:     '2025-02-10',
    keywords:    'site mobile Sénégal, responsive design Dakar, mobile-first Afrique',
    serviceLink: '/services/sites-vitrine',
  },
  {
    slug:        'marketplace-multi-vendeurs-afrique',
    title:       'Lancer une marketplace multi-vendeurs en Afrique',
    excerpt:     'Le marché africain est prêt pour les plateformes multi-vendeurs. Modèles économiques, fonctionnalités essentielles, technologie : tout ce qu\'il faut savoir.',
    category:    'Marketplace',
    readTime:    '10 min',
    date:        '3 mars 2025',
    isoDate:     '2025-03-03',
    keywords:    'marketplace Afrique, plateforme multi-vendeurs Sénégal, créer marketplace Dakar',
    serviceLink: '/services/marketplace',
  },
  {
    slug:        'shopify-vs-woocommerce-senegal',
    title:       'Shopify vs WooCommerce : que choisir au Sénégal ?',
    excerpt:     'Deux plateformes, deux approches. Coûts, intégration Wave/Orange Money, facilité de gestion : notre analyse pour vous aider à choisir.',
    category:    'E-commerce',
    readTime:    '7 min',
    date:        '20 mars 2025',
    isoDate:     '2025-03-20',
    keywords:    'Shopify Sénégal, WooCommerce Dakar, comparatif e-commerce Afrique',
    serviceLink: '/services/boutique-shopify',
  },
]

export const CATEGORIES = ['Tous', 'E-commerce', 'Web', 'Marketplace']

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(a => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): BlogArticle[] {
  return BLOG_ARTICLES
    .filter(a => a.slug !== currentSlug && a.category === category)
    .slice(0, limit)
}
