import { defineStore } from 'pinia';
import { useCartStore } from './cartStore';
import { useFormStore } from './form';
import { useWalletStore } from './walletStore';

export const useMainStore = defineStore('main', () => {
  const cartStore = useCartStore();
  const formStore = useFormStore();
  const walletStore = useWalletStore();

  return { cartStore, formStore, walletStore };
});
