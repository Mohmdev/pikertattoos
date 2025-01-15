import { RoundedDrawerNav } from './RoundedDrawerNav'

export const RoundedDrawerNavExample = () => {
  return (
    <div className="bg-neutral-950">
      <RoundedDrawerNav
        links={mockNavLinks}
        navBackground="bg-neutral-950"
        bodyBackground="bg-white"
      >
        <div className="flex flex-col items-center justify-center px-12 py-32">
          <p className="text-center">Your hero section content goes here {':)'}</p>
        </div>
      </RoundedDrawerNav>
    </div>
  )
}

export const mockNavLinks = [
  {
    title: 'Product',
    sublinks: [
      {
        title: 'Issues',
        href: '#'
      },
      {
        title: 'Kanban',
        href: '#'
      },
      {
        title: 'Gantt',
        href: '#'
      },
      {
        title: 'Mind Maps',
        href: '#'
      }
    ]
  },
  {
    title: 'Solutions',
    sublinks: [
      {
        title: 'Product Management',
        href: '#'
      },
      {
        title: 'Marketing',
        href: '#'
      },
      {
        title: 'IT',
        href: '#'
      }
    ]
  },
  {
    title: 'Documentation',
    sublinks: [
      {
        title: 'API Docs',
        href: '#'
      },
      {
        title: 'University',
        href: '#'
      }
    ]
  },
  {
    title: 'Media',
    sublinks: [
      {
        title: 'Videos',
        href: '#'
      },
      {
        title: 'Socials',
        href: '#'
      },
      {
        title: 'Blog',
        href: '#'
      }
    ]
  },
  {
    title: 'Pricing',
    sublinks: [
      {
        title: 'Startup',
        href: '#'
      },
      {
        title: 'Smalls Business',
        href: '#'
      },
      {
        title: 'Enterprise',
        href: '#'
      }
    ]
  }
]
