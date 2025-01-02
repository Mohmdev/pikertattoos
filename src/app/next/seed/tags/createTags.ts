import { Payload } from 'payload'

import tagsJson from './tags.json'

type Tag = {
  title?: string
  slug: string
}

const tagsData: Tag[] = tagsJson.docs

export const createTags = async (payload: Payload): Promise<void> => {
  for (const tag of tagsData) {
    try {
      if (!tag.title) {
        throw new Error(`Tag title is required but was not provided`)
      }

      // Check if tag already exists
      const existingTag = await payload.find({
        collection: 'tag',
        where: {
          title: {
            equals: tag.title
          }
        }
      })

      if (existingTag.docs.length === 0) {
        await payload.create({
          collection: 'tag',
          overrideAccess: true,
          data: {
            _status: 'published',
            title: tag.title,
            slug: tag.slug
          }
        })
        payload.logger.info(`Created tag "${tag.title}"`)
      } else {
        payload.logger.info(`Tag "${tag.title}" already exists, skipping...`)
      }
    } catch (error) {
      throw new Error(`Failed to create tag "${tag.title}": ${error}`)
    }
  }
}
