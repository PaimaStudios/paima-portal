import env from "@config/env";
import { Network, NetworkData } from "./types";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const networksData: Record<Network, NetworkData> = env.REACT_APP_TESTNET
  ? ({
      arbitrum: {
        name: "Arbitrum (Sepolia)",
        type: "evm",
        icon: "/images/chain-arbitrum.png",
        chainId: 421614,
        explorerTxUrl: "https://sepolia.arbiscan.io/tx",
      },
      cardano: {
        name: "Cardano (Devnet)",
        type: "cardano",
        icon: "/images/chain-cardano.png",
        chainId: -1,
        explorerTxUrl: "",
      },
      xai: {
        name: "Xai (Goerli)",
        type: "evm",
        icon: "/images/chain-xai.png",
        chainId: 47279324479,
        explorerTxUrl: "https://testnet-explorer.xai-chain.net/tx",
      },
    } as const satisfies Record<Network, NetworkData>)
  : ({
      arbitrum: {
        name: "Arbitrum",
        type: "evm",
        icon: "/images/chain-arbitrum.png",
        chainId: 42161,
        explorerTxUrl: "https://arbiscan.io/tx",
      },
      cardano: {
        name: "Cardano",
        type: "cardano",
        icon: "/images/chain-cardano.png",
        chainId: -1,
        explorerTxUrl: "",
      },
      xai: {
        name: "Xai",
        type: "evm",
        icon: "/images/chain-xai.png",
        chainId: 660279,
        explorerTxUrl: "https://explorer.xai-chain.net/tx",
      },
    } as const satisfies Record<Network, NetworkData>);
