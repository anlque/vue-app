<template>
  <div aria-label="Loading" class="flex justify-center items-center">
    <div class="loader" />
  </div>
</template>

<style scoped>
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
.loader {
  aspect-ratio: 1;
  border-radius: 50%;
  --_m: conic-gradient(#0000 10%, #9b9eff),
    linear-gradient(white 0%, white 100%) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  width: 20px;
  padding: 2.1px;
  background: #9b9eff;
}
</style>
