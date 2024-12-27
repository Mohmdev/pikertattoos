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
