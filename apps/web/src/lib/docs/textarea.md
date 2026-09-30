### Textarea
Multi-line text input field supporting character limits, auto-expanding heights, error validation, variants, and label placements.

**Import Path**:
```typescript
import { Textarea } from "@/src/components/ui/textarea/textarea";
```

#### Default
Standard multi-line text input field with top label.

```tsx
<Textarea label="Bio" placeholder="Tell us about yourself..." />
```

#### Character Counter & Auto Resize
Tracks character limits and expands container height automatically as content grows.

```tsx
<Textarea
  label="Project Summary"
  placeholder="Write a summary..."
  maxCount={250}
  autoResize
  minRows={3}
/>
```

#### Invalid State
Renders high-visibility error message and border highlights.

```tsx
<Textarea
  isInvalid
  label="Feedback"
  errorMessage="Feedback must be at least 20 characters long."
/>
```

#### Required State
Displays an asterisk next to the label indicating that writing a message is mandatory.

```tsx
<Textarea isRequired label="Cover Letter" placeholder="Paste your cover letter..." />
```

#### Props — Textarea
Supported properties for Textarea.

| Prop | Type | Default | Description |
|---|---|---|---|
| autoResize | boolean | false | Automatically resizes height as user types. |
| maxCount | number | — | Maximum character length counter. |
| isInvalid | boolean | false | Renders red error validation borders. |

