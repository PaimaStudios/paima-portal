export type Asset = {
  tokenId: number;
  amount: number;
};

export type AssetMetadata = {
  name: string;
  symbol: string;
  address: `0x${string}`;
  dexAddress: `0x${string}`;
};

export type GameMetadata = {
  name: string;
  assets: Record<string, AssetMetadata>;
};

export type SellOrder = {
  orderId: number;
  seller: string;
  tokenId: number;
  amount: number;
  price: string;
};
