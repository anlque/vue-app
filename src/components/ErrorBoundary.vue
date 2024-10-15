<template>
  <div>
    <slot v-if="!hasError"></slot>
    <div
      v-else
      class="h-screen w-screen flex items-center justify-center text-white text-center"
    >
      <div class="flex flex-col gap-4">
        <p class="text-xl">Something went wrong :(</p>
        <pre class="text-grayscaleWaterloo text-lg">{{ errorMessage }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ErrorBoundary',
  setup() {
    const hasError = ref(false);
    const errorMessage = ref('');

    return {
      hasError,
      errorMessage,
    };
  },
  errorCaptured(err, instance, info) {
    this.hasError = true;
    this.errorMessage = `${err.message} \n ${info}`;
    return false;
  },
});
</script>
