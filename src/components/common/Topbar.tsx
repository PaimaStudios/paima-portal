import { AppBar, Skeleton, Stack, Toolbar, Typography } from "@mui/material";
import ConnectWallet from "./ConnectWallet";
import useDappStore from "src/store";

export default function Topbar() {
  const navbarTitle = useDappStore((state) => state.navbarTitle);
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
        <Typography variant="h5" component="h2">
          {navbarTitle ? navbarTitle : <Skeleton width={200} />}
        </Typography>
        <Stack sx={{ flexGrow: 1 }} />
        <ConnectWallet />
      </Toolbar>
    </AppBar>
  );
}
