import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
  const wallet = ref<Wallet>({
    name: '',
    // id: '',
  })

  // function connectWallet(name: string, id: string) {
  //   wallet.value = { name, id }
  // }

  function connectWallet(name: string) {
    wallet.value = { name }
  }

  // function disconnectWallet() {
  //   wallet.value = { name: '', id: '' }
  // }

  function disconnectWallet() {
    wallet.value = { name: '' }
  }

  return { wallet, connectWallet, disconnectWallet }
})
