import { Container, FormControlLabel, Stack, Switch, Tab } from "@mui/material";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import SellSection from "@components/dex/SellSection";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuySection from "@components/dex/BuySection";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";

enum TabValue {
  Buy = "Buy",
  Sell = "Sell",
}

export default function Dex() {
  const navigate = useNavigate();
  const { data: assetMetadata, isLoading: assetMetadataLoading } =
    useGetGameAssetMetadata();
  const [tabValue, setTabValue] = useState(TabValue.Buy);
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!assetMetadataLoading && !assetMetadata) {
      navigate("/");
    }
  }, [assetMetadata]);

  if (assetMetadataLoading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <IsConnectedWrapper>
          <TabContext value={tabValue}>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TabList onChange={handleChangeTab} centered>
                <Tab label="Buy" value={TabValue.Buy} />
                <Tab label="Sell" value={TabValue.Sell} />
              </TabList>
              {tabValue === TabValue.Sell && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={advancedMode}
                      onChange={() => setAdvancedMode(!advancedMode)}
                    />
                  }
                  label="Advanced mode"
                />
              )}
            </Stack>
            <TabPanel value={TabValue.Buy}>
              <BuySection />
            </TabPanel>
            <TabPanel value={TabValue.Sell}>
              <SellSection advancedMode={advancedMode} />
            </TabPanel>
          </TabContext>
        </IsConnectedWrapper>
      </Container>
    </>
  );
}
