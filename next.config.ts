import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ── Turbopack root (silence multi-lockfile warning) ─────── */
  turbopack: {
    root: __dirname,
  },

  /* ── Images ─────────────────────────────────────────────── */
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  /* ── Redirections 301 — ARCHITECTURE.md §3.4 ────────────── */
  async redirects() {
    return [
      // WordPress legacy URLs
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/accueil',
        destination: '/',
        permanent: true,
      },
      // Services
      {
        source: '/nos-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-developpement',
        destination: '/services/creation-site-web',
        permanent: true,
      },
      {
        source: '/service-refonte',
        destination: '/services/refonte-site-web',
        permanent: true,
      },
      {
        source: '/service-ecommerce',
        destination: '/services/site-e-commerce',
        permanent: true,
      },
      // Portfolio / Tarifs
      {
        source: '/nos-realisations',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/nos-tarifs',
        destination: '/tarifs',
        permanent: true,
      },
      // WordPress ?page_id=XX catch-all
      {
        source: '/(.*)',
        has: [{ type: 'query', key: 'page_id' }],
        destination: '/',
        permanent: true,
      },
    ]
  },

  /* ── Headers de sécurité ─────────────────────────────────── */
  async headers() {
    return [
      {
        // Bloquer wp-admin / wp-login (héritage WordPress)
        source: '/wp-(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
