import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { Divider, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment } from "react";
import { formatEther } from "viem";
import CancelSellOrderButton from "./CancelSellOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import TransactionButton from "@components/common/TransactionButton";

type Props = {
  user?: `0x${string}`;
};

export default function SellOrdersGrid({ user }: Props) {
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: orders } = useGetSellOrders({ user });

  if (orders && orders.length === 0) {
    return (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        You have no sell orders
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", textAlign: "end", alignItems: "center" }}
    >
      <Grid xs={1}>
        <Typography>Token</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography>Amount</Typography>
      </Grid>
      <Grid xs={3}>
        <Typography>Price/unit</Typography>
      </Grid>
      <Grid xs={3}>
        <Typography>Total</Typography>
      </Grid>
      <Grid xs={3}></Grid>
      <Divider />
      {orders && assetMetadata
        ? orders.map((order) => (
            <Fragment key={order.orderId}>
              <Grid xs={1}>
                <Typography>{order.tokenId}</Typography>
              </Grid>
              <Grid xs={2}>
                <Typography component={"span"}>{order.amount}</Typography>
                <Typography variant="caption">
                  {" "}
                  {assetMetadata.symbol}
                </Typography>
              </Grid>
              <Grid xs={3}>
                <Typography component={"span"}>
                  {formatEther(BigInt(order.price))}
                </Typography>
                <Typography variant="caption"> ETH</Typography>
              </Grid>
              <Grid xs={3}>
                <Typography component={"span"}>
                  {formatEther(BigInt(order.price) * BigInt(order.amount))}
                </Typography>
                <Typography variant="caption"> ETH</Typography>
              </Grid>
              <Grid xs={3}>
                <CancelSellOrderButton
                  orderId={order.orderId}
                  dexAddress={assetMetadata.dexAddress}
                />
              </Grid>
            </Fragment>
          ))
        : Array(3)
            .fill(undefined)
            .map((_, index) => (
              <Fragment key={index}>
                <Grid xs={1}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={2}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={3}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={3}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={3} sx={{ display: "grid" }}>
                  <Skeleton variant="rounded" sx={{ justifySelf: "end" }}>
                    <TransactionButton actionText={"Cancel sell order"} />
                  </Skeleton>
                </Grid>
              </Fragment>
            ))}
    </Grid>
  );
}
