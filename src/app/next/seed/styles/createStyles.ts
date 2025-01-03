import { Payload } from 'payload'

import { stylesData } from './stylesData'

export const createStyles = async (payload: Payload): Promise<void> => {
  for (const style of stylesData) {
    try {
      await payload.create({
        collection: 'style',
        data: {
          _status: 'published',
          // id: style.id,
          title: style.title,
          slug: style.slug
        }
      })
      payload.logger.info(`✓ ${style.title}`)
    } catch (error) {
      payload.logger.error(`✕ ${style.title}`)
      throw new Error(`${style.title} - ${error}`)
    }
  }
}
