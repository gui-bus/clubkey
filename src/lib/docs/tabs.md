### Tabs
Organizes content into multiple panel views with animated transitions, 8 input-matching visual variants, scrollable navigation, closable tabs, and dynamic editable tabs.

**Import Path**:
```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui/tabs/tabs";
```

#### Default
Standard tab navigation with contained pill background.

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account" variant="contained">Account</TabsTrigger>
    <TabsTrigger value="password" variant="contained">Security</TabsTrigger>
    <TabsTrigger value="billing" variant="contained">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account Content</TabsContent>
</Tabs>
```

#### Variants
Choose from 8 visual styles matching the Input component variants.

```tsx
<TabsTrigger variant="default">...</TabsTrigger>
<TabsTrigger variant="contained">...</TabsTrigger>
<TabsTrigger variant="flat">...</TabsTrigger>
<TabsTrigger variant="filled">...</TabsTrigger>
<TabsTrigger variant="bordered">...</TabsTrigger>
<TabsTrigger variant="underlined">...</TabsTrigger>
<TabsTrigger variant="glow">...</TabsTrigger>
<TabsTrigger variant="glassmorphism">...</TabsTrigger>
<TabsTrigger variant="gradient-border">...</TabsTrigger>
```

#### Colors
Apply theme colors to the active tab trigger indicator.

```tsx
<TabsTrigger color="primary">...</TabsTrigger>
<TabsTrigger color="success">...</TabsTrigger>
<TabsTrigger color="danger">...</TabsTrigger>
```

#### Sizes
Choose from 5 step sizes to match your layout density.

```tsx
<TabsTrigger size="xs">...</TabsTrigger>
<TabsTrigger size="sm">...</TabsTrigger>
<TabsTrigger size="md">...</TabsTrigger>
<TabsTrigger size="lg">...</TabsTrigger>
<TabsTrigger size="xl">...</TabsTrigger>
```

#### Closable Tabs
Enable individual tab closing with isClosable and onClose.

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    {tabs.map(t => (
      <TabsTrigger key={t.id} value={t.id} isClosable onClose={() => removeTab(t.id)}>
        {t.title}
      </TabsTrigger>
    ))}
  </TabsList>
</Tabs>
```

#### Addable & Editable Tabs
Append new tabs dynamically with addable and double-click or click the edit icon to rename tab titles in real time.

```tsx
<Tabs defaultValue="dyn1">
  <TabsList addable onAdd={handleAddTab}>
    {tabs.map(t => (
      <TabsTrigger key={t.id} value={t.id}>
        {t.title}
      </TabsTrigger>
    ))}
  </TabsList>
</Tabs>
```

#### Vertical Orientation
Stack tabs vertically on the left side with matching vertical panel alignment.

```tsx
<Tabs orientation="vertical" variant="vertical">
  <TabsList>
    <TabsTrigger value="v1">Profile</TabsTrigger>
    <TabsTrigger value="v2">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="v1">Profile Content</TabsContent>
</Tabs>
```

#### Scrollable Navigation
Enable automatic scroll navigation arrows for overflow tabs on narrow viewports.

```tsx
<TabsList isScrollable>
  <TabsTrigger value="s1">Tab 1</TabsTrigger>
  ...
</TabsList>
```

#### Props — Tabs & TabsTrigger
Supported properties for Tabs.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'contained' | 'flat' | 'filled' | 'bordered' | 'underlined' | 'glow' | 'glassmorphism' | 'gradient-border' | 'default' | Visual style of active tab trigger. |
| isClosable | boolean | false | Renders a close icon button on the trigger. |
| addable | boolean | false | Renders a + button to dynamically append new tabs. |
| isScrollable | boolean | false | Renders left and right scroll navigation arrows. |

