<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import IconIagon from '@/components/icons/IconIagon.vue'
import CustomButton from '@/components/UI/CustomButton.vue'
import { ref } from 'vue'
import ProductDetailsModal from '@/components/ProductDetailsModal.vue'
import PreorderModal from '@/components/PreorderModal'

const isDetailsOpen = ref(false)
const isPreorderOpen = ref(false)

function setIsDetailsOpen(value) {
  isDetailsOpen.value = value
}

function setIsPreorderOpen(value) {
  isPreorderOpen.value = value
}
</script>

<template>
  <main>
    <div class="header">
      <IconLogo />
      <div class="caption">
        <span>powered by</span>
        <IconIagon />
      </div>
    </div>
    <div
      class="md:px-[30px] desktop:px-20 pt-[38px] desktop:pt-[60px] desktop:pb-[15px] flex flex-col lg:flex-row gap-[30px] md:gap-[50px] desktop:gap-[71px] items-center w-full"
    >
      <div class="image">
        <img src="@/assets/images/cyclone-server.webp" alt="Cyclone server" />
      </div>
      <div class="info-block">
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
        <p
          class="text-sm md:text-base leading-5 md:leading-[26px] text-grayscale-waterloo font-normal pb-10 md:pb-0 whitespace-pre-wrap hidden md:block"
        >
          Plug into Iagon’s shared storage & compute economy. Benefit from quick
          setup, unmatched privacy, superior security, and complete data
          sovereignty. Join the wave and earn $IAG rewards effortlessly!
        </p>
        <div class="flex items-center gap-4 md:gap-[20px] pb-[25px] md:pb-0">
          <CustomButton @click="setIsDetailsOpen(true)"
            >Product Details</CustomButton
          >
          <CustomButton :isPrimary="true" @click="setIsPreorderOpen(true)"
            >Preorder Now</CustomButton
          >
        </div>
      </div>
      <ProductDetailsModal
        :isOpen="isDetailsOpen"
        @setIsOpen="setIsDetailsOpen"
        @preorderClick="
          () => {
            setIsPreorderOpen(true)
            setIsDetailsOpen(false)
          }
        "
      />

      <PreorderModal :isOpen="isPreorderOpen" @setIsOpen="setIsPreorderOpen" />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
}

.header {
  max-height: 3.5rem;
  width: 100%;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
}
.caption {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.image {
  max-width: 180px;
}
.info-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 744px) {
  .image {
    max-width: 350px;
  }
}
@media (min-width: 1400px) {
  .image {
    max-width: 428px;
  }
}
</style>
