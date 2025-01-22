import { User } from 'src/payload-types'

import type { GlobalAfterReadHook } from 'payload'

export const populateAuthors: GlobalAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.authors) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      const authorDoc = await payload.findByID({
        id: typeof author === 'object' ? author?.id : author,
        collection: 'users',
        depth: 0,
        req
      })

      if (authorDoc) {
        authorDocs.push(authorDoc)
      }
    }

    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.username
    }))
  }

  return doc
}
