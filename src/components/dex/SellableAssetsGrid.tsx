import {
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Asset } from "@utils/dex/types";

type Props = {
  assets?: Asset[];
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
      sx={{ width: "100%", justifyContent: "center" }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", overflowY: "auto", maxHeight: 100 }}
      >
        {assets
          ? assets.map((asset) => (
              <Grid xs={6} lg={4} key={asset.tokenId}>
                <ToggleButton
                  value={asset}
                  aria-label={`Token ID ${asset.tokenId}`}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="h5" sx={{ px: 2 }}>
                    {asset.amount}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ position: "absolute", top: 2, right: 4 }}
                  >
                    ID {asset.tokenId}
                  </Typography>
                </ToggleButton>
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid xs={6} lg={4} key={id}>
                <Skeleton variant="rounded" height={56} />
              </Grid>
            ))}
      </Grid>
    </ToggleButtonGroup>
  );
}
