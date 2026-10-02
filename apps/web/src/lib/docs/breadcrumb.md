### Breadcrumb
A navigational helper that reveals the user's location within a website or web application hierarchy. Supports system design variants, custom separators, icons, and auto-collapse.

**Import Path**:
```typescript
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/src/components/ui/breadcrumb/breadcrumb";
```

#### Default
A standard breadcrumb navigation path leading to the current active page.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

#### Variants
Breadcrumb follows the system design language: default, bordered, flat, ghost, and shadow — matching the same vocabulary as Button and other components.

```tsx
<Breadcrumb variant="bordered">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

#### Custom Separator
Pass any ReactNode to 'separator' on the root Breadcrumb — use an icon component or a plain string like '/' or '·'. The separator flows to all BreadcrumbSeparator children automatically.

```tsx
<Breadcrumb separator="/">
  ...
</Breadcrumb>

<Breadcrumb separator={<Icon icon="hugeicons:chevron-right" className="size-3.5" />}>
  ...
</Breadcrumb>
```

#### With Icons
Pass icon names to BreadcrumbLink and BreadcrumbPage for enhanced visual cues.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon="hugeicons:home-01">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon="hugeicons:grid-view">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage icon="hugeicons:navigation-01">Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

#### Collapsed Items with Dropdown Menu
Clicking the BreadcrumbEllipsis trigger opens a DropdownMenu containing hidden route items without shifting page layout.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <BreadcrumbEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Documentation</DropdownMenuItem>
          <DropdownMenuItem>All Components</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

#### Automatic Middle Collapse
Set 'maxItems' on BreadcrumbList to automatically collapse middle steps into a popover when paths exceed limit.

```tsx
<Breadcrumb>
  <BreadcrumbList maxItems={3}>
    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

#### Props — Breadcrumb
Sub-components for building accessible Breadcrumb trails.

| Component | Props | Description |
|---|---|---|
| Breadcrumb | variant?: 'default' | 'bordered' | 'flat' | 'ghost' | 'shadow' separator?: ReactNode | Root container. Variant and separator context flows to all sub-components. |
| BreadcrumbList | maxItems?: number | Ordered list with optional auto-collapse when exceeding maxItems. |
| BreadcrumbLink | icon?: string | Interactive link with optional icon. Styled per variant. |
| BreadcrumbPage | icon?: string | Active page with aria-current="page". Styled per variant. |
| BreadcrumbSeparator | children?: ReactNode | Uses root separator by default. Pass children to override locally. |
| BreadcrumbEllipsis | HTMLButtonProps | Button trigger for opening DropdownMenu hidden routes. |

