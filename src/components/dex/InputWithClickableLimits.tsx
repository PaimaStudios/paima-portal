import { TextField, Stack, Typography, Divider } from "@mui/material";
import { ChangeEventHandler, MouseEventHandler } from "react";

type Props = {
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  endAdornment: string;
  limits?: ({
    label: string;
    onClick: MouseEventHandler<HTMLSpanElement>;
    value: string;
  } | null)[];
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
          <>
            <Typography>{endAdornment}</Typography>
            <Stack
              sx={{
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                position: "absolute",
                top: -20,
                right: 8,
              }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              {limits?.map((limit) =>
                limit == null ? null : (
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
                ),
              )}
            </Stack>
          </>
        ),
      }}
      error={error}
      helperText={helperText}
      sx={{ width: "100%" }}
    ></TextField>
  );
}
