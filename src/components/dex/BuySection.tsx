import { Divider, Stack } from "@mui/material";
import { AssetMetadata } from "@utils/dex/types";
import FillOrderForm from "./FillOrderForm";

type Props = {
  assetMetadata: AssetMetadata;
};

export default function BuySection({ assetMetadata }: Props) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
      divider={<Divider sx={{ width: "100%" }} />}
    >
      <FillOrderForm assetMetadata={assetMetadata} />
      {/* todo: add graph */}
    </Stack>
  );
}
