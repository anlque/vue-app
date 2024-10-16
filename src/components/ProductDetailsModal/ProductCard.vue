<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion';
import { formatPrice } from '@/utils/formatters';
import { CRYPTO_CURRENCIES, DEFAULT_CURRENCY, PRODUCT_NAME } from '@/constants';
import type { ProductDetail } from './types';
import SpecificationCaption from './SpecificationCaption.vue';
import type { Currency } from '@/stores/wallet';

// interfaces
interface Props {
  product: ProductDetail;
}

// props
const { product } = defineProps<Props>();

// hooks
const currencies = ref<Currency[]>([CRYPTO_CURRENCIES.ADA]);
const cryptoAmounts = ref({
  [CRYPTO_CURRENCIES.ADA]: product.pricing.unitPrice.value,
});
const { amountsInUSD } = useCurrencyConversion(
  currencies,
  ref(null),
  cryptoAmounts,
);
</script>

<template>
  <div>
    <div class="flex flex-col gap-5 md:gap-4">
      <h2
        class="font-poppins text-[32px] lg:text-4xl lg:leading-9 font-semibold leading-[32px] capitalize text-grayscaleLicorice"
      >
        {{ PRODUCT_NAME }}
        <span class="font-light text-purple-cold font-poppins">{{
          product.name
        }}</span>
      </h2>
      <p class="text-sm md:leading-[22px] font-normal text-grayscale-waterloo">
        {{ product.description }}
      </p>
    </div>
    <div class="flex flex-col gap-1.5">
      <SpecificationCaption
        v-for="item in product.specifications"
        :key="item.value"
        :id="item.id"
        :title="item.label"
        :value="item.value"
        :isHighlighted="item.isHighlighted"
      />
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-3 pt-0 md:pt-[18px]">
        <div class="flex items-center justify-between">
          <p
            class="capitalize text-xl leading-3 font-medium text-grayscaleLicorice"
          >
            Unit Price
          </p>
          <p
            class="text-[28px] text-right font-poppins text-purple-cold leading-8"
          >
            {{ product.pricing.unitPrice.value }}
            {{ CRYPTO_CURRENCIES.ADA }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-grayscale-waterloo text-xs font-normal leading-3">
            Current Market Conversion:
          </p>
          <p :class="['text-xs font-normal leading-3 text-grayscaleLicorice']">
            {{ formatPrice(amountsInUSD[CRYPTO_CURRENCIES.ADA] || 0) }}
            {{ DEFAULT_CURRENCY.toUpperCase() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
