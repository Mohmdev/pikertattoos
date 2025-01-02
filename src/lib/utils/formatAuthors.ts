import { Post, User } from '@payload-types'

/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array from a Post.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] becomes 'Author1, Author2, and Author3'
 *
 */
export const formatAuthors = (authors: NonNullable<NonNullable<Post['authors']>[number]>[]) => {
  // Ensure we don't have any authors without a username
  const filteredAuthors = authors.filter(
    (author): author is User => typeof author !== 'number' && Boolean(author.username)
  )

  if (filteredAuthors.length === 0) return ''
  if (filteredAuthors.length === 1) return filteredAuthors[0].username
  if (filteredAuthors.length === 2)
    return `${filteredAuthors[0].username} and ${filteredAuthors[1].username}`

  return `${filteredAuthors
    .slice(0, -1)
    .map((author) => author.username)
    .join(', ')} and ${filteredAuthors[filteredAuthors.length - 1].username}`
}
