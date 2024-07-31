import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NetworkType } from "@utils/types";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export default function useConnectWallet() {
  const { address: addressEvm } = useAccount();
  const { openConnectModal: openConnectEvmModal } = useConnectModal();

  const connectWallet = useCallback(
    (networkType: NetworkType) => {
      switch (networkType) {
        case "evm":
          if (openConnectEvmModal) openConnectEvmModal();
          break;
        case "cardano":
          // todo
          break;
        default:
          const exhaustiveCheck: never = networkType;
          throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
      }
    },
    [openConnectEvmModal],
  );

  // todo: useMemo based on selected network
  const address = addressEvm;

  return { address, connectWallet };
}
