<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { defineProps, defineEmits, computed, ref } from 'vue'
import { useWizardStore } from '@/stores/wizard'
import { useWalletStore } from '@/stores/wallet'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconCross from '@/components/icons/IconCross.vue'
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
import WalletStep from '@/components/PreorderModal/steps/WalletStep.vue'
import FormStep from './steps/FormStep'
import SummaryStep from './steps/SummaryStep'
import PaymentStep from '@/components/PreorderModal/steps/PaymentStep.vue'
import IconPower from '@/components/icons/IconPower.vue'
import CartStep from './steps/CartStep'
import { useCartStore } from '@/stores/cart'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['setIsOpen'])

const wizardStore = useWizardStore()
const walletStore = useWalletStore()
const cartStore = useCartStore()

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

const selectWallet = walletName => {
  selectedWallet.value = walletName
}

const connectWallet = () => {
  if (selectedWallet.value) walletStore.connectWallet(selectedWallet.value)
}

function isWalletAvailable(walletName: string): boolean {
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
// const debugWallet = (value, walletName) => {
//   console.log('Debug Wallet Name:', value, walletName)
//   return walletName
// }
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
      <!--  header -->
      <div
        class="flex p-5 desktop:p-[30px] justify-between items-center sticky h-[3.5rem]"
      >
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
        class="w-full max-h-full overflow-y-auto h-[calc(100vh-3.5rem)] invisible-scrollbar"
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
        <PaymentStep v-else-if="wizardStore.currentStep === 5" />
      </div>
    </DialogPanel>
  </Dialog>
</template>
