### Toast
A rich feedback notification popover with status accent bars, background icons, spinner loaders, progress indicator timers, and interactive action buttons.

**Import Path**:
```typescript
import { Toast, toast } from "@/src/components/ui/toast/toast";
```

#### Default
Standard clean notification toast with title and description.

```tsx
import { toast } from "@/src/components/ui/toast/toast";

toast("New Workspace Created", { description: "Your workspace is ready for team members." });
```

#### Variants
Choose from default clean layout, bordered outline style, or bar accent highlights on the left.

```tsx
toast("Default Layout", { variant: "default" });
toast.success("Design System Saved", { variant: "bordered" });
toast("Bar Notification", { variant: "bar" });
```

#### Sizes
Toasts support small, medium, or large sizes altering widths and inner layout spaces.

```tsx
toast("Small Toast Notification", { size: "sm" });
toast("Medium Toast Notification", { size: "md" });
toast("Large Toast Notification", { size: "lg" });
```

#### Radius
Configure standard border-radius styles ranging from square to fully rounded nodes.

```tsx
toast("Radius: None", { radius: "none" });
toast("Radius: Medium", { radius: "md" });
toast("Radius: Extra Large", { radius: "xl" });
toast("Radius: Full", { radius: "full" });
```

#### Rich Colors
Fills the entire background color of the toast matching the semantic status color.

```tsx
toast.success("Successfully Completed", { richColors: true });
toast.error("Operation Aborted", { richColors: true });
toast.warning("Server Capacity Warning", { richColors: true });
toast.info("Database Synchronized", { richColors: true });
```

#### Background Icon Decoration
Fades a large low-opacity decorative status icon in the background of the toast.

```tsx
toast.success("System Optimized", {
  showBgIcon: true,
  description: "Cleaned cache and files."
});
```

#### Timer Progress Bar
Render a timer indicator bar showing remaining duration.

```tsx
toast.success("Closing Automatically", {
  showProgress: true,
  duration: 5000
});
```

#### Interactive Action Toast
Include clickable inline action callbacks inside notifications.

```tsx
toast.success("File Deleted", {
  description: "Report_2026.pdf was moved to trash.",
  action: {
    label: "Undo Deletion",
    onClick: () => console.log("Restored!"),
  },
});
```

#### Loading Toast Variations
Trigger animated loading spinner toasts, and dynamically update them to success or error results after asynchronous tasks.

```tsx
toast.loading("Synchronizing Data...", { id: "my-toast" });

const id = "upload-toast";
toast.loading("Uploading Assets...", { id });
setTimeout(() => {
  toast.success("Upload Complete!", { id, description: "All assets are live." });
}, 2500);

toast.loading("Connecting to DB...", { id: "db-toast" });
setTimeout(() => {
  toast.error("Connection Failed!", { id: "db-toast" });
}, 2500);
```

#### Custom Spinner Variants
Choose custom spinner animation styles for loading toasts using spinnerVariant ('dots', 'bars', 'pulse', 'ring', 'gradient').

```tsx
toast.loading("Fetching Records...", { spinnerVariant: "dots" });
toast.loading("Processing Order...", { spinnerVariant: "bars" });
toast.loading("Syncing Files...", { spinnerVariant: "pulse" });
toast.loading("Routing Connection...", { spinnerVariant: "ring" });
toast.loading("Applying Updates...", { spinnerVariant: "gradient" });
```

