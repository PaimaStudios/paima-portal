import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import OrderbookDexAbi from "./src/abis/OrderbookDex.json";
import InverseAppProjected1155Abi from "./src/abis/InverseAppProjected1155.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    // todo: would be better if Paima was dependency and we could import the abi from there
    {
      abi: OrderbookDexAbi as any,
      name: "OrderbookDex",
    },
    // todo: would be better if Paima was dependency and we could import the abi from there
    {
      abi: InverseAppProjected1155Abi as any,
      name: "InverseAppProjected1155",
    },
  ],
  plugins: [react()],
});
