import { Divider, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";
import clsx from "clsx";
import { formatNumberWithSubscriptZeros } from "@haqq/format-number-with-subscript-zeros";

import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import CancelSellOrderButton from "./dex/CancelSellOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import TransactionButton from "@components/common/TransactionButton";
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
}: {
  value?: string | number;
  unit?: string;
  centering?: "left" | "center" | "right";
  customComponent?: React.ReactNode;
  smallText?: boolean;
}) => (
  <div
    className={clsx(
      "py-3 text-white uppercase",
      centering === "left" && "text-left",
      centering === "center" && "text-center",
      centering === "right" && "text-right",
      smallText ? "text-bodyM" : "text-bodyL",
    )}
  >
    {customComponent ? (
      customComponent
    ) : (
      <>
        {value} <span className="text-gray-400">{unit}</span>
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
      <div className={clsx("grid", user ? "grid-cols-4" : "grid-cols-3")}>
        <Cell smallText value="Amount" centering="left" />
        <Cell smallText value="Price per unit" centering="center" />
        <Cell smallText value="Total" centering={user ? "center" : "right"} />
        {user && <Cell smallText value="" />}
      </div>
      {orders &&
        assetMetadata &&
        orders.map((order) => (
          <div
            className={clsx(
              "grid border-b border-gray-800 has-[:hover]:border-brand",
              user ? "grid-cols-4" : "grid-cols-3",
            )}
            key={order.orderId}
          >
            <Cell value={order.amount} unit={assetMetadata.fromSym} />
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
                customComponent={
                  <TransactionButton actionText={"Cancel sell order"} />
                }
              />
            )}
          </div>
        ))}
    </div>
  );
}
