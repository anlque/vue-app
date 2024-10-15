<script setup lang="ts">
import { defineProps } from 'vue'
import { PRODUCT_NAME } from '@/constants/ui'
import { formatPrice } from '@/utils/formatPrice'
import SpecificationCaption from '@/components/ProductDetailsModal/SpecificationCaption.vue'
import { IconLogo } from '@/components/icons'

// interfaces
interface Props {
  product: object
}

// props
const { product } = defineProps<Props>()
</script>

<template>
  <div>
    <div class="flex flex-col gap-5 md:gap-4">
      <h2
        class="font-poppins text-[32px] lg:text-4xl lg:leading-9 font-semibold leading-[32px] capitalize text-grayscaleLicorice"
      >
        {{ PRODUCT_NAME }}
        <span class="font-light text-purple-cold font-poppins">{{
          product.name
        }}</span>
      </h2>
      <p class="text-sm md:leading-[22px] font-normal text-grayscale-waterloo">
        {{ product.description }}
      </p>
    </div>
    <div class="flex flex-col gap-1.5">
      <SpecificationCaption
        v-for="item in product.specifications"
        :key="item.value"
        :id="item.id"
        :title="item.label"
        :value="item.value"
        :isHighlighted="item.isHighlighted"
      />
    </div>
    <div class="flex flex-col gap-2">
      <p
        class="text-xs italic font-normal leading-[18px] text-grayscale-waterloo"
      >
        Node Operation Details
      </p>
      <div
        class="p-3 flex flex-col gap-[10px] rounded-lg bg-[rgba(155,158,255,0.13)]"
      >
        <SpecificationCaption
          v-for="item in product.nodeOperationDetails"
          :key="item.value"
          :id="item.id"
          :title="item.label"
          :value="item.value"
          :isHighlighted="item.isHighlighted"
        />
        <div class="border-t border-grayscale-line pt-3">
          <div class="flex flex-col gap-2.5">
            <p
              class="text-[13px] leading-3 font-medium text-grayscaleLicorice capitalize"
            >
              Stake Requirement
            </p>
            <div
              class="flex items-center gap-[10px] bg-[rgba(155,158,255,0.13)] p-[6px] pr-3 rounded-lg"
            >
              <div class="flex items-center justify-center gap-[6px]">
                <span
                  class="flex items-center justify-center size-6 p-1 rounded-full bg-grayscale-milk-white"
                >
                  <IconLogo />
                </span>
                <p
                  class="text-[13px] leading-3 font-medium text-grayscaleLicorice capitalize text-ellipsis whitespace-nowrap overflow-hidden w-[92px] sm:w-full"
                >
                  Minimum
                </p>
              </div>
              <p
                :class="[
                  'text-right text-xl leading-[18px] font-normal flex-1',
                  product.stakeRequirement.min.isHighlighted
                    ? 'text-warning-hover'
                    : 'text-purple-cold ',
                ]"
              >
                {{ formatPrice(product.stakeRequirement.min.value) }} IAG
              </p>
            </div>
            <div
              class="flex items-center gap-[10px] bg-[rgba(155,158,255,0.13)] p-[6px] pr-3 rounded-lg"
            >
              <div class="flex items-center justify-center gap-[6px]">
                <span
                  class="flex items-center justify-center size-6 p-1 rounded-full bg-grayscale-milk-white"
                >
                  <IconLogo />
                </span>
                <p
                  class="text-[13px] leading-3 font-medium text-grayscaleLicorice capitalize text-ellipsis whitespace-nowrap overflow-hidden w-[92px] sm:w-full"
                >
                  Maximum
                </p>
              </div>
              <p
                :class="[
                  'text-right text-xl leading-[18px] font-normal flex-1',
                  product.stakeRequirement.max.isHighlighted
                    ? 'text-warning-hover'
                    : 'text-purple-cold ',
                ]"
              >
                {{ formatPrice(product.stakeRequirement.max.value) }} IAG
              </p>
            </div>
            <p
              class="text-xs leading-[18px] italic font-normal text-grayscale-waterloo"
            >
              <span class="text-white">Minimum</span>
              {{ product.stakeRequirement.min.label }}
            </p>
            <p
              class="text-xs leading-[18px] italic font-normal text-grayscale-waterloo"
            >
              <span class="text-white">Maximum</span>
              {{ product.stakeRequirement.max.label }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 pt-0 md:pt-[18px]">
        <div class="flex items-baseline justify-between">
          <p
            class="capitalize text-xl leading-3 font-medium text-grayscaleLicorice"
          >
            Unit Price
          </p>
          <p
            :class="[
              'text-[28px] text-right font-poppins leading-8',
              product.pricing.unitPrice.isHighlighted
                ? 'text-warning-hover'
                : 'text-purple-cold',
            ]"
          >
            {{ formatPrice(product.pricing.unitPrice.value) }} USD
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-grayscale-waterloo text-xs font-normal leading-3">
            Current Market Conversion:
          </p>
          <p
            :class="[
              'text-xs font-normal leading-3',
              product.pricing.marketConversion.isHighlighted
                ? 'text-warning-hover'
                : 'text-grayscaleLicorice',
            ]"
          >
            {{ formatPrice(product.pricing.marketConversion.value) }} ADA
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
