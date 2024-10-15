<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { useMainStore } from '@/stores/mainStore';
import { useMockRequest } from '@/hooks/useMockRequest';
import { notify } from '@/utils/notify';
import { REQUEST_STATUS } from '@/constants';
import { IconLogo, IconCross, IconPower } from '@/components/icons';
import {
  WalletStep,
  FormStep,
  SummaryStep,
  PaymentStep,
  CartStep,
} from './steps';

//interfaces
interface Props {
  isOpen: boolean;
}
// props
defineProps<Props>();

// passed handlers
const emit = defineEmits(['setIsOpen']);

// store
const { wizardStore, walletStore, cartStore } = useMainStore();

// hooks
const { performRequest } = useMockRequest();

const disconnectWallet = () => {
  performRequest({
    type: REQUEST_STATUS.SUCCESS,
    message: 'Wallet disconnected successfully.',
    onResolve: ({ message, status }) => {
      walletStore.disconnectWallet();
      walletStore.resetPaymentMethod();
      wizardStore.resetWizard();
      cartStore.resetCart();
      notify({ type: status, title: message });
    },
  });
};
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="emit('setIsOpen', false)"
    class="fixed inset-0 z-50 flex justify-center h-screen w-screen bg-[#0C1219]/75 backdrop-blur-[150px] bg-opacity-100"
  >
    <DialogPanel
      class="w-full h-full mx-auto rounded-lg shadow-lg relative text-gray-900 bg-black/20 px-14"
    >
      <!--  header -->
      <div class="flex items-center justify-between p-6 sticky max-h-[4rem]">
        <div class="flex gap-2 items-center">
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
            @click="disconnectWallet"
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-grayscale-milk-white hover:bg-grayscale-ghost-white text-grayscaleLicorice cursor-pointer"
          >
            <IconPower />
          </button>
        </div>
      </div>
      <!-- content -->
      <div
        class="w-full h-full !overflow-y-auto pb-10 invisible-scrollbar mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:justify-center flex-1"
      >
        <WalletStep
          v-if="wizardStore.currentStep === 1"
          @onProceedClick="wizardStore.nextStep"
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
