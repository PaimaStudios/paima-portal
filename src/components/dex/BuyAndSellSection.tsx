import { IconButton, Stack, Tab } from "@mui/material";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import SellSection from "@components/dex/SellSection";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import BuySection from "@components/dex/BuySection";
import BuySettingsPopover from "./BuySettingsPopover";
import SettingsIcon from "@mui/icons-material/Settings";
import SellSettingsPopover from "./SellSettingsPopover";

enum TabValue {
  Buy = "Buy",
  Sell = "Sell",
}

export default function BuyAndSellSection() {
  const [tabValue, setTabValue] = useState(TabValue.Buy);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [slippagePercentage, setSlippagePercentage] = useState(0.1);
  const [buySettingsPopoverAnchorEl, setBuySettingsPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [sellSettingsPopoverAnchorEl, setSellSettingsPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  return (
    <>
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
            <IconButton
              aria-label="settings"
              onClick={(event) => {
                if (tabValue === TabValue.Buy) {
                  setBuySettingsPopoverAnchorEl(event.currentTarget);
                } else if (tabValue === TabValue.Sell) {
                  setSellSettingsPopoverAnchorEl(event.currentTarget);
                }
              }}
            >
              <SettingsIcon />
            </IconButton>
            <BuySettingsPopover
              setSlippagePercentage={setSlippagePercentage}
              anchorEl={buySettingsPopoverAnchorEl}
              handleClose={() => setBuySettingsPopoverAnchorEl(null)}
              slippageInitialValue={slippagePercentage}
            />
            <SellSettingsPopover
              advancedMode={advancedMode}
              setAdvancedMode={setAdvancedMode}
              anchorEl={sellSettingsPopoverAnchorEl}
              handleClose={() => setSellSettingsPopoverAnchorEl(null)}
            />
          </Stack>
          <TabPanel value={TabValue.Buy}>
            <BuySection slippagePercentage={slippagePercentage} />
          </TabPanel>
          <TabPanel value={TabValue.Sell}>
            <SellSection advancedMode={advancedMode} />
          </TabPanel>
        </TabContext>
      </IsConnectedWrapper>
    </>
  );
}
