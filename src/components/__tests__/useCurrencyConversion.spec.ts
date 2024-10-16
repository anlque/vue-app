import { ref } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion';
import { CRYPTO_CURRENCIES } from '@/constants';
import type { Currency } from '@/stores/wallet';

// mocking axios to simulate api responses
vi.mock('axios');

describe('useCurrencyConversion', () => {
  const mockCurrencies = ref([CRYPTO_CURRENCIES.ADA, CRYPTO_CURRENCIES.USDM]);
  const mockTotalUSD = ref(100);
  const mockCryptoAmounts = ref({
    [CRYPTO_CURRENCIES.ADA]: 0.5,
    [CRYPTO_CURRENCIES.USDM]: null,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', async () => {
    // mock api response
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        cardano: { usd: 2 },
        usdm: { usd: 1 },
      },
    });
    const { amountsInCrypto, amountsInUSD, loading, error } =
      useCurrencyConversion(mockCurrencies, mockTotalUSD, mockCryptoAmounts);

    // loading is true when request starts
    expect(loading.value).toBeTruthy();

    expect(amountsInCrypto.value).toEqual({});
    expect(amountsInUSD.value).toEqual({});
    expect(error.value).toBe(null);

    // trigger the fetchExchangeRates method
    await new Promise(setImmediate);

    // loading is true on finally
    expect(loading.value).toBeFalsy();
  });

  it('should fetch exchange rates and convert USD to crypto', async () => {
    // mock api response
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        cardano: { usd: 2 },
        usdm: { usd: 1 },
      },
    });

    const { amountsInCrypto, loading, error } = useCurrencyConversion(
      mockCurrencies,
      mockTotalUSD,
      mockCryptoAmounts,
    );

    expect(loading.value).toBeTruthy();
    // trigger the fetchExchangeRates method
    await new Promise(setImmediate);

    expect(loading.value).toBeFalsy();
    expect(error.value).toBe(null);
    expect(amountsInCrypto.value).toEqual({
      [CRYPTO_CURRENCIES.ADA]: 50.0,
      [CRYPTO_CURRENCIES.USDM]: 100.0,
    });
  });

  it('should handle API errors gracefully', async () => {
    // mock api error
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('Network Error'));

    const { amountsInCrypto, amountsInUSD, loading, error } =
      useCurrencyConversion(mockCurrencies, mockTotalUSD, mockCryptoAmounts);

    // trigger the fetchExchangeRates method
    await new Promise(setImmediate);

    expect(loading.value).toBe(false);
    expect(error.value).toBe('Network Error');
    expect(amountsInCrypto.value).toEqual({});
    expect(amountsInUSD.value).toEqual({});
  });

  it('should convert crypto to USD correctly', async () => {
    // mock api response
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        cardano: { usd: 2 },
        usdm: { usd: 1 },
      },
    });

    const { amountsInUSD } = useCurrencyConversion(
      mockCurrencies,
      mockTotalUSD,
      mockCryptoAmounts,
    );

    // trigger the fetchExchangeRates method
    await new Promise(setImmediate);

    expect(amountsInUSD.value).toEqual({
      [CRYPTO_CURRENCIES.ADA]: 1.0, // 0.5 * 2
      [CRYPTO_CURRENCIES.USDM]: null, // null * any rate
    });
  });

  it('should handle unsupported currencies gracefully', () => {
    const unsupportedCurrencies = ref<Currency[]>([
      'UNSUPPORTED_CURRENCY' as Currency,
    ]);

    try {
      useCurrencyConversion(
        unsupportedCurrencies,
        mockTotalUSD,
        mockCryptoAmounts,
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          'Unsupported currency: UNSUPPORTED_CURRENCY',
        );
      }
    }
  });

  it('should reset values when totalUSD is null', async () => {
    const { amountsInCrypto, amountsInUSD } = useCurrencyConversion(
      mockCurrencies,
      ref(null),
      mockCryptoAmounts,
    );

    // trigger watch callback
    await new Promise(setImmediate);

    expect(amountsInCrypto.value).toEqual({});
    expect(amountsInUSD.value).toEqual({});
  });
});
