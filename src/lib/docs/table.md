### Table
A responsive data table for presenting tabular information with custom row highlights, headers, status badges, and captions.

**Import Path**:
```typescript
import { Table } from "@/src/components/ui/table/table";
```

#### Default
Standard data table layout.

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell><Badge color="success">Paid</Badge></TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Selected Row Highlights
Mark rows with data-state='selected' for interactive data selection.

```tsx
<TableRow data-state="selected">
  <TableCell>Guilherme Bus</TableCell>
</TableRow>
```

#### Zebra Striping
Alternate background shading for even table rows using striped={true}.

```tsx
<Table striped>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

#### Compact Density
Reduce padding inside table cells for dense data grids using density='compact'.

```tsx
<Table density="compact" striped>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

#### Sticky Header & Sticky First Column
Freeze table headers at top during vertical scrolling and freeze the first column during horizontal scrolling.

```tsx
<Table stickyHeader stickyFirstColumn>
  <TableHeader isSticky>
    <TableRow>
      <TableHead isStickyColumn>Member</TableHead>
      <TableHead>Q1 Sales</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell isStickyColumn className="font-bold">Engineer #1</TableCell>
      <TableCell>$45,200</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Props — Table
Supported properties for Table elements.

| Element | Description |
|---|---|
| &lt;Table /&gt; | Outer table wrapper with scrollable card border container. |
| &lt;TableHeader /&gt; | Header row container &lt;thead&gt;. |
| &lt;TableRow /&gt; | Table row &lt;tr&gt; with hover and selected highlights. |
| &lt;TableCell /&gt; | Standard data cell &lt;td&gt;. |

