import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/wp-admin', '/wp-login.php'],
      },
    ],
    sitemap: 'https://connect-web.tech/sitemap.xml',
  }
}
