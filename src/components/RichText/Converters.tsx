import { BannerBlockContent } from '@blocks/BannerBlock/BannerBlockContent'
import { MediaBlock } from '@blocks/MediaBlock'

import type { Reference } from '@components/types'
import type { SerializedLabelNode } from '@fields/richTextField/features/label/LabelNode'
import type { SerializedLargeBodyNode } from '@fields/richTextField/features/largeBody/LargeBodyNode'
import type {
  BannerBlock as BannerBlockProps,
  BrBlock as BrBlockProps,
  CommandLineBlock,
  MediaBlock as MediaBlockProps,
  UploadBlock
} from '@payload-types'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { CMSLink } from '@components/dynamic/CMSLink/advanced'
import { CommandLine } from '@components/dynamic/CommandLine'
import { Label } from '@components/dynamic/Label'
import { LargeBody } from '@components/dynamic/LargeBody'

import { UploadBlockImage } from '../../blocks/UploadBlock'
import { Heading as HeadingComponent } from './Heading'
import RichTextUpload from './Upload'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      BannerBlockProps | BrBlockProps | MediaBlockProps | CommandLineBlock | UploadBlock
    >
  | SerializedLabelNode
  | SerializedLargeBodyNode

export const jsxConverters: (args: { toc?: boolean }) => JSXConvertersFunction<NodeTypes> =
  ({ toc }) =>
  ({ defaultConverters }) => {
    const converters: JSXConverters<NodeTypes> = {
      ...defaultConverters,
      blocks: {
        banner: ({ node }) => {
          return (
            <BannerBlockContent
              richTextContent={node.fields.bannerFields.richTextContent}
              bannerType={node.fields.bannerFields.bannerType}
            />
          )
        },
        br: () => <br />,
        mediaBlock: ({ node }) => {
          return (
            <MediaBlock
              mediaBlockFields={node.fields.mediaBlockFields}
              disableGutter={true}
              padding={{
                top: 'small',
                bottom: 'small'
              }}
              blockType={node.fields.blockType}
            />
          )
        },
        commandLine: ({ node }) => {
          const { command } = node.fields
          if (command) {
            return <CommandLine command={command} lexical />
          }
          return null
        },
        upload: ({ node }) => {
          return (
            <UploadBlockImage
              alt={node.fields.alt ?? undefined}
              caption={node.fields.caption ?? undefined}
              src={node.fields.src}
            />
          )
        }
      },
      label: ({ node, nodesToJSX }) => {
        return <Label>{nodesToJSX({ nodes: node.children })}</Label>
      },
      largeBody: ({ node, nodesToJSX }) => {
        return <LargeBody>{nodesToJSX({ nodes: node.children })}</LargeBody>
      },
      link: ({ node, nodesToJSX }) => {
        const fields = node.fields

        return (
          <CMSLink
            newTab={Boolean(fields?.newTab)}
            reference={fields.doc as Reference}
            type={fields.linkType === 'internal' ? 'reference' : 'custom'}
            url={fields.url}
          >
            {nodesToJSX({ nodes: node.children })}
          </CMSLink>
        )
      },
      upload: ({ node }) => {
        return <RichTextUpload node={node} />
      }
    }

    if (toc) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      converters.heading = HeadingComponent as any
    }

    return converters
  }
