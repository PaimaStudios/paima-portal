import {
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tab,
  Typography,
} from "@mui/material";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import SellSection from "@components/dex/SellSection";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import BuySection from "@components/dex/BuySection";
import BuySettingsPopover from "./BuySettingsPopover";
import SettingsIcon from "@mui/icons-material/Settings";

enum TabValue {
  Buy = "Buy",
  Sell = "Sell",
}

export default function BuyAndSellSection() {
  const [tabValue, setTabValue] = useState(TabValue.Buy);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [slippagePercentage, setSlippagePercentage] = useState(0.1);
  const [settingsPopoverAnchorEl, setSettingsPopoverAnchorEl] =
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
            {tabValue === TabValue.Sell && (
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedMode}
                    onChange={() => setAdvancedMode(!advancedMode)}
                    size="small"
                  />
                }
                label={<Typography variant="caption">Advanced mode</Typography>}
              />
            )}
            {tabValue === TabValue.Buy && (
              <>
                <IconButton
                  aria-label="settings"
                  onClick={(event) => {
                    setSettingsPopoverAnchorEl(event.currentTarget);
                  }}
                >
                  <SettingsIcon />
                </IconButton>
                <BuySettingsPopover
                  setSlippagePercentage={setSlippagePercentage}
                  anchorEl={settingsPopoverAnchorEl}
                  handleClose={() => setSettingsPopoverAnchorEl(null)}
                  slippageInitialValue={slippagePercentage}
                />
              </>
            )}
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
