import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload } from 'payload'

import { stylesData } from './stylesData'

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
    const payloadReq = await createLocalReq({ user }, payload)

    await createStyles({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

const createStyles = async ({ payload, req }): Promise<void> => {
  for (const style of stylesData) {
    try {
      // Check if style already exists
      const existingStyle = await payload.find({
        collection: 'style',
        where: {
          slug: { equals: style.slug }
        }
      })

      if (existingStyle.docs.length === 0) {
        await payload.create({
          req,
          collection: 'style',
          data: {
            _status: 'published',
            title: style.title,
            slug: style.slug
          },
          overrideLock: true
        })
        payload.logger.info(`✓ Created style "${style.title}"`)
      } else {
        payload.logger.info(`Style "${style.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error creating style "${style.title}":`, error)
      throw error
    }
  }
}
