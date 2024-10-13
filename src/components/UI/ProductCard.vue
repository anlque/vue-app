<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
    <h1 class="text-4xl font-bold">{{ product.title }}</h1>
    <p class="text-xl text-gray-400">{{ product.description }}</p>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold">Specifications</h2>
      <ul class="mt-4 space-y-2">
        <li
          v-for="spec in product.specifications"
          :key="spec.label"
          class="flex justify-between text-lg"
        >
          <span>{{ spec.label }}</span>
          <span class="text-blue-400">{{ spec.value }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold">Node Operation Details</h2>
      <ul class="mt-4 space-y-2">
        <li class="flex justify-between text-lg">
          <span>Storage Node</span>
          <span class="text-blue-400">{{
            product.nodeOperationDetails.storageNode
          }}</span>
        </li>
        <li class="flex justify-between text-lg">
          <span>Compute Node</span>
          <span class="text-blue-400">{{
            product.nodeOperationDetails.computeNode
          }}</span>
        </li>
        <li class="flex justify-between text-lg">
          <span>Cardano Node</span>
          <span class="text-blue-400">{{
            product.nodeOperationDetails.cardanoNode
          }}</span>
        </li>
        <li class="flex justify-between text-lg">
          <span>Recommended Internet Speed</span>
          <span class="text-blue-400">{{
            product.nodeOperationDetails.recommendedInternetSpeed
          }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold">Stake Requirement</h2>
      <div class="flex justify-between text-lg mt-2">
        <span>Minimum</span>
        <span class="text-blue-400">{{
          product.stakeRequirement.minimum
        }}</span>
      </div>
      <div class="flex justify-between text-lg mt-2">
        <span>Maximum</span>
        <span class="text-blue-400">{{
          product.stakeRequirement.maximum
        }}</span>
      </div>
      <p class="text-gray-400 mt-2">
        {{ product.stakeRequirement.explanation }}
      </p>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold">Pricing</h2>
      <div class="flex justify-between text-lg mt-2">
        <span>Unit Price</span>
        <span class="text-blue-400">{{ product.pricing.unitPrice }}</span>
      </div>
      <div class="flex justify-between text-lg mt-2">
        <span>Current Market Conversion</span>
        <span class="text-blue-400">{{
          product.pricing.marketConversion
        }}</span>
      </div>
    </div>
  </div>
</template>
