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
import { formBuilderService } from '@services/plugins/formBuilder'
import { nestedDocsPluginConfig } from '@services/plugins/nestedDocs'
import { redirectsPluginConfig } from '@services/plugins/redirects'
import { searchPluginConfig } from '@services/plugins/search'
import { seoPluginConfig } from '@services/plugins/seo'
import { vercelBlob } from '@services/plugins/storage.vercelBlob'
import { scheduledJobsService } from '@services/scheduled-jobs/config'
import { getServerSideURL } from '@utils/getURL'
import { collectionGroup, globalGroup } from '@utils/groupContent'
import { buildConfig } from 'payload'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    ...collectionGroup('Studio', [Tattoo, Area, Style, Artist]),
    ...collectionGroup('Marketing', [Pages, Posts, Categories, Tag]),
    ...collectionGroup('Resources', [Media, Assets]),
    ...collectionGroup('Accounts', [Users, UserPhotos]),
  ],
  globals: [
    ...globalGroup('Design', [HomePage, MainMenu, Footer, GlobalSettings]),
  ],
  db: vercelPostgres,
  admin: adminConfig,
  editor: basicLexical,
  email: emailAdapter,
  jobs: scheduledJobsService,
  plugins: [
    formBuilderService,
    redirectsPluginConfig,
    nestedDocsPluginConfig,
    searchPluginConfig,
    seoPluginConfig,
    vercelBlob,
  ],
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'isItASecret?',
  serverURL: getServerSideURL(),
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // cookiePrefix: `${COOKIE_PREFIX}`,
  // debug: true,
  telemetry: false,
})
