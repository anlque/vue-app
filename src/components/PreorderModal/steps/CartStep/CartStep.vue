<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/mainStore'
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion'
import { formatPrice } from '@/utils/formatPrice'
import { PRODUCT_NAME } from '@/constants/ui'
import CustomButton from '@/components/UI/CustomButton.vue'
import { IconCube, IconCart } from '@/components/icons'
import CartItem from './CartItem.vue'
import { CRYPTO_AMOUNT } from '@/constants/ui'

// store
const { cartStore } = useMainStore()
const { addItem, removeItem } = cartStore
const { fullItems, nonFullItems, total, addedItems } = storeToRefs(cartStore)
// local state
const isExpanded = ref(false)

// passed handlers
const emit = defineEmits(['onClose', 'onProceedClick'])

// local handlers
function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

// hooks
const { amountInCrypto, amountInUSD } = useCurrencyConversion(
  'ADA',
  total.value,
  CRYPTO_AMOUNT,
)
</script>

<template>
  <div
    class="w-full mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
  >
    <div
      class="px-1 pb-14 lg:pb-[30px] md:px-[30px] flex flex-col flex-1 gap-10 md:gap-[50px] md:w-full md:max-w-[688px]"
    >
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center gap-1.5">
          <IconCube />
          <p
            class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
          >
            Customize Your order
          </p>
        </div>
        <CartItem
          v-for="item in fullItems"
          :key="item.id"
          :item="item"
          @onIncrease="() => addItem(item.id)"
          @onDecrease="() => removeItem(item.id)"
        />
        <div class="flex flex-wrap">
          <span
            class="text-sm leading-[22px] font-medium text-grayscaleLicorice capitalize"
            >No Drives Version
          </span>
          <span
            class="text-sm leading-[22px] font-normal text-grayscaleWaterloo"
            >(No HDD Storage and NVMe Boot Drives)</span
          >
        </div>
        <CartItem
          v-for="item in nonFullItems"
          :key="item.id"
          :item="item"
          @onIncrease="() => addItem(item.id)"
          @onDecrease="() => removeItem(item.id)"
        />
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <IconCart />
            <span
              class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
              >Products Total Price</span
            >
          </div>
          <p
            v-if="total > 0"
            class="underline capitalize text-sm leading-4 font-normal text-purple-cold cursor-pointer"
            @click="toggleExpanded"
          >
            <span class="md:hidden inline">Breakdown</span>
            <span class="hidden md:inline capitalize"
              >Expand Price breakdown</span
            >
          </p>
        </div>
        <div class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)]">
          <div
            v-if="isExpanded"
            class="flex flex-col gap-[10px] pb-[10px] mb-[10px] border-b border-grayscale-line"
          >
            <div
              v-for="item in addedItems"
              :key="item.id"
              class="flex items-center justify-between"
            >
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >{{ item.quantity }}x {{ PRODUCT_NAME }} {{ item.name }}
                {{ !item.isFull ? '(No Drives)' : '' }}</span
              >
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >USD {{ formatPrice(item.price * item.quantity) }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >{{ CRYPTO_AMOUNT }} ADA conversion fee</span
              >
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >USD {{ formatPrice(amountInUSD) }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >FREE Shipping</span
              >
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >USD 0</span
              >
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span
              class="flex items-center justify-center rounded-full p-4 w-6 h-6 bg-[linear-gradient(86deg,#4E95FF_3.57%,#906AFF_95.84%)] text-lg leading-[22px] font-poppins font-medium text-grayscaleLicorice"
              >$</span
            >
            <p
              class="font-poppins text-[26px] leading-[22px] font-light text-grayscaleLicorice"
            >
              USD {{ formatPrice(total) }}
            </p>
          </div>
        </div>
        <div
          class="flex md:items-center flex-col gap-2 : md:gap-0 md:flex-row md:justify-between"
        >
          <span
            class="text-xs font-normal text-grayscaleWaterloo italic ml-auto md:ml-0"
            >Including {{ CRYPTO_AMOUNT }} ADA Conversion Fees and Free
            shipping</span
          >
          <p
            class="text-xs font-normal text-grayscaleWaterloo capitalize ml-auto"
          >
            <span class="hidden md:inline-block"
              >Current Market conversion =
            </span>
            <span class="italic text-grayscaleLicorice">
              {{ formatPrice(amountInCrypto) }} ADA</span
            >
          </p>
        </div>
      </div>
      <div class="flex w-full gap-5 pt-5">
        <CustomButton class="w-1/2" @click="emit('onClose')">
          Close
        </CustomButton>

        <CustomButton
          class="w-1/2"
          :isPrimary="true"
          @click="emit('onProceedClick')"
        >
          Proceed to Shipping Info
        </CustomButton>
      </div>
    </div>
  </div>
</template>
