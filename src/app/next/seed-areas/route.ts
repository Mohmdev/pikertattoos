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
      // Check if area already exists
      const existingArea = await payload.find({
        collection: 'area',
        where: {
          slug: { equals: area.slug }
        }
      })

      if (existingArea.docs.length === 0) {
        await payload.create({
          collection: 'area',
          data: {
            _status: 'published',
            title: area.title,
            slug: area.slug
          }
        })
        payload.logger.info(`✓ Created area "${area.title}"`)
      } else {
        payload.logger.info(`Area "${area.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error creating area "${area.title}":`, error)
      throw error
    }
  }
}

const updateAreas = async ({ payload }): Promise<void> => {
  for (const area of areasData) {
    try {
      if (area.parent) {
        // Check if area exists
        const existingArea = await payload.find({
          collection: 'area',
          where: { slug: { equals: area.slug } }
        })

        if (!existingArea.docs.length) {
          payload.logger.warn(`Area "${area.title}" not found, skipping parent update...`)
          continue
        }

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
              id: parentId
            }
          }
        })
        payload.logger.info(`✓ Updated parent for "${area.title}"`)
      }
    } catch (error) {
      payload.logger.error(`Error updating area "${area.title}":`, error.message)
    }
  }
}
