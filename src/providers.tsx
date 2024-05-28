import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";

import { config } from "./config/wagmi";
import ModalProvider from "mui-modal-provider";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#19b17b",
  },
}));

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      enqueueSnackbar({
        message: `Something went wrong: ${error.message}`,
        variant: "error",
      });
    },
    onSuccess: (data, query) => {
      if (query.meta?.successMessage) {
        enqueueSnackbar({
          message: query.meta.successMessage as string,
          variant: "success",
        });
      }
      if (query.meta?.invalidateQueries) {
        (query.meta.invalidateQueries as QueryKey[]).forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      enqueueSnackbar({
        message: `Something went wrong: ${error.message}`,
        variant: "error",
      });
    },
    onSuccess: (data, variables, context, mutation) => {
      if (mutation.meta?.infoMessage) {
        enqueueSnackbar({
          message: mutation.meta.infoMessage as string,
          variant: "info",
        });
      }
      if (mutation.meta?.successMessage) {
        enqueueSnackbar({
          message: mutation.meta.successMessage as string,
          variant: "success",
        });
      }
      if (mutation.meta?.invalidateQueries) {
        (mutation.meta.invalidateQueries as QueryKey[]).forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  }),
});

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
