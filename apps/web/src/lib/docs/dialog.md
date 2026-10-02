### Dialog
A modal window component overlaid on the primary view with customizable backdrop blur/dark overlays, size options, keyboard accessibility, and zero layout shift.

**Import Path**:
```typescript
import { Dialog } from "@/src/components/ui/dialog/dialog";
```

#### Default
Standard modal dialog window with header, description, and footer action buttons.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile details here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-2">
      <Input label="Name" defaultValue="Guilherme Bus" />
      <Input label="Username" defaultValue="@guilherme" />
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="flat">Cancel</Button>
      </DialogClose>
      <Button color="primary">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Overlay Styles
Customize the backdrop overlay style using the 'overlay' prop: 'blur', 'dark', 'light', 'transparent', or 'none'.

```tsx
<DialogContent overlay="blur">...</DialogContent>
<DialogContent overlay="dark">...</DialogContent>
<DialogContent overlay="light">...</DialogContent>
```

#### Dialog Sizes
Adjust the dialog window width scale using the 'size' prop: 'sm', 'md', 'lg', 'xl', or 'full'.

```tsx
<DialogContent size="sm">...</DialogContent>
<DialogContent size="md">...</DialogContent>
<DialogContent size="lg">...</DialogContent>
<DialogContent size="xl">...</DialogContent>
```

#### Props — DialogContent
Properties to configure the DialogContent window primitive.

| Prop | Type | Default | Description |
|---|---|---|---|
| overlay | 'blur' | 'dark' | 'light' | 'transparent' | 'none' | 'blur' | Backdrop overlay style variant. |
| size | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'md' | Dialog container width scale. |

