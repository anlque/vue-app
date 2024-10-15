<script setup lang="ts">
import { defineProps } from 'vue';
import type { CartItem, ModelType } from '@/stores/cart';
import { MODEL_TYPE } from '@/constants';
import { IconLogo } from '@/components/icons';

interface Commitment {
  min: Record<ModelType, number>;
  max: Record<ModelType, number>;
}

const commitment: Commitment = {
  min: {
    [MODEL_TYPE.QS]: 900,
    [MODEL_TYPE.QS_PRO]: 900,
  },
  max: {
    [MODEL_TYPE.QS]: 7.5,
    [MODEL_TYPE.QS_PRO]: 17.4,
  },
};

// interfaces
interface Props {
  items: CartItem[];
  constraint: 'min' | 'max';
  total: string;
  isExpanded: boolean;
}

// props
const { items, constraint, total, isExpanded } = defineProps<Props>();
</script>

<template>
  <div class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)] flex-1">
    <div
      v-if="isExpanded"
      class="flex flex-col gap-[10px] pb-[10px] mb-[10px] border-b border-grayscale-line"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center justify-between"
      >
        <p class="text-[13px] font-medium leading-3 text-grayscaleLicorice">
          {{ item.quantity }}x {{ item.name }} -
          <span class="text-[13px] font-medium leading-3 text-purple-cold"
            >{{ commitment[constraint][item.name] }} GB commitment</span
          >
        </p>

        <span class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
          >IAG {{ item.staking[constraint] * item.quantity }}</span
        >
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center gap-[6px]">
        <span
          class="flex items-center justify-center size-6 p-1 rounded-full bg-grayscale-milk-white"
        >
          <IconLogo />
        </span>
        <p
          class="text-[13px] font-medium text-grayscaleLicorice capitalize text-ellipsis whitespace-nowrap overflow-y-auto w-[92px] sm:w-full"
        >
          {{ constraint }}
        </p>
      </div>
      <p
        class="font-poppins text-[26px] leading-[22px] font-light text-grayscaleLicorice max-[390px]:text-[18px]"
      >
        IAG {{ total }}
      </p>
    </div>
  </div>
</template>
