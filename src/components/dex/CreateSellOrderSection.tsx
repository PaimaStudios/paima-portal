import { Button, Stack, Typography } from "@mui/material";
import useGetSellableAssets from "../../hooks/dex/useGetSellableAssets";
import SellableAssetsGrid from "./SellableAssetsGrid";
import { Asset, AssetMetadata } from "@utils/dex/types";
import { useState } from "react";
import SellForm from "./SellForm";

type Props = {
  assetMetadata: AssetMetadata;
  advancedMode: boolean;
};

export default function CreateSellOrderSection({
  assetMetadata,
  advancedMode,
}: Props) {
  const { data: assets, isLoading, error } = useGetSellableAssets();
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!assets) {
    console.log(error);
    return <Typography>Error fetching sellable assets</Typography>;
  }

  const handleSelectAll = () => {
    setSelectedAssets(assets);
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          {advancedMode
            ? `Select which ${assetMetadata.symbol} you want to sell`
            : `Sell your ${assetMetadata.symbol}`}
        </Typography>
        {advancedMode && <Button onClick={handleSelectAll}>Select all</Button>}
      </Stack>
      {advancedMode && (
        <SellableAssetsGrid
          assets={assets}
          selectedAssets={selectedAssets}
          setSelectedAssets={setSelectedAssets}
        />
      )}
      <SellForm
        assetMetadata={assetMetadata}
        selectedAssets={selectedAssets}
        assets={assets}
        advancedMode={advancedMode}
      />
    </Stack>
  );
}
