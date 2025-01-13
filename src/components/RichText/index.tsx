import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@utils/cn'

import { jsxConverters } from './Converters'

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = false, enableGutter = true, data } = props

  if (!data) {
    return null
  }

  return (
    <SerializedRichText // RichTextWithoutBlocks
      converters={jsxConverters({ toc: false })}
      className={cn(
        // 'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert mx-auto': enableProse
        },
        className
      )}
      data={data}
    />
  )
}

// export const RichTextWithTOC: React.FC<Props> = ({ className, content }) => {
//   const [toc, setTOC] = useState<Map<string, Heading>>(new Map())

//   const addHeading: AddHeading = useCallback(
//     (anchor, heading, type) => {
//       if (!toc.has(anchor)) {
//         const newTOC = new Map(toc)
//         newTOC.set(anchor, { type, anchor, heading })
//         setTOC(newTOC)
//       }
//     },
//     [toc]
//   )

//   if (!content) {
//     return null
//   }

//   const context: IContext = {
//     addHeading,
//     toc: Array.from(toc).reverse()
//   }

//   return (
//     <RichTextContext.Provider value={context}>
//       <SerializedRichText
//         className={['payload-richtext', className].filter(Boolean).join(' ')}
//         converters={jsxConverters({ toc: true })}
//         data={content}
//       />
//     </RichTextContext.Provider>
//   )
// }
