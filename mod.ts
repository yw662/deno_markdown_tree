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
          const node = Node.from(token)
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

  toPlain() {
    const ret: PlainNode = {}
    if (this.props) ret.props = this.props
    if (this.children) ret.children = this.children.map(node => node.toPlain())
    return ret
  }
}
