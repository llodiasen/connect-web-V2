import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * POST /api/revalidate
 * Webhook Sanity → déclenchement ISR Next.js.
 * TODO Sprint 0 (finalisation) — Valider le secret SANITY_WEBHOOK_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    // Revalidation selon le type de document Sanity
    switch (_type) {
      case 'post':
        revalidatePath('/blog')
        if (slug?.current) revalidatePath(`/blog/${slug.current}`)
        break
      case 'project':
        revalidatePath('/portfolio')
        if (slug?.current) revalidatePath(`/portfolio/${slug.current}`)
        break
      case 'service':
        revalidatePath('/services')
        if (slug?.current) revalidatePath(`/services/${slug.current}`)
        break
      case 'homepage':
        revalidatePath('/')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch {
    return NextResponse.json({ error: 'Échec de la revalidation' }, { status: 500 })
  }
}
