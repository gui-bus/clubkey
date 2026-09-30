### Stepper
Guides users through multi-step forms or workflows with progress indicators, status titles, icons, error handling, and interactive step navigation.

**Import Path**:
```typescript
import { Stepper, StepperItem, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator } from "@/src/components/ui/stepper/stepper";
```

#### Default
Standard horizontal multi-step progress bar with dynamic line highlights and navigation buttons.

```tsx
const [activeStep, setActiveStep] = React.useState(0);

<Stepper activeStep={activeStep} onStepClick={setActiveStep}>
  <StepperItem step={0}>
    <StepperIndicator step={0} />
    <div>
      <StepperTitle>Account Details</StepperTitle>
      <StepperDescription>Enter your email & password</StepperDescription>
    </div>
  </StepperItem>
  <StepperSeparator step={0} />
  <StepperItem step={1}>
    <StepperIndicator step={1} />
    <div>
      <StepperTitle>Organization</StepperTitle>
      <StepperDescription>Setup workspace team</StepperDescription>
    </div>
  </StepperItem>
  <StepperSeparator step={1} />
  <StepperItem step={2}>
    <StepperIndicator step={2} />
    <div>
      <StepperTitle>Confirmation</StepperTitle>
      <StepperDescription>Review and launch</StepperDescription>
    </div>
  </StepperItem>
</Stepper>

<Button variant="flat" color="default" onClick={() => setActiveStep((s) => Math.max(0, s - 1))}>
  Previous
</Button>
<Button color="primary" onClick={() => setActiveStep((s) => Math.min(2, s + 1))}>
  Next
</Button>
```

#### Variants
Choose between different step indicator visual structures.

```tsx
<Stepper variant="default" activeStep={1}>...</Stepper>
<Stepper variant="cards" activeStep={1}>...</Stepper>
```

#### Colors
All steps and connection lines strictly adhere to the chosen theme color.

```tsx
<Stepper color="primary" activeStep={1}>...</Stepper>
<Stepper color="success" activeStep={1}>...</Stepper>
<Stepper color="warning" activeStep={1}>...</Stepper>
<Stepper color="danger" activeStep={1}>...</Stepper>
```

#### Controlled
Control the active step programmatically by binding the activeStep prop to external state.

```tsx
const [activeStep, setActiveStep] = React.useState(1);

<Stepper activeStep={activeStep}>
  <StepperItem step={0}>...</StepperItem>
  <StepperSeparator step={0} />
  <StepperItem step={1}>...</StepperItem>
  <StepperSeparator step={1} />
  <StepperItem step={2}>...</StepperItem>
</Stepper>

<Button onClick={() => setActiveStep(0)}>Step 1</Button>
<Button onClick={() => setActiveStep(1)}>Step 2</Button>
<Button onClick={() => setActiveStep(2)}>Step 3</Button>
```

#### Step Validation
Block advancing to the next step until all required fields in the current step are filled.

```tsx
const [activeStep, setActiveStep] = React.useState(0);
const [email, setEmail] = React.useState("");
const [name, setName] = React.useState("");
const [error, setError] = React.useState("");

const handleNext = () => {
  if (activeStep === 0) {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields before continuing.");
      return;
    }
  }
  setError("");
  setActiveStep((s) => s + 1);
};

<Stepper activeStep={activeStep}>...</Stepper>

{error && <p className="text-xs text-rose-500">{error}</p>}

<Button color="primary" onClick={handleNext}>Next</Button>
```

#### Error State & Custom Icons
Render error indicators and custom Iconify icons on individual steps.

```tsx
<Stepper activeStep={1}>
  <StepperItem step={1} isError>
    <StepperIndicator step={1} isError />
    <div>
      <StepperTitle className="text-rose-500">Payment Failed</StepperTitle>
      <StepperDescription>Card declined</StepperDescription>
    </div>
  </StepperItem>
</Stepper>
```

#### Vertical Orientation
Vertical stepper layout suitable for side panels, timeline checklists, and long forms.

```tsx
<Stepper orientation="vertical" activeStep={1}>
  <StepperItem step={0}>...</StepperItem>
  <StepperSeparator step={0} />
  <StepperItem step={1}>...</StepperItem>
</Stepper>
```

#### Props — Stepper
Supported properties for Stepper.

| Prop | Type | Default | Description |
|---|---|---|---|
| activeStep | number | 0 | 0-indexed active step index. |
| variant | 'default' | 'cards' | 'default' | Visual layout structure variant. |
| size | 'sm' | 'md' | 'lg' | 'md' | Indicator dimensions and font size. |
| color | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default' | 'primary' | Color theme accent for active step indicator. |
| orientation | 'horizontal' | 'vertical' | 'horizontal' | Stepper orientation layout. |
| onStepClick | (step: number) =&gt; void | — | Callback triggered on step indicator click. |

