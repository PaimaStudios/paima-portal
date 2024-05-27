import { http } from "wagmi";
import env from "./env";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { HttpTransport } from "viem";

const transports: Record<number, HttpTransport> = {};
for (const key of Object.keys(env.REACT_APP_WAGMI_TRANSPORTS)) {
  transports[Number(key)] = http(env.REACT_APP_WAGMI_TRANSPORTS[key]);
}

export const config = getDefaultConfig({
  appName: "Paima Asset Portal",
  projectId: env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
  chains: env.REACT_APP_TESTNET ? [arbitrumSepolia] : [arbitrum],
  transports,
});
