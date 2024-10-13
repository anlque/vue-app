import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface CartItem {
  name: string
  id: string
  price: number
  quantity: number
  isFull: boolean
}

const initialState: CartItem[] = [
  { name: 'Cyclone Qs', id: '1', price: 1352, quantity: 0, isFull: true },
  { name: 'Cyclone Qs Pro', id: '2', price: 1629, quantity: 0, isFull: true },
  { name: 'Cyclone Qs', id: '3', price: 549, quantity: 0, isFull: false },
  { name: 'Cyclone Qs Pro', id: '4', price: 649, quantity: 0, isFull: false },
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
    addItem,
    removeItem,
    resetCart,
  }
})
