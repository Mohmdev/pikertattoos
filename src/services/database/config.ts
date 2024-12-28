// import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import type { Config } from 'payload'

export const databaseAdapter: Config['db'] = vercelPostgresAdapter({
  forceUseVercelPostgres: true,
  migrationDir: './src/services/database/migrations'
})

// export const databaseAdapter: Config['db'] = postgresAdapter({
//   pool: {
//     connectionString: process.env.POSTGRES_URI
//   },

//   // prodMigrations: migrations,
//   migrationDir: './src/services/database/migrations'
// })
