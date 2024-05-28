import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Asset } from "@utils/dex/types";

type Props = {
  assets: Asset[];
  selectedAssets: Asset[];
  setSelectedAssets: (assets: Asset[]) => void;
};

export default function SellableAssetsGrid({
  assets,
  selectedAssets,
  setSelectedAssets,
}: Props) {
  const handleSelectChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: Asset[],
  ) => {
    setSelectedAssets(newSelection);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedAssets}
      onChange={handleSelectChange}
      aria-label="Assets to sell"
      sx={{ width: "100%" }}
    >
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {assets.map((asset) => (
          <Grid xs={6} md={4} lg={3} xl={2} key={asset.tokenId}>
            <ToggleButton
              value={asset}
              aria-label={`Token ID ${asset.tokenId}`}
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ padding: 2 }}>
                {asset.amount}
              </Typography>
              <Typography
                variant="caption"
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                ID {asset.tokenId}
              </Typography>
            </ToggleButton>
          </Grid>
        ))}
      </Grid>
    </ToggleButtonGroup>
  );
}
