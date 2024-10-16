<script setup lang="ts">
import { ref } from 'vue';
import type { ModelType } from '@/stores/cart';
import { PRODUCT_NAME, MODEL_TYPE } from '@/constants';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import PreorderModal from '@/components/PreorderModal';
import CustomButton from '@/components/UI/CustomButton.vue';
import { IconLogo, IconIagon } from '@/components/icons';
import type { ProductSpec } from './types';
import ProductButton from './ProductButton.vue';
import ProductInfo from './ProductInfo.vue';

const cycloneModels: Record<ModelType, ProductSpec> = {
  [MODEL_TYPE.QS]: {
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
  [MODEL_TYPE.QS_PRO]: {
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
};

const modelTypes: ModelType[] = [MODEL_TYPE.QS, MODEL_TYPE.QS_PRO];

const isDetailsOpen = ref<boolean>(false);
const isPreorderOpen = ref<boolean>(false);
const activeProduct = ref<ModelType>(MODEL_TYPE.QS_PRO);

const setIsDetailsOpen = (value: boolean) => {
  isDetailsOpen.value = value;
};

const setIsPreorderOpen = (value: boolean) => {
  isPreorderOpen.value = value;
};

function setActiveProduct(product: ModelType) {
  activeProduct.value = product;
}
</script>

<template>
  <main class="w-screen h-screen overflow-y-auto invisible-scrollbar">
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
    <div class="w-full px-2 sm:px-14 pb-20">
      <div
        class="md:px-[30px] desktop:px-20 pt-4 sm:pt-[38px] desktop:pt-[40px] desktop:pb-[15px] flex flex-col lg:flex-row gap-[30px] md:gap-[50px] desktop:gap-[71px] items-center w-full"
      >
        <div
          class="max-w-[180px] md:max-w-[350px] desktop:max-w-[428px] md:w-auto"
        >
          <img
            src="../../../public/images/cyclone-server.webp"
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
                  v-for="modelType in modelTypes"
                  :key="modelType"
                  :title="modelType"
                  :isActive="activeProduct === modelType"
                  @click="setActiveProduct(modelType)"
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
              setIsPreorderOpen(true);
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

<!-- TODO: tests
HomeView
1) h1, Product Details button, Preorder Now button и секция под кнопками присутствуют на странице
2) клик по Product Details button вызывает попап
3) клик по Preorder Now button вызывает попап

Product Details popup
1) есть карточки
2) есть кнопка Preorder Now и кнопка закрытия
3) клик кнопка закрыть закрывает попап
4) клик кнопка Preorder Now открывает попап Preorder Now

Preorder Now попап
1) есть заголовок h1
2) есть секция с кошельками
3) клик по кнопке закрыть закрывает
4) клик по кошельку(одному по всем не нужно) открывает секцию change wallet и proceed
5) клик по change wallet скрывает секцию с кнопками
6) клик по proceed чекает что отображается второй степ

второй шаг формы
1) проверка что если не добавлены устройства то кнопка next disabled
2) проверка тотал суммы, то что элемент присутствует
3) проверка что отображены все устройства
4) добавляем устройство, проверяем что тотал сумма изменилась
5) уменьшаем на одно устройство, проверяем что сумма изменилась
6) клик по expend price проверяем что доп секция отображается
7) клик по close
8) клик по next и проверка что отображается 3 шаг

форма
1) проверка всех полей, то что присутсвуют на странице
2) проверка validate, если чего-то нет (достаточно одного двух полей) то кнопка next disable
3) заполняем все поля нормально и проверяем что кнопка next enabled
4) проверка что кнопка back возвращает на пред шаг
5) клик по next и что отображается след шаг

последний шаг
1) проверяем что Products есть в попапе и его значение
2) проверяем Ship To
3) Staking Requirement*
4) Products Total Price проверяем что есть на странице и значение
5) проверяем что без чекбокса кнопка submit disabled
6) проверяем что. счекбоксом кнопка submit enabled
-->
