### TimePicker
A specialized input component for selecting hours, minutes, and periods (AM/PM) with intuitive keyboard and mouse controls.

**Import Path**:
```typescript
import { TimePicker } from "@/src/components/ui/timePicker/timePicker";
```

#### Default
A standard 12-hour time picker with AM/PM toggle.

```tsx
<TimePicker 
  value="02:30 PM"
  onChange={(time) => console.log(time)}
  label="Meeting Time"
  description="Select when the meeting begins."
/>
```

#### Variants
Defines the visual appearance of the Time Picker trigger using the 'variant' prop.

```tsx
<TimePicker variant="default" label="Default" />
<TimePicker variant="bordered" label="Bordered" />
<TimePicker variant="flat" label="Flat" />
<TimePicker variant="filled" label="Filled" />
<TimePicker variant="glow" label="Glow" />
<TimePicker variant="glassmorphism" label="Glassmorphism" />
<TimePicker variant="gradient-border" label="Gradient Border" />
<TimePicker variant="underlined" label="Underlined" />
```

#### Sizes
Available in three sizes: small, medium, and large.

```tsx
<TimePicker size="sm" label="Small (sm)" />
<TimePicker size="md" label="Medium (md) - Default" />
<TimePicker size="lg" label="Large (lg)" />
```

#### Required State
Displays an asterisk next to the label indicating that choosing a time is mandatory.

```tsx
<TimePicker
  isRequired
  label="Appointment Time"
/>
```

#### 12h vs 24h Format
The time picker supports both 12-hour (with AM/PM toggle) and 24-hour formats.

```tsx
<TimePicker format="12h" value="09:00 AM" label="12-Hour Format" />
<TimePicker format="24h" value="21:00" label="24-Hour Format" />
```

#### States
Time pickers can show disabled or invalid states.

```tsx
<TimePicker isDisabled value="10:00 AM" label="Disabled" />
<TimePicker isInvalid value="13:99 PM" label="Invalid" />
```

#### Minute Step Intervals
Configure custom minute increment steps (e.g., step={15} for quarter-hour slots).

```tsx
<TimePicker step={15} value="09:15 AM" label="15-min Step Slot" />
```

#### Scrollable Wheel Time Selector
Render intuitive scrollable wheel column selectors for picking hours, minutes, and period with useWheel={true}.

```tsx
<TimePicker useWheel step={15} value="10:30 AM" label="Wheel Column Picker" />
```

