import { ref } from 'vue';
import { defineStore } from 'pinia';

export type Currency = 'ADA' | 'USDM';

interface WalletState {
  name: string;
  paymentMethod: Currency;
}

export const useWalletStore = defineStore('wallet', () => {
  const wallet = ref<WalletState>({
    name: '',
    paymentMethod: null,
  });

  function connectWallet(name: WalletState['name']) {
    wallet.value.name = name;
  }

  function disconnectWallet() {
    wallet.value.name = '';
  }

  function choosePaymentMethod(method: WalletState['paymentMethod']) {
    wallet.value.paymentMethod = method;
  }

  function resetPaymentMethod() {
    wallet.value.paymentMethod = null;
  }

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    choosePaymentMethod,
    resetPaymentMethod,
  };
});
