// Server Component — SSG statique
// Source  : CONTENU-CGV.md
// URL     : /cgv

import type { Metadata } from 'next'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   METADATA — SEO
   ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Connect Web Dakar',
  description:
    'CGV Connect Web, agence web Dakar. Conditions de prestation, tarifs, délais, propriété intellectuelle. Prestations digitales au Sénégal.',
  alternates: {
    canonical: 'https://connect-web.tech/cgv',
  },
  robots: { index: false, follow: true },
  keywords: 'CGV prestation digitale Sénégal, conditions générales agence web',
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
  fontFamily:    'var(--font-heading)',
  fontSize:      '1rem',
  fontWeight:    600,
  color:         '#1B2A4A',
  marginBottom:  '12px',
  marginTop:     '28px',
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
}

const TABLE_LABEL: React.CSSProperties = {
  ...TABLE_CELL,
  fontWeight: 600,
  color:      '#1B2A4A',
  width:      '40%',
  background: '#F4F6FA',
}

const TABLE_HEADER: React.CSSProperties = {
  fontFamily:  'var(--font-body)',
  fontSize:    '13px',
  fontWeight:  600,
  color:       '#1B2A4A',
  padding:     '10px 16px',
  background:  '#EEF1F7',
  textAlign:   'left' as const,
  letterSpacing: '0.02em',
  textTransform: 'uppercase' as const,
}

/* ─────────────────────────────────────────────────────────────────
   TABLE OF CONTENTS
   ─────────────────────────────────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'art1',  label: 'Art. 1 — Objet' },
  { id: 'art2',  label: 'Art. 2 — Devis et commande' },
  { id: 'art3',  label: 'Art. 3 — Tarifs et paiement' },
  { id: 'art4',  label: 'Art. 4 — Délais de réalisation' },
  { id: 'art5',  label: 'Art. 5 — Livraison et réception' },
  { id: 'art6',  label: 'Art. 6 — Révisions et modifications' },
  { id: 'art7',  label: 'Art. 7 — Propriété intellectuelle' },
  { id: 'art8',  label: 'Art. 8 — Responsabilité' },
  { id: 'art9',  label: 'Art. 9 — Résiliation' },
  { id: 'art10', label: 'Art. 10 — Litiges' },
  { id: 'art11', label: 'Art. 11 — Loi applicable' },
  { id: 'art12', label: 'Art. 12 — Dispositions diverses' },
]

/* ─────────────────────────────────────────────────────────────────
   PAGE — Server Component
   ─────────────────────────────────────────────────────────────── */
export default function CGVPage() {
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
            Relations contractuelles
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
            Conditions générales de vente
          </h1>
          <p
            className="font-body"
            style={{ fontSize: '17px', color: '#CBD5E0', lineHeight: 1.6, maxWidth: '560px' }}
          >
            Conditions applicables aux prestations de services de Connect Web.
          </p>
        </div>
      </section>

      {/* ── CONTENU ────────────────────────────────────────────── */}
      <section className="section-base">
        <div
          className="container"
          style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: 'clamp(1rem, 4vw, 2rem)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0', alignItems: 'start' }}
               className="cgv-layout">
            <style>{`
              @media (min-width: 1024px) {
                .cgv-layout { grid-template-columns: 220px 1fr !important; gap: 56px !important; }
              }
            `}</style>

            {/* ── TOC sidebar ────────────────────────────────── */}
            <aside style={{ display: 'none' }} className="cgv-toc">
              <style>{`
                @media (min-width: 1024px) {
                  .cgv-toc { display: block !important; }
                  .cgv-toc-inner { position: sticky; top: 96px; }
                }
              `}</style>
              <div className="cgv-toc-inner">
                <p style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         '#718096',
                  marginBottom:  '16px',
                }}>
                  Sommaire
                </p>
                <nav>
                  {TOC_ITEMS.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      style={{
                        display:      'block',
                        fontFamily:   'var(--font-body)',
                        fontSize:     '13px',
                        color:        '#4A5568',
                        lineHeight:   1.4,
                        padding:      '6px 0',
                        textDecoration: 'none',
                        borderBottom: '1px solid #EEF1F7',
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── ARTICLES ───────────────────────────────────── */}
            <div>

              {/* ARTICLE 1 — Objet */}
              <h2 id="art1" className="font-heading" style={H2}>Article 1 — Objet</h2>
              <p style={P}>
                Les présentes Conditions Générales de Vente (ci-après &quot;CGV&quot;) régissent les
                relations contractuelles entre :
              </p>

              <p style={{ ...P, fontWeight: 600, marginBottom: '8px' }}>Le Prestataire :</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                <tbody>
                  {[
                    ['Raison sociale',     'Connect Web'],
                    ['Représentant légal', 'Amadou W. Diallo, Fondateur et Gérant'],
                    ['Siège social',       'G49 Scat Urbam, Dakar, Sénégal'],
                    ['NINEA',              '011990604'],
                    ['RCCM',               'SN DKR 2025 A 10391'],
                    ['Email',              '[PLACEHOLDER_EMAIL_CONTACT]'],
                    ['Téléphone',          '[PLACEHOLDER_TELEPHONE]'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={TABLE_LABEL}>{label}</td>
                      <td style={TABLE_CELL}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={P}>
                Et toute personne physique ou morale, professionnelle ou particulière (ci-après
                &quot;le Client&quot;) souhaitant bénéficier des services proposés par Connect Web.
              </p>

              <p style={{ ...P, fontWeight: 600, marginBottom: '8px' }}>Services concernés :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Création et développement de sites internet',
                  'Développement d\'applications web et mobiles',
                  'Création de boutiques e-commerce',
                  'Développement de marketplaces',
                  'Maintenance et évolution de sites existants',
                  'Formation et accompagnement digital',
                  'Conseil en stratégie digitale',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Toute commande de prestation implique l&apos;acceptation sans réserve des présentes
                CGV par le Client.
              </p>

              {/* ARTICLE 2 — Devis et commande */}
              <h2 id="art2" className="font-heading" style={H2}>Article 2 — Devis et commande</h2>

              <h3 style={H3}>2.1 Établissement du devis</h3>
              <p style={P}>
                Connect Web établit un devis gratuit et personnalisé pour chaque demande de
                prestation. Ce devis est valable pendant une durée de <strong>30 jours</strong> à
                compter de sa date d&apos;émission.
              </p>
              <p style={{ ...P, marginBottom: '8px' }}>Le devis précise :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'La nature détaillée des prestations',
                  'Le planning prévisionnel de réalisation',
                  'Le prix total hors taxes et toutes taxes comprises',
                  'Les modalités de paiement',
                  'Les conditions particulières éventuelles',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 style={H3}>2.2 Validation de la commande</h3>
              <p style={{ ...P, marginBottom: '8px' }}>La commande est réputée ferme et définitive après :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Signature du devis par le Client (manuscrite ou électronique)',
                  'Versement de l\'acompte prévu au devis',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Le Client reconnaît avoir pris connaissance des présentes CGV avant la signature
                du devis et les accepter sans réserve.
              </p>

              <h3 style={H3}>2.3 Modification de commande</h3>
              <p style={P}>
                Toute modification de la commande initiale demandée par le Client fait l&apos;objet
                d&apos;un avenant écrit précisant les nouvelles conditions de prix et de délai. Cet
                avenant doit être signé par les deux parties.
              </p>

              {/* ARTICLE 3 — Tarifs et paiement */}
              <h2 id="art3" className="font-heading" style={H2}>Article 3 — Tarifs et paiement</h2>

              <h3 style={H3}>3.1 Tarifs</h3>
              <p style={P}>
                Les prix sont exprimés en <strong>Francs CFA (XOF)</strong>. Connect Web, en tant
                qu&apos;entreprise individuelle, n&apos;est pas soumise à la TVA.
              </p>
              <p style={P}>
                Les tarifs indiqués dans le devis sont valables pour la durée mentionnée. Au-delà,
                Connect Web se réserve le droit de les réviser.
              </p>

              <h3 style={H3}>3.2 Modalités de paiement</h3>
              <p style={P}>
                Sauf conditions particulières mentionnées au devis, les paiements s&apos;effectuent
                selon l&apos;échéancier suivant :
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #EEF1F7', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={TABLE_HEADER}>Échéance</th>
                    <th style={TABLE_HEADER}>Pourcentage</th>
                    <th style={TABLE_HEADER}>Moment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Acompte', '40 %', 'À la commande'],
                    ['Versement intermédiaire', '30 %', 'À mi-projet (validation maquettes/prototype)'],
                    ['Solde', '30 %', 'À la livraison'],
                  ].map(([label, pct, moment]) => (
                    <tr key={label}>
                      <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#1B2A4A' }}>{label}</td>
                      <td style={TABLE_CELL}>{pct}</td>
                      <td style={TABLE_CELL}>{moment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={P}>
                Pour les projets d&apos;un montant inférieur à 500&nbsp;000 XOF, le paiement peut
                être effectué en deux fois : 50&nbsp;% à la commande, 50&nbsp;% à la livraison.
              </p>

              <h3 style={H3}>3.3 Moyens de paiement acceptés</h3>
              <p style={{ ...P, marginBottom: '8px' }}>Connect Web accepte les moyens de paiement suivants :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {['Virement bancaire', 'Wave', 'Orange Money'].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Les coordonnées bancaires et numéros de paiement mobile sont communiqués sur
                chaque facture.
              </p>

              <h3 style={H3}>3.4 Retard de paiement</h3>
              <p style={{ ...P, marginBottom: '8px' }}>En cas de retard de paiement :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Les travaux en cours sont suspendus jusqu\'à régularisation',
                  'Des pénalités de retard de 1,5 % par mois sont applicables sur les sommes dues',
                  'Les frais de recouvrement éventuels sont à la charge du Client',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Connect Web se réserve le droit de résilier le contrat après mise en demeure
                restée infructueuse pendant 15 jours.
              </p>

              {/* ARTICLE 4 — Délais de réalisation */}
              <h2 id="art4" className="font-heading" style={H2}>Article 4 — Délais de réalisation</h2>

              <h3 style={H3}>4.1 Délais indicatifs</h3>
              <p style={P}>
                Les délais de réalisation mentionnés au devis sont donnés à titre indicatif et
                constituent un engagement de moyens de la part de Connect Web.
              </p>
              <p style={{ ...P, marginBottom: '8px' }}>Ces délais ne commencent à courir qu&apos;à compter de :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'La réception de l\'acompte',
                  'La réception de l\'ensemble des éléments nécessaires au démarrage (contenus, accès, brief validé)',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 style={H3}>4.2 Retards imputables au Client</h3>
              <p style={{ ...P, marginBottom: '8px' }}>Les délais sont automatiquement prolongés en cas de :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Retard dans la fourniture des éléments par le Client',
                  'Retard dans la validation des étapes intermédiaires',
                  'Demandes de modifications non prévues au devis initial',
                  'Retard de paiement',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Connect Web informera le Client de tout décalage de planning par écrit.
              </p>

              <h3 style={H3}>4.3 Force majeure</h3>
              <p style={P}>
                Aucune des parties ne pourra être tenue responsable d&apos;un retard ou d&apos;une
                inexécution due à un cas de force majeure tel que défini par la jurisprudence
                sénégalaise (catastrophe naturelle, guerre, grève, pandémie, panne technique
                généralisée, etc.).
              </p>

              {/* ARTICLE 5 — Livraison et réception */}
              <h2 id="art5" className="font-heading" style={H2}>Article 5 — Livraison et réception</h2>

              <h3 style={H3}>5.1 Modalités de livraison</h3>
              <p style={{ ...P, marginBottom: '8px' }}>La livraison s&apos;effectue par :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Mise en ligne du site sur le serveur du Client ou sur l\'hébergement prévu',
                  'Remise des codes d\'accès et des fichiers sources',
                  'Formation à l\'utilisation (si prévue au devis)',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                La livraison est constatée par un email de Connect Web au Client indiquant que
                les livrables sont disponibles.
              </p>

              <h3 style={H3}>5.2 Vérification et réserves</h3>
              <p style={P}>
                Le Client dispose d&apos;un délai de <strong>7 jours</strong> à compter de la
                livraison pour vérifier la conformité des livrables et signaler par écrit tout
                défaut ou non-conformité.
              </p>
              <p style={P}>
                Passé ce délai, les livrables sont réputés acceptés sans réserve.
              </p>
              <p style={P}>
                Les anomalies signalées doivent être précises et documentées. Connect Web
                s&apos;engage à corriger les défauts avérés dans un délai raisonnable.
              </p>

              <h3 style={H3}>5.3 Procès-verbal de réception</h3>
              <p style={P}>
                À la demande de l&apos;une ou l&apos;autre des parties, un procès-verbal de
                réception peut être établi, constatant la conformité des livrables et la fin
                des prestations.
              </p>

              {/* ARTICLE 6 — Révisions et modifications */}
              <h2 id="art6" className="font-heading" style={H2}>Article 6 — Révisions et modifications</h2>

              <h3 style={H3}>6.1 Cycles de révision inclus</h3>
              <p style={P}>
                Sauf mention contraire au devis, chaque projet inclut <strong>2 cycles de
                révision</strong> :
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Révisions sur les maquettes graphiques',
                  'Révisions sur le site en phase de développement',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Un cycle de révision comprend l&apos;ensemble des retours communiqués en une
                seule fois par le Client.
              </p>

              <h3 style={H3}>6.2 Révisions supplémentaires</h3>
              <p style={P}>
                Les révisions excédant les cycles inclus sont facturées au tarif horaire en
                vigueur, communiqué au Client avant toute intervention.
              </p>
              <p style={P}>
                Le Client est informé par écrit lorsque les cycles inclus sont épuisés, avant
                toute facturation supplémentaire.
              </p>

              <h3 style={H3}>6.3 Modifications de brief</h3>
              <p style={P}>
                Toute modification substantielle du brief initial (ajout de fonctionnalités,
                changement de périmètre, refonte de la direction artistique) fait l&apos;objet
                d&apos;un avenant au devis initial.
              </p>

              {/* ARTICLE 7 — Propriété intellectuelle */}
              <h2 id="art7" className="font-heading" style={H2}>Article 7 — Propriété intellectuelle</h2>

              <h3 style={H3}>7.1 Avant paiement complet</h3>
              <p style={P}>
                Jusqu&apos;au paiement intégral du prix convenu, l&apos;ensemble des créations
                réalisées dans le cadre du projet (code source, design, contenus créés par
                Connect Web) restent la propriété exclusive de Connect Web.
              </p>
              <p style={P}>
                Le Client ne peut utiliser, reproduire ou exploiter ces éléments tant que le
                paiement n&apos;est pas soldé.
              </p>

              <h3 style={H3}>7.2 Après paiement complet</h3>
              <p style={{ ...P, marginBottom: '8px' }}>
                Le paiement intégral du prix convenu entraîne le transfert au Client des droits
                de propriété intellectuelle sur :
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Le code source développé spécifiquement pour le projet',
                  'Les éléments graphiques créés sur mesure (maquettes, logos si prévus au devis, visuels)',
                  'Les contenus textuels rédigés par Connect Web (si prévus au devis)',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Ce transfert est définitif et exclusif pour l&apos;exploitation dans le cadre
                défini au devis.
              </p>

              <p style={{ ...P, fontWeight: 600, marginBottom: '8px' }}>Restent exclus du transfert :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Les outils, bibliothèques et frameworks utilisés (open source ou propriétaires)',
                  'Les méthodes et savoir-faire génériques de Connect Web',
                  'Les éléments fournis par le Client',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 style={H3}>7.3 Droit de référence</h3>
              <p style={P}>
                Connect Web se réserve le droit de mentionner le projet réalisé à titre de
                référence commerciale, sauf opposition écrite du Client notifiée avant la
                livraison.
              </p>
              <p style={{ ...P, marginBottom: '8px' }}>Cette mention peut inclure :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Le nom du Client et son secteur d\'activité',
                  'Des captures d\'écran du site ou de l\'application',
                  'Une description succincte du projet',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              {/* ARTICLE 8 — Responsabilité */}
              <h2 id="art8" className="font-heading" style={H2}>Article 8 — Responsabilité</h2>

              <h3 style={H3}>8.1 Obligation de moyens</h3>
              <p style={P}>
                Connect Web est tenue à une obligation de moyens dans l&apos;exécution de ses
                prestations. Elle s&apos;engage à mettre en œuvre tous les moyens nécessaires à
                la bonne réalisation du projet.
              </p>
              <p style={P}>
                Connect Web ne peut garantir un résultat commercial particulier (chiffre
                d&apos;affaires, trafic, positionnement).
              </p>

              <h3 style={H3}>8.2 Exclusions de responsabilité</h3>
              <p style={{ ...P, marginBottom: '8px' }}>Connect Web ne saurait être tenue responsable :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Des contenus fournis par le Client (textes, images, données) et de leur légalité',
                  'Des dommages indirects (perte de chiffre d\'affaires, manque à gagner, préjudice d\'image)',
                  'Des dysfonctionnements liés à l\'hébergement choisi par le Client',
                  'Des modifications apportées par le Client ou un tiers après la livraison',
                  'De l\'indisponibilité de services tiers (API, paiement, hébergement)',
                  'Des problèmes de sécurité liés à des mots de passe faibles ou compromis',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 style={H3}>8.3 Plafond de responsabilité</h3>
              <p style={P}>
                En tout état de cause, la responsabilité de Connect Web est limitée au montant
                total effectivement payé par le Client pour le projet concerné.
              </p>

              {/* ARTICLE 9 — Résiliation */}
              <h2 id="art9" className="font-heading" style={H2}>Article 9 — Résiliation</h2>

              <h3 style={H3}>9.1 Résiliation par le Client</h3>
              <p style={P}>
                Le Client peut résilier le contrat à tout moment par lettre recommandée ou email
                avec accusé de réception.
              </p>
              <p style={{ ...P, marginBottom: '8px' }}>En cas de résiliation :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Les sommes déjà versées restent acquises à Connect Web',
                  'Les travaux réalisés sont facturés au prorata du temps passé',
                  'Les livrables intermédiaires peuvent être remis au Client sous réserve du paiement des sommes dues',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 style={H3}>9.2 Résiliation par le Prestataire</h3>
              <p style={{ ...P, marginBottom: '8px' }}>Connect Web peut résilier le contrat dans les cas suivants :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Non-paiement des sommes dues après mise en demeure de 15 jours',
                  'Absence de réponse du Client pendant plus de 30 jours',
                  'Comportement inapproprié, irrespectueux ou menaçant du Client',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                En cas de résiliation pour faute du Client, les sommes versées restent acquises
                et le solde des prestations réalisées est immédiatement exigible.
              </p>

              {/* ARTICLE 10 — Litiges */}
              <h2 id="art10" className="font-heading" style={H2}>Article 10 — Litiges</h2>

              <h3 style={H3}>10.1 Règlement amiable</h3>
              <p style={P}>
                En cas de différend relatif à l&apos;interprétation ou l&apos;exécution du
                contrat, les parties s&apos;engagent à rechercher une solution amiable avant
                toute action judiciaire.
              </p>
              <p style={{ ...P, marginBottom: '8px' }}>Le Client peut adresser ses réclamations par écrit à :</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {[
                  'Email : [PLACEHOLDER_EMAIL_CONTACT]',
                  'Courrier : Connect Web, G49 Scat Urbam, Dakar, Sénégal',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#4A5568', lineHeight: 1.75, marginBottom: '6px', listStyleType: 'disc' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={P}>
                Connect Web s&apos;engage à répondre dans un délai de 15 jours ouvrés.
              </p>

              <h3 style={H3}>10.2 Juridiction compétente</h3>
              <p style={P}>
                À défaut de règlement amiable dans un délai de 30 jours, tout litige relatif à
                l&apos;interprétation ou l&apos;exécution des présentes CGV sera soumis aux
                tribunaux compétents de <strong>Dakar, Sénégal</strong>.
              </p>

              {/* ARTICLE 11 — Loi applicable */}
              <h2 id="art11" className="font-heading" style={H2}>Article 11 — Loi applicable</h2>
              <p style={P}>
                Les présentes CGV sont régies par le <strong>droit sénégalais</strong>.
              </p>
              <p style={P}>
                Toute disposition des présentes CGV qui serait déclarée nulle n&apos;affectera
                pas la validité des autres dispositions.
              </p>

              {/* ARTICLE 12 — Dispositions diverses */}
              <h2 id="art12" className="font-heading" style={H2}>Article 12 — Dispositions diverses</h2>

              <h3 style={H3}>12.1 Intégralité</h3>
              <p style={P}>
                Les présentes CGV, le devis signé et ses éventuels avenants constituent
                l&apos;intégralité de l&apos;accord entre les parties.
              </p>

              <h3 style={H3}>12.2 Modifications des CGV</h3>
              <p style={P}>
                Connect Web se réserve le droit de modifier les présentes CGV à tout moment.
                Les CGV applicables sont celles en vigueur à la date de signature du devis.
              </p>

              <h3 style={H3}>12.3 Confidentialité</h3>
              <p style={P}>
                Chaque partie s&apos;engage à garder confidentielles les informations de nature
                commerciale, technique ou financière communiquées par l&apos;autre partie dans
                le cadre du projet.
              </p>

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
                  [PLACEHOLDER_DATE_MAJ] — Connect Web se réserve le droit de modifier les
                  présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à
                  la date de signature du devis.
                </p>
              </div>

              {/* Liens de navigation vers autres pages légales */}
              <div style={{
                marginTop:  '48px',
                paddingTop: '32px',
                borderTop:  '1px solid #DDE3EE',
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '16px',
              }}>
                <Link
                  href="/mentions-legales"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                    color: '#1B2A4A', textDecoration: 'none',
                    padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DDE3EE', background: '#FFFFFF',
                  }}
                >
                  Mentions légales →
                </Link>
                <Link
                  href="/confidentialite"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                    color: '#1B2A4A', textDecoration: 'none',
                    padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DDE3EE', background: '#FFFFFF',
                  }}
                >
                  Politique de confidentialité →
                </Link>
                <Link
                  href="/contact"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                    color: '#1B2A4A', textDecoration: 'none',
                    padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #DDE3EE', background: '#FFFFFF',
                  }}
                >
                  Nous contacter →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
