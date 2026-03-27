'use client'

// Source  : CONTENT.md > Home > Barre de confiance
// Design  : section-alt · marquee CSS infini · logos grayscale → couleur au hover
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline uniquement
// Pas de Framer Motion — CSS pur

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────── */
interface Logo {
  name: string
  src:  string
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Home > Barre de confiance
   ───────────────────────────────────────────────────────────────── */
const LOGOS: Logo[] = [
  { name: 'Wave',          src: '/Partenaires/LogoWave.png' },
  { name: 'Orange',        src: '/Partenaires/logoOrange.png' },
  { name: 'MTN',           src: '/Partenaires/logo-MTN-1024x1024.png' },
  { name: 'Canal+',        src: '/Partenaires/logo-canal-plus-e1610969463832.png' },
  { name: 'Total Energies',src: '/Partenaires/Logo_TotalEnergies-1024x809.webp' },
  { name: 'Sanlam',        src: '/Partenaires/Sanlam-1024x212.webp' },
  { name: 'Airtel',        src: '/Partenaires/logoAirtel.png' },
  { name: 'Cérélac',       src: '/Partenaires/logoCerelac.png' },
  { name: 'Google',        src: '/Partenaires/logoGoogle.png' },
  { name: 'Tigo',          src: '/Partenaires/logoTigo.png' },
  { name: 'YouTube',       src: '/Partenaires/yt_logo_rgb_light.png' },
]

/* ─────────────────────────────────────────────────────────────────
   SOUS-COMPOSANT — LogoItem
   Affiche l'image si elle existe, sinon le nom en texte stylé
   ───────────────────────────────────────────────────────────────── */
function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div
      className="group flex items-center justify-center"
      style={{
        height:    '40px',
        padding:   '0 32px',
        flexShrink: 0,
      }}
    >
      {/* Guard : on tente l'image, fallback texte via onError */}
      <img
        src={logo.src}
        alt={logo.name}
        style={{
          height:     '40px',
          width:      'auto',
          maxWidth:   '120px',
          objectFit:  'contain',
          filter:     'grayscale(100%)',
          opacity:    0.5,
          transition: 'filter 300ms ease, opacity 300ms ease',
        }}
        onError={(e) => {
          /* Masque l'image cassée et révèle le fallback texte */
          const target = e.currentTarget as HTMLImageElement
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget as HTMLImageElement
          t.style.filter  = 'grayscale(0%)'
          t.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget as HTMLImageElement
          t.style.filter  = 'grayscale(100%)'
          t.style.opacity = '0.5'
        }}
      />
      {/* Fallback texte — masqué par défaut, affiché si image introuvable */}
      <span
        style={{
          display:       'none',
          alignItems:    'center',
          justifyContent:'center',
          fontFamily:    'var(--font-body)',
          fontWeight:    600,
          fontSize:      '13px',
          letterSpacing: '0.04em',
          color:         '#9CA3AF',
          whiteSpace:    'nowrap',
          transition:    'color 300ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#1B2A4A' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF' }}
      >
        {logo.name}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — TrustBar
   ───────────────────────────────────────────────────────────────── */
export default function TrustBar() {
  /* Duplication du tableau pour boucle seamless */
  const allLogos = [...LOGOS, ...LOGOS]

  return (
    <section className="section-alt">
      {/* Animation @keyframes marquee */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container">

        {/* Titre */}
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    500,
            fontSize:      '13px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         '#9CA3AF',
            textAlign:     'center',
            marginBottom:  '32px',
          }}
        >
          Ils nous font confiance
        </p>

        {/* Marquee wrapper — masques dégradé sur les bords */}
        <div
          className="marquee-wrapper"
          style={{
            overflow:        'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage:       'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
          aria-hidden="true"
        >
          <div
            className="marquee-track flex"
            style={{ width: 'max-content' }}
          >
            {allLogos.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
