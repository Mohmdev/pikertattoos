import config from '@payload-config'

import { getPayload } from 'payload'

import { clearDatabase } from './reset-db/clearDatabaseScript'
import { seedAreas } from './seed-areas/seedAreasScript'
import { seedStyles } from './seed-styles/seedStylesScript'
import { seedTags } from './seed-tags/seedTagsScript'
import { seedTattoos } from './seed-tattoos/seedTattoosScript'

const seedAll = async () => {
  const payload = await getPayload({ config })

  try {
    payload.logger.info('🌱 Starting database seeding...')

    payload.logger.info('\n🗑️ Clearing existing database...')
    await clearDatabase()
    payload.logger.info('✅ Database cleared successfully')

    payload.logger.info('\n📍 Seeding Areas...')
    await seedAreas()
    payload.logger.info('✅ Areas seeded successfully')

    payload.logger.info('\n🎨 Seeding Styles...')
    await seedStyles()
    payload.logger.info('✅ Styles seeded successfully')

    payload.logger.info('\n🏷️ Seeding Tags...')
    await seedTags()
    payload.logger.info('✅ Tags seeded successfully')

    payload.logger.info('\n💉 Seeding Tattoos...')
    await seedTattoos()
    payload.logger.info('✅ Tattoos seeded successfully')

    payload.logger.info('\n✨ All data seeded successfully!')
  } catch (error) {
    payload.logger.error(`\n❌ Error seeding data: ${error.message}`)
    throw error
  }
}

// Run the master seed script
await seedAll()
