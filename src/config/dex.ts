import { GameMetadata } from "@utils/dex/types";

export const gamesMetadata: Record<string, GameMetadata> = {
  tarochi: {
    name: "Tarochi",
    assets: {
      tgold: {
        name: "Tarochi Gold",
        symbol: "TGOLD",
        address: "0xebA0B0d252b779322Ac6e0F4cFC24357409cAbf2",
        dexAddress: "0xA5ceA51eDde3c71a16fb93dEf934Ce7cDDB6f71e",
      },
    },
  },
} as const;
