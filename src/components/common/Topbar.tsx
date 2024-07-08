import { AppBar, Skeleton, Stack, Toolbar, Typography } from "@mui/material";
import ConnectWallet from "./ConnectWallet";
import useDappStore from "src/store";
import { Link } from "react-router-dom";

export default function Topbar() {
  const navbarTitle = useDappStore((state) => state.navbarTitle);

  return (
    <div className="h-[70px] flex items-center justify-between py-3 px-6">
      <div>
        <Link to="/" className="tablet:hidden">
          <img src="/paima-icon.svg" alt="Paima Logo" />
        </Link>
      </div>
      <ConnectWallet />
    </div>
    // <AppBar
    //   sx={(theme) => ({
    //     bgcolor: theme.palette.background.default,
    //     width: "100%",
    //     display: { xs: "none", md: "block" },
    //   })}
    //   position="sticky"
    // >
    //   <Toolbar sx={{ gap: 2 }}>
    //     <Typography variant="h5" component="h2">
    //       {navbarTitle ? navbarTitle : <Skeleton width={200} />}
    //     </Typography>
    //     <div className="font-bold">123312</div>
    //     <Stack sx={{ flexGrow: 1 }} />
    //     <ConnectWallet />
    //   </Toolbar>
    // </AppBar>
  );
}
