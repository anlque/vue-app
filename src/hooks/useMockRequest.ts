import { ref, type Ref } from 'vue';
import {
  DEFAULT_REQUEST_STATUS,
  LOADING_TIME,
  REQUEST_STATUS,
} from '@/constants';

type ResStatus = 'success' | 'error';

interface ResponseType {
  status: ResStatus;
  message: string;
}

type ResolveCallback = (response: ResponseType) => void;
type RejectCallback = (error: ResponseType) => void;

interface PerformRequestParams {
  type: ResStatus;
  message: string;
  delay?: number;
  onResolve?: ResolveCallback;
  onReject?: RejectCallback;
}

export function useMockRequest() {
  const isLoading: Ref<boolean> = ref(false);
  const responseMessage: Ref<string> = ref('');

  // Function for request emission
  async function performRequest({
    type = DEFAULT_REQUEST_STATUS,
    delay = LOADING_TIME,
    message = '',
    onResolve,
    onReject,
  }: PerformRequestParams) {
    isLoading.value = true;
    responseMessage.value = '';

    try {
      const response: ResponseType = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (type === REQUEST_STATUS.SUCCESS) {
            resolve({
              status: REQUEST_STATUS.SUCCESS,
              message: message || 'Request succeeded!',
            });
          } else {
            reject({
              status: REQUEST_STATUS.ERROR,
              message: message || 'Request failed!',
            });
          }
        }, delay);
      });

      responseMessage.value = response.message;

      onResolve?.(response);
    } catch (error: any) {
      responseMessage.value = error.message;

      onReject?.(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    responseMessage,
    performRequest,
  };
}
