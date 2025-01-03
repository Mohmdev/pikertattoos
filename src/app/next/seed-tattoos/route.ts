import { headers } from 'next/headers'

import config from '@payload-config'

import {
  //  createLocalReq,
  getPayload
} from 'payload'

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
    await createTattoos({ payload })
    await updateTattoos({ payload })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

const createTattoos = async ({ payload }): Promise<void> => {
  for (const tattoo of tattoosData) {
    try {
      // Check if tattoo already exists
      const existingTattoo = await payload.find({
        collection: 'tattoo',
        where: {
          slug: { equals: tattoo.slug }
        }
      })

      if (existingTattoo.docs.length === 0) {
        await payload.create({
          collection: 'tattoo',
          data: {
            _status: 'published',
            title: tattoo.title,
            slug: tattoo.slug
          }
        })
        payload.logger.info(`✓ Created tattoo "${tattoo.title}"`)
      } else {
        payload.logger.info(`Tattoo "${tattoo.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error creating tattoo "${tattoo.title}":`, error)
      throw error
    }
  }
}

const updateTattoos = async ({ payload }): Promise<void> => {
  for (const tattoo of tattoosData) {
    try {
      // Check if tattoo exists before updating
      const existingTattoo = await payload.find({
        collection: 'tattoo',
        where: { slug: { equals: tattoo.slug } }
      })

      if (!existingTattoo.docs.length) {
        payload.logger.warn(`Tattoo "${tattoo.title}" not found, skipping update...`)
        continue
      }

      // Find all relationship IDs with error checking
      const styleIds = await Promise.all(
        tattoo.style.map(async (style) => {
          const existingStyle = await payload.find({
            collection: 'style',
            where: { slug: { equals: style.slug } }
          })
          if (!existingStyle.docs.length) {
            throw new Error(`Style not found: ${style.slug}`)
          }
          return existingStyle.docs[0].id
        })
      )

      const areaIds = await Promise.all(
        tattoo.area.map(async (area) => {
          const existingArea = await payload.find({
            collection: 'area',
            where: { slug: { equals: area.slug } }
          })
          if (!existingArea.docs.length) {
            throw new Error(`Area not found: ${area.slug}`)
          }
          return existingArea.docs[0].id
        })
      )

      const tagIds = await Promise.all(
        tattoo.tags.map(async (tag) => {
          const existingTag = await payload.find({
            collection: 'tag',
            where: { slug: { equals: tag.slug } }
          })
          if (!existingTag.docs.length) {
            throw new Error(`Tag not found: ${tag.slug}`)
          }
          return existingTag.docs[0].id
        })
      )

      await payload.update({
        collection: 'tattoo',
        where: { slug: { equals: tattoo.slug } },
        data: {
          _status: 'published',
          style: styleIds,
          area: areaIds,
          tags: tagIds
        }
      })
      payload.logger.info(`✓ Updated relationships for "${tattoo.title}"`)
    } catch (error) {
      payload.logger.error(`Error updating tattoo "${tattoo.title}":`, error.message)
    }
  }
}
