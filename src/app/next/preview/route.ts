import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import type { CollectionSlug, GlobalSlug, PayloadRequest } from 'payload'

// import { COOKIE_STORE_KEY } from '@constants/featureFlags'

// const payloadToken = COOKIE_STORE_KEY

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
  // const token = req.cookies.get(payloadToken)?.value
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  // I added this line
  const global = searchParams.get('global') as GlobalSlug
  const slug = searchParams.get('slug')

  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret) {
    return new Response('You are not permitted to preview this page.', { status: 403 })
  } else {
    if (!path) {
      return new Response('No paths provided.', { status: 404 })
    }

    // Modified validation - either collection OR global must be provided
    if (!collection && !global) {
      return new Response('No collection or global provided.', { status: 404 })
    }

    if (!slug) {
      return new Response('No slugs provided.', { status: 404 })
    }

    if (!path.startsWith('/')) {
      return new Response('This endpoint can only be used for internal previews', { status: 500 })
    }

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

    // You can add additional checks here to see if the user is permitted to preview this page
    if (!user) {
      draft.disable()
      return new Response('You are not permitted to preview this page.', { status: 403 })
    }

    // Verify the given slug exists
    try {
      if (collection) {
        const docs = await payload.find({
          collection,
          draft: true,
          where: {
            slug: {
              equals: slug
            }
          }
        })

        if (!docs.docs.length) {
          return new Response('Document not found.', { status: 404 })
        }
      }

      // I added this block
      if (global) {
        const globalDoc = await payload.findGlobal({
          slug: global,
          draft: true,
          depth: 1
        })

        if (!globalDoc) {
          return new Response('Global document not found.', { status: 404 })
        }
      }
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: 'Error verifying document for live preview:'
      })
      return new Response('Error verifying document.', { status: 500 })
    }

    draft.enable()

    redirect(path)
  }
}
