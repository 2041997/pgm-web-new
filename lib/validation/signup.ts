type SignupValues = {
  name: string
  emailorPhone: string
  username: string
  password: string
  confirmPassword: string
}

type ValidationResult = {
  valid: boolean
  errors: Partial<Record<keyof SignupValues, string>>
}

export function validateSignup(values: SignupValues): ValidationResult {
  const errors: Partial<Record<keyof SignupValues, string>> = {}

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your full name (min 2 characters)'
  }

  if (!values.emailorPhone || values.emailorPhone.trim().length < 4) {
    errors.emailorPhone = 'Please enter an email or mobile number'
  } else {
    const v = values.emailorPhone.trim()
    const emailLike = v.includes('@') && v.includes('.')
    const phoneLike = /^\d{7,15}$/.test(v.replace(/[^0-9]/g, ''))
    if (!emailLike && !phoneLike) {
      errors.emailorPhone = 'Enter a valid email or phone number'
    }
  }

  if (!values.username || values.username.trim().length < 3) {
    errors.username = 'Choose a username (min 3 characters)'
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateField<K extends keyof SignupValues>(name: K, value: string, allValues: SignupValues): { valid: boolean; error?: string } {
  const vals = { ...allValues, [name]: value }
  const res = validateSignup(vals)
  return { valid: !(res.errors && (res.errors as any)[name]), error: (res.errors as any)[name] }
}

export type { SignupValues }
