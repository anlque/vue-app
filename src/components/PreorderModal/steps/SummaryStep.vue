<script setup lang="ts">
import CustomButton from '@/components/UI/CustomButton.vue'
import { defineEmits } from 'vue'

// interface Props {}

// const { selectedWallet, wallets } = defineProps<Props>()

const emit = defineEmits(['onSaveClick', 'onProceedClick'])
</script>

<template>
  <div
    class="mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
  >
    Summary
    <div class="flex gap-5 pt-5">
      <CustomButton @click="emit('onBackClick')"> Back </CustomButton>

      <CustomButton :isPrimary="true" @click="emit('onProceedClick')">
        Proceed To Checkout
      </CustomButton>
    </div>
  </div>
</template>
