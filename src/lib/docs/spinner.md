### Spinner
Animated loading indicator featuring multiple visual styles, color palettes, size scale, and text labels.

**Import Path**:
```typescript
import { Spinner } from "@/src/components/ui/spinner/spinner";
```

#### Default
Standard loading spinner with optional text label.

```tsx
<Spinner color="primary" label="Loading data..." />
```

#### Variants
Choose from different animation layouts and graphic styles.

```tsx
<Spinner variant="default" label="Default" />
<Spinner variant="dots" label="Dots" />
<Spinner variant="bars" label="Bars" />
<Spinner variant="pulse" label="Pulse" />
<Spinner variant="ring" label="Ring" />
<Spinner variant="gradient" label="Gradient" />
```

#### Colors
Apply theme-specific alert colors across the different animation variants.

```tsx
<Spinner variant="default" color="primary" />
<Spinner variant="dots" color="success" />
<Spinner variant="bars" color="warning" />
<Spinner variant="pulse" color="danger" />
<Spinner variant="ring" color="secondary" />
<Spinner variant="gradient" color="accent" />
```

#### Sizes
Scale the loader size dimensions to fit different layout containers.

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

#### Props — Spinner
Supported properties for Spinner.

| Prop | Type | Default | Description |
|---|---|---|---|
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'primary' | Theme color palette of spinner graphic. |
| variant | 'default' | 'dots' | 'bars' | 'pulse' | 'ring' | 'gradient' | 'default' | Spinner graphic animation style. |
| size | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'md' | Dimensions scale of spinner graphic. |
| label | string | — | Optional loading status label text. |

