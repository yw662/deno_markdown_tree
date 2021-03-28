export type Token =
  | {
      type: 'softBreak' | 'hardBreak' | 'Rule'
    }
  | {
      type: 'footnoteReference'
      label: string
    }
  | {
      type: 'taskListMarker'
      checked: boolean
    }
  | {
      type: 'text' | 'code' | 'html'
      content: string
    }
  | {
      type: 'startTag' | 'endTag'
      tag:
        | 'paragraph'
        | 'blockQuote'
        | 'listItem'
        | 'tableHead'
        | 'tableRow'
        | 'tableCell'
        | 'emphasis'
        | 'strong'
        | 'strikethrough'
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'heading'
      level: number
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'footnoteDefinition'
      label: string
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'list'
      kind: 'unordered'
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'list'
      kind: 'ordered'
      number: number
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'codeBlock'
      kind: 'indented'
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'codeBlock'
      kind: 'fenced'
      lang: string
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'table'
      alignment: ('none' | 'left' | 'center' | 'right')[]
    }
  | {
      type: 'startTag' | 'endTag'
      tag: 'link' | 'image'
      kind:
        | 'inline'
        | 'reference'
        | 'referenceUnknown'
        | 'collapsed'
        | 'collapsedUnknown'
        | 'shortcut'
        | 'shortcutUnknown'
        | 'autolink'
        | 'email'
      url: string
      title: string
    }

export type Props =
  | {
      type: 'text' | 'code' | 'html'
      content: string
    }
  | {
      type: 'footnoteReference'
      label: string
    }
  | {
      type: 'taskListMarker'
      checked: boolean
    }
  | {
      type:
        | 'paragraph'
        | 'blockQuote'
        | 'listItem'
        | 'tableHead'
        | 'tableRow'
        | 'tableCell'
        | 'emphasis'
        | 'strong'
        | 'strikethrough'
        | 'softBreak'
        | 'hardBreak'
        | 'Rule'
    }
  | {
      type: 'heading'
      level: number
    }
  | {
      type: 'footnoteDefinition'
      label: string
    }
  | {
      type: 'list'
      kind: 'unordered'
    }
  | {
      type: 'list'
      kind: 'ordered'
      number: number
    }
  | {
      type: 'codeBlock'
      kind: 'indented'
    }
  | {
      type: 'codeBlock'
      kind: 'fenced'
      lang: string
    }
  | {
      type: 'table'
      alignment: ('none' | 'left' | 'center' | 'right')[]
    }
  | {
      type: 'link'
      kind:
        | 'inline'
        | 'reference'
        | 'referenceUnknown'
        | 'collapsed'
        | 'collapsedUnknown'
        | 'shortcut'
        | 'shortcutUnknown'
        | 'autolink'
        | 'email'
      url: string
      title: string
    }
  | {
      type: 'image'
      kind:
        | 'inline'
        | 'reference'
        | 'referenceUnknown'
        | 'collapsed'
        | 'collapsedUnknown'
        | 'shortcut'
        | 'shortcutUnknown'
        | 'autolink'
        | 'email'
      url: string
      title: string
    }
