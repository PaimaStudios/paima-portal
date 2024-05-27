import { useQuery } from "@tanstack/react-query";
import { Asset } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";

export default function useGetSellableAssets() {
  return useQuery<Asset[]>({
    queryKey: [QueryKeys.SellableAssets],
    queryFn: async () => {
      return [
        {
          tokenId: 1,
          amount: 100,
        },
        {
          tokenId: 2,
          amount: 200,
        },
        {
          tokenId: 3,
          amount: 300,
        },
      ];
    },
  });
}
