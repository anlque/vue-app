<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>

    <div>Cyclone Qs</div>
      <RouterLink  to="/product-details">Product details</RouterLink>
      <RouterLink  to="/preorder">Preorder</RouterLink>
  </main>
</template>
