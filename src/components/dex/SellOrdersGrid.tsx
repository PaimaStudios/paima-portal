import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AssetMetadata } from "@utils/dex/types";
import { Fragment } from "react";
import { formatEther } from "viem";
import CancelSellOrderButton from "./CancelSellOrderButton";

type Props = {
  assetMetadata: AssetMetadata;
  user?: `0x${string}`;
};

export default function SellOrdersGrid({ assetMetadata, user }: Props) {
  const { data: orders } = useGetSellOrders({ user });

  if (!orders) return <Typography>Loading...</Typography>;

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", textAlign: "end", alignItems: "center" }}
    >
      <Grid xs={1}>
        <Typography>Token ID</Typography>
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
      {orders.map((order) => (
        <Fragment key={order.orderId}>
          <Grid xs={1}>
            <Typography>{order.tokenId}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography component={"span"}>{order.amount}</Typography>
            <Typography variant="caption"> {assetMetadata.symbol}</Typography>
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
      ))}
    </Grid>
  );
}
