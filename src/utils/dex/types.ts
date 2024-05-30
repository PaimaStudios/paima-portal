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

export type AssetHistoricalData = {
  timeFrom: number; // First data point date
  timeTo: number; // Last data point date
  data: {
    time: number; // Time start date for data point
    high: number; // Max price for range
    low: number; // Min price for range
    open: number; // Start price for range
    close: number; // End price for range
    volumeFrom: number; // Total Supply of Assets (at `time`) in fromSym Units
    volumeTo: number; // Total Supply of Assets (at `time`) in toSym Units
  }[];
};
