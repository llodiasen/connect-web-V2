// Source  : CONTENT.md > Identité agence > Valeurs
// Design  : section-brand (bg-#1B2A4A) · 3 colonnes · séparateurs rgba(255,255,255,0.1)
// RÈGLE N°0 CLAUDE.md — Tout spacing via style{{}} inline uniquement

import { Code2, CheckCircle, MapPin } from 'lucide-react'


/* ─────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────── */
interface Value {
  id:    string
  titre: string
  texte: string
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES — Source : CONTENT.md > Identité agence > Valeurs
   ───────────────────────────────────────────────────────────────── */
const VALUES: Value[] = [
  {
    id:    'expertise',
    titre: "L'EXPERTISE",
    texte: "On maîtrise les technologies modernes — Next.js, React Native, Flutter, Odoo — et on les applique concrètement à votre business. Pas de promesses, des livrables.",
  },
  {
    id:    'rigueur',
    titre: 'LA RIGUEUR',
    texte: '98% de nos projets livrés dans les délais annoncés. Chaque projet a un planning clair, des étapes validées ensemble et un code source livré à la fin. Sans exception.',
  },
  {
    id:    'proximite',
    titre: 'LA PROXIMITÉ',
    texte: "On est à Dakar, joignables sur WhatsApp, et on connaît votre marché. Wave, Orange Money, connectivité mobile — on intègre les réalités africaines dès le départ.",
  },
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — ValuesSection
   ───────────────────────────────────────────────────────────────── */
export default function ValuesSection() {
  return (
    <section className="section-brand" style={{ paddingBlock: '0' }}>
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ alignItems: 'start' }}
        >
          {/* Colonne 1 */}
          <div
            className="lg:border-r"
            style={{ borderColor: 'rgba(255,255,255,0.1)', padding: '28px 32px' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <Code2 style={{ color: 'var(--color-orange-500)', width: '40px', height: '40px' }} strokeWidth={1.5} />
            </div>
            <h3
              className="text-h3"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    600,
                color:         '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom:  '12px',
              }}
            >
              {VALUES[0].titre}
            </h3>
            <p
              className="text-body"
              style={{
                fontFamily:  'var(--font-body)',
                fontWeight:  300,
                color:       '#FFFFFF',
                lineHeight:  '1.65',
                textAlign:   'justify',
              }}
            >
              {VALUES[0].texte}
            </p>
          </div>

          {/* Colonne 2 */}
          <div
            className="lg:border-r"
            style={{ borderColor: 'rgba(255,255,255,0.1)', padding: '28px 32px' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <CheckCircle style={{ color: 'var(--color-orange-500)', width: '40px', height: '40px' }} strokeWidth={1.5} />
            </div>
            <h3
              className="text-h3"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    600,
                color:         '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom:  '12px',
              }}
            >
              {VALUES[1].titre}
            </h3>
            <p
              className="text-body"
              style={{
                fontFamily:  'var(--font-body)',
                fontWeight:  300,
                color:       '#FFFFFF',
                lineHeight:  '1.65',
                textAlign:   'justify',
              }}
            >
              {VALUES[1].texte}
            </p>
          </div>

          {/* Colonne 3 */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <MapPin style={{ color: 'var(--color-orange-500)', width: '40px', height: '40px' }} strokeWidth={1.5} />
            </div>
            <h3
              className="text-h3"
              style={{
                fontFamily:    'var(--font-heading)',
                fontWeight:    600,
                color:         '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom:  '12px',
              }}
            >
              {VALUES[2].titre}
            </h3>
            <p
              className="text-body"
              style={{
                fontFamily:  'var(--font-body)',
                fontWeight:  300,
                color:       '#FFFFFF',
                lineHeight:  '1.65',
                textAlign:   'justify',
              }}
            >
              {VALUES[2].texte}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
