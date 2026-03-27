// tailwind.config.ts — Connect Web v3.1
// Source de vérité : CLAUDE.md v3.1
// ⛔ Ne jamais utiliser text-3xl/4xl/5xl pour les titres — utiliser text-h1/h2/h3/display

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // ── Breakpoints — mobile-first ──
    screens: {
      xs:  '375px',
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1536px',
    },
    extend: {
      // ── Typographie — clamp() obligatoire ──
      fontSize: {
        // Niveau Display/Hero
        'display': [
          'clamp(2.5rem, 6vw, 4.5rem)',
          { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.03em' }
        ],
        // H1
        'h1': [
          'clamp(2rem, 4vw, 3rem)',
          { lineHeight: '1.15', fontWeight: '700' }
        ],
        // H2 — sections
        'h2': [
          'clamp(1.5rem, 3vw, 2.25rem)',
          { lineHeight: '1.25', fontWeight: '700' }
        ],
        // H3 — sous-sections, titres cards
        'h3': [
          'clamp(1.125rem, 2vw, 1.5rem)',
          { lineHeight: '1.35', fontWeight: '600' }
        ],
        // Eyebrow — labels au-dessus des titres
        'eyebrow': [
          '0.75rem',
          { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.12em' }
        ],
      },

      // ── Familles de polices ──
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },

      // ── Couleurs — tokens CSS ──
      colors: {
        brand: {
          DEFAULT: '#E8611A',   // --color-orange-500
          hover:   '#FF7A20',   // --color-orange-400
          active:  '#C44D0E',   // --color-orange-600
        },
        surface: {
          base:     '#FFFFFF',   // --bg-base
          elevated: '#F7F8FA',   // --bg-elevated
          overlay:  '#ECEEF3',   // --bg-overlay
        },
        content: {
          primary:   '#0A0B0E',  // --text-primary
          secondary: '#4A5568',  // --text-secondary
          tertiary:  '#718096',  // --text-tertiary
          disabled:  '#A0AEC0',  // --text-disabled
        },
        border: {
          subtle:  '#F1F3F7',    // --border-subtle
          default: '#E2E8F0',    // --border-default
          strong:  '#CBD5E0',    // --border-strong
        },
      },

      // ── Border radius — tokens ──
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },

      // ── Box shadow — tokens ──
      boxShadow: {
        sm:       '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        md:       '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)',
        lg:       '0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        glow:     '0 0 24px rgba(232, 97, 26, 0.22)',
        'glow-sm':'0 0 12px rgba(232, 97, 26, 0.15)',
      },

      // ── Spacing — tokens section ──
      spacing: {
        'nav': '72px',   // --nav-height
      },

      // ── Animations ──
      keyframes: {
        logoScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'logo-scroll': 'logoScroll 30s linear infinite',
        'fade-in-up':  'fadeInUp 0.5s ease forwards',
        shimmer:       'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
