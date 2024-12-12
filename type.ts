export interface Routes {
  routes: Route[];
  unavailableRoutes: UnavailableRoutes;
}

export interface Route {
  id: string;
  fromChainId: number;
  fromAmountUSD: string;
  fromAmount: string;
  fromToken: Token;
  fromAddress: Address;
  toChainId: number;
  toAmountUSD: string;
  toAmount: string;
  toAmountMin: string;
  toToken: Token;
  toAddress: Address;
  gasCostUSD: string;
  containsSwitchChain: boolean;
  steps: Step[];
  tags: string[];
}

type Address = string

export interface Token {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
}

export interface Step {
  type: string;
  id: string;
  tool: string;
  toolDetails: ToolDetails;
  action: Action;
  estimate: Estimate;
  includedSteps: IncludedStep[];
  integrator: string;
  relatedLifiSteps: string[];
}

export interface Action {
  fromToken: Token;
  fromAmount: string;
  toToken: Token;
  fromChainId: number;
  toChainId: number;
  slippage: number;
  fromAddress: Address;
  toAddress?: Address;
  destinationGasConsumption?: string;
  destinationCallData?: string;
}

export interface Estimate {
  tool: string;
  approvalAddress: string;
  toAmountMin: string;
  toAmount: string;
  fromAmount: string;
  feeCosts: FeeCost[];
  gasCosts: GasCost[];
  executionDuration: number;
  fromAmountUSD?: string;
  toAmountUSD?: string;
}

export interface FeeCost {
  name: string;
  description: string;
  token: Token;
  amount: string;
  amountUSD: string;
  percentage: string;
  included: boolean;
}

export interface GasCost {
  type: string;
  price: string;
  estimate: string;
  limit: string;
  amount: string;
  amountUSD: string;
  token: Token;
}

export interface IncludedStep {
  id: string;
  type: string;
  action: Action;
  estimate: Estimate;
  tool: string;
  toolDetails: ToolDetails;
}

export interface ToolDetails {
  key: string;
  name: string;
  logoURI: string;
}

export interface UnavailableRoutes {
  filteredOut: FilteredOut[];
  failed: Failed[];
}

export interface Failed {
  overallPath: string;
  subpaths: { [key: string]: Subpath[] };
}

export interface Subpath {
  errorType: string;
  code: string;
  action: Action;
  tool: string;
  message: string;
}

export interface FilteredOut {
  overallPath: string;
  reason: string;
}
