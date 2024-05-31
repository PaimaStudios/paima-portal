import { AppBar, Stack, Toolbar } from "@mui/material";
import ConnectWallet from "./ConnectWallet";

export default function Topbar() {
  return (
    <AppBar
      sx={(theme) => ({
        bgcolor: theme.palette.background.default,
        width: "100%",
        display: { xs: "none", md: "block" },
      })}
      position="sticky"
    >
      <Toolbar sx={{ gap: 2 }}>
        <Stack sx={{ flexGrow: 1 }} />
        <ConnectWallet />
      </Toolbar>
    </AppBar>
  );
}
