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

export const formatTokens = (
  amount: bigint | undefined,
  decimalsDisplay = 2,
  round = false,
) => {
  const str = formatEther(amount ?? 0n);
  if (round) {
    return Number(Number(str).toFixed(decimalsDisplay)).toString();
  }
  return str.substring(
    0,
    str.indexOf(".") >= 0 ? str.indexOf(".") + 1 + decimalsDisplay : undefined,
  );
};

export const formatEth = (amount: bigint | undefined, round = true) => {
  return Number(formatTokens(amount ?? 0n, 4, round)).toString();
};
