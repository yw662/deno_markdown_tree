import { Node } from './mod.ts'
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'

Deno.test(`It works`, () => {
  const root = Node.from(`
#Asdf

asdsaf\`asdf\`asdf[^1]
[x] asd
[ ] asd
[^1]: This is a footnote content.
`)

  const tree = {
    children: [
      {
        props: { type: 'paragraph' },
        children: [
          { props: { type: 'text', content: '#Asdf' } },
          {
            props: { type: 'paragraph' },
            children: [
              { props: { type: 'text', content: 'asdsaf' } },
              { props: { type: 'code', content: 'asdf' } },
              { props: { type: 'text', content: 'asdf' } },
              { props: { type: 'text', content: '[' } },
              { props: { type: 'text', content: '^1' } },
              { props: { type: 'text', content: ']' } },
              { props: { type: 'softBreak' } },
              { props: { type: 'text', content: '[' } },
              { props: { type: 'text', content: 'x' } },
              { props: { type: 'text', content: ']' } },
              { props: { type: 'text', content: ' asd' } },
              { props: { type: 'softBreak' } },
              { props: { type: 'text', content: '[' } },
              { props: { type: 'text', content: ' ' } },
              { props: { type: 'text', content: ']' } },
              { props: { type: 'text', content: ' asd' } },
              { props: { type: 'softBreak' } },
              { props: { type: 'text', content: '[' } },
              { props: { type: 'text', content: '^1' } },
              { props: { type: 'text', content: ']' } },
              {
                props: {
                  type: 'text',
                  content: ': This is a footnote content.'
                }
              }
            ]
          }
        ]
      }
    ]
  }
  assertEquals(root.toPlain(), tree)
})
