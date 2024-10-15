<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import CustomButton from '@/components/UI/CustomButton.vue'

// interfaces
interface Props {
  selectedWallet: string | null
  wallets: [{ name: string; icon: JSX.Element; isAvailable: boolean }]
}

// props
const { selectedWallet, wallets } = defineProps<Props>()

// passed handlers
const emit = defineEmits(['onSelectWallet', 'onProceedClick', 'onResetWallet'])
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col">
      <p class="text-xl leading-[14px] font-bold text-purple-cold">
        Connect your
      </p>
      <h1
        class="font-poppins text-grayscaleLicorice text-[40px] md:text-[52px] leadin-[66px] font-medium"
      >
        Cardano
        <span class="font-poppins font-light text-purple-cold">Wallet</span>
      </h1>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-center gap-2.5">
        <span class="text-sm leading-[22px] font-bold text-grayscaleLicorice"
          >Select from the list of available wallets</span
        >
        <div class="flex-1 h-[1px] bg-grayscale-line-2"></div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="{ name, icon, isAvailable } in wallets"
        :key="name"
        class="relative"
      >
        <button
          @click="emit('onSelectWallet', name)"
          :disabled="selectedWallet"
          :class="[
            'bg-grayscale-milk-white rounded-lg p-[10px] size-[55px] flex items-center justify-center transition-all',
            isAvailable && !selectedWallet ? 'opacity-100' : 'opacity-50',
            !selectedWallet &&
              'cursor-pointer hover:opacity-100 hover:bg-[linear-gradient(86deg,#5C8CFF_3.57%,#8273FF_95.84%)] hover:shadow-[0px_0px_22px_0px_rgba(155,158,255,0.30)]',
            selectedWallet === name &&
              '!opacity-100 bg-[linear-gradient(86deg,#5C8CFF_3.57%,#8273FF_95.84%)] shadow-[0px_0px_22px_0px_rgba(155,158,255,0.30)]',
          ]"
        >
          <component :is="icon" />
        </button>
        <span
          v-show="isAvailable && !selectedWallet"
          class="absolute -top-[2px] -right-1 size-4 rounded-full bg-[#44D7B6] border-grayscale-white border-[2px]"
        ></span>
      </div>
    </div>

    <div
      :class="[
        'flex items-center gap-4 md:gap-[20px] mt-5 pb-[25px] md:pb-0 w-full',
        selectedWallet ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <CustomButton class="w-1/2" @click="emit('onResetWallet')">
        Change Wallet
      </CustomButton>

      <CustomButton
        class="w-1/2"
        :isPrimary="true"
        @click="emit('onProceedClick')"
      >
        Proceed
      </CustomButton>
    </div>
  </div>
</template>
