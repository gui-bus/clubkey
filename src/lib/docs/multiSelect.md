### MultiSelect
A searchable multi-selection input with removable pill badges, Select All / Deselect All batch actions, collapsible header categories, keyboard navigation, and max count enforcement.

**Import Path**:
```typescript
import { MultiSelect } from "@/src/components/ui/multiSelect/multiSelect";
```

#### Default
A multi-select input with pre-selected items and search filtering.

```tsx
const [value, setValue] = React.useState<string[]>(["apple", "cherry"]);

<MultiSelect
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select fruits..."
  label="Fruits"
/>
```

#### Variants
Defines the visual appearance of the multi-select input using the 'variant' prop.

```tsx
<MultiSelect variant="default" label="Default" options={options} value={value} onChange={setValue} />
<MultiSelect variant="bordered" label="Bordered" options={options} value={value} onChange={setValue} />
<MultiSelect variant="flat" label="Flat" options={options} value={value} onChange={setValue} />
<MultiSelect variant="filled" label="Filled" options={options} value={value} onChange={setValue} />
<MultiSelect variant="glow" label="Glow" options={options} value={value} onChange={setValue} />
<MultiSelect variant="glassmorphism" label="Glassmorphism" options={options} value={value} onChange={setValue} />
<MultiSelect variant="gradient-border" label="Gradient Border" options={options} value={value} onChange={setValue} />
<MultiSelect variant="underlined" label="Underlined" options={options} value={value} onChange={setValue} />
```

#### With Icons
Options can include icons for richer visual context.

```tsx
const [value, setValue] = React.useState<string[]>(["react", "typescript"]);

<MultiSelect
  options={[
    { label: "React", value: "react", icon: <Icon icon="devicon:react" className="size-4" /> },
    { label: "TypeScript", value: "typescript", icon: <Icon icon="devicon:typescript" className="size-4" /> },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select technologies..."
  label="Tech Stack"
/>
```

#### Max Count
Limit the number of selectable items with the maxCount prop.

```tsx
const [value, setValue] = React.useState<string[]>(["apple"]);

<MultiSelect
  options={fruitOptions}
  value={value}
  onChange={setValue}
  placeholder="Select up to 3 fruits..."
  label="Max 3 Selections"
  maxCount={3}
/>
```

#### Select All Batch Actions & Collapsible Category Headers
Batch select or clear all filtered options with 'showSelectAll', and group items into collapsible category sections via the 'category' option field.

```tsx
<MultiSelect
  options={[
    { label: "React", value: "react", category: "Frontend Frameworks" },
    { label: "Node.js", value: "nodejs", category: "Backend Runtime" },
  ]}
  value={value}
  onChange={setValue}
  showSelectAll
/>
```

#### Required State
Displays an asterisk next to the label indicating that choosing options is mandatory.

```tsx
<MultiSelect
  isRequired
  label="Assigned Tags"
  placeholder="Select tags..."
  options={[
    { value: "nextjs", label: "Next.js" },
    { value: "react", label: "React" }
  ]}
  value={value}
  onChange={setValue}
/>
```

