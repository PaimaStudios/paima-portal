import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import useSetNavbarTitle from "@hooks/useSetNavbarTitle";
import useGetGameAndAssetFromUrl from "@hooks/dex/useGetGameAndAssetFromUrl";
import DEXTradingInformation from "@components/DEXTradingInformation";
import DEXPriceChart from "@components/DEXPriceChart";
import DEXAllSellOrdersTable from "@components/DEXAllSellOrdersTable";
import DEXUserSellOrdersTable from "@components/DEXUserSellOrdersTable";
import DEXTradingPanel from "@components/DEXTradingPanel";

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
      <div className="w-full py-6 container">
        <div className="flex flex-col gap-12">
          <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
            Tarochi Gold DEX
          </h1>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col-reverse laptop:flex-row gap-10 laptop:gap-16">
              <div className="border rounded-xl border-gray-800 p-6 laptop:min-w-[440px] flex flex-col">
                <DEXTradingPanel wrapperClassname="flex-1" />
              </div>
              <DEXTradingInformation />
            </div>
            <div className="flex flex-col gap-10">
              <h2 className="text-heading2 font-semibold text-gray-50">
                Price chart
              </h2>
              <div>
                <DEXPriceChart />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h2 className="text-heading2 font-semibold text-gray-50">
                My sell orders
              </h2>
              <div>
                <DEXUserSellOrdersTable />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h2 className="text-heading2 font-semibold text-gray-50">
                All sell orders
              </h2>
              <div>
                <DEXAllSellOrdersTable />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Container>
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
            <IsConnectedWrapper hidden>
              <Grid xs={12}>
                <Divider orientation="horizontal" flexItem />
              </Grid>
              <Grid xs={12}>
                <SellOrdersSection />
              </Grid>
            </IsConnectedWrapper>
            <Grid xs={12}>
              <Divider orientation="horizontal" flexItem />
            </Grid>
            <Grid xs={12}>
              <AllSellOrdersSection />
            </Grid>
          </Grid>
        </Stack>
      </Container> */}
    </>
  );
}
