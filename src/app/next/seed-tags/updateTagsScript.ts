import config from '@payload-config'

import { getPayload } from 'payload'

import { tagsData } from './tagsData'

const updateTags = async () => {
  const payload = await getPayload({ config })

  for (const tag of tagsData) {
    try {
      await payload.create({
        collection: 'tag',
        data: {
          _status: 'published',
          title: tag.title,
          slug: tag.slug
        }
      })
      payload.logger.info(`✓ ${tag.title}`)
    } catch (error) {
      payload.logger.error(`✕ ${tag.title} - ${error.message}`)
    }
  }
}

// Call the function to run the seed script
await updateTags()
