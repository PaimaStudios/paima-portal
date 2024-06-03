import { config } from "@config/wagmi";
import { useQuery } from "@tanstack/react-query";
import { SellOrder } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { orderbookDexAbi } from "src/generated";
import { readContract, readContracts } from "@wagmi/core";

export default function useGetSellOrders(params?: { user?: `0x${string}` }) {
  // todo: temporary query, will be replaced with API call to game node
  const dexContract = {
    address: "0xA5ceA51eDde3c71a16fb93dEf934Ce7cDDB6f71e",
    abi: orderbookDexAbi,
  } as const;
  return useQuery<SellOrder[]>({
    queryKey: [QueryKeys.SellOrders, params?.user],
    queryFn: async () => {
      // await only for skeleton testing purposes
      await new Promise((f) => setTimeout(f, 800));
      const currentOrderId = Number(
        await readContract(config, {
          ...dexContract,
          functionName: "currentOrderId",
        }),
      );
      const oneToCurrentOrderId = Array.from(Array(currentOrderId).keys());
      const contracts = oneToCurrentOrderId.map((id) => ({
        ...dexContract,
        functionName: "getOrder",
        args: [BigInt(id)],
      }));
      const orders = await readContracts(config, {
        contracts,
      });
      return oneToCurrentOrderId
        .filter((id) => {
          const result = orders[id].result as any;
          return result.assetAmount !== 0n;
        })
        .map((id) => {
          const result = orders[id].result as any;
          return {
            amount: Number(result.assetAmount),
            tokenId: Number(result.assetId),
            orderId: id,
            price: result.pricePerAsset,
            seller: result.seller,
          };
        });
    },
  });
}
