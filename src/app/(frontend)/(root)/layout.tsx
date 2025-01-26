import React from 'react'

import { cn } from '@utils/cn'

import { mockNavLinks } from './_nav/mockNavLinks'
import { RoundedDrawerNav } from './_nav/RoundedDrawerNav'
import classes from './layout.module.scss'

type GlobalLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function GlobalLayout({ children, modal }: GlobalLayoutProps) {
  const noiseProperties = {
    enable: true,
    size: 9,
    opacity: 0.03
  }

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
      {noiseProperties.enable && (
        <div
          className="absolute inset-0 m-0"
          style={
            {
              '--noise-size': `${noiseProperties.size}rem`,
              '--noise-opacity': noiseProperties.opacity
            } as React.CSSProperties
          }
        >
          <div className={classes.noiseBackground} />
        </div>
      )}
    </div>
  )
}
