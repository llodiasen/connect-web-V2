import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/contact
 * Traitement du formulaire de contact via Resend.
 * TODO Sprint 2 — Implémenter la logique complète (validation Zod + envoi Resend)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation basique
    if (!body.email) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // TODO Sprint 2 — remplacer par Resend :
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from:    'Connect Web <noreply@connect-web.tech>',
    //   to:      'contact@connect-web.tech',
    //   subject: `[${body.service ?? 'contact'}] Nouvelle demande — ${body.prenom ?? ''} ${body.nom ?? body.email}`,
    //   html: `
    //     <p><strong>Intention :</strong> ${body.intention ?? '—'}</p>
    //     <p><strong>Projet :</strong> ${body.projet ?? body.message ?? '—'}</p>
    //     <p><strong>Budget :</strong> ${body.budget ?? '—'}</p>
    //     <p><strong>Délai :</strong> ${body.timeline ?? '—'}</p>
    //     <hr/>
    //     <p><strong>Prénom :</strong> ${body.prenom ?? '—'}</p>
    //     <p><strong>Nom :</strong> ${body.nom ?? '—'}</p>
    //     <p><strong>Email :</strong> ${body.email}</p>
    //     <p><strong>Téléphone :</strong> ${body.telephone ?? '—'}</p>
    //     <p><strong>Entreprise :</strong> ${body.entreprise ?? '—'}</p>
    //   `,
    // })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
