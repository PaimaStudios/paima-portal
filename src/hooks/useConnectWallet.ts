import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { formatEVMAddress } from "@utils/evm/utils";
import { NetworkType } from "@utils/types";
import { useCallback, useEffect } from "react";
import useDappStore from "src/store";
import { useAccount } from "wagmi";

export default function useConnectWallet() {
  const { address: addressEvm, chain: chainEvm } = useAccount();
  const { openConnectModal: openConnectEvmModal } = useConnectModal();
  const { openAccountModal: openAccountEvmModal } = useAccountModal();
  const { openChainModal: openChainEvmModal } = useChainModal();
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

  const changeChain = useCallback(() => {
    if (!connectedNetworkType) return;
    switch (connectedNetworkType) {
      case "evm":
        if (openChainEvmModal) openChainEvmModal();
        break;
      case "cardano":
        // todo
        break;
      default:
        const exhaustiveCheck: never = connectedNetworkType;
        throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
    }
  }, [connectedNetworkType, openChainEvmModal]);

  useEffect(() => {
    if (addressEvm) {
      setConnectedNetworkType("evm");
    }
  }, [addressEvm, setConnectedNetworkType]);

  // todo: useMemo based on selected network
  const address = addressEvm;

  // todo: useMemo based on selected network
  const addressShort = formatEVMAddress(addressEvm);

  // todo: useMemo based on selected network
  const chain = chainEvm;

  return {
    address,
    addressShort,
    chain,
    changeChain,
    connectWallet,
    disconnectWallet,
  };
}
