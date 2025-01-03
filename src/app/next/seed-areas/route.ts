import { headers } from 'next/headers'

import config from '@payload-config'

import { getPayload } from 'payload'

import { areasData } from './areasData'

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
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    // const payloadReq = await createLocalReq({ user }, payload)

    await createAreas({ payload })
    await updateAreas({ payload })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

const createAreas = async ({ payload }): Promise<void> => {
  for (const area of areasData) {
    try {
      await payload.create({
        collection: 'area',
        data: {
          _status: 'published',
          title: area.title,
          slug: area.slug
        }
      })
      payload.logger.info(`✓ ${area.title}`)
    } catch (error) {
      payload.logger.info(`✕ ${area.title}`)
      throw new Error(`${area.title} - ${error}`)
    }
  }
}

const updateAreas = async ({ payload }): Promise<void> => {
  for (const area of areasData) {
    try {
      if (area.parent) {
        // Find parent area ID
        const existingParent = await payload.find({
          collection: 'area',
          where: { slug: { equals: area.parent.slug } }
        })

        if (!existingParent.docs.length) {
          throw new Error(`Parent area not found: ${area.parent.slug}`)
        }

        const parentId = existingParent.docs[0].id

        // Update area with parent relationship
        await payload.update({
          collection: 'area',
          where: { slug: { equals: area.slug } },
          data: {
            _status: 'published',
            parent: {
              // slug: area.parent.slug,
              id: parentId
            }
          }
        })
        payload.logger.info(`✓ Updated parent for ${area.title}`)
      }
    } catch (error) {
      payload.logger.error(`✕ Failed to update ${area.title} - ${error.message}`)
    }
  }
}
