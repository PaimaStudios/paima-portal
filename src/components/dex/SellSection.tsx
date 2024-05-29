import { Divider, Stack } from "@mui/material";
import CreateSellOrderSection from "./CreateSellOrderSection";
import UserSellOrdersSections from "./UserSellOrdersSection";

type Props = {
  advancedMode: boolean;
};

export default function SellSection({ advancedMode }: Props) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
      divider={<Divider sx={{ width: "100%" }} />}
    >
      <CreateSellOrderSection advancedMode={advancedMode} />
      <UserSellOrdersSections />
    </Stack>
  );
}
