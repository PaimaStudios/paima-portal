import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { formatEVMAddress } from "@utils/evm/utils";
import { NetworkType } from "@utils/types";
import { useCallback, useEffect } from "react";
import useDappStore from "src/store";
import { useAccount } from "wagmi";

export default function useConnectWallet() {
  const { address: addressEvm } = useAccount();
  const { openConnectModal: openConnectEvmModal } = useConnectModal();
  const { openAccountModal: openAccountEvmModal } = useAccountModal();
  const { connectedNetworkType, setConnectedNetworkType } = useDappStore();

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

  const disconnectWallet = useCallback(() => {
    if (!connectedNetworkType) return;
    switch (connectedNetworkType) {
      case "evm":
        if (openAccountEvmModal) openAccountEvmModal();
        break;
      case "cardano":
        // todo
        break;
      default:
        const exhaustiveCheck: never = connectedNetworkType;
        throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
    }
  }, [connectedNetworkType, openAccountEvmModal]);

  useEffect(() => {
    if (addressEvm) {
      setConnectedNetworkType("evm");
    }
  }, [addressEvm, setConnectedNetworkType]);

  // todo: useMemo based on selected network
  const address = addressEvm;

  // todo: useMemo based on selected network
  const addressShort = formatEVMAddress(addressEvm);

  return { address, addressShort, connectWallet, disconnectWallet };
}
