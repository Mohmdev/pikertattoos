import path from 'path'
import { fileURLToPath } from 'url'

import { Assets } from '@CMS/Assets/config'
import { Categories } from '@CMS/Categories'
import { Footer } from '@CMS/Footer/config'
import { GlobalSettings } from '@CMS/GlobalSettings/config'
import { MainMenu } from '@CMS/MainMenu/config'
import { Media } from '@CMS/Media/config'
import { Pages } from '@CMS/Pages/config'
import { UserPhotos } from '@CMS/UserMedia/config'
import { Users } from '@CMS/Users/config'
import { adminConfig } from '@services/admin/config'
import { databaseAdapter } from '@services/database/config'
import { defaultLexical } from '@services/editor/defaultLexical'
import { emailAdapter } from '@services/email/config'
import { pluginsConfig } from '@services/plugins'

import { buildConfig } from 'payload'
import sharp from 'sharp'
import { getServerSideURL } from '@utils/getURL'
import { collectionGroup, globalGroup } from '@utils/groupContent'

import { COOKIE_PREFIX } from '@constants/featureFlags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    ...collectionGroup('Content', [Pages, Categories]),
    ...collectionGroup('Uploads', [Media, Assets, UserPhotos]),
    ...collectionGroup('Settings', [Users])
  ],
  globals: [...globalGroup('Customize', [GlobalSettings, MainMenu, Footer])],
  editor: defaultLexical,
  admin: adminConfig,
  db: databaseAdapter,
  email: emailAdapter,
  plugins: [...pluginsConfig],
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  cookiePrefix: `${COOKIE_PREFIX}`,
  serverURL: getServerSideURL(),
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  // debug: true,
  telemetry: false
})
