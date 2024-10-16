<script setup lang="ts">
import { type Component, defineProps } from 'vue';
import {
  IconCpu,
  IconRam,
  IconHdd,
  IconSlots,
  IconEthernet,
  IconDisplay,
  IconConnect,
  IconWifi,
  IconStorage,
  IconCardano,
} from '@/components/icons/product';

const icons: { [key: string]: Component } = {
  cpu: IconCpu,
  ram: IconRam,
  hdd: IconHdd,
  slots: IconSlots,
  ethernet: IconEthernet,
  display: IconDisplay,
  connect: IconConnect,
  wifi: IconWifi,
  storage: IconStorage,
  cardano: IconCardano,
};

// interfaces
interface Props {
  title: string;
  value: string;
  id: string;
  isHighlighted: boolean;
}

// props
const { title, value, id, isHighlighted } = defineProps<Props>();
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center justify-center gap-1.5">
      <span
        class="size-[15px] text-purple-cold flex items-center justify-center"
      >
        <component :is="icons[id]"
      /></span>
      <p class="text-[13px] leading-3 font-medium text-grayscaleLicorice">
        {{ title }}
      </p>
    </div>
    <p
      :class="[
        'text-right text-sm leading-[18px] font-medium',
        isHighlighted ? 'text-warning-hover' : 'text-purple-cold',
      ]"
    >
      {{ value }}
    </p>
  </div>
</template>
