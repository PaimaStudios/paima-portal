import TransactionButton from "@components/common/TransactionButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import { formatEth } from "@utils/evm/utils";
import { SnackbarMessage } from "@utils/texts";
import {
  useReadOrderbookDexBalances,
  useWriteOrderbookDexClaim,
} from "src/generated";
import { useAccount } from "wagmi";

export default function ClaimBalanceButton() {
  const { address } = useAccount();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: balanceInDex, queryKey: balanceQueryKey } =
    useReadOrderbookDexBalances({
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
  } = useWriteOrderbookDexClaim({
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
        successMessage: SnackbarMessage.Dex.BalanceClaimSuccess,
        invalidateQueries: [balanceQueryKey],
      },
    },
  });

  const handleClaimBalanceClick = () => {
    if (!assetMetadata) return;
    writeContract({
      address: assetMetadata.contractDex,
    });
  };

  return (
    <TransactionButton
      onClick={() => {
        handleClaimBalanceClick();
      }}
      actionText={`Claim ${formatEth(balanceInDex)} ${assetMetadata?.toSym}`}
      isLoading={isLoading}
      isPending={isPending}
    />
  );
}
