### DatePicker
A visual date selection component supporting single, range, and multiple selection modes, integrated time picker selectors, fiscal quarter & year picker modes, quick presets, double month view, and full internationalization.

**Import Path**:
```typescript
import { DatePicker } from "@/src/components/ui/datePicker/datePicker";
```

#### Default
Standard single date picker input with interactive calendar grid popup.

```tsx
<DatePicker mode="single" label="Birth Date" placeholder="Select your birth date..." />
```

#### Variants
Defines the visual appearance of the Date Picker trigger using the 'variant' prop.

```tsx
<DatePicker variant="default" label="Default" />
<DatePicker variant="bordered" label="Bordered" />
<DatePicker variant="flat" label="Flat" />
<DatePicker variant="filled" label="Filled" />
<DatePicker variant="glow" label="Glow" />
<DatePicker variant="glassmorphism" label="Glassmorphism" />
<DatePicker variant="gradient-border" label="Gradient Border" />
<DatePicker variant="underlined" label="Underlined" />
```

#### Integrated Time Picker Selection
Enable 'showTimePicker' to display interactive hours and minutes dropdown selectors at the bottom of the date calendar popup.

```tsx
<DatePicker
  showTimePicker
  label="Schedule Meeting (Date & Time)"
  placeholder="Select date & time..."
  value={new Date()}
/>
```

#### Fiscal Quarter & Year Picker Modes
Set 'viewMode' to 'fiscalQuarter' or 'fiscalYear' to select financial reporting periods (Q1-Q4, FY2026). Customize start month with 'fiscalYearStartMonth' (e.g. 4 for April).

```tsx
<DatePicker
  viewMode="fiscalQuarter"
  fiscalYearStartMonth={4}
  label="Financial Quarter (April Start)"
/>

<DatePicker
  viewMode="fiscalYear"
  label="Fiscal Year"
/>
```

#### Locale & Timezone Customization
Pass 'locale' (e.g., 'pt-BR', 'es-ES', 'de-DE', 'en-US') and optional 'timeZone' (e.g., 'America/Sao_Paulo', 'UTC') to automatically localize month names, weekday headers, and date formatting.

```tsx
<DatePicker
  locale="pt-BR"
  timeZone="America/Sao_Paulo"
  label="Brasil (pt-BR)"
  value={new Date()}
/>

<DatePicker
  locale="es-ES"
  label="Spain (es-ES)"
  value={new Date()}
/>
```

#### Range Mode with Double Month View
Select a date interval with side-by-side 2-month calendar display.

```tsx
<DatePicker
  mode="range"
  showDoubleMonth
  isClearable
  label="Travel Interval (Double Month)"
  placeholder="Select start and end dates..."
/>
```

#### Quick Presets Sidebar
Built-in shortcut presets ('Today', 'Yesterday', 'Last 7 Days', 'This Month').

```tsx
<DatePicker
  mode="range"
  showPresets
  label="Report Period (Quick Presets)"
/>
```

#### Required State
Displays an asterisk next to the label indicating that selecting a date is mandatory.

```tsx
<DatePicker isRequired label="Target Deadline" />
```

#### Props — DatePicker
Properties to configure the DatePicker component.

| Prop | Type | Default | Description |
|---|---|---|---|
| showTimePicker | boolean | false | Integrates hours and minutes time dropdown selectors inside calendar popup. |
| viewMode | 'date' | 'fiscalQuarter' | 'fiscalYear' | 'date' | Display view mode for standard calendar dates, fiscal quarters (Q1-Q4), or fiscal years. |
| fiscalYearStartMonth | number (1-12) | 1 | Starting month offset for fiscal quarter calculations (e.g. 1 = Jan, 4 = Apr, 10 = Oct). |
| mode | 'single' | 'range' | 'multiple' | 'single' | Selection mode for single date, date range interval, or multiple dates. |
| locale | string | 'en-US' | BCC 47 language tag (e.g. 'pt-BR', 'en-US', 'es-ES') for localizing month names, weekdays, and formats. |

