import { Button, Stack, Typography } from "@mui/material";
import useGetSellableAssets from "../../hooks/dex/useGetSellableAssets";
import SellableAssetsGrid from "./SellableAssetsGrid";
import { Asset } from "@utils/dex/types";
import { useState } from "react";
import SellForm from "./SellForm";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";

type Props = {
  advancedMode: boolean;
};

export default function CreateSellOrderSection({ advancedMode }: Props) {
  const {
    data: assets,
    isLoading: isLoadingSellableAssets,
  } = useGetSellableAssets();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  if (isLoadingSellableAssets || !assetMetadata)
    return <Typography>Loading...</Typography>;

  if (!assets) {
    return <Typography>Error fetching sellable assets</Typography>;
  }

  const handleSelectAll = () => {
    setSelectedAssets(assets);
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 3, width: "100%" }}>
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
