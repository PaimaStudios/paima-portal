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
import { getErrorMessage } from "@utils/errors";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#19b17b",
  },
}));

interface MyMeta extends Record<string, unknown> {
  successMessage?: string;
  errorMessage?: string;
  infoMessage?: string;
  invalidateQueries?: QueryKey[];
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
      enqueueSnackbar({
        message: `Something went wrong: ${error.message}`,
        variant: "error",
      });
    },
    onSuccess: (data, query) => {
      if (query.meta?.successMessage) {
        enqueueSnackbar({
          message: query.meta.successMessage,
          variant: "success",
        });
      }
      if (query.meta?.invalidateQueries) {
        query.meta.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error.message.includes("User rejected the request")) return;
      console.error(error);
      enqueueSnackbar({
        message: `Something went wrong: ${getErrorMessage(error)}`,
        variant: "error",
      });
    },
    onSuccess: (data, variables, context, mutation) => {
      if (mutation.meta?.infoMessage) {
        enqueueSnackbar({
          message: mutation.meta.infoMessage,
          variant: "info",
        });
      }
      if (mutation.meta?.successMessage) {
        enqueueSnackbar({
          message: mutation.meta.successMessage,
          variant: "success",
        });
      }
      if (mutation.meta?.invalidateQueries) {
        mutation.meta.invalidateQueries.forEach((queryKey) => {
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
