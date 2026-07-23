export function validateForm(values) {
  const errors = {}

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Name is required (minimum 2 characters)'
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'A valid email address is required'
  }

  if (values.phone && !/^[\d\s\-+()]{7,20}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (!values.product || values.product === '') {
    errors.product = 'Please select a product you\'re interested in'
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
