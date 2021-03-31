import { Node } from './mod.ts'
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'

Deno.test(`It works`, () => {
  const root = Node.from(`
# Asdf

asdsaf\`asdf\`asdf[^1]
[x] asd

[ ] asd
[^1]: This is a footnote content.

# B

C
`)

  const tree = {
    children: [
      {
        props: { type: 'heading', level: 1 },
        children: [{ props: { type: 'text', content: 'Asdf' } }]
      },
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
          { props: { type: 'text', content: ' asd' } }
        ]
      },
      {
        props: { type: 'paragraph' },
        children: [
          { props: { type: 'text', content: '[' } },
          { props: { type: 'text', content: ' ' } },
          { props: { type: 'text', content: ']' } },
          { props: { type: 'text', content: ' asd' } },
          { props: { type: 'softBreak' } },
          { props: { type: 'text', content: '[' } },
          { props: { type: 'text', content: '^1' } },
          { props: { type: 'text', content: ']' } },
          { props: { type: 'text', content: ': This is a footnote content.' } }
        ]
      },
      {
        props: { type: 'heading', level: 1 },
        children: [{ props: { type: 'text', content: 'B' } }]
      },
      {
        props: { type: 'paragraph' },
        children: [{ props: { type: 'text', content: 'C' } }]
      }
    ]
  }
  assertEquals(
    root.xml('html', Node.HTMLHelper()),
    '<html><h1>Asdf</h1><p>asdsaf<code>asdf</code>asdf[^1]<br>[x] asd</p><p>[ ] asd<br>[^1]: This is a footnote content.</p><h1>B</h1><p>C</p></html>'
  )
  assertEquals(root.plain(), tree)
})
