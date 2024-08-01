import { useCallback } from "react";
import useGetLaunchpadData from "./useGetLaunchpadData";
import { writeContract } from "@wagmi/core";
import { config } from "@config/wagmi";
import { paimaLaunchpadAbi } from "src/generated";
import { ZERO_ADDRESS } from "@utils/constants";
import useConnectWallet from "@hooks/useConnectWallet";
import { Address } from "viem";

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
