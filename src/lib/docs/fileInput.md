### FileInput
A lightweight and modular file attachment component styled to look like a standard input field, supporting visual variants, progress bars, loading indicators, size scales, and multiple selections.

**Import Path**:
```typescript
import { FileInput } from "@/src/components/ui/fileInput/fileInput";
```

#### Default
Standard file input with browse trigger, helper description, and attachment icon.

```tsx
<FileInput
  label="Upload Documents"
  description="PDF, DOCX, or TXT up to 10MB."
  placeholder="No document selected"
/>
```

#### Variants
Choose between default, bordered, flat, filled, glow, glassmorphism, gradient-border, and underlined styles.

```tsx
<FileInput variant="default" label="Default" />
<FileInput variant="bordered" label="Bordered" />
<FileInput variant="flat" label="Flat" />
<FileInput variant="filled" label="Filled" />
<FileInput variant="glow" label="Glow" />
<FileInput variant="glassmorphism" label="Glassmorphism" />
<FileInput variant="gradient-border" label="Gradient Border" />
<FileInput variant="underlined" label="Underlined" />
```

#### Sizes
Supported in small (sm), medium (md), and large (lg) dimensions.

```tsx
<FileInput size="sm" label="Small (sm)" />
<FileInput size="md" label="Medium (md) - Default" />
<FileInput size="lg" label="Large (lg)" />
```

#### Required State
Displays an asterisk next to the label indicating that choosing a file is mandatory.

```tsx
<FileInput
  isRequired
  label="Tax Declaration PDF"
/>
```

#### Simulated Upload Progress & Loading
Display upload loading states and simulated progress indicator bars at the bottom edge.

```tsx
const [progress, setProgress] = React.useState(0);
const [isLoading, setIsLoading] = React.useState(false);

<FileInput
  label="Resume / Cover Letter"
  isLoading={isLoading}
  progress={isLoading ? progress : undefined}
/>
```

#### Validation Feedback
Toggle red indicator borders and feedback messages with 'isInvalid' and 'errorMessage'.

```tsx
<FileInput
  isInvalid
  label="ID Identity Document"
  errorMessage="Only PDF format is allowed for validation."
/>
```

#### Automatic File Type & Size Validation
Set allowed format extensions by specifying multiple comma-separated formats (using 'accept' like '.pdf,.docx,.xlsx') and limit maximum sizes (using 'maxSizeMB'). If selected files violate these rules, error messages are automatically displayed and the input enters invalid state.

```tsx
<FileInput
  label="Tax Documents"
  accept=".pdf,.docx,.xlsx"
  maxSizeMB={2.5}
  placeholder="No document selected"
  description="Only PDF, DOCX or XLSX files up to 2.5MB are allowed."
/>
```

#### Multiple File Selection
Allows selecting multiple documents from browser file dialog, separating names with commas.

```tsx
<FileInput
  multiple
  label="Project Attachments"
  placeholder="No files selected"
/>
```

#### Removable Badge Tags
Display selected files as individual removable Badges below the input field, allowing users to remove items individually by clicking the close handle.

```tsx
<FileInput
  multiple
  showBadges
  label="Attach Document Files"
  placeholder="Select files to list as badges..."
/>
```

#### Props — FileInput
Supported properties for the FileInput component.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'bordered' | 'flat' | 'underlined' | 'filled' | 'glassmorphism' | 'gradient-border' | 'glow' | 'default' | Visual appearance theme of the input wrapper. |
| size | 'sm' | 'md' | 'lg' | 'md' | Dimensional layout size scale. |
| progress | number | — | Percentage upload progress value (0-100) to render a progress bar. |
| isLoading | boolean | false | Replaces browse trigger with a loading/spinning icon. |
| isClearable | boolean | true | Enables a clear button to remove selected files. |
| showBadges | boolean | false | Renders selected attachments as individual removable Badges below the input. |

