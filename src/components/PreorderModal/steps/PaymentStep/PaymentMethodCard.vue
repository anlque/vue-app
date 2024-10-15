<script setup lang="ts">
import { formatPrice } from '@/utils/formatters';

// interfaces
interface Props {
  amount: string;
  image: string;
  label: string;
  isSelected: boolean;
}

// props
const { amount, image, label, isSelected } = defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center justify-between pl-3 py-3 pr-5 rounded-lg cursor-pointer bg-[rgba(155,158,255,0.20)]"
  >
    <div class="flex items-center gap-3 justify-center">
      <span class="flex items-center justify-center">
        <img :src="image" :alt="label" />
      </span>
      <div>
        <p
          class="text-[22px] leading-[22px] font-normal text-grayscaleLicorice"
        >
          {{ label }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center gap-4">
      <p
        class="font-poppins text-grayscaleLicorice text-[22px] leading-[22px] font-light"
      >
        {{ formatPrice(amount || 0) }}
      </p>
      <span
        :class="[
          'size-6 rounded-full transition-all',
          isSelected
            ? 'bg-[linear-gradient(86deg,#4E95FF_3.57%,#906AFF_95.84%)]'
            : 'bg-[linear-gradient(86deg,rgba(78,149,255,0.15)_3.57%,rgba(144,106,255,0.15)_95.84%)]',
        ]"
      ></span>
    </div>
  </div>
</template>
