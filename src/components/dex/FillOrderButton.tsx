import TransactionButton from "@components/common/TransactionButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import { ButtonProps } from "@mui/material";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import { useEffect } from "react";
import {
  useWriteOrderbookDexFillOrdersExactAsset,
  useWriteOrderbookDexFillOrdersExactEth,
} from "src/generated";

type Props = {
  dexAddress: `0x${string}`;
  useExactAsset: boolean;
  assetAmount: bigint;
  ethAmount: bigint;
  orderIds: bigint[];
  onSuccess: () => void;
} & ButtonProps;

export default function FillOrderButton({
  dexAddress,
  useExactAsset,
  assetAmount,
  ethAmount,
  orderIds,
  onSuccess,
  ...props
}: Props) {
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const {
    writeContract: writeFillExactAsset,
    isPending: isPendingExactAsset,
    data: hashExactAsset,
  } = useWriteOrderbookDexFillOrdersExactAsset({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const {
    writeContract: writeFillExactEth,
    isPending: isPendingExactEth,
    data: hashExactEth,
  } = useWriteOrderbookDexFillOrdersExactEth({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: hashExactAsset || hashExactEth,
    query: {
      meta: {
        successMessage: SnackbarMessage.Dex.FillOrderSuccess,
        invalidateQueries: [[QueryKeys.SellOrders], [QueryKeys.SellableAssets]],
      },
    },
  });

  const handleBuyButtonClick = () => {
    if (!assetMetadata) return;
    console.log("orderIds", orderIds);
    if (useExactAsset) {
      writeFillExactAsset({
        address: dexAddress,
        args: [assetMetadata.contractAsset, assetAmount, orderIds],
        value: ethAmount,
      });
    } else {
      writeFillExactEth({
        address: dexAddress,
        args: [assetMetadata.contractAsset, assetAmount, orderIds],
        value: ethAmount,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  return (
    <TransactionButton
      onClick={() => {
        handleBuyButtonClick();
      }}
      actionText={"Buy"}
      isLoading={isLoading}
      isPending={isPendingExactAsset || isPendingExactEth}
      {...props}
    />
  );
}
