import { Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PriceChart from "@components/dex/PriceChart";
import BuyAndSellSection from "@components/dex/BuyAndSellSection";
import UserSellOrdersSections from "@components/dex/UserSellOrdersSection";

export default function Dex() {
  const navigate = useNavigate();
  const { data: assetMetadata, isLoading: assetMetadataLoading } =
    useGetGameAssetMetadata();

  useEffect(() => {
    if (!assetMetadataLoading && !assetMetadata) {
      navigate("/");
    }
  }, [assetMetadata]);

  if (assetMetadataLoading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <Stack sx={{ gap: 2, mt: 2 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Trade {assetMetadata?.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={8}>
              <PriceChart />
            </Grid>
            <Grid xs={12} md={4}>
              <BuyAndSellSection />
            </Grid>
            <Grid xs={12}>
              <UserSellOrdersSections />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
