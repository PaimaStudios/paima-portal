import { Skeleton, Stack, Typography } from "@mui/material";
import SellOrdersGrid from "./SellOrdersGrid";
import { useAccount } from "wagmi";
import TransactionButton from "@components/common/TransactionButton";
import {
  useReadOrderbookDexBalances,
  useWriteOrderbookDexCancelBatchSellOrder,
} from "src/generated";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import ClaimBalanceButton from "./ClaimBalanceButton";

export default function UserSellOrdersSections() {
  const { address } = useAccount();
  const { data: orders } = useGetSellOrders({
    user: address,
  });
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: balanceInDex } = useReadOrderbookDexBalances({
    address: assetMetadata?.contractDex,
    args: [address!],
    query: {
      enabled: !!address && !!assetMetadata,
    },
  });

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
      args: [
        assetMetadata.contractAsset,
        orders.map((order) => BigInt(order.orderId)),
      ],
    });
  };

  return (
    <IsConnectedWrapper hidden>
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
          <Stack
            sx={{
              flexDirection: "row",
              gap: 2,
            }}
          >
            {balanceInDex == null ? (
              <Skeleton variant="rounded">
                <TransactionButton actionText={"Claim balance"} />
              </Skeleton>
            ) : (
              balanceInDex !== 0n && <ClaimBalanceButton />
            )}
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
        </Stack>
        <SellOrdersGrid user={address} />
      </Stack>
    </IsConnectedWrapper>
  );
}
