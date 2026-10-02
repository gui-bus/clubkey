### AlertDialog
A confirmation dialog modal that interrupts the user with critical content requiring an explicit response, text validation verification, or async operation loading states before proceeding.

**Import Path**:
```typescript
import { AlertDialog } from "@/src/components/ui/alertDialog/alertDialog";
```

#### Default
A standard confirmation dialog modal that interrupts the user with critical content requiring an explicit response before proceeding.

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button color="danger">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction color="danger">Delete Account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Colors
Configure the primary action button to inherit different semantic colors: default, info, success, warning, and danger.

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button color="info">Info Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Info Action Confirmation</AlertDialogTitle>
      <AlertDialogDescription>
        Perform this info action?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction color="info">Confirm Action</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Text Validation Confirmation
Require the user to type an exact confirmation string (e.g. 'DELETE') to unlock the action button.

```tsx
const [confirmInput, setConfirmInput] = useState("");

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button color="danger">Delete Production Database</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Critical Destruction Warning</AlertDialogTitle>
      <AlertDialogDescription>
        Type DELETE to confirm.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <Input
      placeholder="Type DELETE to confirm"
      value={confirmInput}
      onChange={(e) => setConfirmInput(e.target.value)}
    />
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction color="danger" disabled={confirmInput !== "DELETE"}>
        Permanently Destroy
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Custom Header Layout
Embed graphic icons, colored header text, and specialized callouts to emphasize danger or urgency.

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button color="danger" variant="bordered">Open Alert Danger</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-red-600 flex items-center gap-2">
        <AlertTriangle className="size-5" />
        Danger Zone Violation
      </AlertDialogTitle>
      <AlertDialogDescription>
        Unauthorized modifications may lead to kernel corruption.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Go Back</AlertDialogCancel>
      <AlertDialogAction color="danger">Understand & Proceed</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Async Action Loading
Render a loading spinner state on the action button during asynchronous operations. The dialog programmatically closes upon success.

```tsx
const [isLoading, setIsLoading] = useState(false);
const [isAsyncOpen, setIsAsyncOpen] = useState(false);

const handleAsyncAction = (e) => {
  e.preventDefault();
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
    setIsAsyncOpen(false);
    toast.success("Remote Cluster Synchronized", {
      description: "All cluster state data is fully updated across edge nodes.",
    });
  }, 2000);
};

return (
  <AlertDialog open={isAsyncOpen} onOpenChange={setIsAsyncOpen}>
    <AlertDialogTrigger asChild>
      <Button color="primary">Sync Remote Cluster</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Sync Cluster Nodes?</AlertDialogTitle>
        <AlertDialogDescription>This will sync all state data.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction color="info" isLoading={isLoading} onClick={handleAsyncAction}>
          Start Sync Process
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
```

#### Props — AlertDialogAction
Properties for customizing the confirmation action button.

| Prop | Type | Default | Description |
|---|---|---|---|
| color | 'default' | 'info' | 'success' | 'warning' | 'danger' | 'danger' | Semantic color theme for the confirmation action button. |
| isLoading | boolean | false | Displays a loading spinner indicator and disables interaction. |

