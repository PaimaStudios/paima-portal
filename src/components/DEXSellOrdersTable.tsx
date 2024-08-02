import React from "react";
import clsx from "clsx";

import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import CancelSellOrderButton from "./dex/CancelSellOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import {
  formatEth,
  formatUnitsWithoutStrippingTrailingZeros,
  formatUnitsWithStrippingTrailingZeros,
  rightPadAndFormatBigInt,
} from "@utils/evm/utils";

const Cell = ({
  value,
  unit,
  centering = "left",
  customComponent,
  smallText = false,
  limitedWidth = false,
}: {
  value?: string | number;
  unit?: string;
  centering?: "left" | "center" | "right";
  customComponent?: React.ReactNode;
  smallText?: boolean;
  limitedWidth?: boolean;
}) => (
  <div
    className={clsx(
      "py-[2px] my-[2px] text-white uppercase flex items-center border-r border-gray-800 px-4 laptop:px-6",
      centering === "left" && "justify-start",
      centering === "center" && "justify-center",
      centering === "right" && "justify-end",
      smallText ? "text-bodyM" : "text-bodyL",
      limitedWidth && "max-w-[200px]",
    )}
  >
    {customComponent ? (
      customComponent
    ) : (
      <div className="flex items-center justify-between w-full font-monospace">
        {value}&nbsp;<span className="text-gray-400">{unit}</span>
      </div>
    )}
  </div>
);

type DEXSellOrdersTableProps = {
  user?: `0x${string}`;
};

export default function DEXSellOrdersTable({ user }: DEXSellOrdersTableProps) {
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: orders } = useGetSellOrders({ user });

  if (orders && orders.length === 0) {
    return (
      <p className="text-bodyM text-gray-400">
        No sell orders to show at this time
      </p>
    );
  }

  // counts how many zeros are at the end of the value and returns the minimum so we can pad the values without cutting off the non-zero decimals
  const getMinNumberOfZerosFromEndOfValue = (values: string[]) => {
    return values.reduce((min, value, index) => {
      const zeros = value.split("").reverse().join("").search(/[^0]/);
      return index === 0 ? zeros : zeros < min ? zeros : min;
    }, 0);
  };

  const getMaxNumberOfDecimals = (values: string[]) => {
    return values.reduce((max, value, index) => {
      const decimals = value.split(".")[1]?.length || 0;
      return index === 0 ? decimals : decimals > max ? decimals : max;
    }, 0);
  };

  const pricePerUnitMinZeros = getMinNumberOfZerosFromEndOfValue(
    orders
      ? orders.map((order) =>
          formatUnitsWithoutStrippingTrailingZeros(BigInt(order.price), 18),
        )
      : [],
  );

  const totalMaxDecimals = getMaxNumberOfDecimals(
    orders
      ? orders.map((order) =>
          formatEth(BigInt(order.price) * BigInt(order.amount)),
        )
      : [],
  );

  return (
    <div>
      <div
        className={clsx(
          "grid py-2",
          user ? "grid-cols-[1fr_1fr_1fr_200px]" : "grid-cols-3",
        )}
      >
        <Cell smallText value="Amount" />
        <Cell smallText value="Price per unit" />
        <Cell smallText value="Total" />
        {user && <Cell smallText value="" limitedWidth />}
      </div>
      {orders &&
        assetMetadata &&
        orders.map((order) => (
          <div
            className={clsx(
              "grid border-b border-gray-800 has-[:hover]:border-brand",
              user ? "grid-cols-[1fr_1fr_1fr_200px]" : "grid-cols-3",
            )}
            key={order.orderId}
          >
            <Cell value={order.amount} unit={assetMetadata.fromSym} />
            <Cell
              value={formatUnitsWithStrippingTrailingZeros(
                BigInt(order.price),
                18,
                pricePerUnitMinZeros,
              )}
              unit={assetMetadata.toSym}
            />
            <Cell
              value={rightPadAndFormatBigInt(
                BigInt(order.price) * BigInt(order.amount),
                totalMaxDecimals,
              )}
              unit={assetMetadata.toSym}
            />
            {user && (
              <Cell
                limitedWidth
                customComponent={
                  <CancelSellOrderButton
                    orderId={order.orderId}
                    dexAddress={assetMetadata.contractDex}
                  />
                }
              />
            )}
          </div>
        ))}
    </div>
  );
}
