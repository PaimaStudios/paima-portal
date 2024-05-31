import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";

export default function IsConnectedWrapper({ children }: PropsWithChildren) {
  const { chain } = useAccount();

  if (!chain) {
    return (
      <Stack sx={{ my: 4, gap: 2, alignItems: "center" }}>
        <Typography>
          Connect your wallet to interact with this section
        </Typography>
        <ConnectWallet />
      </Stack>
    );
  }

  return <>{children}</>;
}
