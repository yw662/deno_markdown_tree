# markdown-tree

This is a markdown to JSON tree converter for deno, based on [rusty_markdown](https://deno.land/x/rusty_markdown)

## Example

```ts
import { Node } from './mod.ts'
Node.from(`
# This is a markdown string
`)
```

Result: (converted to plain JSON)

```json
{
  "children": [
    {
      "props": { "type": "heading", "level": 1 },
      "children": [
        { "props": { "type": "text", "content": "This is a markdown string" } }
      ]
    }
  ]
}
```
