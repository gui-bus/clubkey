### Drawer
A sliding panel primitive supporting positions (bottom, top, left, right), size scales (sm, md, lg, xl, full), customizable backdrop overlays (blur, dark, light), keyboard accessibility, and zero page layout shift.

**Import Path**:
```typescript
import { Drawer } from "@/src/components/ui/drawer/drawer";
```

#### Default
Standard bottom drawer sheet with drag handle, backdrop blur overlay, and action controls.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Goal Drawer</Button>
  </DrawerTrigger>
  <DrawerContent position="bottom" size="md">
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>Set your daily calorie activity goal.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild><Button color="primary">Submit Goal</Button></DrawerClose>
        <DrawerClose asChild><Button variant="flat">Cancel</Button></DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

#### Drawer Positions
Slide in from any screen edge using the 'position' prop: 'right', 'left', 'top', or 'bottom'.

```tsx
<DrawerContent position="right">...</DrawerContent>
<DrawerContent position="left">...</DrawerContent>
<DrawerContent position="top">...</DrawerContent>
<DrawerContent position="bottom">...</DrawerContent>
```

#### Overlay Styles
Choose backdrop overlay styles using the 'overlay' prop: 'blur', 'dark', 'light', 'transparent', or 'none'.

```tsx
<DrawerContent overlay="blur">...</DrawerContent>
<DrawerContent overlay="dark">...</DrawerContent>
<DrawerContent overlay="light">...</DrawerContent>
```

#### Drawer Sizes
Scale drawer width or height using the 'size' prop: 'sm', 'md', 'lg', 'xl', or 'full'.

```tsx
<DrawerContent position="right" size="sm">...</DrawerContent>
<DrawerContent position="right" size="md">...</DrawerContent>
<DrawerContent position="right" size="lg">...</DrawerContent>
<DrawerContent position="right" size="xl">...</DrawerContent>
```

#### Swipe-to-Close Drag Handle
Features touch gesture listeners (onTouchStart, onTouchMove, onTouchEnd) allowing mobile users to drag down the handle or sheet content (>100px threshold) to dismiss the drawer smoothly.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Swipeable Bottom Sheet</Button>
  </DrawerTrigger>
  <DrawerContent position="bottom" size="md" swipeToClose>
    <DrawerHeader>
      <DrawerTitle>Swipe Down to Close</DrawerTitle>
      <DrawerDescription>Drag down the top handle to dismiss on touch devices.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

#### Props — DrawerContent
Properties to configure the DrawerContent sheet primitive.

| Prop | Type | Default | Description |
|---|---|---|---|
| swipeToClose | boolean | true | Enables touch drag gestures (Vaul-style) to swipe down/away to close. |
| position | 'bottom' | 'top' | 'left' | 'right' | 'right' | Screen edge position where drawer slides from. |
| size | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'md' | Drawer height or width dimensional scale. |
| overlay | 'blur' | 'dark' | 'light' | 'transparent' | 'none' | 'blur' | Backdrop overlay style variant. |

