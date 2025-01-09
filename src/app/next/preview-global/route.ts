import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import type { GlobalSlug, PayloadRequest } from 'payload'

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const global = searchParams.get('global') as GlobalSlug
  const slug = searchParams.get('slug')

  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret) {
    return new Response('You are not permitted to preview this page.', { status: 403 })
  } else {
    if (!path) {
      return new Response('No paths provided.', { status: 404 })
    }

    if (!global) {
      return new Response('No globals provided.', { status: 404 })
    }

    if (!slug) {
      return new Response('No slugs provided.', { status: 404 })
    }

    // if (!path.startsWith('/')) {
    //   return new Response('This endpoint can only be used for internal previews', { status: 500 })
    // }

    let user

    try {
      user = await payload.auth({
        req: req as unknown as PayloadRequest,
        headers: req.headers
      })
    } catch (error) {
      payload.logger.error({ err: error }, 'Error verifying token for live preview.')
      return new Response('You are not permitted to preview this page.', { status: 403 })
    }

    const draft = await draftMode()

    if (!user) {
      draft.disable()
      return new Response('You are not permitted to preview this page.', { status: 403 })
    }

    // Verify the given slug exists
    try {
      const doc = await payload.findGlobal({
        slug: global,
        draft: true,
        depth: 0,
        select: {}
      })

      if (!doc) {
        return new Response(`Global "${global}" not found`, { status: 404 })
      }
    } catch (error) {
      payload.logger.error({ err: error }, 'Error verifying token for live preview')
    }

    draft.enable()

    const finalPath = global === 'homepage' ? '/' : path
    redirect(finalPath)
  }
}
