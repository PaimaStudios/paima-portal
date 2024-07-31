import { ZERO_ADDRESS } from "@utils/constants";

export const tokens: Record<
  string,
  { name: string; symbol: string; decimals: number }
> = {
  [ZERO_ADDRESS]: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  "0x5FbDB2315678afecb367f032d93F642f64180aa3": {
    name: "Mock USDC",
    symbol: "mUSDC",
    decimals: 18,
  },
};
