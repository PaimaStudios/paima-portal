export type Asset = {
  tokenId: number;
  amount: number;
};

export type AssetMetadata = {
  name: string;
  symbol: string;
  address: Record<number, `0x${string}`>;
  dexAddress: Record<number, `0x${string}`>;
};

export type GameMetadata = {
  name: string;
  assets: Record<string, AssetMetadata>;
};
