import { ref, watch, onMounted } from 'vue'

export function useFetchAdaToUsd(conversionFeeAda: number, total: Ref<number>) {
  const adaToUsd = ref(0)
  const adaFeeInUsd = ref(0)
  const totalInAda = ref(0)

  async function fetchAdaToUsd() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd',
      )
      const data = await response.json()
      adaToUsd.value = data.cardano.usd

      adaFeeInUsd.value = (conversionFeeAda * adaToUsd.value).toFixed(2)

      totalInUsd.value = (total.value * adaToUsd.value).toFixed(2)
    } catch (error) {
      console.error('Error in getting ADA rate:', error)
    }
  }

  onMounted(() => {
    fetchAdaToUsd()
  })

  watch(total, newTotal => {
    if (adaToUsd.value) {
      totalInAda.value = (newTotal / adaToUsd.value).toFixed(2)
    }
  })

  return {
    adaToUsd,
    adaFeeInUsd,
    totalInAda,
  }
}
