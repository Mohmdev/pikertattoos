import { Payload } from 'payload'

import { createAreas } from './areas/createAreas'

export const seedScript = async (payload: Payload): Promise<void> => {
  try {
    payload.logger.info('↪ Script initiated')

    await createAreas(payload)
    payload.logger.info('✓ Areas')

    // await createAreas(payload)
    // payload.logger.info('✓ Areas')

    payload.logger.info('✔ Successfully seeded all data')
  } catch (error) {
    payload.logger.error('×' + error)
    throw error
  }
}
