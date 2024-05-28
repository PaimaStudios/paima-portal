import TransactionButton from "@components/common/TransactionButton";
import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment } from "react";
import { formatEther } from "viem";

type Props = {
  user?: `0x${string}`;
};

export default function SellOrdersGrid({ user }: Props) {
  const { data: orders } = useGetSellOrders({ user });

  if (!orders) return <Typography>Loading...</Typography>;

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", textAlign: "end", alignItems: "center" }}
    >
      <Grid xs={1}>
        <Typography>Order ID</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography>Asset Token ID</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography>Amount</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography>Price/unit</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography>Total</Typography>
      </Grid>
      <Grid xs={3}></Grid>
      <Divider />
      {orders.map((order) => (
        <Fragment key={order.orderid}>
          <Grid xs={1}>
            <Typography>{order.orderid}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>{order.assettokenid}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>{order.amount}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>{formatEther(BigInt(order.price))}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>
              {formatEther(BigInt(order.price) * BigInt(order.amount))}
            </Typography>
          </Grid>
          <Grid xs={3}>
            <TransactionButton
              actionText={"Cancel sell order"}
              isLoading={false}
              isPending={false}
              sx={{ ml: 2 }}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}
