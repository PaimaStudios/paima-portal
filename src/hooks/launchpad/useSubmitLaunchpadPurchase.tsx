import { useCallback } from "react";
import useGetLaunchpadData from "./useGetLaunchpadData";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "@config/wagmi";
import { paimaLaunchpadAbi } from "src/generated";
import { ZERO_ADDRESS } from "@utils/constants";
import useConnectWallet from "@hooks/useConnectWallet";
import { Address, erc20Abi } from "viem";

type Params = {
  launchpadSlug: string;
  currency: string;
  value: bigint;
  referrer?: string;
  orderItems: {
    id: number;
    quantity: number;
  }[];
};

export default function useSubmitLaunchpadPurchase(params: Params) {
  const { data: launchpadData } = useGetLaunchpadData(params.launchpadSlug);
  const { address } = useConnectWallet();

  const submitLaunchpadPurchase = useCallback(async () => {
    console.log("submitLaunchpadPurchase params", params);
    console.log("address", address);
    const { currency, value, referrer = ZERO_ADDRESS, orderItems } = params;
    if (!launchpadData) return;
    console.log("launchpadaddress", launchpadData.address);
    let result;
    if (currency === ZERO_ADDRESS) {
      console.log("args", [
        address as Address,
        referrer as Address,
        orderItems.map((item) => BigInt(item.id)),
        orderItems.map((item) => BigInt(item.quantity)),
      ]);
      result = await writeContract(config, {
        abi: paimaLaunchpadAbi,
        address: launchpadData.address as Address,
        functionName: "buyItemsNative",
        args: [
          address as Address,
          referrer as Address,
          orderItems.map((item) => BigInt(item.id)),
          orderItems.map((item) => BigInt(item.quantity)),
        ],
        value,
      });
    } else {
      const approvedAmount = await readContract(config, {
        abi: erc20Abi,
        address: currency as Address,
        functionName: "allowance",
        args: [address as Address, launchpadData.address as Address],
      });
      if (approvedAmount < value) {
        result = await writeContract(config, {
          abi: erc20Abi,
          address: currency as Address,
          functionName: "approve",
          args: [launchpadData.address as Address, value],
        });
        console.log("approve result", result);
      }
      result = await writeContract(config, {
        abi: paimaLaunchpadAbi,
        address: launchpadData.address as Address,
        functionName: "buyItemsErc20",
        args: [
          currency as Address,
          value,
          address as Address,
          referrer as Address,
          orderItems.map((item) => BigInt(item.id)),
          orderItems.map((item) => BigInt(item.quantity)),
        ],
      });
    }
    console.log("result", result);
  }, [address, launchpadData, params]);

  return { submitLaunchpadPurchase };
}
