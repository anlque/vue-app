<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProductSpec } from './types';

interface Props {
  product: ProductSpec;
}

const { product } = defineProps<Props>();
</script>

<template>
  <div
    class="flex-1 overflow-x-auto invisible-scrollbar pt-0 md:pt-1 lg:pt-0 h-full"
  >
    <div
      class="ui-mt-2 ui-ring-offset-background focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-primary focus-visible:ui-ring-offset-1 mt-0 min-w-[205px]"
    >
      <div
        class="hidden md:flex md:gap-[26px] lg:gap-0 md:items-center md:justify-between"
      >
        <div class="flex flex-col gap-[2px] md:gap-[6px] text-left">
          <div
            class="font-poppins text-xl md:text-[32px] text-purple-cold font-light leading-[18px] lg:leading-8"
          >
            {{ product.specs.cpuCores.value }}x
          </div>
          <p
            class="capitalize text-[8px] md:text-[10px] desktop:text-xs leading-3 font-medium text-text-grayscaleLicorice text-nowrap"
          >
            {{ product.specs.cpuCores.label }}
          </p>
        </div>
        <div class="flex flex-col gap-[2px] md:gap-[6px] text-left">
          <div
            class="font-poppins text-xl md:text-[32px] text-purple-cold font-light leading-[18px] lg:leading-8"
          >
            {{ product.specs.ramMemory.value }}x
          </div>
          <p
            class="capitalize text-[8px] md:text-[10px] desktop:text-xs leading-3 font-medium text-text-grayscaleLicorice text-nowrap"
          >
            {{ product.specs.ramMemory.label }}
          </p>
        </div>
        <div class="flex flex-col gap-[2px] md:gap-[6px] text-left">
          <div
            class="font-poppins text-xl md:text-[32px] text-purple-cold font-light leading-[18px] lg:leading-8"
          >
            {{ product.specs.ethernet.value }}x
          </div>
          <p
            class="capitalize text-[8px] md:text-[10px] desktop:text-xs leading-3 font-medium text-text-grayscaleLicorice text-nowrap"
          >
            {{ product.specs.ethernet.label }}
          </p>
        </div>
        <div class="flex flex-col gap-[2px] md:gap-[6px] text-left">
          <div
            class="font-poppins text-xl md:text-[32px] text-purple-cold font-light leading-[18px] lg:leading-8"
          >
            {{ product.specs.storage.value }}x
          </div>
          <p
            class="capitalize text-[8px] md:text-[10px] desktop:text-xs leading-3 font-medium text-text-grayscaleLicorice text-nowrap"
          >
            {{ product.specs.storage.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
