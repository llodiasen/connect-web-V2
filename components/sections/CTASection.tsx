'use client'

// Composant CTA réutilisable — formulaire dynamique + infos contact
// Utilisé par : logiciels-saas, developpement-mobile, applications-mobile, architecture-api
// RÈGLE N°0 CLAUDE.md — Tout spacing via style={{}} inline

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  MapPin, MessageCircle, Mail, Clock, CheckCircle2,
  Linkedin, Facebook, Instagram,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   ANIMATION
   ─────────────────────────────────────────────────────────────── */
const EASE     = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number]
const VIEWPORT = { once: true, amount: 0.15 }

const H2_STYLE: React.CSSProperties = {
  fontSize:      'clamp(1.25rem, 2.5vw, 2rem)',
  lineHeight:    1.25,
  letterSpacing: '-0.02em',
}

/* ─────────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */
export interface CTASectionProps {
  service:         string   // payload envoyé à /api/contact
  titre:           string   // h2 colonne gauche
  sousTitre:       string   // p orange colonne gauche
  titreCarte:      string   // h3 carte formulaire
  sousTitreCarte:  string   // p orange carte formulaire
  placeholder:     string   // textarea description projet
  intentionDefaut: string   // intention sélectionnée par défaut
}

interface ContactForm {
  prenom:          string
  email:           string
  projet?:         string
  telephone?:      string
  entreprise?:     string
  typeSaas?:       string
  nbUtilisateurs?: string
  disponibilite?:  string
  deadline?:       string
}

/* ─────────────────────────────────────────────────────────────────
   CONSTANTES
   ─────────────────────────────────────────────────────────────── */
const INTENTIONS = [
  { icon: '🎯', label: 'Obtenir un devis'      },
  { icon: '📊', label: 'Estimation budgétaire'  },
  { icon: '💬', label: 'Discuter mon projet'    },
  { icon: '🚀', label: 'Démarrer maintenant'    },
]

const SUBMIT_LABELS: Record<string, string> = {
  'Obtenir un devis':      'Recevoir mon devis →',
  'Estimation budgétaire': 'Obtenir mon estimation →',
  'Discuter mon projet':   'Réserver mon créneau →',
  'Démarrer maintenant':   'Lancer le projet →',
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT INTERNE — formulaire (client)
   ─────────────────────────────────────────────────────────────── */
function CTAFormInner({
  service, titre, sousTitre, titreCarte, sousTitreCarte, placeholder, intentionDefaut,
}: CTASectionProps) {
  const [sent, setSent]             = useState(false)
  const [apiError, setApiError]     = useState<string | null>(null)
  const [intention, setIntention]   = useState(intentionDefaut)
  const [submitHover, setSubmitHover] = useState(false)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    setApiError(null)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, service, intention }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setApiError('Une erreur est survenue. Réessayez ou écrivez à contact@connect-web.tech.')
    }
  }

  /* ── Styles ── */
  const F: React.CSSProperties = {
    width: '100%', height: '48px', padding: '0 14px',
    fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1B2A4A',
    background: '#F8FAFC', border: '1px solid #E2E8F0',
    borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
  }
  const L: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-body)',
    fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px',
  }
  const Err: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '12px',
    color: '#EF4444', marginTop: '4px',
  }
  const req = <span style={{ color: '#EF4444' }}>*</span>

  return (
    <section aria-labelledby="cta-section-heading" className="section-brand">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '56px', alignItems: 'start',
        }}>

          {/* ── Colonne gauche — contact agence ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            <div>
              <h2
                id="cta-section-heading"
                className="font-heading font-bold"
                style={{ ...H2_STYLE, color: '#F9FAFB', marginBottom: '12px' }}
              >
                {titre}
              </h2>
              <p className="font-body" style={{ fontSize: '16px', color: 'var(--color-orange-500)', fontWeight: 600, lineHeight: 1.5 }}>
                {sousTitre}
              </p>
              <div style={{ width: '40px', height: '2px', background: 'var(--color-orange-500)', borderRadius: '2px', marginTop: '16px' }} />
            </div>

            {/* Infos contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {([
                { Icon: MapPin,        label: 'Adresse',              value: 'Dakar, Sénégal',                        href: undefined },
                { Icon: MessageCircle, label: 'Téléphone / WhatsApp', value: '+221 77 900 62 82\n+221 78 343 82 49',  href: 'https://wa.me/221779006282' },
                { Icon: Mail,          label: 'Email',                value: 'contact@connect-web.tech',              href: 'mailto:contact@connect-web.tech' },
                { Icon: Clock,         label: 'Disponibilité',        value: 'Lun – Ven, 8h – 18h (GMT)\nRéponse WhatsApp sous 2h', href: undefined },
              ] as { Icon: React.ElementType; label: string; value: string; href?: string }[]).map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', flexShrink: 0, borderRadius: '8px',
                    background: 'rgba(232,97,26,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} style={{ color: 'var(--color-orange-500)' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body" style={{
                      fontSize: '11px', fontWeight: 600, color: '#64748B',
                      letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '2px',
                    }}>{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="font-body"
                        style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 500, textDecoration: 'none', lineHeight: 1.6 }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body" style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 500, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

            {/* Réseaux sociaux */}
            <div>
              <p className="font-body" style={{
                fontSize: '11px', fontWeight: 600, color: '#FFFFFF',
                letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px',
              }}>Suivez-nous</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {([
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/connect-web-tech/', Icon: Linkedin  },
                  { label: 'Facebook',  href: 'https://www.facebook.com/share/1CRzjeUSYM/',        Icon: Facebook  },
                  { label: 'Instagram', href: 'https://www.instagram.com/connect_web_agency',      Icon: Instagram },
                ] as { label: string; href: string; Icon: React.ElementType }[]).map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-colors duration-200"
                    style={{
                      width: '38px', height: '38px', borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FFFFFF', textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)' }} />

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['✓ +50 projets livrés', '✓ Wave + Stripe', '✓ Réponse 24h'].map(t => (
                <span key={t} className="font-body" style={{
                  fontSize: '12px', fontWeight: 500, color: '#FFFFFF',
                  background: 'rgba(255,255,255,0.08)', borderRadius: '4px',
                  padding: '4px 10px', border: '1px solid rgba(255,255,255,0.25)',
                }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* ── Colonne droite — carte formulaire ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
          >
            {sent ? (
              <div style={{
                padding: '48px 40px', textAlign: 'center',
                background: '#FFFFFF', borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
              }}>
                <CheckCircle2 size={44} style={{ color: '#22C55E', marginBottom: '16px' }} aria-hidden="true" />
                <p className="font-heading font-bold" style={{ fontSize: '18px', color: '#1B2A4A', marginBottom: '8px' }}>
                  Demande reçue.
                </p>
                <p className="font-body" style={{ fontSize: '14px', color: '#6B7280' }}>
                  On vous répond sous 24h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{
                  background: '#FFFFFF', borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
                  padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px',
                }}
              >
                {/* Header */}
                <div>
                  <h3 className="font-heading font-bold" style={{ fontSize: '20px', color: '#1B2A4A', marginBottom: '4px', lineHeight: 1.3 }}>
                    {titreCarte}
                  </h3>
                  <p className="font-body" style={{ fontSize: '13px', color: 'var(--color-orange-500)', fontWeight: 600 }}>
                    {sousTitreCarte}
                  </p>
                </div>

                {/* Intentions 2×2 */}
                <div className="grid grid-cols-2" style={{ gap: '10px' }}>
                  {INTENTIONS.map(({ icon, label: lbl }) => {
                    const active = intention === lbl
                    return (
                      <button key={lbl} type="button"
                        onClick={() => { setIntention(lbl); reset() }}
                        className="font-body"
                        style={{
                          padding: '10px 12px', borderRadius: '8px',
                          border:     active ? '2px solid var(--color-orange-500)' : '1.5px solid #E2E8F0',
                          background: active ? 'rgba(232,97,26,0.06)' : '#F8FAFC',
                          color:      active ? 'var(--color-orange-500)' : '#374151',
                          fontSize: '13px', fontWeight: active ? 600 : 500,
                          textAlign: 'left', cursor: 'pointer',
                          transition: 'border-color 0.15s, background 0.15s, color 0.15s',
                          display: 'flex', alignItems: 'center', gap: '8px',
                        }}
                      >
                        <span aria-hidden="true">{icon}</span>{lbl}
                      </button>
                    )
                  })}
                </div>

                {/* Champs dynamiques */}
                <motion.div
                  key={intention}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  {/* Prénom + Email — toujours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '12px' }}>
                    <div>
                      <label htmlFor="prenom" style={L}>Prénom {req}</label>
                      <input id="prenom" {...register('prenom', { required: 'Requis' })}
                        placeholder="Marie" style={F} autoComplete="given-name" />
                      {errors.prenom && <p style={Err}>{errors.prenom.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" style={L}>Email {req}</label>
                      <input id="email" type="email"
                        {...register('email', { required: 'Requis', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' } })}
                        placeholder="marie@startup.sn" style={F} autoComplete="email" />
                      {errors.email && <p style={Err}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Entreprise / Marque — toujours, avant projet */}
                  <div>
                    <label htmlFor="entreprise" style={L}>Entreprise / Marque</label>
                    <input id="entreprise" {...register('entreprise')}
                      placeholder="Nom de votre entreprise ou projet" style={F} autoComplete="organization" />
                  </div>

                  {/* Textarea projet — toujours */}
                  <div>
                    <label htmlFor="projet" style={L}>Votre projet</label>
                    <textarea id="projet" {...register('projet')} rows={3}
                      placeholder={placeholder}
                      style={{ ...F, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                    />
                  </div>

                  {/* ── Obtenir un devis ── */}
                  {intention === 'Obtenir un devis' && (
                    <div>
                      <label htmlFor="telephone" style={L}>WhatsApp {req}</label>
                      <input id="telephone" type="tel"
                        {...register('telephone', { required: 'Requis' })}
                        placeholder="+221 77 000 00 00" style={F} autoComplete="tel" />
                      {errors.telephone && <p style={Err}>{errors.telephone.message}</p>}
                    </div>
                  )}

                  {/* ── Estimation budgétaire ── */}
                  {intention === 'Estimation budgétaire' && (<>
                    <div>
                      <label htmlFor="typeSaas" style={L}>Type de projet {req}</label>
                      <select id="typeSaas" {...register('typeSaas', { required: 'Requis' })} style={{ ...F, cursor: 'pointer' }} defaultValue="">
                        <option value="" disabled>Sélectionner…</option>
                        <option value="vertical">SaaS vertical (secteur)</option>
                        <option value="horizontal">SaaS horizontal (outil)</option>
                        <option value="mvp">MVP à valider</option>
                        <option value="b2b">Plateforme B2B</option>
                        <option value="nsp">Je ne sais pas encore</option>
                      </select>
                      {errors.typeSaas && <p style={Err}>{errors.typeSaas.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="nbUtilisateurs" style={L}>Utilisateurs visés {req}</label>
                      <select id="nbUtilisateurs" {...register('nbUtilisateurs', { required: 'Requis' })} style={{ ...F, cursor: 'pointer' }} defaultValue="">
                        <option value="" disabled>Sélectionner…</option>
                        <option value="<100">{'< 100'}</option>
                        <option value="100-1k">100 – 1 000</option>
                        <option value="1k-10k">1 000 – 10 000</option>
                        <option value=">10k">{'> 10 000'}</option>
                      </select>
                      {errors.nbUtilisateurs && <p style={Err}>{errors.nbUtilisateurs.message}</p>}
                    </div>
                  </>)}

                  {/* ── Discuter mon projet ── */}
                  {intention === 'Discuter mon projet' && (<>
                    <div>
                      <label htmlFor="telephone" style={L}>WhatsApp {req}</label>
                      <input id="telephone" type="tel"
                        {...register('telephone', { required: 'Requis' })}
                        placeholder="+221 77 000 00 00" style={F} autoComplete="tel" />
                      {errors.telephone && <p style={Err}>{errors.telephone.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="disponibilite" style={L}>Disponibilité {req}</label>
                      <select id="disponibilite" {...register('disponibilite', { required: 'Requis' })} style={{ ...F, cursor: 'pointer' }} defaultValue="">
                        <option value="" disabled>Sélectionner…</option>
                        <option value="matin">Matin 8h–12h</option>
                        <option value="aprem">Après-midi 12h–18h</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      {errors.disponibilite && <p style={Err}>{errors.disponibilite.message}</p>}
                    </div>
                  </>)}

                  {/* ── Démarrer maintenant ── */}
                  {intention === 'Démarrer maintenant' && (<>
                    <div>
                      <label htmlFor="telephone" style={L}>WhatsApp {req}</label>
                      <input id="telephone" type="tel"
                        {...register('telephone', { required: 'Requis' })}
                        placeholder="+221 77 000 00 00" style={F} autoComplete="tel" />
                      {errors.telephone && <p style={Err}>{errors.telephone.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="deadline" style={L}>Deadline {req}</label>
                      <select id="deadline" {...register('deadline', { required: 'Requis' })} style={{ ...F, cursor: 'pointer' }} defaultValue="">
                        <option value="" disabled>Sélectionner…</option>
                        <option value="urgent">{'Urgent (< 2 semaines)'}</option>
                        <option value="ce-mois">Ce mois-ci</option>
                        <option value="3-mois">Dans 3 mois</option>
                      </select>
                      {errors.deadline && <p style={Err}>{errors.deadline.message}</p>}
                    </div>
                  </>)}
                </motion.div>

                {/* Erreur API */}
                {apiError && (
                  <p className="font-body" style={{ fontSize: '13px', color: '#EF4444' }}>{apiError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setSubmitHover(true)}
                  onMouseLeave={() => setSubmitHover(false)}
                  className="font-body font-bold"
                  style={{
                    height: '52px', width: '100%',
                    background: isSubmitting ? 'rgba(232,98,42,0.5)' : submitHover ? '#C9501E' : '#E8622A',
                    color: '#FFFFFF', fontSize: '15px', borderRadius: '8px', border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease',
                    transform: submitHover && !isSubmitting ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: submitHover && !isSubmitting ? '0 4px 12px rgba(232, 98, 42, 0.30)' : 'none',
                  }}
                >
                  {isSubmitting ? 'Envoi en cours…' : SUBMIT_LABELS[intention]}
                </button>

                <p className="font-body" style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
                  Vos informations ne sont jamais partagées.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPORT — enveloppé dans Suspense (useForm est client-only)
   ─────────────────────────────────────────────────────────────── */
export function CTASection(props: CTASectionProps) {
  return (
    <Suspense fallback={null}>
      <CTAFormInner {...props} />
    </Suspense>
  )
}
