import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload } from 'payload'

import { tattoosData } from './tattosData'

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

    await createTattoos({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

export const createTattoos = async ({ payload, req }): Promise<void> => {
  for (const tattoo of tattoosData) {
    try {
      if (!tattoo.title) {
        throw new Error(`Tattoo title is required but was not provided`)
      }

      // Check if tattoo already exists
      const existingStyle = await payload.find({
        collection: 'tattoo',
        where: {
          // id: {
          //   equals: tattoo.id
          // },
          slug: {
            equals: tattoo.slug
          },
          title: {
            equals: tattoo.title
          }
        }
      })

      if (existingStyle.docs.length === 0) {
        await payload.create({
          req,
          collection: 'tattoo',
          data: {
            _status: 'published',
            // id: tattoo.id,
            title: tattoo.title,
            slug: tattoo.slug,
            style: tattoo.style,
            area: tattoo.area
          },
          overrideLock: true
        })
        payload.logger.info(`Created tattoo "${tattoo.title}"`)
      } else {
        payload.logger.info(`Tattoo "${tattoo.title}" already exists, skipping...`)
      }
    } catch (error) {
      throw new Error(`Failed to create tattoo "${tattoo.title}": ${error}`)
    }
  }
}
