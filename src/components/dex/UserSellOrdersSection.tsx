import { Stack, Typography } from "@mui/material";
import SellOrdersGrid from "./SellOrdersGrid";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { AssetMetadata } from "@utils/dex/types";
import TransactionButton from "@components/common/TransactionButton";
import { useWriteOrderbookDexCancelBatchSellOrder } from "src/generated";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";

type Props = {
  assetMetadata: AssetMetadata;
};

export default function UserSellOrdersSections({ assetMetadata }: Props) {
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const { data: orders } = useGetSellOrders({ user: address });

  const {
    writeContract,
    isPending,
    data: hash,
  } = useWriteOrderbookDexCancelBatchSellOrder({
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
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SellOrders, address],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SellableAssets],
      });
    }
  }, [isSuccess]);

  if (!orders) return <Typography>Loading...</Typography>;

  const handleCancelAllSellOrdersClick = () => {
    console.log(
      `Cancel batch sell orders ${orders.map((order) =>
        BigInt(order.orderid),
      )}`,
    );
    writeContract({
      address: assetMetadata.dexAddress[chainId!],
      args: [orders.map((order) => BigInt(order.orderid))],
    });
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography variant="h4">Your sell orders</Typography>
        <TransactionButton
          onClick={() => {
            handleCancelAllSellOrdersClick();
          }}
          actionText={"Cancel all"}
          isLoading={isLoading}
          isPending={isPending}
          sx={{ ml: 2 }}
        />
      </Stack>
      <SellOrdersGrid user={address} assetMetadata={assetMetadata} />
    </Stack>
  );
}
