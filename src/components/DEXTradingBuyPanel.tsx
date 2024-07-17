import { useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatEther, parseEther } from "viem";

import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import Checkbox from "./Checkbox";
import DEXInput from "./DEXInput";
import DEXSlippageInput from "./DEXSlippageInput";
import { InputErrorMessage } from "@utils/texts";
import { formatEth } from "@utils/evm/utils";
import FillOrderButton from "./dex/FillOrderButton";

const DEFAULT_SLIPPAGE_PERCENTAGE = 0.1;

const DEXTradingBuyPanel = () => {
  const [customSlippageVisible, setCustomSlippageVisible] = useState(false);
  const [slippagePercentage, setSlippagePercentage] = useState(
    DEFAULT_SLIPPAGE_PERCENTAGE,
  );
  const [amount, setAmount] = useState("");
  const [amountN, setAmountN] = useState(0);
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);
  const [useExactAsset, setUseExactAsset] = useState(true);
  const [ordersCount, setOrdersCount] = useState(0);

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: orders } = useGetSellOrders();
  const { data: assetMetadata } = useGetGameAssetMetadata();

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

  const handleAmountInputChange = (value: string) => {
    setAmount(value);

    const newValueN = Number(value);

    if (newValueN % 1 === 0) {
      setAmountN(newValueN);
      recalculatePrice(newValueN);
    }
  };

  const handlePriceInputChange = (value: string) => {
    setPrice(value);

    try {
      const newValueBN = parseEther(value);
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

  const getBuyAmountErrorMessage = () => {
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

  const getSellAmountErrorMessage = () => {
    if (price === "") {
      return InputErrorMessage.InputMustBeGreaterThanZero;
    }

    if (totalEthPayable != null && priceBN > totalEthPayable) {
      return InputErrorMessage.InputExceedsAvailableAmount;
    } else {
      if (balance != null && priceBN > balance.value) {
        return InputErrorMessage.InputExceedsBalance;
      } else {
        if (priceBN === 0n) {
          return InputErrorMessage.InputMustBeGreaterThanZero;
        }
      }
    }

    return undefined;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <DEXInput
          allowOnlyWholeNumbers
          label="Buy amount"
          errorMessage={getBuyAmountErrorMessage()}
          value={amount}
          onInputValueChange={(value) => handleAmountInputChange(value)}
          currencySymbol={assetMetadata ? assetMetadata.fromSym : "-"}
          additionalSubInformation={`Available: ${
            totalAssetAvailable ? totalAssetAvailable.toString() : "-"
          } ${assetMetadata ? assetMetadata.fromSym : "-"}`}
          additionalSubComponent={
            <div
              className="flex items-center justify-center py-1 px-3 uppercase text-gray-200 hover:text-white text-bodyS border border-gray-800 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out"
              onClick={() => {
                if (totalAssetAvailable == null) return;

                setAmount(totalAssetAvailable.toString());
                setAmountN(Number(totalAssetAvailable));
                recalculatePrice(Number(totalAssetAvailable));
              }}
            >
              Buy all
            </div>
          }
        />
        <DEXInput
          label={`Total ${assetMetadata ? assetMetadata.toSym : "-"} to pay`}
          errorMessage={getSellAmountErrorMessage()}
          value={price}
          onInputValueChange={(value) => handlePriceInputChange(value)}
          currencySymbol={assetMetadata ? assetMetadata.toSym : "-"}
          additionalSubInformation={
            balance &&
            totalEthPayable != null &&
            balance.value <= totalEthPayable
              ? `Wallet balance: ${balance ? formatEth(balance.value) : ""}`
              : undefined
          }
        />
      </div>
      <div className="flex flex-col gap-3 p-4 border border-brand rounded-xl">
        <div className="flex flex-col gap-3 border-b border-gray-600 pb-3">
          <div className="flex flex-col gap-1 text-white text-bodyM">
            {/* TODO: Replace with real values */}
            <p>Taker fee: 0.5%</p>
            <p>Fees paid: 0.0000000034 ETH</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-bodyM">Custom slippage</p>
            <Checkbox
              onCheckboxChecked={(checked) => {
                setCustomSlippageVisible(checked);
                setSlippagePercentage(DEFAULT_SLIPPAGE_PERCENTAGE);
              }}
            />
            {customSlippageVisible && (
              <DEXSlippageInput
                defaultValue={slippagePercentage}
                onInputValueChangeSettled={(value) =>
                  setSlippagePercentage(value)
                }
              />
            )}
          </div>
        </div>
        <p className="text-white text-bodyL font-medium whitespace-pre-line">
          {useExactAsset
            ? `You'll pay at most:\n${formatEther(maximumPayment!)} ${
                assetMetadata ? assetMetadata.toSym : "-"
              }`
            : `You'll receive at least:\n${minimumAsset?.toString()} ${
                assetMetadata ? assetMetadata.fromSym : "-"
              }`}
        </p>
      </div>
      {/* <button
        className={clsx(
          "flex items-center justify-center uppercase font-medium text-white text-heading4 px-6 py-3 rounded-xl w-full transition-colors duration-150 ease-in-out",
          isSubmitAllowed
            ? "bg-brand hover:cursor-pointer"
            : "bg-gray-800 hover:cursor-not-allowed",
        )}
      >
        Buy
      </button> */}
      {assetMetadata && orders && (
        <FillOrderButton
          dexAddress={assetMetadata.contractDex}
          useExactAsset={useExactAsset}
          assetAmount={useExactAsset ? BigInt(amountN) : minimumAsset!}
          ethAmount={useExactAsset ? maximumPayment! : priceBN}
          // todo: Currently the orders are chosen from the necessary orders plus 3 next orders. This is a naive solution and could use some improvements.
          orderIds={orders
            ?.slice(0, ordersCount + 3)
            .map((order) => BigInt(order.orderId))}
          disabled={
            !!getBuyAmountErrorMessage() || !!getSellAmountErrorMessage()
          }
          onSuccess={() => {
            setAmount("");
            setPrice("");
            setAmountN(0);
            setPriceBN(0n);
          }}
        />
      )}
    </>
  );
};

export default DEXTradingBuyPanel;
