import { Payload } from 'payload'

import stylesJson from './styles.json'

type Style = {
  title?: string
  slug: string
}

const stylesData: Style[] = stylesJson.docs

export const createStyles = async (payload: Payload): Promise<void> => {
  for (const style of stylesData) {
    try {
      if (!style.title) {
        throw new Error(`Style title is required but was not provided`)
      }

      // Check if style already exists
      const existingStyle = await payload.find({
        collection: 'style',
        where: {
          title: {
            equals: style.title
          }
        }
      })

      if (existingStyle.docs.length === 0) {
        await payload.create({
          collection: 'style',
          overrideAccess: true,
          data: {
            _status: 'published',
            title: style.title,
            slug: style.slug
          }
        })
        payload.logger.info(`Created style "${style.title}"`)
      } else {
        payload.logger.info(`Style "${style.title}" already exists, skipping...`)
      }
    } catch (error) {
      throw new Error(`Failed to create style "${style.title}": ${error}`)
    }
  }
}
