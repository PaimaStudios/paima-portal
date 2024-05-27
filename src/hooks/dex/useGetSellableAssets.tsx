import { useQuery } from "@tanstack/react-query";
import { Asset } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";

export default function useGetSellableAssets() {
  return useQuery<Asset[]>({
    queryKey: [QueryKeys.SellableAssets],
    queryFn: async () => {
      return [
        {
          tokenId: 3,
          amount: 100,
        },
        {
          tokenId: 5,
          amount: 200,
        },
        {
          tokenId: 9,
          amount: 300,
        },
      ];
    },
  });
}
