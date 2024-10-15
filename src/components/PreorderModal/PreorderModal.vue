<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { useMainStore } from '@/stores/mainStore'
import { IconLogo, IconCross, IconPower } from '@/components/icons'
import {
  IconBeginWallet,
  IconEternlWallet,
  IconNamiWallet,
  IconTyphonWallet,
  IconGeroWallet,
  IconFlintWallet,
  IconYoroiWallet,
  IconLaceWallet,
  IconVesprWallet,
} from '@/components/icons/wallets'
import {
  WalletStep,
  FormStep,
  SummaryStep,
  PaymentStep,
  CartStep,
} from './steps'

// props
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

// passed handlers
const emit = defineEmits(['setIsOpen'])

// store
const { wizardStore, walletStore, cartStore } = useMainStore()

// local state
const wallets = ref([
  {
    name: 'Begin',
    icon: IconBeginWallet,
    isInstalled: false,
  },
  {
    name: 'Nami',
    icon: IconNamiWallet,
    isInstalled: false,
  },
  {
    name: 'Yoroi',
    icon: IconYoroiWallet,
    isInstalled: false,
  },

  {
    name: 'Eternl',
    icon: IconEternlWallet,
    isInstalled: false,
  },
  {
    name: 'Typhon',
    icon: IconTyphonWallet,
    isInstalled: false,
  },
  {
    name: 'Gero',
    icon: IconGeroWallet,
    isInstalled: false,
  },
  {
    name: 'Flint',
    icon: IconFlintWallet,
    isInstalled: false,
  },
  {
    name: 'Lace',
    icon: IconLaceWallet,
    isInstalled: false,
  },
  {
    name: 'Vespr',
    icon: IconVesprWallet,
    isInstalled: false,
  },
])
const selectedWallet = ref(null)

// local handlers
const selectWallet = walletName => {
  selectedWallet.value = walletName
}

const connectWallet = () => {
  if (selectedWallet.value) walletStore.connectWallet(selectedWallet.value)
}

const isWalletAvailable = (walletName: string): boolean => {
  return !!window.cardano?.[walletName.toLowerCase()]
}

const formattedData = computed(() => {
  return wallets.value
    .map(wallet => ({
      ...wallet,
      isAvailable: isWalletAvailable(wallet.name),
    }))
    .sort((a, b) => {
      return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1
    })
})

// TODO: wallet name enum
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="emit('setIsOpen', false)"
    class="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen bg-[#0C1219]/75 backdrop-blur-[150px] bg-opacity-100"
  >
    <DialogPanel
      class="w-full h-full mx-auto rounded-lg shadow-lg relative text-gray-900 bg-black/20 px-14"
    >
      <!--  header -->
      <div class="flex items-center justify-between p-6 sticky">
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
        <div class="flex items-center justify-center gap-3">
          <div class="flex items-center gap-2">
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
          <button
            v-if="wizardStore.currentStep > 1"
            @click="
              () => {
                walletStore.disconnectWallet()
                wizardStore.resetWizard()
                cartStore.resetCart()
                selectWallet(null)
              }
            "
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-grayscale-milk-white hover:bg-grayscale-ghost-white text-grayscaleLicorice cursor-pointer"
          >
            <IconPower />
          </button>
        </div>
      </div>
      <!-- content -->
      <div
        class="w-full max-h-full overflow-y-auto pb-10 invisible-scrollbar mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
      >
        <WalletStep
          v-if="wizardStore.currentStep === 1"
          :selectedWallet="selectedWallet"
          :wallets="formattedData"
          @onSelectWallet="walletName => selectWallet(walletName)"
          @onResetWallet="() => selectWallet(null)"
          @onProceedClick="
            () => {
              connectWallet()
              wizardStore.nextStep()
            }
          "
        />
        <CartStep
          v-else-if="wizardStore.currentStep === 2"
          @onClose="emit('setIsOpen', false)"
          @onProceedClick="wizardStore.nextStep"
        />
        <FormStep
          v-else-if="wizardStore.currentStep === 3"
          @onSaveClick="wizardStore.nextStep"
          @onBackClick="wizardStore.prevStep"
        />
        <SummaryStep
          v-else-if="wizardStore.currentStep === 4"
          @onBackClick="wizardStore.prevStep"
          @onProceedClick="wizardStore.nextStep"
        />
        <PaymentStep
          v-else-if="wizardStore.currentStep === 5"
          @onBackClick="wizardStore.prevStep"
        />
      </div>
    </DialogPanel>
  </Dialog>
</template>
