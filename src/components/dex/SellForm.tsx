import TransactionButton from "@components/common/TransactionButton";
import { Divider, Input, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { Asset, AssetMetadata } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { SnackbarMessage } from "@utils/texts";
import { Fragment, useEffect, useState } from "react";
import {
  useReadInverseAppProjected1155IsApprovedForAll,
  useWriteInverseAppProjected1155SetApprovalForAll,
  useWriteOrderbookDexCreateBatchSellOrder,
  useWriteOrderbookDexCreateSellOrder,
} from "src/generated";
import { formatEther, parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

type Props = {
  assetMetadata: AssetMetadata;
  selectedAssets: Asset[];
  assets: Asset[];
  advancedMode: boolean;
};

export default function SellForm({
  assetMetadata,
  selectedAssets,
  assets,
  advancedMode,
}: Props) {
  const queryClient = useQueryClient();
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const { chainId, address } = useAccount();

  const { data: isApproved, queryKey: isApprovedQueryKey } =
    useReadInverseAppProjected1155IsApprovedForAll({
      address: assetMetadata.address[chainId!],
      args: [address!, assetMetadata.dexAddress[chainId!]],
      query: { enabled: chainId != null && address != null },
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
    writeSetApproval({
      address: assetMetadata.address[chainId!],
      args: [assetMetadata.dexAddress[chainId!], true],
    });
  };

  const createSellOrder = () => {
    let assetsToSell = selectedAssets;
    if (!advancedMode) {
      assetsToSell = [];
      let remainingAmount = amountN;
      // Naive algorithm for choosing which assets to sell, does not optimize towards lowest amount of token ids
      for (const asset of assets) {
        if (remainingAmount === 0) break;
        const amt = Math.min(remainingAmount, asset.amount);
        if (amt === 0) continue;
        assetsToSell.push({ tokenId: asset.tokenId, amount: amt });
        remainingAmount -= amt;
      }
    }
    console.log("assetsToSell", assetsToSell);
    if (assetsToSell.length === 0) {
      console.error("Zero selected assets");
      return;
    }
    if (assetsToSell.length === 1) {
      writeCreateSellOrder({
        address: assetMetadata.dexAddress[chainId!],
        args: [
          BigInt(assetsToSell[0].tokenId),
          BigInt(assetsToSell[0].amount),
          priceBN,
        ],
      });
    } else {
      writeCreateBatchSellOrder({
        address: assetMetadata.dexAddress[chainId!],
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

  const total = selectedAssets.reduce(
    (acc, asset) => acc + BigInt(asset.amount) * priceBN,
    0n,
  );

  return (
    <Stack sx={{ gap: 3, width: "100%", alignItems: "center" }}>
      {!advancedMode && (
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>Amount of {assetMetadata.symbol} to sell:</Typography>
          <Input
            value={amount}
            onChange={handleAmountInputChange}
            endAdornment={assetMetadata.symbol}
          ></Input>
        </Stack>
      )}
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography>Set price per 1 {assetMetadata.symbol}:</Typography>
        <Input
          value={price}
          onChange={handlePriceInputChange}
          endAdornment="ETH"
        ></Input>
      </Stack>
      {!advancedMode && (
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>Grand total:</Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {formatEther(priceBN * BigInt(amountN))} ETH
          </Typography>
        </Stack>
      )}
      {advancedMode && (
        <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
          <Typography variant="h5">Summary:</Typography>
          <Grid
            container
            sx={{
              textAlign: "end",
              width: "100%",
              maxWidth: { xs: "100%", md: "50%" },
            }}
            spacing={1 / 2}
          >
            <Grid xs={2}>
              <Typography>Token ID</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography>Amount</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography>Price/unit</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Total</Typography>
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
          price === "" ||
          priceBN === 0n ||
          (advancedMode && selectedAssets.length === 0) ||
          (!advancedMode && (amount === "" || amountN === 0))
        }
      />
    </Stack>
  );
}
