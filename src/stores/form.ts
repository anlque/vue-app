import { ref } from 'vue'
import { defineStore } from 'pinia'

interface FormState {
  fullName: string
  phone: string
  email: string
  street: string
  apartment: string
  city: string
  postalCode: string
  state: string
  country: string
}
const regexPatterns = {
  fullName: /^[\p{L}\s]+$/u,
  phone: /^\+?\d{10,15}$/,
  email: /[^@\s]+@[^@\s]+\.[^@\s]+/,
  street: /^[\p{L}\s]+$/u,
  apartment: /^[\p{L}\s]+$/u,
  city: /^[\p{L}\s]+$/u,
  postalCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
  state: /^[\p{L}\s]+$/u,
  country: /^[\p{L}\s]+$/u,
}

export const useFormStore = defineStore('form', () => {
  const form = ref<FormState>({
    // contact info
    fullName: '',
    phone: '',
    email: '',
    // address
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
  })

  const errors = ref({
    fullName: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    postalCode: false,
    state: false,
    country: false,
  })

  // function updateFullName(newFullName: string) {
  //   fullName.value = newFullName
  // }
  //
  // function updatePhone(newPhone: string) {
  //   phone.value = newPhone
  // }
  //
  // function updateEmail(newEmail: string) {
  //   email.value = newEmail
  // }

  function updateField(field: keyof FormState, value: string) {
    if (errors.value[field] && regexPatterns[field].test(value)) {
      console.log('test')
      errors.value[field] = false
    } else if (value.length === 0) {
      errors.value[field] = true
    }
    form.value[field] = value
  }

  function validateForm() {
    const { fullName, email, phone, street } = form.value
    if (!fullName) errors.value.fullName = true
    if (!email.includes('@')) errors.value.email = true
    if (!phone) errors.value.phone = true
    if (!street) errors.value.street = true
    // Добавьте остальные проверки для полей
  }

  function resetFieldError(field: string) {
    console.log('TEST RESET', field)
    errors.value[field] = false
  }

  // function updateShippingInfo(data: ShippingInfo) {
  //   fullName.value = data.fullName;
  //   phone.value = data.phone;
  //   email.value = data.email;
  //   address.value = data.address;
  // }

  return {
    form,
    errors,
    updateField,
    validateForm,
    resetFieldError,
  }
})
