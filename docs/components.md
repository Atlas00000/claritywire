# Component Documentation

## Layout Components

### Header
The main navigation header component.

```typescript
import Header from "@/components/layout/header"

// Usage
<Header />
```

### Footer
The main footer component.

```typescript
import Footer from "@/components/layout/footer"

// Usage
<Footer />
```

## UI Components

### ThemeProvider
Manages theme state and provides theme context to the application.

```typescript
import { ThemeProvider } from "@/components/theme-provider"

// Props
interface ThemeProviderProps {
  attribute?: string
  defaultTheme?: "light" | "dark" | "system"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}

// Usage
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
  storageKey="claritywire-theme"
>
  {children}
</ThemeProvider>
```

### Button
A customizable button component with various styles and states.

```typescript
import { Button } from "@/components/ui/button"

// Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

// Usage
<Button variant="default" size="default">
  Click me
</Button>
```

### Card
A container component for content with various styles.

```typescript
import { Card } from "@/components/ui/card"

// Props
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered"
}

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

## Form Components

### Input
A styled input component with various states.

```typescript
import { Input } from "@/components/ui/input"

// Props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

// Usage
<Input
  type="text"
  placeholder="Enter text"
  error={error}
  label="Username"
/>
```

### Form
A form component with built-in validation.

```typescript
import { Form } from "@/components/ui/form"

// Props
interface FormProps {
  onSubmit: (data: any) => void
  defaultValues?: Record<string, any>
  schema?: ZodSchema
}

// Usage
<Form
  onSubmit={handleSubmit}
  defaultValues={defaultValues}
  schema={validationSchema}
>
  {/* Form fields */}
</Form>
```

## Custom Hooks

### useTheme
Hook for managing theme state.

```typescript
import { useTheme } from "@/hooks/use-theme"

// Usage
const { theme, setTheme } = useTheme()
```

### useForm
Hook for form handling with validation.

```typescript
import { useForm } from "@/hooks/use-form"

// Usage
const { register, handleSubmit, errors } = useForm({
  defaultValues,
  schema: validationSchema
})
```

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use TypeScript for type safety
   - Document props and usage

2. **Styling**
   - Use Tailwind CSS classes
   - Follow the design system
   - Maintain consistent spacing

3. **Performance**
   - Memoize expensive computations
   - Use proper React hooks
   - Implement proper error boundaries

4. **Accessibility**
   - Use semantic HTML
   - Include ARIA attributes
   - Ensure keyboard navigation

## Contributing Components

When adding new components:
1. Create component in appropriate directory
2. Add TypeScript types
3. Include usage examples
4. Add to documentation
5. Test thoroughly 