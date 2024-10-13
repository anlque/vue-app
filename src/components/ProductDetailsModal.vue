<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { defineProps, defineEmits } from 'vue'
import ProductCard from '@/components/UI/ProductCard.vue'
import CustomButton from '@/components/UI/CustomButton.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['setIsOpen', 'preorderClick'])

const productDetails = {
  title: 'Cyclone Qs',
  description:
    'Tailored for storage nodes, capable of handling compute tasks efficiently.',
  specifications: [
    { label: 'CPU Model', value: 'AMD Ryzen 7 5825U Zen 3' },
    { label: 'CPU Cores', value: '8' },
    { label: 'CPU Threads', value: '16' },
    { label: 'RAM', value: '32 GB DDR4' },
    { label: 'HDD Slots', value: '2 x HDD/SDD slots' },
    { label: 'HDD Storage Included', value: '2x 8 TB HDD Mirrored' },
    { label: 'NVMe Slots', value: '2x M.2 NVMe SSD 2280 slots' },
    { label: 'NVMe Storage Included', value: '2x M.2 1 TB NVMe SSD' },
    { label: 'Ethernet', value: '2x RJ45 2.5 GbE Realtek Intel i225V' },
    { label: 'DisplayPort', value: '1x DP 1.4' },
    { label: 'HDMI', value: '1x HDMI 2.0b' },
    { label: 'USB 2.0 Ports', value: '2' },
    { label: 'USB 3.0 Ports', value: '2' },
    { label: 'USB Type-C', value: '1' },
    { label: 'WiFi', value: 'WiFi 6 AX200' },
    { label: 'TF Card Slot', value: '1' },
  ],
  nodeOperationDetails: {
    storageNode: 'Yes',
    computeNode: 'Yes',
    cardanoNode: 'No',
    recommendedInternetSpeed: '150 Mbps',
  },
  stakeRequirement: {
    minimum: '3,922.51 IAG',
    maximum: '32,687.60 IAG',
    explanation:
      'Minimum is calculated based on 900 GB, which is the minimum commitment required to launch a node. Maximum is calculated based on 7.5 TB, which is the max commitment available on the Qs.',
  },
  pricing: {
    unitPrice: '1,359.00 USD',
    marketConversion: '3,841.44 ADA',
  },
}
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="emit('setIsOpen', false)"
    class="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen"
  >
    <DialogPanel
      class="bg-white w-full h-full mx-auto rounded-lg shadow-lg p-6 relative text-gray-900 overflow-y-auto"
    >
      <DialogTitle class="text-lg font-semibold"
        >Deactivate account</DialogTitle
      >
      <div class="flex gap-2">
        <ProductCard :product="productDetails" />
        <ProductCard :product="productDetails" />
      </div>

      <CustomButton :isPrimary="true" @click="emit('preorderClick')"
        >Preorder Now</CustomButton
      >

      <button @click="emit('setIsOpen', false)" class="absolute top-0 right-0">
        &#10005;
      </button>
    </DialogPanel>
  </Dialog>
</template>
