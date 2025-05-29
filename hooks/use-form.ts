import { useState, useCallback } from 'react'

interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

interface ValidationRules {
  [key: string]: ValidationRule[]
}

interface FormErrors {
  [key: string]: string
}

interface UseFormOptions<T> {
  initialValues: T
  validationRules?: ValidationRules
  onSubmit: (values: T) => Promise<void>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = useCallback(
    (fieldValues: T = values) => {
      const newErrors: FormErrors = {}

      Object.keys(validationRules).forEach((field) => {
        const fieldRules = validationRules[field]
        const value = fieldValues[field]

        for (const rule of fieldRules) {
          if (!rule.validate(value)) {
            newErrors[field] = rule.message
            break
          }
        }
      })

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [validationRules, values]
  )

  const handleChange = useCallback(
    (field: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: '' }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      setSubmitError(null)

      if (!validate()) {
        return
      }

      setIsSubmitting(true)

      try {
        await onSubmit(values)
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, validate, values]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setSubmitError(null)
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  }
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value) => value !== undefined && value !== '',
    message,
  }),
  email: (message = 'Invalid email address'): ValidationRule => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  minLength: (length: number, message?: string): ValidationRule => ({
    validate: (value) => value.length >= length,
    message: message || `Must be at least ${length} characters`,
  }),
  maxLength: (length: number, message?: string): ValidationRule => ({
    validate: (value) => value.length <= length,
    message: message || `Must be at most ${length} characters`,
  }),
  password: (message = 'Password must be at least 8 characters'): ValidationRule => ({
    validate: (value) => value.length >= 8,
    message,
  }),
} 