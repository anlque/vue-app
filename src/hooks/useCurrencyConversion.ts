import { ref, watch, type Ref } from 'vue'
import axios from 'axios'

const coinIds: { [key: string]: string } = {
  ADA: 'cardano',
  USDM: 'usdm',
}

interface ConversionResult {
  amountInCrypto: Ref<number | null>
  amountInUSD: Ref<number | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}

export function useCurrencyConversion(
  currency: Ref<string>,
  totalUSD: Ref<number | null>,
  cryptoAmount: Ref<number | null>,
): ConversionResult {
  const amountInCrypto = ref<number | null>(null)
  const amountInUSD = ref<number | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const exchangeRate = ref<number>(1)

  const fetchExchangeRate = async () => {
    loading.value = true
    error.value = null

    try {
      // if (currency.toUpperCase() !== 'USDM') {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: coinIds[currency],
            vs_currencies: 'usd',
          },
        },
      )

      const data = response.data[coinIds[currency]]
      if (!data || !data.usd) {
        throw new Error('Unsupported currency')
      }

      exchangeRate.value = data.usd
      // } else {
      //   exchangeRate.value = 1 // USDM привязан к USD
      // }

      if (totalUSD !== null || totalUSD !== undefined) {
        console.log('inside usd')
        amountInCrypto.value = parseFloat(
          (totalUSD / exchangeRate.value).toFixed(2),
        )
      }

      if (cryptoAmount !== null || cryptoAmount !== undefined) {
        console.log('inside crypto')
        amountInUSD.value = parseFloat(
          (cryptoAmount * exchangeRate.value).toFixed(2),
        )
      }
    } catch (err) {
      error.value = (err as Error).message || 'Failed to get exchange rate'
      amountInCrypto.value = null
      amountInUSD.value = null
    } finally {
      loading.value = false
    }
  }

  watch(
    [currency, totalUSD, cryptoAmount],
    () => {
      if (totalUSD.value !== null || cryptoAmount.value !== null) {
        fetchExchangeRate()
      } else {
        amountInCrypto.value = null
        amountInUSD.value = null
      }
    },
    { immediate: true },
  )

  return {
    amountInCrypto,
    amountInUSD,
    loading,
    error,
  }
}
