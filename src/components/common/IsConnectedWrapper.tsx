import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function IsConnectedWrapper({ children }: PropsWithChildren) {
  const { chain } = useAccount();

  if (!chain) {
    return (
      <Stack sx={{ my: 4, gap: 2, alignItems: "center" }}>
        <Typography>
          Connect your wallet to get started with using the Paima Asset Portal
        </Typography>
        <ConnectButton />
      </Stack>
    );
  }

  return <>{children}</>;
}
