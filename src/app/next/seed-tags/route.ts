import { headers } from 'next/headers'

import config from '@payload-config'

import { getPayload } from 'payload'

import { tagsData } from './tagsData'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })
  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    await createTags({ payload })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

export const createTags = async ({ payload }): Promise<void> => {
  for (const tag of tagsData) {
    try {
      await payload.create({
        overrideLock: true,
        collection: 'tag',
        data: {
          _status: 'published',
          // id: tag.id,
          title: tag.title,
          slug: tag.slug
        }
      })
      payload.logger.info(`✓ ${tag.title}`)
    } catch (error) {
      payload.logger.error(`✕ ${tag.title}`)
      throw new Error(`${tag.title} - ${error}`)
    }
  }
}
