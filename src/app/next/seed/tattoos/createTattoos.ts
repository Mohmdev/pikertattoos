import { Payload } from 'payload'

import { tattoosData } from './tattosData'

export const createStyles = async (payload: Payload): Promise<void> => {
  for (const tattoo of tattoosData) {
    try {
      if (!tattoo.title) {
        throw new Error(`Tattoo title is required but was not provided`)
      }

      // Check if tattoo already exists
      const existingStyle = await payload.find({
        collection: 'tattoo',
        where: {
          // id: {
          //   equals: tattoo.id
          // },
          slug: {
            equals: tattoo.slug
          },
          title: {
            equals: tattoo.title
          }
        }
      })

      if (existingStyle.docs.length === 0) {
        await payload.create({
          collection: 'tattoo',
          data: {
            _status: 'published',
            // id: tattoo.id,
            title: tattoo.title,
            slug: tattoo.slug,
            style: tattoo.style,
            area: tattoo.area
          }
        })
        payload.logger.info(`Created tattoo "${tattoo.title}"`)
      } else {
        payload.logger.info(`Tattoo "${tattoo.title}" already exists, skipping...`)
      }
    } catch (error) {
      throw new Error(`Failed to create tattoo "${tattoo.title}": ${error}`)
    }
  }
}
