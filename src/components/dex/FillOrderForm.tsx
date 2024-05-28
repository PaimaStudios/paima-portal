import { Input, Stack, Typography } from "@mui/material";
import { AssetMetadata } from "@utils/dex/types";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { formatEth } from "@utils/evm/utils";
import { bigIntMin } from "@utils/utils";
import FillOrderButton from "./FillOrderButton";

type Props = {
  assetMetadata: AssetMetadata;
};

export default function FillOrderForm({ assetMetadata }: Props) {
  const { address, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: orders, isLoading: isLoadingSellOrders } = useGetSellOrders({});
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [useExactAsset, setUseExactAsset] = useState(true);

  if (isLoadingSellOrders) return <Typography>Loading...</Typography>;

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

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("amount changed");
    const newValue = event.target.value;
    setAmount(event.target.value);

    const newValueN = Number(newValue);
    if (newValueN % 1 === 0) {
      setAmountN(newValueN);

      let newPrice = 0n;
      let remainingAmount = newValueN;
      orders.forEach((order) => {
        if (remainingAmount === 0) return;
        const fillAmount = Math.min(remainingAmount, order.amount);
        newPrice += BigInt(fillAmount) * BigInt(order.price);
        remainingAmount -= fillAmount;
      });
      setPriceBN(newPrice);
      setPrice(formatEther(newPrice));
      setUseExactAsset(true);
    }
  };

  const handlePriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("price changed");
    const newValue = event.target.value;
    setPrice(event.target.value);
    try {
      const newValueBN = parseEther(newValue);
      setPriceBN(newValueBN);

      let newAmount = 0n;
      let remainingTotalPrice = newValueBN;
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
    } catch (e) {}
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography>Amount of {assetMetadata.symbol} to buy:</Typography>
        <Input
          value={amount}
          onChange={handleAmountInputChange}
          endAdornment={assetMetadata.symbol}
        ></Input>
        <Typography variant="caption">
          Available: {totalAssetAvailable.toLocaleString()}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography>Total ETH to pay:</Typography>
        <Input
          value={price}
          onChange={handlePriceInputChange}
          endAdornment={"ETH"}
        ></Input>
        <Typography variant="caption">
          Balance: {balance ? formatEth(balance.value) : ""}
        </Typography>
        <Typography variant="caption">
          Available: {formatEth(totalEthPayable)}
        </Typography>
      </Stack>
      <FillOrderButton
        dexAddress={assetMetadata.dexAddress[chainId!]}
        useExactAsset={useExactAsset}
        assetAmount={BigInt(amountN)} // todo: subtract slippage if not useExactAsset
        ethAmount={priceBN} // todo: add slippage if useExactAsset
        orderIds={orders.map((order) => BigInt(order.orderid))}
      />
    </Stack>
  );
}
