import React from 'react'

import { RoundedDrawerNav } from './RoundedDrawerNav'
import { mockNavLinks } from './RoundedDrawerNavExample'

type GlobalLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function GlobalLayout({ children, modal }: GlobalLayoutProps) {
  return (
    <div className="box-border flex min-h-screen w-screen flex-col pb-10">
      <RoundedDrawerNav
        links={mockNavLinks}
        // navBackground="bg-neutral-950"
        // navBackground="bg-black"
        // bodyBackground="bg-neutral-950"
        gutter={false}
      >
        {modal}
        {children}
      </RoundedDrawerNav>
    </div>
  )
}
