### Form
A wrapper component for building forms with React Hook Form integration, Zod schema validation, and automatic smooth scroll to first error.

**Import Path**:
```typescript
import { Form } from "@/src/components/ui/form/form";
```

#### Default
Basic Form with submit handler and field inputs.

```tsx
const form = useForm<FormValues>();

<Form form={form} onSubmit={(data) => console.log(data)}>
  <FormField label="Username" isRequired>
    <Input {...form.register("username")} />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

#### Schema Validation with Zod
Integrate Zod schemas and zodResolver to validate data types, email formats, and custom error boundaries.

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const zodSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  age: z.number().min(18, "You must be at least 18 years old."),
});

const form = useForm<FormValues>({
  resolver: zodResolver(zodSchema),
  defaultValues: { email: "", age: 18 },
});

<Form form={form} onSubmit={onSubmit}>
  <FormField
    label="Email Address"
    isInvalid={!!form.formState.errors.email}
    errorMessage={form.formState.errors.email?.message}
  >
    <Input type="email" {...form.register("email")} />
  </FormField>
</Form>
```

#### Auto Scroll to First Error
Submitting a form with validation errors automatically scrolls the window viewport to center and focus the first invalid field using smooth behavior.

```tsx
<Form
  form={form}
  onSubmit={onSubmit}
  scrollToFirstError
>
  <FormField label="Field A" isInvalid={!!errors.fieldA} errorMessage={errors.fieldA?.message}>
    <Input {...form.register("fieldA")} />
  </FormField>
</Form>
```

#### Props — Form
Supported properties for the Form component.

| Prop | Type | Default | Description |
|---|---|---|---|
| scrollToFirstError | boolean | true | Automatically scrolls viewport smoothly to first invalid field input on submit. |

