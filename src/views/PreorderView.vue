<script setup lang="ts">
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

function addToCart() {
  console.log('CLICK')
  cartStore.addItem('Cyclone QS', 1359, 1);
}

</script>

<template>
  <div class="preorder">
    <h1>This is preorder page</h1>
    <button @click="addToCart">add</button>
    <RouterLink to="/">&#10005;</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .preorder {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


