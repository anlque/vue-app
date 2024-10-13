import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWizardStore = defineStore('wizard', () => {
  const currentStep = ref(1)
  const totalSteps = ref(5)

  const nextStep = () => {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const resetWizard = () => {
    currentStep.value = 1
  }
  return { currentStep, totalSteps, nextStep, prevStep, resetWizard }
})
