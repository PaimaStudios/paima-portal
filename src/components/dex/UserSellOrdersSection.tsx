import { Stack, Typography } from "@mui/material";
import SellOrdersGrid from "./SellOrdersGrid";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { AssetMetadata } from "@utils/dex/types";
import TransactionButton from "@components/common/TransactionButton";
import { useWriteOrderbookDexCancelBatchSellOrder } from "src/generated";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";

type Props = {
  assetMetadata: AssetMetadata;
};

export default function UserSellOrdersSections({ assetMetadata }: Props) {
  const { address, chainId } = useAccount();
  const { data: orders } = useGetSellOrders({ user: address });

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
