<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title: string;
  isActive: boolean;
}

const { title } = defineProps<Props>();
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ui-ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 capitalize hover:text-grayscaleLicorice  font-poppins text-base md:text-xl leading-[25.144px] font-light -tracking-[0.515px] px-[10px] py-1 md:px-3 md:py-2 rounded-[5.861px]',
      isActive
        ? 'text-grayscaleLicorice bg-[rgba(155,158,255,0.13)] shadow-sm'
        : 'text-grayscale-waterloo bg-[rgba(155,158,255,0.06)]',
    ]"
  >
    {{ title }}
  </button>
</template>
