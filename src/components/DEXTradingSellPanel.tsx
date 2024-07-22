import clsx from "clsx";

import DEXInput from "./DEXInput";
import { useQueryClient } from "@tanstack/react-query";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useGetSellableAssets from "@hooks/dex/useGetSellableAssets";
import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import useGetOrderCreationFee from "@hooks/dex/useGetOrderCreationFee";
import {
  useReadInverseAppProjected1155IsApprovedForAll,
  useWriteInverseAppProjected1155SetApprovalForAll,
  useWriteOrderbookDexCreateBatchSellOrder,
  useWriteOrderbookDexCreateSellOrder,
} from "src/generated";
import { ZERO_ADDRESS } from "@utils/constants";
import { InputErrorMessage, SnackbarMessage } from "@utils/texts";
import { QueryKeys } from "@utils/queryKeys";
import { formatEther, parseEther } from "viem";
import { Asset } from "@utils/dex/types";
import TransactionButton from "./common/TransactionButton";

const DEXTradingSellPanel = () => {
  const selectedAssets: Asset[] = [];

  // used to track how many times the user has submitted the form, used to repaint the inputs so they don't show errors
  const [submitIndex, setSubmitIndex] = useState<number>(0);

  const queryClient = useQueryClient();
  const { data: orders } = useGetSellOrders();
  const { data: assets } = useGetSellableAssets();
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const { address } = useAccount();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: orderCreationFee } = useGetOrderCreationFee();

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
      onError: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.SellableAssets],
        });
      },
      onSuccess: () => {
        setAmount("");
        setAmountN(0);
        setSubmitIndex((prev) => prev + 1);
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
      onError: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.SellableAssets],
        });
      },
      onSuccess: () => {
        setAmount("");
        setAmountN(0);
        setSubmitIndex((prev) => prev + 1);
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

  const handlePriceInputChange = (value: string) => {
    setPrice(value);

    try {
      setPriceBN(parseEther(value));
    } catch (e) {}
  };

  const handleAmountInputChange = (value: string) => {
    setAmount(value);

    if (Number(value) % 1 === 0) {
      setAmountN(Number(value));
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
    if (!assetMetadata || !assets || !orderCreationFee) return;
    let assetsToSell = [];
    let remainingAmount = amountN;
    // Naive algorithm for choosing which assets to sell, does not optimize towards lowest amount of token ids
    for (const asset of assets.stats) {
      if (remainingAmount === 0) break;
      const amt = Math.min(remainingAmount, asset.amount);
      if (amt === 0) continue;
      assetsToSell.push({ tokenId: asset.tokenId, amount: amt });
      remainingAmount -= amt;
    }

    if (assetsToSell.length === 0) {
      console.error("Zero selected assets");
      return;
    }
    if (assetsToSell.length === 1) {
      writeCreateSellOrder({
        address: assetMetadata.contractDex,
        args: [
          assetMetadata.contractAsset,
          BigInt(assetsToSell[0].tokenId),
          BigInt(assetsToSell[0].amount),
          priceBN,
        ],
        value: orderCreationFee,
      });
    } else {
      writeCreateBatchSellOrder({
        address: assetMetadata.contractDex,
        args: [
          assetMetadata.contractAsset,
          assetsToSell.map((a) => BigInt(a.tokenId)),
          assetsToSell.map((a) => BigInt(a.amount)),
          assetsToSell.map(() => priceBN),
        ],
        value: orderCreationFee * BigInt(assetsToSell.length),
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

  const amountInputError =
    totalAssetAvailable != null && amountN > totalAssetAvailable
      ? InputErrorMessage.InputExceedsAvailableAmount
      : amountN === 0
      ? InputErrorMessage.InputMustBeGreaterThanZero
      : null;

  const priceInputError =
    priceBN === 0n ? InputErrorMessage.InputMustBeGreaterThanZero : null;

  const showSkeletons = !(
    assetMetadata &&
    totalAssetAvailable != null &&
    orderCreationFee != null
  );

  const getSellAmountErrorMessage = () => {
    if (amount === "") {
      return InputErrorMessage.InputMustBeGreaterThanZero;
    }

    if (totalAssetAvailable != null && amountN > totalAssetAvailable) {
      return InputErrorMessage.InputExceedsAvailableAmount;
    } else {
      if (amountN === 0) {
        return InputErrorMessage.InputMustBeGreaterThanZero;
      }
    }
    return undefined;
  };

  const getPriceErrorMessage = () => {
    if (price === "" || priceBN === 0n) {
      return InputErrorMessage.InputMustBeGreaterThanZero;
    }

    return undefined;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <DEXInput
          key={`sell_amount_${submitIndex}`}
          allowOnlyWholeNumbers
          label="Sell amount"
          placeholder="Enter amount to sell"
          errorMessage={getSellAmountErrorMessage()}
          value={amount}
          onInputValueChange={(value) => handleAmountInputChange(value)}
          currencySymbol={assetMetadata ? assetMetadata.fromSym : "-"}
          additionalSubInformation={`Available: ${
            totalAssetAvailable ? totalAssetAvailable.toString() : "0"
          } ${assetMetadata ? assetMetadata.fromSym : "-"}`}
          additionalSubComponent={
            <div
              className="flex items-center justify-center py-1 px-3 uppercase text-gray-200 hover:text-white text-bodyS border border-gray-800 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out"
              onClick={() => {
                if (totalAssetAvailable == null) return;

                setAmount(totalAssetAvailable.toString());
                setAmountN(Number(totalAssetAvailable));
              }}
            >
              Sell all
            </div>
          }
        />
        <DEXInput
          key={`sell_price_${submitIndex}`}
          label={`Price per 1 ${assetMetadata ? assetMetadata.fromSym : "-"}`}
          errorMessage={getPriceErrorMessage()}
          placeholder="Enter amount to receive per TGOLD"
          value={price}
          onInputValueChange={(value) => handlePriceInputChange(value)}
          currencySymbol={assetMetadata ? assetMetadata.toSym : "-"}
        />
      </div>
      <div className="flex flex-col gap-3 p-4 border border-brand rounded-xl">
        {/* TODO: Unhide and resolve todo below */}
        <div className="hidden">
          <div className="flex flex-col gap-3 border-b border-gray-600 pb-3">
            <div className="flex flex-col gap-1 text-white text-bodyM">
              {/* TODO: Replace with real values */}
              <p>Maker fee: 0.5%</p>
              <p>Fees paid: 0.0000000034 ETH</p>
            </div>
          </div>
        </div>
        <p className="text-white text-bodyL font-medium">
          Grand Total: {formatEther(priceBN * BigInt(amountN))}{" "}
          {assetMetadata ? assetMetadata.toSym : "-"}
        </p>
      </div>
      {/* <button
        className={clsx(
          "flex items-center justify-center uppercase font-medium text-white text-heading4 px-6 py-3 rounded-xl w-full transition-colors duration-150 ease-in-out",
          true
            ? "bg-brand hover:cursor-pointer"
            : "bg-gray-800 hover:cursor-not-allowed",
        )}
      >
        Create Sell Order
      </button> */}
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
          amount === "" ||
          amountN === 0
        }
      />
    </>
  );
};

export default DEXTradingSellPanel;
