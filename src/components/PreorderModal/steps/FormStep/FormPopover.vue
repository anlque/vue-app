<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import { defineProps } from 'vue'

interface Props {
  text: string
}

const { text } = defineProps<Props>()
</script>

<template>
  <Popover class="relative h-full max-w-full">
    <PopoverButton>
      <IconInfo />
      ></PopoverButton
    >

    <PopoverPanel
      class="popover-content z-10 w-52 p-1 bg-white border border-gray-300 rounded shadow-lg right-0 bottom-[210%]"
    >
      <p class="text-xs leading-4 text-grayscale-milk-white">
        {{ text }}
      </p>
    </PopoverPanel>
  </Popover>
</template>

<style scoped>
.popover-content {
  position: absolute;
}

.popover-content::after {
  content: '';
  position: absolute;
  bottom: -4px;
  right: 8px;
  width: 6px;
  height: 6px;
  background-color: white;
  transform: rotate(45deg);
}
</style>
