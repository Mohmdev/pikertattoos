import type { GroupStateProps } from './types'

// Sample static data here
export const mockUser = {
  status: 200,
  id: 'mock-user-1',
  image: 'https://github.com/shadcn.png', // placeholder avatar
  username: 'TestUser'
}

export const mockGroups = {
  status: 200,
  groups: [
    {
      id: 'group-1',
      name: 'Design Team',
      icon: null,
      channel: [{ id: 'channel-1' }]
    },
    {
      id: 'group-2',
      name: 'Development Team',
      icon: null,
      channel: [{ id: 'channel-2' }]
    }
  ],
  members: [
    {
      Group: {
        id: 'group-3',
        name: 'Marketing Team',
        icon: null,
        channel: [{ id: 'channel-3' }]
      }
    },
    {
      Group: {
        id: 'group-4',
        name: 'Sales Team',
        icon: null,
        channel: [{ id: 'channel-4' }]
      }
    }
  ]
}

export const mockInfiniteScrollState = {
  data: [
    {
      id: '3',
      name: 'Photography Club',
      category: 'photography',
      createdAt: new Date(),
      htmlDescription: null,
      userId: 'user-3',
      thumbnail: 'https://picsum.photos/200/300',
      description: 'Photography enthusiasts',
      privacy: 'PUBLIC',
      jsonDescription: null,
      gallery: ['https://picsum.photos/200/300']
    },
    {
      id: '4',
      name: 'Digital Art',
      category: 'art',
      createdAt: new Date(),
      htmlDescription: null,
      userId: 'user-4',
      thumbnail: 'https://picsum.photos/200/300',
      description: 'Digital art community',
      privacy: 'PUBLIC',
      jsonDescription: null,
      gallery: ['https://picsum.photos/200/300']
    }
  ] as GroupStateProps[]
}

export const mockExploreGroups: GroupStateProps[] = [
  {
    id: '1',
    name: 'Tattoo Artists NYC',
    category: 'tattoo',
    createdAt: new Date(),
    htmlDescription: null,
    userId: 'user-1',
    thumbnail: 'https://picsum.photos/200/300',
    description: 'NYC based tattoo artists',
    privacy: 'PUBLIC',
    jsonDescription: null,
    gallery: ['https://picsum.photos/200/300']
  },
  {
    id: '2',
    name: 'Dark Art Collective',
    category: 'art',
    createdAt: new Date(),
    htmlDescription: null,
    userId: 'user-2',
    thumbnail: 'https://picsum.photos/200/300',
    description: 'Dark art community',
    privacy: 'PUBLIC',
    jsonDescription: null,
    gallery: ['https://picsum.photos/200/300']
  }
]
