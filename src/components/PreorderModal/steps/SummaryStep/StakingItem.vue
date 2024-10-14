<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import { defineProps } from 'vue'
import type { CartItem } from '@/stores/cart'

interface Props {
  items: CartItem
  constraint: 'min' | 'max'
  total: number
  isExpanded: boolean
}

const commitment = {
  min: {
    'Cyclone Qs': 900,
    'Cyclone Qs Pro': 900,
  },
  max: {
    'Cyclone Qs': 7.5,
    'Cyclone Qs Pro': 17.4,
  },
}

const { items, constraint, total, isExpanded } = defineProps<Props>()
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
          class="text-[13px] leading-3 font-medium text-grayscaleLicorice capitalize text-ellipsis whitespace-nowrap overflow-hidden w-[92px] sm:w-full"
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
