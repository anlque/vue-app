<script setup lang="ts">
import { defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/mainStore'
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion'
import CustomButton from '@/components/UI/CustomButton.vue'
import { IconCard } from '@/components/icons'

const paymentMethods = [
  {
    paymentTypeTitle: 'ADA',
    amount: '',
  },
]

// store
const { cartStore } = useMainStore()
const { total } = storeToRefs(cartStore)

// hooks
const { amountInCrypto } = useCurrencyConversion('USDM', total.value)

// passed handlers
const emit = defineEmits(['onBackClick'])
</script>

<template>
  <div
    class="w-full mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
  >
    <div
      class="px-1 pb-14 lg:pb-[30px] md:px-[30px] flex flex-col flex-1 gap-10 md:gap-[50px] md:w-full md:max-w-[688px]"
    >
      <div class="flex items-center gap-[6px]">
        <IconCard />
        <span
          class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
          >How do you want to pay?</span
        >
      </div>
      <div class="flex w-full gap-5">
        <CustomButton :className="'w-1/2'" @click="emit('onBackClick')">
          Back
        </CustomButton>

        <CustomButton :isPrimary="true" :className="'w-1/2'">
          Sign Transaction
        </CustomButton>
      </div>
    </div>
  </div>
</template>
