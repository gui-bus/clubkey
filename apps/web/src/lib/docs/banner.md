### Banner
A global announcement or notification bar that spans the width of its container. Supports variants, radius, dismissal, action slots, custom icons, and auto-playing announcement carousels with a progress bar.

**Import Path**:
```typescript
import { Banner } from "@/src/components/ui/banner/banner";
```

#### Default
A standard banner for general information.

```tsx
<Banner icon={<Icon icon="hugeicons:information-circle" className="h-4 w-4" />}>
  We have updated our terms of service and privacy policy.
</Banner>
```

#### Variants
Banners come in multiple variants to indicate the severity or type of the message.

```tsx
<Banner variant="default" icon={<Icon icon="hugeicons:notification-01" className="h-4 w-4" />}>
  System maintenance scheduled for tonight at 2:00 AM UTC.
</Banner>
<Banner variant="primary" icon={<Icon icon="hugeicons:information-circle" className="h-4 w-4" />}>
  A new software update is available for download!
</Banner>
<Banner variant="success" icon={<Icon icon="hugeicons:checkmark-circle-02" className="h-4 w-4" />}>
  Your data export has successfully completed.
</Banner>
<Banner variant="warning" icon={<Icon icon="hugeicons:alert-02" className="h-4 w-4" />}>
  Your subscription will expire in 3 days.
</Banner>
<Banner variant="danger" icon={<Icon icon="hugeicons:alert-circle" className="h-4 w-4" />}>
  Payment failed. Please update your billing information immediately.
</Banner>
```

#### Radius
Control the border radius of the banner. Defaults to '2xl'.

```tsx
<Banner radius="none">None</Banner>
<Banner radius="sm">Small</Banner>
<Banner radius="md">Medium</Banner>
<Banner radius="lg">Large</Banner>
<Banner radius="xl">XL</Banner>
<Banner radius="2xl">2XL (default)</Banner>
```

#### Dismissible
A banner that can be dismissed by the user. Click 'Trigger Banner' to re-show it.

```tsx
const [dismissKey, setDismissKey] = useState(0);

<Button size="sm" variant="flat" color="primary" radius="sm"
  onClick={() => setDismissKey(prev => prev + 1)}>
  Trigger Banner
</Button>

<Banner key={dismissKey} variant="primary" isDismissible
  icon={<Icon icon="hugeicons:sparkles" className="h-4 w-4" />}>
  Check out our new features introduced in the latest release!
</Banner>
```

#### With Action
Banners can include custom actions placed to the right of the content.

```tsx
<Banner
  variant="warning"
  icon={<Icon icon="hugeicons:wifi-error-01" className="h-4 w-4" />}
  action={
    <Button size="sm" variant="default" color="primary" radius="md">
      Retry Connection
    </Button>
  }
>
  Network connection lost. Some changes may not be saved.
</Banner>
```

#### Without Icon
Use 'hideIcon' to suppress the icon slot and render a text-only banner.

```tsx
<Banner variant="primary" hideIcon>
  New version available — update now to get the latest features.
</Banner>
```

#### Custom Icon
Use 'customIcon' to replace the default icon with any ReactNode rendered inside a styled icon container.

```tsx
<Banner
  variant="success"
  customIcon={<Icon icon="hugeicons:checkmark-circle-02" className="h-4 w-4" />}
>
  Identity verified — your account is fully secured.
</Banner>
```

#### Announcement Carousel
Cycle through multiple announcements with previous/next controls.

```tsx
<Banner
  variant="primary"
  hideIcon
  announcements={[
    { id: 1, content: "🚀 Version 3.0 launched! Check out the changelog." },
    { id: 2, content: "🎉 We reached 10,000 active developers on Bloom UI!" },
    { id: 3, content: "📚 New video tutorials available in the documentation." },
  ]}
/>
```

#### Auto-Play Carousel
Set 'autoPlay' to cycle announcements automatically. Enable 'showProgress' to display a live countdown progress bar at the bottom of the banner — identical to the Alert timer pattern.

```tsx
<Banner
  variant="primary"
  hideIcon
  autoPlay
  showProgress
  autoPlayInterval={3500}
  announcements={[
    { id: 1, content: "🚀 Version 3.0 launched!" },
    { id: 2, content: "🎉 10,000 active developers!" },
    { id: 3, content: "📚 New video tutorials available." },
  ]}
/>
```

#### Sticky Positioning & LocalStorage Persistence
Fix banner at top or bottom with 'position' prop ('sticky-top', 'sticky-bottom'). Persist dismiss state across reloads with 'storageKey'.

```tsx
<Banner
  variant="success"
  position="sticky-top"
  storageKey="header-promo-v1"
  isDismissible
>
  Persistent Promo Banner
</Banner>
```

#### Props — Banner
Properties to configure the Banner component.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'default' | The visual style variant of the banner. |
| radius | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '2xl' | Controls the border radius. Ignored when position is sticky. |
| position | 'static' | 'sticky-top' | 'sticky-bottom' | 'static' | Controls sticky positioning behavior. |
| icon | ReactNode | — | Icon displayed inside a colored badge container at the start. |
| customIcon | ReactNode | — | Overrides the icon prop with a custom ReactNode. |
| hideIcon | boolean | false | Suppresses the icon slot entirely. |
| isDismissible | boolean | false | Shows a dismiss (×) button. |
| onDismiss | () =&gt; void | — | Callback fired when the dismiss button is clicked. |
| action | ReactNode | — | Action element placed before the dismiss button. |
| announcements | AnnouncementItem[] | — | Array of announcement items for carousel mode. |
| autoPlay | boolean | false | Auto-advances the carousel at a fixed interval. |
| autoPlayInterval | number | 4000 | Interval in milliseconds between auto-play slides. |
| showProgress | boolean | false | Displays a progress bar at the bottom indicating time until the next slide. |
| storageKey | string | — | localStorage key to persist the dismissed state across reloads. |

