<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { defineProps, defineEmits } from 'vue'
import CustomButton from '@/components/UI/CustomButton.vue'
import { useWizardStore } from '@/stores/wizard'
import { useWalletStore } from '@/stores/wallet'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconCross from '@/components/icons/IconCross.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['setIsOpen'])

const wizardStore = useWizardStore()
const walletStore = useWalletStore()

const wallets = [
  {
    name: 'Nami',
    icon: 'path-to-icon/nami.png',
    isInstalled: checkNamiExtension(),
  },
  {
    name: 'Yoroi',
    icon: 'path-to-icon/yoroi.png',
    isInstalled: checkYoroiExtension(),
  },
]

const selectWallet = wallet => {
  walletStore.connectWallet(wallet.name)
}

const isInstalled = wallet => wallet.isInstalled

// Функции для проверки установленных расширений
function checkNamiExtension() {
  return typeof window.cardano?.nami !== 'undefined'
}

function checkYoroiExtension() {
  return typeof window.cardano?.yoroi !== 'undefined'
}
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="emit('setIsOpen', false)"
    class="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen bg-[#0C1219]/75 backdrop-blur-[150px] bg-opacity-100"
  >
    <DialogPanel
      class="w-full h-full mx-auto rounded-lg shadow-lg relative text-gray-900 bg-black/20"
    >
      <div class="flex p-5 desktop:p-[30px] justify-between items-center">
        <div class="flex gap-2 items-center max-h-[3.5rem]">
          <IconLogo />
          <p
            class="font-poppins text-lg leading-9 font-normal text-grayscaleLicorice hidden md:block"
          >
            Cyclone
            <span class="font-light text-purple-cold font-poppins"
              >Preorder</span
            >
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex items-center gap-1.5">
            <span
              v-for="n in wizardStore.totalSteps"
              :key="n"
              class="w-2 h-2 rounded-full"
              :class="{
                'w-[10px] h-[10px] rounded-full bg-purple-cold':
                  wizardStore.currentStep >= n,
                'w-[10px] h-[10px] bg-grayscale-ghost-white rounded-full':
                  wizardStore.currentStep < n,
              }"
            ></span>
          </div>
          <button
            @click="emit('setIsOpen', false)"
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-grayscale-milk-white hover:bg-grayscale-ghost-white text-grayscaleLicorice cursor-pointer"
          >
            <IconCross />
          </button>
        </div>
      </div>
      <div class="wallet-select">
        <h2 class="text-2xl font-semibold mb-4">Connect your Cardano Wallet</h2>
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="wallet in wallets"
            :key="wallet.name"
            @click="selectWallet(wallet)"
            :class="{ 'border-blue-500': isInstalled(wallet) }"
            class="border rounded p-4"
          >
            <img :src="wallet.icon" alt="Wallet icon" />
            <span class="block mt-2">{{ wallet.name }}</span>
          </button>
        </div>

        <CustomButton
          @click="wizardStore.nextStep"
          :disabled="!wizardStore.selectedWallet"
          class="mt-8"
        >
          Next Step
        </CustomButton>
      </div>
    </DialogPanel>
  </Dialog>
</template>
