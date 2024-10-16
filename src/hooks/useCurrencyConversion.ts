import { ref, watch, type Ref } from 'vue';
import axios from 'axios';
import {
  COINGECKO_PRICE_API_URL,
  CRYPTO_CURRENCIES,
  DEFAULT_CURRENCY,
} from '@/constants';
import type { Currency } from '@/stores/wallet';

const coinIds: { [key: string]: string } = {
  [CRYPTO_CURRENCIES.ADA]: 'cardano',
  [CRYPTO_CURRENCIES.USDM]: 'usdm',
};

interface ConversionResult {
  amountsInCrypto: Ref<{ [currency: string]: number | null }>;
  amountsInUSD: Ref<{ [currency: string]: number | null }>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

// ---methods---

// Map currencies to ids
const getCoinIds = (currencies: string[]): string[] => {
  return currencies.map((currency) => {
    const coinId = coinIds[currency.toUpperCase()];
    if (!coinId) {
      throw new Error(`Unsupported currency: ${currency}`);
    }
    return coinId;
  });
};

// Perform the API request
const fetchRatesFromAPI = async (coinIdsList: string[]): Promise<any> => {
  const response = await axios.get(COINGECKO_PRICE_API_URL, {
    params: {
      ids: coinIdsList.join(','),
      vs_currencies: DEFAULT_CURRENCY,
    },
  });
  return response.data;
};

// Convert USD -> Crypto
const convertUSDtoCrypto = (
  totalUSD: number | null,
  exchangeRates: { [currency: string]: number },
  currencies: string[],
): { [currency: string]: number | null } => {
  const amountsInCrypto: { [currency: string]: number | null } = {};

  if (Boolean(totalUSD)) {
    currencies.forEach((currency) => {
      const rate = exchangeRates[currency.toUpperCase()];
      amountsInCrypto[currency] =
        Boolean(rate) && totalUSD !== null
          ? parseFloat((totalUSD / rate).toFixed(2))
          : null;
    });
  }

  return amountsInCrypto;
};

// Convert Crypto -> USD
const convertCryptoToUSD = (
  cryptoAmounts: { [currency: string]: number | null },
  exchangeRates: { [currency: string]: number },
): { [currency: string]: number | null } => {
  const amountsInUSD: { [currency: string]: number | null } = {};

  for (const [currency, amount] of Object.entries(cryptoAmounts)) {
    const rate = exchangeRates[currency.toUpperCase()];
    amountsInUSD[currency] =
      Boolean(rate) && amount !== null
        ? parseFloat((amount * rate).toFixed(2))
        : null;
  }

  return amountsInUSD;
};

// ---hook---
export function useCurrencyConversion(
  currencies: Ref<Currency[]>,
  totalUSD: Ref<number | null>,
  cryptoAmounts: Ref<{ [key in Currency]?: number | null }>,
): ConversionResult {
  const amountsInCrypto = ref<{ [key in Currency]?: number | null }>({});
  const amountsInUSD = ref<{ [key in Currency]?: number | null }>({});
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const exchangeRates = ref<{ [key in Currency]?: number }>({
    [CRYPTO_CURRENCIES.ADA]: 0,
    [CRYPTO_CURRENCIES.USDM]: 0,
  });

  const fetchExchangeRates = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Get currencies ids for request
      const coinIdsList = getCoinIds(currencies.value);

      // Get currency exchange rates
      if (coinIdsList.length > 0) {
        const data = await fetchRatesFromAPI(coinIdsList);

        currencies.value.forEach((currency) => {
          const coinId = coinIds[currency.toUpperCase()];
          exchangeRates.value[currency.toUpperCase() as Currency] =
            data[coinId]?.usd || null;
        });
      }

      // Convert
      amountsInCrypto.value = convertUSDtoCrypto(
        totalUSD.value,
        exchangeRates.value,
        currencies.value,
      );
      amountsInUSD.value = convertCryptoToUSD(
        cryptoAmounts.value,
        exchangeRates.value,
      );
      console.log('amountsInUSD', amountsInUSD.value);
    } catch (err) {
      error.value = (err as Error).message || 'Failed to get exchange rates';
      amountsInCrypto.value = {};
      amountsInUSD.value = {};
    } finally {
      loading.value = false;
    }
  };

  watch(
    [currencies, totalUSD, cryptoAmounts],
    () => {
      if (
        Boolean(totalUSD.value) ||
        Boolean(Object.keys(cryptoAmounts.value).length)
      ) {
        fetchExchangeRates();
      } else {
        amountsInCrypto.value = {};
        amountsInUSD.value = {};
      }
    },
    { immediate: true },
  );

  return {
    amountsInCrypto,
    amountsInUSD,
    loading,
    error,
  };
}
