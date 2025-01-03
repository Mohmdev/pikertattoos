import config from '@payload-config'

import { getPayload } from 'payload'

import { areasData } from './areasData'

const updateAreas = async () => {
  const payload = await getPayload({ config })

  // First, create all areas
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
      payload.logger.info(`✓ Created ${area.title}`)
    } catch (error) {
      payload.logger.error(`✕ Failed to create ${area.title} - ${error.message}`)
    }
  }

  // Then, update areas with parent relationships
  for (const area of areasData) {
    try {
      if (area.parent) {
        const existingParent = await payload.find({
          collection: 'area',
          where: { slug: { equals: area.parent.slug } }
        })

        if (!existingParent.docs.length) {
          throw new Error(`Parent area not found: ${area.parent.slug}`)
        }

        const parentId = existingParent.docs[0].id

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
        payload.logger.info(`✓ Updated parent for ${area.title}`)
      }
    } catch (error) {
      payload.logger.error(`✕ Failed to update ${area.title} - ${error.message}`)
    }
  }
}

// Call the function to run the seed script
await updateAreas()
