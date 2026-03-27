import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable — 404',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: 'var(--bg-base)', padding: 'var(--section-padding-x)' }}
    >
      <span className="text-eyebrow mb-4">Erreur 404</span>
      <h1 className="text-display mb-4">
        Page <span className="text-gradient">introuvable</span>
      </h1>
      <p
        className="max-w-md mb-8"
        style={{ color: 'var(--text-secondary)' }}
      >
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 h-11 font-semibold rounded-md bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
