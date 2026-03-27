import type { Config } from 'tailwindcss'

/* ============================================================
   Connect Web — Tailwind CSS Config v4.0
   Design System : Montserrat (headings) + Jost (body)
   ============================================================ */

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        /* Scale typographique v4.0 — max réduit vs v3 */
        'display': ['clamp(2rem, 4vw, 3.5rem)',  { lineHeight: '1.05', fontWeight: '800' }],
        'h1':      ['clamp(2rem, 4vw, 3.5rem)',  { lineHeight: '1.05', fontWeight: '800' }],
        'h2':      ['clamp(1rem, 1.6vw, 1.25rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3':      ['clamp(1.0625rem, 1.8vw, 1.25rem)', { lineHeight: '1.35', fontWeight: '600' }],
        'eyebrow': ['0.6875rem',                        { lineHeight: '1.4',  fontWeight: '600', letterSpacing: '0.1em' }],
      },
      screens: {
        'xs':  '375px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },
      colors: {
        brand: {
          primary:   'var(--color-orange-500)',
          hover:     'var(--color-orange-400)',
          active:    'var(--color-orange-600)',
          dark:      'var(--color-brand-dark)',
        },
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: '9999px',
      },
      boxShadow: {
        sm:       'var(--shadow-sm)',
        md:       'var(--shadow-md)',
        lg:       'var(--shadow-lg)',
        glow:     'var(--shadow-glow)',
        'glow-sm':'var(--shadow-glow-sm)',
      },
    },
  },
  plugins: [],
}

export default config
