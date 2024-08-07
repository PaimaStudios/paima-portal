import { useCallback } from "react";
import useGetLaunchpadData from "./useGetLaunchpadData";
import useConnectWallet from "@hooks/useConnectWallet";
import useGetLaunchpadUserData from "./useGetLaunchpadUserData";

export default function useGetItemQuantityLeft(
  launchpadSlug: string,
  orderItems: {
    id: number;
    quantity: number;
  }[],
) {
  const { address: walletAddress } = useConnectWallet();
  const { data: launchpadData } = useGetLaunchpadData(launchpadSlug);
  const { data: userData } = useGetLaunchpadUserData(
    launchpadSlug,
    walletAddress,
  );

  const getItemQuantityLeft = useCallback(
    (itemId: number) => {
      if (!launchpadData) return undefined;

      const itemData = launchpadData.items.find((item) => item.id === itemId);
      if (!itemData || itemData.supply === undefined) return undefined;

      const userAlreadyPurchasedQuantity =
        userData?.items.find((userDataItem) => userDataItem.itemid === itemId)
          ?.quantity ?? 0;
      const itemCountFromOrder =
        orderItems.find((item) => item.id === itemId)?.quantity ?? 0;

      return (
        itemData.supply -
        ((itemData.purchased ?? 0) - userAlreadyPurchasedQuantity) -
        itemCountFromOrder
      );
    },
    [launchpadData, orderItems, userData?.items],
  );
  return { getItemQuantityLeft };
}
