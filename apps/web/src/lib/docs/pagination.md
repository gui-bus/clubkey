### Pagination
Comprehensive pagination suite supporting high-level toolbar integration, multiple visual variants matching input components, customizable sizing, coloring, and border radius shapes.

**Import Path**:
```typescript
import { Pagination, PaginationToolbar } from "@/src/components/ui/pagination/pagination";
```

#### Default
Standard pagination layout containing previous, next, and active numerical page triggers.

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

#### Variants
Surface styling options matched directly to input component configurations.

```tsx
<Pagination variant="default">...</Pagination>
<Pagination variant="bordered">...</Pagination>
<Pagination variant="flat">...</Pagination>
<Pagination variant="underlined">...</Pagination>
<Pagination variant="filled">...</Pagination>
<Pagination variant="glassmorphism">...</Pagination>
<Pagination variant="glow">...</Pagination>
```

#### Colors
Style active items with alert colors: primary, success, warning, danger, and default.

```tsx
<Pagination color="primary">...</Pagination>
<Pagination color="success">...</Pagination>
<Pagination color="warning">...</Pagination>
<Pagination color="danger">...</Pagination>
<Pagination color="default">...</Pagination>
```

#### Sizes
Choose from sm, md, or lg dimensions to fit different layout designs.

```tsx
<Pagination size="sm">...</Pagination>
<Pagination size="md">...</Pagination>
<Pagination size="lg">...</Pagination>
```

#### Radius
Choose border radius style for pagination active buttons matching design tokens.

```tsx
<Pagination radius="none">...</Pagination>
<Pagination radius="md">...</Pagination>
<Pagination radius="full">...</Pagination>
```

#### Full Pagination Toolbar Suite
High-level toolbar containing rows per page dropdown, total records summary, quick page jumper, and first/last buttons.

```tsx
const [page, setPage] = React.useState(1);
const [pageSize, setPageSize] = React.useState(10);

<PaginationToolbar
  page={page}
  total={150}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  showTotal
  showRowsPerPage
  showJumper
  showFirstButton
  showLastButton
/>
```

#### Props — PaginationToolbar
Supported properties for the PaginationToolbar component.

| Prop | Type | Default | Description |
|---|---|---|---|
| showRowsPerPage | boolean | true | Renders page size selector dropdown (10, 25, 50, 100). |
| showJumper | boolean | true | Renders direct page jump input box. |
| showTotal | boolean | true | Displays total record summary string (e.g., '1-10 of 150 items'). |
| showFirstButton / showLastButton | boolean | true | Renders double arrow buttons to jump directly to page 1 or totalPages. |

