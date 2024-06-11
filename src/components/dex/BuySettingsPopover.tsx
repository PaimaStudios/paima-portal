import { Popover, Stack, Typography, TextField } from "@mui/material";
import { InputErrorMessage } from "@utils/texts";
import { Dispatch, useEffect, useState } from "react";

type Props = {
  slippageInitialValue: number;
  setSlippagePercentage: Dispatch<React.SetStateAction<number>>;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
};

export default function BuySettingsPopover({
  slippageInitialValue,
  setSlippagePercentage,
  anchorEl,
  handleClose,
}: Props) {
  const [slippageString, setSlippageString] = useState(
    slippageInitialValue.toString(),
  );

  const handleSlippageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setSlippageString(newValue);
    if (!Number.isNaN(parseFloat(newValue))) {
      setSlippagePercentage(parseFloat(newValue));
    }
  };

  const slippageInputError =
    Number.isNaN(parseFloat(slippageString)) ||
    parseFloat(slippageString) < 0 ||
    parseFloat(slippageString) > 100
      ? InputErrorMessage.ValueNotPercentage
      : null;
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
        <TextField
          value={slippageString}
          label={"Slippage"}
          onChange={handleSlippageInputChange}
          autoComplete="off"
          InputProps={{
            endAdornment: "%",
          }}
          error={!!slippageInputError}
          helperText={slippageInputError}
          sx={{ width: "100%" }}
        ></TextField>
      </Stack>
    </Popover>
  );
}
