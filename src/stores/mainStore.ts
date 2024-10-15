import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { useFormStore } from './form'
import { useWalletStore } from './wallet'
import { useWizardStore } from './wizard'

export const useMainStore = defineStore('main', () => {
  const cartStore = useCartStore()
  const formStore = useFormStore()
  const walletStore = useWalletStore()
  const wizardStore = useWizardStore()

  return { cartStore, formStore, walletStore, wizardStore }
})
