### Progress
Clean progress bar indicator displaying the status of a task or dynamic operations.

**Import Path**:
```typescript
import { Progress } from "@/src/components/ui/progress/progress";
```

#### Default
Standard progress bar representing a completed percentage.

```tsx
<Progress value={60} showValueLabel label="System Loading" />
```

#### Colors
Progress supports alert-aligned colors: primary, success, warning, danger, and default.

```tsx
<Progress value={45} color="primary" />
<Progress value={75} color="success" />
<Progress value={60} color="warning" />
<Progress value={30} color="danger" />
<Progress value={90} color="default" />
```

#### Sizes
Control height dimensions using the 'size' prop: 'sm', 'md', or 'lg'.

```tsx
<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />
```

#### Indeterminate & Barber-Pole Animated Stripes
Use 'isIndeterminate' to display a looping loading bar when the progress duration is unknown, or combine with 'isBarberPole' for an animated striped pattern.

```tsx
<Progress isIndeterminate label="Loading..." />
<Progress value={75} isBarberPole label="Processing..." />
```

#### Real-Time Simulated Progress
Continuously simulating a background operation moving from 0 to 100 to showcase real-time transitions.

```tsx
function Demo() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setValue((oldValue) => (oldValue === 100 ? 0 : oldValue + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return <Progress value={value} showValueLabel label="Downloading..." />;
}
```

#### Props — Progress
Supported properties for the Progress component.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | number | 0 | Current progress percentage value (0 to 100). |
| size | 'sm' | 'md' | 'lg' | 'md' | Height size configuration of the progress track. |
| color | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'primary' | Background color fill palette for progress indicator. |
| isIndeterminate | boolean | false | Removes exact value and displays infinite looping loader. |
| isBarberPole | boolean | false | Applies animated diagonal stripes background pattern over progress bar. |

