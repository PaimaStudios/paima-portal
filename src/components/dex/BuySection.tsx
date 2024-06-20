import { Skeleton, Stack, Typography } from "@mui/material";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { formatEth } from "@utils/evm/utils";
import FillOrderButton from "./FillOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import InputWithClickableLimits from "./InputWithClickableLimits";
import { InputErrorMessage } from "@utils/texts";
import TransactionButton from "@components/common/TransactionButton";

type Props = {
  slippagePercentage: number;
};

export default function BuySection({ slippagePercentage }: Props) {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: orders } = useGetSellOrders();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [useExactAsset, setUseExactAsset] = useState(true);
  const [ordersCount, setOrdersCount] = useState(0);

  const totalAssetAvailable = useMemo(
    () => orders?.reduce((acc, order) => acc + BigInt(order.amount), 0n),
    [orders],
  );
  const totalEthPayable = useMemo(
    () =>
      orders?.reduce((acc, order) => {
        const purchaseCost = BigInt(order.amount) * BigInt(order.price);
        return (
          acc + purchaseCost + (purchaseCost * BigInt(order.takerFee)) / 10000n
        );
      }, 0n),
    [orders],
  );

  const recalculatePrice = (newAmount: number) => {
    if (!orders) return;
    let newPrice = 0n;
    let remainingAmount = newAmount;
    let newOrdersCount = 0;
    orders.forEach((order) => {
      if (remainingAmount === 0) return;
      const fillAmount = Math.min(remainingAmount, order.amount);
      const purchaseCost = BigInt(fillAmount) * BigInt(order.price);
      newPrice +=
        purchaseCost + (purchaseCost * BigInt(order.takerFee)) / 10000n;
      remainingAmount -= fillAmount;
      newOrdersCount++;
    });
    setOrdersCount(newOrdersCount);
    setPriceBN(newPrice);
    setPrice(formatEther(newPrice));
    setUseExactAsset(true);
  };

  const recalculateAmount = (newPrice: bigint) => {
    if (!orders) return;
    let newAmount = 0n;
    let remainingTotalPrice = newPrice;
    let newOrdersCount = 0;
    orders.forEach((order) => {
      if (remainingTotalPrice === 0n) return;
      const numerator = remainingTotalPrice * 10000n;
      const denominator = BigInt(order.takerFee) + 10000n;
      let purchaseCost = numerator / denominator;
      if (purchaseCost * denominator !== numerator) {
        purchaseCost += 1n;
      }
      let assetsToBuy = purchaseCost / BigInt(order.price);
      if (assetsToBuy === 0n) {
        return;
      }
      if (assetsToBuy > BigInt(order.amount)) {
        assetsToBuy = BigInt(order.amount);
        purchaseCost = assetsToBuy * BigInt(order.price);
      }
      newAmount += assetsToBuy;
      remainingTotalPrice -=
        purchaseCost + (purchaseCost * BigInt(order.takerFee)) / 10000n;
      newOrdersCount++;
    });
    setOrdersCount(newOrdersCount);
    setAmountN(Number(newAmount));
    setAmount(newAmount.toString());
    setUseExactAsset(false);
  };

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setAmount(event.target.value);

    const newValueN = Number(newValue);
    if (newValueN % 1 === 0) {
      setAmountN(newValueN);
      recalculatePrice(newValueN);
    }
  };

  const handlePriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setPrice(event.target.value);
    try {
      const newValueBN = parseEther(newValue);
      setPriceBN(newValueBN);
      recalculateAmount(newValueBN);
    } catch (e) {}
  };

  const minimumAsset = !useExactAsset
    ? BigInt(Math.floor(amountN - (amountN * slippagePercentage) / 100))
    : null;

  const maximumPayment = useExactAsset
    ? priceBN +
      (priceBN * parseEther((slippagePercentage / 100).toString())) /
        BigInt(1e18)
    : null;

  const amountInputError =
    totalAssetAvailable != null && amountN > totalAssetAvailable
      ? InputErrorMessage.InputExceedsAvailableAmount
      : amountN === 0
      ? InputErrorMessage.InputMustBeGreaterThanZero
      : null;

  const priceInputError =
    totalEthPayable != null && priceBN > totalEthPayable
      ? InputErrorMessage.InputExceedsAvailableAmount
      : balance != null && priceBN > balance.value
      ? InputErrorMessage.InputExceedsBalance
      : priceBN === 0n
      ? InputErrorMessage.InputMustBeGreaterThanZero
      : null;

  const showSkeletons = !(assetMetadata && orders);

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack sx={{ gap: 2, width: "100%", maxWidth: "500px" }}>
        {!showSkeletons ? (
          <InputWithClickableLimits
            value={amount}
            label={`Buy amount`}
            endAdornment={assetMetadata.fromSym}
            onChange={handleAmountInputChange}
            error={amount !== "" && !!amountInputError}
            helperText={amount === "" ? " " : amountInputError ?? " "}
            limits={[
              {
                label: "Available:",
                value: totalAssetAvailable?.toString(),
                onClick: () => {
                  if (totalAssetAvailable == null) return;
                  setAmount(totalAssetAvailable.toString());
                  setAmountN(Number(totalAssetAvailable));
                  recalculatePrice(Number(totalAssetAvailable));
                },
              },
            ]}
          />
        ) : (
          <Skeleton variant="rounded" height={56} />
        )}
        {!showSkeletons ? (
          <InputWithClickableLimits
            value={price}
            label={`Total ${assetMetadata.toSym} to pay`}
            endAdornment={assetMetadata.toSym}
            onChange={handlePriceInputChange}
            error={price !== "" && !!priceInputError}
            helperText={price === "" ? " " : priceInputError ?? " "}
            limits={[
              balance &&
              totalEthPayable != null &&
              balance.value <= totalEthPayable
                ? {
                    label: "Balance:",
                    value: balance ? formatEth(balance.value) : "",
                    onClick: () => {
                      if (balance == null) return;
                      setPrice(formatEther(balance.value));
                      setPriceBN(balance.value);
                      recalculateAmount(balance.value);
                    },
                  }
                : null,
              {
                label: "Available:",
                value:
                  totalEthPayable != null
                    ? formatEth(totalEthPayable)
                    : totalEthPayable,
                onClick: () => {
                  if (totalEthPayable == null) return;
                  setPrice(formatEther(totalEthPayable));
                  setPriceBN(totalEthPayable);
                  recalculateAmount(totalEthPayable);
                },
              },
            ]}
          />
        ) : (
          <Skeleton variant="rounded" height={56} sx={{ my: 3 }} />
        )}
      </Stack>
      {!showSkeletons ? (
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "end",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          {useExactAsset ? (
            <>
              <Typography variant="caption">You'll pay at most:</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {formatEther(maximumPayment!)} {assetMetadata.toSym}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="caption">
                You'll receive at least:
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {minimumAsset?.toString()} {assetMetadata.fromSym}
              </Typography>
            </>
          )}
        </Stack>
      ) : (
        <Typography>
          <Skeleton />
        </Typography>
      )}
      {!showSkeletons ? (
        <FillOrderButton
          dexAddress={assetMetadata.contractDex}
          useExactAsset={useExactAsset}
          assetAmount={useExactAsset ? BigInt(amountN) : minimumAsset!}
          ethAmount={useExactAsset ? maximumPayment! : priceBN}
          // todo: Currently the orders are chosen from the necessary orders plus 3 next orders. This is a naive solution and could use some improvements.
          orderIds={orders
            ?.slice(0, ordersCount + 3)
            .map((order) => BigInt(order.orderId))}
          disabled={!!priceInputError || !!amountInputError}
          onSuccess={() => {
            setAmount("");
            setPrice("");
            setAmountN(0);
            setPriceBN(0n);
          }}
        />
      ) : (
        <Skeleton variant="rounded">
          <TransactionButton actionText="Buy" />
        </Skeleton>
      )}
    </Stack>
  );
}
