interface Specification {
  label: string;
  value: string;
  id: string;
  isHighlighted: boolean;
}

interface NodeOperationDetail {
  label: string;
  value: string;
  id: string;
  isHighlighted: boolean;
}

interface StakeRequirement {
  value: number;
  label: string;
  isHighlighted: boolean;
}

interface Pricing {
  unitPrice: { value: number; isHighlighted: boolean };
  marketConversion: { value: number; isHighlighted: boolean };
}

export interface ProductDetail {
  name: string;
  description: string;
  specifications: Specification[];
  nodeOperationDetails: NodeOperationDetail[];
  stakeRequirement: {
    min: StakeRequirement;
    max: StakeRequirement;
  };
  pricing: Pricing;
}
