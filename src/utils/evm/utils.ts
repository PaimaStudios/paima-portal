import { formatEther } from "viem";
import { TokenEVM } from "./types";
import env from "@config/env";

export const areEqualTokens = (a: TokenEVM, b: TokenEVM) => {
  return a.token === b.token && a.tokenId === b.tokenId;
};

export const formatEVMAddress = (
  address: string | undefined,
): string | undefined => {
  if (address === undefined) return undefined;
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
  )}`;
};

export const getAlchemyApiKey = (chainId: number) => {
  return env.REACT_APP_ALCHEMY_API_KEYS[chainId];
};

// Formats a wei bigint value to a string representation of ether until the first `significantDecimals` non-zero decimals.
export const formatEth = (
  amount: bigint | undefined,
  significantDecimals = 3,
) => {
  const regex = new RegExp(String.raw`^-?\d*\.?0*\d{0,${significantDecimals}}`);
  return formatEther(amount ?? 0n).match(regex)?.[0] ?? "0";
};
