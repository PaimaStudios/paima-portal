import { Stack, Typography } from "@mui/material";
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
  const { data: orders, isLoading: isLoadingSellOrders } = useGetSellOrders({
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

  if (isLoadingSellOrders || !assetMetadata)
    return <Typography>Loading...</Typography>;

  if (!orders) {
    return <Typography>Error fetching sell orders</Typography>;
  }

  const handleCancelAllSellOrdersClick = () => {
    console.log(
      `Cancel batch sell orders ${orders.map((order) =>
        BigInt(order.orderid),
      )}`,
    );
    writeContract({
      address: assetMetadata.dexAddress,
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
