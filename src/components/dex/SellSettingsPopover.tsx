import {
  Popover,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Dispatch } from "react";

type Props = {
  advancedMode: boolean;
  setAdvancedMode: Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
};

export default function SellSettingsPopover({
  advancedMode,
  setAdvancedMode,
  anchorEl,
  handleClose,
}: Props) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Stack
        sx={{
          padding: 2,
          gap: 2,
          minWidth: 200,
        }}
      >
        <Typography variant="caption">Settings</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
              size="small"
            />
          }
          label={<Typography variant="caption">Advanced mode</Typography>}
          sx={{ mx: 0 }}
        />
      </Stack>
    </Popover>
  );
}
