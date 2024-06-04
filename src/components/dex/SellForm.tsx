import TransactionButton from "@components/common/TransactionButton";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useWaitForTransactionReceipt from "@hooks/dex/useWaitForTransactionReceipt";
import { Divider, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { Asset, AssetMetadata } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { InputErrorMessage, SnackbarMessage } from "@utils/texts";
import { Fragment, useEffect, useState } from "react";
import {
  useReadInverseAppProjected1155IsApprovedForAll,
  useWriteInverseAppProjected1155SetApprovalForAll,
  useWriteOrderbookDexCreateBatchSellOrder,
  useWriteOrderbookDexCreateSellOrder,
} from "src/generated";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import InputWithClickableLimits from "./InputWithClickableLimits";
import { ZERO_ADDRESS } from "@utils/constants";
import useGetSellableAssets from "@hooks/dex/useGetSellableAssets";

type Props = {
  assetMetadata?: AssetMetadata;
  selectedAssets: Asset[];
  advancedMode: boolean;
};

export default function SellForm({
  assetMetadata,
  selectedAssets,
  advancedMode,
}: Props) {
  const queryClient = useQueryClient();
  const { data: orders } = useGetSellOrders();
  const { data: assets } = useGetSellableAssets();
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const { address } = useAccount();

  const { data: isApproved, queryKey: isApprovedQueryKey } =
    useReadInverseAppProjected1155IsApprovedForAll({
      address: assetMetadata?.contractAsset,
      args: [address!, assetMetadata?.contractDex ?? ZERO_ADDRESS],
      query: { enabled: address != null && assetMetadata != null },
    });
  const {
    data: approvalHash,
    writeContract: writeSetApproval,
    isPending: isPendingWriteSetApproval,
  } = useWriteInverseAppProjected1155SetApprovalForAll({
    mutation: {
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const {
    data: createSellOrderHash,
    writeContract: writeCreateSellOrder,
    isPending: isPendingWriteCreateSellOrder,
  } = useWriteOrderbookDexCreateSellOrder({
    mutation: {
      onSuccess: () => {
        setAmount("");
        setAmountN(0);
      },
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const {
    data: createBatchSellOrderHash,
    writeContract: writeCreateBatchSellOrder,
    isPending: isPendingWriteCreateBatchSellOrder,
  } = useWriteOrderbookDexCreateBatchSellOrder({
    mutation: {
      onSuccess: () => {
        setAmount("");
        setAmountN(0);
      },
      meta: {
        infoMessage: SnackbarMessage.Common.TransactionSubmitted,
      },
    },
  });
  const { isLoading: isLoadingApproval, isSuccess: isConfirmedApproval } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
      query: {
        meta: {
          successMessage: SnackbarMessage.Dex.ApprovalForCreateOrderSuccess,
        },
      },
    });
  const { isLoading: isLoadingCreateSellOrder } = useWaitForTransactionReceipt({
    hash: createSellOrderHash,
    query: {
      meta: {
        successMessage: SnackbarMessage.Dex.CreateOrderSuccess,
        invalidateQueries: [
          [QueryKeys.SellOrders, address],
          [QueryKeys.SellableAssets],
        ],
      },
    },
  });
  const { isLoading: isLoadingCreateBatchSellOrder } =
    useWaitForTransactionReceipt({
      hash: createBatchSellOrderHash,
      query: {
        meta: {
          successMessage: SnackbarMessage.Dex.CreateBatchOrderSuccess,
          invalidateQueries: [
            [QueryKeys.SellOrders, address],
            [QueryKeys.SellableAssets],
          ],
        },
      },
    });

  const handlePriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setPrice(event.target.value);
    try {
      setPriceBN(parseEther(newValue));
    } catch (e) {}
  };

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setAmount(event.target.value);

    if (Number(newValue) % 1 === 0) {
      setAmountN(Number(newValue));
    }
  };

  const handleCreateSellOrderButtonClick = () => {
    if (!isApproved) {
      approveAssetForDex();
    } else {
      createSellOrder();
    }
  };

  const approveAssetForDex = () => {
    if (!assetMetadata) return;
    writeSetApproval({
      address: assetMetadata.contractAsset,
      args: [assetMetadata.contractDex, true],
    });
  };

  const createSellOrder = () => {
    if (!assetMetadata || !assets) return;
    let assetsToSell = selectedAssets;
    if (!advancedMode) {
      assetsToSell = [];
      let remainingAmount = amountN;
      // Naive algorithm for choosing which assets to sell, does not optimize towards lowest amount of token ids
      for (const asset of assets.stats) {
        if (remainingAmount === 0) break;
        const amt = Math.min(remainingAmount, asset.amount);
        if (amt === 0) continue;
        assetsToSell.push({ tokenId: asset.tokenId, amount: amt });
        remainingAmount -= amt;
      }
    }
    if (assetsToSell.length === 0) {
      console.error("Zero selected assets");
      return;
    }
    if (assetsToSell.length === 1) {
      writeCreateSellOrder({
        address: assetMetadata.contractDex,
        args: [
          BigInt(assetsToSell[0].tokenId),
          BigInt(assetsToSell[0].amount),
          priceBN,
        ],
      });
    } else {
      writeCreateBatchSellOrder({
        address: assetMetadata.contractDex,
        args: [
          assetsToSell.map((a) => BigInt(a.tokenId)),
          assetsToSell.map((a) => BigInt(a.amount)),
          assetsToSell.map(() => priceBN),
        ],
      });
    }
  };

  useEffect(() => {
    if (isConfirmedApproval) {
      createSellOrder();
      queryClient.invalidateQueries({ queryKey: isApprovedQueryKey });
    }
  }, [isConfirmedApproval]);

  useEffect(() => {
    if (priceBN === 0n) {
      const floorPrice = orders?.[0]?.price;
      if (floorPrice) {
        setPrice(formatEther(BigInt(floorPrice)));
        setPriceBN(BigInt(floorPrice));
      }
    }
  }, [orders]);

  const totalAssetAvailable = assets?.stats.reduce(
    (acc, asset) => acc + BigInt(asset.amount),
    0n,
  );
  const total = selectedAssets.reduce(
    (acc, asset) => acc + BigInt(asset.amount) * priceBN,
    0n,
  );

  const amountInputError = advancedMode
    ? null
    : totalAssetAvailable != null && amountN > totalAssetAvailable
    ? InputErrorMessage.InputExceedsAvailableAmount
    : amountN === 0
    ? InputErrorMessage.InputMustBeGreaterThanZero
    : null;

  const priceInputError =
    priceBN === 0n ? InputErrorMessage.InputMustBeGreaterThanZero : null;

  const showSkeletons = !(assetMetadata && totalAssetAvailable != null);

  return (
    <Stack sx={{ gap: 3, width: "100%", alignItems: "center" }}>
      <Stack sx={{ width: "100%", maxWidth: "500px" }}>
        <Stack sx={{ gap: 2, width: "100%" }}>
          {!advancedMode &&
            (!showSkeletons ? (
              <InputWithClickableLimits
                value={amount}
                label={`Sell amount`}
                endAdornment={assetMetadata.fromSym}
                onChange={handleAmountInputChange}
                error={amount !== "" && !!amountInputError}
                helperText={amount === "" ? " " : amountInputError ?? " "}
                limits={[
                  {
                    label: "Available:",
                    value: totalAssetAvailable.toString(),
                    onClick: () => {
                      setAmount(totalAssetAvailable.toString());
                      setAmountN(Number(totalAssetAvailable));
                    },
                  },
                ]}
              />
            ) : (
              <Skeleton variant="rounded" height={56} />
            ))}
          {!showSkeletons ? (
            <InputWithClickableLimits
              value={price}
              label={`Price per 1 ${assetMetadata.fromSym}`}
              endAdornment={`${assetMetadata.toSym}`}
              onChange={handlePriceInputChange}
              error={price !== "" && !!priceInputError}
              helperText={priceInputError ?? " "}
            />
          ) : (
            <Skeleton variant="rounded" height={56} sx={{ my: 3 }} />
          )}
        </Stack>
        {!advancedMode &&
          (!showSkeletons ? (
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "end",
                gap: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography>Grand total:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {formatEther(priceBN * BigInt(amountN))} {assetMetadata.toSym}
              </Typography>
            </Stack>
          ) : (
            <Typography>
              <Skeleton />
            </Typography>
          ))}
      </Stack>
      {advancedMode && (
        <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
          <Typography variant="h5">Summary:</Typography>
          <Grid
            container
            sx={{
              textAlign: "end",
              width: "100%",
            }}
            spacing={1 / 2}
          >
            <Grid xs={2}>
              <Typography variant="body2">Token</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography variant="body2">Amount</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography variant="body2">Price/unit</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography variant="body2">Total</Typography>
            </Grid>
            {selectedAssets.map((asset) => (
              <Fragment key={asset.tokenId}>
                <Grid xs={2}>
                  <Typography>{asset.tokenId}</Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography>{asset.amount}</Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography>{formatEther(priceBN)}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>
                    {formatEther(priceBN * BigInt(asset.amount))}
                  </Typography>
                </Grid>
              </Fragment>
            ))}
            <Divider sx={{ width: "100%" }} />
            <Grid xs={8}>
              <Typography>Grand total</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography fontWeight={600}>{formatEther(total)}</Typography>
            </Grid>
          </Grid>
        </Stack>
      )}
      {!showSkeletons ? (
        <TransactionButton
          onClick={handleCreateSellOrderButtonClick}
          actionText={
            isApproved ? "Create sell order" : "Approve and create sell order"
          }
          isLoading={
            isLoadingApproval ||
            isLoadingCreateSellOrder ||
            isLoadingCreateBatchSellOrder
          }
          isPending={
            isPendingWriteSetApproval ||
            isPendingWriteCreateSellOrder ||
            isPendingWriteCreateBatchSellOrder
          }
          disabled={
            !!priceInputError ||
            !!amountInputError ||
            (advancedMode && selectedAssets.length === 0) ||
            (!advancedMode && (amount === "" || amountN === 0))
          }
        />
      ) : (
        <Skeleton variant="rounded">
          <TransactionButton actionText={"Create sell order"} />
        </Skeleton>
      )}
    </Stack>
  );
}
