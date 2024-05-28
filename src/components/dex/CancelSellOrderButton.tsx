import TransactionButton from "@components/common/TransactionButton";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useWriteOrderbookDexCancelSellOrder } from "src/generated";
import { useWaitForTransactionReceipt } from "wagmi";

type Props = {
  dexAddress: `0x${string}`;
  orderId: number;
  user?: `0x${string}`;
};

export default function CancelSellOrderButton({
  dexAddress,
  orderId,
  user,
}: Props) {
  const queryClient = useQueryClient();
  const {
    writeContract,
    isPending,
    data: hash,
  } = useWriteOrderbookDexCancelSellOrder({
    mutation: {
      onSuccess: () => {
        enqueueSnackbar({
          message: SnackbarMessage.Common.TransactionSubmitted,
          variant: "info",
        });
      },
    },
  });
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar({
        message: SnackbarMessage.Dex.CancelOrderSuccess,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SellOrders, user] });
    }
  }, [isSuccess]);

  const handleCancelSellOrderClick = () => {
    console.log(`Cancel sell order ${orderId}`);
    writeContract({
      address: dexAddress,
      args: [BigInt(orderId)],
    });
  };

  return (
    <TransactionButton
      onClick={() => {
        handleCancelSellOrderClick();
      }}
      actionText={"Cancel sell order"}
      isLoading={isLoading}
      isPending={isPending}
      sx={{ ml: 2 }}
    />
  );
}
