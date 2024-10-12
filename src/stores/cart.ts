import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const items = ref([] as { name: string, id: string, price: number, quantity: number }[]);

  function addItem(name: string, price: number, quantity: number) {
    const existingItem = items.value.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ name, price, quantity });
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter(item => item.id !== id);
  }

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return { items, addItem, removeItem, total };
});
