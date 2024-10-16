<script setup lang="ts">
import { defineEmits, ref, computed, shallowRef, type Component } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { useMockRequest } from '@/hooks/useMockRequest';
import { notify } from '@/utils/notify';
import { REQUEST_STATUS, WALLET_NAME } from '@/constants';
import CustomButton from '@/components/UI/CustomButton.vue';
import CustomLoader from '@/components/UI/CustomLoader.vue';
import {
  IconBeginWallet,
  IconNamiWallet,
  IconYoroiWallet,
  IconEternlWallet,
  IconTyphonWallet,
  IconGeroWallet,
  IconFlintWallet,
  IconLaceWallet,
  IconVesprWallet,
} from '@/components/icons/wallets';

// interfaces
interface Wallet {
  name: string;
  icon: Component;
  isAvailable: boolean;
  link: string;
}

interface Cardano {
  [key: string]: any;
}

// passed handlers
const emit = defineEmits(['onClose', 'onProceedClick']);

// store
const { walletStore } = useMainStore();

// local state
const wallets = ref<Wallet[]>([
  {
    name: WALLET_NAME.BEGIN,
    icon: shallowRef(IconBeginWallet),
    isAvailable: false,
    link: 'https://begin.is/',
  },
  {
    name: WALLET_NAME.NAMI,
    icon: shallowRef(IconNamiWallet),
    isAvailable: false,
    link: 'https://www.namiwallet.io/',
  },
  {
    name: WALLET_NAME.YOROI,
    icon: shallowRef(IconYoroiWallet),
    isAvailable: false,
    link: 'https://yoroi-wallet.com/',
  },

  {
    name: WALLET_NAME.ETERNL,
    icon: shallowRef(IconEternlWallet),
    isAvailable: false,
    link: 'https://eternl.io/',
  },
  {
    name: WALLET_NAME.TYPHON,
    icon: shallowRef(IconTyphonWallet),
    isAvailable: false,
    link: 'https://typhonwallet.io/#/',
  },
  {
    name: WALLET_NAME.GERO,
    icon: shallowRef(IconGeroWallet),
    isAvailable: false,
    link: 'https://www.gerowallet.io/',
  },
  {
    name: WALLET_NAME.FLINT,
    icon: shallowRef(IconFlintWallet),
    isAvailable: false,
    link: 'https://flint-wallet.com/',
  },
  {
    name: WALLET_NAME.LACE,
    icon: shallowRef(IconLaceWallet),
    isAvailable: false,
    link: 'https://www.lace.io/',
  },
  {
    name: WALLET_NAME.VESPR,
    icon: shallowRef(IconVesprWallet),
    isAvailable: false,
    link: 'https://vespr.xyz/',
  },
]);
const selectedWallet = ref<Wallet['name'] | null>(null);

// hooks
const { isLoading, performRequest } = useMockRequest();

// local handlers
const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const onSelectWallet = (wallet: Wallet) => {
  if (wallet.isAvailable) {
    selectedWallet.value = wallet.name;
  } else {
    openInNewTab(wallet.link);
  }
};

const onResetWallet = () => {
  selectedWallet.value = null;
};

const onConnectWallet = (onThen: () => void) => {
  performRequest({
    type: REQUEST_STATUS.SUCCESS,
    message: 'Wallet connected',
    onResolve: ({ message, status }) => {
      if (selectedWallet.value) {
        walletStore.connectWallet(selectedWallet.value);
        notify({ type: status, title: message });
        onThen();
      }
    },
  });
};

const isWalletAvailable = (walletName: string): boolean => {
  const cardano = (window as any).cardano as Cardano | undefined;
  return !!cardano?.[walletName.toLowerCase()];
};

const formattedWallets = computed(() => {
  return wallets.value
    .map((wallet: Wallet) => ({
      ...wallet,
      isAvailable: isWalletAvailable(wallet.name),
    }))
    .sort((a: Wallet, b: Wallet) => {
      return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
    });
});

const handleProceedClick = async () => {
  onConnectWallet(() => emit('onProceedClick'));
};
</script>

<template>
  <div
    class="mt-[74px] md:mt-0 px-2 sm:px-6 md:px-[30px] md:items-center md:flex md:justify-center pb-20 min-h-full"
  >
    <div class="flex flex-col gap-5">
      <div class="flex flex-col">
        <p class="text-xl leading-[14px] font-bold text-purple-cold">
          Connect your
        </p>
        <h1
          class="font-poppins text-grayscaleLicorice text-[40px] md:text-[52px] leadin-[66px] font-medium"
        >
          Cardano
          <span class="font-poppins font-light text-purple-cold">Wallet</span>
        </h1>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-center gap-2.5">
          <span class="text-sm leading-[22px] font-bold text-grayscaleLicorice"
            >Select from the list of available wallets</span
          >
          <div class="flex-1 h-[1px] bg-grayscale-line-2"></div>
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="wallet in formattedWallets"
          :key="wallet.name"
          class="relative"
        >
          <button
            @click="() => onSelectWallet(wallet)"
            :disabled="Boolean(selectedWallet)"
            :class="[
              'bg-grayscale-milk-white rounded-lg p-[10px] size-[55px] flex items-center justify-center transition-all',
              wallet.isAvailable && !selectedWallet
                ? 'opacity-100'
                : 'opacity-50',
              !selectedWallet &&
                'cursor-pointer hover:opacity-100 hover:bg-[linear-gradient(86deg,#5C8CFF_3.57%,#8273FF_95.84%)] hover:shadow-[0px_0px_22px_0px_rgba(155,158,255,0.30)]',
              selectedWallet === wallet.name &&
                '!opacity-100 bg-[linear-gradient(86deg,#5C8CFF_3.57%,#8273FF_95.84%)] shadow-[0px_0px_22px_0px_rgba(155,158,255,0.30)]',
            ]"
          >
            <component :is="wallet.icon" />
          </button>
          <span
            v-show="wallet.isAvailable && !selectedWallet"
            class="absolute -top-[2px] -right-1 size-4 rounded-full bg-[#44D7B6] border-grayscale-white border-[2px]"
          ></span>
        </div>
      </div>

      <div
        :class="[
          'flex items-center gap-4 md:gap-[20px] mt-5 pb-[25px] md:pb-0 w-full',
          selectedWallet ? 'opacity-100' : 'opacity-0',
        ]"
      >
        <CustomButton class="w-1/2" @click="onResetWallet">
          Change Wallet
        </CustomButton>

        <CustomButton
          class="w-1/2"
          :isPrimary="true"
          :disabled="isLoading"
          @click="handleProceedClick"
        >
          <CustomLoader v-if="isLoading" />
          <span v-if="!isLoading">Proceed</span>
        </CustomButton>
      </div>
    </div>
  </div>
</template>
