### Popover
Displays rich content in a portal layer triggered by a button click, with custom backdrop overlays (blur, dark, light) similar to Dialog and Drawer.

**Import Path**:
```typescript
import { Popover } from "@/src/components/ui/popover/popover";
```

#### Default
Standard popover triggered by button click.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button color="primary">Open Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set width and height.</PopoverDescription>
    </PopoverHeader>
    <Input defaultValue="100%" />
  </PopoverContent>
</Popover>
```

#### Backdrop Overlays
Dim or blur the page background behind the popover using the 'backdrop' prop, exactly like Dialog and Drawer.

```tsx
<PopoverContent backdrop="blur">...</PopoverContent>
<PopoverContent backdrop="dark">...</PopoverContent>
<PopoverContent backdrop="light">...</PopoverContent>
```

#### Props — PopoverContent
Supported properties for PopoverContent.

| Prop | Type | Default | Description |
|---|---|---|---|
| backdrop | 'none' | 'dark' | 'light' | 'blur' | 'none' | Backdrop overlay style (same as Dialog and Drawer). |
| align | 'start' | 'center' | 'end' | 'center' | Popover alignment relative to trigger button. |
| sideOffset | number | 8 | Distance in pixels from trigger element. |
| showCloseButton | boolean | true | Displays top-right close icon button. |

