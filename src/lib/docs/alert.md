### Alert
Displays a clean contextual banner for user attention with theme-adaptive neutral backgrounds, colored titles & icons, dismiss timers, action buttons, and accent border variants.

**Import Path**:
```typescript
import { Alert } from "@/src/components/ui/alert/alert";
```

#### Default
A clean, subtle alert banner with a neutral background, status-colored title, and status icon.

```tsx
<Alert color="info" title="System Information">
  A new software update is available for installation.
</Alert>
```

#### Variants
Visual card framing variations including thick left accent borders, borders, flat fills, ghost look, shadows, and vibrant glowing shadow borders.

```tsx
<Alert variant="default" color="default" title="Default">Default style.</Alert>
<Alert variant="bordered" color="default" title="Bordered">Bordered style.</Alert>
<Alert variant="flat" color="default" title="Flat">Flat background style.</Alert>
<Alert variant="ghost" color="default" title="Ghost">Ghost layout.</Alert>
<Alert variant="shadow" color="default" title="Shadow">Shadow elevation.</Alert>
<Alert variant="accent-left" color="default" title="Accent Left">4px solid left accent line.</Alert>
<Alert variant="glow" color="default" title="Glow">Vibrant ambient glow shadow border.</Alert>
```

#### Colors
Select semantic colors via the 'color' prop. The card background stays clean and neutral while only the title and status icon inherit the semantic accent color.

```tsx
<div className="space-y-3.5">
  <Alert color="default" title="Default Status">Default notification.</Alert>
  <Alert color="info" title="Information">Your session expires soon.</Alert>
  <Alert color="success" title="Payment Successful">Order #84920 processed.</Alert>
  <Alert color="warning" title="Storage Limit Warning">85% cloud storage used.</Alert>
  <Alert color="danger" title="Connection Error">Unable to connect to database.</Alert>
</div>
```

#### Auto Dismiss Timer
Automatically dismiss the alert banner after a specified duration in milliseconds. Click the button to trigger/reset the alert.

```tsx
const [dismissKey, setDismissKey] = useState(0);
const [progressVal, setProgressVal] = useState(100);

useEffect(() => {
  setProgressVal(100);
  const startTime = Date.now();
  const duration = 5000;
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
    setProgressVal(remaining);
    if (elapsed >= duration) {
      clearInterval(interval);
    }
  }, 50);
  return () => clearInterval(interval);
}, [dismissKey]);

return (
  <div className="space-y-4">
    <Button size="sm" variant="flat" color="primary" radius="sm" onClick={() => setDismissKey(prev => prev + 1)}>
      Trigger Alert
    </Button>
    <Alert
      key={dismissKey}
      color="success"
      title="Auto-Dismissing Banner"
      isDismissible
      durationMs={5000}
    >
      <div className="space-y-3">
        <p>This alert notification will automatically hide in 5 seconds.</p>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full"
            style={{
              width: \`\${progressVal}%\`,
              transition: progressVal === 100 ? "none" : "width 50ms linear"
            }}
          />
        </div>
      </div>
    </Alert>
  </div>
);
```

#### Closable Alert
Allow users to dismiss the alert manually using a close button, without setting a timer, by configuring the isClosable prop. Click the button to trigger/reset the alert.

```tsx
const [closableKey, setClosableKey] = useState(0);

return (
  <div className="space-y-4">
    <Button size="sm" variant="flat" color="primary" radius="sm" onClick={() => setClosableKey(prev => prev + 1)}>
      Trigger Alert
    </Button>
    <Alert key={closableKey} color="info" title="Dismissible Update" isClosable>
      This alert stays visible until you click the close icon.
    </Alert>
  </div>
);
```

#### Background Watermark Icon
Display the alert status icon as a large semi-transparent background watermark rather than inline beside the title. Available for all status types and supports custom icons.

```tsx
<Alert color="default" title="Default Status" showWatermark>Default watermark.</Alert>
<Alert color="info" title="Information Notice" showWatermark>Info watermark.</Alert>
<Alert color="success" title="Success Notification" showWatermark>Success watermark.</Alert>
<Alert color="warning" title="Warning Warning" showWatermark>Warning watermark.</Alert>
<Alert color="danger" title="Critical Failure" showWatermark>Danger watermark.</Alert>
<Alert color="default" title="System Settings" customIcon={<Icon icon="hugeicons:settings-02" className="size-24" />} showWatermark>
  Custom settings watermark.
</Alert>
```

#### Action Layout
Embed interactive action controls directly inside the alert content.

```tsx
<Alert
  color="danger"
  variant="flat"
  title="Subscription Suspended"
  action={
    <div className="flex gap-2.5 mt-2.5">
      <Button size="md" color="primary" variant="default" radius="md">Update Billing</Button>
      <Button size="md" color="default" variant="flat" radius="md">Contact Support</Button>
    </div>
  }
>
  Your subscription has been suspended due to an outstanding balance.
</Alert>
```

#### Start and End Slots
Inject custom elements before the title using 'startContent', or trailing action controls and badges using 'endContent'.

```tsx
<Alert
  color="info"
  title="New Team Member"
  startContent={
    <Avatar size="sm">
      <AvatarImage src="..." alt="Sarah Jenkins" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  }
  endContent={<Badge variant="flat" color="primary">New</Badge>}
>
  Sarah Jenkins joined the team.
</Alert>
```

#### Props — Alert
Properties for configuring the Alert banner component.

| Prop | Type | Default | Description |
|---|---|---|---|
| color | 'default' | 'info' | 'success' | 'warning' | 'danger' | 'info' | Semantic color applied exclusively to the title header and status icon. |
| variant | 'default' | 'bordered' | 'flat' | 'ghost' | 'shadow' | 'accent-left' | 'glow' | 'default' | Visual card style determining background depth and border framing. |
| action | ReactNode | — | Action buttons or controls container rendered inside the alert. |
| isClosable | boolean | false | Enables a manual close button to dismiss the alert. |
| isDismissible | boolean | false | Enables dismissible behavior with close button and timer support. |
| durationMs | number | — | Duration in milliseconds before automatically dismissing the alert. |
| customIcon | ReactNode | — | Custom icon to render in the Alert instead of the default status icon. |
| showWatermark | boolean | false | Displays the status icon (or custom icon) as a large background watermark. |

