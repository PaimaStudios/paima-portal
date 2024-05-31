import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import NavigationItems from "./NavigationItems";

export default function Sidebar() {
  return (
    <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 250 }}>
      <AppBar
        sx={(theme) => ({
          bgcolor: theme.palette.background.default,
          height: "100vh",
          p: 2,
        })}
        position="sticky"
      >
        <Link to="/">
          <img
            src="/paima-logo.svg"
            alt="Paima Logo"
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </Link>
        <NavigationItems />
      </AppBar>
    </Box>
  );
}
