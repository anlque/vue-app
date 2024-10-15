<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { MODEL_TYPE } from '@/constants'
import { IconCross, IconLogo } from '@/components/icons'
import CustomButton from '@/components/UI/CustomButton.vue'
import ProductCard from './ProductCard.vue'

const productDetails = [
  {
    name: MODEL_TYPE.QS,
    description:
      'Tailored for storage nodes, capable of handling compute tasks efficiently.',
    specifications: [
      {
        label: 'CPU Model',
        value: 'AMD Ryzen 7 5825U Zen 3',
        id: 'cpu',
        isHighlighted: false,
      },
      { label: 'CPU Cores', value: '8', id: 'cpu', isHighlighted: false },
      { label: 'CPU Threads', value: '16', id: 'cpu', isHighlighted: false },
      { label: 'RAM', value: '32 GB DDR4', id: 'ram', isHighlighted: false },
      {
        label: 'HDD Slots',
        value: '2 x HDD/SDD slots',
        id: 'hdd',
        isHighlighted: false,
      },
      {
        label: 'HDD Storage Included',
        value: '2x 8 TB HDD Mirrored',
        id: 'hdd',
        isHighlighted: false,
      },
      {
        label: 'NVMe Slots',
        value: '2x M.2 NVMe SSD 2280 slots',
        id: 'slots',
        isHighlighted: false,
      },
      {
        label: 'NVMe Storage Included',
        value: '2x M.2 1 TB NVMe SSD',
        id: 'slots',
        isHighlighted: false,
      },
      {
        label: 'Ethernet',
        value: '2x RJ45 2.5 GbE Realtek Intel i225V',
        id: 'ethernet',
        isHighlighted: false,
      },
      {
        label: 'DisplayPort',
        value: '1x DP 1.4',
        id: 'display',
        isHighlighted: false,
      },
      {
        label: 'HDMI',
        value: '1x HDMI 2.0b',
        id: 'connect',
        isHighlighted: false,
      },
      {
        label: 'USB 2.0 Ports',
        value: '2',
        id: 'connect',
        isHighlighted: false,
      },
      {
        label: 'USB 3.0 Ports',
        value: '2',
        id: 'connect',
        isHighlighted: false,
      },
      { label: 'USB Type-C', value: '1', id: 'connect', isHighlighted: false },
      {
        label: 'WiFi',
        value: 'WiFi 6 AX200',
        id: 'wifi',
        isHighlighted: false,
      },
      { label: 'TF Card Slot', value: '1', id: 'slots', isHighlighted: false },
    ],
    nodeOperationDetails: [
      {
        label: 'Storage Node',
        value: 'Yes',
        id: 'storage',
        isHighlighted: false,
      },
      { label: 'Compute Node', value: 'Yes', id: 'cpu', isHighlighted: false },
      {
        label: 'Cardano Node',
        value: 'No',
        id: 'cardano',
        isHighlighted: false,
      },
      {
        label: 'Recommended Internet Speed',
        value: '150 Mbps',
        id: 'ram',
        isHighlighted: false,
      },
    ],
    stakeRequirement: {
      min: {
        value: 3922.51,
        label:
          'is calculated based on 900 GB, which is the minimum commitment required to launch a node',
        isHighlighted: false,
      },
      max: {
        value: 32687.6,
        label:
          'is calculated based on 7.5 TB, which is the max commitment available on the Qs',
        isHighlighted: false,
      },
    },
    pricing: {
      unitPrice: { value: 1359.0, isHighlighted: false },
      marketConversion: { value: 3841.44, isHighlighted: false },
    },
  },
  {
    name: MODEL_TYPE.QS_PRO,
    description:
      'Optimized for both storage and compute tasks, ensuring seamless performance.',
    specifications: [
      {
        label: 'CPU Model',
        value: 'AMD Ryzen 7 5825U Zen 3',
        id: 'cpu',
        isHighlighted: false,
      },
      { label: 'CPU Cores', value: '8', id: 'cpu', isHighlighted: false },
      { label: 'CPU Threads', value: '16', id: 'cpu', isHighlighted: false },
      { label: 'RAM', value: '64 GB DDR4', id: 'ram', isHighlighted: true },
      {
        label: 'HDD Slots',
        value: '2 x HDD/SDD slots',
        id: 'hdd',
        isHighlighted: false,
      },
      {
        label: 'HDD Storage Included',
        value: '2x 18 TB HDD Mirrored',
        id: 'hdd',
        isHighlighted: true,
      },
      {
        label: 'NVMe Slots',
        value: '2x M.2 NVMe SSD 2280 slots',
        id: 'slots',
        isHighlighted: false,
      },
      {
        label: 'NVMe Storage Included',
        value: '2x M.2 1 TB NVMe SSD',
        id: 'slots',
        isHighlighted: false,
      },
      {
        label: 'Ethernet',
        value: '2x RJ45 2.5 GbE Realtek Intel i225V',
        id: 'ethernet',
        isHighlighted: false,
      },
      {
        label: 'DisplayPort',
        value: '1x DP 1.4',
        id: 'display',
        isHighlighted: false,
      },
      {
        label: 'HDMI',
        value: '1x HDMI 2.0b',
        id: 'connect',
        isHighlighted: false,
      },
      {
        label: 'USB 2.0 Ports',
        value: '2',
        id: 'connect',
        isHighlighted: false,
      },
      {
        label: 'USB 3.0 Ports',
        value: '2',
        id: 'connect',
        isHighlighted: false,
      },
      { label: 'USB Type-C', value: '1', id: 'connect', isHighlighted: false },
      {
        label: 'WiFi',
        value: 'WiFi 6 AX200',
        id: 'wifi',
        isHighlighted: false,
      },
      { label: 'TF Card Slot', value: '1', id: 'slots', isHighlighted: false },
    ],
    nodeOperationDetails: [
      {
        label: 'Storage Node',
        value: 'Yes',
        id: 'storage',
        isHighlighted: false,
      },
      { label: 'Compute Node', value: 'Yes', id: 'cpu', isHighlighted: false },
      {
        label: 'Cardano Node',
        value: 'Yes',
        id: 'cardano',
        isHighlighted: true,
      },
      {
        label: 'Recommended Internet Speed',
        value: '348 Mbps',
        id: 'ram',
        isHighlighted: true,
      },
    ],
    stakeRequirement: {
      min: {
        value: 3922.51,
        label:
          'is calculated based on 900 GB, which is the minimum commitment required to launch a node',
        isHighlighted: false,
      },
      max: {
        value: 75084.59,
        label:
          'is calculated based on 17.4 TB, which is the max commitment available on the Qs Pro',
        isHighlighted: true,
      },
    },
    pricing: {
      unitPrice: { value: 1359.0, isHighlighted: true },
      marketConversion: { value: 3841.44, isHighlighted: false },
    },
  },
]

// interfaces
interface Props {
  isOpen: boolean
}

// props
const { isOpen } = defineProps<Props>()

// passed handlers
const emit = defineEmits(['setIsOpen', 'preorderClick'])
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="emit('setIsOpen', false)"
    class="fixed inset-0 z-50 flex items-center justify-center min-h-screen w-screen bg-[#0C1219]/75 backdrop-blur-[150px] bg-opacity-100"
  >
    <DialogPanel
      class="flex flex-col w-full h-full mx-auto rounded-lg shadow-lg relative text-gray-900 bg-black/20 px-12"
    >
      <!--  header -->
      <div class="flex items-center justify-between p-6 sticky">
        <div class="flex justify-between items-center gap-2">
          <IconLogo />
        </div>
        <div
          class="desktop:flex desktop:items-center desktop:justify-center desktop:gap-[15px]"
        >
          <CustomButton :isPrimary="true" @click="emit('preorderClick')"
            >Preorder Now</CustomButton
          >
          <button
            @click="emit('setIsOpen', false)"
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-grayscale-milk-white hover:bg-grayscale-ghost-white text-grayscaleLicorice cursor-pointer"
          >
            <IconCross />
          </button>
        </div>
      </div>
      <!-- content -->
      <div
        class="w-full overflow-y-auto flex-1 invisible-scrollbar flex justify-center box-border"
      >
        <div
          class="p-5 lg:px-0 flex flex-col md:flex-row md:max-w-[788px] lg:max-w-[826px] desktop:max-w-[866px]"
        >
          <ProductCard
            :product="productDetails[0]"
            :class="'md:pr-5 lg:pr-[30px] desktop:pr-[50px] text-left mt-0 flex flex-col gap-[30px] md:gap-6 lg:gap-[26px] flex-1'"
          />
          <div
            class="my-[60px] bg-[linear-gradient(90deg,rgba(50,58,71,0.00)_0%,#323A47_50%,rgba(50,58,71,0.00)_99%)] h-[1px] block md:hidden"
          ></div>
          <ProductCard
            :product="productDetails[1]"
            :class="'relative md:pl-5 lg:pl-[30px] desktop:pl-[50px] text-left mt-0 flex flex-col gap-[30px] md:gap-6 lg:gap-[26px] md:before:content-[\'\'] md:before:absolute md:before:top-0 md:before:left-0 md:before:w-[1px] md:before:h-full md:before:bg-[linear-gradient(0deg,rgba(50,58,71,0.00)_0%,#323A47_50%,rgba(50,58,71,0.00)_99%)] flex-1'"
          />
        </div>
      </div> </DialogPanel
  ></Dialog>
</template>
