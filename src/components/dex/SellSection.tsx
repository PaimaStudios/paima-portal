import { Divider, Stack } from "@mui/material";
import { AssetMetadata } from "@utils/dex/types";
import CreateSellOrderSection from "./CreateSellOrderSection";
import UserSellOrdersSections from "./UserSellOrdersSection";

type Props = {
  assetMetadata: AssetMetadata;
  advancedMode: boolean;
};

export default function SellSection({ assetMetadata, advancedMode }: Props) {
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
      <UserSellOrdersSections assetMetadata={assetMetadata} />
    </Stack>
  );
}
