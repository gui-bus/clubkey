### RadioGroup
A single-choice selection group featuring animated dot indicators, interactive selection cards, grid layout columns, and custom price badges.

**Import Path**:
```typescript
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radioGroup/radioGroup";
```

#### Default
Standard radio buttons with smooth CSS indicator scale animations.

```tsx
<RadioGroup defaultValue="default">
  <RadioGroupItem value="default" label="Standard Resolution (1080p)" />
  <RadioGroupItem value="high" label="High Definition (4K HDR)" />
</RadioGroup>
```

#### Variants
Defines the visual appearance of the radio group items when used as selection cards.

```tsx
<RadioGroup variant="default">
  <RadioGroupItem isCard value="a" label="Default" />
</RadioGroup>

<RadioGroup variant="bordered">
  <RadioGroupItem isCard value="b" label="Bordered" />
</RadioGroup>
```

#### Colors
Choose from primary, success, warning, danger, and default options to color the selection state indicator.

```tsx
<RadioGroup color="primary" defaultValue="1">
  <RadioGroupItem value="1" label="Primary" />
</RadioGroup>
<RadioGroup color="success" defaultValue="1">
  <RadioGroupItem value="1" label="Success" />
</RadioGroup>
```

#### Selectable Card Mode with Prices and Badges
Interactive plan selection cards featuring animated borders, icons, price tags, and badges using 'isCard'.

```tsx
<RadioGroup columns={2} value={selectedPlan} onValueChange={setSelectedPlan}>
  <RadioGroupItem
    isCard
    value="starter"
    label="Hobby Plan"
    price="Free"
    description="For side projects."
  />
  <RadioGroupItem
    isCard
    value="pro"
    label="Pro Team"
    price="$29/mo"
    badge="Popular"
    description="Unlimited team members."
  />
</RadioGroup>
```

#### Grid Layout & Horizontal Orientation
Arrange items in grid columns (columns={3}) or horizontal flex row (orientation='horizontal').

```tsx
<RadioGroup columns={3} defaultValue="monthly" label="Billing Frequency">
  <RadioGroupItem isCard value="monthly" label="Monthly" price="$12/mo" />
  <RadioGroupItem isCard value="annual" label="Annual" price="$9/mo" badge="Save 25%" />
</RadioGroup>
```

#### Required State
Displays an asterisk next to the group label indicating that choosing an option is mandatory.

```tsx
<RadioGroup isRequired label="Preferred Plan" defaultValue="pro">
  <RadioGroupItem value="free" label="Free Trial" />
  <RadioGroupItem value="pro" label="Pro Tier ($15/mo)" />
</RadioGroup>
```

#### Props — RadioGroup & RadioGroupItem
Supported properties for RadioGroup components.

| Prop | Type | Default | Description |
|---|---|---|---|
| isCard | boolean | false | Renders radio option as an interactive selection card. |
| columns | 1 | 2 | 3 | 4 | 5 | 6 | — | Arranges radio cards into responsive grid columns. |
| price | string | — | Right-aligned price tag rendered inside card items. |

