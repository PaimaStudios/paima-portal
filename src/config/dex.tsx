import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const dexPageSubtitle: Record<string, Record<string, ReactNode>> = {
  tarochi: {
    tgold: (
      <Typography variant="h5" component="span">
        Get more information about Tarochi Gold at the{" "}
        <Link to="https://tarochi.fandom.com/wiki/Tarochi_Gold" target="_blank">
          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
            component="span"
          >
            Tarochi Gold Wiki page
          </Typography>
        </Link>
        .
      </Typography>
    ),
  },
};
