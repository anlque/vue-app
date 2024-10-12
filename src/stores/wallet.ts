import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Wallet {
  name: string;
  id: string;
}

export const useWalletStore = defineStore('wallet', () => {
  const wallet = ref<Wallet>({
    name: '',
    id: '',
  });


  function connectWallet(name: string, id: string) {
    wallet.value = { name, id };
  }

  function disconnectWallet() {
    wallet.value = { name: '', id: '' };
  }
  return { walletName, walletId, connectWallet, disconnectWallet };
});
