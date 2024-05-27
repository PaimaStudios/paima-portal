import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <AppBar sx={{ bgcolor: "#030909" }}>
        <Container>
          <Toolbar sx={{ gap: 2 }}>
            <Link to="/">
              <Button variant="text">Paima Asset Portal</Button>
            </Link>
            <Stack sx={{ flexGrow: 1 }} />
            <ConnectButton />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
