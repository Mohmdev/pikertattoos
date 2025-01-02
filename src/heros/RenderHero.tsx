import React from 'react'

import BreadcrumbsBar from '@/heros/BreadcrumbsBar'

import type { BlockProps } from '@blocks/types'
import type { Page } from '@payload-types'

import { HighImpactHero } from './HighImpact'
import { LowImpactHero } from './LowImpact'
import { MediumImpactHero } from './MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero
}

export const RenderHero: React.FC<{
  firstContentBlock?: BlockProps
  page: Page
}> = (props) => {
  const {
    firstContentBlock,
    page: {
      breadcrumbs,
      hero,
      hero: { type }
    }
  } = props

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return (
    <>
      <BreadcrumbsBar breadcrumbs={breadcrumbs} hero={hero} />
      <HeroToRender {...hero} breadcrumbs={breadcrumbs} firstContentBlock={firstContentBlock} />
    </>
  )
}
