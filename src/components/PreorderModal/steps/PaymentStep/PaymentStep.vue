<script setup lang="ts">
import { defineEmits } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';
import type { Currency } from '@/stores/wallet';
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion';
import { useMockRequest } from '@/hooks/useMockRequest';
import { notify } from '@/utils/notify';
import { CRYPTO_CURRENCIES, REQUEST_STATUS } from '@/constants';
import { IconCard } from '@/components/icons';
import CustomLoader from '@/components/UI/CustomLoader.vue';
import CustomButton from '@/components/UI/CustomButton.vue';
import PaymentMethodCard from './PaymentMethodCard.vue';

const images = {
  [CRYPTO_CURRENCIES.ADA]: '/images/cardano-ada-logo%201.png',
  [CRYPTO_CURRENCIES.USDM]: '/images/cardano-usdm-logo%201.png',
};

const paymentMethods = [CRYPTO_CURRENCIES.ADA, CRYPTO_CURRENCIES.USDM];

// store
const { cartStore, walletStore } = useMainStore();
const { total } = storeToRefs(cartStore);
const { wallet } = storeToRefs(walletStore);

// passed handlers
const emit = defineEmits(['onBackClick']);

// hooks
const { amountsInCrypto } = useCurrencyConversion(
  paymentMethods,
  total.value,
  {},
);
const { isLoading, performRequest } = useMockRequest();

// local handlers
const onSelectPaymentMethod = (paymentMethod: Currency) => {
  walletStore.choosePaymentMethod(paymentMethod);
};

const onSignTransaction = () => {
  performRequest({
    type: REQUEST_STATUS.ERROR,
    message: 'Transaction Failed',
    onReject: ({ message, status }) => {
      notify({
        type: status,
        title: message,
        subtitle: 'Please try again',
      });
    },
  });
};
</script>

<template>
  <div
    class="w-full mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:justify-center md:items-center h-full flex-1"
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

      <div class="flex flex-col gap-4">
        <PaymentMethodCard
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod"
          :amount="amountsInCrypto[paymentMethod] || 0"
          :image="images[paymentMethod]"
          :label="paymentMethod"
          :isSelected="wallet.paymentMethod === paymentMethod"
          @click="() => onSelectPaymentMethod(paymentMethod)"
        />
      </div>

      <div class="flex w-full gap-5">
        <CustomButton class="w-1/2" @click="emit('onBackClick')">
          Back
        </CustomButton>

        <CustomButton
          :isPrimary="true"
          :isLoading="true"
          class="w-1/2"
          :disabled="!wallet.paymentMethod || isLoading"
          @click="onSignTransaction"
        >
          <CustomLoader v-if="isLoading" />
          <span v-if="!isLoading"> Sign Transaction</span>
        </CustomButton>
      </div>
    </div>
  </div>
</template>
