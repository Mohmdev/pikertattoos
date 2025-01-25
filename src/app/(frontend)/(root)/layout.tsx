import React from 'react'

import { cn } from '@utils/cn'

import { mockNavLinks } from './_nav/mockNavLinks'
import { RoundedDrawerNav } from './_nav/RoundedDrawerNav'

type GlobalLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function GlobalLayout({ children, modal }: GlobalLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        'relative box-border',
        'min-h-screen w-full max-w-[100vw]',
        'pb-10'
      )}
    >
      <RoundedDrawerNav
        links={mockNavLinks}
        // navBackground="bg-neutral-950"
        // navBackground="bg-black"
        // bodyBackground="bg-neutral-950"
        gutter={false}
      >
        {children}
        {modal}
      </RoundedDrawerNav>
    </div>
  )
}
