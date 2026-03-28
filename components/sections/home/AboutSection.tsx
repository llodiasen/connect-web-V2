export default function AboutSection() {
  return (
    <section className="section-base">
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-3 items-start"
          style={{ gap: '48px' }}
        >
          {/* Colonne gauche — badge pill */}
          <div className="lg:col-span-1">
            <span
              className="inline-flex items-center border border-[#E5E7EB] rounded-full text-[13px]"
              style={{
                padding: '6px 14px',
                color: '#555',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--orange)',
                  display: 'inline-block',
                  marginRight: '8px',
                  flexShrink: 0,
                }}
              />
              Qui sommes-nous
            </span>
          </div>

          {/* Colonne droite — titre + texte */}
          <div className="lg:col-span-2">
            <h2
              className="text-h2"
              style={{ color: '#111', fontFamily: 'Syne, sans-serif' }}
            >
              Plus qu&apos;une agence de développement : votre partenaire tech sur mesure.
            </h2>
            <p
              className="text-body"
              style={{
                color: '#555',
                lineHeight: '1.8',
                marginTop: '16px',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Trop d&apos;entreprises subissent le digital au lieu d&apos;en profiter — projets
              abandonnés, outils inadaptés, prestataires qui disparaissent.
              Connect-Web accompagne les entreprises, PME, commerces et
              entrepreneurs qui veulent faire du digital un vrai levier de
              croissance, pas une source de frustration.
            </p>
            <p
              className="text-body"
              style={{
                color: '#555',
                lineHeight: '1.8',
                marginTop: '16px',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Notre mission : concevoir des solutions concrètes qui répondent aux
              vraies problématiques — visibilité en ligne, génération de leads,
              automatisation des processus, et ventes en ligne. Nous comprenons
              votre métier, nous maîtrisons les réalités du marché africain et
              les standards internationaux, et nous livrons dans les délais —
              sans mauvaises surprises, avec des résultats mesurables dès les
              premières semaines.
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: '20px 0 0',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#111', fontFamily: 'DM Sans, sans-serif', fontSize: '15px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--orange)', flexShrink: 0 }} />
                Plus de leads grâce à des sites pensés pour la conversion
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#111', fontFamily: 'DM Sans, sans-serif', fontSize: '15px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--orange)', flexShrink: 0 }} />
                Plus de ventes avec des boutiques en ligne qui performent
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
