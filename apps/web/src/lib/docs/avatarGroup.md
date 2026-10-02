### AvatarGroup
Stack multiple avatars together with smooth cubic-bezier hover expansion, orientation support (horizontal or vertical), overlap density control, count truncation, and clean dark/light neutral theme styling.

**Import Path**:
```typescript
import { AvatarGroup } from "@/src/components/ui/avatarGroup/avatarGroup";
```

#### Default
A standard avatar group component stacking multiple user avatars with smooth hover expansion transitions.

```tsx
<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Jenkins" />
    <AvatarFallback>SJ</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Emily Davis" />
    <AvatarFallback>ED</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>MK</AvatarFallback>
  </Avatar>
</AvatarGroup>
```

#### Overlap Density
Adjust spacing overlap tightness using the 'overlap' prop ('sm', 'md', 'lg').

```tsx
<AvatarGroup overlap="sm">...</AvatarGroup>
<AvatarGroup overlap="md">...</AvatarGroup>
<AvatarGroup overlap="lg">...</AvatarGroup>
```

#### Max Limit & Overflow Badge
Use the 'max' prop to cap visible avatars and automatically display a '+N' excess count badge formatted with clean dark/light neutral colors.

```tsx
<AvatarGroup max={3}>
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
</AvatarGroup>
```

#### Hover with Tooltip
Enable tooltips by setting the 'showTooltip' prop. Hovering over each avatar displays its corresponding 'title' or 'alt' label.

```tsx
<AvatarGroup showTooltip>
  <Avatar title="Sarah Jenkins">
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Jenkins" />
    <AvatarFallback>SJ</AvatarFallback>
  </Avatar>
  <Avatar title="Emily Davis">
    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Emily Davis" />
    <AvatarFallback>ED</AvatarFallback>
  </Avatar>
  <Avatar title="Alex Rivera">
    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Alex Rivera" />
    <AvatarFallback>AR</AvatarFallback>
  </Avatar>
</AvatarGroup>
```

#### Pressable Avatars
Make avatars interactive by adding the 'isPressable' prop. You can add 'onClick' listeners to trigger custom actions, like showing toast notifications.

```tsx
import { toast } from "@/src/components/ui/toast/toast";

<AvatarGroup isPressable>
  <Avatar title="Sarah Jenkins" onClick={() => toast("Clicked Sarah Jenkins")}>
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>SJ</AvatarFallback>
  </Avatar>
  <Avatar title="Emily Davis" onClick={() => toast("Clicked Emily Davis")}>
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>ED</AvatarFallback>
  </Avatar>
</AvatarGroup>
```

#### Props — AvatarGroup
Properties for configuring the AvatarGroup component.

| Prop | Type | Default | Description |
|---|---|---|---|
| overlap | 'sm' | 'md' | 'lg' | 'md' | Overlap spacing tightness density between avatars. |
| orientation | 'horizontal' | 'vertical' | 'horizontal' | Stack direction scale for grouping avatars. |
| max | number | — | Maximum number of avatars to display before rendering excess (+N) badge. |
| showTooltip | boolean | false | Enables showing tooltips above each avatar showing its title or alt description on hover. |
| isPressable | boolean | false | Enables scaling animations on mouse hover/press for nested avatars. |

