import { Button, Stack, Typography } from "@mui/material";
import useGetSellableAssets from "../../hooks/dex/useGetSellableAssets";
import SellableAssetsGrid from "./SellableAssetsGrid";
import { Asset, AssetMetadata } from "@utils/dex/types";
import { useState } from "react";
import SellForm from "./SellForm";
import { useAccount } from "wagmi";
import SellOrdersGrid from "./SellOrdersGrid";

type Props = {
  assetMetadata: AssetMetadata;
};

export default function SellSection({ assetMetadata }: Props) {
  const { address } = useAccount();
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
    <Stack sx={{ alignItems: "center", gap: 4, width: "100%" }}>
      <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography variant="h4">{`Select which ${assetMetadata.symbol} you want to sell`}</Typography>
          <Button onClick={handleSelectAll}>Select all</Button>
        </Stack>
        <SellableAssetsGrid
          assets={assets}
          selectedAssets={selectedAssets}
          setSelectedAssets={setSelectedAssets}
        />
        <SellForm
          assetMetadata={assetMetadata}
          selectedAssets={selectedAssets}
        />
      </Stack>
      <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
        <Typography variant="h4">Your sell orders</Typography>
        <SellOrdersGrid user={address} />
      </Stack>
    </Stack>
  );
}
