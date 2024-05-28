import { Divider, Stack, Typography } from "@mui/material";
import { AssetMetadata } from "@utils/dex/types";
import { useAccount } from "wagmi";
import SellOrdersGrid from "./SellOrdersGrid";
import CreateSellOrderSection from "./CreateSellOrderSection";

type Props = {
  assetMetadata: AssetMetadata;
  advancedMode: boolean;
};

export default function SellSection({ assetMetadata, advancedMode }: Props) {
  const { address } = useAccount();

  return (
    <Stack
      sx={{
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
      divider={<Divider sx={{ width: "100%" }} />}
    >
      <CreateSellOrderSection
        assetMetadata={assetMetadata}
        advancedMode={advancedMode}
      />
      <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
        <Typography variant="h4">Your sell orders</Typography>
        <SellOrdersGrid user={address} />
      </Stack>
    </Stack>
  );
}
