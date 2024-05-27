import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";

import { config } from "./config/wagmi";
import ModalProvider from "mui-modal-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#19b17b",
  },
}));

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      classes={{ containerRoot: "snackbarContainer" }}
      Components={{
        success: StyledMaterialDesignContent,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#19b17b",
              accentColorForeground: "EC6B67",
            })}
          >
            <ModalProvider>{children}</ModalProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}
