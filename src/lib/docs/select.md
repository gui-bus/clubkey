### Select
A powerful select dropdown supporting single & multi-selection, removable tags, max visible chips, rich item rendering (avatars, descriptions, badges), batch actions, search filter, and 5 visual variants.

**Import Path**:
```typescript
import { Select } from "@/src/components/ui/select/select";
```

#### Default
Standard dropdown select list.

```tsx
<Select options={sampleOptions} defaultValue="react" label="Select Tech Stack" />
```

#### Variants
Defines the visual appearance of the Select trigger using the 'variant' prop.

```tsx
<Select variant="default" label="Default" options={options} />
<Select variant="bordered" label="Bordered" options={options} />
<Select variant="flat" label="Flat" options={options} />
<Select variant="filled" label="Filled" options={options} />
<Select variant="glow" label="Glow" options={options} />
<Select variant="glassmorphism" label="Glassmorphism" options={options} />
<Select variant="gradient-border" label="Gradient Border" options={options} />
<Select variant="underlined" label="Underlined" options={options} />
```

#### Multi-Selection & maxTagsVisible
Multi-selection mode with removable chip tags, search filter inside the menu, and customizable max visible chips limit.

```tsx
<Select
  isMultiSelect
  isSearchable
  maxTagsVisible={2}
  options={sampleOptions}
  multiValue={multiVal}
  onMultiValueChange={setMultiVal}
  label="Frameworks (Max 2 tags visible)"
/>
```

#### Rich Option & Value Rendering
Render avatars, sub-descriptions, icons, and badges using built-in option properties or renderOption custom slots.

```tsx
<Select options={userOptions} defaultValue="guilherme" label="Assign Team Member" />
```

#### Batch Selection
Enable quick 1-click 'Select All' and 'Deselect All' actions at the top of the multi-select dropdown.

```tsx
<Select
  isMultiSelect
  showBatchActions
  isSearchable
  options={sampleOptions}
  label="Batch Option Picker"
/>
```

#### Legacy Compositional Syntax
Full backward compatibility with Radix UI Select primitive trigger and item components.

```tsx
<Select defaultValue="light">
  <SelectTrigger><SelectValue placeholder="Select theme..." /></SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light Theme</SelectItem>
    <SelectItem value="dark">Dark Theme</SelectItem>
  </SelectContent>
</Select>
```

#### Option Search Filter
Filter options dynamically using an inline search input inside the popover with 'isSearchable'.

```tsx
<Select isSearchable options={sampleOptions} label="Filter Technologies" />
```

#### Sticky Category Headers
Group options under category headers that stick to the top of the popover menu during scroll.

```tsx
<Select
  options={[
    { value: "react", label: "React.js", group: "Frontend Frameworks" },
    { value: "next", label: "Next.js 16", group: "Fullstack Frameworks" },
  ]}
  label="Ecosystem Stack"
/>
```

#### Required State
Displays an asterisk next to the label indicating that selecting an option is mandatory.

```tsx
<Select
  isRequired
  label="User Role"
  placeholder="Choose role..."
  options={[
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" }
  ]}
/>
```

#### Props — Select
Supported properties for the Select component.

| Prop | Type | Default | Description |
|---|---|---|---|
| isSearchable | boolean | false | Adds search input filter inside the select popover. |
| renderOption | (option: SelectOption) =&gt; ReactNode | — | Custom item template slot for option items inside popover. |
| group (in option) | string | — | Category name to group options with sticky headers. |

