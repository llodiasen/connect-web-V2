'use client'

// Source  : CONTENT.md > HOME > Section Barre de confiance
// Design  : CSS infinite scroll (pas Framer — perf) · grayscale → couleur au hover
// Note    : Remplacer les SVG placeholders par les vrais logos clients dans LOGOS[]

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────── */
interface LogoItem {
  id:    string
  name:  string
  abbr:  string
  color: string
  /** Optionnel : chemin vers une vraie image dans /public/images/logos/ */
  src?:  string
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Logos : [PLACEHOLDER]
   ⚠️  Remplacer par les vrais logos clients quand disponibles
   ───────────────────────────────────────────────────────────────── */
const LOGOS: LogoItem[] = [
  { id: 'teranga',   name: 'Teranga Group',  abbr: 'TG', color: '#E8611A' },
  { id: 'sendig',    name: 'Sen Digital',    abbr: 'SD', color: '#3B82F6' },
  { id: 'dakarinv',  name: 'Dakar Invest',   abbr: 'DI', color: '#22C55E' },
  { id: 'wavetech',  name: 'WaveTech',       abbr: 'WT', color: '#8B5CF6' },
  { id: 'afrikpay',  name: 'Afrik Pay',      abbr: 'AP', color: '#EF4444' },
  { id: 'ngorlabs',  name: 'Ngor Labs',      abbr: 'NL', color: '#F59E0B' },
  { id: 'sunumedia', name: 'Sunu Media',     abbr: 'SM', color: '#06B6D4' },
  { id: 'lebucloud', name: 'Lébu Cloud',     abbr: 'LC', color: '#EC4899' },
  { id: 'xaralaweb', name: 'Xarala Web',     abbr: 'XW', color: '#10B981' },
  { id: 'diaspora',  name: 'Diaspora Hub',   abbr: 'DH', color: '#6366F1' },
]

/* ─────────────────────────────────────────────────────────────────
   CSS ANIMATION — injectée en tant que <style> (CSS-first, perf max)
   ───────────────────────────────────────────────────────────────── */
const ANIMATION_CSS = `
@keyframes logo-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.logo-track {
  animation: logo-scroll 40s linear infinite;
  will-change: transform;
}

.logo-track-container:hover .logo-track {
  animation-play-state: paused;
}

.logo-item {
  filter: grayscale(1) opacity(0.45);
  transition: filter 0.35s ease, opacity 0.35s ease;
}

.logo-item:hover {
  filter: grayscale(0) opacity(1);
}

@media (prefers-reduced-motion: reduce) {
  .logo-track {
    animation-play-state: paused !important;
  }
}
`

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — Un logo (SVG wordmark ou image)
   ───────────────────────────────────────────────────────────────── */
function LogoCard({ logo }: { logo: LogoItem }) {
  if (logo.src) {
    /* Mode production : vraie image */
    return (
      <div className="logo-item shrink-0 flex items-center" style={{ padding: '0 3rem' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.name}
          height={32}
          style={{ height: '32px', width: 'auto', maxWidth: '120px', objectFit: 'contain' }}
          loading="lazy"
        />
      </div>
    )
  }

  /* Mode placeholder : SVG wordmark généré */
  return (
    <div
      className="logo-item shrink-0 flex items-center gap-2.5"
      style={{ padding: '0 3rem' }}
      title={logo.name}
    >
      {/* Icône carré arrondi avec initiales */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="30"
          height="30"
          rx="7"
          fill={logo.color}
          fillOpacity="0.12"
        />
        <rect
          width="30"
          height="30"
          rx="7"
          stroke={logo.color}
          strokeOpacity="0.25"
          strokeWidth="1"
          fill="none"
        />
        <text
          x="15"
          y="19.5"
          textAnchor="middle"
          fill={logo.color}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="0.5"
        >
          {logo.abbr}
        </text>
      </svg>

      {/* Nom de l'entreprise */}
      <span
        style={{
          fontFamily:    'var(--font-heading)',
          fontWeight:    700,
          fontSize:      '13px',
          letterSpacing: '0.04em',
          color:         'var(--color-dark-50)',
          whiteSpace:    'nowrap',
          userSelect:    'none',
        }}
      >
        {logo.name}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — LogoScrollBanner
   ───────────────────────────────────────────────────────────────── */
export function LogoScrollBanner() {
  /* Double la liste pour le seamless loop (50% = liste originale) */
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <>
      {/* Injection CSS animation */}
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />

      <section
        aria-label="Clients et partenaires Connect Web"
        style={{
          background:   '#F7F8FA',
          borderTop:    '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        {/* ── En-tête ────────────────────────────────────────── */}
        <div className="container text-center" style={{ paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)', paddingBottom: '2rem' }}>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#9CA3AF',
            }}
          >
            Ils nous font confiance
          </p>

          <p
            style={{
              marginTop:  '0.5rem',
              fontSize:   '14px',
              color:      '#9CA3AF',
              lineHeight: 1.5,
            }}
          >
            Des entreprises sénégalaises et africaines qui ont choisi Connect Web
          </p>
        </div>

        {/* ── Piste de défilement ────────────────────────────── */}
        <div
          className="logo-track-container"
          style={{
            position:     'relative',
            overflow:     'hidden',
            paddingBottom:'clamp(2rem, 3.5vw, 3rem)',
            /* Masques dégradés gauche + droite */
            maskImage:       'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          {/* Séparateur haut */}
          <div
            aria-hidden="true"
            style={{
              height:     '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
              marginBottom: '1.5rem',
            }}
          />

          {/* Piste animée */}
          <div
            className="logo-track"
            style={{
              display:    'flex',
              alignItems: 'center',
              width:      'max-content',
            }}
            role="list"
            aria-label="Logos clients"
          >
            {doubled.map((logo, i) => (
              <div key={`${logo.id}-${i}`} role="listitem">
                <LogoCard logo={logo} />
              </div>
            ))}
          </div>

          {/* Séparateur bas */}
          <div
            aria-hidden="true"
            style={{
              height:    '1px',
              background:'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
              marginTop: '1.5rem',
            }}
          />
        </div>


      </section>
    </>
  )
}
