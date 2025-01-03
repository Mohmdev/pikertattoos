import { Payload } from 'payload'

import { tagsData } from './tagsData'

export const createTags = async (payload: Payload): Promise<void> => {
  for (const tag of tagsData) {
    try {
      await payload.create({
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
