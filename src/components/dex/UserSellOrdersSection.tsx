import { Skeleton, Stack, Typography } from "@mui/material";
import SellOrdersGrid from "./SellOrdersGrid";
import { useAccount } from "wagmi";
import TransactionButton from "@components/common/TransactionButton";
import { useWriteOrderbookDexCancelBatchSellOrder } from "src/generated";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";

export default function UserSellOrdersSections() {
  const { address } = useAccount();
  const { data: orders } = useGetSellOrders({
    user: address,
  });
  const { data: assetMetadata } = useGetGameAssetMetadata();

  const {
    writeContract,
    isPending,
    data: hash,
  } = useWriteOrderbookDexCancelBatchSellOrder({
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

  const handleCancelAllSellOrdersClick = () => {
    if (!orders || !assetMetadata) return;
    writeContract({
      address: assetMetadata.contractDex,
      args: [orders.map((order) => BigInt(order.orderId))],
    });
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%", mt: 4 }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          p: 1,
          width: "100%",
        }}
      >
        <Typography variant="h4">Your sell orders</Typography>
        {orders && assetMetadata ? (
          orders.length > 0 && (
            <TransactionButton
              onClick={() => {
                handleCancelAllSellOrdersClick();
              }}
              actionText={"Cancel all"}
              isLoading={isLoading}
              isPending={isPending}
            />
          )
        ) : (
          <Skeleton variant="rounded">
            <TransactionButton actionText={"Cancel all"} />
          </Skeleton>
        )}
      </Stack>
      <SellOrdersGrid user={address} />
    </Stack>
  );
}
