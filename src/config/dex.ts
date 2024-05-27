import { GameMetadata } from "@utils/dex/types";
import { arbitrum, arbitrumSepolia } from "viem/chains";

export const gamesMetadata: Record<string, GameMetadata> = {
  tarochi: {
    name: "Tarochi",
    assets: {
      tgold: {
        name: "Tarochi Gold",
        symbol: "TGOLD",
        address: {
          [arbitrumSepolia.id]: "0x",
          [arbitrum.id]: "0x1c1ee6cabae81354d822f6d2331eab87e0c00c1f",
        },
        dexAddress: {
          [arbitrumSepolia.id]: "0x",
          [arbitrum.id]: "0x",
        },
      },
    },
  },
} as const;
