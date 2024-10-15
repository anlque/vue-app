import { ref, watch, type Ref } from 'vue';
import axios from 'axios';
import {
  COINGECKO_PRICE_API_URL,
  CRYPTO_CURRENCIES,
  DEFAULT_CURRENCY,
} from '@/constants';

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
const getCoinIds = (currencies: Ref<string[]>): string[] => {
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
  currencies: Ref<string[]>,
): { [currency: string]: number | null } => {
  const amountsInCrypto: { [currency: string]: number | null } = {};

  if (Boolean(totalUSD)) {
    currencies.forEach((currency) => {
      const rate = exchangeRates[currency.toUpperCase()];
      amountsInCrypto[currency] = Boolean(rate)
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
    amountsInUSD[currency] = rate
      ? parseFloat((amount * rate).toFixed(2))
      : null;
  }

  return amountsInUSD;
};

// ---hook---
export function useCurrencyConversion(
  currencies: Ref<string[]>,
  totalUSD: Ref<number | null>,
  cryptoAmounts: Ref<{ [currency: string]: number | null }>,
): ConversionResult {
  const amountsInCrypto = ref<{ [currency: string]: number | null }>({});
  const amountsInUSD = ref<{ [currency: string]: number | null }>({});
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const exchangeRates = ref<{ [currency: string]: number }>({});

  const fetchExchangeRates = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Get currencies ids for request
      const coinIdsList = getCoinIds(currencies);

      // Get currency exchange rates
      if (coinIdsList.length > 0) {
        const data = await fetchRatesFromAPI(coinIdsList);

        currencies.forEach((currency) => {
          const coinId = coinIds[currency.toUpperCase()];
          exchangeRates.value[currency.toUpperCase()] =
            data[coinId]?.usd || null;
        });
      }

      // Convert
      amountsInCrypto.value = convertUSDtoCrypto(
        totalUSD,
        exchangeRates.value,
        currencies,
      );
      amountsInUSD.value = convertCryptoToUSD(
        cryptoAmounts,
        exchangeRates.value,
      );
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
      if (Boolean(totalUSD) || cryptoAmounts) {
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
