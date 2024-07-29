export const networkTypes = ["cardano", "evm"] as const satisfies string[];
export type NetworkType = (typeof networkTypes)[number];

export const networks = [
  "arbitrum",
  "cardano",
  "xai",
] as const satisfies string[];
export type Network = (typeof networks)[number];

export type NetworkData = {
  name: string;
  type: NetworkType;
  icon: string;
  chainId: number;
  explorerTxUrl: string;
};
