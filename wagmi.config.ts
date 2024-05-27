import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import OrderbookDexAbi from "./src/abis/OrderbookDex.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      abi: OrderbookDexAbi as any,
      name: "OrderbookDex",
    },
  ],
  plugins: [react()],
});
