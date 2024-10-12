import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Address {
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

// interface ShippingInfo {
//   fullName: string;
//   phone: string;
//   email: string;
//   address: Address;
// }

export const useFormStore = defineStore('form', () => {
  const fullName = ref<string>('');
  const phone = ref<string>('');
  const email = ref<string>('');
  const address = ref<Address>({
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    state:'',
    country: '',
  });

  function updateFullName(newFullName: string) {
    fullName.value = newFullName;
  }

  function updatePhone(newPhone: string) {
    phone.value = newPhone;
  }

  function updateEmail(newEmail: string) {
    email.value = newEmail;
  }

  function updateAddressField(field: keyof Address, value: string) {
    address.value[field] = value;
  }

  // function updateShippingInfo(data: ShippingInfo) {
  //   fullName.value = data.fullName;
  //   phone.value = data.phone;
  //   email.value = data.email;
  //   address.value = data.address;
  // }

  return { fullName, phone, email, address, updateFullName, updatePhone, updateEmail, updateAddressField};
});
