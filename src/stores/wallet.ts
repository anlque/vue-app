import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
  const wallet = ref<Wallet>({
    name: '',
  })

  function connectWallet(name: string) {
    wallet.value = { name }
  }

  function disconnectWallet() {
    wallet.value = { name: '' }
  }

  return { wallet, connectWallet, disconnectWallet }
})
