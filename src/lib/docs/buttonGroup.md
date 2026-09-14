### ButtonGroup
ButtonGroup allows grouping multiple buttons together, creating a visually connected set. Propagates variants, colors, sizes, loading, and disabled states to child buttons.

**Import Path**:
```typescript
import { ButtonGroup } from "@/src/components/ui/buttonGroup/buttonGroup";
```

#### Default
A standard connected button group propagating default styling to its child buttons.

```tsx
<ButtonGroup ariaLabel="Default actions">
  <Button>Years</Button>
  <Button>Months</Button>
  <Button>Days</Button>
</ButtonGroup>
```

#### Variants
Defines the visual style of each button inside the group via the 'variant' prop.

```tsx
<ButtonGroup variant="bordered">
  <Button>Bordered 1</Button>
  <Button>Bordered 2</Button>
  <Button>Bordered 3</Button>
</ButtonGroup>
```

#### Colors
Defines the color theme of all buttons inside the group via the 'color' prop. Stacked vertically for clear visual comparison.

```tsx
<ButtonGroup color="primary" variant="flat">
  <Button>A</Button>
  <Button>B</Button>
  <Button>C</Button>
</ButtonGroup>
```

#### Sizes
Adjusts the size scale of each button in the group using the 'size' prop.

```tsx
<ButtonGroup size="lg" color="primary">
  <Button>LG A</Button>
  <Button>LG B</Button>
</ButtonGroup>
```

#### Radius
Controls the corner rounding of the outer borders of the group using the 'radius' prop. Inner corners remain flat when buttons are attached.

```tsx
<ButtonGroup radius="none" variant="flat" color="default">
  <Button>None A</Button>
</ButtonGroup>

<ButtonGroup size="sm" radius="sm" variant="flat" color="default">
  <Button>Small A</Button>
</ButtonGroup>

<ButtonGroup radius="md" variant="flat" color="default">
  <Button>Medium A</Button>
</ButtonGroup>

<ButtonGroup radius="full" variant="flat" color="default">
  <Button>Full A</Button>
</ButtonGroup>
```

#### Loading state
Pass 'isLoading' to ButtonGroup to propagate active loading spinners across all buttons in the group.

```tsx
<ButtonGroup isLoading color="primary">
  <Button>Processing</Button>
  <Button>Saving</Button>
</ButtonGroup>
```

#### Disabled State
Pass 'isDisabled' to ButtonGroup to disable interaction for all buttons in the group.

```tsx
<ButtonGroup isDisabled color="primary">
  <Button>Locked 1</Button>
  <Button>Locked 2</Button>
</ButtonGroup>
```

#### Icon Only
Supports icon-only buttons grouped together seamlessly.

```tsx
<ButtonGroup ariaLabel="Navigation actions">
  <Button
    isIconOnly
    ariaLabel="Home"
    startContent={<Icon icon="hugeicons:home-03" className="size-5" />}
  />
  <Button
    isIconOnly
    ariaLabel="Profile"
    startContent={<Icon icon="hugeicons:user-square" className="size-5" />}
  />
</ButtonGroup>
```

#### Vertical Orientation
Stack buttons vertically using orientation='vertical'.

```tsx
<ButtonGroup orientation="vertical" color="primary">
  <Button>Top Action</Button>
  <Button>Middle Action</Button>
  <Button>Bottom Action</Button>
</ButtonGroup>
```

#### Spaced Out Buttons
Set isAttached={false} to add clean spacing between buttons instead of merging borders.

```tsx
<ButtonGroup isAttached={false} color="primary" variant="bordered">
  <Button>Detached 1</Button>
  <Button>Detached 2</Button>
</ButtonGroup>
```

#### Props — ButtonGroup
Properties to configure the ButtonGroup container.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow' | 'link' | — | Applies visual style variant to all child buttons. |
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | — | Applies color theme to all child buttons. |
| size | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | — | Applies size scale to all child buttons. |
| isLoading | boolean | false | Propagates loading spinners and disables interaction across all buttons. |
| isDisabled | boolean | false | Disables interaction across all buttons in the group. |
| ariaLabel | string | — | Accessible label describing the purpose of the group for screen readers. |

