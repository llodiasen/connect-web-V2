// Server Component — SSG statique
// Source  : CONTENU-CONFIDENTIALITE.md
// URL     : /confidentialite

import type { Metadata } from 'next'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Connect Web Dakar',
  description:
    'Politique de confidentialité Connect Web. Protection des données personnelles, cookies, vos droits. Conforme à la loi sénégalaise n°2008-12.',
  alternates: {
    canonical: 'https://connect-web.tech/confidentialite',
  },
  robots: { index: false, follow: true },
  keywords: 'politique confidentialité Sénégal, protection données personnelles',
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

const H3: React.CSSProperties = {
  fontFamily:   'var(--font-heading)',
  fontSize:     '1rem',
  fontWeight:   600,
  color:        '#1B2A4A',
  marginBottom: '10px',
  marginTop:    '24px',
}

const P: React.CSSProperties = {
  fontFamily:   'var(--font-body)',
  fontSize:     '16px',
  color:        '#4A5568',
  lineHeight:   1.75,
  marginBottom: '16px',
}

const TABLE_CELL: React.CSSProperties = {
  fontFamily:   'var(--font-body)',
  fontSize:     '15px',
  color:        '#4A5568',
  padding:      '10px 16px',
  borderBottom: '1px solid #EEF1F7',
  lineHeight:   1.6,
  verticalAlign: 'top',
}

const TABLE_LABEL: React.CSSProperties = {
  ...TABLE_CELL,
  fontWeight:  600,
  color:       '#1B2A4A',
  background:  '#F4F6FA',
}

const LI: React.CSSProperties = {
  fontFamily:   'var(--font-body)',
  fontSize:     '16px',
  color:        '#4A5568',
  lineHeight:   1.75,
  marginBottom: '8px',
  listStyleType: 'disc',
}

/* ─────────────────────────────────────────────────────────────────
   TABLE OF CONTENTS — navigation interne
   ─────────────────────────────────────────────────────────────── */
const TOC_ITEMS = [
  { label: 'Introduction',           anchor: '#intro'      },
  { label: 'Données collectées',     anchor: '#donnees'    },
  { label: 'Utilisation des données',anchor: '#utilisation'},
  { label: 'Cookies',                anchor: '#cookies'    },
  { label: 'Vos droits',             anchor: '#droits'     },
  { label: 'Sécurité des données',   anchor: '#securite'   },
  { label: 'Durée de conservation',  anchor: '#conservation'},
  { label: 'Transfert de données',   anchor: '#transfert'  },
  { label: 'Protection des mineurs', anchor: '#mineurs'    },
  { label: 'Contact',                anchor: '#contact'    },
  { label: 'Loi applicable',         anchor: '#loi'        },
]

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function ConfidentialitePage() {
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
            Protection des données
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
            Politique de confidentialité
          </h1>
          <p
            className="font-body"
            style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.6, maxWidth: '560px' }}
          >
            Comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
        </div>
      </section>

      {/* ── CONTENU ────────────────────────────────────────────── */}
      <section className="section-base">
        <div
          className="container"
          style={{
            display:       'grid',
            gridTemplateColumns: 'minmax(0,1fr)',
            gap:           '0',
          }}
        >
          <div style={{
            display:     'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 640px), 1fr))',
            gap:         '48px',
            alignItems:  'start',
          }}>

            {/* ── SOMMAIRE (sticky sur desktop) ── */}
            <aside style={{
              order:         -1,
              position:      'sticky',
              top:           '96px',
              alignSelf:     'start',
              background:    '#F4F6FA',
              border:        '1px solid #DDE3EE',
              borderRadius:  '12px',
              padding:       '24px',
              maxWidth:      '280px',
            }}
            className="hidden lg:block"
            >
              <p style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                fontWeight:    700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         '#718096',
                marginBottom:  '16px',
              }}>
                Sommaire
              </p>
              <nav>
                {TOC_ITEMS.map(({ label, anchor }) => (
                  <a
                    key={anchor}
                    href={anchor}
                    style={{
                      display:      'block',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '14px',
                      fontWeight:   500,
                      color:        '#4A5568',
                      textDecoration: 'none',
                      padding:      '6px 0',
                      borderBottom: '1px solid #EEF1F7',
                      lineHeight:   1.4,
                    }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* ── CONTENU PRINCIPAL ── */}
            <div style={{ minWidth: 0 }}>

              {/* 1. Introduction */}
              <div id="intro">
                <h2 className="font-heading" style={{ ...H2, paddingTop: 0, borderTop: 'none' }}>Introduction</h2>
                <p style={P}>
                  Connect Web, entreprise individuelle représentée par Amadou W. Diallo, dont le siège social est situé G49 Scat Urbam, Dakar, Sénégal, accorde une grande importance à la protection de vos données personnelles et au respect de votre vie privée.
                </p>
                <p style={P}>
                  La présente politique de confidentialité a pour objet de vous informer sur la manière dont nous collectons et traitons vos données personnelles dans le cadre de votre utilisation du site connect-web.tech, ainsi que sur vos droits.
                </p>
                <p style={P}>
                  Cette politique s&apos;applique à l&apos;ensemble des services proposés sur notre site. En naviguant sur connect-web.tech ou en utilisant nos services, vous reconnaissez avoir pris connaissance de cette politique. Consultez également nos{' '}
                  <Link href="/mentions-legales" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    mentions légales
                  </Link>{' '}
                  et nos{' '}
                  <Link href="/cgv" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    conditions générales de vente
                  </Link>.
                </p>
              </div>

              {/* 2. Données collectées */}
              <div id="donnees">
                <h2 className="font-heading" style={H2}>Données collectées</h2>

                <h3 className="font-heading" style={H3}>Données fournies volontairement</h3>
                <p style={P}>
                  Lorsque vous utilisez nos formulaires de contact, demandez un devis ou vous inscrivez à notre newsletter, nous pouvons collecter les données suivantes&nbsp;:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_LABEL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', width: '40%' }}>Donnée</th>
                      <th style={{ ...TABLE_CELL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', background: '#F4F6FA' }}>Contexte de collecte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Nom et prénom',         'Formulaire de contact, demande de devis'],
                      ['Adresse email',          'Formulaire de contact, newsletter'],
                      ['Numéro de téléphone',    'Formulaire de contact (facultatif)'],
                      ['Nom de l\'entreprise',   'Formulaire de contact (facultatif)'],
                      ['Message',                'Formulaire de contact'],
                      ['Description de projet',  'Demande de devis'],
                    ].map(([donnee, contexte]) => (
                      <tr key={donnee}>
                        <td style={TABLE_LABEL}>{donnee}</td>
                        <td style={TABLE_CELL}>{contexte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={P}>
                  Ces données sont collectées uniquement lorsque vous les fournissez volontairement. Seules les données marquées comme obligatoires dans nos formulaires sont nécessaires au traitement de votre demande.
                </p>

                <h3 className="font-heading" style={H3}>Données collectées automatiquement</h3>
                <p style={P}>
                  Lors de votre navigation sur notre site, nous pouvons collecter automatiquement certaines informations techniques&nbsp;:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_LABEL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', width: '40%' }}>Donnée</th>
                      <th style={{ ...TABLE_CELL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', background: '#F4F6FA' }}>Finalité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Adresse IP (anonymisée)', 'Sécurité et statistiques'],
                      ['Type de navigateur',       'Optimisation de l\'affichage'],
                      ['Type d\'appareil',          'Optimisation mobile'],
                      ['Pages visitées',            'Amélioration du site'],
                      ['Durée de visite',           'Analyse de performance'],
                      ['Source de trafic',          'Analyse marketing'],
                    ].map(([donnee, finalite]) => (
                      <tr key={donnee}>
                        <td style={TABLE_LABEL}>{donnee}</td>
                        <td style={TABLE_CELL}>{finalite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={P}>
                  Ces données sont collectées de manière anonyme et ne permettent pas de vous identifier personnellement.
                </p>
              </div>

              {/* 3. Utilisation des données */}
              <div id="utilisation">
                <h2 className="font-heading" style={H2}>Utilisation des données</h2>
                <p style={P}>Nous utilisons vos données personnelles pour les finalités suivantes&nbsp;:</p>

                {[
                  {
                    titre: 'Traitement de vos demandes',
                    items: [
                      'Répondre à vos messages via le formulaire de contact',
                      'Établir et envoyer des devis personnalisés',
                      'Assurer le suivi de votre projet',
                    ],
                  },
                  {
                    titre: 'Communication',
                    items: [
                      'Vous envoyer notre newsletter si vous y êtes inscrit',
                      'Vous informer sur nos services et actualités',
                      'Vous contacter dans le cadre d\'un projet en cours',
                    ],
                  },
                  {
                    titre: 'Amélioration de nos services',
                    items: [
                      'Analyser l\'utilisation de notre site pour l\'améliorer',
                      'Établir des statistiques anonymes de fréquentation',
                      'Détecter et prévenir les problèmes techniques',
                    ],
                  },
                ].map(({ titre, items }) => (
                  <div key={titre} style={{ marginBottom: '20px' }}>
                    <h3 className="font-heading" style={H3}>{titre}</h3>
                    <ul style={{ paddingLeft: '24px', marginBottom: '8px' }}>
                      {items.map(item => <li key={item} style={LI}>{item}</li>)}
                    </ul>
                  </div>
                ))}

                <div style={{
                  padding:      '16px 20px',
                  background:   'rgba(232,97,26,0.06)',
                  border:       '1px solid rgba(232,97,26,0.2)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                  <p style={{ ...P, marginBottom: 0, fontWeight: 600, color: '#1B2A4A' }}>
                    Nous ne vendons, ne louons et ne partageons jamais vos données personnelles à des tiers à des fins commerciales.
                  </p>
                </div>
                <p style={P}>
                  Vos données peuvent être partagées uniquement avec nos sous-traitants techniques (hébergeur, outil d&apos;emailing) dans le strict cadre des finalités décrites ci-dessus, et sous réserve que ces partenaires s&apos;engagent à respecter la confidentialité de vos données.
                </p>
              </div>

              {/* 4. Cookies */}
              <div id="cookies">
                <h2 className="font-heading" style={H2}>Cookies</h2>
                <p style={P}>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite.
                </p>

                <h3 className="font-heading" style={H3}>Types de cookies utilisés</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_LABEL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', width: '30%' }}>Type</th>
                      <th style={{ ...TABLE_CELL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', background: '#F4F6FA', width: '50%' }}>Finalité</th>
                      <th style={{ ...TABLE_CELL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', background: '#F4F6FA', width: '20%' }}>Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={TABLE_LABEL}>Cookies essentiels</td>
                      <td style={TABLE_CELL}>Fonctionnement du site, mémorisation de vos préférences</td>
                      <td style={TABLE_CELL}>Session</td>
                    </tr>
                    <tr>
                      <td style={TABLE_LABEL}>Cookies analytiques</td>
                      <td style={TABLE_CELL}>Mesure d&apos;audience anonyme, amélioration du site</td>
                      <td style={TABLE_CELL}>14 mois</td>
                    </tr>
                  </tbody>
                </table>
                <p style={P}>Nous n&apos;utilisons pas de cookies publicitaires ni de cookies de réseaux sociaux.</p>

                <h3 className="font-heading" style={H3}>Gestion des cookies</h3>
                <p style={P}>Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies&nbsp;:</p>
                <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                  {[
                    ['Chrome',  'Paramètres > Confidentialité et sécurité > Cookies'],
                    ['Firefox', 'Options > Vie privée et sécurité > Cookies'],
                    ['Safari',  'Préférences > Confidentialité > Cookies'],
                    ['Edge',    'Paramètres > Cookies et autorisations de site'],
                  ].map(([browser, path]) => (
                    <li key={browser} style={LI}>
                      <strong style={{ color: '#1B2A4A' }}>{browser}</strong> : {path}
                    </li>
                  ))}
                </ul>
                <p style={P}>Le refus des cookies essentiels peut affecter le fonctionnement de certaines fonctionnalités du site.</p>
              </div>

              {/* 5. Vos droits */}
              <div id="droits">
                <h2 className="font-heading" style={H2}>Vos droits</h2>
                <p style={P}>
                  Conformément à la loi sénégalaise n°2008-12 du 25 janvier 2008 portant sur la protection des données à caractère personnel, vous disposez des droits suivants&nbsp;:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '12px',
                  marginBottom: '24px',
                }}>
                  {[
                    { droit: 'Droit d\'accès',        desc: 'Obtenir une copie de l\'ensemble des données personnelles que nous détenons vous concernant.' },
                    { droit: 'Droit de rectification', desc: 'Demander la correction de données personnelles inexactes ou incomplètes.' },
                    { droit: 'Droit de suppression',   desc: 'Demander l\'effacement de vos données, sous réserve des obligations légales de conservation.' },
                    { droit: 'Droit d\'opposition',    desc: 'Vous opposer au traitement de vos données ou à leur utilisation à des fins de prospection.' },
                    { droit: 'Droit à la limitation',  desc: 'Demander la limitation du traitement de vos données dans les cas prévus par la loi.' },
                  ].map(({ droit, desc }) => (
                    <div key={droit} style={{
                      padding:      '16px',
                      background:   '#F4F6FA',
                      border:       '1px solid #DDE3EE',
                      borderRadius: '8px',
                    }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: '#1B2A4A', marginBottom: '6px' }}>{droit}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4A5568', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading" style={H3}>Exercer vos droits</h3>
                <p style={P}>Pour exercer l&apos;un de ces droits, contactez-nous&nbsp;:</p>
                <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                  <li style={LI}><strong style={{ color: '#1B2A4A' }}>Par email</strong> : [PLACEHOLDER_EMAIL_CONTACT]</li>
                  <li style={LI}><strong style={{ color: '#1B2A4A' }}>Par courrier</strong> : Connect Web, G49 Scat Urbam, Dakar, Sénégal</li>
                </ul>
                <p style={P}>
                  Nous nous engageons à répondre à votre demande dans un délai de 30 jours. Une pièce d&apos;identité pourra vous être demandée pour vérifier votre identité.
                </p>
              </div>

              {/* 6. Sécurité */}
              <div id="securite">
                <h2 className="font-heading" style={H2}>Sécurité des données</h2>
                <p style={P}>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
                </p>
                <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                  {[
                    'Connexion sécurisée HTTPS sur l\'ensemble du site',
                    'Stockage des données sur des serveurs sécurisés',
                    'Accès aux données limité aux personnes habilitées',
                    'Sauvegardes régulières',
                    'Mise à jour régulière de nos systèmes',
                  ].map(item => <li key={item} style={LI}>{item}</li>)}
                </ul>
                <p style={P}>
                  Malgré ces mesures, aucune transmission de données sur Internet ne peut être garantie comme totalement sécurisée.
                </p>
              </div>

              {/* 7. Conservation */}
              <div id="conservation">
                <h2 className="font-heading" style={H2}>Durée de conservation</h2>
                <p style={P}>
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées&nbsp;:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_LABEL, fontWeight: 700, borderBottom: '2px solid #DDE3EE' }}>Type de données</th>
                      <th style={{ ...TABLE_CELL, fontWeight: 700, borderBottom: '2px solid #DDE3EE', background: '#F4F6FA' }}>Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Données de contact (formulaires)', '3 ans après le dernier contact'],
                      ['Données newsletter',               'Jusqu\'à votre désinscription'],
                      ['Données projet client',            '5 ans après la fin du projet'],
                      ['Données analytiques',              '14 mois'],
                    ].map(([type, duree]) => (
                      <tr key={type}>
                        <td style={TABLE_LABEL}>{type}</td>
                        <td style={TABLE_CELL}>{duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={P}>
                  À l&apos;expiration de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.
                </p>
              </div>

              {/* 8. Transfert */}
              <div id="transfert">
                <h2 className="font-heading" style={H2}>Transfert de données</h2>
                <p style={P}>
                  Vos données personnelles sont principalement stockées et traitées au Sénégal.
                </p>
                <p style={P}>
                  Dans le cadre de l&apos;utilisation de certains outils techniques (hébergement, emailing), vos données peuvent être transférées vers des pays situés hors du Sénégal. Dans ce cas, nous nous assurons que ces transferts sont encadrés par des garanties appropriées conformément à la réglementation applicable.
                </p>
              </div>

              {/* 9. Mineurs */}
              <div id="mineurs">
                <h2 className="font-heading" style={H2}>Protection des mineurs</h2>
                <p style={P}>
                  Le site connect-web.tech n&apos;est pas destiné aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles concernant des mineurs.
                </p>
                <p style={P}>
                  Si vous êtes parent ou tuteur et que vous pensez que votre enfant nous a fourni des données personnelles, contactez-nous pour que nous procédions à leur suppression.
                </p>
              </div>

              {/* 10. Contact */}
              <div id="contact">
                <h2 className="font-heading" style={H2}>Contact</h2>
                <p style={P}>
                  Pour toute question relative à la présente politique de confidentialité ou pour exercer vos droits, vous pouvez nous{' '}
                  <Link href="/contact" style={{ color: 'var(--color-orange-500)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    contacter
                  </Link>{' '}
                  :
                </p>
                <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                  <li style={LI}><strong style={{ color: '#1B2A4A' }}>Par email</strong> : [PLACEHOLDER_EMAIL_CONTACT]</li>
                  <li style={LI}><strong style={{ color: '#1B2A4A' }}>Par téléphone</strong> : [PLACEHOLDER_TELEPHONE]</li>
                  <li style={LI}><strong style={{ color: '#1B2A4A' }}>Par courrier</strong> : Connect Web, G49 Scat Urbam, Dakar, Sénégal</li>
                </ul>
              </div>

              {/* 11. Loi applicable */}
              <div id="loi">
                <h2 className="font-heading" style={H2}>Loi applicable</h2>
                <p style={P}>
                  La présente politique de confidentialité est régie par la loi sénégalaise, notamment la loi n°2008-12 du 25 janvier 2008 portant sur la protection des données à caractère personnel.
                </p>
                <p style={P}>
                  Pour toute réclamation, vous pouvez également vous adresser à la Commission des Données Personnelles (CDP) du Sénégal.
                </p>
              </div>

              {/* Mise à jour */}
              <div style={{
                marginTop:    '48px',
                padding:      '16px 20px',
                background:   '#F4F6FA',
                borderRadius: '8px',
                borderLeft:   '3px solid var(--color-orange-500)',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#718096', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#1B2A4A' }}>Dernière mise à jour :</strong>{' '}
                  [PLACEHOLDER_DATE_MAJ] — Connect Web se réserve le droit de modifier la présente politique à tout moment. Toute modification sera publiée sur cette page avec indication de la date.
                </p>
              </div>

              {/* Navigation légale */}
              <div style={{
                marginTop:  '48px',
                paddingTop: '32px',
                borderTop:  '1px solid #DDE3EE',
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '16px',
              }}>
                <Link href="/mentions-legales" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1B2A4A', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', border: '1px solid #DDE3EE', background: '#FFFFFF' }}>
                  Mentions légales →
                </Link>
                <Link href="/cgv" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1B2A4A', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', border: '1px solid #DDE3EE', background: '#FFFFFF' }}>
                  Conditions générales de vente →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
