import type { GlobalBeforeChangeHook } from 'payload'

export const populatePublishedAt: GlobalBeforeChangeHook = ({ data, req }) => {
  if (req.data && !req.data.publishedAt) {
    const now = new Date()
    return {
      ...data,
      publishedAt: now
    }
  }

  return data
}
