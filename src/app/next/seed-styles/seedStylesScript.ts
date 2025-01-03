import config from '@payload-config'

import { getPayload } from 'payload'

import { stylesData } from './stylesData'

export const seedStyles = async () => {
  const payload = await getPayload({ config })

  for (const style of stylesData) {
    try {
      await payload.create({
        collection: 'style',
        data: {
          _status: 'published',
          title: style.title,
          slug: style.slug
        }
      })
      payload.logger.info(`✓ ${style.title}`)
    } catch (error) {
      payload.logger.error(`✕ ${style.title} - ${error.message}`)
    }
  }
}
