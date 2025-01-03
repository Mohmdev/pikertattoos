import config from '@payload-config'

import { getPayload } from 'payload'

import { stylesData } from './stylesData'

const updateStyles = async () => {
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

// Call the function to run the seed script
await updateStyles()
