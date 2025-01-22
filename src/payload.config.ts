import path from 'path'
import { fileURLToPath } from 'url'

import { Categories } from '@CMS/Blog/categories.config'
import { Posts } from '@CMS/Blog/posts.config'
import { Footer } from '@CMS/Footer/config'
import { GlobalSettings } from '@CMS/GlobalSettings/config'
import { HomePage } from '@CMS/HomePage/config'
import { MainMenu } from '@CMS/MainMenu/config'
import { Pages } from '@CMS/Pages/config'
import { Area } from '@CMS/Studio/Area'
import { Artist } from '@CMS/Studio/Artist'
import { Style } from '@CMS/Studio/Style'
import { Tag } from '@CMS/Studio/Tag'
import { Tattoo } from '@CMS/Studio/Tattoo'
import { Assets } from '@CMS/Uploads/config.Assets'
import { Media } from '@CMS/Uploads/config.Media'
import { UserPhotos } from '@CMS/Uploads/config.UserPhotos'
import { Users } from '@CMS/Users/config'
import { adminConfig } from '@services/admin/config'
import { vercelPostgres } from '@services/database/config.vercelPostgres'
import { basicLexical } from '@services/editor/basicLexical'
import { emailAdapter } from '@services/email/config'
import { jobsConfig } from '@services/jobs/config'
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
    ...collectionGroup('Studio Content', [Tattoo, Area, Style, Artist, Tag]),
    ...collectionGroup('Site Content', [Pages, Posts, Categories]),
    ...collectionGroup('Uploads', [Media, Assets, UserPhotos]),
    ...collectionGroup('Settings', [Users])
  ],
  globals: [...globalGroup('Customize', [HomePage, MainMenu, Footer, GlobalSettings])],
  editor: basicLexical,
  admin: adminConfig,
  db: vercelPostgres,
  email: emailAdapter,
  sharp,
  plugins: [...pluginsConfig],
  jobs: jobsConfig,
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
