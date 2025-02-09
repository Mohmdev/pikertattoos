import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type GlobalSlug, type PayloadRequest, getPayload } from 'payload'

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const previewSecret = searchParams.get('previewSecret')
  const path = searchParams.get('path')
  const global = searchParams.get('global') as GlobalSlug
  const slug = searchParams.get('slug')

  if (!previewSecret || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this global.', {
      status: 403,
    })
  } else {
    if (!path) {
      return new Response('No path provided.', { status: 404 })
    }

    if (!global) {
      return new Response('No global provided.', { status: 404 })
    }

    if (!slug) {
      return new Response('No slug provided.', { status: 404 })
    }

    let user

    try {
      user = await payload.auth({
        req: req as unknown as PayloadRequest,
        headers: req.headers,
      })
    } catch (error) {
      payload.logger.error(
        { err: error },
        'Error verifying token for live preview.',
      )
      return new Response('You are not allowed to preview this global.', {
        status: 403,
      })
    }

    const draft = await draftMode()

    if (!user) {
      draft.disable()
      return new Response('You are not allowed to preview this global.', {
        status: 403,
      })
    }

    // Verify the given slug exists
    try {
      const doc = await payload.findGlobal({
        slug: global,
        draft: true,
        depth: 0,
        select: {},
      })

      if (!doc) {
        return new Response(`Global "${global}" not found.`, { status: 404 })
      }
    } catch (error) {
      payload.logger.error(
        { err: error },
        'Error verifying token for live preview.',
      )
    }

    draft.enable()

    const editorPath = '/theme-editor'
    const finalPath = global === 'homepage' ? '/' : editorPath

    redirect(finalPath)
  }
}
