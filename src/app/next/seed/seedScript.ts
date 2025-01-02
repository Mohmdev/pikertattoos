import { Payload } from 'payload'

import { createAreas, updateAreas } from './areas/createAreas'
import { createStyles } from './styles/createStyles'
import { createTags } from './tags/createTags'

export const seedScript = async (payload: Payload): Promise<void> => {
  try {
    payload.logger.info('↪ Script initiated')

    await createAreas(payload)
    payload.logger.info('✓ Areas created.')

    await updateAreas(payload)
    payload.logger.info('✓ Parent Areas updated.')

    await createStyles(payload)
    payload.logger.info('✓ Styles created.')

    await createTags(payload)
    payload.logger.info('✓ Tags created.')

    payload.logger.info('✔ Successfully seeded all data')
  } catch (error) {
    payload.logger.error(`Seeding error: ${error}`)
    throw error
  }
}
