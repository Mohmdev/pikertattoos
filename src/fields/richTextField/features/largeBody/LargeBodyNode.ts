import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
  isHTMLElement,
} from '@payloadcms/richtext-lexical/lexical'
import { addClassNamesToElement } from '@payloadcms/richtext-lexical/lexical/utils'

import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
  Spread,
} from '@payloadcms/richtext-lexical/lexical'

export type SerializedLargeBodyNode = Spread<
  {
    type: 'largeBody'
  },
  SerializedElementNode
>

/** @noInheritDoc */
export class LargeBodyNode extends ElementNode {
  constructor({ key }: { key?: NodeKey }) {
    super(key)
  }

  static override clone(node: LargeBodyNode): LargeBodyNode {
    return new LargeBodyNode({
      key: node.__key,
    })
  }

  static override getType(): string {
    return 'largeBody'
  }

  static override importJSON(
    serializedNode: SerializedLargeBodyNode,
  ): LargeBodyNode {
    const node = $createLargeBodyNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  override canBeEmpty(): true {
    return true
  }

  override canInsertTextAfter(): true {
    return true
  }

  override canInsertTextBefore(): true {
    return true
  }
  override collapseAtStart(): true {
    const paragraph = $createParagraphNode()
    const children = this.getChildren()
    children.forEach((child) => paragraph.append(child))
    this.replace(paragraph)
    return true
  }

  override createDOM(_config: EditorConfig): HTMLElement {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const element = document.createElement('span') as any
    addClassNamesToElement(element, 'rich-text-large-body')
    return element
  }

  override exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor)

    if (element && isHTMLElement(element)) {
      if (this.isEmpty()) element.append(document.createElement('br'))

      const formatType = this.getFormatType()
      element.style.textAlign = formatType

      const direction = this.getDirection()
      if (direction) {
        element.dir = direction
      }
    }

    return {
      element,
    }
  }

  override exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: this.getType(),
    }
  }

  override insertNewAfter(
    _: RangeSelection,
    restoreSelection?: boolean,
  ): ParagraphNode {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    this.insertAfter(newBlock, restoreSelection)
    return newBlock
  }

  // Mutation

  override isInline(): false {
    return false
  }

  override updateDOM(_prevNode: LargeBodyNode, _dom: HTMLElement): boolean {
    return false
  }
}

export function $createLargeBodyNode(): LargeBodyNode {
  return $applyNodeReplacement(new LargeBodyNode({}))
}

export function $isLargeBodyNode(
  node: LexicalNode | null | undefined,
): node is LargeBodyNode {
  return node instanceof LargeBodyNode
}
