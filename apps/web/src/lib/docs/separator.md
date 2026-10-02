### Separator
Visually or semantically separates content with horizontal/vertical lines, gradients, and section labels.

**Import Path**:
```typescript
import { Separator } from "@/src/components/ui/separator/separator";
```

#### Default
Standard horizontal divider line.

#### Labels & Gradients
Add centered text labels and smooth gradient fade lines using label and gradient props.

#### Vertical Orientation
Vertical divider line for inline button groups or navigation header links.

#### Props — Separator
Supported properties for Separator.

| Prop | Type | Default | Description |
|---|---|---|---|
| label | ReactNode | — | Centered title text inserted between divider lines. |
| gradient | boolean | false | Fades edges with a smooth gradient line. |
| orientation | 'horizontal' | 'vertical' | 'horizontal' | Divider line orientation. |

