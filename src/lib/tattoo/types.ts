export type CategoryListProps = {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

export type TattooItemProps = {
  id: string
  name: string
  category: string
  createdAt: Date
  htmlDescription: string | null
  userId: string
  thumbnail: string | null
  description: string | null
  privacy: 'PUBLIC' | 'PRIVATE'
  jsonDescription: string | null
  gallery: string[]
}
