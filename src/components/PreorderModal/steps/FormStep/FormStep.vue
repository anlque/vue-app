<script setup lang="ts">
import { defineEmits } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';
import type { FormState } from '@/stores/form';
import { FORM_FIELD_NAME } from '@/constants';
import CustomButton from '@/components/UI/CustomButton.vue';
import FormInput from './FormInput.vue';

// store
const { formStore } = useMainStore();
const { form, errors } = storeToRefs(formStore);
const { updateField, validateForm } = formStore;

// passed handlers
const emit = defineEmits(['onSaveClick', 'onBackClick']);

// local handlers
const updateFormField = (fieldName: keyof FormState, fieldValue: string) => {
  updateField(fieldName, fieldValue);
};

const validateAndSave = () => {
  validateForm();
  if (!Object.values(formStore.errors).some((err) => err)) {
    emit('onSaveClick');
  }
};
</script>

<template>
  <div
    class="w-full md:mt-0 px-2 sm:px-6 py-6 md:px-[30px] md:flex md:justify-center pb-20 min-h-full"
  >
    <div
      class="px-1 pb-14 lg:pb-[30px] md:px-[30px] flex flex-col flex-1 gap-6 md:gap-[50px] md:w-full md:max-w-[688px]"
    >
      <div class="flex flex-col gap-6">
        <FormInput
          :value="form.fullName"
          :placeholder="'Full Name'"
          :id="'fullName'"
          :error="errors.fullName"
          @onChange="
            (value) => {
              updateFormField(FORM_FIELD_NAME.FULL_NAME, value);
            }
          "
        />

        <div class="flex flex-col gap-6 md:gap-5 md:flex-row w-full">
          <FormInput
            :value="form.phone"
            :placeholder="'Phone'"
            :id="'Phone'"
            :error="errors.phone"
            :popoverText="'Please input the correct phone number for example +111-111-111-(1111) or +1111111111111 or 001111111111111 to receive your delivery. ⁠'"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.PHONE, value);
              }
            "
          />
          <FormInput
            :value="form.email"
            :placeholder="'Email'"
            :id="'Email'"
            :error="errors.email"
            :popoverText="'Please input correct email address to ensure you receive order emails and to track your delivery.'"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.EMAIL, value);
              }
            "
          />
        </div>
        <FormInput
          :value="form.street"
          :placeholder="'Street Address'"
          :id="'streetAddress'"
          :error="errors.street"
          @onChange="
            (value) => {
              updateFormField(FORM_FIELD_NAME.STREET, value);
            }
          "
        />
        <FormInput
          :value="form.apartment"
          :placeholder="'Apartment/Suite'"
          :id="'apartment'"
          :error="errors.apartment"
          @onChange="
            (value) => {
              updateFormField(FORM_FIELD_NAME.APARTMENT, value);
            }
          "
        />
        <div class="flex flex-col gap-6 md:gap-5 md:flex-row w-full">
          <FormInput
            :value="form.city"
            :placeholder="'City'"
            :id="'city'"
            :error="errors.city"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.CITY, value);
              }
            "
          />
          <FormInput
            :value="form.postalCode"
            :placeholder="'Postal Code'"
            :id="'postalCode'"
            :error="errors.postalCode"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.POSTAL_CODE, value);
              }
            "
          />
        </div>
        <div class="flex flex-col gap-6 md:gap-5 md:flex-row w-full">
          <FormInput
            :value="form.state"
            :placeholder="'Province/State'"
            :id="'state'"
            :error="errors.state"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.STATE, value);
              }
            "
          />
          <FormInput
            :value="form.country"
            :placeholder="'Country'"
            :id="'country'"
            :error="errors.country"
            @onChange="
              (value) => {
                updateFormField(FORM_FIELD_NAME.COUNTRY, value);
              }
            "
          />
        </div>

        <p class="text-xs font-normal text-grayscaleWaterloo italic">
          <span class="text-grayscaleLicorice">*Note:</span>
          Please try to enter the address details as accurate as possible.
          Autocomplete address may be inaccurate.
        </p>
      </div>
      <div class="flex w-full gap-5">
        <CustomButton class="w-1/2" @click="emit('onBackClick')">
          Back
        </CustomButton>

        <CustomButton :isPrimary="true" class="w-1/2" @click="validateAndSave">
          Save
          <span class="hidden sm:block">Shipping info</span>
        </CustomButton>
      </div>
    </div>
  </div>
</template>
