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

export function formatUnitsWithoutStrippingTrailingZeros(
  value: bigint,
  decimals: number,
) {
  if (value === 0n) return "0";
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ];
  return `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
}

export function formatUnitsWithStrippingTrailingZeros(
  value: bigint,
  decimals: number,
  finalDecimals: number,
) {
  if (value === 0n) return "0";
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ];
  const formattedValue = `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;

  return parseFloat(formattedValue).toFixed(finalDecimals);
}

export function rightPadAndFormatBigInt(value: bigint, finalDecimals: number) {
  const formatted = formatEth(value);

  if (formatted.includes(".")) {
    const wholeNumberLength = formatted.split(".")[0].length;
    return formatted.padEnd(wholeNumberLength + finalDecimals + 1, "0");
  }

  return formatted.padEnd(finalDecimals, "0");
}
