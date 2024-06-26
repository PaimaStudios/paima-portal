import env from "./env";

export const gamesApi: Record<string, string> = {
  tarochi: env.REACT_APP_TESTNET
    ? "https://tarochi-backend-testnet-c1.paimastudios.com"
    : "https://tarochi-backend-xai-mainnet.paimastudios.com",
} as const;
