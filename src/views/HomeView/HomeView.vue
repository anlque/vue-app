<script setup lang="ts">
import { ref } from 'vue'
import { PRODUCT_NAME } from '@/constants/ui'
import ProductDetailsModal from '@/components/ProductDetailsModal'
import PreorderModal from '@/components/PreorderModal'
import CustomButton from '@/components/UI/CustomButton.vue'
import { IconLogo, IconIagon } from '@/components/icons'
import ProductButton from './ProductButton.vue'
import ProductInfo from './ProductInfo.vue'

const cycloneModels = {
  Qs: {
    specs: {
      cpuCores: {
        value: 4,
        label: 'CPU Cores*',
      },
      ramMemory: {
        value: 16,
        label: 'RAM Memory*',
      },
      ethernet: {
        value: 2.5,
        label: 'Faster Ethernet*',
      },
      storage: {
        value: 16,
        label: 'Included Storage',
      },
    },
  },
  'Qs Pro': {
    specs: {
      cpuCores: {
        value: 4,
        label: 'CPU Cores*',
      },
      ramMemory: {
        value: 32,
        label: 'RAM Memory*',
      },
      ethernet: {
        value: 2.5,
        label: 'Faster Ethernet*',
      },
      storage: {
        value: 36,
        label: 'Included Storage',
      },
    },
  },
}

const isDetailsOpen = ref<boolean>(false)
const isPreorderOpen = ref<boolean>(false)
const activeProduct = ref<'Qs' | 'Qs Pro'>('Qs Pro')

function setIsDetailsOpen(value) {
  isDetailsOpen.value = value
}

function setIsPreorderOpen(value) {
  isPreorderOpen.value = value
}

function setActiveProduct(product: 'Qs' | 'Qs Pro') {
  activeProduct.value = product
}

console.log('TEST ', isPreorderOpen)
</script>

<template>
  <main class="w-screen h-screen">
    <!-- header -->
    <div class="flex justify-between h-[3.5rem] px-14 py-9 items-center">
      <IconLogo />
      <div class="flex items-center gap-3">
        <span
          class="text-base leading-[26px] text-grayscale-waterloo font-normal"
          >powered by</span
        >
        <IconIagon />
      </div>
    </div>

    <!-- content -->
    <div class="w-full px-14">
      <div
        class="md:px-[30px] desktop:px-20 pt-[38px] desktop:pt-[40px] desktop:pb-[15px] flex flex-col lg:flex-row gap-[30px] md:gap-[50px] desktop:gap-[71px] items-center w-full"
      >
        <div
          class="max-w-[180px] md:max-w-[350px] desktop:max-w-[428px] md:w-auto"
        >
          <img
            src="../../assets/images/cyclone-server.webp"
            alt="Cyclone server"
            class="w-full h-full md:max-w-[350px] 2xl:max-w-[428px]"
          />
        </div>
        <div
          class="flex flex-1 flex-col w-full lg:max-w-[532px] desktop:max-w-[677px] text-center lg:text-left"
        >
          <div
            class="flex flex-col gap-[2px] desktop:gap-[10px] mb-4 desktop:mb-[20px]"
          >
            <h4
              class="text-base leading-[14px] md:text-lg desktop:text-xl font-bold text-purple-cold capitalize"
            >
              Preorder Your
            </h4>
            <h1
              class="font-poppins font-semibold text-4xl leading-9 md:text-[56px] desktop:text-[66px] md:leading-[66px] text-grayscaleLicorice"
            >
              Cyclone
              <span class="font-light text-purple-cold font-poppins">Qs</span>
            </h1>
          </div>

          <div class="flex flex-col md:gap-[50px] lg:gap-10 desktop:gap-[50px]">
            <p
              class="text-sm md:text-base leading-5 md:leading-[26px] text-grayscale-waterloo font-normal pb-10 md:pb-0 whitespace-pre-wrap hidden md:block"
            >
              Plug into Iagon’s shared storage & compute economy. Benefit from
              quick setup, unmatched privacy, superior security, and complete
              data sovereignty. Join the wave and earn $IAG rewards
              effortlessly!
            </p>
            <p
              class="text-sm leading-5 text-grayscale-waterloo font-normal pb-10 block md:hidden"
            >
              Plug into Iagon's storage & compute economy. Enjoy quick setup,
              top privacy, security, and full data control. Earn $IAG rewards
              effortlessly.
            </p>

            <div
              class="flex items-center gap-4 md:gap-[20px] pb-[25px] md:pb-0 w-full"
            >
              <CustomButton class="w-1/2" @click="setIsDetailsOpen(true)"
                >Product Details</CustomButton
              >
              <CustomButton
                class="w-1/2"
                :isPrimary="true"
                @click="setIsPreorderOpen(true)"
                >Preorder Now</CustomButton
              >
            </div>
            <div
              class="flex justify-center gap-5 md:gap-[30px] desktop:gap-[50px] items-center"
            ></div>
          </div>
          <div
            class="flex justify-center gap-5 md:gap-[30px] desktop:gap-[50px] items-center"
          >
            <div
              class="inline-flex ui-h-10 items-center justify-center rounded-full bg-secondary p-1 border border-border text-muted-foreground bg-transparent items-start flex-col gap-[11px] shadow-none rounded-none border-none h-full"
            >
              <div class="flex gap-[11px]">
                <ProductButton
                  title="Qs Pro"
                  :isActive="activeProduct === 'Qs Pro'"
                  @click="setActiveProduct('Qs Pro')"
                />
                <ProductButton
                  title="Qs"
                  :isActive="activeProduct === 'Qs'"
                  @click="setActiveProduct('Qs')"
                />
              </div>
              <p
                class="capitalize md:text-[10px] desktop:text-xs leading-3 font-medium text-text-grayscaleLicorice hidden md:block"
              >
                {{ PRODUCT_NAME }} Models
              </p>
            </div>

            <ProductInfo :product="cycloneModels[activeProduct]" />
          </div>
        </div>
        <ProductDetailsModal
          :isOpen="isDetailsOpen"
          @setIsOpen="setIsDetailsOpen"
          @preorderClick="
            () => {
              setIsPreorderOpen(true)
            }
          "
        />

        <PreorderModal
          :isOpen="isPreorderOpen"
          @setIsOpen="setIsPreorderOpen"
        />
      </div>
    </div>
  </main>
</template>
