export interface ProductSpec {
  specs: {
    cpuCores: {
      value: number;
      label: string;
    };
    ramMemory: {
      value: number;
      label: string;
    };
    ethernet: {
      value: number;
      label: string;
    };
    storage: {
      value: number;
      label: string;
    };
  };
}
