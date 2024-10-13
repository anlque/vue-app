<script setup lang="ts">
import CustomButton from '@/components/UI/CustomButton.vue'
import { defineEmits } from 'vue'

// interface Props {}

// const { selectedWallet, wallets } = defineProps<Props>()

const emit = defineEmits(['onSaveClick', 'onBackClick'])
</script>

<template>
  <div
    class="mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
  >
    Form
    <div class="flex gap-5 pt-5">
      <CustomButton :className="'w-full'" @click="emit('onBackClick')">
        Back
      </CustomButton>

      <CustomButton
        :className="'w-full'"
        :isPrimary="true"
        @click="emit('onSaveClick')"
      >
        Save Shipping info
      </CustomButton>
    </div>
  </div>
</template>
