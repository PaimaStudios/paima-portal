export type Asset = {
  tokenId: number;
  amount: number;
};

export type DexValidMintedAssetsResponse = {
  total: number;
  stats: Asset[];
};

export type AssetMetadataBasic = {
  asset: string; // Asset Code
  name?: string; // OPTIONAL Asset Name
  description?: string; // OPTIONAL Asset Description
  fromSym: string; // Name of base Asset
  toSym: string; // Name of unit to convert
  contractAsset: `0x${string}`; // Contract Address for Asset (IERC1155)
  contractDex: `0x${string}`; // Contract Address for Dex (OrderbookDex)
  contractChain: `0x${string}`; // CAIP2 Chain Identifier
  image?: string; // OPTIONAL Asset URL Image (1:1 200px Image)
};

export type AssetMetadata = AssetMetadataBasic & {
  totalSupply: number; // Total number of assets
};

export type GameMetadata = {
  game: {
    id: string; // Game ID
    name?: string; // Optional Game Name
    version?: string; // Optional Game Version
  };
  assets: AssetMetadataBasic[];
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

export type DexOrdersResponse = {
  stats: SellOrder[];
};
