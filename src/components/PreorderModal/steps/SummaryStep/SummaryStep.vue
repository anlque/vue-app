<script setup lang="ts">
import CustomButton from '@/components/UI/CustomButton.vue'
import { defineEmits, ref } from 'vue'
import IconCube from '@/components/icons/IconCube.vue'
import { PRODUCT_NAME, useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import SummaryItem from '@/components/PreorderModal/steps/SummaryStep/SummaryItem.vue'
import IconShip from '@/components/icons/IconShip.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconCart from '@/components/icons/IconCart.vue'
import { useFormStore } from '@/stores/form'
import StakingItem from '@/components/PreorderModal/steps/SummaryStep/StakingItem.vue'

// interface Props {}

// const { selectedWallet, wallets } = defineProps<Props>()

const cartStore = useCartStore()
const formStore = useFormStore()
const { addedItems, minStakeTotal, maxStakeTotal, total } =
  storeToRefs(cartStore)
const { form } = storeToRefs(formStore)

const isExpandedStaking = ref(false)
const isExpandedPrice = ref(false)

const emit = defineEmits(['onSaveClick', 'onProceedClick'])

function toggleExpandedStaking() {
  isExpandedStaking.value = !isExpandedStaking.value
}
function toggleExpandedPrice() {
  isExpandedPrice.value = !isExpandedPrice.value
}
</script>

<template>
  <div
    class="w-full mt-[74px] md:mt-0 px-6 md:px-[30px] md:flex md:items-center md:justify-center flex-1"
  >
    <div
      class="px-1 pb-14 lg:pb-[30px] md:px-[30px] flex flex-col flex-1 gap-10 md:gap-[50px] md:w-full md:max-w-[688px]"
    >
      <div class="flex flex-col gap-6">
        <div
          class="flex items-center justify-between max-[390px]:flex-col max-[390px]:items-start"
        >
          <div class="flex items-center gap-[6px]">
            <IconCube />
            <span
              class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
              >Products</span
            >
          </div>
          <span
            class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 capitalize text-grayscaleWaterloo"
            >(Order Summary)</span
          >
        </div>
        <div class="grid gap-2 grid-cols-1 md:grid-cols-2">
          <SummaryItem
            v-for="item in addedItems"
            :key="item.id"
            :item="item"
            class="flex flex-col gap-[10px]"
          />
        </div>
        <div class="flex items-center gap-[6px]">
          <IconShip />
          <span
            class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
            >Ship To</span
          >
        </div>
        <div
          class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)] flex items-center justify-between"
        >
          <span
            class="font-poppins text-base leading-[22px] md:text-lg font-normal text-grayscaleLicorice"
            >{{ form.street }}, {{ form.city }}, {{ form.state }},
            {{ form.postalCode }}, {{ form.country }}</span
          >
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-[6px]">
            <IconDownload />
            <span
              class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
              >Staking Requirement*</span
            >
          </div>
          <p
            class="underline capitalize text-sm leading-4 font-normal text-purple-cold cursor-pointer"
            @click="toggleExpandedStaking"
          >
            <span class="capitalize inline md:hidden">{{
              isExpandedStaking ? 'Close' : 'Breakdown'
            }}</span>
            <span class="capitalize hidden md:inline">{{
              isExpandedStaking
                ? 'Close Staking breakdown'
                : 'Expand Staking breakdown'
            }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-[10px] lg:flex-row">
          <StakingItem
            :items="addedItems"
            constraint="min"
            :total="minStakeTotal"
            :isExpanded="isExpandedStaking"
          />
          <StakingItem
            :items="addedItems"
            constraint="max"
            :total="maxStakeTotal"
            :isExpanded="isExpandedStaking"
          />
        </div>
        <div
          class="flex md:items-center flex-col gap-2 : md:gap-0 md:flex-row md:justify-between"
        >
          <p
            class="text-xs font-normal text-grayscaleWaterloo italic ml-auto md:ml-0"
          >
            <span class="text-grayscaleLicorice">*Not Included.</span>Min amount
            is calculated based on the minimum commitment of 900 GB per Cyclone,
            while Max amount is calculated on the max commitment of 7.5 TB for
            Cyclone Qs, and 17.4 TB for Cyclone Qs Pro
          </p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-[6px]">
            <IconCart />
            <span
              class="font-poppins font-normal text-base leading-[22px] md:text-lg md:leading-9 text-grayscaleLicorice capitalize"
              >Products Total Price</span
            >
          </div>
          <p
            class="underline capitalize text-sm leading-4 font-normal text-purple-cold cursor-pointer"
            @click="toggleExpandedPrice"
          >
            <span class="md:hidden inline">{{
              isExpandedPrice ? 'Close' : 'Breakdown'
            }}</span>
            <span class="hidden md:inline capitalize">{{
              isExpandedPrice
                ? 'Close Price breakdown'
                : 'Expand Price breakdown'
            }}</span>
          </p>
        </div>
        <div class="p-3 rounded-lg bg-[rgba(155,158,255,0.13)]">
          <div
            v-if="isExpandedPrice"
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
                >USD {{ item.price * item.quantity }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >10 ADA conversion fee</span
              >
              <span
                class="text-[13px] font-medium leading-3 text-grayscaleLicorice"
                >USD {{ adaFeeInUsd }}</span
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
              class="flex items-center justify-center rounded-full p-4 w-6 h-6 bg-[linear-gradient(86deg,#4E95FF_3.57%,#906AFF_95.84%)] text-lg leading-[22px] font-poppins font-medium text-text-grayscaleLicorice"
            >
              $
            </span>
            <p
              class="font-poppins text-[26px] leading-[22px] font-light text-grayscaleLicorice"
            >
              USD {{ total }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full gap-5 pt-5">
        <CustomButton :className="'w-1/2'" @click="emit('onBackClick')">
          Back
        </CustomButton>

        <CustomButton
          :isPrimary="true"
          :className="'w-1/2'"
          @click="emit('onProceedClick')"
        >
          Proceed To Checkout
        </CustomButton>
      </div>
    </div>
  </div>
</template>
