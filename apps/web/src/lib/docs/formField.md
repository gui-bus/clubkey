### FormField
A wrapper component providing layout structure, label association, helper descriptions, character counter tracking, required asterisk tooltip explanations, and error state validation messaging.

**Import Path**:
```typescript
import { FormField } from "@/src/components/ui/formField/formField";
```

#### Default
Standard FormField wrapping an Input control.

```tsx
<FormField label="Account Email" description="Enter your primary email.">
  <Input type="email" placeholder="alex@company.com" />
</FormField>
```

#### Required Field & Asterisk Tooltip Explanation
Renders a red asterisk indicator on the field label with an interactive Tooltip explanation via 'requiredTooltip'.

```tsx
<FormField
  label="Full Legal Name"
  isRequired
  requiredTooltip="Mandatory for identity verification"
>
  <Input placeholder="Alex Morgan" />
</FormField>
```

#### Validation Error State
Display validation failure messages in red using 'isInvalid' and 'errorMessage'.

```tsx
<FormField
  label="Password"
  isRequired
  isInvalid
  errorMessage="Password must be at least 8 characters long."
>
  <Input type="password" value="123" />
</FormField>
```

#### Character Counter & Helper Text Alignment
Pass 'maxLength' and 'currentLength' to track input text length with auto-warning highlight colors, and align footer controls with 'helperAlign'.

```tsx
<FormField
  label="User Bio"
  description="Brief summary."
  maxLength={80}
  currentLength={bio.length}
  helperAlign="between"
>
  <Input value={bio} onChange={e => setBio(e.target.value)} />
</FormField>
```

#### Props — FormField
Supported properties for the FormField component.

| Prop | Type | Default | Description |
|---|---|---|---|
| maxLength | number | — | Maximum character limit displayed in footer counter bar. |
| currentLength | number | — | Current character length count for tracking. |
| requiredTooltip | ReactNode | 'This field is required' | Tooltip explanation rendered when hovering the required asterisk. |
| isRequired | boolean | false | Adds required asterisk to the label. |
| isInvalid | boolean | false | Highlights field in error state. |

