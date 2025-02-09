import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type CollectionSlug, type PayloadRequest, getPayload } from 'payload'

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  },
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const previewSecret = searchParams.get('previewSecret')
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')

  if (!previewSecret || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page.', {
      status: 403,
    })
  } else {
    if (!path) {
      return new Response('No path provided.', { status: 404 })
    }

    if (!collection) {
      return new Response('No collection provided.', { status: 404 })
    }

    if (!slug) {
      return new Response('No slug provided.', { status: 404 })
    }

    if (!path.startsWith('/')) {
      return new Response(
        'This endpoint can only be used for internal previews.',
        { status: 500 },
      )
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
      return new Response('Error verifying token for live preview.', {
        status: 403,
      })
    }

    const draft = await draftMode()

    // You can add additional checks here to see if the user is allowed to preview this page
    if (!user) {
      draft.disable()
      return new Response('You are not allowed to preview this page.', {
        status: 403,
      })
    }

    // Verify the given slug exists
    try {
      const docs = await payload.find({
        collection,
        draft: true,
        limit: 1,
        // pagination: false reduces overhead if you don't need totalDocs
        pagination: false,
        depth: 0,
        select: {},
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      if (!docs.docs.length) {
        return new Response('Document not found', { status: 404 })
      }
    } catch (error) {
      payload.logger.error(
        { err: error },
        'Error verifying token for live preview.',
      )
    }

    draft.enable()

    redirect(path)
  }
}
