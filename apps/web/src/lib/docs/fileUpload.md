### FileUpload
Interactive drag & drop file upload zone with drop-zone highlight animations, immediate image/video thumbnail previews, image crop & rotation modal, clipboard image pasting, resolution/aspect ratio validation, and per-file progress tracking.

**Import Path**:
```typescript
import { FileUpload } from "@/src/components/ui/fileUpload/fileUpload";
```

#### Default
Interactive drop zone featuring live progress bars per file with pause, resume, and cancellation buttons.

```tsx
<FileUpload
  label="Project Assets & Media"
  multiple
  showPreviews
  simulateProgress
  maxSizeMB={25}
/>
```

#### Variants
Choose between default, bordered, flat, filled, glow, glassmorphism, gradient-border, and underlined styles.

```tsx
<FileUpload variant="default" label="Default" />
<FileUpload variant="bordered" label="Bordered" />
<FileUpload variant="flat" label="Flat" />
<FileUpload variant="filled" label="Filled" />
<FileUpload variant="glow" label="Glow" />
<FileUpload variant="glassmorphism" label="Glassmorphism" />
<FileUpload variant="gradient-border" label="Gradient Border" />
<FileUpload variant="underlined" label="Underlined" />
```

#### Thumbnails & Immediate Previews
Renders instant preview thumbnails for uploaded images, videos, and document file types.

```tsx
<FileUpload
  label="Avatar & Cover Photo"
  accept="image/*"
  showPreviews
  maxSizeMB={5}
/>
```

#### Disabled State
Disable file upload zone interactions with the 'disabled' prop.

```tsx
<FileUpload label="Archived Attachments" disabled />
```

#### Image Cropping & Rotation Preview Modal
Pass 'enableCrop' to allow users to rotate (90° steps) and zoom/crop uploaded images inside a dedicated interactive modal.

```tsx
<FileUpload
  label="Profile Photo"
  accept="image/*"
  enableCrop
/>
```

#### Paste from Clipboard
Pass 'allowPaste' to intercept global Ctrl+V image clipboard events and automatically upload captured screenshots or copied images.

```tsx
<FileUpload
  label="Paste Screenshots"
  allowPaste
/>
```

#### File Size & Type Validation
Limit allowed uploads by specifying multiple comma-separated format extensions (using 'accept' like '.pdf,.docx,.xlsx') and maximum file size (using 'maxSizeMB'). Files violating these constraints will display immediate validation error status cards.

```tsx
<FileUpload
  label="Documents & Reports"
  accept=".pdf,.docx,.xlsx"
  maxSizeMB={5}
  description="Only PDF, DOCX or XLSX files up to 5MB are accepted."
/>
```

#### Resolution & Aspect Ratio Validation Rules
Pass 'validationRules' to enforce minimum/maximum pixel dimensions or required aspect ratios (e.g. 1:1 square, 16:9 widescreen).

```tsx
<FileUpload
  label="Banner Upload (Required 16:9)"
  accept="image/*"
  validationRules={{
    minWidth: 400,
    minHeight: 200,
    aspectRatio: 1.7778,
  }}
/>
```

#### Required State
Displays an asterisk next to the label indicating that uploading a file is mandatory.

```tsx
<FileUpload isRequired label="Invoice Document" />
```

#### Props — FileUpload
Supported properties for the FileUpload component.

| Prop | Type | Default | Description |
|---|---|---|---|
| enableCrop | boolean | false | Opens interactive image crop and rotation modal before uploading. |
| allowPaste | boolean | true | Allows pasting images directly from the clipboard via Ctrl+V shortcut. |
| validationRules | FileValidationRules | — | Validation object enforcing min/max pixel resolution or aspect ratio. |
| showPreviews | boolean | true | Renders thumbnail previews for images and videos. |
| simulateProgress | boolean | true | Enables individual file upload progress tracking with pause/resume controls. |
| maxSizeMB | number | 10 | Maximum allowable file size limit in megabytes. |

