import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import { Area, Media, Style, Tattoo } from '@payload-types'

export const beforeSyncWithSearch: BeforeSync = async ({
  originalDoc,
  searchDoc
}: {
  originalDoc: Partial<Tattoo>
  searchDoc: DocToSync
}) => {
  const {
    doc: { relationTo: collection }
  } = searchDoc

  const { id, slug, title, style: styles, area: areas, images } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    title: title || searchDoc.title,
    image: {},
    styles: [],
    areas: []
  }

  if (images && Array.isArray(images) && images.length > 0) {
    try {
      const firstImage = images[0] as Media
      modifiedDoc.image = firstImage.id || firstImage
    } catch (error) {
      console.error(
        `Failed to map image when syncing collection '${collection}' with id: '${id}' to Search. Document will be indexed without an image. | ${error}`
      )
    }
  }

  if (styles && Array.isArray(styles) && styles.length > 0) {
    try {
      const mappedStyles = styles.map((style) => {
        const { title } = style as Style

        return {
          relationTo: 'style',
          title
        }
      })
      modifiedDoc.styles = mappedStyles
    } catch (error) {
      console.error(
        `Failed to map styles when syncing collection '${collection}' with id: '${id}' to Search. Document will be indexed without styles. | ${error}`
      )
    }
  }

  if (areas && Array.isArray(areas) && areas.length > 0) {
    try {
      const mappedAreas = areas.map((area) => {
        const { title } = area as Area

        return {
          relationTo: 'area',
          title
        }
      })
      modifiedDoc.areas = mappedAreas
    } catch (error) {
      console.error(
        `Failed to map areas when syncing collection '${collection}' with id: '${id}' to Search. Document will be indexed without areas. | ${error}`
      )
    }
  }

  return modifiedDoc
}
