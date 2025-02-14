'use client'

import React, { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@utils/cn'

import { Button } from '@ui/button'

import { HamburgerButton } from './HamburgerButton'
import classes from './RoundedDrawerNav.module.scss'

type LinkType = {
  title: string
  sublinks: { title: string; href: string }[]
}

export const RoundedDrawerNav = ({
  children,
  navBackground,
  bodyBackground,
  links,
  className,
  gutter = true
}: {
  navBackground?: string
  bodyBackground?: string
  children?: ReactNode
  links: LinkType[]
  className?: string
  gutter?: boolean
}) => {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const activeSublinks = useMemo(() => {
    if (!hovered) return []
    const link = links.find((l) => l.title === hovered)

    return link ? link.sublinks : []
  }, [hovered, links])

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={cn('z-40 p-4', navBackground, className)}
      >
        <div className="flex flex-row items-start justify-between gap-12 overflow-x-hidden">
          <div className="flex flex-row items-start">
            <Link href="/">
              <Logo />
            </Link>
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>
          {/*  */}
          <div
            className={cn(
              'group',
              'hidden rounded-md p-px md:grid',
              '[background-image:linear-gradient(to_right,_rgb(255,255,255,0.45),_rgb(255,255,255,0.6),_rgb(255,255,255,0.45))]'
              //
            )}
          >
            <Button
              className={cn(
                'max-h-min items-center justify-center px-3 py-1.5',
                'rounded-md',
                'overflow-x-hidden leading-[auto]',
                'bg-indigo-600/80 group-hover:bg-indigo-600',
                'transition-colors duration-300 ease-linear'
              )}
            >
              <div className="truncate text-sm font-semibold transition-colors duration-300 ease-linear group-hover:text-neutral-50">
                <span className="text-neutral-50">Request </span>a custom design
              </div>
            </Button>
          </div>
          <HamburgerButton
            active={mobileNavOpen}
            setActive={setMobileNavOpen}
            className="block md:hidden"
          />
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={cn(classes.homepageFilter, navBackground, className)}>
        <div className={cn('relative z-50', bodyBackground, gutter ? 'rounded-3xl px-2' : '')}>
          {children}
        </div>
      </motion.main>
    </>
  )
}

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-neutral-50"
    >
      <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor="#000000"></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  )
}

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks
}: {
  links: LinkType[]
  setHovered: Dispatch<SetStateAction<string | null>>
  hovered: string | null
  activeSublinks: LinkType['sublinks']
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <TopLink key={l.title} setHovered={setHovered} title={l.title}>
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-neutral-50 transition-colors hover:text-neutral-400"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MobileLinks = ({ links, open }: { links: LinkType[]; open: boolean }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className="text-md block font-semibold text-neutral-50">{l.title}</span>
                {l.sublinks.map((sl) => (
                  <a className="text-md block text-neutral-300" href={sl.href} key={sl.title}>
                    {sl.title}
                  </a>
                ))}
              </div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const TopLink = ({
  children,
  setHovered,
  title
}: {
  children: string
  setHovered: Dispatch<SetStateAction<null | string>>
  title: string
}) => (
  <span
    onMouseEnter={() => setHovered(title)}
    className="cursor-pointer text-neutral-50 transition-colors hover:text-neutral-400"
  >
    {children}
  </span>
)
