import TransactionButton from "@components/common/TransactionButton";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import { useMediaQuery, useTheme } from "@mui/material";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import { useWriteOrderbookDexCancelSellOrder } from "src/generated";
import { useAccount } from "wagmi";

type Props = {
  dexAddress: `0x${string}`;
  orderId: number;
};

export default function CancelSellOrderButton({ dexAddress, orderId }: Props) {
  const { address } = useAccount();
  const theme = useTheme();
  const displayLongText = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    writeContract,
    isPending,
    data: hash,
  } = useWriteOrderbookDexCancelSellOrder({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
    query: {
      meta: {
        successMessage: SnackbarMessage.Dex.CancelOrderSuccess,
        invalidateQueries: [
          [QueryKeys.SellOrders, address],
          [QueryKeys.SellableAssets],
        ],
      },
    },
  });

  const handleCancelSellOrderClick = () => {
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
      actionText={displayLongText ? "Cancel sell order" : "Cancel"}
      isLoading={isLoading}
      isPending={isPending}
      sx={{ ml: 2 }}
    />
  );
}
