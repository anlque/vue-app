<script setup lang="ts">
import { defineProps } from 'vue'

// interfaces
interface Props {
  isPrimary?: boolean
}

// props
const { isPrimary = false } = defineProps<Props>()
</script>

<template>
  <button
    :class="[
      'rounded-[8px] flex items-center justify-center font-medium h-[40px] text-[18px] py-[10px] capitalize px-3 lg:px-4',
      isPrimary
        ? 'bg-[linear-gradient(86deg,_#4E95FF_3.57%,_#906AFF_95.84%)] hover:bg-[linear-gradient(92deg,_#4E95FF_6.97%,_#906AFF_172.69%)] active:bg-[linear-gradient(86deg,_rgba(78,_149,_255,_0.80)_3.57%,_rgba(144,_106,_255,_0.80)_95.84%)] disabled:bg-[linear-gradient(86deg,_rgba(78,_149,_255,_0.06)_3.57%,_rgba(144,_106,_255,_0.06)_95.84%)] shadow-[0px_0px_22px_0px_rgba(155,_158,_255,_0.30)] hover:shadow-[0px_0px_30px_0px_rgba(155,_158,_255,_0.40)] disabled:shadow-none text-[#FFF]'
        : 'bg-[rgb(155,_158,_255)] bg-opacity-[0.13] hover:bg-opacity-[0.20] active:bg-opacity-[0.10] disabled:bg-opacity-[0.06] text-grayscaleLicorice',
    ]"
  >
    <slot />
  </button>
</template>
