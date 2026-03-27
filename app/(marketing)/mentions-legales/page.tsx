// Server Component — SSG statique
// Source  : CONTENU-MENTIONS-LEGALES.md
// URL     : /mentions-legales

import type { Metadata } from 'next'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Mentions Légales | Connect Web - Agence Web Dakar',
  description:
    'Mentions légales du site connect-web.tech. Informations éditeur, hébergeur, propriété intellectuelle. Agence web basée à Dakar, Sénégal.',
  alternates: {
    canonical: 'https://connect-web.tech/mentions-legales',
  },
  robots: { index: false, follow: true },
  keywords: 'mentions légales Sénégal, mentions légales site web',
}

export const revalidate = false

/* ─────────────────────────────────────────────────────────────────
   STYLES PARTAGÉS — page éditoriale
   ─────────────────────────────────────────────────────────────── */
const H2: React.CSSProperties = {
  fontFamily:    'var(--font-heading)',
  fontSize:      'clamp(1.125rem, 2vw, 1.375rem)',
  fontWeight:    700,
  color:         '#1B2A4A',
  letterSpacing: '-0.02em',
  marginBottom:  '16px',
  paddingTop:    '40px',
  borderTop:     '1px solid #DDE3EE',
}

const P: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize:   '16px',
  color:      '#4A5568',
  lineHeight: 1.75,
  marginBottom: '16px',
}

const TABLE_CELL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize:   '15px',
  color:      '#4A5568',
  padding:    '10px 16px',
  borderBottom: '1px solid #EEF1F7',
  lineHeight:  1.6,
}

const TABLE_LABEL: React.CSSProperties = {
  ...TABLE_CELL,
  fontWeight: 600,
  color:      '#1B2A4A',
  width:      '40%',
  background: '#F4F6FA',
}

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function MentionsLegalesPage() {
  return (
    <main>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="section-brand"
        style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <div className="container">
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         'var(--color-orange-500)',
            marginBottom:  '16px',
          }}>
            Informations légales
          </p>
          <h1
            className="font-heading font-bold"
            style={{
              fontSize:      'clamp(2rem, 4vw, 2.75rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.03em',
              color:         '#F9FAFB',
              marginBottom:  '16px',
            }}
          >
            Mentions légales
          </h1>
          <p
            className="font-body"
            style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.6, maxWidth: '560px' }}
          >
            Informations légales relatives au site connect-web.tech
          </p>
        </div>
      </section>

      {/* ── CONTENU ────────────────────────────────────────────── */}
      <section className="section-base">
        <div
          className="container-narrow"
          style={{ margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
        >

          {/* 1. Éditeur */}
          <h2 className="font-heading" style={H2}>Éditeur du site</h2>
          <p style={P}>
            Le site internet accessible à l&apos;adresse <strong>connect-web.tech</strong> est édité par&nbsp;:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
            <tbody>
              {[
                ['Raison sociale',    'Connect Web'],
                ['Forme juridique',   'Entreprise individuelle'],
                ['Représentant légal','Amadou W. Diallo, Fondateur et Gérant'],
                ['Siège social',      'G49 Scat Urbam, Dakar, Sénégal'],
                ['NINEA',             '011990604'],
                ['RCCM',              'SN DKR 2025 A 10391'],
                ['Email',             '[PLACEHOLDER_EMAIL_CONTACT]'],
                ['Téléphone',         '[PLACEHOLDER_TELEPHONE]'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={TABLE_LABEL}>{label}</td>
                  <td style={TABLE_CELL}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={P}>
            Le directeur de la publication est Amadou W. Diallo.
          </p>

          {/* 2. Hébergement */}
          <h2 className="font-heading" style={H2}>Hébergement</h2>
          <p style={P}>
            Le site connect-web.tech est hébergé par&nbsp;:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
            <tbody>
              {[
                ['Hébergeur',      '[PLACEHOLDER_NOM_HEBERGEUR]'],
                ['Raison sociale', '[PLACEHOLDER_RAISON_SOCIALE_HEBERGEUR]'],
                ['Adresse',        '[PLACEHOLDER_ADRESSE_HEBERGEUR]'],
                ['Téléphone',      '[PLACEHOLDER_TELEPHONE_HEBERGEUR]'],
                ['Site web',       '[PLACEHOLDER_URL_HEBERGEUR]'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={TABLE_LABEL}>{label}</td>
                  <td style={TABLE_CELL}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 3. Propriété intellectuelle */}
          <h2 className="font-heading" style={H2}>Propriété intellectuelle</h2>
          <p style={P}>
            L&apos;ensemble des éléments constituant le site connect-web.tech, notamment les textes, images, photographies, vidéos, illustrations, logos, icônes, sons, logiciels et leur mise en forme, sont la propriété exclusive de Connect Web ou de ses partenaires et sont protégés par les lois sénégalaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p style={P}>
            Toute reproduction, représentation, modification, publication, adaptation, traduction ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l&apos;autorisation écrite préalable de Connect Web.
          </p>
          <p style={P}>
            Les marques, logos et noms de domaine présents sur le site sont des marques déposées ou des propriétés de Connect Web. Toute utilisation, reproduction ou représentation de ces éléments sans autorisation expresse constitue une contrefaçon passible de sanctions civiles et pénales.
          </p>
          <p style={P}>
            L&apos;utilisation du site à des fins commerciales ou publicitaires est formellement interdite sans accord préalable écrit de Connect Web. Consultez notre{' '}
            <Link href="/confidentialite" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              politique de confidentialité
            </Link>{' '}
            pour plus d&apos;informations.
          </p>

          {/* 4. Limitation de responsabilité */}
          <h2 className="font-heading" style={H2}>Limitation de responsabilité</h2>
          <p style={P}>
            Connect Web s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Connect Web ne peut garantir l&apos;exactitude, la précision, la mise à jour ou l&apos;exhaustivité des informations mises à disposition sur ce site.
          </p>
          <p style={{ ...P, marginBottom: '8px' }}>
            En conséquence, Connect Web décline toute responsabilité&nbsp;:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            {[
              'Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site',
              'Pour tous dommages résultant d\'une intrusion frauduleuse d\'un tiers ayant entraîné une modification des informations mises à disposition sur le site',
              'Pour tous dommages, directs ou indirects, quelles qu\'en soient les causes, origines, natures ou conséquences, provoqués à raison de l\'accès de quiconque au site ou de l\'impossibilité d\'y accéder',
              'Pour l\'utilisation qui pourrait être faite des informations et contenus présents sur le site',
              'Pour la perte de données ou dommages subis par le système informatique de l\'utilisateur lors de la navigation sur le site',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '8px', listStyleType: 'disc' }}>
                {item}
              </li>
            ))}
          </ul>
          <p style={P}>
            L&apos;utilisateur du site reconnaît avoir pris connaissance de la présente notice légale et s&apos;engage à la respecter.
          </p>

          {/* 5. Liens hypertextes */}
          <h2 className="font-heading" style={H2}>Liens hypertextes</h2>
          <p style={P}>
            Le site connect-web.tech peut contenir des liens hypertextes vers d&apos;autres sites internet. Ces liens sont fournis à titre informatif.
          </p>
          <p style={P}>
            Connect Web n&apos;exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur fonctionnement. L&apos;existence d&apos;un lien vers un site externe ne constitue pas une validation de ce site ou de son contenu par Connect Web.
          </p>
          <p style={P}>
            La création de liens hypertextes vers le site connect-web.tech est soumise à l&apos;autorisation préalable de Connect Web. Pour toute demande, contactez-nous à l&apos;adresse indiquée ci-dessous.
          </p>

          {/* 6. Droit applicable */}
          <h2 className="font-heading" style={H2}>Droit applicable</h2>
          <p style={P}>
            Les présentes mentions légales sont régies par le droit sénégalais.
          </p>
          <p style={P}>
            En cas de litige relatif à l&apos;interprétation ou l&apos;exécution des présentes, et à défaut de résolution amiable, les tribunaux de Dakar seront seuls compétents.
          </p>

          {/* 7. Contact */}
          <h2 className="font-heading" style={H2}>Contact</h2>
          <p style={P}>
            Pour toute question relative aux présentes mentions légales ou au site connect-web.tech, vous pouvez nous{' '}
            <Link href="/contact" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              contacter
            </Link>{' '}
            :
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            {[
              { label: 'Par email',    value: '[PLACEHOLDER_EMAIL_CONTACT]' },
              { label: 'Par téléphone', value: '[PLACEHOLDER_TELEPHONE]' },
              { label: 'Par courrier', value: 'Connect Web, G49 Scat Urbam, Dakar, Sénégal' },
            ].map(({ label, value }) => (
              <li key={label} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '8px', listStyleType: 'disc' }}>
                <strong style={{ color: '#1B2A4A' }}>{label}</strong> : {value}
              </li>
            ))}
          </ul>

          {/* Mise à jour */}
          <div style={{
            marginTop:    '48px',
            marginBottom: '16px',
            padding:      '16px 20px',
            background:   '#F4F6FA',
            borderRadius: '8px',
            borderLeft:   '3px solid var(--color-orange-500)',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#718096', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: '#1B2A4A' }}>Dernière mise à jour :</strong>{' '}
              [PLACEHOLDER_DATE_MAJ] — Connect Web se réserve le droit de modifier les présentes mentions légales à tout moment. L&apos;utilisateur est invité à les consulter régulièrement.
            </p>
          </div>

          {/* Liens de navigation vers autres pages légales */}
          <div style={{
            marginTop:   '48px',
            paddingTop:  '32px',
            borderTop:   '1px solid #DDE3EE',
            display:     'flex',
            flexWrap:    'wrap',
            gap:         '16px',
          }}>
            <Link
              href="/confidentialite"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                color: '#1B2A4A', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '6px',
                border: '1px solid #DDE3EE', background: '#FFFFFF',
                transition: 'border-color 0.2s',
              }}
            >
              Politique de confidentialité →
            </Link>
            <Link
              href="/cgv"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                color: '#1B2A4A', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '6px',
                border: '1px solid #DDE3EE', background: '#FFFFFF',
                transition: 'border-color 0.2s',
              }}
            >
              Conditions générales de vente →
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}
