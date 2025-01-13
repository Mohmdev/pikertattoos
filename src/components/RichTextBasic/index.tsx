import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks
} from '@payloadcms/richtext-lexical/react'
import { MediaBlock } from '@blocks/MediaBlock'

import { cn } from '@utils/cn'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps
} from '@payload-types'

import { internalDocToHref } from './internalDocToHref'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    // banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        {...node.fields}
        disableGutter={true}
        disableInnerContainer={true}
        imgClassName="m-0"
        className="col-span-3 col-start-1"
        captionClassName="mx-auto max-w-[48rem]"
      />
    )
    // code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    // cta: ({ node }) => <CallToActionBlock {...node.fields} />
  }
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert mx-auto': enableProse
        },
        className
      )}
      {...rest}
    />
  )
}
