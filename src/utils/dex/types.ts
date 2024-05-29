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
  orderid: number;
  seller: string;
  assettokenid: number;
  amount: number;
  price: string;
};
