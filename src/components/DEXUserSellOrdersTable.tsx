import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import DEXSellOrdersTable from "./DEXSellOrdersTable";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import {
  useReadOrderbookDexBalances,
  useWriteOrderbookDexCancelBatchSellOrder,
} from "src/generated";
import { SnackbarMessage } from "@utils/texts";
import { QueryKeys } from "@utils/queryKeys";
import TransactionButton from "./common/TransactionButton";
import ClaimBalanceButton from "./dex/ClaimBalanceButton";

const DEXUserSellOrdersTable = () => {
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-4">
        {balanceInDex == null ? (
          <div className="max-w-[250px]">
            <TransactionButton
              actionText={"Claim balance"}
              outlineVariant
              smallVariant
            />
          </div>
        ) : (
          balanceInDex !== 0n && (
            <div className="max-w-[250px]">
              <ClaimBalanceButton />
            </div>
          )
        )}
        {orders && assetMetadata ? (
          orders.length > 0 && (
            <div className="max-w-[250px]">
              <TransactionButton
                smallVariant
                outlineVariant
                onClick={() => {
                  handleCancelAllSellOrdersClick();
                }}
                actionText={"Cancel all"}
                isLoading={isLoading}
                isPending={isPending}
              />
            </div>
          )
        ) : (
          <div className="max-w-[250px]">
            <TransactionButton
              actionText={"Cancel all"}
              smallVariant
              outlineVariant
            />
          </div>
        )}
      </div>
      <DEXSellOrdersTable user={address} />
    </div>
  );
};

export default DEXUserSellOrdersTable;
