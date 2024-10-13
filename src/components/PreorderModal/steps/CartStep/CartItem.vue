<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { CartItem } from '@/stores/cart'

interface Props {
  item: CartItem
}

const { item } = defineProps<Props>()

console.log('TEST item', item)
const [title, ...rest] = item.name.split(' ')
const subTitle = rest.join(' ')

const emit = defineEmits(['onIncrease', 'onDecrease'])
</script>

<template>
  <div
    class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)] flex items-center justify-between hover:bg-[rgba(155,158,255,0.20)]"
  >
    <p
      class="flex gap-2 items-end font-poppins text-sm leading-6 md:text-xl font-medium text-grayscaleLicorice"
    >
      {{ title }}
      <span class="text-purple-cold font-poppins">{{ subTitle }}</span>
      <span
        v-if="!item.isFull"
        class="md:text-sm md:leading-[22px] md:font-normal font-poppins"
        >No Drives</span
      >
    </p>
    <div class="flex items-center gap-5">
      <p
        class="hidden md:block text-base font-poppins text-purple-cold font-normal"
      >
        USD
        <span class="text-grayscaleLicorice font-poppins">{{
          item.price
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
          class="font-poppins text-xl leading-5 w-10 text-center font-semibold text-grayscaleWaterloo"
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
