import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const PRODUCT_NAME = 'Cyclone'

export interface CartItem {
  name: string
  id: string
  price: number
  quantity: number
  isFull: boolean
  staking: { min: number; max: number }
}

const initialState: CartItem[] = [
  {
    name: 'Qs',
    id: '1',
    price: 1352,
    quantity: 1,
    isFull: true,
    staking: { min: 3969.67, max: 33080.62 },
  },
  {
    name: 'Qs Pro',
    id: '2',
    price: 1629,
    quantity: 0,
    isFull: true,
    staking: { min: 3969.67, max: 76747.03 },
  },
  {
    name: 'Qs',
    id: '3',
    price: 549,
    quantity: 0,
    isFull: false,
    staking: { min: 3969.67, max: 33080.62 },
  },
  {
    name: 'Qs Pro',
    id: '4',
    price: 649,
    quantity: 0,
    isFull: false,
    staking: { min: 3969.67, max: 76747.03 },
  },
]

export const useCartStore = defineStore('cart', () => {
  const items = ref(initialState)

  function addItem(id: string) {
    const existingItem = items.value.find(item => item.id === id)
    console.log('tEST existingItem', existingItem)
    if (existingItem) {
      existingItem.quantity++
    }
    // else {
    //   items.value.push({ name, price, quantity })
    // }
  }

  function removeItem(id: string) {
    const existingItem = items.value.find(item => item.id === id)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }
  }

  function resetCart() {
    items.value.forEach(item => {
      item.quantity = 0
    })
  }
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const minStakeTotal = computed(
    () =>
      Math.round(
        items.value.reduce(
          (sum, item) => sum + item.staking.min * item.quantity,
          0,
        ) * 100,
      ) / 100,
  )

  const maxStakeTotal = computed(
    () =>
      Math.round(
        items.value.reduce(
          (sum, item) => sum + item.staking.max * item.quantity,
          0,
        ) * 100,
      ) / 100,
  )

  const fullItems = computed(() => items.value.filter(item => item.isFull))
  const nonFullItems = computed(() => items.value.filter(item => !item.isFull))
  const addedItems = computed(() =>
    items.value.filter(item => item.quantity > 0),
  )

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
  }
})
