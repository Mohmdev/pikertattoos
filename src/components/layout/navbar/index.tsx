// import { onAuthenticatedUser } from "@/actions/auth"
// import { onGetUserGroups } from "@/actions/groups"

import Link from 'next/link'

import { CheckBadge, Logout } from '@icons'
import { MenuIcon } from 'lucide-react'
import { mockGroups, mockUser } from '@lib/data/mock-data'
import { cn } from '@utils/cn'

import { ModeToggle } from '@providers/NextTheme/mode-toggle'
import GlassSheet from '@components/global/glass-sheet'
import { UserWidget } from '@components/global/user-widget'
import { Button } from '@ui/button'

import { GroupDropDown } from './group-dropdown'

export const Navbar = async () => {
  // const user = await onAuthenticatedUser()
  // const groups = await onGetUserGroups(user.id!)
  const user = mockUser
  const groups = mockGroups

  return (
    <div className="backdrop--blur__safari fixed z-50 flex w-full items-center border-b-[1px] border-border bg-background bg-opacity-60 bg-clip-padding px-5 py-3 backdrop-blur-2xl backdrop-filter dark:border-themeDarkGray dark:bg-themeBlack">
      <div className="hidden lg:inline">
        {user.status === 200 ? (
          <GroupDropDown members={groups.members} groups={groups} />
        ) : (
          <p>Pikertattoos.</p>
        )}
      </div>

      <GlassSheet
        trigger={
          <span
            className={cn(
              'flex items-center gap-2 py-2 lg:hidden',
              'text-primary-foreground/80 hover:text-primary-foreground dark:text-foreground'
            )}
          >
            <MenuIcon className="cursor-pointer" />
            <p>Pikertattoos.</p>
          </span>
        }
      >
        <div>Content</div>
      </GlassSheet>

      <div className="hidden flex-1 justify-end gap-3 lg:flex">
        {/* <ThemeSelector /> */}
        <ModeToggle />
        <Link href={user.status === 200 ? `/group/create` : '/sign-in'}>
          <Button
            variant="outline"
            className={cn(
              'flex gap-2 rounded-xl border-border',
              'bg-foreground hover:bg-themeGray dark:border-themeGray dark:bg-themeBlack',
              'text-primary-foreground/80 hover:text-primary-foreground dark:text-foreground'
            )}
          >
            <CheckBadge />
            Create Group
          </Button>
        </Link>
        {user.status === 200 ? (
          <UserWidget image={user.image!} />
        ) : (
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="flex gap-2 rounded-2xl border-themeGray bg-themeBlack hover:bg-themeGray"
            >
              <Logout />
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
