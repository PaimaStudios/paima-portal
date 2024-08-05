import { useCallback, useEffect } from "react";
import useGetLaunchpadData from "./useGetLaunchpadData";
import { readContract } from "@wagmi/core";
import { config } from "@config/wagmi";
import {
  useWriteErc20Approve,
  useWritePaimaLaunchpadBuyItemsErc20,
  useWritePaimaLaunchpadBuyItemsNative,
} from "src/generated";
import { ZERO_ADDRESS } from "@utils/constants";
import useConnectWallet from "@hooks/useConnectWallet";
import { Address, erc20Abi } from "viem";
import { SnackbarMessage } from "@utils/texts";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import { QueryKeys } from "@utils/queryKeys";
import useDappStore from "src/store";

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
  const { connectedNetworkType } = useDappStore();

  const {
    data: buyItemsNativeHash,
    writeContract: writeBuyItemsNative,
    isPending: isPendingWriteBuyItemsNative,
  } = useWritePaimaLaunchpadBuyItemsNative({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });

  const {
    data: buyItemsErc20Hash,
    writeContract: writeBuyItemsErc20,
    isPending: isPendingWriteBuyItemsErc20,
  } = useWritePaimaLaunchpadBuyItemsErc20({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });

  const {
    data: approveErc20Hash,
    writeContract: writeApproveErc20,
    isPending: isPendingWriteApproveErc20,
  } = useWriteErc20Approve({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });

  const { isLoading: isLoadingBuyItems } = useWaitForTransactionReceipt({
    hash: buyItemsNativeHash || buyItemsErc20Hash,
    query: {
      meta: {
        successMessage: SnackbarMessage.Launchpad.PurchaseSuccess,
        invalidateQueries: [
          [QueryKeys.LaunchpadData, params.launchpadSlug, address],
        ],
      },
    },
  });

  const { isLoading: isLoadingApproveErc20, isSuccess: isSuccessApproveErc20 } =
    useWaitForTransactionReceipt({
      hash: approveErc20Hash,
      query: {
        meta: {
          successMessage: SnackbarMessage.Launchpad.ApprovalErc20Success,
        },
      },
    });

  useEffect(() => {
    if (isSuccessApproveErc20) {
      submitLaunchpadPurchase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessApproveErc20]);

  const sendLaunchpadTransactionEvm = useCallback(async () => {
    const { currency, value, referrer = ZERO_ADDRESS, orderItems } = params;
    if (!launchpadData) return;
    if (currency === ZERO_ADDRESS) {
      writeBuyItemsNative({
        address: launchpadData.address as Address,
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
        writeApproveErc20({
          address: currency as Address,
          args: [launchpadData.address as Address, value],
        });
      } else {
        writeBuyItemsErc20({
          address: launchpadData.address as Address,
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
    }
  }, [
    address,
    launchpadData,
    params,
    writeApproveErc20,
    writeBuyItemsErc20,
    writeBuyItemsNative,
  ]);

  const submitLaunchpadPurchase = useCallback(async () => {
    if (connectedNetworkType === "evm") {
      sendLaunchpadTransactionEvm();
    } else {
      // todo: implement cardano
    }
  }, [connectedNetworkType, sendLaunchpadTransactionEvm]);

  return {
    submitLaunchpadPurchase,
    isLoading: isLoadingBuyItems || isLoadingApproveErc20,
    isPending:
      isPendingWriteBuyItemsNative ||
      isPendingWriteBuyItemsErc20 ||
      isPendingWriteApproveErc20,
  };
}
