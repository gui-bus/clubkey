### TagInput
An interactive tag input field allowing users to add, manage, and delete tags or chips dynamically.

**Import Path**:
```typescript
import { TagInput } from "@/src/components/ui/tagInput/tagInput";
```

#### Default
A standard tag input with interactive tag addition and deletion.

```tsx
const [tags, setTags] = React.useState<string[]>(["React", "Tailwind", "Next.js"]);

<TagInput
  value={tags}
  onChange={setTags}
  placeholder="Type and press Enter or comma..."
/>
```

#### Variants
Defines the visual appearance of the tag input using the 'variant' prop.

```tsx
<TagInput variant="default" value={tags} onChange={setTags} label="Default" />
<TagInput variant="bordered" value={tags} onChange={setTags} label="Bordered" />
<TagInput variant="flat" value={tags} onChange={setTags} label="Flat" />
<TagInput variant="filled" value={tags} onChange={setTags} label="Filled" />
<TagInput variant="glow" value={tags} onChange={setTags} label="Glow" />
<TagInput variant="glassmorphism" value={tags} onChange={setTags} label="Glassmorphism" />
<TagInput variant="gradient-border" value={tags} onChange={setTags} label="Gradient Border" />
<TagInput variant="underlined" value={tags} onChange={setTags} label="Underlined" />
```

#### Sizes
Available in sm, md, and lg sizes.

```tsx
<TagInput size="sm" value={tags} onChange={setTags} placeholder="Small size" />
<TagInput size="md" value={tags} onChange={setTags} placeholder="Medium size" />
<TagInput size="lg" value={tags} onChange={setTags} placeholder="Large size" />
```

#### Tag Customizations
You can customize the color and variant of the tags rendered inside the input.

```tsx
<TagInput value={tags} onChange={setTags} tagColor="success" tagVariant="flat" />
<TagInput value={tags} onChange={setTags} tagColor="danger" tagVariant="default" />
<TagInput value={tags} onChange={setTags} tagColor="secondary" tagVariant="bordered" />
```

#### Validation & Constraints
Limit maximum tags, disable duplicates, or pass a validation function (e.g. Email validation).

```tsx
<TagInput
  value={tags}
  onChange={setTags}
  maxTags={5}
  label="Max Tags Limit"
/>

<TagInput
  value={tags}
  onChange={setTags}
  validate={(tag) => {
    const isEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(tag);
    return isEmail ? true : "Must be a valid email address.";
  }}
  label="Email Validation Only"
/>
```

#### Required State
Displays an asterisk next to the label indicating that adding tags is mandatory.

```tsx
<TagInput isRequired label="Skills & Expertise" placeholder="Type and press enter..." />
```

#### Props — TagInput
Properties for configuring the TagInput component.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string[] | [] | The array of tags to display. |
| onChange | (value: string[]) =&gt; void | undefined | Callback fired when tags are added or removed. |
| variant | "default" | "bordered" | "flat" | "underlined" | "filled" | "glow" | "default" | The styling variant of the input wrapper. |
| size | "sm" | "md" | "lg" | "md" | Height and padding size of the input wrapper. |
| tagColor | "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "primary" | The semantic color of the rendered tag badges. |
| tagVariant | "default" | "bordered" | "flat" | "ghost" | "shadow" | "flat" | The badge variant style of the rendered tags. |
| maxTags | number | undefined | Maximum number of tags allowed. |
| allowDuplicates | boolean | false | Whether duplicate tags are allowed. |
| validate | (tag: string) =&gt; boolean | string | undefined | Custom validation function. Return false or a string to block adding the tag. |

