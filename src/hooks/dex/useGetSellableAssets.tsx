import { config } from "@config/wagmi";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { readContracts } from "@wagmi/core";
import { inverseAppProjected1155Abi } from "src/generated";
import { useAccount } from "wagmi";

export default function useGetSellableAssets() {
  // todo: temporary query, will be replaced with API call to game node
  const { address } = useAccount();
  const assetContract = {
    address: "0xebA0B0d252b779322Ac6e0F4cFC24357409cAbf2",
    abi: inverseAppProjected1155Abi,
  } as const;
  return useQuery<Asset[]>({
    queryKey: [QueryKeys.SellableAssets],
    queryFn: async () => {
      // await only for skeleton testing purposes
      await new Promise((f) => setTimeout(f, 1000));
      const contracts = [1, 2, 3].map((id) => ({
        ...assetContract,
        functionName: "balanceOf",
        args: [address!, BigInt(id)],
      }));
      const assets = await readContracts(config, {
        contracts,
      });
      return [1, 2, 3].map((id, arrayIndex) => {
        const result = assets[arrayIndex].result as any;
        return {
          amount: Number(result),
          tokenId: id,
        };
      });
    },
  });
}
