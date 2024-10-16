import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { MODEL_TYPE } from '@/constants';

export type ModelType = 'Qs' | 'Qs Pro';

export interface CartItem {
  name: ModelType;
  id: string;
  price: number;
  quantity: number;
  isCustomVersion: boolean;
  staking: { min: number; max: number };
}

const initialState: CartItem[] = [
  {
    name: MODEL_TYPE.QS,
    id: '1',
    price: 1352,
    quantity: 1,
    isCustomVersion: true,
    staking: { min: 3969.67, max: 33080.62 },
  },
  {
    name: MODEL_TYPE.QS_PRO,
    id: '2',
    price: 1629,
    quantity: 0,
    isCustomVersion: true,
    staking: { min: 3969.67, max: 76747.03 },
  },
  {
    name: MODEL_TYPE.QS,
    id: '3',
    price: 549,
    quantity: 0,
    isCustomVersion: false,
    staking: { min: 3969.67, max: 33080.62 },
  },
  {
    name: MODEL_TYPE.QS_PRO,
    id: '4',
    price: 649,
    quantity: 0,
    isCustomVersion: false,
    staking: { min: 3969.67, max: 76747.03 },
  },
];

export const useCartStore = defineStore('cart', () => {
  const items = ref(initialState);

  function addItem(id: CartItem['id']) {
    const existingItem = items.value.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    }
  }

  function removeItem(id: CartItem['id']) {
    const existingItem = items.value.find((item) => item.id === id);
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--;
    }
  }

  function resetCart() {
    items.value.forEach((item) => {
      item.quantity = 0;
    });
  }
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const minStakeTotal = computed(
    () =>
      Math.round(
        items.value.reduce(
          (sum, item) => sum + item.staking.min * item.quantity,
          0,
        ) * 100,
      ) / 100,
  );

  const maxStakeTotal = computed(
    () =>
      Math.round(
        items.value.reduce(
          (sum, item) => sum + item.staking.max * item.quantity,
          0,
        ) * 100,
      ) / 100,
  );

  const fullItems = computed(() =>
    items.value.filter((item) => item.isCustomVersion),
  );
  const nonFullItems = computed(() =>
    items.value.filter((item) => !item.isCustomVersion),
  );
  const addedItems = computed(() =>
    items.value.filter((item) => item.quantity > 0),
  );

  return {
    items,
    total,
    fullItems,
    nonFullItems,
    addedItems,
    minStakeTotal,
    maxStakeTotal,
    addItem,
    removeItem,
    resetCart,
  };
});
