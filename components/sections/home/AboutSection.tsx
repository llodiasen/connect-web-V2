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
              Connect Web accompagne les PME, startups et entrepreneurs dans la
              conception de solutions digitales sur mesure. Sites web,
              applications mobiles, logiciels SaaS — on prend en charge votre
              projet de A à Z, du brief au déploiement. Chaque solution est
              pensée pour votre marché, vos utilisateurs et vos objectifs
              business. On ne livre pas du code, on livre des résultats.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
