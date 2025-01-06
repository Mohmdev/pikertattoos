import config from '@payload-config'

import { getPayload } from 'payload'

import type { Footer, GlobalSetting, Homepage, MainMenu } from '@payload-types'

export const fetchGlobals = async (): Promise<{
  footer: Footer
  mainMenu: MainMenu
  homepage: Homepage
  globalSettings: GlobalSetting
}> => {
  const payload = await getPayload({ config })
  const mainMenu = await payload.findGlobal({
    slug: 'main-menu',
    depth: 1
  })
  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1
  })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1
  })
  const globalSettings = await payload.findGlobal({
    slug: 'global-settings',
    depth: 1
  })

  return {
    footer,
    mainMenu,
    homepage,
    globalSettings
  }
}
