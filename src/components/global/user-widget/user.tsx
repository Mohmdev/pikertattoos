'use client'

import Link from 'next/link'

import { Logout, Settings } from '@icons'

// import { onOffline } from '@/redux/slices/online-member-slice'
// import { AppDispatch } from '@/redux/store'

import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import { DropDown } from '@components/global/drop-down'

type UserWidgetProps = {
  image: string
  groupid?: string
  userid?: string
}

export const UserAvatar = ({
  image,
  groupid
  //  userid
}: UserWidgetProps) => {
  // const { signOut } = useClerk()

  // const untrackPresence = async () => {
  //   await supabaseClient.channel('tracking').untrack()
  // }

  // const dispatch: AppDispatch = useDispatch()

  // const onLogout = async () => {
  //   untrackPresence()
  //   dispatch(onOffline({ members: [{ id: userid! }] }))
  //   signOut({ redirectUrl: '/' })
  // }

  return (
    <DropDown
      title="Account"
      trigger={
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      }
    >
      <Link href={`/group/${groupid}/settings`} className="flex gap-x-2 px-2">
        <Settings /> Settings
      </Link>
      <Button
        // onClick={onLogout}
        variant="ghost"
        className="flex gap-x-3 px-2 justify-start w-full"
      >
        <Logout />
        Logout
      </Button>
    </DropDown>
  )
}