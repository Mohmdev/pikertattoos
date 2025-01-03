import config from '@payload-config'

import { getPayload } from 'payload'

import { tattoosData } from './tattosData'

const updateTattoos = async () => {
  const payload = await getPayload({ config })

  for (const tattoo of tattoosData) {
    try {
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
      payload.logger.info(`✓ ${tattoo.title}`)
    } catch (error) {
      payload.logger.error(`✕ ${tattoo.title} - ${error.message}`)
    }
  }
}

// Call the function here to run your seed script
await updateTattoos()
