import { TextField, Stack, Typography, Divider } from "@mui/material";
import { ChangeEventHandler, MouseEventHandler } from "react";

type Props = {
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  endAdornment: string;
  limits?: {
    label: string;
    onClick: MouseEventHandler<HTMLSpanElement>;
    value: string;
  }[];
  error: boolean;
  helperText?: string;
};

export default function InputWithClickableLimits({
  value,
  label,
  onChange,
  endAdornment,
  limits,
  error,
  helperText,
}: Props) {
  return (
    <TextField
      value={value}
      label={label}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography>{endAdornment}</Typography>
            {limits?.map((limit) => (
              <Stack
                key={limit.label}
                sx={{
                  flexDirection: "row",
                  gap: 1 / 2,
                  alignItems: "center",
                }}
              >
                <Typography variant="caption">{limit.label}</Typography>
                <Typography
                  variant="caption"
                  sx={{ cursor: "pointer" }}
                  onClick={limit.onClick}
                >
                  {limit.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ),
      }}
      error={error}
      helperText={helperText}
      sx={{ width: "100%" }}
    ></TextField>
  );
}
