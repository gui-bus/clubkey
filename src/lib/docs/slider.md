### Slider
An interactive range slider component supporting multi-thumb controls, graduated marks, floating hover tooltips, and frequency histogram charts.

**Import Path**:
```typescript
import { Slider } from "@/src/components/ui/slider/slider";
```

#### Default
Standard single value slider track.

```tsx
const [val, setVal] = React.useState([45]);

<Slider label="Sensitivity Level" showValue value={val} onValueChange={setVal} />
```

#### Colors
Style active range fill with theme alert colors: primary, success, warning, danger, and default.

```tsx
<Slider color="primary" defaultValue={[50]} />
<Slider color="success" defaultValue={[50]} />
<Slider color="warning" defaultValue={[50]} />
<Slider color="danger" defaultValue={[50]} />
<Slider color="default" defaultValue={[50]} />
```

#### Single Thumb with Tooltip
Standard single value slider with floating hover tooltip.

```tsx
<Slider label="Volume Level" showValue showTooltip value={val} onValueChange={setVal} formatTooltip={(v) => \`\${v}%\
```

#### Multi-Thumb Range
Pass an array of multiple values to render multi-thumb controls.

```tsx
const [multiVal, setMultiVal] = React.useState([15, 50, 85]);

<Slider label="Multi-Zone" showValue showTooltip value={multiVal} onValueChange={setMultiVal} />
```

#### Histogram Chart Mode
Render a background frequency distribution chart above the slider track with live range highlight.

```tsx
const [range, setRange] = React.useState([30, 70]);
const sampleHistogram = [5, 12, 28, 45, 80, 95, 60, 40, 25, 15, 8, 3];

<Slider
  label="Nightly Price Filter"
  showValue
  showTooltip
  histogramData={sampleHistogram}
  value={range}
  onValueChange={setRange}
  formatValue={(v) => \`$\${v[0]} — $\${v[1]}\
```

#### Graduated Marks & Ticks
Add step markers along the track with label text.

```tsx
<Slider
  label="Temperature Range"
  min={0}
  max={100}
  step={10}
  defaultValue={[30]}
  marks={[
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
    { value: 75, label: "75°C" },
    { value: 100, label: "100°C" }
  ]}
/>
```

#### Required State
Displays an asterisk next to the label indicating that configuring the slider is mandatory.

```tsx
<Slider isRequired label="Max Temperature threshold" defaultValue={[65]} />
```

#### Props — Slider
Supported properties for the Slider component.

| Prop | Type | Default | Description |
|---|---|---|---|
| color | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'primary' | Background fill track and thumb border color theme. |
| size | 'sm' | 'md' | 'lg' | 'md' | Dimension height for track and width for thumb. |

