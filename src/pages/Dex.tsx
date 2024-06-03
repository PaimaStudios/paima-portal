import { Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PriceChart from "@components/dex/PriceChart";
import BuyAndSellSection from "@components/dex/BuyAndSellSection";
import UserSellOrdersSections from "@components/dex/UserSellOrdersSection";
import useDappStore from "src/store";

export default function Dex() {
  const navigate = useNavigate();
  const { data: assetMetadata, isLoading: assetMetadataLoading } =
    useGetGameAssetMetadata();
  const setNavbarTitle = useDappStore((state) => state.setNavbarTitle);

  useEffect(() => {
    if (!assetMetadataLoading && !assetMetadata) {
      navigate("/");
    }
  }, [assetMetadata]);

  useEffect(() => {
    if (!assetMetadata) return;
    setNavbarTitle(`Trade ${assetMetadata?.name}`);
  }, [setNavbarTitle, assetMetadata]);

  return (
    <>
      <Container>
        <Stack sx={{ gap: 2, mt: 2 }}>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid xs={12} md={6} lg={8}>
              <PriceChart />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
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
