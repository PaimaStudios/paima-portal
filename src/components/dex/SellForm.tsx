import { Button, Divider, Input, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Asset, AssetMetadata } from "@utils/dex/types";
import { Fragment, useState } from "react";
import { formatEther, parseEther } from "viem";

type Props = {
  assetMetadata: AssetMetadata;
  selectedAssets: Asset[];
};

export default function SellForm({ assetMetadata, selectedAssets }: Props) {
  const [price, setPrice] = useState("");
  const [priceBN, setPriceBN] = useState(0n);

  const handlePriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setPrice(event.target.value);
    try {
      setPriceBN(parseEther(newValue));
    } catch (e) {}
  };

  const total = selectedAssets.reduce(
    (acc, asset) => acc + BigInt(asset.amount) * priceBN,
    0n,
  );

  return (
    <Stack sx={{ gap: 3, width: "100%", alignItems: "center" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography>Set price per 1 {assetMetadata.symbol}:</Typography>
        <Input
          value={price}
          onChange={handlePriceInputChange}
          endAdornment="ETH"
        ></Input>
      </Stack>
      <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
        <Typography variant="h5">Summary:</Typography>
        <Grid
          container
          sx={{
            textAlign: "end",
            width: "100%",
            maxWidth: { xs: "100%", md: "50%" },
          }}
          spacing={1 / 2}
        >
          <Grid xs={2}>
            <Typography>Token ID</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography>Amount</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography>Price/unit</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>Total</Typography>
          </Grid>
          {selectedAssets.map((asset) => (
            <Fragment key={asset.tokenId}>
              <Grid xs={2}>
                <Typography>{asset.tokenId}</Typography>
              </Grid>
              <Grid xs={3}>
                <Typography>{asset.amount}</Typography>
              </Grid>
              <Grid xs={3}>
                <Typography>{formatEther(priceBN)}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography>
                  {formatEther(priceBN * BigInt(asset.amount))}
                </Typography>
              </Grid>
            </Fragment>
          ))}
          <Divider sx={{ width: "100%" }} />
          <Grid xs={8}>
            <Typography>Grand total</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{formatEther(total)}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Button variant="contained">Create sell order</Button>
    </Stack>
  );
}
