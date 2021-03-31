import * as MD from 'https://deno.land/x/rusty_markdown/mod.ts'
import type { Props, Token } from './d.ts'

type PlainNode = {
  children?: PlainNode[]
  props?: Props
}

export class Node {
  parent: Node
  children?: Node[]
  props?: Props

  constructor(props?: Props, parent?: Node) {
    this.props = props
    this.parent = parent ?? this
  }

  static from(src: string | Token, parent?: Node) {
    if (typeof src === 'string') {
      const root = new Node(undefined, parent)
      let crn = root
      for (const token of MD.parse(src)) {
        if (token.type === 'endTag') {
          crn = crn.parent
        } else {
          const node = Node.from(token, crn)
          crn.children ? crn.children.push(node) : (crn.children = [node])
          if (token.type === 'startTag') crn = node
        }
      }
      return root
    } else {
      if (src.type === 'startTag') {
        const { type: _, tag: type, ...rest } = src
        return new Node(<Props>{ type, ...rest }, parent)
      } else if (src.type !== 'endTag') {
        return new Node(<Props>src, parent)
      } else {
        throw 'endTag token does not mean a Node'
      }
    }
  }

  static HTMLHelper(watcher?: (node: Node) => unknown) {
    return (node: Node, type: 'html' | 'xml') => {
      if (watcher) watcher(node)
      const props = node.props
      if (!props) {
        return { tag: type, closing: false }
      } else if (props.type === 'softBreak') {
        return { tag: `br`, closing: true }
      } else if (props.type === 'text' || props.type === 'html') {
        return props.content
      } else if (props.type === 'code') {
        return `<code>${props.content}</code>`
      } else if (props.type === 'heading') {
        return { tag: `h${props.level}`, closing: false }
      } else if (props.type === 'paragraph') {
        return { tag: `p`, closing: false }
      } else if (props.type === 'list') {
        return { tag: props.kind === 'ordered' ? 'ol' : 'ul', closing: false }
      } else if (props.type === 'listItem') {
        return { tag: `li`, closing: false }
      } else if (props.type === 'tableHead') {
        return { tag: `th`, closing: false }
      } else if (props.type === 'tableRow') {
        return { tag: `fr`, closing: false }
      } else if (props.type === 'tableCell') {
        return { tag: `td`, closing: false }
      } else if (props.type === 'link') {
        return { tag: `a`, attr: { href: props.url }, closing: false }
      } else if (props.type === 'image') {
        return { tag: `img`, attr: { src: props.url }, closing: false }
      } else {
        const { type: tag, ...attr } = props
        return { tag, attr, closing: false }
      }
    }
  }

  xml(
    type: 'html' | 'xml',
    helper: (
      node: Node,
      type: 'html' | 'xml'
    ) => { tag: string; attr?: any; closing: boolean } | string
  ): string {
    const info = helper(this, type)
    if (typeof info === 'string') {
      return info
    } else {
      const attr_str = info.attr
        ? ' ' +
          Object.keys(info.attr)
            .map(name => `${name}="${info.attr[name].replaceAll('"', '\\"')}"`)
            .join(' ')
        : ''
      if (info.closing) {
        return `<${info.tag}${attr_str}${type !== 'html' ? '/' : ''}>`
      } else {
        return `<${info.tag}${attr_str}>${
          this.children?.map(node => node.xml(type, helper)).join('') ?? ''
        }</${info.tag}>`
      }
    }
  }

  plain() {
    const ret: PlainNode = {}
    if (this.props) ret.props = this.props
    if (this.children) ret.children = this.children.map(node => node.plain())
    return ret
  }
}
