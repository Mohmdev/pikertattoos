export type groups =
  | {
      group: {
        channel: {
          id: string
        }[]
        id: string
        name: string
        icon: string | null
      }[]
      membership: {
        Group: {
          channel: {
            id: string
          }[]
          id: string
          name: string
          icon: string | null
        } | null
      }[]
    }
  | undefined

export type members = {
  members?:
    | {
        Group: {
          channel: {
            id: string
          }[]
          id: string
          name: string
          icon: string | null
        } | null
      }[]
    | undefined
}

export type user =
  | {
      status: number
      id: string
      image: string
      username: string
    }
  | undefined

export type GroupStateProps = {
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
export type useGroupList = {
  groups: GroupStateProps[]
  status: number
}
