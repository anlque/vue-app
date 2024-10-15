<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { CartItem } from '@/stores/cart';
import { formatPrice } from '@/utils/formatters';
import { DEFAULT_CURRENCY, PRODUCT_NAME } from '@/constants';
import { IconMinus, IconPlus } from '@/components/icons';

// interfaces
interface Props {
  item: CartItem;
}

// props
const { item } = defineProps<Props>();

// passed handlers
const emit = defineEmits(['onIncrease', 'onDecrease']);
</script>

<template>
  <div
    class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)] flex items-center justify-between hover:bg-[rgba(155,158,255,0.20)]"
  >
    <p
      class="flex gap-2 items-end font-poppins text-sm leading-6 md:text-xl font-medium text-grayscaleLicorice"
    >
      {{ PRODUCT_NAME }}
      <span class="text-purple-cold font-poppins">{{ item.name }}</span>
      <span
        v-if="!item.isCustomVersion"
        class="md:text-sm md:leading-[22px] md:font-normal font-poppins"
        >No Drives</span
      >
    </p>
    <div class="flex items-center gap-5">
      <p
        class="hidden md:block text-base font-poppins text-purple-cold font-normal"
      >
        {{ DEFAULT_CURRENCY.toUpperCase() }}
        <span class="text-grayscaleLicorice font-poppins">{{
          formatPrice(item.price)
        }}</span>
      </p>
      <div class="flex items-center gap-[10px]">
        <button
          class="rounded-lg bg-[rgba(50,56,85,1)] hover:bg-[rgba(155,158,255,0.40)] p-2 text-grayscaleLicorice flex items-center justify-center self-stretch cursor-pointer shadow-none outline-none border-none"
          @click="emit('onDecrease')"
        >
          <IconMinus />
        </button>
        <span
          :class="[
            'font-poppins text-xl leading-5 w-10 text-center font-semibold',
            item.quantity > 0 ? 'text-purple-cold' : 'text-grayscaleWaterloo',
          ]"
          >{{ item.quantity }}</span
        >
        <button
          @click="emit('onIncrease')"
          class="rounded-lg bg-[rgba(50,56,85,1)] hover:bg-[rgba(155,158,255,0.40)] p-2 text-grayscaleLicorice flex items-center justify-center cursor-pointer shadow-none outline-none border-none"
        >
          <IconPlus />
        </button>
      </div>
    </div>
  </div>
</template>
