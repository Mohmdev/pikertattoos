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
