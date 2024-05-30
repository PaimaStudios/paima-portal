import { Divider, Stack } from "@mui/material";
import FillOrderForm from "./FillOrderForm";
import PriceChart from "./PriceChart";

export default function BuySection() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
      divider={<Divider sx={{ width: "100%" }} />}
    >
      <FillOrderForm />
      <PriceChart />
    </Stack>
  );
}
