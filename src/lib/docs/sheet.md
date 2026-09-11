### Sheet
Extends modal dialogs with side drawer panels (left, right, top, bottom) featuring customizable backdrop overlays matching Drawer.

**Import Path**:
```typescript
import { Sheet } from "@/src/components/ui/sheet/sheet";
```

#### Default
Standard side drawer panel sliding from the right.

```tsx
<Sheet>
  <SheetTrigger asChild><Button color="primary">Open Side Sheet</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>Update profile settings.</SheetDescription>
    </SheetHeader>
    <Input defaultValue="Guilherme Bus" />
    <SheetFooter>
      <Button color="primary">Save Changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

#### Side Positions
Change panel slide entry direction using the 'side' prop.

```tsx
<SheetContent side="left">...</SheetContent>
<SheetContent side="top">...</SheetContent>
<SheetContent side="bottom">...</SheetContent>
```

#### Backdrop Overlays
Custom backdrop overlay variants matching Drawer exactly: 'blur', 'dark' (80%), 'light', 'transparent', and 'none'.

```tsx
<SheetContent backdrop="blur">...</SheetContent>
<SheetContent backdrop="dark">...</SheetContent>
<SheetContent backdrop="light">...</SheetContent>
```

#### Props — SheetContent
Supported properties for SheetContent.

| Prop | Type | Default | Description |
|---|---|---|---|
| side | 'top' | 'bottom' | 'left' | 'right' | 'right' | Slide entry direction for the sheet panel. |
| backdrop | 'blur' | 'dark' | 'light' | 'transparent' | 'none' | 'blur' | Backdrop overlay style (same as Drawer). |
| showCloseButton | boolean | true | Renders top-right close icon button. |

