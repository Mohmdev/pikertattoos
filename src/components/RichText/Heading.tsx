'use client'

import { useEffect } from 'react'

import slugify from '@utils/slugify'

import { JumplistNode } from '@components/dynamic/Jumplist'

import { useRichText } from './context'
import { formatAnchor } from './formatAnchor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Heading: React.FC<any> = ({ node, nodesToJSX }) => {
  const children = nodesToJSX({
    nodes: node.children
  })

  const childrenText = node.children?.[0]?.text as string

  const anchor = slugify(formatAnchor(childrenText))
  const { addHeading } = useRichText()

  useEffect(() => {
    addHeading(anchor, childrenText, 'secondary')
  }, [addHeading, anchor, childrenText])

  return (
    <JumplistNode id={anchor} type={node.tag.toLowerCase()}>
      {children}
    </JumplistNode>
  )
}
