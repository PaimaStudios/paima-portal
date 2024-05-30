import { Input, Stack, Typography } from "@mui/material";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { formatEth } from "@utils/evm/utils";
import { bigIntMin } from "@utils/utils";
import FillOrderButton from "./FillOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import InputWithClickableLimits from "./InputWithClickableLimits";
import { InputErrorMessage } from "@utils/texts";

export default function BuySection() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: orders, isLoading: isLoadingSellOrders } = useGetSellOrders();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [useExactAsset, setUseExactAsset] = useState(true);

  if (isLoadingSellOrders || !assetMetadata)
    return <Typography>Loading...</Typography>;

  if (!orders) {
    return <Typography>Error fetching sell orders</Typography>;
  }

  const totalAssetAvailable = orders.reduce(
    (acc, order) => acc + BigInt(order.amount),
    0n,
  );
  const totalEthPayable = orders.reduce(
    (acc, order) => acc + BigInt(order.amount) * BigInt(order.price),
    0n,
  );

  const recalculatePrice = (newAmount: number) => {
    let newPrice = 0n;
    let remainingAmount = newAmount;
    orders.forEach((order) => {
      if (remainingAmount === 0) return;
      const fillAmount = Math.min(remainingAmount, order.amount);
      newPrice += BigInt(fillAmount) * BigInt(order.price);
      remainingAmount -= fillAmount;
    });
    setPriceBN(newPrice);
    setPrice(formatEther(newPrice));
    setUseExactAsset(true);
  };

  const recalculateAmount = (newPrice: bigint) => {
    let newAmount = 0n;
    let remainingTotalPrice = newPrice;
    orders.forEach((order) => {
      if (remainingTotalPrice === 0n) return;
      const fillPrice = bigIntMin(
        remainingTotalPrice,
        BigInt(order.amount) * BigInt(order.price),
      );
      const fillAmount = fillPrice / BigInt(order.price);
      newAmount += fillAmount;
      remainingTotalPrice -= fillPrice;
    });
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

  const amountInputError =
    amountN > totalAssetAvailable
      ? InputErrorMessage.InputExceedsAvailableAmount
      : amountN === 0
      ? InputErrorMessage.InputMustBeGreaterThanZero
      : null;

  const priceInputError =
    priceBN > totalEthPayable
      ? InputErrorMessage.InputExceedsAvailableAmount
      : balance != null && priceBN > balance.value
      ? InputErrorMessage.InputExceedsBalance
      : priceBN === 0n
      ? InputErrorMessage.InputMustBeGreaterThanZero
      : null;

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack sx={{ gap: 2, width: "100%", maxWidth: "500px" }}>
        <InputWithClickableLimits
          value={amount}
          label={`Buy amount`}
          endAdornment={assetMetadata.symbol}
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
                recalculatePrice(Number(totalAssetAvailable));
              },
            },
          ]}
        />
        <InputWithClickableLimits
          value={price}
          label={`Total ETH to pay`}
          endAdornment={"ETH"}
          onChange={handlePriceInputChange}
          error={price !== "" && !!priceInputError}
          helperText={price === "" ? " " : priceInputError ?? " "}
          limits={[
            balance && balance.value <= totalEthPayable
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
              value: formatEth(totalEthPayable),
              onClick: () => {
                setPrice(formatEther(totalEthPayable));
                setPriceBN(totalEthPayable);
                recalculateAmount(totalEthPayable);
              },
            },
          ]}
        />
      </Stack>
      <FillOrderButton
        dexAddress={assetMetadata.dexAddress}
        useExactAsset={useExactAsset}
        assetAmount={BigInt(amountN)} // todo: subtract slippage if not useExactAsset
        ethAmount={priceBN} // todo: add slippage if useExactAsset
        orderIds={orders.map((order) => BigInt(order.orderId))}
        disabled={!!priceInputError || !!amountInputError}
      />
    </Stack>
  );
}
