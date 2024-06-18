import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PriceChart from "@components/dex/PriceChart";
import BuyAndSellSection from "@components/dex/BuyAndSellSection";
import UserSellOrdersSections from "@components/dex/UserSellOrdersSection";
import useSetNavbarTitle from "@hooks/useSetNavbarTitle";
import { dexPageSubtitle } from "@config/dex";
import useGetGameAndAssetFromUrl from "@hooks/dex/useGetGameAndAssetFromUrl";

export default function Dex() {
  const navigate = useNavigate();
  const { game: gameFromUrl, asset: assetFromUrl } =
    useGetGameAndAssetFromUrl();
  const { data: assetMetadata, isLoading: assetMetadataLoading } =
    useGetGameAssetMetadata();
  useSetNavbarTitle(assetMetadata ? `Trade ${assetMetadata.name}` : undefined);

  useEffect(() => {
    if (!assetMetadataLoading && !assetMetadata) {
      navigate("/");
    }
  }, [assetMetadata]);

  return (
    <>
      <Container>
        <Stack sx={{ gap: 2, mt: 2 }}>
          {!!gameFromUrl && !!assetFromUrl
            ? dexPageSubtitle[gameFromUrl]?.[assetFromUrl] ?? null
            : null}
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
