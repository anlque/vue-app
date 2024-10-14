<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import FormPopover from '@/components/PreorderModal/steps/FormStep/FormPopover.vue'

interface Props {
  value: string
  id: string
  error: boolean
  placeholder?: string
  popoverText?: string
}

const { value, placeholder = '', popoverText, id, error } = defineProps<Props>()

const emit = defineEmits(['onChange'])

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  emit('onChange', input.value)
}
</script>

<template>
  <div class="relative z-0 group/float flex items-center w-full">
    <input
      :value="value"
      :placeholder="''"
      :id="id"
      :class="[
        'block py-[14px] md:py-4 px-0 w-full text-lg leading-[22px] text-grayscaleLicorice bg-transparent border-0 border-b-2 border-grayscale-line appearance-none focus:outline-none focus:ring-0 peer group-hover/float:border-grayscaleLicorice cyclone-input',
        error
          ? 'border-error-default'
          : 'border-grayscale-line focus:border-purple-cold',
      ]"
      @input="handleInput"
    />
    <label
      :for="id"
      :class="[
        'absolute text-lg leading-[22px] text-grayscale-waterloo duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-2',
        error
          ? 'text-error-default group-hover/float:text-error-default peer-focus:text-error-default'
          : 'text-grayscale-waterloo group-hover/float:text-purple-cold peer-focus:text-purple-cold',
        value.length > 0 && 'text-purple-cold',
      ]"
      >{{ placeholder }}</label
    >
    <FormPopover v-if="popoverText" :text="popoverText" />
  </div>
</template>

<style>
.cyclone-input:-webkit-autofill {
  -webkit-text-fill-color: var(--grayscale-licorice) !important;
  -webkit-box-shadow: inset 0 0 0 1000px transparent !important;
  background-clip: text !important;
  caret-color: #fff !important;
}
</style>
