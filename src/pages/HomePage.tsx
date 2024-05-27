import { Button, Container, Divider, Stack } from "@mui/material";
import IsConnectedWrapper from "../components/common/IsConnectedWrapper";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Container>
        <IsConnectedWrapper>
          <Stack
            sx={{ alignItems: "center", gap: 2, mb: 10, mt: 4 }}
            divider={
              <Divider orientation="horizontal" sx={{ width: "100%" }} />
            }
          >
            <Link to="/dex/tarochi/tgold">
              <Button variant="text">Tarochi Gold DEX</Button>
            </Link>
          </Stack>
        </IsConnectedWrapper>
      </Container>
    </>
  );
}
