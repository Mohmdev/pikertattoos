import { unstable_cache } from 'next/cache'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import type { Config } from '@payload-types'

type Global = keyof Config['globals']

interface GlobalOptions<T extends Global> {
  depth?: number
  select?: Config['globalsSelect'][T]
}

async function getGlobal<T extends Global>(
  slug: T,
  { depth = 0, select = {} }: GlobalOptions<T> = {}
) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    select
  })

  return global as Config['globals'][T]
}

/**
 *
 * Caching layer for global settings
 *
 * @param slug
 * @param options
 *
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobals = <T extends Global>(slug: T, options: GlobalOptions<T> = {}) =>
  unstable_cache(async () => getGlobal(slug, options), [slug], {
    tags: [`globals_${slug}`]
  })
