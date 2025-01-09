import config from '@payload-config'

import { getPayload } from 'payload'

import type { CollectionSlug, PayloadRequest } from 'payload'

const collections: CollectionSlug[] = [
  'tattoo',
  'tag',
  'style',
  'artist',
  'area',
  'search'
  // 'media',
  // 'pages',
  // 'posts',
  // 'forms',
  // 'form-submissions',
]
export const clearDatabase = async () => {
  const payload = await getPayload({ config })

  // Create minimal mock headers
  const req: Partial<PayloadRequest> = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  try {
    payload.logger.info('↪ Script initiated')

    payload.logger.info(`— Clearing collections and globals...`)
    await Promise.all(
      collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} }))
    )

    await Promise.all(
      collections
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map((collection) => payload.db.deleteVersions({ collection, req, where: {} }))
    )

    payload.logger.info('✓ Successfully cleared all data')
  } catch (error) {
    payload.logger.info(`Script failed.`)
    throw error
  }
}
