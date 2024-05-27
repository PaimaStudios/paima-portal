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
          [arbitrumSepolia.id]: "0xebA0B0d252b779322Ac6e0F4cFC24357409cAbf2",
          [arbitrum.id]: "0x1c1ee6cabae81354d822f6d2331eab87e0c00c1f",
        },
        dexAddress: {
          [arbitrumSepolia.id]: "0xA5ceA51eDde3c71a16fb93dEf934Ce7cDDB6f71e",
          [arbitrum.id]: "0x",
        },
      },
    },
  },
} as const;
