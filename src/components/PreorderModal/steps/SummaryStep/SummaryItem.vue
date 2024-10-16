<script setup lang="ts">
import { defineProps } from 'vue';
import { PRODUCT_NAME } from '@/constants';

// interfaces
interface Props {
  item: { name: string; quantity: number };
}

// props
const { item } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <div
      class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)] flex items-center justify-between py-[5px]"
    >
      <p
        class="font-poppins text-sm leading-6 md:text-xl font-medium text-grayscaleLicorice"
      >
        {{ PRODUCT_NAME }}
        <span class="text-purple-cold font-poppins">{{ item.name }}</span>
      </p>
      <p class="text-2xl leading-9 font-poppins font-light text-purple-cold">
        x {{ item.quantity }}
      </p>
    </div>
  </div>
</template>
