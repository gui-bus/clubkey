### Switch
A toggle control allowing users to switch between on and off states featuring animated thumb icons, dual labels, clickable card containers, and color themes.

**Import Path**:
```typescript
import { Switch } from "@/src/components/ui/switch/switch";
```

#### Default
Standard toggle switch with label.

```tsx
<Switch label="Enable Notifications" defaultChecked />
```

#### Variants
Render as a card container for settings-style toggle rows.

```tsx
<Switch isCard label="Automatic Updates" description="Download updates automatically." defaultChecked />
<Switch isCard label="Two-Factor Authentication" description="Extra verification code." color="success" />
```

#### Colors
Apply theme alert colors to the active checked track.

```tsx
<Switch color="default" defaultChecked />
<Switch color="primary" defaultChecked />
<Switch color="success" defaultChecked />
<Switch color="warning" defaultChecked />
<Switch color="danger" defaultChecked />
```

#### Sizes
Choose from small, medium, or large switch dimensions.

```tsx
<Switch size="sm" defaultChecked label="Small" />
<Switch size="md" defaultChecked label="Medium" />
<Switch size="lg" defaultChecked label="Large" />
```

#### Thumb Icons
Embed icons inside the sliding thumb to show context-aware state feedback.

```tsx
<Switch
  size="lg"
  color="success"
  checkedThumbIcon={<Icon icon="hugeicons:tick-02" className="size-3.5 text-emerald-500" />}
  uncheckedThumbIcon={<Icon icon="hugeicons:cancel-01" className="size-3.5 text-rose-400" />}
  label="Enabled"
/>
```

#### Dual Labels
Display text labels on both ends of the switch track simultaneously.

```tsx
const [annual, setAnnual] = React.useState(false);

<Switch
  startLabel="Monthly"
  endLabel="Annual (Save 20%)"
  checked={annual}
  onCheckedChange={setAnnual}
/>
```

#### Required State
Displays an asterisk next to the label indicating that toggling the switch is mandatory.

```tsx
<Switch isRequired label="I agree to receive transactional updates" />
```

#### Props — Switch
Supported properties for Switch.

| Prop | Type | Default | Description |
|---|---|---|---|
| checkedThumbIcon | ReactNode | — | Icon rendered inside the thumb when checked. |
| uncheckedThumbIcon | ReactNode | — | Icon rendered inside the thumb when unchecked. |
| startLabel | ReactNode | — | Text label placed at the left extremity. |
| endLabel | ReactNode | — | Text label placed at the right extremity. |
| isCard | boolean | false | Wraps the switch in a clickable card container. |

