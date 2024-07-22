import React from "react";
import clsx from "clsx";
import { formatNumberWithSubscriptZeros } from "@haqq/format-number-with-subscript-zeros";

import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import CancelSellOrderButton from "./dex/CancelSellOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import {
  formatEth,
  formatUnitsWithoutStrippingTrailingZeros,
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
      "py-1 text-white uppercase flex items-center",
      centering === "left" && "justify-start",
      centering === "center" && "justify-center",
      centering === "right" && "justify-end",
      smallText ? "text-bodyM" : "text-bodyL",
      limitedWidth && "max-w-[180px]",
    )}
  >
    {customComponent ? (
      customComponent
    ) : (
      <>
        {value}&nbsp;<span className="text-gray-400">{unit}</span>
      </>
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

  return (
    <div>
      <div
        className={clsx(
          "grid py-2",
          user ? "grid-cols-[1fr_1fr_1fr_180px]" : "grid-cols-3",
        )}
      >
        <Cell smallText value="Amount" centering="left" />
        <Cell smallText value="Price per unit" centering="center" />
        <Cell smallText value="Total" centering={user ? "center" : "right"} />
        {user && <Cell smallText value="" limitedWidth />}
      </div>
      {orders &&
        assetMetadata &&
        orders.map((order) => (
          <div
            className={clsx(
              "grid border-b border-gray-800 has-[:hover]:border-brand",
              user ? "grid-cols-[1fr_1fr_1fr_180px]" : "grid-cols-3",
            )}
            key={order.orderId}
          >
            <Cell value={order.amount} unit={assetMetadata.fromSym} />
            {/* TODO: Pad values so they're more readable */}
            <Cell
              value={formatNumberWithSubscriptZeros(
                formatUnitsWithoutStrippingTrailingZeros(
                  BigInt(order.price),
                  18,
                ),
              )}
              unit={assetMetadata.toSym}
              centering="center"
            />
            <Cell
              value={formatEth(BigInt(order.price) * BigInt(order.amount))}
              unit={assetMetadata.toSym}
              centering={user ? "center" : "right"}
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
