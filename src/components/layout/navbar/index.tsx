// import { onAuthenticatedUser } from "@/actions/auth"
// import { onGetUserGroups } from "@/actions/groups"

import Link from 'next/link'

import { CheckBadge, Logout } from '@icons'
import { MenuIcon } from 'lucide-react'

import { ModeToggle } from '@providers/NextTheme/mode-toggle'
import { cn } from '@utils/cn'

import { Button } from '@ui/button'
import GlassSheet from '@components/global/glass-sheet'
import { UserWidget } from '@components/global/user-widget'

import { GroupDropDown } from './group-dropdown'
import { mockGroups, mockUser } from './mock-data'

export const Navbar = async () => {
  // const user = await onAuthenticatedUser()
  // const groups = await onGetUserGroups(user.id!)
  const user = mockUser
  const groups = mockGroups

  return (
    <div className="w-full flex px-5 py-3 items-center bg-background dark:bg-themeBlack border-b-[1px] border-border dark:border-themeDarkGray fixed z-50  bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60">
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
              'lg:hidden flex items-center gap-2 py-2',
              'text-primary-foreground/80 dark:text-foreground hover:text-primary-foreground'
            )}
          >
            <MenuIcon className="cursor-pointer" />
            <p>Pikertattoos.</p>
          </span>
        }
      >
        <div>Content</div>
      </GlassSheet>

      <div className="flex-1 lg:flex hidden justify-end gap-3">
        {/* <ThemeSelector /> */}
        <ModeToggle />
        <Link href={user.status === 200 ? `/group/create` : '/sign-in'}>
          <Button
            variant="outline"
            className={cn(
              'flex gap-2 border-border rounded-xl',
              'dark:bg-themeBlack bg-foreground dark:border-themeGray hover:bg-themeGray',
              'text-primary-foreground/80 dark:text-foreground hover:text-primary-foreground'
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
              className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
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
