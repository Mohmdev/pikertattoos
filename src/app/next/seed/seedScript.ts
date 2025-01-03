import { Payload } from 'payload'

import type { PayloadRequest } from 'payload'

import { createAreas, updateAreas } from './areas/createAreas'
import { createStyles } from './styles/createStyles'
import { createTags } from './tags/createTags'

export const seedScript = async ({
  payload,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    payload.logger.info('↪ Script initiated')

    payload.logger.info('Creating Areas...')
    await createAreas(payload)
    payload.logger.info('Adding Parent Areas...')
    await updateAreas(payload)
    payload.logger.info('Creating Styles...')
    await createStyles(payload)
    payload.logger.info('Creating Tags...')
    await createTags(payload)

    payload.logger.info('✓ Successfully seeded all data')
  } catch (error) {
    payload.logger.info(`Seeding failed.`)
    throw error
  }
}
