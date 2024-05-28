import { Container, FormControlLabel, Stack, Switch, Tab } from "@mui/material";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import SellSection from "@components/dex/SellSection";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gamesMetadata } from "@config/dex";
import { AssetMetadata } from "@utils/dex/types";
import BuySection from "@components/dex/BuySection";

enum TabValue {
  Buy = "Buy",
  Sell = "Sell",
}

export default function Dex() {
  const navigate = useNavigate();
  let { game: gameFromUrl, asset: assetFromUrl } = useParams();
  const [tabValue, setTabValue] = useState(TabValue.Buy);
  const [assetMetadata, setAssetMetadata] = useState<AssetMetadata>();
  const [advancedMode, setAdvancedMode] = useState(false);

  useEffect(() => {
    const gameInfo = gamesMetadata[gameFromUrl!];
    const assetInfo = assetFromUrl && gameInfo?.assets?.[assetFromUrl!];
    if (!assetInfo) {
      navigate("/404");
    } else {
      setAssetMetadata(assetInfo);
    }
  }, [gameFromUrl]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  if (!assetMetadata) return null;

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
              <FormControlLabel
                control={
                  <Switch
                    value={advancedMode}
                    onChange={() => setAdvancedMode(!advancedMode)}
                  />
                }
                label="Advanced mode"
              />
            </Stack>
            <TabPanel value={TabValue.Buy}>
              <BuySection assetMetadata={assetMetadata} />
            </TabPanel>
            <TabPanel value={TabValue.Sell}>
              <SellSection
                assetMetadata={assetMetadata}
                advancedMode={advancedMode}
              />
            </TabPanel>
          </TabContext>
        </IsConnectedWrapper>
      </Container>
    </>
  );
}
