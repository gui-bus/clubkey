### Toggle
A two-state button component that can be toggled on or off for formatting controls, filters, and feature toggles.

**Import Path**:
```typescript
import { Toggle } from "@/src/components/ui/toggle/toggle";
```

#### Default
Standard pressable toggle button.

```tsx
const [isBold, setIsBold] = React.useState(true);

<Toggle aria-label="Toggle bold" pressed={isBold} onPressedChange={setIsBold}>
  <Icon icon="hugeicons:text-bold" className="size-4" />
  <span>Bold</span>
</Toggle>
```

#### Variants
Choose from default styling, thin borders, or flat background presets.

```tsx
<Toggle variant="default" defaultPressed>Default</Toggle>
<Toggle variant="bordered" defaultPressed>Bordered</Toggle>
<Toggle variant="flat" defaultPressed>Flat</Toggle>
```

#### Colors
Standard color highlights matching the design system colors palette.

```tsx
<Toggle color="default" defaultPressed>Default</Toggle>
<Toggle color="primary" defaultPressed>Primary</Toggle>
<Toggle color="secondary" defaultPressed>Secondary</Toggle>
<Toggle color="accent" defaultPressed>Accent</Toggle>
<Toggle color="success" defaultPressed>Success</Toggle>
<Toggle color="warning" defaultPressed>Warning</Toggle>
<Toggle color="danger" defaultPressed>Danger</Toggle>
```

#### Sizes
Scale toggle dimensions: 'sm', 'md', or 'lg'.

```tsx
<Toggle size="sm" defaultPressed>Small</Toggle>
<Toggle size="md" defaultPressed>Medium</Toggle>
<Toggle size="lg" defaultPressed>Large</Toggle>
```

#### Radius
Apply custom border-radius rounding from completely square to circular pill corners.

```tsx
<Toggle radius="none" defaultPressed>None</Toggle>
<Toggle radius="md" defaultPressed>Medium</Toggle>
<Toggle radius="xl" defaultPressed>Extra Large</Toggle>
<Toggle radius="full" defaultPressed>Full</Toggle>
```

