import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationItems from "./NavigationItems";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useDappStore from "src/store";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navbarTitle = useDappStore((state) => state.navbarTitle);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      <AppBar
        sx={(theme) => ({
          bgcolor: theme.palette.background.default,
          display: { xs: "block", md: "none" },
        })}
      >
        <Container>
          <Toolbar sx={{ gap: 2 }}>
            <Link to="/" style={{ display: "flex" }}>
              <img
                src="/paima-icon.svg"
                alt="Paima Icon"
                style={{ width: "100%" }}
              />
            </Link>
            <Typography variant="h5" component="h2">
              {navbarTitle ? navbarTitle : <Skeleton width={200} />}
            </Typography>
            <Stack sx={{ flexGrow: 1 }} />
            <IconButton aria-label="Open drawer" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        anchor="top"
        PaperProps={{
          sx: (theme) => ({
            bgcolor: theme.palette.background.default,
            height: "100vh",
            py: 3 / 2,
            px: 6,
          }),
        }}
      >
        <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: "end" }}>
          <CloseIcon />
        </IconButton>
        <NavigationItems showWallet={true} onClick={toggleDrawer(false)} />
      </Drawer>
    </>
  );
}
