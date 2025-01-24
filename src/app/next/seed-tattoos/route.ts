import { headers } from 'next/headers'

import config from '@payload-config'

import { getPayload } from 'payload'

import type { Payload } from 'payload'

import { fetchImageByURL } from './fetchFile'
import { tattoosData } from './tattosData'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload: Payload = await getPayload({ config })
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

const createTattoos = async ({ payload }: { payload: Payload }): Promise<void> => {
  for (const tattoo of tattoosData) {
    try {
      const existingTattoo = await payload.find({
        collection: 'tattoo',
        where: {
          slug: { equals: tattoo.slug }
        }
      })

      if (existingTattoo.docs.length === 0) {
        // Add null check even though we know data exists
        const firstImage = tattoo.images[0]
        if (!firstImage) {
          throw new Error(`No image found for tattoo "${tattoo.title}"`)
        }

        const imageBuffer = await fetchImageByURL(firstImage.url)
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: firstImage.alt || tattoo.title,
            width: firstImage.width,
            height: firstImage.height
          },
          file: imageBuffer
        })

        const sanitizedDescription = tattoo.richTextContent
          ? {
              ...tattoo.richTextContent,
              root: {
                ...tattoo.richTextContent.root,
                version: 1,
                children: tattoo.richTextContent.root.children.map((child) => ({
                  ...child,
                  version: 1
                }))
              }
            }
          : null

        await payload.create({
          collection: 'tattoo',
          data: {
            _status: 'published',
            title: tattoo.title,
            slug: tattoo.slug,
            images: [mediaDoc.id],
            richTextContent: sanitizedDescription
          }
        })
        payload.logger.info(`✓ Created tattoo "${tattoo.title}"`)
      } else {
        payload.logger.info(`Tattoo "${tattoo.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error creating tattoo "${tattoo.title}":`, error)
    }
  }
}

const updateTattoos = async ({ payload }: { payload: Payload }): Promise<void> => {
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
          return existingStyle.docs[0]?.id
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
          return existingArea.docs[0]?.id
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
          return existingTag.docs[0]?.id
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
      payload.logger.error(`Error updating tattoo "${tattoo.title}":`, error)
    }
  }
}
