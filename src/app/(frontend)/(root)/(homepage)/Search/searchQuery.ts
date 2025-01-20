import type { Payload } from 'payload'

export async function searchTattoos(payload: Payload, query: string | undefined) {
  if (!query) {
    return { docs: [], totalDocs: 0 }
  }

  const results = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 6,
    select: {
      title: true,
      slug: true,
      styles: true,
      image: true
    },
    pagination: false,
    where: {
      or: [
        {
          title: {
            contains: query
          }
        },
        {
          'styles.title': {
            contains: query
          }
        }
      ]
    }
  })

  return results
}
