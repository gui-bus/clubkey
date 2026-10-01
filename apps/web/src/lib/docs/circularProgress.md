### CircularProgress
Clean circular progress ring indicator displaying dynamic percentages or completion statuses.

**Import Path**:
```typescript
import { CircularProgress } from "@clubkey/ui";
```

#### Default
Standard circular progress indicator showing completion percentage.

```tsx
<CircularProgress value={60} showValueLabel />
```

#### Colors
CircularProgress supports semantic color palettes: `default`, `primary`, `success`, `warning`, `danger`.

```tsx
<CircularProgress value={45} color="primary" />
<CircularProgress value={75} color="success" />
<CircularProgress value={60} color="warning" />
<CircularProgress value={30} color="danger" />
```

#### Sizes
Control circular dimensions using the `size` prop: `'sm'`, `'md'`, or `'lg'`.

```tsx
<CircularProgress value={50} size="sm" />
<CircularProgress value={50} size="md" />
<CircularProgress value={50} size="lg" />
```

#### Props — CircularProgress
Supported properties for the CircularProgress component.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | number | 0 | Current progress percentage value (0 to 100). |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Dimension and stroke thickness configuration. |
| color | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' | Color palette for the progress ring. |
| isIndeterminate | boolean | false | Displays an animated indefinite loading state. |
| showValueLabel | boolean | false | Displays the numerical percentage label at the center. |
| label | string | undefined | Subtitle label placed below the circular ring. |
