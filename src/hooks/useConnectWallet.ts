import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { formatEVMAddress } from "@utils/evm/utils";
import { NetworkType } from "@utils/types";
import { useCallback, useEffect, useMemo } from "react";
import useDappStore from "src/store";
import { useAccount } from "wagmi";

export default function useConnectWallet() {
  const { address: addressEvm, chain: chainEvm } = useAccount();
  const { openConnectModal: openConnectEvmModal } = useConnectModal();
  const { openAccountModal: openAccountEvmModal } = useAccountModal();
  const { openChainModal: openChainEvmModal } = useChainModal();
  const { connectedNetworkType, setConnectedNetworkType, pageNetworkTypes } =
    useDappStore();

  const connectWallet = useCallback(
    (networkType: NetworkType) => {
      switch (networkType) {
        case "evm":
          if (openConnectEvmModal) openConnectEvmModal();
          break;
        case "cardano":
          // todo Actual implementation
          setConnectedNetworkType("cardano");
          break;
        default:
          const exhaustiveCheck: never = networkType;
          throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
      }
    },
    [openConnectEvmModal, setConnectedNetworkType],
  );

  const disconnectWallet = useCallback(() => {
    if (!connectedNetworkType) return;
    switch (connectedNetworkType) {
      case "evm":
        if (openAccountEvmModal) openAccountEvmModal();
        break;
      case "cardano":
        // todo Actual implementation
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
        // todo Actual implementation
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

  const address = useMemo(() => {
    switch (connectedNetworkType) {
      case "evm":
        return addressEvm;
      case "cardano":
        // todo Actual implementation
        return "addr_1a2bb84451ac16ed8b4e9ad33dc4";
      case undefined:
        return undefined;
      default:
        const exhaustiveCheck: never = connectedNetworkType;
        throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
    }
  }, [addressEvm, connectedNetworkType]);

  const addressShort = useMemo(() => {
    switch (connectedNetworkType) {
      case "evm":
        return formatEVMAddress(address);
      case "cardano":
        // todo Actual implementation
        return "addr_1a2b...3dc4";
      case undefined:
        return undefined;
      default:
        const exhaustiveCheck: never = connectedNetworkType;
        throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
    }
  }, [address, connectedNetworkType]);

  const chain = useMemo(() => {
    switch (connectedNetworkType) {
      case "evm":
        return chainEvm;
      case "cardano":
        // todo Actual implementation
        return { id: 1 };
      case undefined:
        return undefined;
      default:
        const exhaustiveCheck: never = connectedNetworkType;
        throw new Error(`Unhandled networkType case: ${exhaustiveCheck}`);
    }
  }, [chainEvm, connectedNetworkType]);

  const connectedToSupportedNetworkType = useMemo(() => {
    if (!connectedNetworkType) return false;
    return pageNetworkTypes?.includes(connectedNetworkType);
  }, [connectedNetworkType, pageNetworkTypes]);

  return {
    address,
    addressShort,
    chain,
    changeChain,
    connectedToSupportedNetworkType,
    connectWallet,
    disconnectWallet,
  };
}
