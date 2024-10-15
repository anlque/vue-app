import { ref } from 'vue';
import { defineStore } from 'pinia';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}
const regexPatterns = {
  fullName: /^[\p{L}\s]+$/u,
  phone: /^\+?\d{10,15}$/,
  email: /[^@\s]+@[^@\s]+\.[^@\s]+/,
  street: /^[\p{L}\d\s.,]+$/u,
  apartment: /^[\p{L}\d\s.,]*$/u,
  city: /^[\p{L}\s.,]+$/u,
  postalCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
  state: /^[\p{L}\s.,]+$/u,
  country: /^[\p{L}\s]+$/u,
};

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
  });

  const errors = ref({
    fullName: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    postalCode: false,
    state: false,
    country: false,
  });

  function updateField(field: keyof FormState, value: string) {
    if (errors.value[field] && regexPatterns[field].test(value)) {
      errors.value[field] = false;
    } else if (value.length === 0) {
      errors.value[field] = true;
    }
    form.value[field] = value;
  }
  function validateForm() {
    const fields = form.value;

    Object.entries(fields).forEach(([key, value]) => {
      const trimmedValue = value.trim();
      if (!regexPatterns[key].test(trimmedValue)) {
        errors.value[key] = true;
      }
    });
  }

  return {
    form,
    errors,
    updateField,
    validateForm,
  };
});
